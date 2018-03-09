# coding: utf-8
from selenium import webdriver
import time

USER_NAME = '503888058@qq.com'
PASSWORD = 'hanzhichao123'
START_STATION = '北京'
DESTINATION = '安阳'
SETOUT_DATE = '2018-02-13'


d = webdriver.Chrome()

def login(username, password):
    d.get('https://kyfw.12306.cn/otn/login/init')
    d.find_element_by_id("username").send_keys(username)
    d.find_element_by_id("password").send_keys(password)
    time.sleep(10)
    d.find_element_by_id("loginSub").click()

def search_ticket(start_station, distination, setout_date):
    d.get('https://kyfw.12306.cn/otn/leftTicket/init')
    d.find_element_by_id('fromStationText').send_keys(start_station)
    d.find_element_by_id('toStationText').send_keys(distination)
    d.find_element_by_id('train_date').send_keys(setout_date)

if __name__ == '__main__':
    # login(USER_NAME, PASSWORD)
    search_ticket(START_STATION, DESTINATION, SETOUT_DATE)

