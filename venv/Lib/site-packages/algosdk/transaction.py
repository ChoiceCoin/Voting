import base64
import msgpack
from collections import OrderedDict
from . import account
from . import constants
from . import encoding
from . import error
from . import logic
from . import future
from nacl.signing import SigningKey, VerifyKey
from nacl.exceptions import BadSignatureError


class Transaction:
    """
    Superclass for various transaction types.
    """
    def __init__(self, sender, fee, first, last, note, gen, gh, lease,
                 txn_type, rekey_to):
        self.sender = sender
        self.fee = fee
        self.first_valid_round = first
        self.last_valid_round = last
        self.note = note
        if self.note is not None:
            if not isinstance(self.note, bytes):
                raise error.WrongNoteType
            if len(self.note) > constants.note_max_length:
                raise error.WrongNoteLength
        self.genesis_id = gen
        self.genesis_hash = gh
        self.group = None
        self.lease = lease
        if self.lease is not None:
            if len(self.lease) != constants.lease_length:
                raise error.WrongLeaseLengthError
        self.type = txn_type
        self.rekey_to = rekey_to

    def get_txid(self):
        """
        Get the transaction's ID.

        Returns:
            str: transaction ID
        """
        txn = encoding.msgpack_encode(self)
        to_sign = constants.txid_prefix + base64.b64decode(txn)
        txid = encoding.checksum(to_sign)
        txid = base64.b32encode(txid).decode()
        return encoding._undo_padding(txid)

    def sign(self, private_key):
        """
        Sign the transaction with a private key.

        Args:
            private_key (str): the private key of the signing account

        Returns:
            SignedTransaction: signed transaction with the signature
        """
        sig = self.raw_sign(private_key)
        sig = base64.b64encode(sig).decode()
        authorizing_address = None
        if not (self.sender == account.address_from_private_key(private_key)):
            authorizing_address = account.address_from_private_key(private_key)
        stx = SignedTransaction(self, sig, authorizing_address)
        return stx

    def raw_sign(self, private_key):
        """
        Sign the transaction.

        Args:
            private_key (str): the private key of the signing account

        Returns:
            bytes: signature
        """
        private_key = base64.b64decode(private_key)
        txn = encoding.msgpack_encode(self)
        to_sign = constants.txid_prefix + base64.b64decode(txn)
        signing_key = SigningKey(private_key[:constants.key_len_bytes])
        signed = signing_key.sign(to_sign)
        sig = signed.signature
        return sig

    def estimate_size(self):
        sk, _ = account.generate_account()
        stx = self.sign(sk)
        return len(base64.b64decode(encoding.msgpack_encode(stx)))

    def dictify(self):
        d = dict()
        d["fee"] = self.fee
        if self.first_valid_round:
            d["fv"] = self.first_valid_round
        if self.genesis_id:
            d["gen"] = self.genesis_id
        d["gh"] = base64.b64decode(self.genesis_hash)
        if self.group:
            d["grp"] = self.group
        d["lv"] = self.last_valid_round
        if self.lease:
            d["lx"] = self.lease
        if self.note:
            d["note"] = self.note
        d["snd"] = encoding.decode_address(self.sender)
        d["type"] = self.type
        if self.rekey_to:
            d["rekey"] = encoding.decode_address(self.rekey_to)

        return d

    @staticmethod
    def undictify(d):
        args = {
            "sender": encoding.encode_address(d["snd"]),
            "fee": d["fee"],
            "first": d["fv"] if "fv" in d else 0,
            "last": d["lv"],
            "gh": base64.b64encode(d["gh"]).decode(),
            "note": d["note"] if "note" in d else None,
            "gen": d["gen"] if "gen" in d else None,
            "flat_fee": True,
            "lease": d["lx"] if "lx" in d else None,
            "rekey_to": encoding.encode_address(d["rekey"]) if "rekey" in d else None,
        }
        txn_type = d["type"]
        if not isinstance(d["type"], str):
            txn_type = txn_type.decode()
        if txn_type == constants.payment_txn:
            args.update(PaymentTxn._undictify(d))
            txn = PaymentTxn(**args)
        elif txn_type == constants.keyreg_txn:
            args.update(KeyregTxn._undictify(d))
            txn = KeyregTxn(**args)
        elif txn_type == constants.assetconfig_txn:
            args.update(AssetConfigTxn._undictify(d))
            txn = AssetConfigTxn(**args)
        elif txn_type == constants.assetfreeze_txn:
            args.update(AssetFreezeTxn._undictify(d))
            txn = AssetFreezeTxn(**args)
        elif txn_type == constants.assettransfer_txn:
            args.update(AssetTransferTxn._undictify(d))
            txn = AssetTransferTxn(**args)
        if "grp" in d:
            txn.group = d["grp"]
        return txn

    def __eq__(self, other):
        if not isinstance(other, (
                Transaction,
                future.transaction.Transaction)):
            return False
        return (self.sender == other.sender and
                self.fee == other.fee and
                self.first_valid_round == other.first_valid_round and
                self.last_valid_round == other.last_valid_round and
                self.genesis_hash == other.genesis_hash and
                self.genesis_id == other.genesis_id and
                self.note == other.note and
                self.group == other.group and
                self.lease == other.lease and
                self.type == other.type and
                self.rekey_to == other.rekey_to)


