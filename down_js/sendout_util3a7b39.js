define("cardticket/sendout_util.js",["common/wx/Cgi.js","common/wx/Tips.js","cardticket/simple_report.js","cardticket/send_card_table.js","cardticket/create_task.js","biz_web/ui/checkbox.js","page/cardticket/dialog_choose_card.css","cardticket/select_shop_popup.js","tpl/cardticket/addimg.html.js","biz_web/utils/upload.js"],function(t){
"use strict";
function e(t){
this.opt=t,this.$dom=$(t.container),this.send_type_checkbox=this.$dom.find(".js_send_type").checkbox(),
this.$dom.find(".js_shopdetail").on("click",function(){
s.dispatch(cardid,"2");
});
}
var i=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),s=t("cardticket/simple_report.js"),c=(t("cardticket/send_card_table.js"),
t("cardticket/create_task.js"));
return t("biz_web/ui/checkbox.js"),t("page/cardticket/dialog_choose_card.css"),e.prototype={
send:function(){
var e,o=this.opt;
e=o.data.is_sns_card?3:this.send_type_checkbox.values()[0];
var d=o.data.id;
1==e?location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&cardid=%s&cardnum=%s".sprintf(d,0)):2==e?location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&isNew=1&cardid=%s&cardnum=%s".sprintf(d,0)):3==e?window.open(wx.url("/merchant/cardqrcode?action=copydownload"+"&cardid=%s&cardquantity=%s&cardlimit=%s".sprintf(d,0))):4==e?(this.create_task||(this.create_task=new c({
onprev:o.onprev,
onclose:o.onclose
})),this.create_task.show(o.data)):5==e&&(s.dispatch(d,"1"),function(e){
function s(s){
for(var o=[],d=0,r=s.length;r>d;d++){
var n=s[d].wx_poi_uid;
n&&o.push(n);
}
var p={
action:"dispatch_card",
card_id:c,
wx_poi_uid:o.join("|")
};
!function(e,s){
var c,o=template.compile(t("tpl/cardticket/addimg.html.js")),d=$(o({
name:s.title
})).popup({
title:"选择卡券缩略图",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=c.value(),s="";
t&&(s=$("#js_upload_addtion").parent().siblings(".js_preview").find("img").data("id")||""),
e.pic_uid=s,i.post({
url:wx.url("/merchant/entityshop"),
data:e,
mask:!1
},function(t){
if(!t||!t.base_resp)return void i.handleRet(json,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
});
switch(+t.base_resp.ret){
case 0:
a.suc("投放成功"),location.reload();
break;

default:
a.err("系统错误，请稍后重试");
}
});
}
}]
});
c=d.find(".js_choose_type").checkbox();
var r=t("biz_web/utils/upload.js");
r.uploadTmpFile({
container:"#js_upload_addtion",
multi:!1,
timeout:3e3,
type:2,
onComplete:function(t,e,i,a){
var s=a.content||"";
if(0==a.base_resp.ret&&s){
var c=r.tmpFileUrl(s),o=$("#js_upload_addtion").parent().siblings(".js_preview").find("img");
o.attr("src",c),o.data("id",s);
}
}
});
}(p,e);
}
var c=e.id,o=(!!e.auto_update_new_location,t("cardticket/select_shop_popup.js"));
new o({
autoShow:!0,
multi:!0,
hasnext:!0,
pageCapacity:5,
selectLimit:0,
nostore:!0,
is_validity:1,
selectComplete:s,
showSelectTips:!0,
getDataExtra:{
action:"list_by_card_id",
card_id:c
}
});
}(o.data)),o&&o.selectComplete&&o.selectComplete(e);
}
},e;
});