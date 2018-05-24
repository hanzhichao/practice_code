define("cardticket/add/validtime.js",["common/qq/events.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_web/ui/dateRange.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js"],function(e){
"use strict";
function t(e){
e||(e=$("#js_editform_step1").serializeObject());
var t="YYYY.MM.DD";
if(1==e.time_type&&e.begin_time){
var a=e.begin_time?r.unix(e.begin_time).format(t):r().add("d",1).format(t),i=e.end_time?r.unix(e.end_time).format(t):r().add("M",1).format(t);
$("#js_use_time_preview").text(a+"-"+i);
}
2==e.time_type&&$("#js_use_time_preview").text(r().add("d",parseInt(e.from_day)).format(t)+"-"+r().add("d",parseInt(e.from_day)+parseInt(e.fixed_term-1)).format(t));
}
function a(e,t,a,i,d){
if(!(e||a&&1!=a))return _.err("请选择生效时间"),i.gofirst(),!1;
if(!(t||a&&2!=a))return _.err("请选择失效时间"),i.gofirst(),!1;
if(!d){
if(e&&r.unix(e).add("d",1).unix()<r().unix())return _.err("生效时间不能是今天之前的时间"),i.gofirst(),
!1;
if(e&&t&&r.unix(e).unix()>r.unix(t).unix())return _.err("生效时间不能小于失效时间"),i.gofirst(),
!1;
}
return!0;
}
function i(e){
function i(e){
return r(e,j).format("YYYY.MM.DD");
}
e=$.extend(!0,{
sectionmgr:null,
data:{}
},e);
for(var d=$("#js_hidden_time_type"),o=$("#js_hidden_begintime"),l=$("#js_hidden_endtime"),u=$("#js_hidden_fixed_term"),c=$("#js_hidden_from_day"),f=($("#js_invalidtime"),
$("#js_hidden_fixed_endtime"),$(".js_validtime")),b=(f.checkbox({
onChanged:function(e){
var a=e.val();
1==a?(d.val(a),h.disable(),p.disable(),z._disabled=!1,$("#"+z.inputId).parent().removeClass("disabled"),
n.trigger("validtime:valid_time_changed",1)):(d.val(2),h.enable(),p.enable(),z._disabled=!0,
$("#"+z.inputId).parent().addClass("disabled"),n.trigger("validtime:valid_time_changed",2)),
t();
}
}),[{
name:"当天",
value:0
}]),v=[],g=90,x=1;g>=x;x++)b.push({
name:x+"天",
value:x
});
for(var x=1;g>=x;x++)v.push({
name:x+"天",
value:x
});
var h=new m({
container:"#js_from_day_container",
label:"当天",
data:b,
callback:function(e){
c.val(e),t();
}
});
h.selected(e.data.from_day),c.val(e.data.from_day),b.shift();
var p=new m({
container:"#js_fixed_term_container",
label:"1天",
data:b,
callback:function(e){
u.val(e),t();
}
});
p.selected(e.data.fixed_term+""),u.val(e.data.fixed_term);
var j="YYYY-MM-DD",D=r().format(j),I=(r().add("d",1).format(j),r().add("M",1).format(j)),Y=e.data.begin_time?r.unix(e.data.begin_time).format(j):D,w=r().add("d",-1).unix(),y=e.data._is_global_editting&&e.data.begin_time&&e.data.begin_time<w?e.data.begin_time:w,k=e.data.end_time?r.unix(e.data.end_time).format(j):I,M=e.data._is_global_editting?r(Y,j).add("d",89).unix():r().add("d",89).unix(),z=s({
container:"#js_begin_time_container",
stopToday:!1,
isTodayValid:!0,
minValidDate:y,
maxValidDate:e.data.is_sns_card?M:r().add("M",120),
startDate:Y,
endDate:e.data.end_time?k:Y,
defaultText:"-",
theme:"ta",
monthRangeMax:120,
success:function(n){
$("#"+z.inputId).html(i(n.startDate)+"-"+i(n.endDate)),o.val(r(n.startDate,j).unix()),
l.val(r(n.endDate,j).unix()),t(),1==d.val()&&a(o.val(),l.val(),1,e.sectionmgr,e.data._is_global_editting);
},
beforeSelect:function(t){
if(!e.data._is_global_editting)return!0;
var a=r(t,j).unix(),i=e.data.end_time-86400+1;
if(2==e.data.time_type)return!0;
if(a>e.data.begin_time&&i>a)return _.err("只能延长有效期"),!1;
if(a<=e.data.begin_time){
this.dateInput=this.startDateId,this.selectDate(t),this.dateInput=this.endDateId;
var d=$("#"+this.endDateId).val(),d=r(d,j).format("YYYY-M-D");
this.selectDate(d);
}else this.dateInput=this.endDateId,this.selectDate(t);
return!1;
}
});
e.data.begin_time?($("#"+z.inputId).html(i(Y)+"-"+i(k)),o.val(r(Y,j).unix()),l.val(r(k,j).unix())):($("#"+z.inputId).html("请选择时间"),
$("#"+z.nextMonth).click()),1==e.data.time_type?$(f[0]).click():2==e.data.time_type&&$(f[1]).click(),
t(e.data),n.trigger("validtime:valid_time_changed",$(".js_validtime:checked").val()),
setInterval(function(){
t();
},500);
}
var d=e("common/qq/events.js"),n=d(!0),r=e("biz_common/moment.js"),m=e("biz_web/ui/dropdown.js"),_=e("common/wx/Tips.js"),s=e("biz_web/ui/dateRange.js");
e("biz_web/ui/checkbox.js");
e("cardticket/common_template_helper.js");
return i;
});