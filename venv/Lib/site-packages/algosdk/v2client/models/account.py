# coding: utf-8


import pprint

class Account(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'address': 'str',
        'amount': 'int',
        'amount_without_pending_rewards': 'int',
        'apps_local_state': 'list[ApplicationLocalState]',
        'apps_total_schema': 'ApplicationStateSchema',
        'assets': 'list[AssetHolding]',
        'created_apps': 'list[Application]',
        'created_assets': 'list[Asset]',
        'participation': 'AccountParticipation',
        'pending_rewards': 'int',
        'reward_base': 'int',
        'rewards': 'int',
        'round': 'int',
        'status': 'str',
        'sig_type': 'str',
        'auth_addr': 'str'
    }

    attribute_map = {
        'address': 'address',
        'amount': 'amount',
        'amount_without_pending_rewards': 'amount-without-pending-rewards',
        'apps_local_state': 'apps-local-state',
        'apps_total_schema': 'apps-total-schema',
        'assets': 'assets',
        'created_apps': 'created-apps',
        'created_assets': 'created-assets',
        'participation': 'participation',
        'pending_rewards': 'pending-rewards',
        'reward_base': 'reward-base',
        'rewards': 'rewards',
        'round': 'round',
        'status': 'status',
        'sig_type': 'sig-type',
        'auth_addr': 'auth-addr'
    }

    def __init__(self, address=None, amount=None, amount_without_pending_rewards=None, apps_local_state=None, apps_total_schema=None, assets=None, created_apps=None, created_assets=None, participation=None, pending_rewards=None, reward_base=None, rewards=None, round=None, status=None, sig_type=None, auth_addr=None):  # noqa: E501
        """Account - a model defined in OpenAPI"""  # noqa: E501

        self._address = None
        self._amount = None
        self._amount_without_pending_rewards = None
        self._apps_local_state = None
        self._apps_total_schema = None
        self._assets = None
        self._created_apps = None
        self._created_assets = None
        self._participation = None
        self._pending_rewards = None
        self._reward_base = None
        self._rewards = None
        self._round = None
        self._status = None
        self._sig_type = None
        self._auth_addr = None

        self.address = address
        self.amount = amount
        self.amount_without_pending_rewards = amount_without_pending_rewards
        if apps_local_state is not None:
            self.apps_local_state = apps_local_state
        if apps_total_schema is not None:
            self.apps_total_schema = apps_total_schema
        if assets is not None:
            self.assets = assets
        if created_apps is not None:
            self.created_apps = created_apps
        if created_assets is not None:
            self.created_assets = created_assets
        if participation is not None:
            self.participation = participation
        self.pending_rewards = pending_rewards
        if reward_base is not None:
            self.reward_base = reward_base
        self.rewards = rewards
        self.round = round
        self.status = status
        if sig_type is not None:
            self.sig_type = sig_type
        if auth_addr is not None:
            self.auth_addr = auth_addr

    @property
    def address(self):
        """Gets the address of this Account.  # noqa: E501

        the account public key  # noqa: E501

        :return: The address of this Account.  # noqa: E501
        :rtype: str
        """
        return self._address

    @address.setter
    def address(self, address):
        """Sets the address of this Account.

        the account public key  # noqa: E501

        :param address: The address of this Account.  # noqa: E501
        :type address: str
        """

        self._address = address

    @property
    def amount(self):
        """Gets the amount of this Account.  # noqa: E501

        \\[algo\\] total number of MicroAlgos in the account  # noqa: E501

        :return: The amount of this Account.  # noqa: E501
        :rtype: int
        """
        return self._amount

    @amount.setter
    def amount(self, amount):
        """Sets the amount of this Account.

        \\[algo\\] total number of MicroAlgos in the account  # noqa: E501

        :param amount: The amount of this Account.  # noqa: E501
        :type amount: int
        """

        self._amount = amount

    @property
    def amount_without_pending_rewards(self):
        """Gets the amount_without_pending_rewards of this Account.  # noqa: E501

        specifies the amount of MicroAlgos in the account, without the pending rewards.  # noqa: E501

        :return: The amount_without_pending_rewards of this Account.  # noqa: E501
        :rtype: int
        """
        return self._amount_without_pending_rewards

    @amount_without_pending_rewards.setter
    def amount_without_pending_rewards(self, amount_without_pending_rewards):
        """Sets the amount_without_pending_rewards of this Account.

        specifies the amount of MicroAlgos in the account, without the pending rewards.  # noqa: E501

        :param amount_without_pending_rewards: The amount_without_pending_rewards of this Account.  # noqa: E501
        :type amount_without_pending_rewards: int
        """

        self._amount_without_pending_rewards = amount_without_pending_rewards

    @property
    def apps_local_state(self):
        """Gets the apps_local_state of this Account.  # noqa: E501

        \\[appl\\] applications local data stored in this account.  Note the raw object uses `map[int] -> AppLocalState` for this type.  # noqa: E501

        :return: The apps_local_state of this Account.  # noqa: E501
        :rtype: list[ApplicationLocalState]
        """
        return self._apps_local_state

    @apps_local_state.setter
    def apps_local_state(self, apps_local_state):
        """Sets the apps_local_state of this Account.

        \\[appl\\] applications local data stored in this account.  Note the raw object uses `map[int] -> AppLocalState` for this type.  # noqa: E501

        :param apps_local_state: The apps_local_state of this Account.  # noqa: E501
        :type apps_local_state: list[ApplicationLocalState]
        """

        self._apps_local_state = apps_local_state

    @property
    def apps_total_schema(self):
        """Gets the apps_total_schema of this Account.  # noqa: E501


        :return: The apps_total_schema of this Account.  # noqa: E501
        :rtype: ApplicationStateSchema
        """
        return self._apps_total_schema

    @apps_total_schema.setter
    def apps_total_schema(self, apps_total_schema):
        """Sets the apps_total_schema of this Account.


        :param apps_total_schema: The apps_total_schema of this Account.  # noqa: E501
        :type apps_total_schema: ApplicationStateSchema
        """

        self._apps_total_schema = apps_total_schema

    @property
    def assets(self):
        """Gets the assets of this Account.  # noqa: E501

        \\[asset\\] assets held by this account.  Note the raw object uses `map[int] -> AssetHolding` for this type.  # noqa: E501

        :return: The assets of this Account.  # noqa: E501
        :rtype: list[AssetHolding]
        """
        return self._assets

    @assets.setter
    def assets(self, assets):
        """Sets the assets of this Account.

        \\[asset\\] assets held by this account.  Note the raw object uses `map[int] -> AssetHolding` for this type.  # noqa: E501

        :param assets: The assets of this Account.  # noqa: E501
        :type assets: list[AssetHolding]
        """

        self._assets = assets

    @property
    def created_apps(self):
        """Gets the created_apps of this Account.  # noqa: E501

        \\[appp\\] parameters of applications created by this account including app global data.  Note: the raw account uses `map[int] -> AppParams` for this type.  # noqa: E501

        :return: The created_apps of this Account.  # noqa: E501
        :rtype: list[Application]
        """
        return self._created_apps

    @created_apps.setter
    def created_apps(self, created_apps):
        """Sets the created_apps of this Account.

        \\[appp\\] parameters of applications created by this account including app global data.  Note: the raw account uses `map[int] -> AppParams` for this type.  # noqa: E501

        :param created_apps: The created_apps of this Account.  # noqa: E501
        :type created_apps: list[Application]
        """

        self._created_apps = created_apps

    @property
    def created_assets(self):
        """Gets the created_assets of this Account.  # noqa: E501

        \\[apar\\] parameters of assets created by this account.  Note: the raw account uses `map[int] -> Asset` for this type.  # noqa: E501

        :return: The created_assets of this Account.  # noqa: E501
        :rtype: list[Asset]
        """
        return self._created_assets

    @created_assets.setter
    def created_assets(self, created_assets):
        """Sets the created_assets of this Account.

        \\[apar\\] parameters of assets created by this account.  Note: the raw account uses `map[int] -> Asset` for this type.  # noqa: E501

        :param created_assets: The created_assets of this Account.  # noqa: E501
        :type created_assets: list[Asset]
        """

        self._created_assets = created_assets

    @property
    def participation(self):
        """Gets the participation of this Account.  # noqa: E501


        :return: The participation of this Account.  # noqa: E501
        :rtype: AccountParticipation
        """
        return self._participation

    @participation.setter
    def participation(self, participation):
        """Sets the participation of this Account.


        :param participation: The participation of this Account.  # noqa: E501
        :type participation: AccountParticipation
        """

        self._participation = participation

    @property
    def pending_rewards(self):
        """Gets the pending_rewards of this Account.  # noqa: E501

        amount of MicroAlgos of pending rewards in this account.  # noqa: E501

        :return: The pending_rewards of this Account.  # noqa: E501
        :rtype: int
        """
        return self._pending_rewards

    @pending_rewards.setter
    def pending_rewards(self, pending_rewards):
        """Sets the pending_rewards of this Account.

        amount of MicroAlgos of pending rewards in this account.  # noqa: E501

        :param pending_rewards: The pending_rewards of this Account.  # noqa: E501
        :type pending_rewards: int
        """

        self._pending_rewards = pending_rewards

    @property
    def reward_base(self):
        """Gets the reward_base of this Account.  # noqa: E501

        \\[ebase\\] used as part of the rewards computation. Only applicable to accounts which are participating.  # noqa: E501

        :return: The reward_base of this Account.  # noqa: E501
        :rtype: int
        """
        return self._reward_base

    @reward_base.setter
    def reward_base(self, reward_base):
        """Sets the reward_base of this Account.

        \\[ebase\\] used as part of the rewards computation. Only applicable to accounts which are participating.  # noqa: E501

        :param reward_base: The reward_base of this Account.  # noqa: E501
        :type reward_base: int
        """

        self._reward_base = reward_base

    @property
    def rewards(self):
        """Gets the rewards of this Account.  # noqa: E501

        \\[ern\\] total rewards of MicroAlgos the account has received, including pending rewards.  # noqa: E501

        :return: The rewards of this Account.  # noqa: E501
        :rtype: int
        """
        return self._rewards

    @rewards.setter
    def rewards(self, rewards):
        """Sets the rewards of this Account.

        \\[ern\\] total rewards of MicroAlgos the account has received, including pending rewards.  # noqa: E501

        :param rewards: The rewards of this Account.  # noqa: E501
        :type rewards: int
        """

        self._rewards = rewards

    @property
    def round(self):
        """Gets the round of this Account.  # noqa: E501

        The round for which this information is relevant.  # noqa: E501

        :return: The round of this Account.  # noqa: E501
        :rtype: int
        """
        return self._round

    @round.setter
    def round(self, round):
        """Sets the round of this Account.

        The round for which this information is relevant.  # noqa: E501

        :param round: The round of this Account.  # noqa: E501
        :type round: int
        """

        self._round = round

    @property
    def status(self):
        """Gets the status of this Account.  # noqa: E501

        \\[onl\\] delegation status of the account's MicroAlgos * Offline - indicates that the associated account is delegated. *  Online  - indicates that the associated account used as part of the delegation pool. *   NotParticipating - indicates that the associated account is neither a delegator nor a delegate.  # noqa: E501

        :return: The status of this Account.  # noqa: E501
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this Account.

        \\[onl\\] delegation status of the account's MicroAlgos * Offline - indicates that the associated account is delegated. *  Online  - indicates that the associated account used as part of the delegation pool. *   NotParticipating - indicates that the associated account is neither a delegator nor a delegate.  # noqa: E501

        :param status: The status of this Account.  # noqa: E501
        :type status: str
        """

        self._status = status

    @property
    def sig_type(self):
        """Gets the sig_type of this Account.  # noqa: E501

        Indicates what type of signature is used by this account, must be one of: * sig * msig * lsig  # noqa: E501

        :return: The sig_type of this Account.  # noqa: E501
        :rtype: str
        """
        return self._sig_type

    @sig_type.setter
    def sig_type(self, sig_type):
        """Sets the sig_type of this Account.

        Indicates what type of signature is used by this account, must be one of: * sig * msig * lsig  # noqa: E501

        :param sig_type: The sig_type of this Account.  # noqa: E501
        :type sig_type: str
        """
        allowed_values = ["sig", "msig", "lsig"]  # noqa: E501
        if sig_type not in allowed_values:  # noqa: E501
            raise ValueError(
                "Invalid value for `sig_type` ({0}), must be one of {1}"  # noqa: E501
                .format(sig_type, allowed_values)
            )

        self._sig_type = sig_type

    @property
    def auth_addr(self):
        """Gets the auth_addr of this Account.  # noqa: E501

        \\[spend\\] the address against which signing should be checked. If empty, the address of the current account is used. This field can be updated in any transaction by setting the RekeyTo field.  # noqa: E501

        :return: The auth_addr of this Account.  # noqa: E501
        :rtype: str
        """
        return self._auth_addr

    @auth_addr.setter
    def auth_addr(self, auth_addr):
        """Sets the auth_addr of this Account.

        \\[spend\\] the address against which signing should be checked. If empty, the address of the current account is used. This field can be updated in any transaction by setting the RekeyTo field.  # noqa: E501

        :param auth_addr: The auth_addr of this Account.  # noqa: E501
        :type auth_addr: str
        """

        self._auth_addr = auth_addr

    def dictify(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, oas_attr in self.attribute_map.items():
            value = getattr(self, attr)
            if isinstance(value, list):
                result[oas_attr] = list(map(
                    lambda x: x.dictify() \
                    if hasattr(x, "dictify") else x,
                    value
                ))
            elif hasattr(value, "dictify"):
                result[oas_attr] = value.dictify()
            elif isinstance(value, dict):
                result[oas_attr] = dict(map(
                    lambda item: (item[0], item[1].dictify())
                    if hasattr(item[1], "dictify") else item,
                    value.items()
                ))
            else:
                result[oas_attr] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.dictify())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, Account):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, Account):
            return True

        return self.dictify() != other.dictify()
