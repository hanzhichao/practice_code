*** Settings ***
Library    DatabaseLibrary

*** Test Case ***
Test
    Connect To Database Using Custom Params    pymysql    database='spicespirit', user='root', password='spice', host='192.168.100.198', port=3306,charset='utf8'
    ${result}     Query     select * from u_user where phone='18010181267'
    log           ${result}