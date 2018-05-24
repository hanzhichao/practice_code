define("common/wx/media/productDialog.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/media/product_select_dialog.html.js","common/wx/media/productTemplateDialog.js","media/product_list.js","tpl/media/product_dialog_upload.html.js","tpl/media/product_import_select_result.html.js","common/wx/tooltips.js","tpl/media/product_smart_tips.html.js"],function(t){
"use strict";
function i(t){
this._o={
can_use_smart:!1,
maxLen:100,
editor:null,
callback:function(){}
},this._g={
dom:{}
},this._extend(t);
var i=this;
p.templateData?this.initDialog():n.getTemplate({
callback:function(t){
p.templateData=t,i.initDialog();
}
});
}
t("common/wx/popup.js");
var e=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),a=t("tpl/media/product_select_dialog.html.js"),n=t("common/wx/media/productTemplateDialog.js"),s=t("media/product_list.js"),l=t("tpl/media/product_dialog_upload.html.js"),r=t("tpl/media/product_import_select_result.html.js"),d=t("common/wx/tooltips.js"),c=t("tpl/media/product_smart_tips.html.js"),p={
templateFileLink:wx.url("/cgi-bin/productmaterial?action=download_excel&type=2"),
templateData:null,
maxImportLen:1e3
};
return i.prototype={
_extend:function(t){
for(var i in t)this._o[i]=t[i];
},
initDialog:function(){
var t=this,i=this._o,e=this._g,o=e.dom;
i.editor&&i.editor.fireEvent("handleWinScroll",!1),o.$dialog=$(wx.T(a,{
can_use_smart:this._o.can_use_smart,
manageLink:wx.url("/cgi-bin/productmaterial?action=product_list")
})).popup({
width:925,
title:"选择商品",
autoShow:!0,
className:"dialog-select-product",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_save_btn",
click:function(){
t.getResourceId({
dialog:this,
$btn:t._g.dom.$saveBtn,
callback:function(i){
o.$saveBtn.btn(!1),t._o.callback(i);
}
});
}
},{
text:"取消",
type:"default",
classWrap:"js_cancel_btn",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),o.$saveBtn=o.$dialog.find(".js_save_btn"),o.$cancelBtn=o.$dialog.find(".js_cancel_btn"),
o.$selectAllBtn=o.$dialog.find(".js_select_all"),o.$importBtn=o.$dialog.find(".js_import"),
o.$smartBtn=o.$dialog.find(".js_smart_select"),o.$smartInput=o.$dialog.find(".js_smart_count"),
o.$smartDesc=o.$dialog.find(".js_smart_desc"),o.$smartTotal=o.$dialog.find(".js_smart_total"),
o.$imporSelectFailMain=o.$dialog.find(".js_impor_select_fail_main"),o.$imporSelectFailLink=o.$dialog.find(".js_link"),
o.$pagebar=o.$dialog.find(".js_pagebar"),o.$listBody=o.$dialog.find(".js_list_body"),
o.$categoryMain=o.$dialog.find(".js_category_main"),o.$selectedCount=o.$dialog.find(".js_selected_count"),
o.$cancelSelectBtn=o.$dialog.find(".js_cancel_select"),this.beforeInitList(),this.initList(),
this.afterInitList();
},
initList:function(){
var t=this,i=this._g,e=i.dom;
i.productListObj=new s({
uploadDom:this._g.canUploadTips.$dom.find(".js_upload"),
uploadInfoDom:e.$dialog.find(".js_des_container"),
uploadInfoTpl:r,
clearUploadBtnFilter:".js_clear_import",
pageSize:5,
listContainner:e.$listBody,
categoryContianer:e.$categoryMain,
pagebarContainer:e.$pagebar,
selectAllDom:e.$selectAllBtn,
selectedCountDom:e.$selectedCount,
cancelSelectBtn:e.$cancelSelectBtn,
jumpPageSelect:!0,
disabledItem:!0,
canDelCategory:!1,
afterRenderList:function(){
e&&e.$dialog&&e.$dialog.popup("resetPosition");
},
onUploadEnd:function(){
t._g.dom.$importBtn.hide(),t._g.canUploadTips.hide();
},
onUploadClear:function(){
t._g.dom.$importBtn.show();
},
afterInitCategory:function(){
t._g.dom.$categoryMain.show();
}
});
},
beforeInitList:function(){
var t=this;
this._g.canUploadTips=new d({
container:this._g.dom.$importBtn,
position:{
left:-119
},
reposition:!0,
content:template.compile(l)({
templateFileLink:p.templateFileLink
}),
onshow:function(){
this.show(),t._g.productListObj.refreshUpload();
}
});
},
afterInitList:function(){
var t=this,i=this._g.dom;
i.$smartBtn.checkbox({
onChanged:function(i){
i.prop("checked")?t._g.dom.$smartDesc.show():t._g.dom.$smartDesc.hide();
}
}),this._g.smartTips=new d({
container:i.$dialog.find(".js_smart_tips"),
position:{
left:-137
},
reposition:!0,
content:template.compile(c)({})
});
},
getData:function(){
var t=this._g,i=t.dom,o=t.productListObj.getSelectedData();
if(!o||0==o.length)return e.err("请选择商品"),!1;
var a=o.length,n=1,s=0;
if(i.$smartBtn.prop("checked")){
var l=o.length;
if(s=parseInt(i.$smartInput.val())||0,0>=s)return e.err("个性化推荐的数量必须大于0"),!1;
if(l>200)return e.err("个性化推荐时，单次选择商品总数不能超过200"),!1;
if(1==l)return e.err("个性化推荐时，商品总数必须大于1"),!1;
if(s>l)return e.err("个性化推荐展示商品数不能大于选择的商品总数"),!1;
if(s>this._o.maxLen)return e.err("最多还能在文章中展示%s个推荐商品".sprintf(this._o.maxLen)),!1;
n=2;
}else if(a>this._o.maxLen)return e.err("最多还能选择%s个商品插入文章".sprintf(this._o.maxLen)),
!1;
var r={
type:n,
templateId:p.templateData.default_template_id,
productData:o,
productId:t.productListObj.getSelectedId(),
packId:"",
smartNum:""
};
return 2==n&&(r.smartNum=s),r;
},
getResourceId:function(t){
var i=this;
if(this._g.gettingResource!==!0){
var a=this.getData();
if(a){
if(1==a.type)return t.callback(a),void i.destory(t.dialog);
i._g.gettingResource=!0,t.$btn.btn(!1),o.post({
url:"/cgi-bin/productmaterial?action=add_product_resource",
data:{
template_id:a.templateId,
product_list:a.productId.join(n.pidSplitKey),
typenum:a.smartNum
},
mask:!1
},{
done:function(o){
t.$btn.btn(!0),i._g.gettingResource=!1,o&&o.base_resp&&0==o.base_resp.ret&&o.pack_info&&o.pack_info.pack_id?(a.packId=o.pack_info.pack_id,
t.callback(a),i.destory(t.dialog)):e.err("系统繁忙，请稍后再试");
},
fail:function(){
t.$btn.btn(!0),i._g.gettingResource=!1,e.err("系统繁忙，获取资源ID失败，请稍后再试");
}
});
}
}
},
destory:function(t){
t&&t.remove(),this._g.dom=null,this._g.smartTips&&(this._g.smartTips.destroy(),this._g.smartTips=null),
this._g.canUploadTips&&(this._g.canUploadTips.destroy(),this._g.canUploadTips=null),
this._g.productListObj&&(this._g.productListObj.destroy(),this._g.productListObj=null),
this._o.editor&&this._o.editor.fireEvent("handleWinScroll",!0);
}
},i;
});