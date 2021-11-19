import base64
import binascii
import string
from dataclasses import dataclass
from typing import List, Union

from algosdk.constants import payment_txn, appcall_txn
from algosdk.future import transaction
from algosdk.encoding import encode_address, msgpack_encode
from algosdk.v2client.models import DryrunRequest, DryrunSource, \
    Application, ApplicationParams, ApplicationStateSchema, Account, \
    TealKeyValue


ZERO_ADDRESS = encode_address(bytes(32))
PRINTABLE = frozenset(string.printable)

@dataclass
class LSig:
    """Logic Sig program parameters"""
    args: List[bytes] = None


@dataclass
class App:
    """Application program parameters"""
    creator: str = ZERO_ADDRESS
    round: int = None
    app_idx: int = 0
    on_complete: int = 0
    args: List[bytes] = None
    accounts: List[Union[str, Account]] = None
    global_state: List[TealKeyValue] = None


class DryrunTestCaseMixin:
    """
    Mixin class for unittest.TestCase

    Expects self.algo_client to be initialized in TestCase.setUp
    """

    def assertPass(self, prog_drr_txns, lsig=None, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that all programs pass.
        By default it uses logic sig mode with args passed in lsig object.
        If app is set then application call is made

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender
            txn_index (int): txn result index to assert in

        Raises:
            unittest.TestCase.failureException: if not passed
            TypeError: program is not bytes or str
        """

        self.assertStatus(prog_drr_txns, "PASS", lsig=lsig, app=app, sender=sender, txn_index=txn_index, msg=msg)

    def assertReject(self, prog_drr_txns, lsig=None, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts any program is rejected.
        By default it uses logic sig mode with args passed in lsig object.
        If app is set then application call is made

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender
            txn_index (int): txn result index to assert in

        Raises:
            unittest.TestCase.failureException: if not passed
            TypeError: program is not bytes or str
        """

        self.assertStatus(prog_drr_txns, "REJECT", lsig=lsig, app=app, sender=sender, txn_index=txn_index, msg=msg)

    def assertStatus(self, prog_drr_txns, status, lsig=None, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that program completes with the status.
        By default it uses logic sig mode with args passed in lsig object.
        If app is set then application call is made

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            status (str): status to assert
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender
            txn_index (int): txn result index to assert in

        Raises:
            unittest.TestCase.failureException (AssetionException): if not passed
            TypeError: program is not bytes or str
        """
        txns_res = self._checked_request(prog_drr_txns, lsig, app, sender)

        if txn_index is not None and (txn_index < 0 or txn_index >= len(txns_res)):
            self._fail(f"txn index {txn_index} is out of range [0, {len(txns_res)})")

        assert_all = True
        all_msgs = []
        if status == "REJECT":
            assert_all = False

        for idx, txn_res in enumerate(txns_res):
            # skip if txn_index is set
            if txn_index is not None and idx != txn_index:
                continue

            msgs = []
            if "logic-sig-messages" in txn_res and \
                    txn_res["logic-sig-messages"] is not None and \
                    len(txn_res["logic-sig-messages"]) > 0:
                msgs = txn_res["logic-sig-messages"]
            elif "app-call-messages" in txn_res and \
                    txn_res["app-call-messages"] is not None and \
                    len(txn_res["app-call-messages"]) > 0:
                msgs = txn_res["app-call-messages"]
            else:
                self._fail("no messages from dryrun")
            if assert_all or idx == txn_index:
                self.assertIn(status, msgs, msg=msg)
            all_msgs.extend(msgs)

        if not assert_all:
            self.assertIn(status, all_msgs, msg=msg)

    def assertNoError(self, prog_drr_txns, lsig=None, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that there are no errors.
        for example, compilation errors or application state initialization errors.
        By default it uses logic sig mode with args passed in lsig object.
        If app is set then application call is made

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender
            txn_index (int): txn result index to assert in

        Raises:
            unittest.TestCase.failureException (AssetionException): if not passed
            TypeError: program is not bytes or str
        """
        drr = self._dryrun_request(prog_drr_txns, lsig, app, sender)
        error = Helper.find_error(drr, txn_index=txn_index)
        self.assertFalse(error, msg)

    def assertError(self, prog_drr_txns, pattern=None, lsig=None, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that there are no errors.
        for example, compilation errors or application state initialization errors.
        By default it uses logic sig mode with args passed in lsig object.
        If app is set then application call is made

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender
            txn_index (int): txn result index to assert in

        Raises:
            unittest.TestCase.failureException (AssetionException): if not passed
            TypeError: program is not bytes or str
        """

        drr = self._dryrun_request(prog_drr_txns, lsig, app, sender)
        error = Helper.find_error(drr, txn_index=txn_index)
        self.assertTrue(error, msg)
        if pattern is not None:
            self.assertIn(pattern, error)

    def assertGlobalStateContains(self, prog_drr_txns, delta_value, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that execution of the program has this global delta value

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            delta_value (dict): value to assert

        Raises:
            unittest.TestCase.failureException: if not passed
            TypeError: program is not bytes or str
        """

        txns_res = self._checked_request(prog_drr_txns, lsig=None, app=app, sender=sender)
        if txn_index is not None and (txn_index < 0 or txn_index >= len(txns_res)):
            self._fail(f"txn index {txn_index} is out of range [0, {len(txns_res)})")

        found = False
        all_global_deltas = []
        for idx, txn_res in enumerate(txns_res):
            # skip if txn_index is set
            if txn_index is not None and idx != txn_index:
                continue
            if "global-delta" in txn_res and \
                    txn_res["global-delta"] is not None and \
                    len(txn_res["global-delta"]) > 0:

                found = Helper.find_delta_value(txn_res["global-delta"], delta_value)
                if not found and idx == txn_index:
                    msg = msg if msg is not None else f"{delta_value} not found in {txn_res['global-delta']}"
                    self._fail(msg)
                if found:
                    break
                all_global_deltas.extend(txn_res["global-delta"])
            elif idx == txn_index:
                self._fail("no global state from dryrun")

        if not found:
            msg = msg if msg is not None else f"{delta_value} not found in any of {all_global_deltas}"
            self._fail(msg)


    def assertLocalStateContains(self, prog_drr_txns, addr, delta_value, app=None, sender=ZERO_ADDRESS, txn_index=None, msg=None):
        """
        Asserts that execution of the program has this global delta value

        Args:
            prog_drr_txns (bytes, str, dict, list): program to run, dryrun response object or list of transactions
            addr (str): account
            delta_value (dict): value to assert

        Raises:
            unittest.TestCase.failureException: if not passed
            TypeError: program is not bytes or str
        """

        txns_res = self._checked_request(prog_drr_txns, lsig=None, app=app, sender=sender)
        if txn_index is not None and (txn_index < 0 or txn_index >= len(txns_res)):
            self._fail(f"txn index {txn_index} is out of range [0, {len(txns_res)})")

        found = False
        all_local_deltas = []
        for idx, txn_res in enumerate(txns_res):
            # skip if txn_index is set
            if txn_index is not None and idx != txn_index:
                continue
            if "local-deltas" in txn_res and \
                    txn_res["local-deltas"] is not None and \
                    len(txn_res["local-deltas"]) > 0:

                for local_delta in txn_res["local-deltas"]:
                    addr_found = False
                    if local_delta["address"] == addr:
                        addr_found = True
                        found = Helper.find_delta_value(local_delta["delta"], delta_value)
                        if not found and idx == txn_index:
                            msg = msg if msg is not None else f"{delta_value} not found in {local_delta['delta']}"
                            self._fail(msg)
                        if found:
                            break
                        all_local_deltas.extend(local_delta["delta"])
                if not addr_found and idx == txn_index:
                    self._fail(f"no address {addr} in local states from dryrun")
            elif idx == txn_index:
                self._fail("no local states from dryrun")

        if not found:
            msg = msg if msg is not None else f"{delta_value} not found in any of {all_local_deltas}"
            self._fail(msg)

    def dryrun_request(self, program, lsig=None, app=None, sender=ZERO_ADDRESS):
        """
        Helper function for creation DryrunRequest and making the REST request
        from program source or compiled bytes

        Args:
            program (bytes, str): program to use as a source
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters
            sender (str): txn sender

        Returns:
            dict: dryrun response object

        Raises:
            TypeError: program is not bytes or str
        """
        drr = Helper.build_dryrun_request(program, lsig, app, sender)
        return self.algo_client.dryrun(drr)

    def dryrun_request_from_txn(self, txns, app):
        """
        Helper function for creation DryrunRequest and making the REST request

        Args:
            txns (list): list of transaction to run as a group
            app (dict, App): app program additional parameters. Only app.round and app.accounts are used.

        Returns:
            dict: dryrun response object

        Raises:
            TypeError: program is not bytes or str
        """

        if app is not None:
            if not isinstance(app, App) and not isinstance(app, dict):
                raise ValueError("app must be a dict or App")
            if isinstance(app, dict):
                app = App(**app)

        rnd = None
        accounts = None
        apps = []
        if app is not None:
            if app.round is not None:
                rnd = app.round
            if app.accounts is not None:
                accounts = app.accounts
                for acc in accounts:
                    if acc.created_apps:
                        apps.extend(acc.created_apps)

        drr = DryrunRequest(
            txns=txns, accounts=accounts, round=rnd, apps=apps,
        )
        return self.algo_client.dryrun(drr)

    @staticmethod
    def default_address():
        """ Helper function returning default zero addr"""
        return ZERO_ADDRESS

    def _dryrun_request(self, prog_drr_txns, lsig, app, sender):
        """
        Helper function to make a dryrun request
        """
        if isinstance(prog_drr_txns, dict):
            drr = prog_drr_txns
        elif isinstance(prog_drr_txns, list):
            drr = self.dryrun_request_from_txn(prog_drr_txns, app)
        else:
            drr = self.dryrun_request(prog_drr_txns, lsig, app, sender)
        return drr

    def _checked_request(self, prog_drr_txns, lsig=None, app=None, sender=ZERO_ADDRESS):
        """
        Helper function to make a dryrun request and perform basic validation
        """
        drr = self._dryrun_request(prog_drr_txns, lsig, app, sender)
        if drr["error"]:
            self._fail(f"error in dryrun response: {drr['error']}")

        if not drr["txns"]:
            self._fail("empty response from dryrun")

        return drr["txns"]

    def _fail(self, msg):
        try:
            self.fail(msg)
        except AttributeError:
            raise AssertionError(msg)


class Helper:
    """Utility functions for dryrun"""

    @classmethod
    def build_dryrun_request(cls, program, lsig=None, app=None, sender=ZERO_ADDRESS):
        """
        Helper function for creation DryrunRequest object from a program.
        By default it uses logic sig mode
        and if app_idx / on_complete are set then application call is made

        Args:
            program (bytes, string): program to use as a source
            lsig (dict, LSig): logic sig program additional parameters
            app (dict, App): app program additional parameters

        Returns:
            DryrunRequest: dryrun request object

        Raises:
            TypeError: program is not bytes or str
            ValueError: both lsig and app parameters provided or unknown type
        """

        if lsig is not None and app is not None:
            raise ValueError("both lsig and app not supported")

        # validate input and determine run mode
        if app is not None:
            if not isinstance(app, App) and not isinstance(app, dict):
                raise ValueError("app must be a dict or App")
            if isinstance(app, dict):
                app = App(**app)

            if app.app_idx is None:
                app.app_idx = 0

            run_mode = "approv"
            if app.on_complete is None:
                app.on_complete = transaction.OnComplete.NoOpOC
            elif app.on_complete == transaction.OnComplete.ClearStateOC:
                run_mode = "clearp"

            if app.accounts is not None:
                accounts = []
                for acc in app.accounts:
                    if isinstance(acc, str):
                        accounts.append(Account(
                            address=acc,
                        ))
                    else:
                        accounts.append(acc)
                app.accounts = accounts

            txn = cls.sample_txn(sender, appcall_txn)

        else:
            if lsig is not None:
                if not isinstance(lsig, LSig) and not isinstance(lsig, dict):
                    raise ValueError("lsig must be a dict or LSig")
                if isinstance(lsig, dict):
                    lsig = LSig(**lsig)
            else:
                lsig = LSig()

            run_mode = "lsig"
            txn = cls.sample_txn(sender, payment_txn)

        sources = []
        apps = []
        accounts = []
        rnd = None

        if isinstance(program, bytes):
            if run_mode != "lsig":
                txns = [cls._build_appcall_signed_txn(txn, app)]
                application = cls.sample_app(sender, app, program)
                apps = [application]
                accounts = app.accounts
                rnd = app.round
            else:
                txns = [cls._build_logicsig_txn(program, txn, lsig)]
        elif isinstance(program, str):
            source = DryrunSource(field_name=run_mode, source=program, txn_index=0)
            if run_mode != "lsig":
                txns = [cls._build_appcall_signed_txn(txn, app)]
                application = cls.sample_app(sender, app)
                apps = [application]
                accounts = app.accounts
                # app idx must match in sources and in apps arrays so dryrun find apps sources
                source.app_index = application.id
                rnd = app.round
            else:
                txns = [cls._build_logicsig_txn(program, txn, lsig)]
            sources = [source]
        else:
            raise TypeError("program must be bytes or str")

        return DryrunRequest(
            txns=txns, sources=sources, apps=apps, accounts=accounts,
            round=rnd,
        )

    @staticmethod
    def _build_logicsig_txn(program, txn, lsig):
        """
        Helper function to make LogicSigTransaction
        """
        # replacing program with an empty one is OK since it set by source
        # LogicSig does not like None/invalid programs because of validation
        program = program if isinstance(program, bytes) else b'\x01'
        logicsig = transaction.LogicSig(program, lsig.args)
        return transaction.LogicSigTransaction(txn, logicsig)

    @staticmethod
    def _build_appcall_signed_txn(txn, app):
        """
        Helper function to make SignedTransaction
        """
        txn.index = app.app_idx
        txn.on_complete = app.on_complete
        txn.app_args = app.args
        if app.accounts is not None:
            txn.accounts = [a.address for a in app.accounts]
        return transaction.SignedTransaction(txn, None)

    @classmethod
    def sample_txn(cls, sender, txn_type):
        """
        Helper function for creation Transaction for dryrun
        """
        sp = transaction.SuggestedParams(int(1000), int(1), int(100), "", flat_fee=True)
        if txn_type == payment_txn:
            txn = transaction.Transaction(sender, sp, None, None, payment_txn, None)
        elif txn_type == appcall_txn:
            txn = transaction.ApplicationCallTxn(sender, sp, 0, 0)
        else:
            raise ValueError("unsupported src object")
        return txn

    @staticmethod
    def sample_app(sender, app, program=None):
        """
        Helper function for creation Application description for dryrun
        """
        default_app_id = 1380011588
        # dryrun ledger can't stand app idx = 0
        # and requires some non-zero if even for app create txn
        if app.app_idx == 0:
            creator = sender
            idx = default_app_id
        else:
            idx = app.app_idx
            creator = app.creator
        params = ApplicationParams(
            creator=creator,
            local_state_schema=ApplicationStateSchema(64, 64),
            global_state_schema=ApplicationStateSchema(64, 64),
            global_state = app.global_state
        )

        if app.on_complete == transaction.OnComplete.ClearStateOC:
            params.clear_state_program = program
        else:
            params.approval_program = program

        return Application(idx, params)

    @staticmethod
    def _guess(value):
        try:
            value = base64.b64decode(value)
        except binascii.Error:
            return value

        try:
            all_print = True
            for b in value:
                if chr(b) not in PRINTABLE:
                    all_print = False
            if all_print:
                return "\"" + value.decode("utf8") + "\""
            else:
                if len(value) == 32:  # address? hash?
                    return f"{encode_address(value)} ({value.hex()})"
                elif len(value) < 16: # most likely bin number
                    return "0x" + value.hex()
                return value.hex()
        except UnicodeDecodeError:
            return value.hex()

    @classmethod
    def _format_stack(cls, stack):
        parts = []
        for item in stack:
            if item["type"] == 1:  # bytes
                item = cls._guess(item["bytes"])
            else:
                item = str(item["uint"])
            parts.append(item)
        return " ".join(parts)

    @classmethod
    def pprint(cls, drr):
        """Helper function to pretty print dryrun response"""
        if "error" in drr and drr["error"]:
            print("error:", drr["error"])
        if "txns" not in drr or not isinstance(drr["txns"], list):
            return

        for idx, txn_res in enumerate(drr['txns']):
            msgs = []
            trace = []
            try:
                msgs = txn_res["app-call-messages"]
                trace = txn_res["app-call-trace"]
            except KeyError:
                try:
                    msgs = txn_res["logic-sig-messages"]
                    trace = txn_res["logic-sig-trace"]
                except KeyError:
                    pass
            if msgs:
                print(f"txn[{idx}] messages:")
                for msg in msgs:
                    print(msg)
            if trace:
                print(f"txn[{idx}] trace:")
                for item in trace:
                    dis = txn_res["disassembly"][item["line"]]
                    stack = cls._format_stack(item["stack"])
                    line = "{:4d}".format(item["line"])
                    pc = "{:04d}".format(item["pc"])
                    disasm = "{:25}".format(dis)
                    stack_line = "{}".format(stack)
                    result = f"{line} ({pc}): {disasm} [{stack_line}]"
                    if "error" in item:
                        result += f" error: {item['error']}"
                    print(result)


    @staticmethod
    def find_error(drr, txn_index=None):
        """
        Helper function to find error in dryrun response
        """
        try:
            if len(drr["error"]) > 0:
                return drr["error"]
        except (KeyError, TypeError):
            pass
        if "txns" in drr and isinstance(drr["txns"], list):
            if txn_index is not None and (txn_index < 0 or txn_index >= len(drr["txns"])):
                return f"txn index {txn_index} is out of range [0, {len(drr['txns'])})"

            for idx, txn_res in enumerate(drr["txns"]):
                if txn_index is not None and txn_index != idx:
                    continue
                try:
                    ptype = "app"
                    trace = txn_res["app-call-trace"]
                except KeyError:
                    try:
                        ptype = "logic"
                        trace = txn_res["logic-sig-trace"]
                    except KeyError:
                        continue

                for item in trace:
                    if "error" in item:
                        error = f"{ptype} {idx} failed at line {item['line']}: {item['error']}"
                        return error

    @staticmethod
    def build_bytes_delta_value(value):
        if isinstance(value, str):
            value = value.encode("utf-8")
        return dict(
            action=1,  # set bytes
            bytes=base64.b64encode(value).decode("utf-8")  # b64 input to string
        )

    @staticmethod
    def find_delta_value(deltas, delta_value):
        found = False
        for delta in deltas:
            try:
                if delta["key"] == delta_value["key"]:
                    value = delta["value"]
                    if value["action"] == delta_value["value"]["action"]:
                        if 'uint' in delta_value["value"]:
                            if delta_value["value"]["uint"] == value["uint"]:
                                found = True
                                break
                        elif 'bytes' in delta_value["value"]:
                            if delta_value["value"]["bytes"] == value["bytes"]:
                                found = True
                                break
            except KeyError:
                pass
        return found

    @staticmethod
    def save_dryrun_request(name_or_fp, req):
        """Helper function to save dryrun request

        Args:
            name_or_fp (str, file-like): filename or fp to save the request to
            req (DryrunRequest): dryrun request object to save
        """
        need_close = False
        if isinstance(name_or_fp, str):
            fp = open(name_or_fp, "wb")
            need_close = True
        else:
            fp = name_or_fp

        data = msgpack_encode(req)
        data = base64.b64decode(data)

        fp.write(data)
        if need_close:
            fp.close()