class PaymentTxn(Transaction):
    """
    Represents a payment transaction.

    Args:
        sender (str): address of the sender
        fee (int): transaction fee (per byte if flat_fee is false)
        first (int): first round for which the transaction is valid
        last (int): last round for which the transaction is valid
        gh (str): genesis_hash
        receiver (str): address of the receiver
        amt (int): amount in microAlgos to be sent
        close_remainder_to (str, optional): if nonempty, account will be closed
            and remaining algos will be sent to this address
        note (bytes, optional): arbitrary optional bytes
        gen (str, optional): genesis_id
        flat_fee (bool, optional): whether the specified fee is a flat fee
        lease (byte[32], optional): specifies a lease, and no other transaction
            with the same sender and lease can be confirmed in this
            transaction's valid rounds
        rekey_to (str, optional): additionally rekey the sender to this address

    Attributes:
        sender (str)
        fee (int)
        first_valid_round (int)
        last_valid_round (int)
        note (bytes)
        genesis_id (str)
        genesis_hash (str)
        group (bytes)
        receiver (str)
        amt (int)
        close_remainder_to (str)
        type (str)
        lease (byte[32])
        rekey_to (str)
    """

    def __init__(self, sender, fee, first, last, gh, receiver, amt,
                 close_remainder_to=None, note=None, gen=None, flat_fee=False,
                 lease=None, rekey_to=None):
        Transaction.__init__(self,  sender, fee, first, last, note, gen, gh,
                             lease, constants.payment_txn, rekey_to)
        if receiver:
            self.receiver = receiver
        else:
            raise error.ZeroAddressError
        self.amt = amt
        if (not isinstance(self.amt, int)) or self.amt < 0:
            raise error.WrongAmountType
        self.close_remainder_to = close_remainder_to
        if flat_fee:
            self.fee = max(constants.min_txn_fee, self.fee)
        else:
            self.fee = max(self.estimate_size()*self.fee,
                           constants.min_txn_fee)

    def dictify(self):
        d = dict()
        if self.amt:
            d["amt"] = self.amt
        if self.close_remainder_to:
            d["close"] = encoding.decode_address(self.close_remainder_to)
        
        decoded_receiver = encoding.decode_address(self.receiver)
        if any(decoded_receiver):
            d["rcv"] = encoding.decode_address(self.receiver)

        d.update(super(PaymentTxn, self).dictify())
        od = OrderedDict(sorted(d.items()))

        return od

    @staticmethod
    def _undictify(d):
        args = {
            "close_remainder_to": encoding.encode_address(
                d["close"]) if "close" in d else None,
            "amt": d["amt"] if "amt" in d else 0,
            "receiver": encoding.encode_address(
                d["rcv"]) if "rcv" in d else None
        }
        return args

    def __eq__(self, other):
        if not isinstance(other, (
                PaymentTxn,
                future.transaction.PaymentTxn)):
            return False
        return (super(PaymentTxn, self).__eq__(other) and
                self.receiver == other.receiver and
                self.amt == other.amt and
                self.close_remainder_to == other.close_remainder_to)


class KeyregTxn(Transaction):
    """
    Represents a key registration transaction.

    Args:
        sender (str): address of sender
        fee (int): transaction fee (per byte if flat_fee is false)
        first (int): first round for which the transaction is valid
        last (int): last round for which the transaction is valid
        gh (str): genesis_hash
        votekey (str): participation public key
        selkey (str): VRF public key
        votefst (int): first round to vote
        votelst (int): last round to vote
        votekd (int): vote key dilution
        note (bytes, optional): arbitrary optional bytes
        gen (str, optional): genesis_id
        flat_fee (bool, optional): whether the specified fee is a flat fee
        lease (byte[32], optional): specifies a lease, and no other transaction
            with the same sender and lease can be confirmed in this
            transaction's valid rounds
        rekey_to (str, optional): additionally rekey the sender to this address

    Attributes:
        sender (str)
        fee (int)
        first_valid_round (int)
        last_valid_round (int)
        note (bytes)
        genesis_id (str)
        genesis_hash (str)
        group(bytes)
        votepk (str)
        selkey (str)
        votefst (int)
        votelst (int)
        votekd (int)
        type (str)
        lease (byte[32])
        rekey_to (str)
    """

    def __init__(self, sender, fee, first, last, gh, votekey, selkey, votefst,
                 votelst, votekd, note=None, gen=None, flat_fee=False,
                 lease=None, rekey_to=None):
        Transaction.__init__(self, sender, fee, first, last, note, gen, gh,
                             lease, constants.keyreg_txn, rekey_to)
        self.votepk = votekey
        self.selkey = selkey
        self.votefst = votefst
        self.votelst = votelst
        self.votekd = votekd
        if flat_fee:
            self.fee = max(constants.min_txn_fee, self.fee)
        else:
            self.fee = max(self.estimate_size()*self.fee,
                           constants.min_txn_fee)

    def dictify(self):
        d = {
            "selkey": encoding.decode_address(self.selkey),
            "votefst": self.votefst,
            "votekd": self.votekd,
            "votekey": encoding.decode_address(self.votepk),
            "votelst": self.votelst
        }
        d.update(super(KeyregTxn, self).dictify())
        od = OrderedDict(sorted(d.items()))

        return od

    @staticmethod
    def _undictify(d):
        args = {
            "votekey": encoding.encode_address(d["votekey"]),
            "selkey": encoding.encode_address(d["selkey"]),
            "votefst": d["votefst"],
            "votelst": d["votelst"],
            "votekd": d["votekd"]
        }
        return args

    def __eq__(self, other):
        if not isinstance(other, (
                KeyregTxn,
                future.transaction.KeyregTxn)):
            return False
        return (super(KeyregTxn, self).__eq__(self, other) and
                self.votepk == other.votepk and
                self.selkey == other.selkey and
                self.votefst == other.votefst and
                self.votelst == other.votelst and
                self.votekd == other.votekd)


