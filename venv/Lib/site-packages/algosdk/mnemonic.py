from nacl import signing
import base64
from . import wordlist
from . import error
from . import constants
from . import encoding


word_to_index = {}
index_to_word = {}
for i, word in enumerate(wordlist.word_list_raw().split("\n")):
    index_to_word[i] = word
    # Put all prefixes of words at least four letters long into map,
    # since they are guarenteed unique, so some people may only save
    # that part, and expect to be able to recover.
    for length in range(4, len(word)):
        assert word[:length] not in word_to_index
        word_to_index[word[:length]] = i
    word_to_index[word] = i     # in case word is less than four letters long


def from_master_derivation_key(key):
    """
    Return the mnemonic for the master derivation key.

    Args:
        key (str): master derivation key in base64

    Returns:
        str: mnemonic

    """
    key = base64.b64decode(key)
    return _from_key(key)


def to_master_derivation_key(mnemonic):
    """
    Return the master derivation key for the mnemonic.

    Args:
        mnemonic (str): mnemonic of the master derivation key

    Returns:
        str: master derivation key in base64
    """
    key_bytes = _to_key(mnemonic)
    return base64.b64encode(key_bytes).decode()


def from_private_key(key):
    """
    Return the mnemonic for the private key.

    Args:
        key (str): private key in base64

    Returns:
        str: mnemonic
    """
    key = base64.b64decode(key)
    return _from_key(key[:constants.key_len_bytes])


def to_private_key(mnemonic):
    """
    Return the private key for the mnemonic.

    Args:
        mnemonic (str): mnemonic of the private key

    Returns:
        str: private key in base64
    """
    key_bytes = _to_key(mnemonic)
    key = signing.SigningKey(key_bytes)
    return base64.b64encode(key.encode() + key.verify_key.encode()).decode()


def to_public_key(mnemonic):
    """
    Return the public key for the mnemonic.

    Args:
        mnemonic (str): mnemonic of the public key

    Returns:
        str: public key in base32
    """
    key_bytes = _to_key(mnemonic)
    key = signing.SigningKey(key_bytes)
    return encoding.encode_address(key.verify_key.encode())


def _from_key(key):
    """
    Return the mnemonic for the key.

    Args:
        key (bytes): key to compute mnemonic of

    Returns:
        str: mnemonic
    """
    if not len(key) == constants.key_len_bytes:
        raise error.WrongKeyBytesLengthError
    chkword = index_to_word[_checksum(key)]
    nums = _to_11_bit(key)
    words = _apply_words(nums)
    return " ".join(words) + " " + chkword


def _to_key(mnemonic):
    """
    Give the corresponding key for the mnemonic.

    Args:
        mnemonic (str): mnemonic for the key

    Returns:
        bytes: key
    """
    mnemonic = mnemonic.lower().split()
    if not len(mnemonic) == constants.mnemonic_len:
        raise error.WrongMnemonicLengthError
    try:
        m_checksum = word_to_index[mnemonic[-1]]
        mnemonic = _from_words(mnemonic[:-1])
    except KeyError:            # We used to return ValueError, so keep it
        raise ValueError(mnemonic)
    m_bytes = _to_bytes(mnemonic)
    if not m_bytes[-1:len(m_bytes)] == b'\x00':
        raise error.WrongChecksumError
    chksum = _checksum(m_bytes[:constants.key_len_bytes])
    if chksum == m_checksum:
        return m_bytes[:constants.key_len_bytes]
    else:
        raise error.WrongChecksumError


def _checksum(data):
    """
    Compute the mnemonic checksum.

    Args:
        data (bytes): data to compute checksum of

    Returns:
        int: checksum
    """
    chksum = encoding.checksum(data)
    temp = chksum[0:2]
    nums = _to_11_bit(temp)
    return nums[0]


def _apply_words(nums):
    """
    Get the corresponding words for a list of 11-bit numbers.

    Args:
        nums (int[]): list of 11-bit numbers

    Returns:
        str[]: list of words
    """
    return [index_to_word[n] for n in nums]


def _from_words(words):
    """
    Get the corresponding 11-bit numbers for a list of words.

    Args:
        words (str[]): list of words

    Returns:
        int[]: list of 11-bit numbers
    """
    return [word_to_index[w] for w in words]


def _to_11_bit(data):
    """
    Convert a bytearray to an list of 11-bit numbers.

    Args:
        data (bytes): bytearray to convert to 11-bit numbers

    Returns:
        int[]: list of 11-bit numbers
    """
    buffer = 0
    num_of_bits = 0
    output = []
    for i in range(len(data)):
        buffer |= data[i] << num_of_bits
        num_of_bits += 8
        if num_of_bits >= 11:
            output.append(buffer & 2047)
            buffer = buffer >> 11
            num_of_bits -= 11
    if num_of_bits != 0:
        output.append(buffer & 2047)
    return output


def _to_bytes(nums):
    """
    Convert a list of 11-bit numbers to a bytearray.

    Args:
        nums (int[]): list of 11-bit numbers

    Returns:
        bytes: bytearray
    """
    buffer = 0
    num_of_bits = 0
    output = []
    for i in range(len(nums)):
        buffer |= nums[i] << num_of_bits
        num_of_bits += 11
        while num_of_bits >= 8:
            output.append(buffer & 255)
            buffer = buffer >> 8
            num_of_bits -= 8
    if num_of_bits != 0:
        output.append(buffer & 255)
    return bytes(output)
