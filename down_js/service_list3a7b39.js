define("city/service_list.js",["common/wx/top.js","biz_common/moment.js"],function(t){
"use strict";
function n(){
e(),a(),i();
}
function e(){
var t=[{
id:"servie_manage",
name:"服务管理",
url:"/city/servicemanage?action=getlist"
},{
id:"biztemplate",
name:"接口能力",
url:"/city/biztemplate?action=index"
}],n=new s("#js_topTab",t);
n.selected("servie_manage");
}
function a(){
for(var t=[],n=c.list,e=0,a=n.length;a>e;e++){
var i=n[e];
if(i){
var s={};
s.name=i.name;
for(var m=[],d=0;5>d;d++)m.push(d<i.rank?!0:!1);
s.stars=m,s.time_created=_(1e3*i.time_created).format(u),s.audit_status_desc=i.audit_status?o.audit_status[i.audit_status]:"已通过",
s.running_status_desc=i.running_status?o.running_status[i.running_status]:"无",s.entry_id=i.entry_id,
t.push(s);
}
}
var l=template("js_detail_item",{
data:t
}),g=r("#js_detail");
g.html(l);
}
function i(){
$("#js_service_new").on("click",function(){
location.href="/city/servicemanage?action=addpage&lang="+c.lang+"&token="+c.token;
});
}
var s=t("common/wx/top.js"),_=t("biz_common/moment.js"),r=jQuery,u="YYYY-MM-DD HH:mm",c=window.cgiData,o={
audit_status:{
AS_UNAUDITED:"审核中",
AS_AUDITING:"审核中",
AS_DECLINED:"审核不通过"
},
running_status:{
ES_NORMAL:"正常运行",
ES_HANNUPED:"挂起",
ES_BANNED:"停用",
EF_RANKING:"星级评定"
}
};
n();
});