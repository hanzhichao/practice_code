define("user/group_cgi.js",["common/wx/Cgi.js","biz_web/lib/json.js","common/wx/Tips.js","common/wx/dialog.js"],function(e,i,r){
"use strict";
var o=e("common/wx/Cgi.js"),n=e("biz_web/lib/json.js"),t=e("common/wx/Tips.js");
r.exports={
add:function(e,i){
o.post({
url:"/cgi-bin/modifygroup?t=ajax-friend-group",
data:{
func:"add",
name:e
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void t.err("添加失败");
var r=1*e.base_resp.ret;
switch(r){
case 0:
t.suc("添加成功"),"function"==typeof i&&i(e);
break;

case-100:
t.err("分组数量已达上限，无法添加分组");
break;

default:
o.handleRet(e,{
id:64462,
key:69,
url:"/cgi-bin/modifygroup",
msg:"添加失败"
});
}
});
},
rename:function(e,i,r){
o.post({
url:"/cgi-bin/modifygroup?t=ajax-friend-group",
data:{
func:"rename",
id:e,
name:i
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void t.err("修改失败");
var i=e.base_resp.ret;
0==i?(t.suc("修改成功"),"function"==typeof r&&r(e)):o.handleRet(e,{
id:64462,
key:70,
url:"/cgi-bin/modifygroup",
msg:"修改失败"
});
});
},
del:function(i,r,n){
o.post({
url:"/cgi-bin/modifygroup?t=ajax-friend-group",
data:{
func:"del",
id:i
},
mask:!1
},function(i){
if(!i||!i.base_resp)return void t.err("删除失败");
var s=i.base_resp.ret;
if(0==s)t.suc("删除成功"),"function"==typeof r&&r(i);else if(-1001==s){
var a=e("common/wx/dialog.js");
a.show({
title:"温馨提示",
msg:"无法删除|仅支持删除粉丝数不超过1万的分组，请先将部分用户迁出后再删除该分组",
hideClose:!1,
type:"err",
width:960,
draggable:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),n.remove();
}else o.handleRet(i,{
id:64462,
key:71,
url:"/cgi-bin/modifygroup",
msg:"删除失败"
}),n.remove();
});
},
verify:function(e,i){
var r={
opcode:1,
verifyuser:e
};
o.post({
url:"/cgi-bin/modifycontacts?t=ajax-meeting-verify",
data:{
f:"json",
action:"verifyop",
verifyuser:n.stringify2(r)
},
dataType:"html",
mask:!1,
error:function(){
t.err("系统错误，请重试");
}
},{
done:function(e){
if(!e||!e.base_resp)return void t.err("网络异常，请刷新页面后重试");
var r=e.base_resp.ret;
"0"==r?(t.suc("处理成功"),"function"==typeof i&&i(e)):"61914"==r?t.err("你的公众号订阅人数已达到上限1000人，建议前往用户管理页面进行整理。"):"61901"==r?t.err("系统错误，请刷新页面后重试"):o.handleRet(e,{
id:64462,
key:72,
url:"/cgi-bin/modifycontacts?action=verifyop",
msg:"网络异常，请刷新页面后重试"
});
},
fail:function(){
t.err("提交失败，请重试");
}
});
},
ignore:function(e,i){
var r={
opcode:2,
verifyuser:e
};
o.post({
url:"/cgi-bin/modifycontacts?t=ajax-meeting-verify",
data:{
f:"json",
action:"verifyop",
verifyuser:n.stringify2(r)
},
mask:!1,
error:function(){
t.err("系统错误，请重试");
}
},function(e){
t.suc("处理成功"),"function"==typeof i&&i(e),e&&e.base_resp&&e.base_resp.ret&&o.handleRet(e,{
id:64462,
key:73,
url:"/cgi-bin/modifycontacts?action=verifyop",
showMsg:!1
});
});
}
};
});