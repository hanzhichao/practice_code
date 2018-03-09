# coding=utf-8
from selenium import webdriver
from time import sleep
from selenium_easy import WebPage

d = webdriver.Chrome()
d.get("http://127.0.0.1:9999")
# d.find_element_by_xpath("//label[text()='账号:']/following::input[1]").send_keys("0100401")
# d.find_element_by_xpath("//label[text()='密码:']/following::input[1]").send_keys("000000")
# d.find_element_by_xpath("//li[text()='登录']").click()
# sleep(10)
# d.quit()
p = WebPage(d)
p.type("账号:","0100401")
p.type("密码:","000000")
p.click("登录")