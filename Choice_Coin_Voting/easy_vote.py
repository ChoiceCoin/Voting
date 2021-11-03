# Copyright Fortior Blockchain, LLLP 2021
# Apache License
# This is a work in progress to create a simplified backend voting architecture.
# This software is under construction.
from typing import Tuple

from algosdk import account, mnemonic
from algosdk.encoding import is_valid_address
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod

# Put Algod Client address here
algod_address = "https://testnet-algorand.api.purestake.io/ps2"

# Put Algod Token here
# Algod Token can be gotten from https://developer.purestake.io/
algod_token = ""
headers = {
    "X-API-Key": algod_token,
}

# Initializes client for node.
algod_client = algod.AlgodClient(algod_token, algod_address, headers)

# Choice Asset ID.
asset = 21364625

# Escrow Address
# Make sure the address is funded and is opted in to choice
# escrow_address = ""
# escrow_mnemonic = ""

# Option 1 Address
# Do not bother filling this. They are generated automatically!
# option_one_address = ""
# option_one_private_key = ""

# Option 0 Address
# Do not bother filling this. They are generated automatically!
# option_zero_address = ""
# option_zero_private_key = ""


def create_option_account(escrow_private_key: str, escrow_address: str) -> str:
    """Creates an account for option."""
    private_key, address = generate_address()

    is_successful = fund_address(1000000, address, escrow_address, escrow_private_key)
    if not is_successful:
        raise Exception("Funding Failed!")

    is_optin_successful = opt_in_to_choice(private_key, address)
    if not is_optin_successful:
        raise Exception("Choice Coin Opt In Failed!")

    return address


def generate_address() -> Tuple[str, str]:
    """Generate an address."""
    private_key, address = account.generate_account()

    return private_key, address


def validate_escrow_wallet(address: str, _mnemonic: str) -> bool:
    """Validate an escrow wallet to check it has sufficient funds and is opted in to Choice Coin."""
    if not is_valid_address(address):
        return False

    # compare the address to the address gotten from the mnemonic
    if account.address_from_private_key(mnemonic.to_private_key(_mnemonic)) != address:
        return False

    if not contains_choice_coin(address):
        return False

    if get_balance(address) < 1000:
        return False

    return True


def make_vote(sender, key, receiver, amount, comment):
    """This function is the same as the one found in `vote.py`"""
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, asset, note=comment)

    signature = transaction.sign(key)
    algod_client.send_transaction(signature)
    final = transaction.get_txid()
    return True, final


def get_balance(address):
    """Get the balance of a wallet."""

    account = algod_client.account_info(address)
    return account["amount"]


def fund_address(
    amount: int, recipient_address: str, escrow_address: str, escrow_private_key: str
) -> bool:
    """Fund an account with Algo."""
    suggested_params = algod_client.suggested_params()
    unsigned_transaction = PaymentTxn(
        escrow_address,
        suggested_params,
        recipient_address,
        amount,
        note="Initial Funding for Candidate Creation",
    )
    signed_transaction = unsigned_transaction.sign(escrow_private_key)

    try:
        transaction_id = algod_client.send_transaction(signed_transaction)
        # wait for the transaction to be confirmed.
        wait_for_transaction_confirmation(transaction_id)
    except Exception as err:
        print(err)
        return False
    return True


def opt_in_to_choice(private_key: str, address: str) -> bool:
    """Opt in a wallet to Choice Coin."""

    suggested_params = algod_client.suggested_params()

    if not contains_choice_coin(address):
        unsigned_transaction = AssetTransferTxn(address, suggested_params, address, 0, asset)
        signed_transaction = unsigned_transaction.sign(private_key)

        try:
            transaction_id = algod_client.send_transaction(signed_transaction)
            wait_for_transaction_confirmation(transaction_id)
        except Exception:
            return False

    return True


def wait_for_transaction_confirmation(transaction_id: str):
    """Wait until the transaction is confirmed or rejected, or until timeout snumber of rounds have passed."""

    TIMEOUT = 2
    start_round = algod_client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + TIMEOUT:
        try:
            pending_txn = algod_client.pending_transaction_info(transaction_id)
        except Exception:
            return
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:
            raise Exception("pool error: {}".format(pending_txn["pool-error"]))

        algod_client.status_after_block(current_round)
        current_round += 1
    raise Exception("pending tx not found in TIMEOUT rounds, TIMEOUT value = : {}".format(TIMEOUT))


def contains_choice_coin(address: str) -> bool:
    """Checks if the address is opted into Choice Coin."""
    account = algod_client.account_info(address)
    contains_choice = False

    for asset in account["assets"]:
        if asset["asset-id"] == asset:
            contains_choice = True
            break

    return contains_choice


def vote(escrow_private_key, escrow_address, option_zero_address, option_one_address):
    """Places a vote based on the input of the user."""
    voter = int(input("Vote 0 for zero and vote 1 for one:"))
    if voter == 1:
        make_vote(
            escrow_address,
            escrow_private_key,
            option_one_address,
            100,
            "Voting Powered by Choice Coin.",
        )
        print("Thanks for voting for one.")
    else:
        make_vote(
            escrow_address,
            escrow_private_key,
            option_zero_address,
            100,
            "Voting Powered by Choice Coin.",
        )
        print("Thanks for voting for zero.")


def calculate(addresses: list):
    """Calculate the result of the election."""
    results = []
    for addr in addresses:
        account_info = algod_client.account_info(addr)
        assets = account_info.get("assets")

        for _asset in assets:
            if _asset["asset-id"] == asset:
                amount = _asset.get("amount")
                results.append(amount)

    return results


def winner(option_zero_count, option_one_count):
    """Selects a winner based on the result."""
    if option_zero_count > option_one_count:
        print("Option zero wins.")
    else:
        print("Option one wins.")


def main():
    """Entrypoint for the application."""
    escrow_address = str(input("Enter escrow address: "))
    escrow_mnemonic = str(input("Enter escrow mnemonic: "))

    is_valid = validate_escrow_wallet(escrow_address, escrow_mnemonic)
    if not is_valid:
        print("Wallet does not match required specs.")
    else:
        escrow_private_key = mnemonic.to_private_key(escrow_mnemonic)

        option_one_address = create_option_account(escrow_private_key, escrow_address)
        option_zero_address = create_option_account(escrow_private_key, escrow_address)

        vote(escrow_private_key, escrow_address, option_zero_address, option_one_address)

        option_one_count, option_zero_count = calculate([option_one_address, option_zero_address])
        winner(option_zero_count, option_one_count)


main()
