from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException,TimeoutException
from selenium.webdriver.support.wait import WebDriverWait

def get_price(d, keyword):
    try:
        return d.find_element_by_xpath("//td[contains(text(),'%s')]/following-sibling::td[2]" % keyword).text
    except NoSuchElementException:
        print("使用xpath:\"//td[contains(text(),'%s')]/following-sibling::td[6]\" 定位元素失败" % keyword)
        return None

def has_changed(d, keyword, origin_price):
    d.refresh()
    return True if get_price(d, keyword) != origin_price else False


def check_price(d, keyword):
    origin_price = get_price(d, keyword)
    try:
        WebDriverWait(d,10).until(lambda x: has_changed(x, keyword, origin_price))
        d.find_element_by_xpath("//td[contains(text(),'%s')]/following-sibling::td[3]/a[text()='购买']" % keyword).click()
    except TimeoutException:
        print('3s内 \"%s\" 价格未发生变化' % keyword)
    

d = webdriver.Chrome()
d.get("https://jiage.cngold.org/c/2018-03-27/c5718768.html")
check_price(d,'长江')
