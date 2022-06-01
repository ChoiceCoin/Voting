from algosdk.v2client import algod

from helpers import (
    calculate_votes,
    create_option_account,
    mnemonic,
    validate_escrow_wallet,
    vote,
    wait_for_x_secs,
    winner,
)

ALGOD_ADDRESS = "https://testnet.algoexplorerapi.io"
ALGOD_TOKEN = ""
headers = {"User-Agent": "Blank!"}
client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, headers)


def main():
    """Entrypoint for the application."""
    escrow_address = str(input("Enter escrow address: "))
    escrow_mnemonic = str(
        input("Enter escrow mnemonic (Each word should be separate by whitespace): ")
    )

    is_valid = validate_escrow_wallet(escrow_address, escrow_mnemonic, client)
    if not is_valid:
        print("Wallet does not meet the requirements.")
    else:
        escrow_private_key = mnemonic.to_private_key(escrow_mnemonic)

        option_one_address = create_option_account(escrow_private_key, escrow_address, client)
        option_zero_address = create_option_account(escrow_private_key, escrow_address, client)

        vote(escrow_private_key, escrow_address, option_zero_address, option_one_address, client)

        wait_for_x_secs(5)

        option_one_count, option_zero_count = calculate_votes(
            [option_one_address, option_zero_address], client
        )

        winner(option_zero_count, option_one_count)


main()
