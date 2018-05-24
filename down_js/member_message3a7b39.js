define("cardticket/member_message.js",["common/wx/richEditor/msgSender.js","safe/safe_check.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js","message/message_cgi.js","biz_web/ui/checkbox.js","cardticket/topmenu.js"],function(t){
"use strict";
var e=t("common/wx/richEditor/msgSender.js"),s=t("safe/safe_check.js"),i=t("common/wx/Tips.js"),n=t("common/wx/dialog.js"),a=t("common/wx/Cgi.js"),o=t("message/message_cgi.js"),r=(t("biz_web/ui/checkbox.js"),
function(r){
function c(){
var t="",e=[],s=/^\d+$/;
return $(".js_opt_check:checked").each(function(i,n){
var a=$(n).data("box");
if(0==a)e.push(1==$(".js_opt_box_0_radio:checked").val()?"已激活会员卡":"未激活会员卡");else if(1==a){
var o=$(".js_opt_box_1_minbonus").val(),r=$(".js_opt_box_1_maxbonus").val();
s.test(o)&&s.test(r)||(t="请输入正确的积分"),o=parseInt(o),r=parseInt(r),o>r&&(t="输入的最小积分大于最大积分"),
e.push("积分在%s到%s之间".sprintf(o,r));
}else if(2==a){
var c=$(".js_opt_box_2_input").val();
s.test(c)||(t="请输入正确的天数"),e.push("最近%s天内有使用记录".sprintf(c));
}
}),t?{
err:!0,
wording:t
}:e.length>0?{
err:!1,
wording:e.join("，")+"的会员"
}:{
err:!1,
wording:"全部会员"
};
}
function u(){
var t=$(".js_condition"),e=$(".js_go"),s=c().err,i=c().wording;
s?(t.addClass("fail"),e.addClass("btn_disabled")):(t.removeClass("fail"),e.removeClass("btn_disabled")),
$(".js_condition").text(i);
}
function _(){
a.get({
url:"/cgi-bin/masssendpage"
},function(t){
return t&&t.base_resp&&0==t.base_resp.ret?(r.strategy_status=JSON.parse(t.strategy_info)||null,
r.third_status=t.third_status||"",r.operation_seq=t.operation_seq||"",void(r.gray_status=t.gray_status||"")):void i.err("系统错误，请稍后重试");
});
}
function d(){
$(".js_opt_check").on("change",function(){
var t=$(".js_opt_box_"+$(this).data("box"));
$(this).is(":checked")?t.show().find(".js_opt_box_needfocus").focus():(t.hide().find('input[type="text"]').val(""),
t.find('input[type="radio"]').removeAttr("checked").checkbox({
multi:!1
})),0==$(this).data("box")&&($(this).is(":checked")?$(".js_opt_box_0_radio:eq(0)").click():$(".js_opt_check").enable().checkbox("disabled")),
u();
}).checkbox({
multi:!0
}),$(".js_opt_box_0_radio").checkbox({
multi:!1
}),$(".js_opt_box_0_radio").on("change",function(){
var t=$(".js_opt_box_0_radio:checked").val();
$(".js_opt_check").each(function(e,s){
0!=$(s).data("box")&&(2==t?($(s).is(":checked")&&$(s).click(),$(s).disable().checkbox("disabled")):$(s).enable().checkbox("disabled"));
}),u();
}),$(".js_opt_box").find('input[type="text"]').on("input",function(){
u();
}),$(".js_go").click(function(){
$(this).hasClass("btn_disabled")||($(".js_step").hide(),$(".js_step_"+$(this).data("step")).show());
});
}
function p(){
var t={
acl:wx.acl.msg_acl,
onClick:function(t,e,s,i){
10==i?$("#ifDiscuss").show():$("#ifDiscuss").hide();
},
onSelect:function(){},
data:{
type:10
}
},c=new e($("#js_msgSender"),t),u=$(".js_submit"),_={
postData:null,
ConvertStringToJson:function(t){
if(!t||"string"!=typeof t)return{
list:[]
};
try{
return JSON.parse(t);
}catch(e){
return{
list:[]
};
}
},
requestUse:function(t){
a.post({
url:wx.url("/cgi-bin/appmsgcopyright?action=apply_auth"),
data:{
list:t,
msgid:_.postData.appmsgid
}
},function(t){
return t&&t.base_resp&&0==t.base_resp.ret?(i.suc("申请成功"),void setTimeout(function(){
location.href=wx.url("/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0");
},200)):void a.handleRet(t,{
id:64462,
key:1,
url:"/cgi-bin/appmsgcopyright?action=apply_auth"
});
});
},
showCopyRightDetail:function(t){
new reprintStatus({
data:_.ConvertStringToJson(t.list),
done:function(){
var e=_.postData;
e.reprint_confirm=1,e.list=t.list||"",_.checkSponsorAd();
},
cancel:function(){
u.btn(!0);
}
});
},
showSafeSend:function(t){
var e="操作确认|消息开始群发后无法撤销，是否确认群发？";
n.show({
type:"info",
msg:e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
u.btn(!1),s.check(t,function(t){
t&&t.code&&"wx.pass"!=t.code?(_.postData.code=t.code,_.send(-1==t.type?!0:!1)):_.send(!1);
},{
onClose:function(){
u.btn(!0);
},
checkdom:".js_wxcheck0"
}),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
u.btn(!0),this.remove();
}
}],
close:function(){
return u.btn(!0),!0;
}
});
},
checkCopyrightDone:function(t){
switch(clearTimeout(_.checkCopyrightTimeout),clearTimeout(_.checkCopyrightComet),
_.checkCopyrightRequest.abort("mass_send_check_copyright_timeout"),_.isFirstCheck=!0,
_.checkCopyrightRet){
case 154011:
case 154009:
_.postData.direct_send=1,_.checkSponsorAd();
break;

case 154008:
_.showCopyRightDetail(t);
break;

default:
i.err("系统错误，请稍后重试。"),u.btn(!0);
}
},
checkCopyright:function(){
var t=_.postData,e={
first_check:+_.isFirstCheck,
type:t.type,
appmsgid:t.appmsgid
};
_.isFirstCheck=_.isFirstCheck&&!1,_.checkCopyrightRequest=o.checkCopyright(e,function(t){
switch(t&&t.base_resp&&"undefined"!=typeof t.base_resp.ret||(_.checkCopyrightRet=-1,
a.handleRet(t,{
id:64462,
key:5,
url:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
showMsg:!1
})),_.checkCopyrightRet=+t.base_resp.ret,+t.base_resp.ret){
case 154008:
case 154009:
_.checkCopyrightDone(t);
break;

case 154011:
_.checkCopyrightComet=setTimeout(function(){
_.checkCopyright();
},500);
break;

default:
_.checkCopyrightDone(t),a.handleRet(t,{
id:64462,
key:5,
url:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
showMsg:!1
});
}
},function(t){
"mass_send_check_copyright_timeout"!=t&&(_.checkCopyrightComet=setTimeout(function(){
_.checkCopyright();
},500));
});
},
checkSponsorAd:function(){
var t=c.getData().data;
o.checkSponsorAd({
appmsg_id:t.app_id
},function(e){
if(0==e.base_resp.ret){
var s=e.check_ad_resp.ad_info,n=e.check_ad_resp.ad_num,a=t.isMulti,o="";
0==n?_.checkAccountStatus():1==n?a?a&&(1==s[0].idx&&1==s[0].status?(o="今日图文首篇广告主为%s，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name),
_.SponsorAdPreview(o,s)):1==s[0].idx&&2==s[0].status?(o="今日图文首篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):1==s[0].idx&&3==s[0].status?(_.withoutADWoring="今日图文首篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.checkAccountStatus()):2==s[0].idx&&1==s[0].status?(o="今日图文第二篇广告主为%s，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name),
_.SponsorAdPreview(o,s)):2==s[0].idx&&2==s[0].status?(o="今日图文第二篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):2==s[0].idx&&3==s[0].status&&(_.withoutADWoring="今日图文第二篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.checkAccountStatus())):1==s[0].idx&&1==s[0].status?(o="今日图文广告主为%s，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name),
_.SponsorAdPreview(o,s)):1==s[0].idx&&2==s[0].status?(o="今日图文广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):1==s[0].idx&&3==s[0].status?(_.withoutADWoring="今日图文广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD")),
_.checkAccountStatus()):2==s[0].idx&&(o="今日图文第二篇广告主为%s，群发单图文将会导致广告违约，请继续编辑素材。".sprintf(s[0].ad_buyer_name),
_.SponsorAdDefault(o,t.app_id,t.isMulti)):2==n&&(a?1==s[0].status&&1==s[1].status?(o="今日图文首篇广告主为%s，第二篇广告主为%s，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤回，是否群发？".sprintf(s[0].ad_buyer_name,s[1].ad_buyer_name),
_.SponsorAdPreview(o,s)):1==s[0].status&&2==s[1].status?(o="今日图文首篇广告主为%s，广告状态正常，系统会自动将广告素材加在图文正文底部；第二篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):1==s[0].status&&3==s[1].status?(o="今日图文首篇广告主为%s，广告状态正常，系统会自动将广告素材加在图文正文底部；第二篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):2==s[0].status&&1==s[1].status?(o="今日图文首篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部；第二篇广告主为%s，广告状态正常，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name),
_.SponsorAdPreview(o,s)):2==s[0].status&&2==s[1].status?(o="今日图文首篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部；第二篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):2==s[0].status&&3==s[1].status?(o="今日图文首篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部；第二篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):3==s[0].status&&1==s[1].status?(o="今日图文首篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约；第二篇广告主为%s，广告状态正常，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name),
_.SponsorAdPreview(o,s)):3==s[0].status&&2==s[1].status?(o="今日图文首篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约；第二篇广告主为%s，该广告素材于%s更新，系统会自动将广告素材加在图文正文底部。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):3==s[0].status&&3==s[1].status&&(o="今日图文首篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约；第二篇广告主为%s，%s提交更新的素材仍在审核中，若直接群发，图文不带广告素材且不会导致违约。消息开始群发后无法撤销，是否群发？".sprintf(s[0].ad_buyer_name,moment.unix(s[0].update_time).format("YYYY-MM-DD"),s[1].ad_buyer_name,moment.unix(s[1].update_time).format("YYYY-MM-DD")),
_.SponsorAdPreview(o,s)):(o="今日图文首篇广告主为%s，第二篇广告主为%s，群发单图文将会导致广告违约，请继续编辑素材。".sprintf(s[0].ad_buyer_name,s[1].ad_buyer_name),
_.SponsorAdDefault(o,t.app_id,t.isMulti)));
}else i.err("系统错误");
},function(){});
},
SponsorAdDefault:function(t,e,s){
n.show({
title:"添加广告",
type:"info",
msg:t,
buttons:[{
text:"编辑素材",
click:function(){
location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid="+e+"&isMul="+s);
}
},{
text:"取消",
type:"normal",
click:function(){
u.btn(!0),this.remove();
}
}]
});
},
SponsorAdPreview:function(t,e){
$(wx.T(sponsorTpl,{
list:e,
content:t,
nick_name:wx.cgiData.nick_name
})).popup({
title:"添加广告",
width:960,
className:"mpda_send_dialog",
buttons:[{
type:"primary",
text:"群发",
click:function(){
this.remove(),_.checkAccountStatus();
}
},{
text:"取消",
click:function(){
u.btn(!0),this.remove();
}
}],
onHide:function(){
u.btn(!0);
}
});
},
checkAccountStatus:function(){
var t=r.strategy_status;
return t?(t.third_status=r.third_status,t.bind_mail=r.bind_mail,void(t.wx_protect&&t.wx_alias?(t.source="msgs",
t.msgid=r.operation_seq,t.distinguish=!0,_.showSafeSend(t)):t.wx_alias&&"1"==r.gray_status?s.off_protect_tip(function(){
s.bind("bind_masssend",t,function(t){
i.suc("帐号已开启安全保护，可进行群发操作。"),r.strategy_status.wx_alias=t.wx_name,r.strategy_status.wx_protect=1,
r.strategy_status.protect_status=2,u.btn(!0);
},{
onClose:function(){
u.btn(!0);
}
});
},{
onClose:function(){
u.btn(!0);
}
}):"1"==r.gray_status?s.no_helper_tip(function(){
s.bind("bind_masssend",t,function(t){
i.suc("帐号已开启安全保护，可进行群发操作。"),r.strategy_status.wx_alias=t.wx_name,r.strategy_status.wx_protect=1,
r.strategy_status.protect_status=2,u.btn(!0);
},{
onClose:function(){
u.btn(!0);
}
});
},{
onClose:function(){
u.btn(!0);
}
}):_.sendwarn())):void _.sendwarn();
},
send:function(){
$(".js_warn").hide(),o.masssend(_.postData,function(){
n.show({
type:"succ",
msg:"发送成功|该功能目前为内测阶段，暂无发送数据报表。了解数据，请联系与你对接的平台工作人员。",
buttons:[{
text:"确定",
click:function(){
this.remove(),location.reload();
}
}]
});
},function(t){
if(u.btn(!0),t&&t.base_resp){
var e=t.base_resp.ret;
if("200008"==e)vObj=vArea.html("").show().verifycode().data("verifycode"),vObj.focus();else if("67010"==e){
var s="该图文消息部分文章正文为空，无法群发|请选择其他文章或编辑完整后再尝试";
n.show({
type:"warn",
msg:s,
buttons:[{
text:"重新选择",
click:function(){
this.remove(),c.selectPopDialogByType(10);
}
},{
type:"normal",
text:"编辑此图文",
click:function(){
var t=_.postData.appmsgid;
location.href="/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+t;
}
}]
});
}else if("1530505"==e)$(".js_warn").text("请勿添加其他公众号的主页链接").show();else if("1530512"==e)$(".js_warn").text("链接已失效，请在手机端重新复制链接").show();else if("155003"==e){
var i="今日有待投放赞助广告，你当前群发的内容不符合条件，此时群发将会导致广告违约，请继续编辑。",o=c.getData().data;
_.SponsorAdDefault(i,o.app_id,o.isMulti);
}else a.handleRet(t,{
id:64462,
key:4,
url:"/cgi-bin/masssend",
showMsg:!1
});
}
});
},
sendwarn:function(){
var t="操作确认|消息开始群发后无法撤销，是否确认群发？";
n.show({
type:"info",
msg:t,
mask:!0,
buttons:[{
text:"确定",
click:function(){
u.btn(!1),_.send(!1),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
u.btn(!0),this.remove();
}
}]
});
},
getPostData:function(){
var t=c.getData(),e={};
if(t.error)return null;
if(t=t.data,e.type=t.type,e.appmsgid=t.app_id,e.fileid=t.file_id,e.content=t.content,
e.vid=t.vid,e.cardid=t.cardid,e.cardquantity=t.cardnum,e.cardlimit=0==t.cardnum?0:1,
e.activate_status=$('.js_opt_check[data-box="0"]').is(":checked")?$(".js_opt_box_0_radio:checked").val():0,
$('.js_opt_check[data-box="1"]').is(":checked")&&(e.min_bonus=$(".js_opt_box_1_minbonus").val(),
e.max_bonus=$(".js_opt_box_1_maxbonus").val()),$('.js_opt_check[data-box="2"]').is(":checked")){
var s=parseInt($(".js_opt_box_2_input").val());
if(isNaN(s)||0>=s)return void i.err("请输入正确的天数");
e.min_last_update_time=Math.round((new Date).valueOf()/1e3-86400*s),e.max_last_update_time=4294967295;
}
return e.cardid_filter=r.cardid_filter,2==e.type&&(e.img_copyright_status=t.copyright_status||0),
console.log(e),e;
},
submit:function(){
var t=$(this);
if(!t.hasClass("btn_disabled")){
var e=_.getPostData();
null!=e&&(t.btn(!1),_.postData=e,_.checkAccountStatus());
}
}
};
$(".js_submit").click(function(){
_.submit.call($(this));
});
}
function m(){
t("cardticket/topmenu.js").selected("cardmgr_member"),_(),d(),p();
}
return{
init:m
};
}(wx.cgiData));
r.init();
});