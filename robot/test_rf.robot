*** Settings ***
Library     SeleniumLibrary


*** Test Cases ***

test rf
    log    hello robot framework

Baidu search case
    Open Browser    http://www.baidu.com    chrome
    Input text    id=kw    robot framework
    Click button    id=su
    Close Browser