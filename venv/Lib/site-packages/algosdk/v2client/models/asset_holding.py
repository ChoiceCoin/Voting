# coding: utf-8


import pprint

class AssetHolding(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'amount': 'int',
        'asset_id': 'int',
        'creator': 'str',
        'is_frozen': 'bool'
    }

    attribute_map = {
        'amount': 'amount',
        'asset_id': 'asset-id',
        'creator': 'creator',
        'is_frozen': 'is-frozen'
    }

    def __init__(self, amount=None, asset_id=None, creator=None, is_frozen=None):  # noqa: E501
        """AssetHolding - a model defined in OpenAPI"""  # noqa: E501

        self._amount = None
        self._asset_id = None
        self._creator = None
        self._is_frozen = None

        self.amount = amount
        self.asset_id = asset_id
        self.creator = creator
        self.is_frozen = is_frozen

    @property
    def amount(self):
        """Gets the amount of this AssetHolding.  # noqa: E501

        \\[a\\] number of units held.  # noqa: E501

        :return: The amount of this AssetHolding.  # noqa: E501
        :rtype: int
        """
        return self._amount

    @amount.setter
    def amount(self, amount):
        """Sets the amount of this AssetHolding.

        \\[a\\] number of units held.  # noqa: E501

        :param amount: The amount of this AssetHolding.  # noqa: E501
        :type amount: int
        """

        self._amount = amount

    @property
    def asset_id(self):
        """Gets the asset_id of this AssetHolding.  # noqa: E501

        Asset ID of the holding.  # noqa: E501

        :return: The asset_id of this AssetHolding.  # noqa: E501
        :rtype: int
        """
        return self._asset_id

    @asset_id.setter
    def asset_id(self, asset_id):
        """Sets the asset_id of this AssetHolding.

        Asset ID of the holding.  # noqa: E501

        :param asset_id: The asset_id of this AssetHolding.  # noqa: E501
        :type asset_id: int
        """

        self._asset_id = asset_id

    @property
    def creator(self):
        """Gets the creator of this AssetHolding.  # noqa: E501

        Address that created this asset. This is the address where the parameters for this asset can be found, and also the address where unwanted asset units can be sent in the worst case.  # noqa: E501

        :return: The creator of this AssetHolding.  # noqa: E501
        :rtype: str
        """
        return self._creator

    @creator.setter
    def creator(self, creator):
        """Sets the creator of this AssetHolding.

        Address that created this asset. This is the address where the parameters for this asset can be found, and also the address where unwanted asset units can be sent in the worst case.  # noqa: E501

        :param creator: The creator of this AssetHolding.  # noqa: E501
        :type creator: str
        """

        self._creator = creator

    @property
    def is_frozen(self):
        """Gets the is_frozen of this AssetHolding.  # noqa: E501

        \\[f\\] whether or not the holding is frozen.  # noqa: E501

        :return: The is_frozen of this AssetHolding.  # noqa: E501
        :rtype: bool
        """
        return self._is_frozen

    @is_frozen.setter
    def is_frozen(self, is_frozen):
        """Sets the is_frozen of this AssetHolding.

        \\[f\\] whether or not the holding is frozen.  # noqa: E501

        :param is_frozen: The is_frozen of this AssetHolding.  # noqa: E501
        :type is_frozen: bool
        """

        self._is_frozen = is_frozen

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
        if not isinstance(other, AssetHolding):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, AssetHolding):
            return True

        return self.dictify() != other.dictify()
