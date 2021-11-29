# coding: utf-8


import pprint

class DryrunRequest(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'txns': 'list[str]',
        'accounts': 'list[Account]',
        'apps': 'list[Application]',
        'protocol_version': 'str',
        'round': 'int',
        'latest_timestamp': 'int',
        'sources': 'list[DryrunSource]'
    }

    attribute_map = {
        'txns': 'txns',
        'accounts': 'accounts',
        'apps': 'apps',
        'protocol_version': 'protocol-version',
        'round': 'round',
        'latest_timestamp': 'latest-timestamp',
        'sources': 'sources'
    }

    def __init__(self, txns=None, accounts=None, apps=None, protocol_version=None, round=None, latest_timestamp=None, sources=None):  # noqa: E501
        """DryrunRequest - a model defined in OpenAPI"""  # noqa: E501

        self._txns = None
        self._accounts = None
        self._apps = None
        self._protocol_version = None
        self._round = None
        self._latest_timestamp = None
        self._sources = None

        self.txns = txns
        self.accounts = accounts
        self.apps = apps
        self.protocol_version = protocol_version
        self.round = round
        self.latest_timestamp = latest_timestamp
        self.sources = sources

    @property
    def txns(self):
        """Gets the txns of this DryrunRequest.  # noqa: E501


        :return: The txns of this DryrunRequest.  # noqa: E501
        :rtype: list[str]
        """
        return self._txns

    @txns.setter
    def txns(self, txns):
        """Sets the txns of this DryrunRequest.


        :param txns: The txns of this DryrunRequest.  # noqa: E501
        :type txns: list[str]
        """

        self._txns = txns

    @property
    def accounts(self):
        """Gets the accounts of this DryrunRequest.  # noqa: E501


        :return: The accounts of this DryrunRequest.  # noqa: E501
        :rtype: list[Account]
        """
        return self._accounts

    @accounts.setter
    def accounts(self, accounts):
        """Sets the accounts of this DryrunRequest.


        :param accounts: The accounts of this DryrunRequest.  # noqa: E501
        :type accounts: list[Account]
        """

        self._accounts = accounts

    @property
    def apps(self):
        """Gets the apps of this DryrunRequest.  # noqa: E501


        :return: The apps of this DryrunRequest.  # noqa: E501
        :rtype: list[Application]
        """
        return self._apps

    @apps.setter
    def apps(self, apps):
        """Sets the apps of this DryrunRequest.


        :param apps: The apps of this DryrunRequest.  # noqa: E501
        :type apps: list[Application]
        """

        self._apps = apps

    @property
    def protocol_version(self):
        """Gets the protocol_version of this DryrunRequest.  # noqa: E501

        ProtocolVersion specifies a specific version string to operate under, otherwise whatever the current protocol of the network this algod is running in.  # noqa: E501

        :return: The protocol_version of this DryrunRequest.  # noqa: E501
        :rtype: str
        """
        return self._protocol_version

    @protocol_version.setter
    def protocol_version(self, protocol_version):
        """Sets the protocol_version of this DryrunRequest.

        ProtocolVersion specifies a specific version string to operate under, otherwise whatever the current protocol of the network this algod is running in.  # noqa: E501

        :param protocol_version: The protocol_version of this DryrunRequest.  # noqa: E501
        :type protocol_version: str
        """

        self._protocol_version = protocol_version

    @property
    def round(self):
        """Gets the round of this DryrunRequest.  # noqa: E501

        Round is available to some TEAL scripts. Defaults to the current round on the network this algod is attached to.  # noqa: E501

        :return: The round of this DryrunRequest.  # noqa: E501
        :rtype: int
        """
        return self._round

    @round.setter
    def round(self, round):
        """Sets the round of this DryrunRequest.

        Round is available to some TEAL scripts. Defaults to the current round on the network this algod is attached to.  # noqa: E501

        :param round: The round of this DryrunRequest.  # noqa: E501
        :type round: int
        """

        self._round = round

    @property
    def latest_timestamp(self):
        """Gets the latest_timestamp of this DryrunRequest.  # noqa: E501

        LatestTimestamp is available to some TEAL scripts. Defaults to the latest confirmed timestamp this algod is attached to.  # noqa: E501

        :return: The latest_timestamp of this DryrunRequest.  # noqa: E501
        :rtype: int
        """
        return self._latest_timestamp

    @latest_timestamp.setter
    def latest_timestamp(self, latest_timestamp):
        """Sets the latest_timestamp of this DryrunRequest.

        LatestTimestamp is available to some TEAL scripts. Defaults to the latest confirmed timestamp this algod is attached to.  # noqa: E501

        :param latest_timestamp: The latest_timestamp of this DryrunRequest.  # noqa: E501
        :type latest_timestamp: int
        """

        self._latest_timestamp = latest_timestamp

    @property
    def sources(self):
        """Gets the sources of this DryrunRequest.  # noqa: E501


        :return: The sources of this DryrunRequest.  # noqa: E501
        :rtype: list[DryrunSource]
        """
        return self._sources

    @sources.setter
    def sources(self, sources):
        """Sets the sources of this DryrunRequest.


        :param sources: The sources of this DryrunRequest.  # noqa: E501
        :type sources: list[DryrunSource]
        """

        self._sources = sources

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
        if not isinstance(other, DryrunRequest):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, DryrunRequest):
            return True

        return self.dictify() != other.dictify()
