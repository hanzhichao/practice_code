define("cardticket/add/member_time.js",["biz_common/moment.js","common/wx/Tips.js","biz_web/ui/dateRange.js"],function(t){
"use strict";
function e(t){
t||(t=$("#js_editform").serializeObject());
var e="YYYY.MM.DD";
if(1==t.time_type&&t.begin_time){
var i=t.begin_time?a.unix(t.begin_time).format(e):a().add("d",1).format(e),d=t.end_time?a.unix(t.end_time).format(e):a().add("M",1).format(e);
$("#js_validtime_preview").text("有效期："+i+"-"+d);
}
2==t.time_type&&$("#js_validtime_preview").text("有效期："+a().add("d",parseInt(t.from_day)).format(e)+"-"+a().add("d",parseInt(t.from_day)+parseInt(t.fixed_term)).format(e)),
100==t.time_type&&$("#js_validtime_preview").text("永久有效");
}
function i(t){
function i(t){
return a(t,m).format("YYYY.MM.DD");
}
var m="YYYY-MM-DD",r=a().format(m),s=(a().add("d",1).format(m),a().add("M",1).format(m)),_=t.data.begin_time?a.unix(t.data.begin_time).format(m):r,o=t.data.end_time?a.unix(t.data.end_time).format(m):s,u=$(".js_validtime"),f=$("#js_hidden_time_type"),l=$("#js_hidden_begintime"),b=$("#js_hidden_endtime"),c=(u.checkbox({
onChanged:function(t){
var i=t.val();
1==i?(v._disabled=!1,$("#"+v.inputId).parent().removeClass("disabled")):100==i&&(v._disabled=!0,
$("#"+v.inputId).parent().addClass("disabled")),f.val(i),e();
}
}),a().add("d",-1).unix()),p=t.data.begin_time&&t.data.begin_time<c?t.data.begin_time:c,v=n({
container:"#js_begin_time_container",
stopToday:!1,
isTodayValid:!0,
minValidDate:p,
startDate:_,
endDate:t.data.end_time?o:_,
defaultText:"-",
theme:"ta",
monthRangeMax:120,
success:function(t){
$("#"+v.inputId).html(i(t.startDate)+"-"+i(t.endDate)),l.val(a(t.startDate,m).unix()),
b.val(a(t.endDate,m).unix()),e();
},
beforeSelect:function(e){
if(!t.is_edit)return!0;
var i=a(e,m).unix(),n=t.data.end_time-86400+1;
if(i>t.data.begin_time&&n>i)return d.err("只能延长有效期"),!1;
if(i<=t.data.begin_time){
this.dateInput=this.startDateId,this.selectDate(e),this.dateInput=this.endDateId;
var r=$("#"+this.endDateId).val(),r=a(r,m).format("YYYY-M-D");
this.selectDate(r);
}else this.dateInput=this.endDateId,this.selectDate(e);
return!1;
}
});
t.data.begin_time?($("#"+v.inputId).html(i(_)+"-"+i(o)),l.val(a(_,m).unix()),b.val(a(o,m).unix())):($("#"+v.inputId).html("请选择时间"),
$("#"+v.nextMonth).click());
}
var a=t("biz_common/moment.js"),d=t("common/wx/Tips.js"),n=t("biz_web/ui/dateRange.js");
return i;
});