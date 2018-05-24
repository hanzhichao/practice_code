define("city/service_detail.js",["common/wx/top.js","common/wx/Cgi.js","common/wx/city/base.js","common/wx/city/citys.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","biz_common/moment.js","city/star_template.js","city/basic_template.js"],function(e){
"use strict";
function t(){
a(),n(),_(),l(),c(),d(),f();
}
function a(){
var e=[{
id:"servie_manage",
name:"服务详情",
url:"/city/servicemanage?action=getlist"
},{
id:"biztemplate",
name:"接口能力",
url:"/city/biztemplate?action=index"
}],t=new w("#js_topTab",e);
t.selected("servie_manage");
}
function n(){
for(var e=[],t=0,a=R.doc.length;a>t;t++)R.doc[t]&&e.push(R.doc[t]);
L.doc=e;
}
function i(){
for(var e=[],t=0,a=L.class_list.length;a>t;t++)L.class_list[t]&&e.push(L.class_list[t]);
O=new x({
container:"#d_fw_typelist_area",
label:L.selected_class_name?L.selected_class_name:"请选择",
data:e,
callback:function(e){
L.selected_class_type=e;
}
});
}
function o(){
C=citys({
container:"#tv_cover_html_area",
over_top:!0,
callback:function(e){
for(var t="",a="",n=0,i=e.length;i>n;n++)0!=n&&(t+="、",a+=";"),a+=e[n].id,t+=e[n].name;
e.length>0&&$("#city_cover_edit_btn").html("修改"),$("#tv_cover_ids").val(a),$("#tv_cover_edit_span_float").html(t);
}
});
}
function _(){
L.online.id?(r(L.online),s(L.draft)):(r(L.draft),L.draft&&L.draft.audit_status&&(("AS_AUDITING"==L.draft.audit_status||"AS_UNAUDITED"==L.draft.audit_status)&&L.draft.rank&&parseInt(L.draft.rank)>=0&&!$.isEmptyObject(L.online)?($(".mod-frame__sub-tab_1").html(""),
$(".mod-frame__sub-tab_2").html("当前在星级评审中。")):$(".mod-frame__sub-tab_1").html(L.status_desc[L.draft.audit_status])));
}
function r(e){
if(e){
!L.draft||"AS_AUDITING"!=L.draft.audit_status&&"AS_UNAUDITED"!=L.draft.audit_status||($("#js_btn_mod_basic").hide(),
$("#js_btn_star").hide()),L.draft&&"AS_DECLINED"==L.draft.audit_status&&$("#js_btn_star").hide();
var t=L.online.rank&&parseInt(L.online.rank)>=0?L.rank_desc[L.online.rank]:"",a=L.online.rank&&parseInt(L.online.rank)>2?"该服务正在被后台排期上线。":"";
$(".mod-frame__sub-tab_2").html(t),$(".mod-frame__sub-tab_3").html(a),$("#js_running_status").html(e.running_status?L.running_status[e.running_status]:"无"),
$("#js_service_url").html(e.url),$("#js_service_name").html(e.name),$(".service-manage__icon-star:lt("+e.rank+")").addClass("service-manage__icon-star_act");
for(var n="",i="",o=0,_=e.list_area.length;_>o;o++){
var r=e.list_area[o];
r&&(n+=r.id<100?"0:"+r.id:(r.id+"").substring(0,2)+":"+r.id,i+=r.name,_>o+1&&(n+=";",
i+="、"));
}
L.cover_area.ids=n,L.cover_area.names=i,$("#js_cover_edit_span").html(i),$("#js_service_type").html(e.class_name),
L.selected_class_type=parseInt(e.class_index),L.selected_class_name=e.class_name;
var s=e.owner_contact,c=(s.company_name?s.company_name:"")+" "+(s.person_name?s.person_name:"")+" "+(s.phone_num?s.phone_num:"")+" "+(s.email?s.email:"");
$("#js_service_owner").html(c);
var l=e.dev_contact,d=(l.company_name?l.company_name:"")+" "+(l.person_name?l.person_name:"")+" "+(l.phone_num?l.phone_num:"")+" "+(l.email?l.email:"");
$("#js_service_dev").html(d);
}
}
function s(){
if(L.draft&&L.draft.audit_status&&(("AS_AUDITING"==L.draft.audit_status||"AS_UNAUDITED"==L.draft.audit_status)&&L.draft.rank&&parseInt(L.draft.rank)>=0&&!$.isEmptyObject(L.online)?($(".mod-frame__sub-tab_1").html(""),
$(".mod-frame__sub-tab_2").html("当前在星级评审中。")):$(".mod-frame__sub-tab_1").html(L.status_desc[L.draft.audit_status])),
L.draft){
if(("AS_AUDITING"==L.draft.audit_status||"AS_UNAUDITED"==L.draft.audit_status)&&($("#js_btn_mod_basic").hide(),
$("#js_btn_star").hide()),"AS_DECLINED"==L.draft.audit_status&&$("#js_btn_star").hide(),
L.draft.name&&($("#js_service_name_draft").html("申请修改为:"+L.draft.name),$("#js_service_name_draft").show()),
L.draft.url&&($("#js_service_url_draft").html("申请修改为:"+L.draft.url),$("#js_service_url_draft").show()),
L.draft.list_area&&L.draft.list_area.length>0){
for(var e="",t="",a=0,n=L.draft.list_area.length;n>a;a++){
var i=L.draft.list_area[a];
i&&(e+=i.name,t+=i.id<100?"0:"+i.id:(i.id+"").substring(0,2)+":"+i.id,n>a+1&&(t+=";",
e+="、"));
}
L.draft.cover_area={},L.draft.cover_area.names=e,L.draft.cover_area.ids=t,$("#js_cover_edit_span_draft").html("申请修改为:"+e),
$("#js_cover_edit_span_draft").show();
}
if(L.draft.class_name&&($("#js_service_type_draft_div").html("申请修改为:"+L.draft.class_name),
$("#js_service_type_draft_div").show(),L.selected_class_name=L.draft.class_name,
L.selected_class_type=L.draft.class_index?parseInt(L.draft.class_index):0),!$.isEmptyObject(L.draft.owner_contact)){
var o=L.draft.owner_contact,_=(o.company_name?o.company_name:"")+" "+(o.person_name?o.person_name:"")+" "+(o.phone_num?o.phone_num:"")+" "+(o.email?o.email:"");
$("#js_service_owner_draft").html("申请修改为:"+_),$("#js_service_owner_draft").show();
}
if(!$.isEmptyObject(L.draft.dev_contact)){
var r=L.draft.dev_contact,s=(r.company_name?r.company_name:"")+" "+(r.person_name?r.person_name:"")+" "+(r.phone_num?r.phone_num:"")+" "+(r.email?r.email:"");
$("#js_service_dev_draft").html("申请修改为:"+s),$("#js_service_dev_draft").show();
}
}
}
function c(){
for(var e=0,t=L.doc.length;t>e;e++){
var a=L.doc[e];
a&&("1"==a.category?($("#js_doc_qualification").html(a.file_name),$("#js_doc_qualification").attr("href",a.url),
$("#js_doc_qualification").attr("ftime",a.last_modified)):"0"==a.category&&($("#js_img_authorize").html(a.file_name),
$("#js_img_authorize").attr("href",a.url),$("#js_img_authorize").attr("ftime",a.last_modified),
$("#js_online_default").hide()));
}
}
function l(){
for(var e="",t=0,a=L.online_cities.length;a>t;t++){
var n=L.online_cities[t];
n&&(e+=n.name,a>t+1&&(e+="、"));
}
$("#js_online_citys").html(e);
}
function d(){
for(var e=L.rank_list,t={},a=0,n={
1:"一",
2:"二",
3:"三",
4:"四",
5:"五"
},i=0,o=e.length;o>i;i++)e[i]&&(a==e[i].rank?t[a].push(e[i]):(a=e[i].rank,t[a]=new Array(e[i]),
t[a].stepname=n[a]+"星标准"));
L.rankflag=L.online.rank&&parseInt(L.online.rank)>0?0:1;
for(var _="",r=1;6>r;r++)for(var e=t[r],i=0,o=e.length;o>i;i++){
var s=e[i],c={
"{#stepname#}":e.stepname,
"{#steplen#}":e.length,
"{#name#}":$xss(s.name,"htmlEp"),
"{#desc#}":s.desc,
"{#sid#}":s.id,
"{#status#}":s.status?L.star_status[s.status]:"无"
};
0==i?(_+=$strReplace(z.troneEx,c),_=1==r?$strReplace(_,{
"{#biaozhunname#}":'<td rowspan="'+(t[1].length+t[2].length+t[3].length)+'" class="service-manage__border service-manage__table-bg"><strong>上线标准</strong></td>'
}):4==r?$strReplace(_,{
"{#biaozhunname#}":'<td rowspan="'+(t[4].length+t[5].length)+'" class="service-manage__border service-manage__table-bg-more">优秀标准</td>'
}):$strReplace(_,{
"{#biaozhunname#}":""
})):_+=$strReplace(z.tryesEx,c);
}
var l=$strReplace(z.tableEx,"{#tbody_area#}",_);
$("#js_star_table").html(l);
}
function m(){
D&&(D.close(),D=null);
for(var e=L.rank_list,t={},a=0,n={
1:"一",
2:"二",
3:"三",
4:"四",
5:"五"
},i=0,o=e.length;o>i;i++)e[i]&&(a==e[i].rank?t[a].push(e[i]):(a=e[i].rank,t[a]=new Array(e[i]),
t[a].stepname=n[a]+"星标准"));
for(var _="",r=1;6>r;r++)for(var e=t[r],i=0,o=e.length;o>i;i++){
var s=e[i],c={
"{#stepname#}":e.stepname,
"{#steplen#}":e.length,
"{#name#}":$xss(s.name,"htmlEp"),
"{#desc#}":s.desc,
"{#sid#}":s.id,
"{#biaozhunname#}":"",
"{#status#}":s.status?L.star_status[s.status]:"无"
};
_+=0==i?"CS_FAILED"==s.status&&0==L.rankflag?$strReplace(z.troneno,c):$strReplace(z.trone,c):"CS_FAILED"==s.status&&0==L.rankflag?$strReplace(z.trno,c):$strReplace(z.tryes,c);
}
if(1==L.rankflag){
var l=$strReplace(z.starTemplateFirst,{
"{#table#}":$strReplace(z.table,"{#tbody_area#}",_)
});
D=$float({
id:"service_licence_dialog",
title:"申请质量星级评定",
html:l,
width:960,
left:(document.documentElement.clientWidth-960)/2,
fix:!0,
style:"",
leaver:100,
cover:!0,
closeId:"a_btn_service_license_close, a_btn_service_license_no",
onInit:function(){
return $("#img_authorize_preview").html()&&($("#online_doc_box").html($("#img_authorize_preview").html()),
$("#online_doc_box").attr("href",$("#img_authorize_preview").attr("href")),$("#online_doc_box").attr("ftime",$("#img_authorize_preview").attr("ftime"))),
N=j.uploadFile({
container:"#a_btn_updateonline_upload",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,t,a,n,i){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var o="";
for(var _ in a)o+=_+": "+a[_]+", ";
console.log("fileObj: "+o),console.log("data: "+JSON.stringify(i));
var r=n.url,s="";
a&&a.name&&(s=a.name),$("#online_doc_box").html(s),$("#online_doc_box").attr("href",r),
$("#online_doc_box").attr("ftime",(new Date).getTime()/1e3),L.doc.push({
file_name:s,
url:r,
last_modified:parseInt((new Date).getTime()/1e3),
category:"0"
}),$("#d_fw_online_doc_tip").hide();
}
}
}),$("#a_btn_service_license_yes").off("click").on("click",function(){
for(var e=[],t=0,a=L.rank_list.length;a>t;t++)L.rank_list[t]&&e.push(L.rank_list[t].id);
h(e);
}),$("#a_btn_service_license_close, #a_btn_service_license_no").off("click").on("click",function(){
D&&(D.close(),D=null),N&&(N.destroy(),N=null);
}),!0;
},
onClose:function(){
return $("#float_cover").css("display","none"),!0;
}
});
}else{
var l=$strReplace(z.starTemplateSec,{
"{#table#}":$strReplace(z.table,"{#tbody_area#}",_),
"{#name#}":0==L.doc.length?"":L.doc[0].file_name,
"{#url#}":0==L.doc.length?"":L.doc[0].url
});
D=$float({
id:"service_licence_dialog2",
title:"申请质量星级评定",
html:l,
width:960,
left:(document.documentElement.clientWidth-960)/2,
fix:!1,
style:"",
leaver:100,
cover:!0,
closeId:"a_btn_service_license_close, a_btn_service_license_no",
onInit:function(){
$("#online_doc_box").html($("#img_authorize_preview").html()),$("#online_doc_box").attr("href",$("#img_authorize_preview").attr("href")),
$("#online_doc_box").attr("ftime",$("#img_authorize_preview").attr("ftime"));
for(var e=0,t=L.doc.length;t>e;e++){
var a=L.doc[e];
if("2"==a.category){
var n="";
n=a.file_name.endsWith(".doc")||a.file_name.endsWith(".docx")||a.file_name.endsWith(".pdf")||a.file_name.endsWith(".zip")?$strReplace(z.fileListTrTemplate,{
"{#name#}":a.file_name,
"{#fid#}":e,
"{#timel#}":a.last_modified,
"{#time#}":a.last_modified?k(1e3*parseInt(a.last_modified)).format(W):"----",
"{#url#}":a.url
}):$strReplace(z.fileListTrPicTemplate,{
"{#name#}":a.file_name,
"{#time#}":a.last_modified?k(1e3*parseInt(a.last_modified)).format(W):"----",
"{#url#}":a.url,
"{#timel#}":a.last_modified
}),$("#file_list_box").append(n);
}
}
return $("#star_form .label").off("click").on("click",function(){
return $(this).hasClass("label_selected")?$(this).removeClass("label_selected"):$(this).addClass("label_selected"),
!1;
}),N=j.uploadFile({
container:"#a_btn_updateonline_upload",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,t,a,n,i){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var o="";
for(var _ in a)o+=_+": "+a[_]+", ";
console.log("fileObj: "+o),console.log("data: "+JSON.stringify(i));
var r=n.url,s="";
a&&a.name&&(s=a.name),$("#online_doc_box").html(s),$("#online_doc_box").attr("href",r),
$("#online_doc_box").attr("ftime",(new Date).getTime()/1e3),L.doc.push({
file_name:s,
url:r,
last_modified:parseInt((new Date).getTime()/1e3),
category:"0"
}),$("#d_fw_online_doc_tip").hide();
}
}
}),A=j.uploadFile({
container:"#a_btn_authorize_upload_2",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,t,a,n,i){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var o="";
for(var _ in a)o+=_+": "+a[_]+", ";
console.log("fileObj: "+o),console.log("data: "+JSON.stringify(i));
var r=n.url,s="";
a&&a.name&&(s=a.name);
var c=(new Date).getTime(),l=k(c).format(W);
if(s.endsWith(".doc")||s.endsWith(".docx")||s.endsWith(".pdf")||s.endsWith(".zip")){
var d=$strReplace(z.fileListTrTemplate,{
"{#name#}":s,
"{#fid#}":s,
"{#timel#}":c,
"{#time#}":l,
"{#url#}":r
});
$("#file_list_box").append(d);
}else{
var d=$strReplace(z.fileListTrPicTemplate,{
"{#name#}":s,
"{#time#}":l,
"{#url#}":r,
"{#timel#}":c
});
$("#file_list_box").append(d);
}
L.doc.push({
file_name:s,
url:r,
last_modified:parseInt((new Date).getTime()/1e3),
category:"2"
}),$(".a_btn_upload_del").off("click").on("click",function(){
$(this).parent().parent().remove();
});
}
}
}),$("#a_btn_service_license_yes").off("click").on("click",function(){
for(var e=[],t=$("#star_form .label__checkbox_targe"),a=0,n=t.length;n>a;a++)$(t[a]).hasClass("label_selected")&&e.push(parseInt($(t[a]).attr("sid")));
h(e);
}),$("#a_btn_service_license_close, #a_btn_service_license_no").off("click").on("click",function(){
D&&(D.close(),D=null),N&&(N.destroy(),N=null),A&&(A.destroy(),A=null);
}),$(".a_btn_upload_del").off("click").on("click",function(){
$(this).parent().parent().remove();
}),!0;
},
onClose:function(){
return $("#float_cover").css("display","none"),!0;
}
});
}
}
function f(){
$("#js_btn_mod_basic").on("click",function(){
p();
}),$("#js_btn_star").on("click",function(){
m();
});
}
function p(){
I&&(I.close(),I=null);
var e=$strReplace(S.basic,{
"{#name#}":$xss(L.draft&&L.draft.name?L.draft.name:L.online.name,"htmlEp"),
"{#id#}":L.online.id,
"{#url#}":L.draft&&L.draft.url?L.draft.url:L.online.url,
"{#area#}":L.draft&&L.draft.cover_area?L.draft.cover_area.names:L.cover_area.names,
"{#areaid#}":L.draft&&L.draft.cover_area?L.draft.cover_area.ids:L.cover_area.ids,
"{#type#}":"类别",
"{#contact_owner_cname#}":L.draft&&L.draft.owner_contact?L.draft.owner_contact.company_name:L.online.owner_contact.company_name,
"{#contact_owner_person#}":L.draft&&L.draft.owner_contact?L.draft.owner_contact.person_name:L.online.owner_contact.person_name,
"{#contact_owner_phone#}":L.draft&&L.draft.owner_contact?L.draft.owner_contact.phone_num:L.online.owner_contact.phone_num,
"{#contact_owner_email#}":L.draft&&L.draft.owner_contact?L.draft.owner_contact.email:L.online.owner_contact.email,
"{#contact_engineer_cname#}":L.draft&&L.draft.dev_contact?L.draft.dev_contact.company_name:L.online.dev_contact.company_name,
"{#contact_engineer_person#}":L.draft&&L.draft.dev_contact?L.draft.dev_contact.person_name:L.online.dev_contact.person_name,
"{#contact_engineer_phone#}":L.draft&&L.draft.dev_contact?L.draft.dev_contact.phone_num:L.online.dev_contact.phone_num,
"{#contact_engineer_email#}":L.draft&&L.draft.dev_contact?L.draft.dev_contact.email:L.online.dev_contact.email,
"{#doc#}":$("#js_doc_qualification").html(),
"{#docurl#}":$("#js_doc_qualification").attr("href")
});
I=$float({
id:"modBasic",
title:"",
html:e,
width:960,
fix:!0,
style:"none",
leaver:100,
cover:!0,
closeId:"js_btn_mod_basic_close,js_btn_mod_basic_no",
onInit:function(){
i(),u(),g(),o(),$(".a_btn_upload_del").off("click").on("click",function(){
$(this).parent().parent().remove(),$("#file_list_box_mod").attr("modf",1);
}),$("#city_cover_edit_btn").on("click",function(){
C.init($("#tv_cover_ids").val());
}),$("#a_btn_service_license_yes").off("click").on("click",function(){
v();
}),$("#js_btn_mod_basic_close, #js_btn_mod_basic_no").off("click").on("click",function(){
I&&(I.close(),I=null),T&&(T.destroy(),T=null),E&&(E.destroy(),E=null);
});
},
onClose:function(){
return $("#float_cover").css("display","none"),!0;
}
});
}
function u(){
for(var e=0,t=L.doc.length;t>e;e++)if(L.doc[e]&&"2"==L.doc[e].category){
var a="";
a=L.doc[e].file_name.endsWith(".doc")||L.doc[e].file_name.endsWith(".docx")||L.doc[e].file_name.endsWith(".pdf")||L.doc[e].file_name.endsWith(".zip")?$strReplace(S.fileListTrTemplate,{
"{#name#}":L.doc[e].file_name,
"{#fid#}":e,
"{#timel#}":L.doc[e].last_modified,
"{#time#}":L.doc[e].last_modified?k(1e3*parseInt(L.doc[e].last_modified)).format(W):"----",
"{#url#}":L.doc[e].url
}):$strReplace(S.fileListTrPicTemplate,{
"{#name#}":L.doc[e].file_name,
"{#time#}":L.doc[e].last_modified?k(1e3*parseInt(L.doc[e].last_modified)).format(W):"----",
"{#url#}":L.doc[e].url,
"{#timel#}":L.doc[e].last_modified
}),$("#file_list_box_mod").append(a);
}
}
function g(){
T=j.uploadFile({
container:"#a_btn_zzdoc_upload",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,t,a,n,i){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var o="";
for(var _ in a)o+=_+": "+a[_]+", ";
console.log("fileObj: "+o),console.log("data: "+JSON.stringify(i));
var r=n.url;
$("#img_zzdoc_preview").attr("href",r),a&&a.name&&$("#img_zzdoc_preview").text(a.name);
}
}
}),E=j.uploadFile({
container:"#a_btn_authorize_upload_2",
url:"/city/fileupload?action=upload_file",
multi:!0,
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf,doc,zip,docx",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf,application/msword,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
},
fileSingleSizeLimit:10485760,
onComplete:function(e,t,a,n,i){
if(!n.base_resp||0==n.base_resp.ret){
console.log("response: "+JSON.stringify(n));
var o="";
for(var _ in a)o+=_+": "+a[_]+", ";
console.log("fileObj: "+o),console.log("data: "+JSON.stringify(i));
var r=n.url,s="";
a&&a.name&&(s=a.name);
var c=(new Date).getTime(),l=k(c).format(W);
if(s.endsWith(".doc")||s.endsWith(".docx")||s.endsWith(".pdf")||s.endsWith(".zip")){
var d=$strReplace(S.fileListTrTemplate,{
"{#name#}":s,
"{#fid#}":s,
"{#timel#}":c,
"{#time#}":l,
"{#url#}":r
});
$("#file_list_box_mod").append(d);
}else{
var d=$strReplace(S.fileListTrPicTemplate,{
"{#name#}":s,
"{#time#}":l,
"{#url#}":r,
"{#timel#}":c
});
$("#file_list_box_mod").append(d);
}
L.doc.push({
file_name:s,
last_modified:parseInt((new Date).getTime()/1e3),
url:r,
category:"2"
}),$("#file_list_box_mod").attr("modf",1),$(".a_btn_upload_del").off("click").on("click",function(){
$(this).parent().parent().remove(),$("#file_list_box_mod").attr("modf",1);
});
}
}
});
}
function v(){
var e=b();
e&&y.post({
url:wx.url("/city/servicemanage?action=mod"),
data:e,
error:function(){
common.showErrWnd("提交基础信息变更申请，网络请求失败！");
}
},function(e){
if(e&&e.base_resp){
var t=e.base_resp.ret;
if(0==t)return void common.showErrWnd("已提交基础信息变更申请！",function(){
location.reload();
});
}
common.showErrWnd("提交基础信息变更申请，请求失败！");
});
}
function h(e){
if(0==e.length)return void $(".choosestartip").show();
var t=[],a=$("#file_list_box .filelist");
if(a&&a.length>0)for(var n=0,i=a.length;i>n;n++)t.push({
file_name:$(a[n]).html(),
last_modified:parseInt($(a[n]).attr("ftime")),
url:$(a[n]).attr("fulr"),
category:"2"
});
var o=$("#online_doc_box");
if(o){
if(!o.html())return void $("#d_fw_online_doc_tip").show();
t.push({
file_name:o.html(),
last_modified:parseInt(o.attr("ftime")),
url:o.attr("href"),
category:"0"
});
}
var _=$("#d_doc_qualification");
_&&_.html()&&t.push({
file_name:_.html(),
last_modified:parseInt(_.attr("ftime")),
url:_.attr("href"),
category:"1"
});
var r={
id:L.draft&&L.draft.id?L.draft.id:L.online.id,
criterion_ids:JSON.stringify(e),
doc:JSON.stringify(t)
};
y.post({
url:wx.url("/city/servicemanage?action=applyrank"),
data:r,
error:function(){
common.showErrWnd("设置星级评定失败！");
}
},function(e){
if(e&&e.base_resp){
var t=e.base_resp.ret;
if(0==t)return void common.showErrWnd("申请星级评定成功！",function(){
location.reload();
});
}
common.showErrWnd("设置星级评定失败！");
}),D&&(D.close(),D=null);
}
function b(){
var e=!0,t=null,a=$.isEmptyObject(L.draft)?L.online:L.draft,n={};
n.entry_id=a.id;
var i=$.trim($("#d_fw_name_mod").val()),o=$.trim($("#d_fw_name_mod").attr("modf"));
i&&"请填写服务名称"!=i?($("#d_fw_name_mod_tip").hide(),i!=o&&(n.service_name=i,L.modflag=!0)):(t=t?t:$("#d_fw_name_mod"),
$("#d_fw_name_mod_tip").show(),e=!1);
var _=$.trim($("#d_fw_url_mod").val()),r=$.trim($(d_fw_url_mod).attr("modf")),s=/^http[s]?:\/\/.+$/;
_&&"请填写服务链接"!=_?s.test(_)?($("#d_fw_url_mod_tip").hide(),_!=r&&(n.service_url=_,
L.modflag=!0)):(t=t?t:$("#d_fw_url_mod"),$("#d_fw_url_mod_tip").show(),$("#d_fw_url_mod_tip").html("服务链接填写请以http://或https://开头"),
e=!1):(t=t?t:$("#d_fw_url_mod"),$("#d_fw_url_mod_tip").show(),e=!1),L.selected_class_type!=a.class_index&&(n.class_index=L.selected_class_type,
L.modflag=!0);
var c=[],l=$.trim($("#tv_cover_ids").val()),d=$("#tv_cover_edit_span_float").html(),m=$("#tv_cover_edit_span_float").attr("modf");
if(l){
for(var f=l.split(";"),p=0;p<f.length;p++){
var u=f[p].split(":");
c.push(parseInt(u[1]));
}
d!=m&&(n.district_ids=JSON.stringify(c),L.modflag=!0);
}else $("#d_fw_cover_mod_tip").show(),e=!1;
var g=$("#contact_owner_mod_box .cname").val();
g?$("#contact_owner_mod_box .service-manage__basic_owner_tip").hide():(t=t?t:$("#contact_owner_mod_box .cname"),
$("#contact_owner_mod_box .service-manage__basic_owner_tip").show(),e=!1);
var v=$("#contact_owner_mod_box .person").val();
v?$("#contact_owner_mod_box .service-manage__basic_owner_tip").hide():(t=t?t:$("#contact_owner_mod_box .person"),
$("#contact_owner_mod_box .service-manage__basic_owner_tip").show(),e=!1);
var h=$("#contact_owner_mod_box .phone").val();
h?$("#contact_owner_mod_box .service-manage__basic_owner_tip").hide():(t=t?t:$("#contact_owner_mod_box .phone"),
$("#contact_owner_mod_box .service-manage__basic_owner_tip").show(),e=!1);
var b=$("#contact_owner_mod_box .email").val();
b?$("#contact_owner_mod_box .service-manage__basic_owner_tip").hide():(t=t?t:$("#contact_owner_mod_box .email"),
$("#contact_owner_mod_box .service-manage__basic_owner_tip").show(),e=!1);
var w={
person_name:v,
company_name:g,
phone_num:h,
email:b
};
JSON.stringify(w)!=JSON.stringify(a.owner_contact)&&(n.owner_company=g,n.owner_name=v,
n.owner_phone=h,n.owner_email=b,L.modflag=!0);
var y=$("#contact_engineer_mod_box .cname").val();
y?$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").show():(t=t?t:$("#contact_engineer_mod_box .cname"),
$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").show(),e=!1);
var x=$("#contact_engineer_mod_box .person").val();
x?$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").hide():(t=t?t:$("#contact_engineer_mod_box .person"),
$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").show(),e=!1);
var j=$("#contact_engineer_mod_box .phone").val();
j?$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").hide():(t=t?t:$("#contact_engineer_mod_box .phone"),
$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").show(),e=!1);
var k=$("#contact_engineer_mod_box .email").val();
k?$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").hide():(t=t?t:$("#contact_engineer_mod_box .email"),
$("#contact_engineer_mod_box .service-manage__basic_engineer_tip").show(),e=!1);
var z={
person_name:x,
company_name:y,
phone_num:j,
email:k
};
JSON.stringify(z)!=JSON.stringify(a.dev_contact)&&(n.dev_company=y,n.dev_name=x,
n.dev_phone=j,n.dev_email=k,L.modflag=!0),t&&t.focus();
var S=[];
if($("#img_zzdoc_preview").attr("modf")!=$("#img_zzdoc_preview").attr("href")||1==$("#file_list_box_mod").attr("modf"))if($("#img_zzdoc_preview").html()){
S.push({
file_name:$("#img_zzdoc_preview").html(),
last_modified:parseInt((new Date).getTime()/1e3),
url:$("#img_zzdoc_preview").attr("href"),
category:"1"
});
for(var I=$("#file_list_box_mod .filelist"),p=0,T=I.length;T>p;p++){
var E=I[p];
S.push({
file_name:$(E).html(),
last_modified:parseInt($(E).attr("ftime")),
url:$(E).attr("fulr"),
category:"2"
});
}
n.doc=JSON.stringify(S);
}else e=!1,common.showErrWnd("您未上传资质授权公函！");
return e?n:!1;
}
var w=e("common/wx/top.js"),y=e("common/wx/Cgi.js");
e("common/wx/city/base.js"),e("common/wx/city/citys.js");
var x=e("biz_web/ui/dropdown.js"),j=e("biz_web/utils/upload.js"),k=e("biz_common/moment.js"),z=e("city/star_template.js"),S=e("city/basic_template.js"),I=null,T=null,E=null,D=null,N=null,A=null,O=null,C=null,W="YYYY-MM-DD HH:mm",R=window.cgiData,L={
star_status:{
CS_NOT_APPLICABLE:"不适用",
CS_UNAUDITTED:"待审核",
CS_PASSED:"已通过",
CS_FAILED:"未通过"
},
status_desc:{
AS_UNAUDITED:"基础信息审核中，请按星级开发指引核对完善当前服务质量，准备星级评审。",
AS_AUDITING:"基础信息审核中，请按星级开发指引核对完善当前服务质量，准备星级评审。",
AS_DECLINED:"基础信息审核不通过。"
},
rank_desc:{
0:"请于页面下方提交星级质量评审。",
1:"当前星级评审结果为一星，审核结果为三星才达上线标准，请按下方《星级质量标准》指引优化服务重新提交星级评审。",
2:"当前星级评审结果为二星，审核结果为三星才达上线标准，请按下方《星级质量标准》指引优化服务重新提交星级评审。",
3:"当前星级评审结果为三星，已达上线标准。但服务质量仍有优化空间，可选择继续提交更高星级审核。",
4:"当前星级评审结果为四星，已达上线标准。但服务质量仍有优化空间，可选择继续提交更高星级审核。",
5:"当前星级评审结果为五星，已达优秀上线标准。"
},
running_status:{
ES_NORMAL:"正常运行",
ES_HANNUPED:"挂起",
ES_BANNED:"停用"
},
online:R.online,
draft:R.draft,
class_list:R.class_list,
rank_list:R.rank_list,
doc:[],
online_cities:R.online_cities,
cover_area:{
ids:"",
names:""
},
selected_class_type:0,
selected_class_name:"",
modflag:!1,
rankflag:1
};
t();
});