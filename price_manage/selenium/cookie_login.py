# coding:utf-8
from selene import *
from selenium import webdriver


def cookie_login(d, url):
    open_url(d, url)
    # link(d, "登录").click()
    # # e = link(d, "登录")
    # # print type(e)
    # # xpath(d, ".//*[text()='欢迎登录车满满']/following::input[1]").send_keys("00000")
    # # label_input(d, "欢迎登录车满满", 1).send_keys('2463')
    # placeholder(d, "公司ID").send_keys('556')
    # placeholder(d, "请输入账号").send_keys("chemanman")
    # placeholder(d, "请输入密码").send_keys("cmm888")
    # # link(d, "登录").click()
    # d.find_element_by_id("loginBtn").click()
    # cookie = d.get_cookies()
    # print(cookie)

    cookie_dict1 = {u'domain': u't800.chemanman.com',
                    u'name': u'PHPSESSID',
                    u'value': u'0fd2c354b1298e782f71e1d8b444beda',
                    u'expiry': None, u'path': u'/', u'secure': False}

    cookie_dict2 = {u'domain': u't800.chemanman.com',
                    u'name': u'SERVERID',
                    u'value': u'4f5d281d98a8767e8a3d79104919802f|1496590094|1496590093',
                    u'expiry': None,
                    u'path': u'/',
                    u'secure': False}
    d.add_cookie(cookie_dict1)
    d.add_cookie(cookie_dict2)

    # open_url(d, "http://t800.chemanman.com/Index/Home")
    d.refresh()

if __name__ == "__main__":
    d = webdriver.Firefox()
    cookie_login(d, "http://t800.chemanman.com")