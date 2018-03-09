# coding:utf-8

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

def check_keyward(keyward, ads_title, page_title):
    # dr = webdriver.Chrome()
    options = Options()
    options.add_argument('disable-infobars')   
    options.add_argument('--headless')  # 无界面模式
    options.add_argument('--disable-gpu')
    dr = webdriver.Chrome(chrome_options=options)

    dr.get("http://m.sm.cn/s?q=%s&from=ws&by=submit&snum=6" % keyward)
    try:
        dr.find_element_by_partial_link_text(ads_title).click()
    except NoSuchElementException:
        print('关键字: \'%s\', 无法定位到广告标题！' % keyward)
    # print(page_title,type(page_title))
    # print(dr.title,type(page_title))
    if page_title in dr.title:
        print('关键字: \'%s\', 广告正常展示！' % keyward)
    else:
        print('关键字: \'%s\', 广告页面标题与参数不符！'% keyward)


def main(data_file='data.txt'):
    # if not python3, need import codecs and use codecs.open(data_file, encoding='utf-8-sig')
    with open(data_file,encoding='utf-8') as f:
        lines = f.readlines()
    for line in lines:
        if line[-1] == '\n':
            line = line[:-1]
        line = line.split(',')
        # print(line)
        check_keyward(line[0], line[1], line[2])



# check_keyward('鲜花','订2花派','订花派鲜花网')
main()