class AssetConfigTxn(Transaction):
    """
    Represents a transaction for asset creation, reconfiguration, or
    destruction.

    To create an asset, include the following:
        total, default_frozen, unit_name, asset_name,
        manager, reserve, freeze, clawback, url, metadata,
        decimals

    To destroy an asset, include the following:
        index, strict_empty_address_check (set to False)

    To update asset configuration, include the following:
        index, manager, reserve, freeze, clawback,
        strict_empty_address_check (optional)

    Args:
        sender (str): address of the sender
        fee (int): transaction fee (per byte if flat_fee is false)
        first (int): first round for which the transaction is valid
        last (int): last round for which the transaction is valid
        gh (str): genesis_hash
        index (int, optional): index of the asset
        total (int, optional): total number of base units of this asset created
        default_frozen (bool, optional): whether slots for this asset in user
            accounts are frozen by default
        unit_name (str, optional): hint for the name of a unit of this asset
        asset_name (str, optional): hint for the name of the asset
        manager (str, optional): address allowed to change nonzero addresses
            for this asset
        reserve (str, optional): account whose holdings of this asset should
            be reported as "not minted"
        freeze (str, optional): account allowed to change frozen state of
            holdings of this asset
        clawback (str, optional): account allowed take units of this asset
            from any account
        url (str, optional): a URL where more information about the asset
            can be retrieved
        metadata_hash (byte[32], optional): a commitment to some unspecified
            asset metadata (32 byte hash)
        note (bytes, optional): arbitrary optional bytes
        gen (str, optional): genesis_id
        flat_fee (bool, optional): whether the specified fee is a flat fee
        lease (byte[32], optional): specifies a lease, and no other transaction
            with the same sender and lease can be confirmed in this
            transaction's valid rounds
        strict_empty_address_check (bool, optional): set this to False if you
            want to specify empty addresses. Otherwise, if this is left as
            True (the default), having empty addresses will raise an error,
            which will prevent accidentally removing admin access to assets or
            deleting the asset.
        decimals (int, optional): number of digits to use for display after
            decimal. If set to 0, the asset is not divisible. If set to 1, the
            base unit of the asset is in tenths. Must be between 0 and 19,
            inclusive. Defaults to 0.
        rekey_to (str, optional): additionally rekey the sender to this address

    Attributes:
        sender (str)
        fee (int)
        first_valid_round (int)
        last_valid_round (int)
        genesis_hash (str)
        index (int)
        total (int)
        default_frozen (bool)
        unit_name (str)
        asset_name (str)
        manager (str)
        reserve (str)
        freeze (str)
        clawback (str)
        url (str)
        metadata_hash (byte[32])
        note (bytes)
        genesis_id (str)
        type (str)
        lease (byte[32])
        decimals (int)
        rekey_to (str)
    """

    def __init__(self, sender, fee, first, last, gh, index=None,
                 total=None, default_frozen=None, unit_name=None,
                 asset_name=None, manager=None, reserve=None,
                 freeze=None, clawback=None, url=None, metadata_hash=None,
                 note=None, gen=None, flat_fee=False, lease=None,
                 strict_empty_address_check=True, decimals=0, rekey_to=None):
        Transaction.__init__(self,  sender, fee, first, last, note, gen, gh,
                             lease, constants.assetconfig_txn, rekey_to)
        if strict_empty_address_check:
            if not (manager and reserve and freeze and clawback):
                raise error.EmptyAddressError
        self.index = index
        self.total = total
        self.default_frozen = default_frozen
        self.unit_name = unit_name
        self.asset_name = asset_name
        self.manager = manager
        self.reserve = reserve
        self.freeze = freeze
        self.clawback = clawback
        self.url = url
        self.metadata_hash = metadata_hash
        self.decimals = decimals
        if decimals < 0 or decimals > constants.max_asset_decimals:
            raise error.OutOfRangeDecimalsError
        if metadata_hash is not None:
            if len(metadata_hash) != constants.metadata_length:
                raise error.WrongMetadataLengthError
        if flat_fee:
            self.fee = max(constants.min_txn_fee, self.fee)
        else:
            self.fee = max(self.estimate_size()*self.fee,
                           constants.min_txn_fee)

    def dictify(self):
        d = dict()

        if (self.total or self.default_frozen or self.unit_name or
                self.asset_name or self.manager or self.reserve or
                self.freeze or self.clawback or self.decimals):
            apar = OrderedDict()
            if self.metadata_hash:
                apar["am"] = self.metadata_hash
            if self.asset_name:
                apar["an"] = self.asset_name
            if self.url:
                apar["au"] = self.url
            if self.clawback:
                apar["c"] = encoding.decode_address(self.clawback)
            if self.decimals:
                apar["dc"] = self.decimals
            if self.default_frozen:
                apar["df"] = self.default_frozen
            if self.freeze:
                apar["f"] = encoding.decode_address(self.freeze)
            if self.manager:
                apar["m"] = encoding.decode_address(self.manager)
            if self.reserve:
                apar["r"] = encoding.decode_address(self.reserve)
            if self.total:
                apar["t"] = self.total
            if self.unit_name:
                apar["un"] = self.unit_name
            d["apar"] = apar

        if self.index:
            d["caid"] = self.index

        d.update(super(AssetConfigTxn, self).dictify())
        od = OrderedDict(sorted(d.items()))

        return od

    @staticmethod
    def _undictify(d):
        index = None
        total = None
        default_frozen = None
        unit_name = None
        asset_name = None
        manager = None
        reserve = None
        freeze = None
        clawback = None
        url = None
        metadata_hash = None
        decimals = 0

        if "caid" in d:
            index = d["caid"]
        if "apar" in d:
            if "t" in d["apar"]:
                total = d["apar"]["t"]
            if "df" in d["apar"]:
                default_frozen = d["apar"]["df"]
            if "un" in d["apar"]:
                unit_name = d["apar"]["un"]
            if "an" in d["apar"]:
                asset_name = d["apar"]["an"]
            if "m" in d["apar"]:
                manager = encoding.encode_address(d["apar"]["m"])
            if "r" in d["apar"]:
                reserve = encoding.encode_address(d["apar"]["r"])
            if "f" in d["apar"]:
                freeze = encoding.encode_address(d["apar"]["f"])
            if "c" in d["apar"]:
                clawback = encoding.encode_address(d["apar"]["c"])
            if "au" in d["apar"]:
                url = d["apar"]["au"]
            if "am" in d["apar"]:
                metadata_hash = d["apar"]["am"]
            if "dc" in d["apar"]:
                decimals = d["apar"]["dc"]

        args = {
            "index": index,
            "total": total,
            "default_frozen": default_frozen,
            "unit_name": unit_name,
            "asset_name": asset_name,
            "manager": manager,
            "reserve": reserve,
            "freeze": freeze,
            "clawback": clawback,
            "url": url,
            "metadata_hash": metadata_hash,
            "strict_empty_address_check": False,
            "decimals": decimals
        }

        return args

    def __eq__(self, other):
        if not isinstance(other, (
                AssetConfigTxn,
                future.transaction.AssetConfigTxn)):
            return False
        return (super(AssetConfigTxn, self).__eq__(other) and
                self.index == other.index and
                self.total == other.total and
                self.default_frozen == other.default_frozen and
                self.unit_name == other.unit_name and
                self.asset_name == other.asset_name and
                self.manager == other.manager and
                self.reserve == other.reserve and
                self.freeze == other.freeze and
                self.clawback == other.clawback and
                self.url == other.url and
                self.metadata_hash == other.metadata_hash and
                self.decimals == other.decimals)


