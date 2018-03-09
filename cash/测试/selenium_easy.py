# !/usr/bin/env python
# -*- coding=utf-8 -*-
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.select import Select
#from util.log import logger
#from util.db import DB


class WebPage(object):
    
    def __init__(self, driver):
        self.driver = driver
    
    def find_element(self, *loc):
        return self.driver.find_element(*loc)
    
    def by_xpath(self, xpath, multi=False, index=None):
        if not multi:
            return self.driver.find_element_by_xpath(xpath)
        elif index is not None:
            print(index, type(index))
            print(self.driver.find_elements_by_xpath(xpath))
            return self.driver.find_elements_by_xpath(xpath)[index-1]
        else:
            return self.driver.find_elements_by_xpath(xpath)
    
    def find_input_by_label(self, label, index=1):
        return self.by_xpath('//*[contains(text(),"%s")]/following::input[%d]' % (label, index))
    
    def find_textarea_by_label(self, label, index=1):
        return self.by_xpath('//*[contains(text(),%s)]/following::textarea[%d]' % (label, index))
    
    def find_input_by_hint_text(self, hint_text, index=1):
        return self.by_xpath('//input[@placeholder="%s"][%d]' % (hint_text, index))
    
    def find_textarea_by_hint_text(self, hint_text, index=1):
        return self.by_xpath('//textarea[@placeholder="%s"][%d]' % (hint_text, index))
    
    def find_element_by_text(self, text, index=1):
        try:
            return self.by_xpath("//*[(text()='%s'][%d]" % (text, index))
        except NoSuchElementException:
            try:
                return self.by_xpath("//*[contains(text(),%s][%d]" % (text, index))
            except NoSuchElementException:
                print("页面上找不到该文本")

    def find_radio_by_group_label(self, label, index):
        return self.by_xpath('//*[contains(text(),"%s")]/following::'
                             'input[@type="radio"][%d]' % (label, index))

    def find_radio_by_label(self, label, index=1):
        return self.by_xpath("//*[text()='%s']/preceding::input[@type='radio'][%d]" % (label, index))
       
    def find_select_by_label(self, label, index=1):
        return self.by_xpath('//*[contains(text(),"%s")]/following::select[%d]' % (label, index))

    def find_text_by_table_column_name(self, column_name, n, multi=False, index=None):  # n means row_index=n,begin with 1
        pass
    
    def find_button_by_value(self, value, index=1):
        try:
            return self.by_xpath('//input[@type="button"][@value="%s"][%d]' % (value, index))
        except NoSuchElementException:
            print("找不到按钮'%s',尝试寻找该文本链接..." % value)
            return self.find_link_by_text(value)
        except IndexError:
            print("找不到按钮'%s',尝试寻找该文本链接..." % value)
            return self.find_link_by_text(value)
        
    def find_link_by_text(self, text, index=1):
        try:
            return self.driver.find_element_by_link_text(text)
        except NoSuchElementException:
            try:
                print("找不到与文本'%s'完全一致的链接，尝试寻找包含该文本的链接..." % text)
                return self.driver.find_element_by_partial_link_text(text)
            except NoSuchElementException:
                print("找不到文本包含'%s'的链接，尝试去掉空格完全匹配..." % text)
            try:
                return self.by_xpath('//a[normalize-space(contains(text(),"%s"))][%d]' % (text, index))
            except NoSuchElementException:
                print("找不到文本为%s的链接或按钮")
                
    # --------------element action---------------------
    def type(self, label, text, index=1):
        if isinstance(label, str):
            try:
                input_elm = self.find_input_by_label(label, index)
                input_elm.clear()
                input_elm.send_keys(text)
            except NoSuchElementException:
                try:
                    input_elm = self.find_input_by_hint_text(label, index)
                    input_elm.clear()
                    input_elm.send_keys(text)
                except NoSuchElementException:
                    print("标签或提示文字为%s的输入框定位失败！" % label)
        elif isinstance(label, tuple or list):
            try:
                input_elm = self.find_element(*label)
                input_elm.clear()
                input_elm.send_keys(text)
            except NoSuchElementException:
                print("标签或提示文字为%s的输入框定位失败！" % label)
    
    def type_date(self, label, date):
        self.type(label, date)
        self.click()
        
    def type_area(self, label, text, index=1):
            try:
                textarea_elm = self.find_textarea_by_label(label, index)
                textarea_elm.send_keys(text)
            except NoSuchElementException:
                try:
                    textarea_elm = self.find_textarea_by_hint_text(label, index)
                    textarea_elm.send_keys(text)
                except NoSuchElementException:
                    print("标签或提示文字为%s的文本框定位失败！" % label)
                
    def click(self, text=None, index=1):
        if not text:
            self.by_xpath("//body").click()
        elif isinstance(text, str):
            self.find_button_by_value(text, index).click()
        elif isinstance(text, tuple or list):
            self.find_element(*text).click()
    
    def clicks(self, *args):
        if len(args) == 1:
            for text in args[0]:
                self.find_link_by_text(text).click()
        if len(args) > 1:
            for text in args:
                self.find_link_by_text(text).click()
        elif not args:
            self.by_xpath("//body").click()
   
    def click_element(self, *loc):
        self.find_element(*loc).click()
        
    def check(self, *args):
        if len(args) == 1:
            self.find_radio_by_label(args).click()
        elif len(args) == 2:
            if isinstance(args[1], int):
                self.find_radio_by_group_label(args[0], args[1]).click()
            elif isinstance(args[1], str):
                self.find_radio_by_label(args[1]).click()
    
    def select(self, label, option, index=1):
        select_elm = Select(self.find_select_by_label(label, index))
        if isinstance(option, str):
            select_elm.select_by_visible_text(option)
        elif isinstance(option, int):
            select_elm.select_by_index(option-1)
       
    # -----------------------get value------------------------
    def get_input_value(self, label):
        return self.find_input_by_label(label).get_attribute('value')
    
    def get_textarea_text(self, label):
        return self.find_textarea_by_label(label).text
    
    def get_radio_value(self, label):
        return self.by_xpath('//*[contains(text(),"%s")]/following::input[@type="radio"]'
                             '[@checked="checked"][1]' % label).get_attribute("value")
    
    def get_select_value(self, label):
        return Select(self.find_select_by_label(label)).first_selected_option.text


class Element:
    def __init__(self, page, label, db_map=None):
        self.label = label
        self.page = page
        self.db_map=db_map
    
    @property
    def value(self):
        return ""
    
    @property
    def db_value(self):
        if self.db_map:
            db = DB()
            return db.get(key=self.db_map[0], table=self.db_map[1], where_condition=self.db_map[2])[0]
        else:
            return "not set db_map"
    
    def compare_db(self):
        return self.db_value == self.value


class Input(Element):
    def type(self, text):
        self.page.type(self.label, text)

    @property
    def value(self):
        return self.page.get_input_value(self.label)


class Link(Element):
    def click(self):
        self.page.click(self.label)

       
class Textarea(Element):
    @property
    def value(self):
        return self.page.get_textarea_text(self.label)
    
    def type(self, text):
        self.page.type_area(self.label, text)


class Radio(Element):
    @property
    def value(self):
        return self.page.get_radio_value(self.label)
    
    def check(self, option):
        self.page.check(self.label, option)

        
class Option(Element):
    @property
    def value(self):
        return self.page.get_select_value(self.label)
    
    def select(self, option):
        self.page.select(self.label, option)
