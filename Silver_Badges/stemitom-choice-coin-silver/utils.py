import hashlib
from decouple import config

secret_key = config('SECRET_KEY')

def hashing(item):
    hash_object = hashlib.sha512(item.encode()) # This encodes the string with the SHA-512 scheme.
    return hash_object.hexdigest()

def check_secret_authentication(key):
    return hashing(key) == secret_key
