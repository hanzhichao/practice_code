from selenium import webdriver
from time import sleep

d = webdriver.Chrome()
d.maximize_window()
d.get("http://detail.spicespirit.com/index/index/login")
d.find_element_by_id('nickname').send_keys('hanzhichao')
d.find_element_by_id('password').send_keys('hanzhichao')
d.find_element_by_id('login').click()

sleep(1)
d.find_element_by_partial_link_text('物流管理系统').click()
d.find_element_by_link_text('订单派送').click()
d.find_element_by_link_text('未完成订单').click()
sleep(1)
pre_handle = d.current_window_handle
d.find_element_by_link_text('打印').click()
sleep(3)
handles = d.window_handles
print(len(handles))

for handle in handles:
    if handle != pre_handle:
        d.switch_to.window(handle)
