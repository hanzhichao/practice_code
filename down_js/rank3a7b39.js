define("business/rank.js",["common/wx/dateSelect.js","common/wx/top.js","biz_common/moment.js","common/wx/Tips.js","common/wx/Cgi.js"],function(a){
"use strict";
var e=a("common/wx/dateSelect.js"),t=a("common/wx/top.js"),n=a("biz_common/moment.js"),s=a("common/wx/Tips.js"),i=a("common/wx/Cgi.js"),d=function(){
function a(){
new t("#topTab",t.DATA.business).selected(2);
var a=wx.data.time,s=[{
name:"昨天",
value:{
start:n.unix(a).add("days",-1).unix(),
end:n.unix(a).add("days",-1).unix()
}
},{
name:"最近7天",
value:{
start:n.unix(a).add("days",-7).unix(),
end:n.unix(a).add("days",-1).unix()
}
},{
name:"最近30天",
value:{
start:n.unix(a).add("days",-30).unix(),
end:n.unix(a).add("days",-1).unix()
}
}],i=n("20130805","YYYYMMDD").unix(),o=new e({
container:"#dateSelectDiv",
callback:function(a,e){
$(".jsPageBt:eq(0)").addClass("disabled").siblings().removeClass("disabled"),d({
startTime:a,
endTime:e
});
},
label:"快捷日期",
dropdown:s,
range:{
start:i,
end:n.unix(a).add("days",-1).unix()
}
});
o.dropdown.selected(1),$(".jsPageBt").click(function(){
$(this).hasClass("disabled")||(l.showPage($(this).data("value")),$(this).addClass("disabled").siblings().removeClass("disabled"));
});
}
function d(a){
a="&"+$.param(a||dateSelect.getData());
var e="/merchant/bizpay?t=wxm-index&f=json&op=dataRank"+wx.data.param;
i.get(e+a,function(a){
if(0==a.BizBaseRetResp.Ret){
var e=a.Data,t=["其它","人工回复","群发","自动回复","自定义菜单"];
$.each(e,function(a,e){
e.i=a+1,e.Name=e.Name||e.Url;
var n=0,s=0;
$.each(e.Class,function(a,e){
e.name=t[e.Src],n+=e.Pv,s+=e.Pay;
}),e.Class=[e.Class[2],e.Class[3],e.Class[1],e.Class[4],e.Class[0]],e.pv=n,e.pay=s;
}),l.init(e);
}else s.err();
});
}
return{
init:a
};
}(),l=function(){
function a(a){
n=a,t(1),n.length<10?$(".jsPageBt").hide():$(".jsPageBt").show();
}
function e(){
$(".detailBt").click(function(){
var a=$(this),e=a.find(".close").length;
$(".item-detail").hide(),$(".icon").addClass("close"),e>0?(a.parent("tr").nextUntil(".item").show(),
a.find("i").removeClass("close")):(a.parent("tr").nextUntil(".item").hide(),a.find("i").addClass("close"));
});
}
function t(a){
a--;
var t=n.slice(10*a,10*a+10);
t.length>0?($("#table").html(template.render("tpl",{
data:t
})),$(".item-detail").hide(),e()):$("#table").html('<tr><td colspan="5" class="no-data">暂无数据</td></tr>'),
$(".detailBt:eq(0)").trigger("click");
}
var n=[];
return{
init:a,
showPage:t
};
}();
d.init();
});