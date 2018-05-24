# coding:utf-8
from webdriver_extension import *
from selenium import webdriver
import sys
reload(sys)
sys.setdefaultencoding('utf8')



def login(d, url):
    open_url(d, url)
    link(d, "登录").click()
    placeholder(d, "公司ID").send_keys('7114')
    placeholder(d, "请输入账号").send_keys("admin")
    placeholder(d, "请输入密码").send_keys("1qaz!QAZ")
    # link(d, "登录").click()
    id(d,"loginBtn").click()
    # cookie = d.get_cookies()
    # print(cookie)

if __name__ == "__main__":
    d = webdriver.Chrome()
    login(d, "http://t800.chemanman.com")
