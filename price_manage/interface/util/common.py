import json
import ConfigParser
from selenium import webdriver


def get_json(path):
    with open(path) as req:
        return json.load(req)


def get_conf(path, section, key):
    conf = ConfigParser.ConfigParser()
    conf.read(path)
    return conf.get(section, key)
