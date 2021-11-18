from urllib.request import Request, urlopen
from urllib import parse
import urllib.error
import json
import base64
from .. import error
from .. import encoding
from .. import constants
from .. import future
import msgpack

api_version_path_prefix = "/v2"


class AlgodClient:
    """
    Client class for algod. Handles all algod requests.

    Args:
        algod_token (str): algod API token
        algod_address (str): algod address
        headers (dict, optional): extra header name/value for all requests

    Attributes:
        algod_token (str)
        algod_address (str)
        headers (dict)
    """

    def __init__(self, algod_token, algod_address, headers=None):
        self.algod_token = algod_token
        self.algod_address = algod_address
        self.headers = headers

    def algod_request(self, method, requrl, params=None, data=None,
                      headers=None, response_format="json"):
        """
        Execute a given request.

        Args:
            method (str): request method
            requrl (str): url for the request
            params (dict, optional): parameters for the request
            data (dict, optional): data in the body of the request
            headers (dict, optional): additional header for request

        Returns:
            dict: loaded from json response body
        """
        header = {}

        if self.headers:
            header.update(self.headers)

        if headers:
            header.update(headers)

        if requrl not in constants.no_auth:
            header.update({
                constants.algod_auth_header: self.algod_token
            })

        if requrl not in constants.unversioned_paths:
            requrl = api_version_path_prefix + requrl
        if params:
            requrl = requrl + "?" + parse.urlencode(params)

        req = Request(self.algod_address+requrl, headers=header, method=method,
                      data=data)

        try:
            resp = urlopen(req)
        except urllib.error.HTTPError as e:
            code = e.code
            e = e.read().decode("utf-8")
            try:
                raise error.AlgodHTTPError(json.loads(e)["message"], code)
            except:
                raise error.AlgodHTTPError(e, code)
        if response_format == "json":
            try:
                return json.load(resp)
            except json.JSONDecodeError:
                return None
        else:
            return resp.read()

    def account_info(self, address, **kwargs):
        """
        Return account information.

        Args:
            address (str): account public key
        """
        req = "/accounts/" + address
        return self.algod_request("GET", req, **kwargs)
    
    def asset_info(self, asset_id, **kwargs):
        """
        Return information about a specific asset.

        Args:
            asset_id (int): The ID of the asset to look up.
        """
        req = "/assets/" + str(asset_id)
        return self.algod_request("GET", req, **kwargs)
    
    def application_info(self, application_id, **kwargs):
        """
        Return information about a specific application.

        Args:
            application_id (int): The ID of the application to look up.
        """
        req = "/applications/" + str(application_id)
        return self.algod_request("GET", req, **kwargs)

    def pending_transactions_by_address(self, address, limit=0, response_format="json",
                                        **kwargs):
        """
        Get the list of pending transactions by address, sorted by priority,
        in decreasing order, truncated at the end at MAX. If MAX = 0, returns
        all pending transactions.

        Args:
            address (str): account public key
            limit (int, optional): maximum number of transactions to return
            response_format (str): the format in which the response is returned: either
                "json" or "msgpack"
        """
        query = {"format": response_format}
        if limit:
            query["max"] = limit
        req = "/accounts/" + address + "/transactions/pending"
        res = self.algod_request(
            "GET", req, params=query, response_format=response_format,
            **kwargs)
        return res

    def block_info(self, block=None, response_format="json", round_num=None, **kwargs):
        """
        Get the block for the given round.

        Args:
            block (int): block number
            response_format (str): the format in which the response is 
                returned: either "json" or "msgpack"
            round_num (int, optional): alias for block; specify one of these
        """
        query = {"format": response_format}
        if block is None and round_num is None:
            raise error.UnderspecifiedRoundError
        req = "/blocks/" + _specify_round_string(block, round_num)
        res = self.algod_request("GET", req, query, response_format=response_format, **kwargs)
        return res

    def ledger_supply(self, **kwargs):
        """Return supply details for node's ledger."""
        req = "/ledger/supply"
        return self.algod_request("GET", req, **kwargs)

    def status(self, **kwargs):
        """Return node status."""
        req = "/status"
        return self.algod_request("GET", req, **kwargs)

    def status_after_block(self, block_num=None, round_num=None, **kwargs):
        """
        Return node status immediately after blockNum.

        Args:
            block_num: block number
            round_num (int, optional): alias for block_num; specify one of
                these
        """
        if block_num is None and round_num is None:
            raise error.UnderspecifiedRoundError
        req = "/status/wait-for-block-after/" + _specify_round_string(block_num, round_num)
        return self.algod_request("GET", req, **kwargs)

    def send_transaction(self, txn, **kwargs):
        """
        Broadcast a signed transaction object to the network.

        Args:
            txn (SignedTransaction or MultisigTransaction): transaction to send
            request_header (dict, optional): additional header for request

        Returns:
            str: transaction ID
        """
        assert not isinstance(txn, future.transaction.Transaction), \
            f"Attempt to send UNSIGNED transaction {txn}"
        return self.send_raw_transaction(encoding.msgpack_encode(txn),
                                         **kwargs)

    def send_raw_transaction(self, txn, **kwargs):
        """
        Broadcast a signed transaction to the network.

        Args:
            txn (str): transaction to send, encoded in base64
            request_header (dict, optional): additional header for request

        Returns:
            str: transaction ID
        """
        txn = base64.b64decode(txn)
        req = "/transactions"
        headers = { 'Content-Type': 'application/x-binary' }
        return self.algod_request("POST", req, data=txn, headers=headers, **kwargs)["txId"]

    def pending_transactions(self, max_txns=0, response_format="json", **kwargs):
        """
        Return pending transactions.

        Args:
            max_txns (int): maximum number of transactions to return;
                if max_txns is 0, return all pending transactions
            response_format (str): the format in which the response is returned: either
                "json" or "msgpack"
        """
        query = {"format": response_format}
        if max_txns:
            query["max"] = max_txns
        req = "/transactions/pending"
        res = self.algod_request("GET", req, params=query, response_format=response_format, **kwargs)
        return res

    def pending_transaction_info(self, transaction_id, response_format="json", **kwargs):
        """
        Return transaction information for a pending transaction.

        Args:
            transaction_id (str): transaction ID
            response_format (str): the format in which the response is returned: either
                "json" or "msgpack"
        """
        req = "/transactions/pending/" + transaction_id
        query = {"format": response_format}
        res = self.algod_request("GET", req, params=query, response_format=response_format, **kwargs)
        return res

    def health(self, **kwargs):
        """Return null if the node is running."""
        req = "/health"
        return self.algod_request("GET", req, **kwargs)

    def versions(self, **kwargs):
        """Return algod versions."""
        req = "/versions"
        return self.algod_request("GET", req, **kwargs)

    def send_transactions(self, txns, **kwargs):
        """
        Broadcast list of a signed transaction objects to the network.

        Args:
            txns (SignedTransaction[] or MultisigTransaction[]):
                transactions to send
            request_header (dict, optional): additional header for request

        Returns:
            str: first transaction ID
        """
        serialized = []
        for txn in txns:
            assert not isinstance(txn, future.transaction.Transaction), \
                f"Attempt to send UNSIGNED transaction {txn}"
            serialized.append(base64.b64decode(encoding.msgpack_encode(txn)))

        return self.send_raw_transaction(base64.b64encode(
                                         b''.join(serialized)), **kwargs)

    def suggested_params(self, **kwargs):
        """Return suggested transaction parameters."""
        req = "/transactions/params"
        res = self.algod_request("GET", req, **kwargs)

        return future.transaction.SuggestedParams(
            res["fee"],
            res["last-round"],
            res["last-round"] + 1000,
            res["genesis-hash"],
            res["genesis-id"],
            False,
            res["consensus-version"],
            res["min-fee"]
            )

    def compile(self, source, **kwargs):
        """
        Compile TEAL source with remote algod.

        Args:
            source (str): source to be compiled
            request_header (dict, optional): additional header for request

        Returns:
            dict: loaded from json response body. "result" property contains compiled bytes, "hash" - program hash (escrow address)

        """
        req = "/teal/compile"
        headers = { 'Content-Type': 'application/x-binary' }
        return self.algod_request("POST", req, data=source.encode('utf-8'), headers=headers, **kwargs)

    def dryrun(self, drr, **kwargs):
        """
        Dryrun with remote algod.

        Args:
            drr (obj): dryrun request object
            request_header (dict, optional): additional header for request

        Returns:
            dict: loaded from json response body
        """
        req = "/teal/dryrun"
        headers = { 'Content-Type': 'application/msgpack' }
        data = encoding.msgpack_encode(drr)
        data = base64.b64decode(data)
        return self.algod_request("POST", req, data=data, headers=headers, **kwargs)

    def genesis(self, **kwargs):
        """Returns the entire genesis file."""
        req = "/genesis"
        return self.algod_request("GET", req, **kwargs)
    
    def proof(self, round_num, txid, **kwargs):
        """
        Get the proof for a given transaction in a round.

        Args:
            round_num (int): The round in which the transaction appears.
            txid (str): The transaction ID for which to generate a proof.
        """
        req = "/blocks/{}/transactions/{}/proof".format(round_num, txid)
        return self.algod_request("GET", req, **kwargs)

def _specify_round_string(block, round_num):
    """
    Return the round number specified in either 'block' or 'round_num'.

    Args:
        block (int): user specified variable
        round_num (int): user specified variable
    """

    if block is not None and round_num is not None:
        raise error.OverspecifiedRoundError
    elif block is not None:
        return str(block)
    elif round_num is not None:
        return str(round_num)