class AssetFreezeTxn(Transaction):
    """
    Represents a transaction for freezing or unfreezing an account's asset
    holdings. Must be issued by the asset's freeze manager.

    Args:
        sender (str): address of the sender, who must be the asset's freeze
            manager
        fee (int): transaction fee (per byte if flat_fee is false)
        first (int): first round for which the transaction is valid
        last (int): last round for which the transaction is valid
        gh (str): genesis_hash
        index (int): index of the asset
        target (str): address having its assets frozen or unfrozen
        new_freeze_state (bool): true if the assets should be frozen, false if
            they should be transferrable
        note (bytes, optional): arbitrary optional bytes
        gen (str, optional): genesis_id
        flat_fee (bool, optional): whether the specified fee is a flat fee
        lease (byte[32], optional): specifies a lease, and no other transaction
            with the same sender and lease can be confirmed in this
            transaction's valid rounds
        rekey_to (str, optional): additionally rekey the sender to this address

    Attributes:
        sender (str)
        fee (int)
        first_valid_round (int)
        last_valid_round (int)
        genesis_hash (str)
        index (int)
        target (str)
        new_freeze_state (bool)
        note (bytes)
        genesis_id (str)
        type (str)
        lease (byte[32])
        rekey_to (str)
    """

    def __init__(self, sender, fee, first, last, gh, index, target,
                 new_freeze_state, note=None, gen=None, flat_fee=False,
                 lease=None, rekey_to=None):
        Transaction.__init__(self, sender, fee, first, last, note, gen, gh,
                             lease, constants.assetfreeze_txn, rekey_to)
        self.index = index
        self.target = target
        self.new_freeze_state = new_freeze_state
        if flat_fee:
            self.fee = max(constants.min_txn_fee, self.fee)
        else:
            self.fee = max(self.estimate_size()*self.fee,
                           constants.min_txn_fee)

    def dictify(self):
        d = dict()
        if self.new_freeze_state:
            d["afrz"] = self.new_freeze_state

        d["fadd"] = encoding.decode_address(self.target)

        if self.index:
            d["faid"] = self.index

        d.update(super(AssetFreezeTxn, self).dictify())
        od = OrderedDict(sorted(d.items()))
        return od

    @staticmethod
    def _undictify(d):
        args = {
            "index": d["faid"],
            "new_freeze_state": d["afrz"] if "afrz" in d else False,
            "target": encoding.encode_address(d["fadd"])
        }

        return args

    def __eq__(self, other):
        if not isinstance(other, (
                AssetFreezeTxn,
                future.transaction.AssetFreezeTxn)):
            return False
        return (super(AssetFreezeTxn, self).__eq__(other) and
                self.index == other.index and
                self.target == other.target and
                self.new_freeze_state == other.new_freeze_state)


