from selenium import webdriver
from selenium.webdriver.remote import webelement
from selenium.webdriver.common.action_chains import ActionChains
import time


# decorators
def elapse_time(func):
    def _deco(dr, text):
        start = time.clock()
        ret = func(dr, text)
        end = time.clock()
        elapse = end - start
        print func.__name__,
        print text,
        print "%fs" % (end - start)
        return ret
    return _deco


# locate method
@elapse_time
def link(dr, text):
    element = dr.find_element_by_link_text(text)
    return element


@elapse_time
def xpath(dr, x_path):
    return dr.find_element_by_xpath(x_path)


@elapse_time
def label_input(dr, text, index=1):
    x_path = ".//*[text()='" + text + "']/following::input[" + str(index) + "]"
    # print x_path
    return dr.find_element_by_xpath(x_path)


@elapse_time
def button_value(dr, value):
    x_path = ".//input[@value=" + value + "]"
    return dr.find_element_by_xpath(x_path)

@elapse_time
def button(dr, text):
    x_path = ".//button[text()='"+ text +"']"
    return dr.find_element_by_xpath(x_path)


@elapse_time
def placeholder(dr, text):
    x_path = ".//input[@placeholder='" + text + "']"
    return dr.find_element_by_xpath(x_path)

@elapse_time
def id(dr, text):
    return dr.find_element_by_id(text)


# action method
@elapse_time
def re_input(element, text):
    element.clear()
    element.send_keys(text)


@elapse_time
def hover(dr, element):
    ActionChains(dr).move_to_element(element).perform()


@elapse_time
def dbclick(dr, element):
    ActionChains(dr).double_click(element).perform()


@elapse_time
def open_url(dr, url):
    dr.get(url)


if __name__ == "__main__":
    d = webdriver.Firefox()
    open_url(d, "http://www.baidu.com")
