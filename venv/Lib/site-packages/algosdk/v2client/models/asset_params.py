# coding: utf-8


import pprint

class AssetParams(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'clawback': 'str',
        'creator': 'str',
        'decimals': 'int',
        'default_frozen': 'bool',
        'freeze': 'str',
        'manager': 'str',
        'metadata_hash': 'str',
        'name': 'str',
        'reserve': 'str',
        'total': 'int',
        'unit_name': 'str',
        'url': 'str'
    }

    attribute_map = {
        'clawback': 'clawback',
        'creator': 'creator',
        'decimals': 'decimals',
        'default_frozen': 'default-frozen',
        'freeze': 'freeze',
        'manager': 'manager',
        'metadata_hash': 'metadata-hash',
        'name': 'name',
        'reserve': 'reserve',
        'total': 'total',
        'unit_name': 'unit-name',
        'url': 'url'
    }

    def __init__(self, clawback=None, creator=None, decimals=None, default_frozen=None, freeze=None, manager=None, metadata_hash=None, name=None, reserve=None, total=None, unit_name=None, url=None):  # noqa: E501
        """AssetParams - a model defined in OpenAPI"""  # noqa: E501

        self._clawback = None
        self._creator = None
        self._decimals = None
        self._default_frozen = None
        self._freeze = None
        self._manager = None
        self._metadata_hash = None
        self._name = None
        self._reserve = None
        self._total = None
        self._unit_name = None
        self._url = None

        if clawback is not None:
            self.clawback = clawback
        self.creator = creator
        self.decimals = decimals
        if default_frozen is not None:
            self.default_frozen = default_frozen
        if freeze is not None:
            self.freeze = freeze
        if manager is not None:
            self.manager = manager
        if metadata_hash is not None:
            self.metadata_hash = metadata_hash
        if name is not None:
            self.name = name
        if reserve is not None:
            self.reserve = reserve
        self.total = total
        if unit_name is not None:
            self.unit_name = unit_name
        if url is not None:
            self.url = url

    @property
    def clawback(self):
        """Gets the clawback of this AssetParams.  # noqa: E501

        \\[c\\] Address of account used to clawback holdings of this asset.  If empty, clawback is not permitted.  # noqa: E501

        :return: The clawback of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._clawback

    @clawback.setter
    def clawback(self, clawback):
        """Sets the clawback of this AssetParams.

        \\[c\\] Address of account used to clawback holdings of this asset.  If empty, clawback is not permitted.  # noqa: E501

        :param clawback: The clawback of this AssetParams.  # noqa: E501
        :type clawback: str
        """

        self._clawback = clawback

    @property
    def creator(self):
        """Gets the creator of this AssetParams.  # noqa: E501

        The address that created this asset. This is the address where the parameters for this asset can be found, and also the address where unwanted asset units can be sent in the worst case.  # noqa: E501

        :return: The creator of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._creator

    @creator.setter
    def creator(self, creator):
        """Sets the creator of this AssetParams.

        The address that created this asset. This is the address where the parameters for this asset can be found, and also the address where unwanted asset units can be sent in the worst case.  # noqa: E501

        :param creator: The creator of this AssetParams.  # noqa: E501
        :type creator: str
        """

        self._creator = creator

    @property
    def decimals(self):
        """Gets the decimals of this AssetParams.  # noqa: E501

        \\[dc\\] The number of digits to use after the decimal point when displaying this asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in tenths. If 2, the base unit of the asset is in hundredths, and so on. This value must be between 0 and 19 (inclusive).  # noqa: E501

        :return: The decimals of this AssetParams.  # noqa: E501
        :rtype: int
        """
        return self._decimals

    @decimals.setter
    def decimals(self, decimals):
        """Sets the decimals of this AssetParams.

        \\[dc\\] The number of digits to use after the decimal point when displaying this asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in tenths. If 2, the base unit of the asset is in hundredths, and so on. This value must be between 0 and 19 (inclusive).  # noqa: E501

        :param decimals: The decimals of this AssetParams.  # noqa: E501
        :type decimals: int
        """

        self._decimals = decimals

    @property
    def default_frozen(self):
        """Gets the default_frozen of this AssetParams.  # noqa: E501

        \\[df\\] Whether holdings of this asset are frozen by default.  # noqa: E501

        :return: The default_frozen of this AssetParams.  # noqa: E501
        :rtype: bool
        """
        return self._default_frozen

    @default_frozen.setter
    def default_frozen(self, default_frozen):
        """Sets the default_frozen of this AssetParams.

        \\[df\\] Whether holdings of this asset are frozen by default.  # noqa: E501

        :param default_frozen: The default_frozen of this AssetParams.  # noqa: E501
        :type default_frozen: bool
        """

        self._default_frozen = default_frozen

    @property
    def freeze(self):
        """Gets the freeze of this AssetParams.  # noqa: E501

        \\[f\\] Address of account used to freeze holdings of this asset.  If empty, freezing is not permitted.  # noqa: E501

        :return: The freeze of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._freeze

    @freeze.setter
    def freeze(self, freeze):
        """Sets the freeze of this AssetParams.

        \\[f\\] Address of account used to freeze holdings of this asset.  If empty, freezing is not permitted.  # noqa: E501

        :param freeze: The freeze of this AssetParams.  # noqa: E501
        :type freeze: str
        """

        self._freeze = freeze

    @property
    def manager(self):
        """Gets the manager of this AssetParams.  # noqa: E501

        \\[m\\] Address of account used to manage the keys of this asset and to destroy it.  # noqa: E501

        :return: The manager of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._manager

    @manager.setter
    def manager(self, manager):
        """Sets the manager of this AssetParams.

        \\[m\\] Address of account used to manage the keys of this asset and to destroy it.  # noqa: E501

        :param manager: The manager of this AssetParams.  # noqa: E501
        :type manager: str
        """

        self._manager = manager

    @property
    def metadata_hash(self):
        """Gets the metadata_hash of this AssetParams.  # noqa: E501

        \\[am\\] A commitment to some unspecified asset metadata. The format of this metadata is up to the application.  # noqa: E501

        :return: The metadata_hash of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._metadata_hash

    @metadata_hash.setter
    def metadata_hash(self, metadata_hash):
        """Sets the metadata_hash of this AssetParams.

        \\[am\\] A commitment to some unspecified asset metadata. The format of this metadata is up to the application.  # noqa: E501

        :param metadata_hash: The metadata_hash of this AssetParams.  # noqa: E501
        :type metadata_hash: str
        """

        self._metadata_hash = metadata_hash

    @property
    def name(self):
        """Gets the name of this AssetParams.  # noqa: E501

        \\[an\\] Name of this asset, as supplied by the creator.  # noqa: E501

        :return: The name of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this AssetParams.

        \\[an\\] Name of this asset, as supplied by the creator.  # noqa: E501

        :param name: The name of this AssetParams.  # noqa: E501
        :type name: str
        """

        self._name = name

    @property
    def reserve(self):
        """Gets the reserve of this AssetParams.  # noqa: E501

        \\[r\\] Address of account holding reserve (non-minted) units of this asset.  # noqa: E501

        :return: The reserve of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._reserve

    @reserve.setter
    def reserve(self, reserve):
        """Sets the reserve of this AssetParams.

        \\[r\\] Address of account holding reserve (non-minted) units of this asset.  # noqa: E501

        :param reserve: The reserve of this AssetParams.  # noqa: E501
        :type reserve: str
        """

        self._reserve = reserve

    @property
    def total(self):
        """Gets the total of this AssetParams.  # noqa: E501

        \\[t\\] The total number of units of this asset.  # noqa: E501

        :return: The total of this AssetParams.  # noqa: E501
        :rtype: int
        """
        return self._total

    @total.setter
    def total(self, total):
        """Sets the total of this AssetParams.

        \\[t\\] The total number of units of this asset.  # noqa: E501

        :param total: The total of this AssetParams.  # noqa: E501
        :type total: int
        """

        self._total = total

    @property
    def unit_name(self):
        """Gets the unit_name of this AssetParams.  # noqa: E501

        \\[un\\] Name of a unit of this asset, as supplied by the creator.  # noqa: E501

        :return: The unit_name of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._unit_name

    @unit_name.setter
    def unit_name(self, unit_name):
        """Sets the unit_name of this AssetParams.

        \\[un\\] Name of a unit of this asset, as supplied by the creator.  # noqa: E501

        :param unit_name: The unit_name of this AssetParams.  # noqa: E501
        :type unit_name: str
        """

        self._unit_name = unit_name

    @property
    def url(self):
        """Gets the url of this AssetParams.  # noqa: E501

        \\[au\\] URL where more information about the asset can be retrieved.  # noqa: E501

        :return: The url of this AssetParams.  # noqa: E501
        :rtype: str
        """
        return self._url

    @url.setter
    def url(self, url):
        """Sets the url of this AssetParams.

        \\[au\\] URL where more information about the asset can be retrieved.  # noqa: E501

        :param url: The url of this AssetParams.  # noqa: E501
        :type url: str
        """

        self._url = url

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
        if not isinstance(other, AssetParams):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, AssetParams):
            return True

        return self.dictify() != other.dictify()