class AssetTransferTxn(Transaction):
    """
    Represents a transaction for asset transfer.
    To begin accepting an asset, supply the same address as both sender and
    receiver, and set amount to 0.
    To revoke an asset, set revocation_target, and issue the transaction from
    the asset's revocation manager account.

    Args:
        sender (str): address of the sender
        fee (int): transaction fee (per byte if flat_fee is false)
        first (int): first round for which the transaction is valid
        last (int): last round for which the transaction is valid
        gh (str): genesis_hash
        receiver (str): address of the receiver
        amt (int): amount of asset base units to send
        index (int): index of the asset
        close_assets_to (string, optional): send all of sender's remaining
            assets, after paying `amt` to receiver, to this address
        revocation_target (string, optional): send assets from this address,
            rather than the sender's address (can only be used by an asset's
            revocation manager, also known as clawback)
        note (bytes, optional): arbitrary optional bytes
        gen (str, optional): genesis_id
        flat_fee (bool, optional): whether the specified fee is a flat fee
        lease (byte[32], optional): specifies a lease, and no other transaction
            with the same sender and lease can be confirmed in this
            transaction's valid rounds
        rekey_to (str, optional): additionally rekey the sender to this address

    Attributes:
        sender (str)
        fee (int)
        first_valid_round (int)
        last_valid_round (int)
        genesis_hash (str)
        index (int)
        amount (int)
        receiver (string)
        close_assets_to (string)
        revocation_target (string)
        note (bytes)
        genesis_id (str)
        type (str)
        lease (byte[32])
        rekey_to (str)
    """

    def __init__(self, sender, fee, first, last, gh, receiver, amt, index,
                 close_assets_to=None, revocation_target=None, note=None,
                 gen=None, flat_fee=False, lease=None, rekey_to=None):
        Transaction.__init__(self,  sender, fee, first, last, note, gen, gh,
                             lease, constants.assettransfer_txn, rekey_to)
        if receiver:
            self.receiver = receiver
        else:
            raise error.ZeroAddressError
        self.amount = amt
        if (not isinstance(self.amount, int)) or self.amount < 0:
            raise error.WrongAmountType
        self.index = index
        self.close_assets_to = close_assets_to
        self.revocation_target = revocation_target
        if flat_fee:
            self.fee = max(constants.min_txn_fee, self.fee)
        else:
            self.fee = max(self.estimate_size()*self.fee,
                           constants.min_txn_fee)

    def dictify(self):
        d = dict()

        if self.amount:
            d["aamt"] = self.amount
        if self.close_assets_to:
            d["aclose"] = encoding.decode_address(self.close_assets_to)
        
        decoded_receiver = encoding.decode_address(self.receiver)
        if any(decoded_receiver):
            d["arcv"] = encoding.decode_address(self.receiver)

        if self.revocation_target:
            d["asnd"] = encoding.decode_address(self.revocation_target)

        if self.index:
            d["xaid"] = self.index

        d.update(super(AssetTransferTxn, self).dictify())
        od = OrderedDict(sorted(d.items()))

        return od

    @staticmethod
    def _undictify(d):
        args = {
            "receiver": encoding.encode_address(
                d["arcv"]) if "arcv" in d else None,
            "amt": d["aamt"] if "aamt" in d else 0,
            "index": d["xaid"] if "xaid" in d else None,
            "close_assets_to": encoding.encode_address(
                d["aclose"]) if "aclose" in d else None,
            "revocation_target": encoding.encode_address(
                d["asnd"]) if "asnd" in d else None
        }

        return args

    def __eq__(self, other):
        if not isinstance(other, (
                AssetTransferTxn,
                future.transaction.AssetTransferTxn)):
            return False
        return (super(AssetTransferTxn, self).__eq__(other) and
                self.index == other.index and
                self.amount == other.amount and
                self.receiver == other.receiver and
                self.close_assets_to == other.close_assets_to and
                self.revocation_target == other.revocation_target)


class SignedTransaction:
    """
    Represents a signed transaction.

    Args:
        transaction (Transaction): transaction that was signed
        signature (str): signature of a single address
        authorizing_address (str, optional): the address authorizing the signed transaction, if different from sender

    Attributes:
        transaction (Transaction)
        signature (str)
        authorizing_address (str)
    """
    def __init__(self, transaction, signature, authorizing_address=None):
        self.signature = signature
        self.transaction = transaction
        self.authorizing_address = authorizing_address

    def dictify(self):
        od = OrderedDict()
        if self.signature:
            od["sig"] = base64.b64decode(self.signature)
        od["txn"] = self.transaction.dictify()
        if self.authorizing_address:
            od["sgnr"] = encoding.decode_address(self.authorizing_address)
        return od

    @staticmethod
    def undictify(d):
        sig = None
        if "sig" in d:
            sig = base64.b64encode(d["sig"]).decode()
        auth = None
        if "sgnr" in d:
            auth = encoding.encode_address(d["sgnr"])
        txn = Transaction.undictify(d["txn"])
        stx = SignedTransaction(txn, sig, auth)
        return stx

    def __eq__(self, other):
        if not isinstance(other, (
                SignedTransaction,
                future.transaction.SignedTransaction)):
            return False
        return (self.transaction == other.transaction and
                self.signature == other.signature and
                self.authorizing_address == other.authorizing_address)


