# coding: utf-8


import pprint

class ApplicationParams(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'creator': 'str',
        'approval_program': 'str',
        'clear_state_program': 'str',
        'local_state_schema': 'ApplicationStateSchema',
        'global_state_schema': 'ApplicationStateSchema',
        'global_state': 'list[TealKeyValue]'
    }

    attribute_map = {
        'creator': 'creator',
        'approval_program': 'approval-program',
        'clear_state_program': 'clear-state-program',
        'local_state_schema': 'local-state-schema',
        'global_state_schema': 'global-state-schema',
        'global_state': 'global-state'
    }

    def __init__(self, creator=None, approval_program=None, clear_state_program=None, local_state_schema=None, global_state_schema=None, global_state=None):  # noqa: E501
        """ApplicationParams - a model defined in OpenAPI"""  # noqa: E501

        self._creator = None
        self._approval_program = None
        self._clear_state_program = None
        self._local_state_schema = None
        self._global_state_schema = None
        self._global_state = None

        self.creator = creator
        self.approval_program = approval_program
        self.clear_state_program = clear_state_program
        if local_state_schema is not None:
            self.local_state_schema = local_state_schema
        if global_state_schema is not None:
            self.global_state_schema = global_state_schema
        if global_state is not None:
            self.global_state = global_state

    @property
    def creator(self):
        """Gets the creator of this ApplicationParams.  # noqa: E501

        The address that created this application. This is the address where the parameters and global state for this application can be found.  # noqa: E501

        :return: The creator of this ApplicationParams.  # noqa: E501
        :rtype: str
        """
        return self._creator

    @creator.setter
    def creator(self, creator):
        """Sets the creator of this ApplicationParams.

        The address that created this application. This is the address where the parameters and global state for this application can be found.  # noqa: E501

        :param creator: The creator of this ApplicationParams.  # noqa: E501
        :type creator: str
        """

        self._creator = creator

    @property
    def approval_program(self):
        """Gets the approval_program of this ApplicationParams.  # noqa: E501

        \\[approv\\] approval program.  # noqa: E501

        :return: The approval_program of this ApplicationParams.  # noqa: E501
        :rtype: str
        """
        return self._approval_program

    @approval_program.setter
    def approval_program(self, approval_program):
        """Sets the approval_program of this ApplicationParams.

        \\[approv\\] approval program.  # noqa: E501

        :param approval_program: The approval_program of this ApplicationParams.  # noqa: E501
        :type approval_program: str
        """

        self._approval_program = approval_program

    @property
    def clear_state_program(self):
        """Gets the clear_state_program of this ApplicationParams.  # noqa: E501

        \\[clearp\\] approval program.  # noqa: E501

        :return: The clear_state_program of this ApplicationParams.  # noqa: E501
        :rtype: str
        """
        return self._clear_state_program

    @clear_state_program.setter
    def clear_state_program(self, clear_state_program):
        """Sets the clear_state_program of this ApplicationParams.

        \\[clearp\\] approval program.  # noqa: E501

        :param clear_state_program: The clear_state_program of this ApplicationParams.  # noqa: E501
        :type clear_state_program: str
        """

        self._clear_state_program = clear_state_program

    @property
    def local_state_schema(self):
        """Gets the local_state_schema of this ApplicationParams.  # noqa: E501


        :return: The local_state_schema of this ApplicationParams.  # noqa: E501
        :rtype: ApplicationStateSchema
        """
        return self._local_state_schema

    @local_state_schema.setter
    def local_state_schema(self, local_state_schema):
        """Sets the local_state_schema of this ApplicationParams.


        :param local_state_schema: The local_state_schema of this ApplicationParams.  # noqa: E501
        :type local_state_schema: ApplicationStateSchema
        """

        self._local_state_schema = local_state_schema

    @property
    def global_state_schema(self):
        """Gets the global_state_schema of this ApplicationParams.  # noqa: E501


        :return: The global_state_schema of this ApplicationParams.  # noqa: E501
        :rtype: ApplicationStateSchema
        """
        return self._global_state_schema

    @global_state_schema.setter
    def global_state_schema(self, global_state_schema):
        """Sets the global_state_schema of this ApplicationParams.


        :param global_state_schema: The global_state_schema of this ApplicationParams.  # noqa: E501
        :type global_state_schema: ApplicationStateSchema
        """

        self._global_state_schema = global_state_schema

    @property
    def global_state(self):
        """Gets the global_state of this ApplicationParams.  # noqa: E501

        Represents a key-value store for use in an application.  # noqa: E501

        :return: The global_state of this ApplicationParams.  # noqa: E501
        :rtype: list[TealKeyValue]
        """
        return self._global_state

    @global_state.setter
    def global_state(self, global_state):
        """Sets the global_state of this ApplicationParams.

        Represents a key-value store for use in an application.  # noqa: E501

        :param global_state: The global_state of this ApplicationParams.  # noqa: E501
        :type global_state: list[TealKeyValue]
        """

        self._global_state = global_state

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
        if not isinstance(other, ApplicationParams):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, ApplicationParams):
            return True

        return self.dictify() != other.dictify()
