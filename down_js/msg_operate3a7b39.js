define("cardticket/add/msg_operate.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","cardticket/parse_data.js","common/wx/Cgi.js","biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/tooltips.js","cardticket/add/msg_operate_type_html.js","cardticket/select_shelf.js","cardticket/send_card.js","homepage/appmsgdialog.js","media/appmsg_temp_url.js","page/cardticket/section_card_notification.css"],function(t){
"use strict";
function e(t){
function e(t){
var e=$(t),i=parseInt(e.val());
i=isNaN(i)?void 0:i,n.content_type=i,$("#js_msg_operate_content .js_msg_operate_content_item").hide(),
$("#js_msg_operate_content .js_"+i+"_show").show(),0===i||void 0===i?$("#js_msg_operate_endtime_container").hide():$("#js_msg_operate_endtime_container").show(),
g[i]&&g[i]();
}
var n=this;
this.sectionmgr=t.sectionmgr,this.data=t.data,this.is_can_use_msg_notify=window.wx_is_can_use_msg_notify&&10==t.data.type,
this.$contenttype=$("#js_msg_operate_contenttype"),this.$content=$("#js_msg_operate_content");
var l=this.data&&this.data.msg_operation;
if(this.msg_operation=$.extend(!0,{},l),this.content_type=this.msg_operation._type,
!this.is_can_use_msg_notify)return $("#js_msg_operate_container").hide(),n;
$("#js_msg_operate_contenttype input").checkbox({
onChanged:function(t){
e(t);
}
});
var g={
1:function(){
var t=n.$content.find(".js_msg_operate_select_appmsg"),e=t.attr("init");
1!=e&&(t.click(function(){
return new m({
ids:[],
multi:!1,
maxNum:1,
link:1,
callback:function(t){
if(t.length>0){
for(var e in t[0])n.msg_operation["appmsg_"+e]=t[0][e];
n.msg_operation.url=(t[0].link||"").html(!1),n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:n.msg_operation
}));
}
}
}),!1;
}),t.attr("init",1));
},
5:function(){
var t=n.$content.find(".js_msg_operate_select_cardticket"),e=t.attr("init");
1!=e&&(t.click(function(){
var t=new p({
multi:!1,
data:null,
neednew:!0,
noexpire:!0,
param:{
status:"2|3|6",
is_filter_out_apicard:0,
flag:!1
},
selectComplete:function(t){
t.id;
n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])(t));
var e=n.$content.find(".js_logourl");
e.attr("src",e.attr("data-src")),n.msg_operation._card_cell=t;
}
});
return t.show(),!1;
}),t.attr("init",1));
},
2:function(){
var e=n.$content.find(".js_msg_operate_select_cardshelf"),i=e.attr("init");
1!=i&&(e.click(function(){
var e=new c({
shelf_type:1,
selectComplete:function(e){
n.msg_operation.url="http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=%s&showwxpaytitle=1&biz=%s&scene=1000007#wechat_redirect".sprintf(e,t.biz),
n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:n.msg_operation
}));
}
});
return e.show(),!1;
}),e.attr("init",1));
}
};
e($("#js_msg_operate_contenttype input:checked")),this.content_type&&(5==this.content_type?o.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(t.data.msg_operation.card_id),
error:function(){}
},function(t){
if(0==t.base_resp.ret){
var e=$.parseJSON(t.card_detail);
e=i.parse_cardticket(e),n.msg_operation._card_cell=e,n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])(e));
var o=n.$content.find(".js_logourl");
o.attr("src",o.attr("data-src"));
}
}):r[n.content_type]&&n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:this.msg_operation
})));
var u="YYYY-MM-DD",h=this.msg_operation.endtime?a.unix(this.msg_operation.endtime).format(u):"",f=s({
container:"#js_msg_operate_endtime_select",
stopToday:!1,
isTodayValid:!0,
minValidDate:a().add("d",-1).unix(),
startDate:h,
isSingleDay:!0,
endDate:h,
defaultText:"-",
autoSubmit:!0,
theme:"ta",
success:function(t){
$("#"+f.inputId).html(t.startDate);
var e=a(t.startDate,u).add("d",1).unix()-1;
$("#js_msg_operate_endtime").val(e);
}
});
this.msg_operation.endtime?$("#"+f.inputId).html(h):($("#"+f.inputId).html("请选择时间"),
$("#"+f.nextMonth).click()),this.valid_time=f;
new _({
container:$("#js_msg_operate_tips"),
content:"卡券核销后，用户在卡包会收到消息通知",
reposition:!0,
type:"hover"
});
d(n.$content,".js_preview");
}
var n=(t("biz_web/ui/checkbox.js"),t("common/wx/Tips.js")),i=t("cardticket/parse_data.js"),o=t("common/wx/Cgi.js"),s=t("biz_web/ui/dateRange.js"),a=t("biz_common/moment.js"),n=t("common/wx/Tips.js"),_=t("common/wx/tooltips.js"),r=t("cardticket/add/msg_operate_type_html.js"),c=t("cardticket/select_shelf.js"),p=t("cardticket/send_card.js"),m=t("homepage/appmsgdialog.js"),d=t("media/appmsg_temp_url.js");
return t("page/cardticket/section_card_notification.css"),e.prototype={
getData:function(){
var t=this.content_type;
if(this.is_can_use_msg_notify&&"undefined"==typeof t)return n.err("请选择内容设置"),!1;
if(!this.is_can_use_msg_notify||0===t)return{
msg_operation_type:0,
msg_operation_url:"",
msg_operation_url_text:"",
msg_operation_card_id:"",
msg_operation_endtime:""
};
var e=this.msg_operation.url,i=/^http(s)?:\/\//;
4==t&&(e=this.$content.find(".js_msg_operate_link_url").val(),i.test(e)||(e="http://"+e));
var o={
msg_operation_type:5==t?2:e?1:0,
msg_operation_url:1==t||2==t||4==t?e:"",
msg_operation_card_id:5==t&&this.msg_operation._card_cell?this.msg_operation._card_cell.id:"",
msg_operation_url_text:1===t||2===t||4===t?$("#js_msg_operation_url_text").val():"",
msg_operation_endtime:$("#js_msg_operate_endtime").val()
};
return o.msg_operation_url||o.msg_operation_card_id?o.msg_operation_endtime?o.msg_operation_endtime<a().unix()?(n.err("通知有效期不能小于当前时间"),
!1):o:(n.err("请选择通知有效期"),!1):(n.err(1==t?"请选择图文消息":2==t?"请选择卡券货架":5==t?"请选择卡券":"网页链接不能为空"),
!1);
}
},e;
});