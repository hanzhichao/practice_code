define("common/wx/editit.js",["tpl/editit.html.js"],function(t,e,i){
"use strict";
function n(t){
var e=this,t=$.extend({},a,t),i="click";
e.$element=$(t.container),e.$element.parent().append('<a title="{title}" class="editit_edit {btnclass}" href="javascript:;">{btnTxt}</a>&nbsp;<a id="js_gdel" title="{deleteTitle}" data-x="-120" data-y="5" class="editit_del {deleteBtnclass}" href="javascript:;">{deleteBtnTxt}</a>'.format({
title:t.editBtnTitle,
btnclass:t.editBtnClass,
btnTxt:t.editBtnTxt,
deleteTitle:t.deleteBtnTitle,
deleteBtnclass:t.deleteBtnClass,
deleteBtnTxt:t.deleteBtnTxt
})),e.$container=e.$element.parent().parent(),e.$container.append(template.compile(l)({
txt:e.$element.text().trim(),
itemid:t.itemid,
helpTxt:t.helpTxt,
opBtnClass:t.opBtnClass,
enableLimitip:t.enableLimitip,
enableNonetip:t.enableNonetip
})),e.$container.on(i,".editit_edit",function(){
t.normalClass&&e.$container.removeClass(t.normalClass),t.editClass&&e.$container.addClass(t.editClass),
e.$container.find(".editit_form").show().siblings("div").hide();
}),e.$container.on(i,".editit_cancel",function(){
t.normalClass&&e.$container.addClass(t.normalClass),t.editClass&&e.$container.removeClass(t.editClass),
e.$container.find(".editit_form").hide().siblings("div").show();
}),e.$container.on(i,".editit_sure",function(){
var e=$(this),i=e.parent().parent().data("id"),n=e.parent().parent().find("input").val().trim();
""!=n?!t.limit||t.limit>=n.length?t.callback&&"function"==typeof t.callback&&t.callback(i,n):t.enabletip&&e.siblings(".js_tips").html("分组名称不能超过%s个字".sprintf(t.limit)).show():enablefail&&e.siblings(".fail").html("必选字段").show();
});
}
var l=t("tpl/editit.html.js"),a={
container:"",
callback:null,
enabletip:!0,
enablefail:!0,
itemid:"",
limit:0,
normalClass:"",
editClass:"",
editBtnClass:"",
editBtnTxt:"编辑",
editBtnTitle:"编辑",
deleteClass:"",
deleteBtnClass:"",
deleteBtnTxt:"删除",
deleteBtnTitle:"删除",
opBtnClass:"",
helpTxt:""
};
i.exports=n;
});