define("ivr/ivr_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
var r={
replySave:"/advanced/setreplyrule?cgi=setreplyrule&fun=save&t=ajax-response",
replyDel:"/advanced/setreplyrule?cgi=setreplyrule&fun=del&t=ajax-response",
replyList:"/advanced/replyrulepage?t=ajax-ivrsetting-detail&replytype=smartreply&sec=reply&s=smartreply&lang=zh_CN&action=showrule"
},s=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js");
return{
replySave:function(e,l,t){
s.post({
url:wx.url(r.replySave),
data:e,
mask:!1,
error:function(){
a.err("保存失败");
},
complete:function(){
t&&t();
}
},function(r){
switch(+r.base_resp.ret){
case 0:
a.suc("保存成功"),l&&l(r);
break;

case-1112:
a.err("关键字中含非法字符");
break;

case-1103:
a.err("关键字不能为空");
break;

case-1110:
a.err("规则数超过限制");
break;

case-1111:
a.err("消息中可能含有具备安全风险的链接，请检查");
break;

case 1530502:
$("#Js_ruleItem_"+e.ruleid).length?$("#Js_ruleItem_"+e.ruleid).find(".js_warn").text("请勿添加其他公众号的主页链接").show():$(".js_warn").text("请勿添加其他公众号的主页链接").show(),
$("#js_save").enable("btn_disabled").addClass("btn_primary"),$("#js_del").enable("btn_disabled").addClass("btn_default");
break;

case 1530509:
$("#Js_ruleItem_"+e.ruleid).length?$("#Js_ruleItem_"+e.ruleid).find(".js_warn").text("链接已失效，请在手机端重新复制链接").show():$(".js_warn").text("链接已失效，请在手机端重新复制链接").show(),
$("#js_save").enable("btn_disabled").addClass("btn_primary"),$("#js_del").enable("btn_disabled").addClass("btn_default");
break;

default:
a.err("保存失败");
}
});
},
replyDel:function(e,l,t){
s.post({
url:wx.url(r.replyDel),
data:{
ruleid:e,
replytype:l
},
mask:!1,
error:function(){
a.err("删除失败");
}
},function(e){
a.suc("删除成功"),t&&t(e);
});
},
getReplyList:function(e,a,l){
s.post({
url:wx.url(r.replyList),
data:{
ruleid:e
},
error:function(){
l&&l();
}
},function(e){
a&&a(e);
});
}
};
});