class MultisigTransaction:
    """
    Represents a signed transaction.

    Args:
        transaction (Transaction): transaction that was signed
        multisig (Multisig): multisig account and signatures

    Attributes:
        transaction (Transaction)
        multisig (Multisig)
    """
    def __init__(self, transaction, multisig):
        self.transaction = transaction
        self.multisig = multisig

    def sign(self, private_key):
        """
        Sign the multisig transaction.

        Args:
            private_key (str): private key of signing account

        Note:
            A new signature will replace the old if there is already a
            signature for the address. To sign another transaction, you can
            either overwrite the signatures in the current Multisig, or you
            can use Multisig.get_multisig_account() to get a new multisig
            object with the same addresses.
        """
        self.multisig.validate()
        addr = self.multisig.address()
        if not self.transaction.sender == addr:
            raise error.BadTxnSenderError
        index = -1
        public_key = base64.b64decode(bytes(private_key, "utf-8"))
        public_key = public_key[constants.key_len_bytes:]
        for s in range(len(self.multisig.subsigs)):
            if self.multisig.subsigs[s].public_key == public_key:
                index = s
                break
        if index == -1:
            raise error.InvalidSecretKeyError
        sig = self.transaction.raw_sign(private_key)
        self.multisig.subsigs[index].signature = sig

    def dictify(self):
        od = OrderedDict()
        if self.multisig:
            od["msig"] = self.multisig.dictify()
        od["txn"] = self.transaction.dictify()
        return od

    @staticmethod
    def undictify(d):
        msig = None
        if "msig" in d:
            msig = Multisig.undictify(d["msig"])
        txn = Transaction.undictify(d["txn"])
        mtx = MultisigTransaction(txn, msig)
        return mtx

    @staticmethod
    def merge(part_stxs):
        """
        Merge partially signed multisig transactions.

        Args:
            part_stxs (MultisigTransaction[]): list of partially signed
                multisig transactions

        Returns:
            MultisigTransaction: multisig transaction containing signatures

        Note:
            Only use this if you are given two partially signed multisig
            transactions. To append a signature to a multisig transaction, just
            use MultisigTransaction.sign()
        """
        ref_addr = None
        for stx in part_stxs:
            if not ref_addr:
                ref_addr = stx.multisig.address()
            elif not stx.multisig.address() == ref_addr:
                raise error.MergeKeysMismatchError
        msigstx = None
        for stx in part_stxs:
            if not msigstx:
                msigstx = stx
            else:
                for s in range(len(stx.multisig.subsigs)):
                    if stx.multisig.subsigs[s].signature:
                        if not msigstx.multisig.subsigs[s].signature:
                            msigstx.multisig.subsigs[s].signature = \
                                stx.multisig.subsigs[s].signature
                        elif not msigstx.multisig.subsigs[s].signature == \
                                stx.multisig.subsigs[s].signature:
                            raise error.DuplicateSigMismatchError
        return msigstx

    def __eq__(self, other):
        if not isinstance(other, (
                MultisigTransaction,
                future.transaction.MultisigTransaction)):
            return False
        return (self.transaction == other.transaction and
                self.multisig == other.multisig)


class Multisig:
    """
    Represents a multisig account and signatures.

    Args:
        version (int): currently, the version is 1
        threshold (int): how many signatures are necessary
        addresses (str[]): addresses in the multisig account

    Attributes:
        version (int)
        threshold (int)
        subsigs (MultisigSubsig[])
    """
    def __init__(self, version, threshold, addresses):
        self.version = version
        self.threshold = threshold
        self.subsigs = []
        for a in addresses:
            self.subsigs.append(MultisigSubsig(encoding.decode_address(a)))

    def validate(self):
        """Check if the multisig account is valid."""
        if not self.version == 1:
            raise error.UnknownMsigVersionError
        if (self.threshold <= 0 or len(self.subsigs) == 0 or
                self.threshold > len(self.subsigs)):
            raise error.InvalidThresholdError
        if len(self.subsigs) > constants.multisig_account_limit:
            raise error.MultisigAccountSizeError

    def address(self):
        """Return the multisig account address."""
        msig_bytes = (bytes(constants.msig_addr_prefix, "utf-8") +
                      bytes([self.version]) + bytes([self.threshold]))
        for s in self.subsigs:
            msig_bytes += s.public_key
        addr = encoding.checksum(msig_bytes)
        return encoding.encode_address(addr)

    def verify(self, message):
        """Verify that the multisig is valid for the message."""
        try:
            self.validate()
        except (error.UnknownMsigVersionError, error.InvalidThresholdError):
            return False
        counter = sum(map(lambda s: s.signature is not None, self.subsigs))
        if counter < self.threshold:
            return False

        verified_count = 0
        for subsig in self.subsigs:
            if subsig.signature is not None:
                verify_key = VerifyKey(subsig.public_key)
                try:
                    verify_key.verify(message, subsig.signature)
                    verified_count += 1
                except BadSignatureError:
                    return False

        if verified_count < self.threshold:
            return False

        return True

    def dictify(self):
        od = OrderedDict()
        od["subsig"] = [subsig.dictify() for subsig in self.subsigs]
        od["thr"] = self.threshold
        od["v"] = self.version
        return od

    def json_dictify(self):
        d = {
            "subsig": [subsig.json_dictify() for subsig in self.subsigs],
            "thr": self.threshold,
            "v": self.version
        }
        return d

    @staticmethod
    def undictify(d):
        subsigs = [MultisigSubsig.undictify(s) for s in d["subsig"]]
        msig = Multisig(d["v"], d["thr"], [])
        msig.subsigs = subsigs
        return msig

    def get_multisig_account(self):
        """Return a Multisig object without signatures."""
        msig = Multisig(self.version, self.threshold, self.get_public_keys())
        for s in msig.subsigs:
            s.signature = None
        return msig

    def get_public_keys(self):
        """Return the base32 encoded addresses for the multisig account."""
        pks = [encoding.encode_address(s.public_key) for s in self.subsigs]
        return pks

    def __eq__(self, other):
        if not isinstance(other, (
                Multisig,
                future.transaction.Multisig)):
            return False
        return (self.version == other.version and
                self.threshold == other.threshold and
                self.subsigs == other.subsigs)


