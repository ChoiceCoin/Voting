# coding: utf-8


import pprint

class ApplicationStateSchema(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'num_uint': 'int',
        'num_byte_slice': 'int'
    }

    attribute_map = {
        'num_uint': 'num-uint',
        'num_byte_slice': 'num-byte-slice'
    }

    def __init__(self, num_uint=None, num_byte_slice=None):  # noqa: E501
        """ApplicationStateSchema - a model defined in OpenAPI"""  # noqa: E501

        self._num_uint = None
        self._num_byte_slice = None

        self.num_uint = num_uint
        self.num_byte_slice = num_byte_slice

    @property
    def num_uint(self):
        """Gets the num_uint of this ApplicationStateSchema.  # noqa: E501

        \\[nui\\] num of uints.  # noqa: E501

        :return: The num_uint of this ApplicationStateSchema.  # noqa: E501
        :rtype: int
        """
        return self._num_uint

    @num_uint.setter
    def num_uint(self, num_uint):
        """Sets the num_uint of this ApplicationStateSchema.

        \\[nui\\] num of uints.  # noqa: E501

        :param num_uint: The num_uint of this ApplicationStateSchema.  # noqa: E501
        :type num_uint: int
        """

        self._num_uint = num_uint

    @property
    def num_byte_slice(self):
        """Gets the num_byte_slice of this ApplicationStateSchema.  # noqa: E501

        \\[nbs\\] num of byte slices.  # noqa: E501

        :return: The num_byte_slice of this ApplicationStateSchema.  # noqa: E501
        :rtype: int
        """
        return self._num_byte_slice

    @num_byte_slice.setter
    def num_byte_slice(self, num_byte_slice):
        """Sets the num_byte_slice of this ApplicationStateSchema.

        \\[nbs\\] num of byte slices.  # noqa: E501

        :param num_byte_slice: The num_byte_slice of this ApplicationStateSchema.  # noqa: E501
        :type num_byte_slice: int
        """

        self._num_byte_slice = num_byte_slice

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
        if not isinstance(other, ApplicationStateSchema):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, ApplicationStateSchema):
            return True

        return self.dictify() != other.dictify()
