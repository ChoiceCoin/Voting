#this script implemented in algo-django_sdk is necessary for connecting wallet, making transactions, viewing processed transactions on algoexplorer

import base64
import io
import os
import subprocess
from pathlib import Path

from algosdk import account, kmd, mnemonic
from algosdk.constants import microalgos_to_algos_ratio, min_txn_fee
from algosdk.error import WrongChecksumError, WrongMnemonicLengthError
from algosdk.future.transaction import AssetConfigTxn, PaymentTxn
from algosdk.v2client import algod, indexer
from algosdk.wallet import Wallet

INITIAL_FUNDS = 1000000000  # in microAlgos


## SANDBOX
def _call_sandbox_command(*args):
    """Call and return sandbox command composed from provided arguments."""
    return subprocess.Popen(
        [_sandbox_executable(), *args],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def _sandbox_executable():
    """Return full path to Algorand's sandbox executable.
    The location of sandbox directory is retrieved either from the SANDBOX_DIR
    environment variable or if it's not set then the location of sandbox directory
    is implied to be the sibling of this Django project in the directory tree.
    """
    sandbox_dir = os.environ.get("SANDBOX_DIR") or str(
        Path(__file__).resolve().parent.parent.parent / "sandbox"
    )
    return sandbox_dir + "/sandbox"


def cli_passphrase_for_account(address):
    """Return passphrase for provided address."""
    process = _call_sandbox_command("goal", "account", "export", "-a", address)
    passphrase = ""
    output = [line for line in io.TextIOWrapper(process.stdout)]
    for line in output:
        parts = line.split('"')
        if len(parts) > 1:
            passphrase = parts[1]
    if passphrase == "":
        raise ValueError(
            "Can't retrieve passphrase from the address: %s\nOutput: %s"
            % (address, output)
        )
    return passphrase


## CLIENTS
def _algod_client():
    """Instantiate and return Algod client object."""
    algod_address = "http://localhost:4001"
    algod_token = ""    #input choice-coin token here
    return algod.AlgodClient(algod_token, algod_address)


def _indexer_client():
    """Instantiate and return Indexer client object."""
    indexer_address = "http://localhost:8980"
    indexer_token = ""  #input indexer token here
    return indexer.IndexerClient(indexer_token, indexer_address)


def _kmd_client():
    """Instantiate and return kmd client object."""
    kmd_address = "http://localhost:4002"
    kmd_token = ""  #kmd token
    return kmd.KMDClient(kmd_token, kmd_address)


## TRANSACTIONS
def _wait_for_confirmation(client, transaction_id, timeout):
    """
    Wait until the transaction is confirmed or rejected, or until 'timeout'
    number of rounds have passed.
    Args:
        transaction_id (str): the transaction to wait for
        timeout (int): maximum number of rounds to wait
    Returns:
        dict: pending transaction information, or throws an error if the transaction
            is not confirmed or rejected in the next timeout rounds
    """
    start_round = client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + timeout:
        try:
            pending_txn = client.pending_transaction_info(transaction_id)
        except Exception:
            return
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:
            raise Exception("pool error: {}".format(pending_txn["pool-error"]))
        client.status_after_block(current_round)
        current_round += 1
    raise Exception(
        "pending tx not found in timeout rounds, timeout value = : {}".format(timeout)
    )


def add_transaction(sender, receiver, passphrase, amount, note):
    """Create and sign transaction from provided arguments.
    Returned non-empty tuple carries field where error was raised and description.
    If the first item is None then the error is non-field/integration error.
    Returned two-tuple of empty strings marks successful transaction.
    """

    client = _algod_client()
    params = client.suggested_params()
    unsigned_txn = PaymentTxn(sender, params, receiver, amount, None, note.encode())
    try:
        signed_txn = unsigned_txn.sign(mnemonic.to_private_key(passphrase))
    except WrongChecksumError:
        return "passphrase", "Checksum failed to validate"
    except ValueError:
        return "passphrase", "Unknown word in passphrase"

    try:
        transaction_id = client.send_transaction(signed_txn)
        _wait_for_confirmation(client, transaction_id, 4)
    except Exception as err:
        return None, err  # None implies non-field error
    return "", ""


## CREATING
def add_asset(data):
    """Create asset from provided data dictionary."""
    client = _algod_client()
    params = client.suggested_params()
    unsigned_txn = AssetConfigTxn(
        sp=params,
        sender=data.get("creator"),
        asset_name=data.get("name"),
        unit_name=data.get("unit"),
        total=data.get("total"),
        decimals=data.get("decimals"),
        default_frozen=data.get("frozen"),
        url=data.get("url"),
        manager=data.get("manager"),
        reserve=data.get("reserve"),
        freeze=data.get("freeze"),
        clawback=data.get("clawback"),
        strict_empty_address_check=False,
    )
    # Sign with secret key of creator
    try:
        signed_txn = unsigned_txn.sign(mnemonic.to_private_key(data.get("passphrase")))
    except WrongMnemonicLengthError as err:
        return None, err

    try:
        transaction_id = client.send_transaction(signed_txn)
        _wait_for_confirmation(client, transaction_id, 4)
    except Exception as err:
        return None, err

    try:
        info = client.pending_transaction_info(transaction_id)
        asset_id = info.get("asset-index")
        return asset_id, ""

    except Exception as err:
        return None, err


## RETRIEVING
def account_balance(address):
    """Return funds balance of the account having provided address."""
    account_info = _algod_client().account_info(address)
    return account_info.get("amount")


def account_transactions(address):
    """Return all transactions involving provided address."""
    transactions = (
        _indexer_client()
        .search_transactions_by_address(address)
        .get("transactions", [])
    )
    return [
        {
            "id": tr.get("id"),
            "round": tr.get("confirmed-round"),
            "type": tr.get("tx-type"),
            "sender": tr.get("sender"),
            "receiver": tr.get("payment-transaction", {}).get("receiver"),
            "amount": tr.get("payment-transaction", {}).get("amount"),
            "note": base64.b64decode(tr.get("note", "")).decode("utf-8"),
        }
        for tr in transactions
    ]


def get_wallet(name, password):
    """Return wallet object from provided arguments."""
    return Wallet(name, password, _kmd_client())


def initial_funds_sender():
    """Get the address of initially created account having enough funds.
    Such an account is used to transfer initial funds for the accounts
    created in this tutorial.
    """
    return next(
        (
            account.get("address")
            for account in _indexer_client().accounts().get("accounts", [{}, {}])
            if account.get("created-at-round") == 0
            and account.get("status") == "Offline"
            and account.get("amount")
            > INITIAL_FUNDS + microalgos_to_algos_ratio / 10 + min_txn_fee
        ),
        None,
    )


def passphrase_from_private_key(private_key):
    """Return passphrase from provided private key."""
    return mnemonic.from_private_key(private_key)


def search_transactions(data):
    """Search transaction based on criteria from provided data."""
    criteria = {key: val for key, val in data.items() if val != ""}
    transactions = (
        _indexer_client().search_transactions(**criteria).get("transactions", [])
    )
    # Decode notes to human-readable strings before returning the list
    for tr in transactions:
        tr["note"] = base64.b64decode(tr.get("note", "")).decode("utf-8")
    return transactions