class MultisigSubsig:
    """
    Attributes:
        public_key (bytes)
        signature (bytes)
    """
    def __init__(self, public_key, signature=None):
        self.public_key = public_key
        self.signature = signature

    def dictify(self):
        od = OrderedDict()
        od["pk"] = self.public_key
        if self.signature:
            od["s"] = self.signature
        return od

    def json_dictify(self):
        d = {
            "pk": base64.b64encode(self.public_key).decode()
        }
        if self.signature:
            d["s"] = base64.b64encode(self.signature).decode()
        return d

    @staticmethod
    def undictify(d):
        sig = None
        if "s" in d:
            sig = d["s"]
        mss = MultisigSubsig(d["pk"], sig)
        return mss

    def __eq__(self, other):
        if not isinstance(other, (
                MultisigSubsig,
                future.transaction.MultisigSubsig)):
            return False
        return (self.public_key == other.public_key and
                self.signature == other.signature)


class LogicSig:
    """
    Represents a logic signature.

    Arguments:
        logic (bytes): compiled program
        args (list[bytes]): args are not signed, but are checked by logic

    Attributes:
        logic (bytes)
        sig (bytes)
        msig (Multisig)
        args (list[bytes])
    """

    def __init__(self, program, args=None):
        if not program or not logic.check_program(program, args):
            raise error.InvalidProgram()
        self.logic = program
        self.args = args
        self.sig = None
        self.msig = None

    def dictify(self):
        od = OrderedDict()
        if self.args:
            od["arg"] = self.args
        od["l"] = self.logic
        if self.sig:
            od["sig"] = base64.b64decode(self.sig)
        elif self.msig:
            od["msig"] = self.msig.dictify()
        return od

    @staticmethod
    def undictify(d):
        lsig = LogicSig(d["l"], d.get("arg", None))
        if "sig" in d:
            lsig.sig = base64.b64encode(d["sig"]).decode()
        elif "msig" in d:
            lsig.msig = Multisig.undictify(d['msig'])
        return lsig

    def verify(self, public_key):
        """
        Verifies LogicSig against the transaction's sender address

        Args:
            public_key (bytes): sender address

        Returns:
            bool: true if the signature is valid (the sender address matches\
                the logic hash or the signature is valid against the sender\
                address), false otherwise
        """
        if self.sig and self.msig:
            return False

        try:
            logic.check_program(self.logic, self.args)
        except error.InvalidProgram:
            return False

        to_sign = constants.logic_prefix + self.logic

        if not self.sig and not self.msig:
            checksum = encoding.checksum(to_sign)
            return checksum == public_key

        if self.sig:
            verify_key = VerifyKey(public_key)
            try:
                verify_key.verify(to_sign, base64.b64decode(self.sig))
                return True
            except BadSignatureError:
                return False

        return self.msig.verify(to_sign)

    def address(self):
        """
        Compute hash of the logic sig program (that is the same as escrow
        account address) as string address

        Returns:
            str: program address
        """
        return logic.address(self.logic)

    @staticmethod
    def sign_program(program, private_key):
        private_key = base64.b64decode(private_key)
        signing_key = SigningKey(private_key[:constants.key_len_bytes])
        to_sign = constants.logic_prefix + program
        signed = signing_key.sign(to_sign)
        return base64.b64encode(signed.signature).decode()

    @staticmethod
    def single_sig_multisig(program, private_key, multisig):
        index = -1
        public_key = base64.b64decode(bytes(private_key, "utf-8"))
        public_key = public_key[constants.key_len_bytes:]
        for s in range(len(multisig.subsigs)):
            if multisig.subsigs[s].public_key == public_key:
                index = s
                break
        if index == -1:
            raise error.InvalidSecretKeyError
        sig = LogicSig.sign_program(program, private_key)

        return sig, index

    def sign(self, private_key, multisig=None):
        """
        Creates signature (if no pk provided) or multi signature

        Args:
            private_key (str): private key of signing account
            multisig (Multisig): optional multisig account without signatures
                to sign with

        Raises:
            InvalidSecretKeyError: if no matching private key in multisig\
                object
        """

        if not multisig:
            self.sig = LogicSig.sign_program(self.logic, private_key)
        else:
            sig, index = LogicSig.single_sig_multisig(self.logic, private_key,
                                                      multisig)
            multisig.subsigs[index].signature = base64.b64decode(sig)
            self.msig = multisig

    def append_to_multisig(self, private_key):
        """
        Appends a signature to multi signature

        Args:
            private_key (str): private key of signing account

        Raises:
            InvalidSecretKeyError: if no matching private key in multisig\
                object
        """

        if self.msig is None:
            raise error.InvalidSecretKeyError
        sig, index = LogicSig.single_sig_multisig(self.logic, private_key,
                                                  self.msig)
        self.msig.subsigs[index].signature = base64.b64decode(sig)

    def __eq__(self, other):
        if not isinstance(other, (
                LogicSig,
                future.transaction.LogicSig)):
            return False
        return (self.logic == other.logic and
                self.args == other.args and
                self.sig == other.sig and
                self.msig == other.msig)


