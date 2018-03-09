*** Settings ***
Library     RequestsLibrary

*** Test Cases ***

test request

    ${headers}          Create Dictionary   Content-Type=application/x-www-form-urlencoded
    Create Session      api                 http://192.168.100.238:8086/gateway/Synchronize/entrance    ${headers}
    ${data}             Set Variable        appCode=YjZhZTJiZDkxZmI5NjUwODE2MTlmYTVhZDQ4ZWY1NjA=&timeCode=1511946653&sFormId=approval&sContent={"k3_id":"1234","k3_code":"cg123","status":"1","id":"25","code":"20171119002","detail":[{"operator":"张三","status":"2","remark":"同意"},{"operator":"张三","status":"2","remark":"同意"}]}
    ${res}              Post Request        api    post    data=${data}
    Log                 ${res.json()}