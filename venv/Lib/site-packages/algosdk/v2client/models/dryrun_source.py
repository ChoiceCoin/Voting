# coding: utf-8


import pprint

class DryrunSource(object):
    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'field_name': 'str',
        'source': 'str',
        'txn_index': 'int',
        'app_index': 'int'
    }

    attribute_map = {
        'field_name': 'field-name',
        'source': 'source',
        'txn_index': 'txn-index',
        'app_index': 'app-index'
    }

    def __init__(self, field_name=None, source=None, txn_index=None, app_index=None):  # noqa: E501
        """DryrunSource - a model defined in OpenAPI"""  # noqa: E501

        self._field_name = None
        self._source = None
        self._txn_index = None
        self._app_index = None

        self.field_name = field_name
        self.source = source
        self.txn_index = txn_index
        self.app_index = app_index

    @property
    def field_name(self):
        """Gets the field_name of this DryrunSource.  # noqa: E501

        FieldName is what kind of sources this is. If lsig then it goes into the transactions[this.TxnIndex].LogicSig. If approv or clearp it goes into the Approval Program or Clear State Program of application[this.AppIndex].  # noqa: E501

        :return: The field_name of this DryrunSource.  # noqa: E501
        :rtype: str
        """
        return self._field_name

    @field_name.setter
    def field_name(self, field_name):
        """Sets the field_name of this DryrunSource.

        FieldName is what kind of sources this is. If lsig then it goes into the transactions[this.TxnIndex].LogicSig. If approv or clearp it goes into the Approval Program or Clear State Program of application[this.AppIndex].  # noqa: E501

        :param field_name: The field_name of this DryrunSource.  # noqa: E501
        :type field_name: str
        """

        self._field_name = field_name

    @property
    def source(self):
        """Gets the source of this DryrunSource.  # noqa: E501


        :return: The source of this DryrunSource.  # noqa: E501
        :rtype: str
        """
        return self._source

    @source.setter
    def source(self, source):
        """Sets the source of this DryrunSource.


        :param source: The source of this DryrunSource.  # noqa: E501
        :type source: str
        """

        self._source = source

    @property
    def txn_index(self):
        """Gets the txn_index of this DryrunSource.  # noqa: E501


        :return: The txn_index of this DryrunSource.  # noqa: E501
        :rtype: int
        """
        return self._txn_index

    @txn_index.setter
    def txn_index(self, txn_index):
        """Sets the txn_index of this DryrunSource.


        :param txn_index: The txn_index of this DryrunSource.  # noqa: E501
        :type txn_index: int
        """

        self._txn_index = txn_index

    @property
    def app_index(self):
        """Gets the app_index of this DryrunSource.  # noqa: E501


        :return: The app_index of this DryrunSource.  # noqa: E501
        :rtype: int
        """
        return self._app_index

    @app_index.setter
    def app_index(self, app_index):
        """Sets the app_index of this DryrunSource.


        :param app_index: The app_index of this DryrunSource.  # noqa: E501
        :type app_index: int
        """

        self._app_index = app_index

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
        if not isinstance(other, DryrunSource):
            return False

        return self.dictify() == other.dictify()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, DryrunSource):
            return True

        return self.dictify() != other.dictify()