class LogicSigTransaction:
    """
    Represents a logic signed transaction.

    Arguments:
        transaction (Transaction)
        lsig (LogicSig)

    Attributes:
        transaction (Transaction)
        lsig (LogicSig)
    """

    def __init__(self, transaction, lsig):
        self.transaction = transaction
        self.lsig = lsig

    def verify(self):
        """
        Verify LogicSig against the transaction

        Returns:
            bool: true if the signature is valid (the sender address matches\
                the logic hash or the signature is valid against the sender\
                address), false otherwise
        """
        public_key = encoding.decode_address(self.transaction.sender)
        return self.lsig.verify(public_key)

    def dictify(self):
        od = OrderedDict()
        if self.lsig:
            od["lsig"] = self.lsig.dictify()
        od["txn"] = self.transaction.dictify()
        return od

    @staticmethod
    def undictify(d):
        lsig = None
        if "lsig" in d:
            lsig = LogicSig.undictify(d["lsig"])
        txn = Transaction.undictify(d["txn"])
        lstx = LogicSigTransaction(txn, lsig)
        return lstx

    def __eq__(self, other):
        if not isinstance(other, (
                LogicSigTransaction,
                future.transaction.LogicSigTransaction)):
            return False
        return (self.lsig == other.lsig and
                self.transaction == other.transaction)


def write_to_file(objs, path, overwrite=True):
    """
    Write signed or unsigned transactions to a file.

    Args:
        txns (Transaction[], SignedTransaction[], or MultisigTransaction[]):
            can be a mix of the three
        path (str): file to write to
        overwrite (bool): whether or not to overwrite what's already in the
            file; if False, transactions will be appended to the file

    Returns:
        bool: true if the transactions have been written to the file
    """

    """
    Write objects to a file.
    Args:
        objs (Object[]): list of encodable objects
        path (str): file to write to
        overwrite (bool): whether or not to overwrite what's already in the
            file; if False, transactions will be appended to the file
    Returns:
        bool: true if the transactions have been written to the file
    """

    f = None
    if overwrite:
        f = open(path, "wb")
    else:
        f = open(path, "ab")

    for obj in objs:
        if isinstance(obj, Transaction):
            f.write(base64.b64decode(encoding.msgpack_encode({"txn": obj.dictify()})))
        else:
            f.write(base64.b64decode(encoding.msgpack_encode(obj)))

    f.close()
    return True


def retrieve_from_file(path):
    """
    Retrieve encoded objects from a file.

    Args:
        path (str): file to read from

    Returns:
        Object[]: list of objects
    """

    f = open(path, "rb")
    objs = []
    unp = msgpack.Unpacker(f, raw=False)
    for obj in unp:
        objs.append(encoding.msgpack_decode(obj))
    f.close()
    return objs


class TxGroup:
    def __init__(self, txns):
        assert isinstance(txns, list)
        """
        Transactions specifies a list of transactions that must appear
        together, sequentially, in a block in order for the group to be
        valid.  Each hash in the list is a hash of a transaction with
        the `Group` field omitted.
        """
        if len(txns) > constants.tx_group_limit:
            raise error.TransactionGroupSizeError
        self.transactions = txns

    def dictify(self):
        od = OrderedDict()
        od["txlist"] = self.transactions
        return od

    @staticmethod
    def undictify(d):
        txg = TxGroup(d["txlist"])
        return txg


def calculate_group_id(txns):
    """
    Calculate group id for a given list of unsigned transactions

    Args:
        txns (list): list of unsigned transactions

    Returns:
        bytes: checksum value representing the group id
    """
    if len(txns) > constants.tx_group_limit:
        raise error.TransactionGroupSizeError
    txids = []
    for txn in txns:
        raw_txn = encoding.msgpack_encode(txn)
        to_hash = constants.txid_prefix + base64.b64decode(raw_txn)
        txids.append(encoding.checksum(to_hash))

    group = TxGroup(txids)

    encoded = encoding.msgpack_encode(group)
    to_sign = constants.tgid_prefix + base64.b64decode(encoded)
    gid = encoding.checksum(to_sign)
    return gid


def assign_group_id(txns, address=None):
    """
    Assign group id to a given list of unsigned transactions.

    Args:
        txns (list): list of unsigned transactions
        address (str): optional sender address specifying which transaction
            to return

    Returns:
        txns (list): list of unsigned transactions with group property set
    """
    if len(txns) > constants.tx_group_limit:
        raise error.TransactionGroupSizeError
    gid = calculate_group_id(txns)
    result = []
    for tx in txns:
        if address is None or tx.sender == address:
            tx.group = gid
            result.append(tx)
    return result