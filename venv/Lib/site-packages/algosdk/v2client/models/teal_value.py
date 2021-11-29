# coding: utf-8


import pprint

class TealValue(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'type': 'int',
        'bytes': 'str',
        'uint': 'int'
    }

    attribute_map = {
        'type': 'type',
        'bytes': 'bytes',
        'uint': 'uint'
    }

    def __init__(self, type=None, bytes=None, uint=None):  # noqa: E501
        """TealValue - a model defined in OpenAPI"""  # noqa: E501

        self._type = None
        self._bytes = None
        self._uint = None

        self.type = type
        self.bytes = bytes
        self.uint = uint

    @property
    def type(self):
        """Gets the type of this TealValue.  # noqa: E501

        \\[tt\\] value type.  # noqa: E501

        :return: The type of this TealValue.  # noqa: E501
        :rtype: int
        """
        return self._type

    @type.setter
    def type(self, type):
        """Sets the type of this TealValue.

        \\[tt\\] value type.  # noqa: E501

        :param type: The type of this TealValue.  # noqa: E501
        :type type: int
        """

        self._type = type

    @property
    def bytes(self):
        """Gets the bytes of this TealValue.  # noqa: E501

        \\[tb\\] bytes value.  # noqa: E501

        :return: The bytes of this TealValue.  # noqa: E501
        :rtype: str
        """
        return self._bytes

    @bytes.setter
    def bytes(self, bytes):
        """Sets the bytes of this TealValue.

        \\[tb\\] bytes value.  # noqa: E501

        :param bytes: The bytes of this TealValue.  # noqa: E501
        :type bytes: str
        """

        self._bytes = bytes

    @property
    def uint(self):
        """Gets the uint of this TealValue.  # noqa: E501

        \\[ui\\] uint value.  # noqa: E501

        :return: The uint of this TealValue.  # noqa: E501
        :rtype: int
        """
        return self._uint

    @uint.setter
    def uint(self, uint):
        """Sets the uint of this TealValue.

        \\[ui\\] uint value.  # noqa: E501

        :param uint: The uint of this TealValue.  # noqa: E501
        :type uint: int
        """

        self._uint = uint

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
        if not isinstance(other, TealValue):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, TealValue):
            return True

        return self.dictify() != other.dictify()
