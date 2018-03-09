 *** Settings ***
Documentation     This example demonstrates how to use current library
Library    SeleniumLibrary

*** Test cases ***
Open Browser with Chrome options in headless mode
    ${options}  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method  ${options}  add_argument  --start-maximized
    Call Method  ${options}  add_argument  --headless
    Call Method  ${options}  add_argument  --disable-gpu
    #Call Method  ${options}  add_argument  --remote-debugging-port=${9222}
    Create Webdriver    Chrome   chrome_options=${options}
    Go To    https://www.baidu.com
    ${title}=    Get Title
    Log to console    ${title}