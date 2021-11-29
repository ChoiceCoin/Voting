from . import mnemonic


class Wallet:
    """
    Represents a wallet.

    Args:
        wallet_name (str): wallet name
        wallet_pswd (str): wallet password
        kmd_client (KMDClient): a KMDClient to handle wallet requests
        mdk (str, optional): master derivation key if recovering wallet

    Note:
        When initializing, if the wallet doesn't already exist, it will be
        created.

    Attributes:
        name (str)
        pswd (str)
        kcl (KMDClient)
        id (str)
        handle (str)
    """

    def __init__(self, wallet_name, wallet_pswd, kmd_client,
                 driver_name="sqlite", mdk=None):
        self.name = wallet_name
        self.pswd = wallet_pswd
        self.kcl = kmd_client
        self.id = None

        wallets = self.kcl.list_wallets()
        for w in wallets:
            if w["name"] == self.name:
                self.id = w["id"]
        if not self.id:
            w = self.kcl.create_wallet(self.name, self.pswd, driver_name,
                                       master_deriv_key=mdk)
            self.id = w["id"]
        self.handle = self.kcl.init_wallet_handle(self.id, self.pswd)

    def info(self):
        """
        Get wallet information.

        Returns:
            dict: dictionary containing wallet handle and wallet information
        """
        self.automate_handle()
        return self.kcl.get_wallet(self.handle)

    def list_keys(self):
        """
        List all keys in the wallet.

        Returns:
            str[]: list of base32 addresses in the wallet
        """
        self.automate_handle()
        return self.kcl.list_keys(self.handle)

    def rename(self, new_name):
        """
        Rename the wallet.

        Args:
            new_name (str) : new name for the wallet

        Returns:
            dict: dictionary containing wallet information
        """
        resp = self.kcl.rename_wallet(self.id, self.pswd, new_name)
        self.name = new_name
        return resp

    def get_mnemonic(self):
        """
        Get recovery phrase mnemonic for the wallet.

        Returns:
            str: mnemonic converted from the wallet's master derivation key
        """
        mdk = self.export_master_derivation_key()
        return mnemonic.from_master_derivation_key(mdk)

    def export_master_derivation_key(self):
        """
        Get the wallet's master derivation key.

        Returns:
            str: master derivation key
        """
        self.automate_handle()
        return self.kcl.export_master_derivation_key(self.handle, self.pswd)

    def import_key(self, private_key):
        """
        Import an account into a wallet.

        Args:
            private_key (str): private key of account to be imported

        Returns:
            str: base32 address of the account
        """
        self.automate_handle()
        return self.kcl.import_key(self.handle, private_key)

    def export_key(self, address):
        """
        Return an account private key.

        Args:
            address (str): base32 address of the account

        Returns:
            str: private key
        """
        self.automate_handle()
        return self.kcl.export_key(self.handle, self.pswd, address)

    def generate_key(self, display_mnemonic=True):
        """
        Generate a key in the wallet.

        Args:
            display_mnemonic (bool, optional): whether or not the mnemonic
                should be displayed

        Returns:
            str: base32 address of the generated account
        """
        self.automate_handle()
        return self.kcl.generate_key(self.handle)

    def delete_key(self, address):
        """
        Delete a key in the wallet.

        Args:
            address (str): base32 address of account to be deleted

        Returns:
            bool: True if the account has been deleted
        """
        self.automate_handle()
        return self.kcl.delete_key(self.handle, self.pswd, address)

    def sign_transaction(self, txn):
        """
        Sign a transaction.

        Args:
            txn (Transaction): transaction to be signed

        Returns:
            SignedTransaction: signed transaction with signature of sender
        """
        self.automate_handle()
        return self.kcl.sign_transaction(self.handle, self.pswd, txn)

    def list_multisig(self):
        """
        List all multisig accounts in the wallet.

        Returns:
            str[]: list of base32 multisig account addresses
        """
        self.automate_handle()
        return self.kcl.list_multisig(self.handle)

    def import_multisig(self, multisig):
        """
        Import a multisig account into the wallet.

        Args:
            multisig (Multisig): multisig account to be imported

        Returns:
            str: base32 address of the imported multisig account
        """
        self.automate_handle()
        return self.kcl.import_multisig(self.handle, multisig)

    def export_multisig(self, address):
        """
        Export a multisig account.

        Args:
            address (str): base32 address of the multisig account

        Returns:
            Multisig: multisig object corresponding to the address
        """
        self.automate_handle()
        return self.kcl.export_multisig(self.handle, address)

    def delete_multisig(self, address):
        """
        Delete a multisig account.

        Args:
            address (str): base32 address of the multisig account to delete

        Returns:
            bool: True if the multisig account has been deleted
        """
        self.automate_handle()
        return self.kcl.delete_multisig(self.handle, self.pswd, address)

    def sign_multisig_transaction(self, public_key, mtx):
        """
        Sign a multisig transaction for the given public key.

        Args:
            public_key (str): base32 address that is signing the transaction
            mtx (MultisigTransaction): object containing unsigned or
                partially signed multisig

        Returns:
            MultisigTransaction: multisig transaction with added signature
        """
        self.automate_handle()
        return self.kcl.sign_multisig_transaction(self.handle, self.pswd,
                                                  public_key, mtx)

    def automate_handle(self):
        """
        Get a new handle or renews the current one.

        Returns:
            bool: True if a handle is active
        """
        if self.handle is None:
            self.init_handle()
        else:
            try:
                self.renew_handle()
            except:
                self.init_handle()
        return True

    def init_handle(self):
        """
        Get a new handle.

        Returns:
            bool: True if a handle is active
        """
        self.handle = self.kcl.init_wallet_handle(self.id, self.pswd)
        return True

    def renew_handle(self):
        """
        Renew the current handle.

        Returns:
            dict: dictionary containing wallet handle and wallet information
        """
        resp = self.kcl.renew_wallet_handle(self.handle)
        return resp

    def release_handle(self):
        """
        Deactivate the current handle.

        Returns:
            bool: True if the handle has been deactivated
        """
        resp = self.kcl.release_wallet_handle(self.handle)
        self.handle = None
        return resp
