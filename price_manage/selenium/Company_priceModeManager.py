# coding:utf-8
from selenium import webdriver
from webdriver_extension import *
from login import login
from time import sleep

base_url = 'http://w-beta-1000.chemanman.com:7815'
uri = '/Company/priceModeManager/'
url = base_url + uri

dr = webdriver.Chrome()
login(dr, base_url)
sleep(5)
dr.get(url)
sleep(5)
#xpath(dr,".//button[text()='新增']")

# 新增价格模式
button(dr, "新增").click()
label_input(dr, '价格模式名称:').send_keys(u"测试价格模式")
xpath(dr, ".//input[@value='到付']/following::input[1]").click()
xpath(dr,'html/body/div[9]/div/table/tbody/tr[1]/td').click()


#button(dr,'确定').click()

