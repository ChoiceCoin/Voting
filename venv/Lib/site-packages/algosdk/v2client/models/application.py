# coding: utf-8


import pprint

class Application(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'id': 'int',
        'params': 'ApplicationParams'
    }

    attribute_map = {
        'id': 'id',
        'params': 'params'
    }

    def __init__(self, id=None, params=None):  # noqa: E501
        """Application - a model defined in OpenAPI"""  # noqa: E501

        self._id = None
        self._params = None

        self.id = id
        self.params = params

    @property
    def id(self):
        """Gets the id of this Application.  # noqa: E501

        \\[appidx\\] application index.  # noqa: E501

        :return: The id of this Application.  # noqa: E501
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this Application.

        \\[appidx\\] application index.  # noqa: E501

        :param id: The id of this Application.  # noqa: E501
        :type id: int
        """

        self._id = id

    @property
    def params(self):
        """Gets the params of this Application.  # noqa: E501


        :return: The params of this Application.  # noqa: E501
        :rtype: ApplicationParams
        """
        return self._params

    @params.setter
    def params(self, params):
        """Sets the params of this Application.


        :param params: The params of this Application.  # noqa: E501
        :type params: ApplicationParams
        """

        self._params = params

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
        if not isinstance(other, Application):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, Application):
            return True

        return self.dictify() != other.dictify()
