import requests
import unittest, time


class TestAdd(unittest.TestCase):

    def setUp(self):

        self.base_url = 'http://127.0.0.1:5000'

    def test_add_normal(self):
        '''加法常规测试'''
        url = self.base_url + '/add/'
        data = {"a": 3, "b": 5}
        response = requests.get(url=url, data=data)
        assert response.text == '8'


    def test_add_negative(self):
        '''负数加法测试'''
        url = self.base_url + '/add/'
        data = {"a": -3, "b": 5}
        response = requests.get(url=url, data=data)
        assert response.text == '2'


    def test_add_zero(self):
        '''含零加法测试'''
        url = self.base_url + '/add/'
        data = {"a": 0, "b": 0}
        response = requests.get(url=url, data=data)
        assert response.text == '0'


    def test_add_float(self):
        '''小数加法测试'''
        url = self.base_url + '/add/'
        data = {"a": 3.5, "b": 5.6}
        response = requests.get(url=url, data=data)
        assert response.text == '9.1'

    def test_add_large(self):
        '''大数加法测试'''
        url = self.base_url + '/add/'
        data = {"a": 9999999999999, "b": 9999999999999}
        response = requests.get(url=url, data=data)
        assert response.text == '19999999999998'

    def test_add_octal(self):
        '''八进制加法测试'''
        url = self.base_url + '/add/'
        # data = {"a": 0xAF, "b": 0x36}
        data = {"a": '0xAF', "b": 0x36}
        response = requests.get(url=url, data=data)
        assert response.text == '229'

    def test_add_hex(self):
        '''十六进制加法测试'''
        url = self.base_url + '/add/'
        # data = {"a": 0o4, "b": 0o13}
        data = {"a": '0o4', "b": '0o13'}
        response = requests.get(url=url, data=data)
        assert response.text == '15'