define("cardticket/select_consumer.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/pagebar.js","tpl/cardticket/select_declarerer.html.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function a(t){
this.opt=$.extend(!0,{},n,t),this.$dom=$(this.opt.container),this.init();
}
function e(t,a){
for(var e=0;e<t.length;e++)if(t[e]==a)return t.splice(e,1),!0;
return!1;
}
function i(t,a){
for(var e=!1,i=0;i<t.length;i++)t[i]==a&&(e=!0);
e||t.push(a);
}
var n={
multi:!1,
container:null,
data:null,
initComplete:$.noop,
pageCapacity:5,
pageChange:$.noop
};
t("biz_web/ui/checkbox.js");
var s=t("common/wx/Cgi.js"),r=(t("biz_web/ui/checkbox.js"),t("common/wx/pagebar.js")),c=t("tpl/cardticket/select_declarerer.html.js");
return t("cardticket/common_template_helper.js"),template.helper("$getchecked",function(t,a){
if(t.is_all){
for(var e=0;e<t.antilist.length;e++)if(t.antilist[e]==a)return"";
return"checked";
}
for(var e=0;e<t.list.length;e++)if(t.list[e]==a)return"checked";
return"";
}),a.prototype={
_currentPage:1,
params:{
is_all:!1,
list:[],
antilist:[]
},
init:function(){
var t=this,a=t.opt;
t.params=$.extend(!0,{},t.params),a.data?t.getDataComplete():t.sendRequest();
},
reinit:function(){
var t=this.opt;
t.data=null,this._currentPage=1,this.init();
},
sendRequest:function(){
var t=this,a=t.opt;
a.loading=!0,this.$dom.html(template.compile(c)(a)),s.get({
url:"/merchant/carduse?action=listchecker&begin="+a.pageCapacity*(this._currentPage-1)+"&count="+a.pageCapacity
},function(e){
if(0==e.base_resp.ret){
var i=e.data;
i=i.replace(/[\u0000-\u001F]/g,""),i||(i="{card_checker:[]}"),a.data=$.parseJSON(i);
var n=a.data.total_num;
a.data=a.data.card_checker,t.total_count=n,t.getDataComplete();
}else Tips.err("获取核销员失败");
});
},
getDataComplete:function(){
var t=this,a=t.opt;
if(this.$dom.html(template.compile(c)({
multi:a.multi,
data:a.data,
total_count:a.data.length,
params:this.params
})),this.$list=this.$dom.find(".js_consumer_body tr"),t.total_count>a.pageCapacity){
new r({
container:this.$dom.find(".js_pagebar"),
perPage:a.pageCapacity,
initShowPage:this._currentPage,
totalItemsNum:t.total_count,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=e.currentPage;
t._currentPage=i,t.sendRequest(),a.pageChange.call(t);
}
});
}else this.$dom.find(".js_pagebar").html("");
this.$inputs=this.$dom.find("tbody input[type=checkbox]"),this.inputs=this.$inputs.checkbox({
onChanged:function(a){
var n=($(a).is("input[type=checkbox]"),$(a).prop("checked")),s=$(a).val();
t.params.is_all?n?e(t.params.antilist,s):i(t.params.antilist,s):n?i(t.params.list,s):e(t.params.list,s);
}
}),this.select_all=this.$dom.find(".js_select_all").checkbox({
onChanged:function(a){
{
var e=$(a).prop("checked");
t._currentPage;
}
t.inputs.checked(e),e?(t.params.is_all=1,t.params.antilist=[],t.params.list=[]):(t.params.is_all=0,
t.params.antilist=[],t.params.list=[]);
}
}),this.cache_data={};
for(var n=0;n<a.data.length;n++){
var s=a.data[n];
this.cache_data[s.openid]=s;
}
"function"==typeof a.initComplete&&a.initComplete.call(this);
},
values:function(){
var t=this,a=(t.opt,t.params);
return a.is_all&&t.total_count==a.antilist.length||!a.is_all&&!a.list.length?!1:t.params;
}
},a;
});