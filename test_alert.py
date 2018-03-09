from selenium import webdriver
from time import sleep
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import win32api
import win32con

d = webdriver.Chrome()
d.get('https://www.haomaojf.com/api/pc/product/baseList.action?productType=7')
sleep(1)
win32api.keybd_event(86,0,win32con.KEYEVENTF_KEYUP,0)
# actions = ActionChains(d)
# actions.send_keys('abc')
# actions.perform()
# d.send_keys("abc")
# a1 = Alert(d)
# a1 = d.switch_to.alert
# a1.send_keys('send some words to alert!')
# sleep(1)
# print(a1.text)
# a1.authenticate('username','password')
sleep(10)
d.quit()
