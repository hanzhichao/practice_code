define("reward/invite.js",["common/wx/Step.js","common/wx/popover.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","biz_common/moment.js","common/wx/top.js"],function(e){
"use strict";
var t=wx.cgiData,n=template.render,i=e("common/wx/Step.js"),s=e("common/wx/popover.js"),r=(e("common/wx/popup.js"),
e("common/wx/Cgi.js")),n=template.render,o=e("common/wx/Tips.js"),a=e("biz_common/moment.js"),c=e("common/wx/top.js"),d=function(){
function e(){
t.max_num=t.max_num||2,t.count=t.info_list?t.info_list.length:0;
for(var e=0,n=0;n<t.count;n++){
var i=t.info_list[n];
(1==i.status||2==i.status)&&e++,i.datetime=a.unix(i.time).format("YYYY-M-D")||"",
i.pic_url=i.pic_url||defaultUserLogo;
}
t.validCount=t.count,t.howManyCanApply=t.max_num>t.validCount?t.max_num-t.validCount:0;
}
function d(){
$("#js_count").text(t.howManyCanApply),$("#js_invite").addClass(t.howManyCanApply>0?"btn_primary":"btn_disabled");
}
function m(){
p.html(n("js_tabletpl",{
data:t.info_list
}));
}
function u(){
t.howManyCanApply>0&&$("#js_invite").on("click",function(){
function e(e){
var t=u.show().find("img").attr("src",e.iconUrl).siblings(".js_nickname").text(e.nickName).siblings(".js_nickerror");
e.errorMsg?t.text(e.errorMsg).show():(t.hide(),v.find(".js_step2UserIcon").attr("src",e.iconUrl),
v.find(".js_step2UserNick").text(e.nickName),v.find(".js_step2UserId").text(e.userId)),
n.resetPosition();
}
var t,n,s="click",a=!1,c=$("#js_dialog").popup({
className:"dialog_invitation",
title:"邀请开通原创保护功能",
onShow:function(){
n=this;
},
close:function(){
this.remove();
}
});
t=new i({
container:c.find(".js_process"),
selected:1,
names:["1 填写受邀公众号","2 填写资料"]
});
var d=c.find(".js_search"),m=c.find(".js_no_user"),u=c.find(".js_search_result"),l=c.find(".js_search_loading"),p=c.find(".js_step1_next"),f=c.find(".js_step2_prev"),_=c.find(".js_step2_finish"),h=c.find(".js_step1"),v=c.find(".js_step2"),b=c.find(".js_keyword");
d.on(s,function(){
if(a)return!1;
m.hide();
var t=b.val().trim();
return t?(u.hide(),a=!0,l.show(),n.resetPosition(),void r.post({
url:"/merchant/invitation",
data:{
action:"search",
wx_id:t
},
complete:function(){
a=!1;
}
},function(n){
if(l.hide(),p.data("value","").removeClass("btn_primary").addClass("btn_disabled").attr("disabled",!0),
!n.base_resp||0!=n.base_resp.ret)return m.text("系统错误，请稍候再试").show(),void r.handleRet(n,{
id:64462,
key:31,
url:"/merchant/invitation?action=submit"
});
var i=n.status,s=n.nickname,o=n.pic_url||defaultUserLogo;
switch(i){
case 0:
e({
iconUrl:o,
nickName:s,
userId:t
}),p.data("value",t).removeClass("btn_disabled").addClass("btn_primary").attr("disabled",!1);
break;

case 1:
m.text("该微信号不存在请重新输入").show();
break;

case 2:
e({
iconUrl:o,
nickName:s,
errorMsg:"对方已开通该功能，无需重复邀请"
});
break;

case 3:
e({
iconUrl:o,
nickName:s,
errorMsg:"对方不是个人账号，无法邀请"
});
break;

case 4:
e({
iconUrl:o,
nickName:s,
errorMsg:"邀请名额已满，无法邀请"
});
break;

case 5:
e({
iconUrl:o,
nickName:s,
errorMsg:"对方已被邀请，无需重复邀请"
});
break;

case 6:
m.text("频率过快，请稍候再重试").show();
}
})):(m.text("请输入微信号").show(),void b.focus());
}),b.on("keyup propertychange",function(e){
wx.isHotkey(e,"enter")&&d.click();
}).focus(),p.on(s,function(){
var e=$(this);
e.attr("disabled")||e.hasClass("btn_disabled")||(t.setStep(2),h.hide(),v.show());
}),f.on(s,function(){
t.setStep(1),v.hide(),h.show();
}),_.on(s,function(){
var e=v.find("textarea").val().trim();
if(!e)return void v.find(".js_step2Error").text("请填写推荐理由").show();
if(e.length>200)return void v.find(".js_step2Error").text("推荐理由超过200字，请重新输入").show();
v.find(".js_step2Error").hide();
var t=p.data("value").trim();
r.post({
url:"/merchant/invitation",
data:{
action:"submit",
wx_id:t,
reason:e
}
},function(e){
if(!e||!e.base_resp||0!=e.base_resp.ret||"undefined"==typeof e.status)return o.err("系统错误，请重试"),
void r.handleRet(e,{
id:64462,
key:30,
url:"/merchant/invitation?action=submit"
});
switch(+e.status){
case 0:
o.suc("提交成功"),location.reload();
break;

case 1:
o.err("该微信号不存在请重新输入");
break;

case 2:
o.err("对方已开通该功能，无需重复邀请");
break;

case 3:
o.err("对方不是个人账号，无法邀请");
break;

case 4:
o.err("邀请名额已满，无法邀请");
break;

case 5:
o.err("对方已被邀请，无需重复邀请");
break;

case 6:
o.err("频率过快，请稍候再重试");
break;

case 7:
o.err("推荐理由超过200字，请重新输入");
break;

default:
o.err("提交失败，请重试");
}
});
});
});
var e;
p.find(".js_tips").on("mouseover",function(){
$(".popover").hide();
var t=$(this),n=t.data("tip")||"";
e=new s({
dom:t,
content:n
});
}).on("mouseout",function(){
e&&e.remove();
});
}
function l(){
e(),d(),m(),u();
}
var p=$("#js_maintable");
return new c("#topTab",c.DATA.reward).selected("invite"),{
init:l
};
}();
d.init();
});