from selenium import webdriver
d = webdriver.Chrome()
d.maximize_window()
d.get("https://ucenter.17zuoye.com/")
js = 'document.querySelector(".flex-viewport").style.overflow="auto";'
d.execute_script(js)
d.find_element_by_xpath("//div[@class='flex-viewport']/ul/li[3]/div/div/div[2]/a[1]").click()


