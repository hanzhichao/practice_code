define("cardticket/add/discount_time.js",["biz_web/ui/checkbox.js","common/wx/tooltips.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
this.opt=t;
var e=$(t.container);
this.discount_checkbox=$(t.container).find("input[type=checkbox]").checkbox();
var i=$(t.container).find(".js_discount_time_ask"),n=(new s({
container:i,
reposition:!0,
content:"法定节假日",
type:"hover"
}),this),o=$(t.container).find(".js_discount_select"),d=$(t.container).find(".js_discounttype");
d.checkbox({
onChanged:function(t){
var e=$(t).val();
"all"==e?(n.discount_checkbox.checked(!0),o.hide()):o.show(),n.is_update=!0;
}
}),d.filter("input:checked").click();
var c=e.find(".js_hour_range_list"),p=e.find(".js_add_time_period"),m=e.find(".js_del_time_period"),h=e.find(".js_time_period_fail"),l=e.find(".js_time_period_interval_fail"),u=e.find(".js_hour_range_container"),f=e.find(".js_add_time_period_first").click(function(){
return u.show(),f.hide(),c.find(".js_hour_range").length||c.append(_({})),n.is_update=!0,
!1;
});
c.on("change","input",function(){
a.test($(this).val())&&!RegExp.$2&&$(this).val($(this).val()+":00"),n.check_format(!0,!0)&&(n.$time_period_fail.hide(),
n.$time_interval_check_fail.hide());
}),p.click(function(){
return c.append(_({})),2==c.find(".js_hour_range").length&&p.hide(),!1;
}),m.click(function(){
var t=c.find(".js_hour_range");
return t.last().remove(),1==t.length&&(u.hide(),f.show()),p.show(),!1;
}),this.$hour_range_list=c,this.$time_period_fail=h,this.$time_interval_check_fail=l,
setInterval(function(){
var t=n._val(!1,!0),e=r.gen_time_limit(t.discount_day),i=t.discount_time_span,s=[];
if(i)for(var _=0;_<i.length;_++){
var a=i[_].start_time.split(":"),o=i[_].end_time.split(":"),d=parseInt(a[0]||0),c=parseInt(a[1]||0),p=parseInt(o[0]||0),m=parseInt(o[1]||0);
10>d&&(d="0"+d),10>p&&(p="0"+p),10>c&&(c="0"+c),10>m&&(m="0"+m),s.push(d+":"+c+"至"+p+":"+m);
}else s=["  全天"];
e+=e?s.join("  "):"",$("#js_time_limit_preview").text($("#js_use_time_preview").text()?"，"+e:e);
},500);
}
function i(t,e){
return t=t.split(":"),e=e.split(":"),t[0]=parseInt(t[0]),t[1]=parseInt(t[1])||0,
e[0]=parseInt(e[0]),e[1]=parseInt(e[1])||0,e[0]>t[0]?!0:e[0]==t[0]?e[1]>t[1]:!1;
}
function n(t,e){
t=$.extend(!0,{},t),e=$.extend(!0,{},e),t.start_time=t.start_time.split(":"),t.end_time=t.end_time.split(":"),
t.start_time[0]=parseInt(t.start_time[0]),t.start_time[1]=parseInt(t.start_time[1])||0,
t.start_time[1]<10&&(t.start_time[1]="0"+t.start_time[1]);
var i=parseInt(""+t.start_time[0]+t.start_time[1]);
t.end_time[0]=parseInt(t.end_time[0]),t.end_time[1]=parseInt(t.end_time[1])||0,t.end_time[1]<10&&(t.end_time[1]="0"+t.end_time[1]);
var n=parseInt(""+t.end_time[0]+t.end_time[1]);
e.start_time=e.start_time.split(":"),e.end_time=e.end_time.split(":"),e.start_time[0]=parseInt(e.start_time[0]),
e.start_time[1]=parseInt(e.start_time[1])||0,e.start_time[1]<10&&(e.start_time[1]="0"+e.start_time[1]);
var s=parseInt(""+e.start_time[0]+e.start_time[1]);
e.end_time[0]=parseInt(e.end_time[0]),e.end_time[1]=parseInt(e.end_time[1])||0,e.end_time[1]<10&&(e.end_time[1]="0"+e.end_time[1]);
var _=parseInt(""+e.end_time[0]+t.end_time[1]);
return s>n||i>_?!0:!1;
}
var s=(t("biz_web/ui/checkbox.js"),t("common/wx/tooltips.js")),_=template.compile('<span class="time_range js_hour_range">                            <span class="frm_input_box frm_input_box_short">                                <input value="" name="" type="text" class="frm_input valid js_hour_start" placeholder="">                            </span>                            <span class=""> 至 </span>                            <span class="frm_input_box frm_input_box_short">                                <input value="" name="" type="text" class="frm_input valid js_hour_end" placeholder="">                            </span>                        </span>'),r=t("cardticket/common_template_helper.js"),a=/^([0-9]|[0-1][0-9]|2[0-4])(:([0-9]|[0-5][0-9]))?$/;
return e.prototype._val=function(t,e){
this.opt.is_sns_card;
var i=this.check_format(!1,t),n=this.discount_checkbox.values();
if(!n.length)return e?{
discount_day:[],
discount_time_span:[]
}:{
discount_day:"",
discount_time_span:""
};
if(!i)return e?{
discount_day:n,
discount_time_span:[]
}:{
discount_day:n.join("|"),
discount_time_span:!1
};
var s=[],_=[];
if(i.length)if(e)_=i,s=n;else for(var r=0;r<n.length;r++)for(var a=0;a<i.length;a++){
s.push(n[r]);
var o=i[a].start_time,d=i[a].end_time;
o=o.split(":"),d=d.split(":"),_.push(parseInt(o[0])+","+(parseInt(o[1])||0)+","+parseInt(d[0])+","+(parseInt(d[1])||0));
}else s=n;
return e?{
discount_day:s,
discount_time_span:_
}:{
discount_day:s.join("|"),
discount_time_span:_.join("|")
};
},e.prototype.val=function(){
var t=this._val(!0,!1);
return t;
},e.prototype.check_format=function(t,e){
var s=this.$hour_range_list.find(".js_hour_range"),_=!0,r=this,o=[];
if(e&&(r.$time_period_fail.hide(),r.$time_interval_check_fail.hide()),s.each(function(){
var n=a,s=$(this).find(".js_hour_start").val().replace(/：/g,":"),d=$(this).find(".js_hour_end").val().replace(/：/g,":");
return n.test(s)&&n.test(d)?i(s,d)?void o.push({
start_time:s,
end_time:d
}):(e&&(t?s&&d&&($(this).find(".js_hour_start").focus(),r.$time_interval_check_fail.show()):($(this).find(".js_hour_start").focus(),
r.$time_interval_check_fail.show())),_=!1,!1):(e&&(t?s&&d&&($(this).find(".js_hour_start").focus(),
r.$time_period_fail.show()):($(this).find(".js_hour_start").focus(),r.$time_period_fail.show())),
_=!1,!1);
}),_){
for(var d=1;d<o.length;d++){
for(var c=o[d],p=0;d>p&&p<o.length;p++)if(!n(c,o[p])){
_=!1;
break;
}
if(!_)break;
}
return _?o:(e&&r.$time_interval_check_fail.show(),!1);
}
return!1;
},e;
});