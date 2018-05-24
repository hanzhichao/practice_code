define("common/wx/dateSelect.js",["widget/date_select.css","tpl/dateSelect.html.js","common/qq/events.js","biz_web/ui/dropdown.js","biz_common/moment.js","common/lib/datepicker.js"],function(t){
"use strict";
function e(t){
var e=this;
t=$.extend(!0,{},c,t),e.$dom=$(t.container).html(template.compile(r)(t)).addClass(s).hide(),
e.events=o(),e.opt=t,e.callback=t.callback,e.$dropdown=e.$dom.find(".dropdown_menu"),
e.dropdown=new d({
container:e.$dropdown,
label:t.label,
data:t.dropdown,
callback:function(t,a){
return e.events.trigger("dropdownChange",t,a);
}
}),e.$start=e.$dom.find(".jsDatapickerStart"),e.$end=e.$dom.find(".jsDatapickerEnd"),
e.$bt=e.$dom.find(".jsSubmitBt");
var m={
range:t.range,
start:t.start,
end:t.end,
format:t.format
};
e.dropdown.value&&$.extend(m,e.dropdown.value),n.apply(e,[m]),e.$bt.click(function(){
var n=$.trim(e.$start.val()),r=$.trim(e.$end.val());
if(a(n)&&a(r)){
var o=i(n,t.format).unix(),d=i(r,t.format).unix();
o==d&&(d+=86399),t.callback(o,d);
}else alert("输入的日期格式不合法");
}),e.events.on("dropdownChange",function(a){
a&&a.start&&a.end&&(e.$start.val(i.unix(a.start).format(t.format)),e.$end.val(i.unix(a.end).format(t.format)),
e.$bt.trigger("click"));
}),e.$dom.show();
}
function a(t){
t.match(/^(\d{4})-(\d{2})-(\d{2})/g);
var e=Number(RegExp.$1),a=Number(RegExp.$2),n=Number(RegExp.$3);
return e&&e>2012&&a&&13>a&&n&&32>n;
}
function n(t){
var e=this,a={
changeMonth:!0,
format:t.format,
minDate:t.range.start&&i.unix(t.range.start)._d,
maxDate:t.range.end&&i.unix(t.range.end)._d,
onSelect:function(){
e.dropdown.reset();
}
},n=$.extend(!0,{},a,{
defaultDate:i.unix(t.start)._d,
onClose:function(t){
e.$end.datepicker("option","minDate",t),e.dropdown.reset();
}
}),r=$.extend(!0,{},a,{
defaultDate:i.unix(t.end)._d,
onClose:function(t){
e.$start.datepicker("option","maxDate",t),e.dropdown.reset();
}
});
this.$start.datepicker(n),this.$start.attr("title","日期格式:"+i.unix(t.start).format(a.format)),
this.$start.val(i.unix(t.start).format(a.format)),this.$end.datepicker(r),this.$end.attr("title","日期格式:"+i.unix(t.end).format(a.format)),
this.$end.val(i.unix(t.end).format(a.format)),this.$start.parent().click(function(){
return e.$start.datepicker("show"),!1;
}),this.$end.parent().click(function(){
return e.$end.datepicker("show"),!1;
});
}
t("widget/date_select.css");
var r=t("tpl/dateSelect.html.js"),o=t("common/qq/events.js"),d=t("biz_web/ui/dropdown.js"),i=t("biz_common/moment.js");
t("common/lib/datepicker.js");
var s="date_select",m=wx.data.time,c={
callback:$.noop,
range:{},
start:m,
end:m,
format:"YYYY-MM-DD",
label:"请选择",
name:"查询"
};
return e.prototype={
getData:function(){
var t=$.trim(this.$start.val()),e=$.trim(this.$start.val());
if(a(t)&&a(e)){
var n=i(t,this.opt.format).unix(),r=i(e,this.opt.format).unix();
return n==r&&(r+=86399),{
start:n,
end:r
};
}
alert("输入的日期格式不合法");
}
},e;
});