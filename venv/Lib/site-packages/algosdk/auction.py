import base64
from . import encoding, constants
from nacl.signing import SigningKey


class Bid:
    """Represents a bid in an auction.

    Args:
        bidder (str): address of the bidder
        bid_currency (int): how much external currency is being spent
        max_price (int): the maximum price the bidder is willing to pay
        bid_id (int): bid ID
        auction_key (str): address of the auction
        auction_id (int): auction ID

    Attributes:
        bidder (str)
        bid_currency (int)
        max_price (int)
        bid_id (int)
        auction_key (str)
        auction_id (int)

    """

    def __init__(self, bidder, bid_currency, max_price, bid_id, auction_key,
                 auction_id):
        self.bidder = bidder
        self.bid_currency = bid_currency
        self.max_price = max_price
        self.bid_id = bid_id
        self.auction_key = auction_key
        self.auction_id = auction_id

    def dictify(self):
        d = {
            "aid": self.auction_id,
            "auc": encoding.decode_address(self.auction_key),
            "bidder": encoding.decode_address(self.bidder),
            "cur": self.bid_currency,
            "id": self.bid_id,
            "price": self.max_price
        }
        return d

    def sign(self, private_key):
        """
        Sign a bid.

        Args:
            private_key (str): private_key of the bidder

        Returns:
            SignedBid: signed bid with the signature
        """
        temp = encoding.msgpack_encode(self)
        to_sign = constants.bid_prefix + base64.b64decode(temp)
        private_key = base64.b64decode(private_key)
        signing_key = SigningKey(private_key[:constants.key_len_bytes])
        signed = signing_key.sign(to_sign)
        sig = signed.signature
        signed = SignedBid(self, base64.b64encode(sig).decode())
        return signed

    @staticmethod
    def undictify(d):
        return Bid(encoding.encode_address(d["bidder"]), d["cur"], d["price"],
                   d["id"], encoding.encode_address(d["auc"]), d["aid"])

    def __eq__(self, other):
        if not isinstance(other, Bid):
            return False
        return (self.bidder == other.bidder and
                self.bid_currency == other.bid_currency and
                self.max_price == other.max_price and
                self.bid_id == other.bid_id and
                self.auction_key == other.auction_key and
                self.auction_id == other.auction_id)


class SignedBid:
    """
    Represents a signed bid in an auction.

    Args:
        bid (Bid): bid that was signed
        signature (str): the signature of the bidder

    Attributes:
        bid (Bid)
        signature (str)
    """

    def __init__(self, bid, signature):
        self.bid = bid
        self.signature = signature

    def dictify(self):
        d = {
            "bid": self.bid.dictify(),
            "sig": base64.b64decode(self.signature)
        }
        return d

    @staticmethod
    def undictify(d):
        return SignedBid(Bid.undictify(d["bid"]),
                         base64.b64encode(d["sig"]).decode())

    def __eq__(self, other):
        if not isinstance(other, SignedBid):
            return False
        return (self.bid == other.bid and
                self.signature == other.signature)


class NoteField:
    """
    Can be encoded and added to a transaction.

    Args:
        signed_bid (SignedBid): bid with signature of bidder
        note_field_type (str): the type of note; see constants for possible
            types

    Attributes:
        signed_bid (SignedBid)
        note_field_type (str)
    """

    def __init__(self, signed_bid, note_field_type):
        self.signed_bid = signed_bid
        self.note_field_type = note_field_type

    def dictify(self):
        d = {
            "b": self.signed_bid.dictify(),
            "t": self.note_field_type
        }
        return d

    @staticmethod
    def undictify(d):
        return NoteField(SignedBid.undictify(d["b"]), d["t"])

    def __eq__(self, other):
        if not isinstance(other, NoteField):
            return False
        return (self.signed_bid == other.signed_bid and
                self.note_field_type == other.note_field_type)
