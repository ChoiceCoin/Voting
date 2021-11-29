"""
Contains useful constants.
"""

kmd_auth_header = "X-KMD-API-Token"
"""str: header key for kmd requests"""
algod_auth_header = "X-Algo-API-Token"
"""str: header key for algod requests"""
indexer_auth_header = "X-Indexer-API-Token"
"""str: header key for indexer requests"""
unversioned_paths = ["/health", "/versions", "/metrics", "/genesis"]
"""str[]: paths that don't use the version path prefix"""
no_auth = []
"""str[]: requests that don't require authentication"""


# transaction types
payment_txn = "pay"
"""str: indicates a payment transaction"""
keyreg_txn = "keyreg"
"""str: indicates a key registration transaction"""
assetconfig_txn = "acfg"
"""str: indicates an asset configuration transaction"""
assetfreeze_txn = "afrz"
"""str: indicates an asset freeze transaction"""
assettransfer_txn = "axfer"
"""str: indicates an asset transfer transaction"""
appcall_txn = "appl"
"""str: indicates an app call transaction, allows creating, deleting, and interacting with an application"""

# note field types
note_field_type_deposit = "d"
"""str: indicates a signed deposit in NoteField"""
note_field_type_bid = "b"
"""str: indicates a signed bid in NoteField"""
note_field_type_settlement = "s"
"""str: indicates a signed settlement in NoteField"""
note_field_type_params = "p"
"""str: indicates signed params in NoteField"""

# prefixes
txid_prefix = b"TX"
"""bytes: transaction prefix when signing"""
tgid_prefix = b"TG"
"""bytes: transaction group prefix when computing the group ID"""
bid_prefix = b"aB"
"""bytes: bid prefix when signing"""
bytes_prefix = b"MX"
"""bytes: bytes prefix when signing"""
msig_addr_prefix = "MultisigAddr"
"""str: prefix for multisig addresses"""
logic_prefix = b"Program"
"""bytes: program (logic) prefix when signing"""
logic_data_prefix = b"ProgData"
"""bytes: program (logic) data prefix when signing"""


hash_len = 32
"""int: how long various hash-like fields should be"""
check_sum_len_bytes = 4
"""int: how long checksums should be"""
key_len_bytes = 32
"""int: how long addresses are in bytes"""
address_len = 58
"""int: how long addresses are in base32, including the checksum"""
mnemonic_len = 25
"""int: how long mnemonic phrases are"""
min_txn_fee = 1000
"""int: minimum transaction fee"""
microalgos_to_algos_ratio = 1000000
"""int: how many microalgos per algo"""
metadata_length = 32
"""int: length of asset metadata"""
note_max_length = 1024
"""int: maximum length of note field"""
lease_length = 32
"""int: byte length of leases"""
multisig_account_limit = 255
"""int: maximum number of addresses in a multisig account"""
tx_group_limit = 16
"""int: maximum number of transaction in a transaction group"""
max_asset_decimals = 19
"""int: maximum value for decimals in assets"""

# logic sig related
logic_sig_max_cost = 20000
"""int: max execution cost of a teal program"""
logic_sig_max_size = 1000
"""int: max size of a teal program and its arguments in bytes"""
