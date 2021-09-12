import configparser
import os


def read_config_file(filename):
    config = configparser.ConfigParser()
    config.read(filename)
    return config


def get_default_configfile():
    return os.path.join(os.path.expanduser("~"), ".choice_coin.ini")
