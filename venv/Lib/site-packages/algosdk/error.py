class BadTxnSenderError(Exception):
    def __init__(self):
        Exception.__init__(self, "transaction sender does not match multisig "
                                 "parameters")


class InvalidThresholdError(Exception):
    def __init__(self):
        Exception.__init__(self, "invalid multisig threshold")


class InvalidSecretKeyError(Exception):
    def __init__(self):
        Exception.__init__(self, "secret key has no corresponding public key "
                                 "in multisig")


class MergeKeysMismatchError(Exception):
    def __init__(self):
        Exception.__init__(self, "multisig parameters do not match")


class DuplicateSigMismatchError(Exception):
    def __init__(self):
        Exception.__init__(self, "mismatched duplicate signatures in multisig")


class WrongAmountType(Exception):
    def __init(self):
        Exception.__init__(self, "amount (amt) must be a non-negative integer")


class WrongChecksumError(Exception):
    def __init__(self):
        Exception.__init__(self, "checksum failed to validate")


class WrongKeyLengthError(Exception):
    def __init__(self):
        Exception.__init__(self, "key length must be 58")


class WrongMnemonicLengthError(Exception):
    def __init__(self):
        Exception.__init__(self, "mnemonic length must be 25")


class WrongHashLengthError(Exception):
    """General error that is normally changed to be more specific"""

    def __init(self):
        Exception.__init__(self, "length must be 32 bytes")


class WrongKeyBytesLengthError(Exception):
    def __init__(self):
        Exception.__init__(self, "key length in bytes must be 32")


class UnknownMsigVersionError(Exception):
    def __init__(self):
        Exception.__init__(self, "unknown multisig version != 1")


class WrongMetadataLengthError(Exception):
    def __init(self):
        Exception.__init__(self, "metadata length must be 32 bytes")


class WrongLeaseLengthError(Exception):
    def __init(self):
        Exception.__init__(self, "lease length must be 32 bytes")


class WrongNoteType(Exception):
    def __init(self):
        Exception.__init__(self, "note must be of type \"bytes\"")


class WrongNoteLength(Exception):
    def __init(self):
        Exception.__init__(self, "note length must be at most 1024")


class InvalidProgram(Exception):
    def __init__(self, message="invalid program for logic sig"):
        Exception.__init__(self, message)


class TransactionGroupSizeError(Exception):
    def __init__(self):
        Exception.__init__(self, "transaction groups are limited to 16 "
                                 "transactions")


class MultisigAccountSizeError(Exception):
    def __init__(self):
        Exception.__init__(self, "multisig accounts are limited to 256 "
                                 "addresses")


class OutOfRangeDecimalsError(Exception):
    def __init__(self):
        Exception.__init__(self, "decimals must be between 0 and 19, "
                                 "inclusive")


class EmptyAddressError(Exception):
    def __init__(self):
        Exception.__init__(self, "manager, freeze, reserve, and clawback "
                                 "should not be empty unless "
                                 "strict_empty_address_check is set to False")


class WrongContractError(Exception):
    def __init__(self, contract_type):
        Exception.__init__(self, "Wrong contract provided; a "
                           + contract_type + " contract is needed")


class OverspecifiedRoundError(Exception):
    def __init__(self, contract_type):
        Exception.__init__(self, "Two arguments were given for the round "
                                 "or block number; please only give one")


class UnderspecifiedRoundError(Exception):
    def __init__(self, contract_type):
        Exception.__init__(self, "Please specify a round number")


class ZeroAddressError(Exception):
    def __init__(self):
        Exception.__init__(self, "For the zero address, please specify "
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ")


class TemplateInputError(Exception):
    pass


class TemplateError(Exception):
    pass


class KMDHTTPError(Exception):
    pass


class AlgodHTTPError(Exception):
    def __init__(self, msg, code=None):
        super().__init__(msg)
        self.code = code

class IndexerHTTPError(Exception):
    pass
