# coding=utf-8

from appium import webdriver
from time import sleep
# import sys
# reload(sys)
# sys.setdefaultencoding('utf8')

desired_caps = {}
desired_caps['platformName'] = 'Android'
desired_caps['platformVersion'] = '23'
desired_caps['deviceName'] = '162a7a6a'
desired_caps['appPackage'] = 'com.tencent.mm'
# desired_caps['appActivity'] = 'com.tencent.mm.app.WeChatSplashActivity'
desired_caps['appActivity'] = '.ui.LauncherUI'
desired_caps['unicodeKeyboard'] = True,    # 使用 Unicode 输入法  
desired_caps['resetKeyboard'] = True,   # 重置输入法到原有状态  


d = webdriver.Remote('http://127.0.0.1:4723/wd/hub', desired_caps)
d. implicitly_wait(10)
d.find_element_by_accessibility_id("搜索").click()
sleep(0.5)
d.find_element_by_id("com.tencent.mm:id/ht").send_keys(u"麻小技术")
sleep(1)
d.find_element_by_id('com.tencent.mm:id/ko').click()
sleep(0.5)
d.find_element_by_id('com.tencent.mm:id/aaq').click()
sleep(0.5)
d.find_element_by_name('测试订餐').click()
sleep(3)

sleep(10)
d.quit()