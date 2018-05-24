define("cardticket/detail/modify_time.js",["biz_common/moment.js","biz_web/ui/dateRange.js","common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e,t){
return n.unix(e).format(t||"YYYY.MM.DD");
}
function i(e){
var i=e.data,m=$(e.container),c=$(e.time_container),r="YYYY-MM-DD",s=n.unix(i.begin_time).format(r),u=n.unix(i.end_time).format(r),l=!1,f=null,_=n.unix(i.begin_time).add("d",89).unix();
m.click(function(m){
function x(){
$("#"+f.calendarId).remove(),$("#"+f.startDateId).remove(),$("#"+f.endDateId).remove(),
c.children().remove(),c.html(template.compile("{validtime data 'YYYY-MM-DD'}")({
data:i
}));
}
f&&x(),f=a({
container:c,
stopToday:!1,
minValidDate:i.begin_time,
maxValidDate:e.data.is_sns_card?_:n().add("M",120),
startDate:s,
isTodayValid:!0,
endDate:u,
defaultText:"-",
theme:"ta",
success:function(e){
if(f.show(!1,f),!l){
var a=n(e.startDate,r).unix(),m=n(e.endDate,r).add("d",1).unix()-1;
$("#"+f.inputId).html(t(i.begin_time)+"-"+t(i.end_time)),l=!0,o.post({
url:"/merchant/electroniccardmgr?action=modinfo",
data:{
card_id:i.id,
begin_time:a,
end_time:m
},
complete:function(){
l=!1;
}
},function(e){
0==e.base_resp.ret?(d.suc("延长有效期成功"),$("#"+f.inputId).html(t(a)+"-"+t(m)),location.reload()):o.handleRet(e,{
id:64463,
key:31,
url:"/merchant/electroniccardmgr?action=modinfo"
});
});
}
},
beforeSelect:function(e){
var t=n(e,r).unix();
return t<=i.end_time?(d.err("只能延长有效期"),!1):t<n(n().format(r),r).unix()?(d.err("有效期只能选择当天之后的日期"),
!1):(this.dateInput=this.endDateId,this.selectDate(e),!1);
}
}),$("#"+f.closeBtn).bind("click",function(){
x();
}),$("#"+f.inputId).html(t(i.begin_time)+"-"+t(i.end_time)),$("#"+f.nextMonth).click(),
f.show(!1,f),m.stopPropagation();
});
}
var n=e("biz_common/moment.js"),a=e("biz_web/ui/dateRange.js"),o=e("common/wx/Cgi.js"),d=e("common/wx/Tips.js");
return i;
});