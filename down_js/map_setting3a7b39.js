define("setting/map_setting.js",["biz_web/lib/json.js","biz_common/jquery.validate.js","common/wx/popup.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js","setting/multi_citydata.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js","common/wx/dialog.js"],function(a){
"use strict";
a("biz_web/lib/json.js"),a("biz_common/jquery.validate.js"),a("common/wx/popup.js");
var e=a("biz_web/ui/dropdown.js"),t=a("biz_web/utils/upload.js"),n=a("setting/multi_citydata.js"),i=a("common/wx/Tips.js"),r=a("common/wx/pagebar.js"),o=a("common/wx/Cgi.js"),l=a("common/wx/dialog.js"),d={
cacheData:{
all:[],
check:[],
reject:[],
pass:[]
},
searchData:{
all:[],
check:[],
reject:[],
pass:[]
},
searchKey:"",
data:[],
statusName:{
"-1":"('新增')",
0:"未审核",
1:"系统错误",
2:"审核中",
3:"已通过",
4:"不通过"
},
menuDomId:["#list_province","#list_city","#list_district"],
pageConfig:{
currentPage:1,
perPage:10,
totalNum:0
},
editTr:{
index:null,
html:""
},
curTab:"all",
area:new Array(3),
categoryConf:{},
uploading:!1,
uploadSuc:!1
};
!function(){
function c(){
D(),T(),j();
}
function s(){
var a=$("#listMain");
a.bind("fillForm",_),a.bind("delInfoSuc",g),a.on("click",".jsShowMap",function(){
var a=d.category||{},e=$("#add_name"),t=$("#add_tel"),n={
lat:"",
lng:"",
userInfo:{
name:e.val()?e.val().trim():"",
tel:t.val()?t.val().trim():""
},
address:null,
category:{
name:a.name||"",
value:a.value||""
},
poiStatus:-1
};
if(d.area)for(var i=d.area.length-1;i>=0;i--){
var r=d.area[i];
if(r&&r.data&&r.data.location){
n.lat=r.data.location.lat,n.lng=r.data.location.lng;
break;
}
}
C({
markerData:n
});
}),a.on("click",".jsHideAdd",function(){
$("#add_tr").hide().html("");
}),a.on("click",".jsHideEdit",function(){
$("#tableList").find("tr[data-index="+d.editTr.index+"]").html(d.editTr.html),d.editTr.index=null,
d.editTr.html="";
}),a.on("click",".jsAddPoi",function(){
return d.cacheData.all.length>=window.multi_poi?void i.err("门店数量达到上限，不能增加新的门店信息"):void($("#add_tr").is(":hidden")&&(d.pageConfig.currentPage=1,
h("all"),p(d.cacheData.all),d.data=k(),D(),T(),j(),$("#listMain").trigger("fillForm",{
userInfo:{},
address:{},
area:d.area||new Array(3),
category:d.category||{}
})));
}),a.on("click",".jsDetail",function(a){
var e=1*$(a.target).data("index"),t=1*$(a.target).data("realindex"),n=d.data[e],i={
realindex:t,
dataIndex:e,
id:n.id,
lat:n.latitude,
lng:n.longitude,
userInfo:{
name:n.branch_name,
tel:n.telephone
},
address:{
finalAddress:n.address,
province:n.province,
city:n.city,
district:n.district
},
category:{
name:d.categoryConf[n.category]||"",
value:n.category
},
poiStatus:n.audit_state
};
C({
model:1*n.audit_state===3||1*n.audit_state==4?"update":"check",
showMarker:!0,
markerData:i
});
}),a.on("click",".jsDelete",v),a.on("click",".jsSubmit",w("insert")),a.on("click",".jsEditSubmit",w("update")),
a.on("click","li.tab_nav",function(a){
var e;
e=/li/i.test(a.target.nodeName)?$(a.target).data("item"):$(a.target).parents("li").data("item"),
h(e),d.pageConfig.currentPage=1,d.pageConfig.totalNum=d.searchData[d.curTab].length,
d.data=k(),D(),T();
}),$("#searchBtn").click(function(){
f();
}),$("#searchInput").keydown(function(a){
wx.isHotkey(a,"enter")&&f();
}),$("#clearSearch").click(function(){
$("#searchInput").val(""),f();
}),a.on("click",".jsUpload",function(){
m();
}),$("body").on("click",".jsUploadSuc",function(){
window.location.reload();
});
}
function u(){
p(window.poiList.store_location),d.data=k(),window.poiList=null,$.cache.sosoMap={
category:[{
name:"美食",
value:"100000"
},{
name:"娱乐休闲",
value:"160000"
},{
name:"购物",
value:"130000"
},{
name:"生活服务",
value:"140000"
},{
name:"运动健身",
value:"180000"
},{
name:"酒店宾馆",
value:"210000"
},{
name:"汽车服务",
value:"190000"
},{
name:"旅游景点",
value:"220000"
},{
name:"文体场馆",
value:"230000"
},{
name:"教育学校",
value:"240000"
},{
name:"医疗保健",
value:"200000"
},{
name:"银行金融",
value:"250000"
},{
name:"公司企业",
value:"110000"
},{
name:"房产小区",
value:"280000"
},{
name:"机构团体",
value:"120000"
},{
name:"地名地址",
value:"260000"
},{
name:"基础设施",
value:"270000"
},{
name:"其他",
value:"990000"
}]
};
for(var a=$.cache.sosoMap.category,e=0,t=a.length;t>e;e++){
var n=a[e];
d.categoryConf[n.value]=n.name;
}
}
function p(a,e){
var t=[];
d.cacheData.check=[],d.cacheData.reject=[],d.cacheData.pass=[],d.searchData={
all:[],
check:[],
reject:[],
pass:[]
};
for(var n=d.searchKey,i=d.cacheData,r=d.searchData,o=0,l=a.length;l>o;o++){
var c=a[o];
if(1*c.id!==1*e){
c.realindex=t.length;
var s=c.province+c.city+c.district+c.address;
t.push(c),1*c.audit_state===4?(i.reject.push(c),n&&-1==c.branch_name.indexOf(n)&&-1==s.indexOf(n)||(r.all.push(c),
r.reject.push(c))):1*c.audit_state===3?(i.pass.push(c),n&&-1==c.branch_name.indexOf(n)&&-1==s.indexOf(n)||(r.all.push(c),
r.pass.push(c))):1*c.audit_state===2?(i.check.push(c),n&&-1==c.branch_name.indexOf(n)&&-1==s.indexOf(n)||(r.all.push(c),
r.check.push(c))):n&&-1==c.branch_name.indexOf(n)&&-1==s.indexOf(n)||r.all.push(c);
}
}
i.all=t,d.pageConfig.totalNum=r[d.curTab].length;
}
function m(){
return d.uploadDialog&&d.uploadDialog.popup?($("#upload_icon").removeClass("error success").addClass("warn"),
$("#upload_title").text("批量导入门店地理位置"),$("#upload_text").html('请上传填写完成的模版文件(<a target="_blank" href="/mpres/htmledition/res/poi_import_tmpl.xls">下载模版</a>)，文件大小不超过200KB，文件格式为xls'),
$("#file_uploadUploader").show(),d.uploadSuc=!1,void d.uploadDialog.popup("show")):(d.uploadDialog=$(template.render("upload_tpl",{
title:"批量导入门店地理位置",
text:'请上传填写完成的模版文件(<a target="_blank" href="/mpres/htmledition/res/poi_import_tmpl.xls">下载模版</a>)，文件大小不超过200KB，文件格式为xls'
})).popup({
title:"批量导入",
buttons:[],
onClose:function(){
d.uploadDialog.popup("hide");
},
onHide:function(){
d.uploading!==!0&&d.uploadSuc===!0&&window.location.reload();
},
autoShow:!1
}),d.uploadDialog.find(".dialog_ft").addClass("dn"),d.uploadDialog.popup("show"),
void setTimeout(function(){
t.uploadPoiFile({
container:"#file_upload",
multi:!1,
type:9,
onComplete:function(a,e,t,n){
clearTimeout(window.uploadTimeoutId),d.uploading=!1;
var r=n.upload_xls_resp||{},o=r.insert_count||0,l=r.update_count||0,c=r.missed_rows||[],s=r.exceed_limit_rows||[],u=r.system_error_rows||[],p=r.readonly_rows||[],m=[];
m.push("新增了%s条门店信息".sprintf(o)),m.push("更新了%s条门店信息".sprintf(l)),p.length>0&&m.push("门店信息已经存在，但是不能修改：第%s条门店信息".sprintf(p.join("、"))),
c.length>0&&m.push("格式错误的数据：第%s行".sprintf(c.join("、"))),s.length>0&&m.push("门店数量达到上限导致导入失败：第%s行".sprintf(s.join("、"))),
u.length>0&&m.push("系统错误导致导入失败：第%s行".sprintf(u.join("、"))),m=m.join("<br />"),n.base_resp&&1*n.base_resp.ret===0?(d.uploadSuc=!0,
d.uploadDialog.find(".dialog_bd").html(template.render("upload_succ_tpl",{
title:"导入门店信息成功",
text:""
})),setTimeout(function(){
$("#upload_text").html(m);
},0)):($("#upload_icon").removeClass("warn success").addClass("error"),$("#file_uploadUploader").show(),
d.uploadSuc=!1,m||(m='请上传填写完成的模版文件(<a target="_blank" href="/mpres/htmledition/res/poi_import_tmpl.xls">下载模版</a>)，文件大小不超过200KB，文件格式为xls'),
$("#upload_title").text("批量导入失败"),$("#upload_text").html(m),i.err("批量导入失败，请重新上传文件"));
},
onSelect:function(){
clearTimeout(window.uploadTimeoutId),d.uploading=!0,window.uploadTimeoutId=setTimeout(function(){
d.uploading=!1,$("#file_uploadUploader").hide();
},1e4);
}
});
},0));
}
function f(){
var a=$("#searchInput").val().trim()||"";
d.searchKey!=a&&(d.searchKey=a,d.pageConfig.currentPage=1,h("all"),p(d.cacheData.all),
d.data=k(),D(),T(),j());
}
function h(a){
if(d.curTab!=a){
d.curTab=a;
var e=$("#tabUl");
e.find("li.selected").removeClass("selected"),e.find("li[data-item="+a+"]").addClass("selected");
}
}
function g(a,e){
x("delete",e);
}
function _(a,e){
var t;
1*e.poiStatus===3||1*e.poiStatus===4?($("#add_tr").html("").hide(),null!==d.editTr.index&&d.editTr.index!=e.dataIndex&&($("#tableList").find("tr[data-index="+d.editTr.index+"]").html(d.editTr.html),
d.editTr.html=""),t=$("#tableList").find("tr[data-index="+e.dataIndex+"]"),d.editTr.index!=e.dataIndex&&(d.editTr.index=e.dataIndex,
d.editTr.html=t.html())):(null!==d.editTr.index&&($("#tableList").find("tr[data-index="+d.editTr.index+"]").html(d.editTr.html),
d.editTr.html="",d.editTr.index=null),t=$("#add_tr")),t.html(template.render("edit_tr_tpl",{
data:e
})).show(),setTimeout(function(){
S(e.area);
var a=e.category||{};
I(a.name||"",a.value||""),b();
},0);
}
function v(a){
var e=$(a.target),t=e.data("realindex"),n=e.data("id");
l.show({
type:"warn",
msg:"确定删除该条地理位置信息？",
buttons:[{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
},{
text:"确定",
click:function(){
var a=this,e=$("#"+this.id+" .btn_primary");
e.prop("disabled")||(e.btn(!1),d.delTimeoutId=window.setTimeout(function(){
e.btn(!0);
},1e4),o.post({
url:"/misc/setlocation?action=delete",
data:{
id:n
},
mask:!1
},function(r){
return window.clearTimeout(d.delTimeoutId),e.btn(!0),r.base_resp&&1*r.base_resp.ret===0?(a.remove(),
i.suc("删除成功"),void x("delete",{
id:n,
realindex:t
})):void i.err();
}));
}
}]
});
}
function b(){
d.form=$("#myForm").validate({
rules:{
add_name:{
required:!0
},
add_address:{
required:!0
},
add_tel:{
required:!0
}
},
messages:{
add_name:{
required:"请填写"
},
add_address:{
required:"请填写"
},
add_tel:{
required:"请填写"
}
},
errorPlacement:function(a,e){
var t=e.data("err");
t=t?$("#"+t):e.parent(),a.appendTo(t);
}
});
}
function y(){
var a=!0;
d.form.form()||(a=!1);
for(var e=0,t=d.menuDomId.length;t>e;e++){
var n=$(d.menuDomId[e]+"_err");
d.area[e]&&d.area[e].data&&d.area[e].data.fullname||!(n.length>0)?n.hide():(n.show().find(":hidden").show(),
a=!1);
}
return d.category&&d.category.name?$("#list_category_err").hide():($("#list_category_err").show().find(":hidden").show(),
a=!1),a;
}
function w(a){
return function(e){
var t=$(e.target);
if(!t.prop("disabled")&&y()===!0){
d[a+"TimeoutId"]=setTimeout(function(){
t.btn(!0);
},1e4),t.btn(!1);
var n={
latitude:$("#lat").val().trim(),
longitude:$("#lng").val().trim(),
telephone:$("#add_tel").val().trim(),
branch_name:$("#add_name").val().trim(),
address:$("#add_address").val().trim(),
category:d.category.value||""
};
"update"==a&&(n.id=t.data("id"));
var r=d.area[0]&&d.area[0].data?d.area[0].data.fullname:"",l=d.area[1]&&d.area[1].data?d.area[1].data.fullname:"",c=d.area[2]&&d.area[2].data?d.area[2].data.fullname:"";
c||(c=l,l=r),n.district=c,n.city=l,n.province=r,o.post({
url:"/misc/setlocation?action="+a,
dataType:"json",
data:n,
mask:!1
},function(e){
return window.clearTimeout(d[a+"TimeoutId"]),t.btn(!0),e.base_resp?1*e.base_resp.ret===200032?void i.err("门店数量达到上限，不能增加新的门店信息"):1*e.base_resp.ret!==0?void i.err():(i.suc("update"==a?"更新门店信息成功":"insert"==a?"新门店标注成功":"执行成功"),
n.audit_state=0,"undefined"==typeof n.id&&(n.id=1*e.last_insert_id),"update"==a&&(n.realindex=t.data("realindex")),
void x(a,n)):void i.err();
});
}
};
}
function x(a,e){
"insert"===a?($("#add_tr").hide(),$("#searchInput").val(""),d.searchKey="",d.pageConfig.currentPage=1,
p([e].concat(d.cacheData.all)),h("all"),j(),T()):"update"==a?(d.editTr={
index:null,
html:""
},d.cacheData.all[e.realindex]=e,p(d.cacheData.all)):"delete"==a&&(d.editTr={
index:null,
html:""
},d.cacheData.all.splice(e.realindex,1),p(d.cacheData.all),j(),T()),d.data=k(),D();
}
function j(){
var a=d.searchData,e=a.all.length,t=a.check.length,n=a.reject.length,i=a.pass.length;
$("#allCount").text(e),$("#checkCount").text(t),$("#warn_checkCount").text(d.cacheData.check.length),
$("#passCount").text(i),$("#rejectCount").text(n);
}
function D(){
var a=d.cacheData.check.length;
$("#warn_checkCount").text(a),0==a?$("#checkInfo").addClass("dn"):$("#checkInfo").removeClass("dn"),
$("#tableList").html(template.render("list_tpl",{
data:d.data,
statusName:d.statusName,
categoryConf:d.categoryConf,
totalAllCount:d.cacheData.all.length
}));
}
function T(){
d.pagebar&&"function"==typeof d.pagebar.destroy&&(d.pagebar.destroy(),d.pagebar.container.html("")),
d.pageConfig.totalNum<=d.pageConfig.perPage||(d.pagebar=new r({
container:"#js_pageNavigator",
perPage:d.pageConfig.perPage,
initShowPage:d.pageConfig.currentPage,
totalItemsNum:d.pageConfig.totalNum,
first:!1,
last:!1,
isSimple:!0,
callback:function(a){
var e=d.pageConfig;
e.currentPage=1*a.currentPage,e.perPage=a.perPage,d.data=k(),D();
}
}));
}
function k(){
var a=d.pageConfig,e=(a.currentPage-1)*a.perPage;
return d.searchData[d.curTab].slice(e,e+a.perPage);
}
function C(e){
a.async("setting/multi_location",function(a){
$("#mapMain").show(),$("#listMain").hide(),setTimeout(function(){
a.init(e||{});
},0);
});
}
function I(a,t){
d.category&&"function"==typeof d.category.destroy&&d.category.destroy(),d.category=new e({
container:"#list_category",
label:a||"请选择",
data:$.cache.sosoMap.category,
callback:function(a,e){
e&&$("#list_category_err").hide();
}
}),setTimeout(function(){
var a=template.render("menu_err_tpl",{
key:"list_category"
});
d.category.bt.after(a);
},0),"undefined"!=typeof a&&"undefined"!=typeof t&&(d.category.name=a,d.category.value=t);
}
function P(a,t,i){
var r,o=d.menuDomId[t];
d.area[t]&&d.area[t].data&&(r=d.area[t].data.fullname),d[o]&&"function"==typeof d[o].destroy&&d[o].destroy(),
a?(d[o]=new e({
container:o,
label:r||"请选择",
data:a||[],
disabled:a?!1:!0,
callback:function(a,e,r){
e&&$(o+"_err").hide();
for(var l=t+1,c=d.menuDomId.length;c>l;l++){
var s=d.menuDomId[l];
d[s]&&"function"==typeof d[s].destroy&&(d[s].container.addClass("dn").removeClass("dropdown_menu"),
d[s].destroy()),d.area[l]=null;
}
d.area[t]={
index:r
},d.area=n.getCurDataByIndex(d.area,0,window.cityData),t!=d.menuDomId.length-1&&n.getNextData(d.area,0,window.cityData,function(a){
P(a,t+1);
}),"function"==typeof i&&i.call(a,e,r);
}
}),setTimeout(function(){
var a=template.render("menu_err_tpl",{
key:o.replace("#","")
});
d[o].bt.after(a),d[o].container.removeClass("dn").addClass("dropdown_menu");
},0),d.area[t]&&d.area[t].data&&(d[o].value=d[o].name=d.area[t].data.fullname)):d[o]=null;
}
function S(a){
if(!window.cityData.sub||0==window.cityData.sub.length)return void n.loadData(function(){
S(a);
});
var a=a||new Array(3);
d.area=a;
for(var e=window.cityData,t=0,i=d.menuDomId.length;i>t;t++)e.end!==!0&&e.sub&&e.sub.length>0?(P(e.sub,t),
e=a[t]?e.sub[a[t].index]:{}):(P(null,t),e={});
}
u(),c(),s();
}();
});