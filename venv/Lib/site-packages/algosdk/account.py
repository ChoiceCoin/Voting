from nacl.signing import SigningKey
import base64
from . import encoding, constants


def generate_account():
    """
    Generate an account.

    Returns:
        (str, str): private key, account address
    """
    sk = SigningKey.generate()
    vk = sk.verify_key
    a = encoding.encode_address(vk.encode())
    private_key = base64.b64encode(sk.encode() + vk.encode()).decode()
    return private_key, a


def address_from_private_key(private_key):
    """
    Return the address for the private key.

    Args:
        private_key (str): private key of the account in base64

    Returns:
        str: address of the account
    """
    pk = base64.b64decode(private_key)[constants.key_len_bytes:]
    address = encoding.encode_address(pk)
    return address
