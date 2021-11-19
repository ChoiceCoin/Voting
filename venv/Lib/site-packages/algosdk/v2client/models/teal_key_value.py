# coding: utf-8


import pprint

class TealKeyValue(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'key': 'str',
        'value': 'TealValue'
    }

    attribute_map = {
        'key': 'key',
        'value': 'value'
    }

    def __init__(self, key=None, value=None):  # noqa: E501
        """TealKeyValue - a model defined in OpenAPI"""  # noqa: E501

        self._key = None
        self._value = None

        self.key = key
        self.value = value

    @property
    def key(self):
        """Gets the key of this TealKeyValue.  # noqa: E501


        :return: The key of this TealKeyValue.  # noqa: E501
        :rtype: str
        """
        return self._key

    @key.setter
    def key(self, key):
        """Sets the key of this TealKeyValue.


        :param key: The key of this TealKeyValue.  # noqa: E501
        :type key: str
        """

        self._key = key

    @property
    def value(self):
        """Gets the value of this TealKeyValue.  # noqa: E501


        :return: The value of this TealKeyValue.  # noqa: E501
        :rtype: TealValue
        """
        return self._value

    @value.setter
    def value(self, value):
        """Sets the value of this TealKeyValue.


        :param value: The value of this TealKeyValue.  # noqa: E501
        :type value: TealValue
        """

        self._value = value

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
        if not isinstance(other, TealKeyValue):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, TealKeyValue):
            return True

        return self.dictify() != other.dictify()
