import base64
import json
import os

from . import constants
from . import error
from . import encoding

from nacl.signing import SigningKey

spec = None
opcodes = None


def check_program(program, args=None):
    """
    Performs program checking for max length and cost

    Args:
        program (bytes): compiled program
        args (list[bytes]): args are not signed, but are checked by logic

    Returns:
        bool: True on success

    Raises:
        InvalidProgram: on error
    """
    ok, _, _ = read_program(program, args)
    return ok


def read_program(program, args=None):
    global spec, opcodes
    intcblock_opcode = 32
    bytecblock_opcode = 38
    pushbytes_opcode = 128
    pushint_opcode = 129

    if not program:
        raise error.InvalidProgram("empty program")
    if not args:
        args = []

    if spec is None:
        script_path = os.path.realpath(__file__)
        script_dir = os.path.dirname(script_path)
        langspec_file = os.path.join(script_dir, "data", "langspec.json")
        with open(langspec_file, "rt") as fin:
            spec = json.load(fin)

    version, vlen = parse_uvarint(program)
    if vlen <= 0 or version > spec["EvalMaxVersion"]:
        raise error.InvalidProgram("unsupported version")

    cost = 0
    length = len(program)
    for arg in args:
        length += len(arg)

    if length > constants.logic_sig_max_size:
        raise error.InvalidProgram("program too long")

    if opcodes is None:
        opcodes = dict()
        for op in spec['Ops']:
            opcodes[op['Opcode']] = op

    ints = []
    bytearrays = []
    pc = vlen
    while pc < len(program):
        op = opcodes.get(program[pc], None)
        if op is None:
            raise error.InvalidProgram("invalid instruction")

        cost += op['Cost']
        size = op['Size']
        if size == 0:
            if op['Opcode'] == intcblock_opcode:
                size_inc, found_ints = read_int_const_block(program, pc)
                ints += found_ints
                size += size_inc
            elif op['Opcode'] == bytecblock_opcode:
                size_inc, found_bytearrays = read_byte_const_block(program, pc)
                bytearrays += found_bytearrays
                size += size_inc
            elif op['Opcode'] == pushint_opcode:
                size_inc, found_int = read_push_int_block(program, pc)
                ints.append(found_int)
                size += size_inc
            elif op['Opcode'] == pushbytes_opcode:
                size_inc, found_bytearray = read_push_byte_block(program, pc)
                bytearrays.append(found_bytearray)
                size += size_inc
            else:
                raise error.InvalidProgram("invalid instruction")
        pc += size

    if cost >= constants.logic_sig_max_cost:
        raise error.InvalidProgram("program too costly to run")

    return True, ints, bytearrays


def check_int_const_block(program, pc):
    size, _ = read_int_const_block(program, pc)
    return size


def read_int_const_block(program, pc):
    size = 1
    ints = []
    num_ints, bytes_used = parse_uvarint(program[pc + size:])
    if bytes_used <= 0:
        raise error.InvalidProgram(
            "could not decode int const block size at pc=%d" % (pc + size))
    size += bytes_used
    for i in range(0, num_ints):
        if pc + size >= len(program):
            raise error.InvalidProgram("intcblock ran past end of program")
        num, bytes_used = parse_uvarint(program[pc + size:])
        if bytes_used <= 0:
            raise error.InvalidProgram(
                "could not decode int const[%d] at pc=%d" % (i, pc + size))
        ints.append(num)
        size += bytes_used
    return size, ints


def check_byte_const_block(program, pc):
    size, _ = read_byte_const_block(program, pc)
    return size


def read_byte_const_block(program, pc):
    size = 1
    bytearrays = []
    num_ints, bytes_used = parse_uvarint(program[pc + size:])
    if bytes_used <= 0:
        raise error.InvalidProgram(
            "could not decode []byte const block size at pc=%d" % (pc + size))
    size += bytes_used
    for i in range(0, num_ints):
        if pc + size >= len(program):
            raise error.InvalidProgram("bytecblock ran past end of program")
        item_len, bytes_used = parse_uvarint(program[pc + size:])
        if bytes_used <= 0:
            raise error.InvalidProgram(
                "could not decode []byte const[%d] at pc=%d" % (i, pc + size))
        size += bytes_used
        if pc + size + item_len > len(program):
            raise error.InvalidProgram("bytecblock ran past end of program")
        bytearrays.append(program[pc+size:pc+size+item_len])
        size += item_len
    return size, bytearrays

def check_push_int_block(program, pc):
    size, _ = read_push_int_block(program, pc)
    return size

def read_push_int_block(program, pc):
    size = 1
    single_int, bytes_used = parse_uvarint(program[pc + size:])
    if bytes_used <= 0:
        raise error.InvalidProgram(
            "could not decode push int const at pc=%d" % (pc + size))
    size += bytes_used
    return size, single_int

def check_push_byte_block(program, pc):
    size, _ = read_push_byte_block(program, pc)
    return size

def read_push_byte_block(program, pc):
    size = 1
    item_len, bytes_used = parse_uvarint(program[pc + size:])
    if bytes_used <= 0:
        raise error.InvalidProgram(
            "could not decode push []byte const size at pc=%d" % (pc + size))
    size += bytes_used
    if pc + size + item_len > len(program):
        raise error.InvalidProgram("pushbytes ran past end of program")
    single_bytearray = program[pc+size:pc+size+item_len]
    size += item_len
    return size, single_bytearray

def parse_uvarint(buf):
    x = 0
    s = 0
    for i, b in enumerate(buf):
        if b < 0x80:
            if i > 9 or i == 9 and b > 1:
                return 0, -(i + 1)
            return x | int(b) << s, i + 1
        x |= int(b & 0x7f) << s
        s += 7

    return 0, 0


def address(program):
    """
    Return the address of the program.

    Args:
        program (bytes): compiled program

    Returns:
        str: program address
    """
    to_sign = constants.logic_prefix + program
    checksum = encoding.checksum(to_sign)
    return encoding.encode_address(checksum)


def teal_sign(private_key, data, contract_addr):
    """
    Return the signature suitable for ed25519verify TEAL opcode

    Args:
        private_key (str): private key to sign with
        data (bytes): data to sign
        contract_addr (str): program hash (contract address) to sign for

    Return:
        bytes: signature
    """
    private_key = base64.b64decode(private_key)
    signing_key = SigningKey(private_key[:constants.key_len_bytes])

    to_sign = constants.logic_data_prefix + encoding.decode_address(contract_addr) + data
    signed = signing_key.sign(to_sign)
    return signed.signature


def teal_sign_from_program(private_key, data, program):
    """
    Return the signature suitable for ed25519verify TEAL opcode

    Args:
        private_key (str): private key to sign with
        data (bytes): data to sign
        program (bytes): program to sign for

    Return:
        bytes: signature
    """

    return teal_sign(private_key, data, address(program))
