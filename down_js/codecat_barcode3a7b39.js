define("scan/mvp/codecat_barcode.js",["common/wx/Cgi.js","common/wx/popup.js","common/wx/Tips.js","common/wx/tooltips.js","biz_common/jquery.validate.js","tpl/scan/barcode_batch.html.js"],function(e,t,r){
"use strict";
var o=template.render,i=e("common/wx/Cgi.js"),n=(e("common/wx/popup.js"),e("common/wx/Tips.js")),s=e("common/wx/tooltips.js"),a=(e("biz_common/jquery.validate.js"),
e("tpl/scan/barcode_batch.html.js")),d={};
d.presenter=function(e){
this.model=e,this.view=null,this.separator=";",this.model.set("barcode_list",[]),
this.model.set("added_barcode",{}),this.model.set("barcodes",[]);
},d.presenter.prototype.init=function(){
var e=this;
e.view.init(),e.model.listenEvent("remove_firm",function(t){
for(var r=t.firm,o=!1,i=e.model.get("barcode_list"),n=e.model.get("added_barcode"),s=0;s<i.length;s++)i[s].firm==r&&(n[i[s].barcode]=!1,
i.splice(s,1),s--,o=!0);
1==o&&(e.model.set("barcode_list",i),e.model.set("added_barcode",n),e.model.set("barcodes",e.getBarcodes()),
e.view.renderBarcodes());
});
},d.presenter.prototype.remove=function(){
this.model.unlistenEvent("remove_firm"),this.model.set("barcode_list",[]),this.model.set("added_barcode",{}),
this.model.set("barcodes",[]);
},d.presenter.prototype.setView=function(e){
this.view=e,this.view.setPresenter(this);
},d.presenter.prototype.isValid=function(){
var e=this.getBarcodes(),t=e.length>0?!0:!1;
return this.view.setInputError(t?"":"请输入你品牌的条码，并点击“识别”按钮"),t;
},d.presenter.prototype.getContainerName=function(){
return this.model.get("codecat_container");
},d.presenter.prototype.getBarcodeList=function(){
return this.model.get("barcode_list");
},d.presenter.prototype.getBarcodes=function(){
for(var e=[],t=this.getBarcodeList(),r=0;r<t.length;r++)14153!=t[r].ret&&e.push({
barcode:t[r].barcode,
firm:t[r].firm,
file_id:"",
ret:t[r].ret
});
return e;
},d.presenter.prototype.getBarcodeListFromString=function(e){
e=e.replace(/；/g,";"),this.separator=e.indexOf(";")>-1?";":"\n";
for(var t=e.split(this.separator),r=[],o=0;o<t.length;o++)t[o]=$.trim(t[o]),""!==t[o]&&r.push(t[o]);
return r;
},d.presenter.prototype.removeBarcode=function(e){
for(var t=this.model.get("barcode_list"),r=this.model.get("added_barcode"),o=0;o<t.length;o++)if(t[o].barcode==e){
r[e]=!1,t.splice(o,1),this.model.set("barcode_list",t),this.model.set("added_barcode",r),
this.model.set("barcodes",this.getBarcodes()),this.view.renderBarcodes();
break;
}
},d.presenter.prototype.removeAllBarcodes=function(){
for(var e=this.model.get("barcode_list"),t=this.model.get("added_barcode"),r=0;r<e.length;r++)t[e[r].barcode]=!1;
e=[],this.model.set("barcode_list",e),this.model.set("added_barcode",t),this.model.set("barcodes",this.getBarcodes()),
this.view.renderBarcodes();
},d.presenter.prototype.appendList=function(e){
for(var t=this.model.get("added_barcode"),r=this.model.get("barcode_list"),o=0;o<e.length;o++)t[e[o].barcode]||(t[e[o].barcode]=!0,
14153==e[o].ret?r.push(e[o]):r.unshift(e[o]));
this.model.set("barcode_list",r),this.model.set("added_barcode",t),this.model.set("barcodes",this.getBarcodes());
},d.presenter.prototype.searchBarcodes=function(e){
var t=this;
if(0==t.view.isFormValid())return!1;
var r=t.getBarcodeListFromString(e),o={
barcodelist:JSON.stringify2({
list:r
})
};
t.view.setSearchBtnEnable(!1),i.post({
url:"/merchant/scanapply?action=batchgetfirminfo",
data:o,
mask:!1
},function(e){
if(t.view.setSearchBtnEnable(!0),0==e.base_resp.ret){
var o=0;
if(e.firm_info&&e.firm_info.length>0){
t.appendList(e.firm_info),t.view.renderBarcodes();
for(var i={},n=0;n<e.firm_info.length;n++)i[e.firm_info[n].firm]||(i[e.firm_info[n].firm]=!0,
o++);
}
if(e.invalid_num>0&&t.view.setInputWarning(!0),e.invalid_num>0&&e.invalid_list){
var s=wx.url("/cgi-bin/readtemplate?t=scan/code_error_tmpl");
t.view.setInputValue(e.invalid_list.join(t.separator)),t.view.setInputError("以上无法识别，请核实后重试。%s可能错误原因%s".sprintf('<a href="%s" target="_blank">'.sprintf(s),"</a>"));
}else t.view.setInputValue(""),setTimeout(function(){
t.view.setInputValue(""),t.view.setInputError("");
},100);
t.view.showSearchResult({
succ_num:e.succ_num,
invalid_num:e.invalid_num,
firm_num:o,
barcode_num:r.length
});
}else 14154==e.base_resp.ret?t.view.showTopTips("err","条码数量过多，请删减"):t.view.showTopTips("err","系统错误，请重试");
});
},d.view=function(){
this.presenter=null;
},d.view.prototype.setPresenter=function(e){
this.presenter=e;
},d.view.prototype.init=function(){
var e=this,t=e.presenter.getContainerName();
e.$dom=$(t).append(a),e.$form=$("#js_form_barcode_search"),e.$btnSearch=$("#js_btn_barcode_search"),
e.$btnRemoveAllBarcode=$(".js_btn_remove_all_barcode"),e.$inputBarcodes=$("#js_input_barcodes"),
e.$divResult=$("#js_div_barcode_result"),e.$divList=$("#js_div_barcode_list"),e.$divCount=$("#js_div_barcode_count"),
e.$errInput=$("#js_div_barcode_msg"),e.$btnRemoveAllBarcode.hide();
var r=e.$dom.find(".js_links");
r.length>0&&r.attr("href",r.attr("href").replace("{token}",wx.data.t).replace("{lang}",wx.data.lang)),
e.bindEvent(),e.initForm();
},d.view.prototype.bindEvent=function(){
var e=this;
new s({
container:"#js_barcode_tooltips",
content:o("tpl_barcode_tooltips"),
reposition:!0,
type:"hover",
position:{
left:-138,
top:-2
},
parentClass:"pay_tips_popover"
}),e.$divList.on("click",".js_btn_remove_barcode",function(){
var t=$(this).data("barcode"),r=new s({
container:$(this),
content:"删除后，你将无法进一步获得以%s开头的条码的编辑操作权限，是否确认删除？".sprintf(t),
type:"click",
position:{
top:0,
left:-130
},
onclose:function(){},
buttons:[{
text:"删除",
type:"btn_primary",
click:function(){
e.presenter.removeBarcode(t),this.hide();
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
r.show();
}),e.$divResult.on("click",".js_btn_remove_all_barcode",function(){
var t=new s({
container:$(this),
content:"删除后，你将无法进一步获得这些条码编辑操作权限，是否确认删除？",
type:"click",
position:{
top:0,
left:-120
},
onclose:function(){},
buttons:[{
text:"全部删除",
type:"btn_primary",
click:function(){
e.presenter.removeAllBarcodes(),this.hide();
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}]
});
t.show();
}),e.$inputBarcodes.on("keyup",function(){
e.setInputWarning(!1);
});
},d.view.prototype.initForm=function(){
var e=this;
e.$form.on("submit",function(){
return e.presenter.searchBarcodes(e.$inputBarcodes.val()),!1;
}),$.validator.addMethod("is_barcode_splitable",function(e){
return(e.indexOf(";")>-1||e.indexOf("；")>-1)&&e.indexOf("\n")>-1?!1:!0;
}),e.$form.validate({
ignore:".js_input_ignore",
rules:{
barcodelist:{
required:!0,
is_barcode_splitable:!0
}
},
messages:{
barcodelist:{
required:"请输入条码",
is_barcode_splitable:"格式有误，请以“；”或回车分隔条码，不能混用"
}
},
errorPlacement:function(t){
e.$errInput.html(t.removeClass()).show();
}
});
},d.view.prototype.isFormValid=function(){
return this.$form.valid();
},d.view.prototype.renderBarcodes=function(){
for(var e=this,t=e.presenter.getBarcodes(),r={},i=0,n=0;n<t.length;n++){
var a=t[n].firm;
r[a]||(r[a]={
name:a,
barcode:[]
},i++),r[a].barcode.push({
barcode:t[n].barcode,
ret:t[n].ret
});
}
e.$divResult.show(),e.$divCount.html(i),0==i?e.$btnRemoveAllBarcode.hide():e.$btnRemoveAllBarcode.show(),
this.$divList.html(o("tpl_barcode_list",{
firm_list:r
})),this.$divList.find(".js_item").each(function(){
new s({
container:$(this).find(".js_claimed_tooltips"),
content:o("tpl_barcode_claimed_tooltips"),
reposition:!0,
type:"hover",
position:{
left:-138,
top:-2
},
parentClass:"pay_tips_popover"
});
});
},d.view.prototype.setSearchBtnEnable=function(e){
this.$btnSearch.btn(e);
},d.view.prototype.setInputWarning=function(e){
e?this.$inputBarcodes.addClass("warning"):this.$inputBarcodes.removeClass("warning");
},d.view.prototype.setInputValue=function(e){
this.$inputBarcodes.val(e),""==e&&this.$inputBarcodes.blur();
},d.view.prototype.setInputError=function(e){
e?this.$errInput.html(e).show():this.$errInput.html("").hide();
},d.view.prototype.showTopTips=function(e,t){
"suc"==e?n.suc(t):n.err(t);
},d.view.prototype.showSearchResult=function(e){
$("#tpl_barcode_result").popup({
title:"条码号段识别结果",
data:{
succ_num:e.succ_num,
invalid_num:e.invalid_num,
firm_num:e.firm_num,
barcode_num:e.barcode_num
},
buttons:[{
text:"确定",
click:function(){
this.remove();
},
type:"primary"
}],
mask:!0,
onHide:function(){
this.remove();
}
});
},r.exports=d;
});