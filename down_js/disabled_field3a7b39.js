define("cardticket/add/disabled_field.js",[],function(){
"use strict";
function t(t){
function e(t){
for(var e=0;e<a.length;e++)if(a[e]==t)return e;
return-1;
}
var i=t.data._is_global_editting;
if(i&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status){
var d=$("#js_editform_step1,#js_editform_step2");
d.find("input,textarea").each(function(){
var t=$(this).attr("name");
e(t)>=0&&$(this).prop("readonly",!0).addClass("noedit_field").parent().addClass("disabled");
});
}
if(i){
var d=$("#js_editform_step2");
d.find("input[name=quantity]").prop("readonly",!0).addClass("noedit_field").parent().addClass("disabled");
}
}
var a=["reduce_cost","title","gift_unit","gift_num","least_cost","discount","detail","gift","quantity","use_condition_least_cost","object_use_for","accept_category","reject_category"];
return t;
});