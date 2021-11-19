import base64
import msgpack
from collections import OrderedDict
from Cryptodome.Hash import SHA512
from . import transaction, error, auction, constants, future


def msgpack_encode(obj):
    """
    Encode the object using canonical msgpack.

    Args:
        obj (Transaction, SignedTransaction, MultisigTransaction, Multisig,\
            Bid, or SignedBid): object to be encoded

    Returns:
        str: msgpack encoded object

    Note:
        Canonical Msgpack: maps must contain keys in lexicographic order; maps
        must omit key-value pairs where the value is a zero-value; positive
        integer values must be encoded as "unsigned" in msgpack, regardless of
        whether the value space is semantically signed or unsigned; integer
        values must be represented in the shortest possible encoding; binary
        arrays must be represented using the "bin" format family (that is, use
        the most recent version of msgpack rather than the older msgpack
        version that had no "bin" family).
    """
    d = obj
    if not isinstance(obj, dict):
        d = obj.dictify()
    od = _sort_dict(d)
    return base64.b64encode(msgpack.packb(od, use_bin_type=True)).decode()


def _sort_dict(d):
    """
    Sorts a dictionary recursively and removes all zero values.

    Args:
        d (dict): dictionary to be sorted

    Returns:
        OrderedDict: sorted dictionary with no zero values
    """
    od = OrderedDict()
    for k, v in sorted(d.items()):
        if isinstance(v, dict):
            od[k] = _sort_dict(v)
        elif v:
            od[k] = v
    return od


def future_msgpack_decode(enc):
    """
    Decode a msgpack encoded object from a string.

    Args:
        enc (str): string to be decoded

    Returns:
        Transaction, SignedTransaction, Multisig, Bid, or SignedBid:\
            decoded object
    """
    decoded = enc
    if not isinstance(enc, dict):
        decoded = msgpack.unpackb(base64.b64decode(enc), raw=False)
    if "type" in decoded:
        return future.transaction.Transaction.undictify(decoded)
    if "l" in decoded:
        return future.transaction.LogicSig.undictify(decoded)
    if "msig" in decoded:
        return future.transaction.MultisigTransaction.undictify(decoded)
    if "lsig" in decoded:
        return future.transaction.LogicSigTransaction.undictify(decoded)
    if "sig" in decoded:
        return future.transaction.SignedTransaction.undictify(decoded)
    if "txn" in decoded:
        return future.transaction.Transaction.undictify(decoded["txn"])
    if "subsig" in decoded:
        return future.transaction.Multisig.undictify(decoded)
    if "txlist" in decoded:
        return future.transaction.TxGroup.undictify(decoded)
    if "t" in decoded:
        return auction.NoteField.undictify(decoded)
    if "bid" in decoded:
        return auction.SignedBid.undictify(decoded)
    if "auc" in decoded:
        return auction.Bid.undictify(decoded)

def msgpack_decode(enc):
    """
    Decode a msgpack encoded object from a string.

    Args:
        enc (str): string to be decoded

    Returns:
        Transaction, SignedTransaction, Multisig, Bid, or SignedBid:\
            decoded object
    """
    decoded = enc
    if not isinstance(enc, dict):
        decoded = msgpack.unpackb(base64.b64decode(enc), raw=False)
    if "type" in decoded:
        return transaction.Transaction.undictify(decoded)
    if "l" in decoded:
        return transaction.LogicSig.undictify(decoded)
    if "msig" in decoded:
        return transaction.MultisigTransaction.undictify(decoded)
    if "lsig" in decoded:
        return transaction.LogicSigTransaction.undictify(decoded)
    if "sig" in decoded:
        return transaction.SignedTransaction.undictify(decoded)
    if "txn" in decoded:
        return transaction.Transaction.undictify(decoded["txn"])
    if "subsig" in decoded:
        return transaction.Multisig.undictify(decoded)
    if "txlist" in decoded:
        return transaction.TxGroup.undictify(decoded)
    if "t" in decoded:
        return auction.NoteField.undictify(decoded)
    if "bid" in decoded:
        return auction.SignedBid.undictify(decoded)
    if "auc" in decoded:
        return auction.Bid.undictify(decoded)


def is_valid_address(addr):
    """
    Check if the string address is a valid Algorand address.

    Args:
        addr (str): base32 address

    Returns:
        bool: whether or not the address is valid
    """
    if not isinstance(addr, str):
        return False
    if not len(_undo_padding(addr)) == constants.address_len:
        return False
    try:
        decoded = decode_address(addr)
        if isinstance(decoded, str):
            return False
        return True
    except:
        return False


def decode_address(addr):
    """
    Decode a string address into its address bytes and checksum.

    Args:
        addr (str): base32 address

    Returns:
        bytes: address decoded into bytes

    """
    if not addr:
        return addr
    if not len(addr) == constants.address_len:
        raise error.WrongKeyLengthError
    decoded = base64.b32decode(_correct_padding(addr))
    addr = decoded[:-constants.check_sum_len_bytes]
    expected_checksum = decoded[-constants.check_sum_len_bytes:]
    chksum = _checksum(addr)

    if chksum == expected_checksum:
        return addr
    else:
        raise error.WrongChecksumError


def encode_address(addr_bytes):
    """
    Encode a byte address into a string composed of the encoded bytes and the
    checksum.

    Args:
        addr_bytes (bytes): address in bytes

    Returns:
        str: base32 encoded address
    """
    if not addr_bytes:
        return addr_bytes
    if not len(addr_bytes) == constants.key_len_bytes:
        raise error.WrongKeyBytesLengthError
    chksum = _checksum(addr_bytes)
    addr = base64.b32encode(addr_bytes+chksum)
    return _undo_padding(addr.decode())


def _checksum(addr):
    """
    Compute the checksum of size checkSumLenBytes for the address.

    Args:
        addr (bytes): address in bytes

    Returns:
        bytes: checksum of the address
    """
    return checksum(addr)[-constants.check_sum_len_bytes:]


def _correct_padding(a):
    if len(a) % 8 == 0:
        return a
    return a + "="*(8-len(a) % 8)


def _undo_padding(a):
    return a.strip("=")


def checksum(data):
    """
    Compute the checksum of arbitrary binary input.

    Args:
        data (bytes): data as bytes

    Returns:
        bytes: checksum of the data
    """
    chksum = SHA512.new(truncate="256")
    chksum.update(data)
    return chksum.digest()
