# coding: utf-8


import pprint

class ApplicationLocalState(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'id': 'int',
        'schema': 'ApplicationStateSchema',
        'key_value': 'list[TealKeyValue]'
    }

    attribute_map = {
        'id': 'id',
        'schema': 'schema',
        'key_value': 'key-value'
    }

    def __init__(self, id=None, schema=None, key_value=None):  # noqa: E501
        """ApplicationLocalState - a model defined in OpenAPI"""  # noqa: E501

        self._id = None
        self._schema = None
        self._key_value = None

        self.id = id
        self.schema = schema
        self.key_value = key_value

    @property
    def id(self):
        """Gets the id of this ApplicationLocalState.  # noqa: E501

        The application which this local state is for.  # noqa: E501

        :return: The id of this ApplicationLocalState.  # noqa: E501
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this ApplicationLocalState.

        The application which this local state is for.  # noqa: E501

        :param id: The id of this ApplicationLocalState.  # noqa: E501
        :type id: int
        """

        self._id = id

    @property
    def schema(self):
        """Gets the schema of this ApplicationLocalState.  # noqa: E501


        :return: The schema of this ApplicationLocalState.  # noqa: E501
        :rtype: ApplicationStateSchema
        """
        return self._schema

    @schema.setter
    def schema(self, schema):
        """Sets the schema of this ApplicationLocalState.


        :param schema: The schema of this ApplicationLocalState.  # noqa: E501
        :type schema: ApplicationStateSchema
        """

        self._schema = schema

    @property
    def key_value(self):
        """Gets the key_value of this ApplicationLocalState.  # noqa: E501

        Represents a key-value store for use in an application.  # noqa: E501

        :return: The key_value of this ApplicationLocalState.  # noqa: E501
        :rtype: list[TealKeyValue]
        """
        return self._key_value

    @key_value.setter
    def key_value(self, key_value):
        """Sets the key_value of this ApplicationLocalState.

        Represents a key-value store for use in an application.  # noqa: E501

        :param key_value: The key_value of this ApplicationLocalState.  # noqa: E501
        :type key_value: list[TealKeyValue]
        """

        self._key_value = key_value

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
        if not isinstance(other, ApplicationLocalState):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, ApplicationLocalState):
            return True

        return self.dictify() != other.dictify()
