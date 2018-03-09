*** Settings ***
Documentation    Simple examle using SeleniumLibrary
Library    SeleniumLibrary


*** Variables ***
${URL}      http://www.baidu.com
${BROWSER}  Chrome

*** Keywords ***
Baidu Search
    [Arguments]    ${search_key}
    Input text     id:kw    ${search_key}
    click button   id:su
    Evaluate       time.sleep(2)    time
    ${title}       Get title
    [Return]       ${title}

*** Test Case ***
case1
    Open Browser    ${URL}    ${BROWSER}
    ${title}        Baidu Search    robot framework
    Should contain  ${title}    robot framework_百度搜索
    close Browser

case2
    Open Browser    ${URL}    ${BROWSER}
    ${title}        Baidu Search    selenium
    Should contain  ${title}    selenium_百度搜索
    close Browser

