define("tmplmsg/tpl_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(t,s,e){
"use strict";
function n(t,s){
t.action="save",t.f="json",r.post({
mask:!1,
url:p.tmplmsg,
data:t
},function(t){
t=t.base_resp,"0"==t.ret?(i.suc("保存成功"),"function"==typeof s&&s(t)):i.err("保存失败");
});
}
function o(t,s){
r.post({
mask:!1,
url:p.tmplmsg,
data:{
id:t,
action:"del",
f:"json"
}
},function(t){
var e=t.base_resp.ret;
"0"==e?(i.suc("删除成功"),"function"==typeof s&&s(t)):i.err("删除失败");
});
}
function a(t,s){
r.post({
mask:!1,
url:p.tmplmsg,
data:t
},function(e){
var n=e.base_resp.ret;
"0"==n?(i.suc(4==t.status?"已提交使用":"已提交审核"),"function"==typeof s&&s(e)):i.err("提交审核失败");
});
}
function c(t,s){
r.post({
mask:!1,
url:p.tmplmsg,
data:{
template_id:t,
action:"pay_delete",
f:"json"
}
},function(t){
var e=t.base_resp.ret;
"0"==e?(i.suc("删除成功"),"function"==typeof s&&s(t)):i.err("删除失败");
});
}
function m(t,s){
r.post({
mask:!1,
url:p.tmplmsg,
data:{
id:t,
action:"check",
f:"json"
}
},function(t){
t=t.base_resp,"0"==t.ret?(i.suc("提交审核成功"),"function"==typeof s&&s(t)):i.err("提交审核失败");
});
}
var p={
tmplmsg:"/advanced/tmplmsg"
},r=t("common/wx/Cgi.js"),i=t("common/wx/Tips.js");
e.exports={
saveTmpl:n,
deleteTmpl:o,
checkTmpl:m,
addPayTmpl:a,
deletePayTmpl:c
};
});