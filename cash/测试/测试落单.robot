*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${base_url}       http://127.0.0.1:9999
${username}       0100401
${password}       000000

*** Test Cases ***
登录
    [Tags]    level1
    # Open browser    ${base_url}    chrome
    Chrome headless    ${base_url}
    Input    账号    ${username}
    Input    密码    ${password}
    Click    登录
    Sleep    3
    Click element    xpath=//span[text()="麻辣小龙虾"]
    Sleep    1
    Input text    xpath=//label[text()="请输入数量（只）:"]/following::input[1]    1
    Click element    xpath=//li[text()="确定"]
    Sleep    1
    Click element    xpath=//a[text()="结算"]
    Sleep    1
    Click element    xpath=//a[text()="快速结账"]
    Click element    xpath=//a[text()="确定"]
    Sleep    1
    Click element    xpath=//div[@class="layer-settling"]/a[text()="确定"]
    Sleep    3
    Close browser

*** Keywords ***
Click
    [Arguments]    ${text}
    Click element    xpath=//*[text()="${text}"]

Input
    [Arguments]    ${label}    ${text}
    Input text    xpath=//*[contains(text(),"${label}")]/following::input    ${text}

Chrome Headless
    [Arguments]    ${url}
    ${options}    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${options}    add_argument    --start-maximized
    Call Method    ${options}    add_argument    --disable-infobars
    # Call Method    ${options}    add_argument    --headless
    # Call Method    ${options}    add_argument    --disable-gpu
    Create Webdriver    Chrome    chrome_options=${options}
    Go To    ${url}
