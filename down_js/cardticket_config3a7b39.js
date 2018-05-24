define("wifi/cardticket_config.js",["wifi/top.js","cardticket/send_card.js","biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/Cgi.js","common/wx/Tips.js","cardticket/parse_data.js","cardticket/common_template_helper.js"],function(t){
"use strict";
t("wifi/top.js");
var e=t("cardticket/send_card.js"),a=t("biz_web/ui/dateRange.js"),i=t("biz_common/moment.js"),d=t("common/wx/Cgi.js"),r=t("common/wx/Tips.js"),n=t("cardticket/parse_data.js"),s=t("cardticket/common_template_helper.js"),_=$("#js_card_view"),c=$("#js_no_card_tpl"),m=$("#js_choose_view"),o='<div class="mod-kaquan__msg-time-label">%s：</div><div class="mod-kaquan__msg-time-content">%s</div>',f={
data:wx.cgiData.data,
card_msg:{},
setData:function(t){
for(var e in t)this.data.hasOwnProperty(e)&&(this.data[e]=t[e]);
}
},u={
init:function(){
this._initCardChooseView(),this._initCardTicketView();
},
updateView:function(){
if(console.log(f.card_msg),"10"==f.card_msg.type){
var t="YYYY年MM月DD日";
1==f.card_msg.time_type?f.card_msg.validtime=i.unix(f.card_msg.begin_time).format(t)+"-"+i.unix(f.card_msg.end_time).format(t):2==f.card_msg.time_type&&(f.card_msg.validtime=i().add("d",f.card_msg.from_day).format(t)+"-"+i().add("d",f.card_msg.fixed_term).format(t)),
_.html(template.render("js_member_card_tpl",{
data:f.card_msg
}));
}else{
_.html(template.render("js_card_tpl",{
card:f.card_msg
}));
var e=s.fix_abstract4friendcard(f.card_msg,!1);
_.find("#js_condition_preview").html(e?o.sprintf("使用条件：",e):""),_.find("#js_time_view").html(o.sprintf("可用时间：",this._getDate(f.card_msg)+" "+this._getWeek(f.card_msg)+" "+this._getTime(f.card_msg)));
}
},
setChooseView:function(t){
m.show().find("span").text(t);
},
_getDate:function(t){
var e="YYYY.MM.DD",a=t.time_type,d=t.begin_time,r=t.end_time,n=t.from_day,s=t.fixed_term;
return 1==a&&d?(d?i.unix(d).format(e):i().add("d",1).format(e))+"-"+(r?i.unix(r).format(e):i().add("M",1).format(e)):2==a?(1*n!=n&&(n=0),
i().add("d",parseInt(n)).format(e)+"-"+i().add("d",parseInt(n)+parseInt(s)).format(e)):100==a?"永久有效":void 0;
},
_getWeek:function(t){
return t.time_limit?s.gen_time_limit(t.time_limit):"";
},
_getTime:function(t){
for(var e="",a=t.use_hours,i=0;i<a.length;i++)e=(e?e+" ":e)+_changeTime(a[i].begin_hour)+"-"+_changeTime(a[i].begin_minute)+"至"+_changeTime(a[i].end_hour)+"-"+_changeTime(a[i].end_minute);
return e;
},
_changeTime:function(t){
return 10>t?"0"+t:t;
},
_initCardChooseView:function(){
f.data.card_id&&this.setChooseView(f.data.card_describe);
},
_initCardTicketView:function(){
if(f.data.card_id){
var t=this;
d.get({
url:"/merchant/electroniccardmgr?action=get&f=json&card_id="+f.data.card_id
},function(e){
if(e&&e.base_resp&&0==e.base_resp.ret){
var a=JSON.parse(e.card_detail),i=n.parse_cardticket(a);
f.card_msg=i,t.updateView();
}else r.err("系统错误");
});
}else _.html(c.html());
}
},g={
dateRange:"",
init:function(){
this._initCardChoose(),this._initDateRange();
},
_initCardChoose:function(){
$("#js_card_btn").on("click",function(){
new e({
editquantity:!1,
param:{
need_member_card:1
},
selectComplete:function(t){
f.card_msg=t,f.setData({
card_describe:t.title
}),f.setData({
card_id:t.cardid
}),u.setChooseView(t.title),u.updateView();
}
}).show();
});
},
_initDateRange:function(){
var t=i.unix((new Date).valueOf()/1e3).format("YYYY-MM-DD");
this.dateRange=new a({
container:"#js_daterange",
startDate:f.data.start_date||t,
endDate:f.data.end_date||t,
minValidDate:i().startOf("day").valueOf()/1e3,
stopToday:!1,
isTodayValid:!0,
theme:"ta",
success:function(t){
var e=t.endDate,a=t.startDate;
return a>e?(r.err("结束时间不能小于开始时间"),!1):(f.setData({
start_date:a,
end_date:e
}),void u.updateView());
}
});
}
},l={
init:function(){
this._initSubmitEvent();
},
_initSubmitEvent:function(){
$("#js_submit").on("click",function(){
return f.data.card_id?f.data.start_date&&f.data.end_date?void d.post({
url:wx.url("/wifi/wificardmanager?action=edit_card"),
data:{
shop_id:f.data.shop_id,
card_id:f.data.card_id,
start_date:f.data.start_date,
end_date:f.data.end_date
}
},function(t){
t&&t.base_resp&&0==t.base_resp.ret?location.href=wx.url("/wifi/wificardmanager?action=get_store_card_list&t=wifi/cardticket_list_tmpl&page_idx=1&page_size=10"):r.err("系统错误");
}):(r.err("请选择投放时间"),!1):(r.err("请选择卡券"),!1);
});
}
},h=function(){
u.init(),g.init(),l.init();
};
h();
});