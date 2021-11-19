# coding: utf-8


import pprint

class AccountParticipation(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'selection_participation_key': 'str',
        'vote_first_valid': 'int',
        'vote_key_dilution': 'int',
        'vote_last_valid': 'int',
        'vote_participation_key': 'str'
    }

    attribute_map = {
        'selection_participation_key': 'selection-participation-key',
        'vote_first_valid': 'vote-first-valid',
        'vote_key_dilution': 'vote-key-dilution',
        'vote_last_valid': 'vote-last-valid',
        'vote_participation_key': 'vote-participation-key'
    }

    def __init__(self, selection_participation_key=None, vote_first_valid=None, vote_key_dilution=None, vote_last_valid=None, vote_participation_key=None):  # noqa: E501
        """AccountParticipation - a model defined in OpenAPI"""  # noqa: E501

        self._selection_participation_key = None
        self._vote_first_valid = None
        self._vote_key_dilution = None
        self._vote_last_valid = None
        self._vote_participation_key = None

        self.selection_participation_key = selection_participation_key
        self.vote_first_valid = vote_first_valid
        self.vote_key_dilution = vote_key_dilution
        self.vote_last_valid = vote_last_valid
        self.vote_participation_key = vote_participation_key

    @property
    def selection_participation_key(self):
        """Gets the selection_participation_key of this AccountParticipation.  # noqa: E501

        \\[sel\\] Selection public key (if any) currently registered for this round.  # noqa: E501

        :return: The selection_participation_key of this AccountParticipation.  # noqa: E501
        :rtype: str
        """
        return self._selection_participation_key

    @selection_participation_key.setter
    def selection_participation_key(self, selection_participation_key):
        """Sets the selection_participation_key of this AccountParticipation.

        \\[sel\\] Selection public key (if any) currently registered for this round.  # noqa: E501

        :param selection_participation_key: The selection_participation_key of this AccountParticipation.  # noqa: E501
        :type selection_participation_key: str
        """

        self._selection_participation_key = selection_participation_key

    @property
    def vote_first_valid(self):
        """Gets the vote_first_valid of this AccountParticipation.  # noqa: E501

        \\[voteFst\\] First round for which this participation is valid.  # noqa: E501

        :return: The vote_first_valid of this AccountParticipation.  # noqa: E501
        :rtype: int
        """
        return self._vote_first_valid

    @vote_first_valid.setter
    def vote_first_valid(self, vote_first_valid):
        """Sets the vote_first_valid of this AccountParticipation.

        \\[voteFst\\] First round for which this participation is valid.  # noqa: E501

        :param vote_first_valid: The vote_first_valid of this AccountParticipation.  # noqa: E501
        :type vote_first_valid: int
        """

        self._vote_first_valid = vote_first_valid

    @property
    def vote_key_dilution(self):
        """Gets the vote_key_dilution of this AccountParticipation.  # noqa: E501

        \\[voteKD\\] Number of subkeys in each batch of participation keys.  # noqa: E501

        :return: The vote_key_dilution of this AccountParticipation.  # noqa: E501
        :rtype: int
        """
        return self._vote_key_dilution

    @vote_key_dilution.setter
    def vote_key_dilution(self, vote_key_dilution):
        """Sets the vote_key_dilution of this AccountParticipation.

        \\[voteKD\\] Number of subkeys in each batch of participation keys.  # noqa: E501

        :param vote_key_dilution: The vote_key_dilution of this AccountParticipation.  # noqa: E501
        :type vote_key_dilution: int
        """

        self._vote_key_dilution = vote_key_dilution

    @property
    def vote_last_valid(self):
        """Gets the vote_last_valid of this AccountParticipation.  # noqa: E501

        \\[voteLst\\] Last round for which this participation is valid.  # noqa: E501

        :return: The vote_last_valid of this AccountParticipation.  # noqa: E501
        :rtype: int
        """
        return self._vote_last_valid

    @vote_last_valid.setter
    def vote_last_valid(self, vote_last_valid):
        """Sets the vote_last_valid of this AccountParticipation.

        \\[voteLst\\] Last round for which this participation is valid.  # noqa: E501

        :param vote_last_valid: The vote_last_valid of this AccountParticipation.  # noqa: E501
        :type vote_last_valid: int
        """

        self._vote_last_valid = vote_last_valid

    @property
    def vote_participation_key(self):
        """Gets the vote_participation_key of this AccountParticipation.  # noqa: E501

        \\[vote\\] root participation public key (if any) currently registered for this round.  # noqa: E501

        :return: The vote_participation_key of this AccountParticipation.  # noqa: E501
        :rtype: str
        """
        return self._vote_participation_key

    @vote_participation_key.setter
    def vote_participation_key(self, vote_participation_key):
        """Sets the vote_participation_key of this AccountParticipation.

        \\[vote\\] root participation public key (if any) currently registered for this round.  # noqa: E501

        :param vote_participation_key: The vote_participation_key of this AccountParticipation.  # noqa: E501
        :type vote_participation_key: str
        """

        self._vote_participation_key = vote_participation_key

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
        if not isinstance(other, AccountParticipation):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, AccountParticipation):
            return True

        return self.dictify() != other.dictify()
