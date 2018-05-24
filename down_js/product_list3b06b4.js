define("media/product_list.js",["biz_web/ui/checkbox.js","common/wx/pagebar.js","common/wx/dialog.js","media/productCategory.js","tpl/media/product_dialog_list.html.js","tpl/media/product_dialog_loading.html.js","tpl/media/product_pagebar_tpl.html.js","common/wx/Cgi.js","biz_web/utils/upload.js","common/wx/Tips.js"],function(t){
"use strict";
function e(t){
this._o={
pageSize:10,
listContainner:null,
categoryContianer:null,
pagebarContainer:null,
listTpl:n,
listLoadingTpl:l,
PagebarTpl:r,
uploadDom:null,
uploadInfoDom:null,
uploadInfoTpl:null,
clearUploadBtnFilter:"",
selectAllDom:null,
selectedCountDom:null,
cancelSelectBtn:null,
batchDelBtn:null,
jumpAnimateDom:null,
totalCountDom:null,
initData:null,
initTotal:0,
initPageContext:"",
jumpPageSelect:!1,
disabledItem:!1,
canDelCategory:!0,
afterRenderList:function(){},
onUploadEnd:function(){},
onUploadClear:function(){},
afterInitCategory:function(){}
},this._g={
curMod:"polo",
importData:null,
hasDestroy:!1,
uploading:!1,
selectedData:[],
listCompile:null,
loadingHtml:"",
poloTotal:0,
pageContext:"",
curPageContext:"",
prePageContext:"",
queryOpt:{
page_num:1
}
},this._extend(t),this.init(),this.bindEvent();
}
t("biz_web/ui/checkbox.js");
var o=t("common/wx/pagebar.js"),a=t("common/wx/dialog.js"),i=t("media/productCategory.js"),n=t("tpl/media/product_dialog_list.html.js"),l=t("tpl/media/product_dialog_loading.html.js"),r=t("tpl/media/product_pagebar_tpl.html.js"),s=t("common/wx/Cgi.js"),c=t("biz_web/utils/upload.js"),p=t("common/wx/Tips.js"),u={
templateFileLink:wx.url("/cgi-bin/productmaterial?action=download_excel&type=2"),
importMax:200,
delSplitKey:"#$%^",
categoryLimit:i.categoryLimit,
saleStatusMap:{
0:"-",
1:"已下架",
2:"已上架"
},
sourceMap:{
1:"API",
2:"手动添加",
3:"其他",
4:"微信小店"
}
};
return e.prototype={
_extend:function(t){
if(t)for(var e in t)this._o[e]=t[e];
},
init:function(){
var t=this;
this._g.loadingHtml=template.compile(this._o.listLoadingTpl)({}),this._g.listCompile=template.compile(this._o.listTpl),
this._g.PagebarCompile=template.compile(this._o.PagebarTpl);
for(var e=1;e<=u.categoryLimit;e++)this._g.queryOpt["category_name"+e]="";
this._g.categoryObj=new i.myconstructor({
container:this._o.categoryContianer,
defaultLabel:"全部",
initCategoryName:[],
search:!0,
canadd:!1,
candel:this._o.canDelCategory,
afterInitCategory:function(){
"function"==typeof t._o.afterInitCategory&&t._o.afterInitCategory();
},
onChange:function(e){
var o=e.getData();
o.page_num=1,t.getList(o);
}
}),this._o.initData&&this._o.initPageContext?(this._g.prePageContext=this._g.curPageContext=this._g.pageContext=this._o.initPageContext,
this._g.poloTotal=this._o.initTotal,this.renderList({
code:0,
list:this._o.initData,
total:this._g.poloTotal,
page:1
})):this.refresh("cur");
},
bindEvent:function(){
var t=this,e=this._o;
e.selectAllDom&&e.selectAllDom.checkbox({
onChanged:function(e){
var o=e.prop("checked");
t._o.listContainner.find(".js_checkbox").each(function(){
var t=$(this);
o!==t.prop("checked")&&t.trigger("click");
});
}
}),e.cancelSelectBtn&&e.cancelSelectBtn.click(function(){
t.cancelAllSelect();
}),e.batchDelBtn&&e.batchDelBtn.click(function(){
t.batchDel();
}),e.listContainner.on("click",".js_del_product",function(){
var e=$(this).attr("data-pid");
t.delProduct(e);
}),e.uploadDom&&(this._g.myupload=c.uploadFile({
container:e.uploadDom,
url:"/cgi-bin/productmaterial?action=get_product_by_file&need_count=200",
multi:!1,
type:10,
onSelect:function(){
return t._g.uploadResp=null,t._g.hasDestroy||t._g.uploading?!1:void 0;
},
onProgress:function(){
t._g.uploading=!0,t._g.curMod="import",t._g.categoryObj.handle("disable"),t.showLoading(),
t._g.uploadResp=null;
},
onError:function(){
t.importComplete();
},
onAllComplete:function(){},
onComplete:function(e,o,a,i){
t._g.uploadResp=i,t.importComplete();
}
}),e.uploadInfoDom&&e.clearUploadBtnFilter&&e.uploadInfoDom.on("click",e.clearUploadBtnFilter,function(){
var o=t._g;
o.curMod="polo",o.importData=null,o.categoryObj.handle("enable"),o.categoryObj.handle("show"),
e.categoryContianer.show(),t._o.uploadInfoDom.hide(),o.selectedData=[],t.refresh(),
"function"==typeof t._o.onUploadClear&&t._o.onUploadClear();
})),e.pagebarContainer.on("click",function(e){
if("import"!=t._g.curMod){
var o=$(e.target);
if(o.hasClass("js_pagebtn")||(o=o.parents(".js_pagebtn")),o.length>0){
{
var a;
1*o.attr("data-curpage")||1;
}
o.hasClass("js_first")||(o.hasClass("js_prev")?a="pre":o.hasClass("js_next")&&(a="next")),
t.refresh(a);
}
}
});
},
delProduct:function(t){
var e=this;
a.show({
type:"info",
title:"删除确认",
msg:"确定删除商品？",
width:600,
className:"dialog-delete-confirm",
buttons:[{
text:"确定",
click:function(){
if(e._g.delingProduct!==!0){
var o=this,a=o.dom.find(".js_btn").eq(0);
a.btn(!1),e._g.delingProduct=!0,s.post({
url:"/cgi-bin/productmaterial?action=delete_product",
data:{
pids:t
},
mask:!1
},{
done:function(i){
if(a.btn(!0),e._g.delingProduct=!1,i&&i.base_resp&&0==i.base_resp.ret){
p.suc("已删除");
var n=t.split(u.delSplitKey);
e._g.poloTotal=e._g.poloTotal-n.length,e.cancelSelect(n),e.refresh("cur"),e.updateTotalCount(),
o.remove();
}else p.err("系统繁忙，请稍后再试");
},
fail:function(){
a.btn(!0),e._g.delingProduct=!1,p.err("系统繁忙，请稍后再试");
}
});
}
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
},
importComplete:function(){
var t=this,e=this._g;
t._g.uploading=!1,t._o.categoryContianer.hide();
var o=t._g.uploadResp;
if(o&&o.base_resp&&0==o.base_resp.ret&&o.upload_status){
var a="";
o.download_ticket&&(a=wx.url("/cgi-bin/productmaterial?action=download_fail_excel&type=2&download_ticket="+o.download_ticket)),
t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
suc_num:o.upload_status.succ_cnt,
err_num:o.upload_status.fail_cnt,
err_link:a
})).show(),o.upload_status.succ_cnt==u.importMax&&o.upload_status.fail_cnt>0?p.err("已选择前%s个，一篇文章最多支持%s个商品展示".sprintf(u.importMax,u.importMax)):p.suc("已选择%s个商品".sprintf(o.upload_status.succ_cnt)),
e.importData=o.product_info_list&&o.product_info_list.product_info?o.product_info_list.product_info:[];
for(var i=0;i<e.importData.length;i++)e.importData[i]=this.formatData(e.importData[i]);
e.selectedData=[].concat(e.importData),t.renderList({
code:0,
list:t.getImportData(1),
total:e.importData.length,
page:1
});
}else{
e.importData=null,e.selectedData=[];
var n="导入筛选失败",l="导入筛选失败，请稍后再试";
o&&o.base_resp&&0!=o.base_resp.ret?t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
templateFileLink:u.templateFileLink
})).show():t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
errMsg:n
})).show(),t.renderList({
code:-1,
msg:l
}),p.err(n);
}
"function"==typeof t._o.onUploadEnd&&t._o.onUploadEnd();
},
getImportData:function(t){
this.showLoading();
var e=[];
if(!this._g.importData)return e;
var o=(t-1)*this._o.pageSize,a=o+this._o.pageSize-1;
a=Math.min(this._g.importData.length,a),o=Math.max(0,o);
for(var i=o;a>=i;i++)this._g.importData[i]&&e.push(this._g.importData[i]);
return e;
},
refreshUpload:function(){
!this._g.myupload||this._g.uploading||this._g.hasDestroy||this._g.myupload.refresh();
},
showLoading:function(){
var t=this._o;
t.listContainner.html(this._g.loadingHtml),t.pagebarContainer.hide(),t.selectAllDom&&t.selectAllDom.checkbox("checked",!1);
},
checkQueryOpt:function(t){
var e=!0;
for(var o in this._g.queryOpt)if(this._g.queryOpt.hasOwnProperty(o)&&t[o]!==this._g.queryOpt[o])return!1;
return e;
},
getList:function(t){
this.showLoading();
var e=this,o=this._g,a={};
for(var i in o.queryOpt)o.queryOpt.hasOwnProperty(i)&&(o.queryOpt[i]=t[i]||"",a[i]=o.queryOpt[i]);
a.page_size=this._o.pageSize,a.page_num>1&&(a.page_context=t.pageContext),s.post({
url:"/cgi-bin/productmaterial?action=product_list",
data:a,
mask:!1
},{
done:function(o){
if(e.checkQueryOpt(t)===!0)if(o&&o.base_resp&&0==o.base_resp.ret){
1==t.page_num&&(e._g.poloTotal=o.total||0);
var i=[];
if(o.product_info_list&&o.product_info_list.product_info&&(i=o.product_info_list.product_info),
t.page_num>1&&0==i.length)return void e.refresh("pre");
e._g.prePageContext=o.page_context,e._g.curPageContext=t.pageContext,e._g.pageContext=o.page_context,
e.renderList({
code:0,
list:i,
last:0==i.length||i.length<a.page_size?!0:!1,
total:e._g.poloTotal,
page:t.page_num
});
}else{
var n="";
o&&o.base_resp&&200013==o.base_resp.ret&&(n="操作太频繁，请稍后再试"),e.renderList({
code:-1,
msg:n
});
}
},
fail:function(){
e.checkQueryOpt(t)===!0&&(e.renderList({
code:-1
}),p.err("系统繁忙，请稍后再试"));
}
});
},
renderList:function(t){
var e=this,o=this._g,a=this._o;
0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(t.msg="import"==o.curMod?"选择失败，列表中所有商品都无法选择":"暂无商品"):t.msg="系统繁忙，请稍后再试",
o.curDataList=t.list||[],a.jumpPageSelect!==!0&&e.cancelAllSelect();
var i=!0,n=this.getSelectedId();
n=","+n.join(",")+",",o.curDataList.each(function(t){
t=e.formatData(t),n.indexOf(","+t.pid+",")>=0?t.selected=!0:(t.selected=!1,i=!1);
}),i&&o.curDataList.length>0&&a.selectAllDom&&!a.selectAllDom.prop("checked")&&a.selectAllDom.checkbox("checked",!0),
this._o.listContainner.html(o.listCompile({
list:o.curDataList,
msg:t.msg
})),this.renderSelectCount(),this.renderTotalCount(t.total),o.curDataList.length>0&&this._o.listContainner.find(".js_checkbox").checkbox({
onChanged:function(t){
var o=t.val(),a=t.attr("data-index");
t.prop("checked")?e.addSelect(o,a):e.cancelSelect(o);
}
}),0==t.code&&"undefined"!=typeof t.page?this.initPageBar({
curPage:t.page,
total:t.total,
last:t.last
}):this._o.pagebarContainer.hide(),"function"==typeof this._o.afterRenderList&&this._o.afterRenderList(),
this._o.jumpAnimateDom&&setTimeout(function(){
$("body").animate({
scrollTop:e._o.jumpAnimateDom.offset().top
});
},100);
},
formatData:function(t){
t.category_name_str=[];
for(var e=1;e<=u.categoryLimit&&t["category_name"+e];e++)t.category_name_str.push(t["category_name"+e]);
return t.titleEncode=t.title.html(!0),t.category_name_str=t.category_name_str.join(";").html(!0),
t.saleStatusStr=u.saleStatusMap[t.sale_status]||"-",t.disabled=this._o.disabledItem===!0&&1==t.sale_status?!0:!1,
t.sourceStr=u.sourceMap[t.source]||"-",t.pidEncode=encodeURIComponent(t.pid),t.str_price=t.min_price,
t.str_original_price=t.min_ori_price,t;
},
getSelectedId:function(){
for(var t=this._g,e=[],o=0,a=t.selectedData.length;a>o;o++)e.push(t.selectedData[o].pid);
return e;
},
addSelect:function(t,e){
var o=this._g,a=this._o;
if(o.curDataList[e]&&o.curDataList[e].pid==t&&o.selectedData.push(o.curDataList[e]),
a.selectAllDom){
var i=0;
this._o.listContainner.find(".js_checkbox").each(function(){
$(this).prop("checked")&&i++;
}),i>0&&i==o.curDataList.length&&a.selectAllDom.checkbox("checked",!0);
}
this.renderSelectCount();
},
cancelSelect:function(t){
if(t){
var e=this._g,o=this._o;
if("[object Array]"===Object.prototype.toString.call(t))for(var a=","+t.join(",")+",",i=0;i<e.selectedData.length;i++)a.indexOf(","+e.selectedData[i].pid+",")>=0&&(e.selectedData.splice(i,1),
i--);else for(var i=0,n=e.selectedData.length;n>i;i++)if(e.selectedData[i].pid==t){
e.selectedData.splice(i,1);
break;
}
o.selectAllDom&&o.selectAllDom.checkbox("checked",!1),this.renderSelectCount();
}
},
batchDel:function(){
var t=this.getSelectedCount();
if(0==t)return void p.err("请选择需要删除的商品");
var e=this.getSelectedId();
e=e.join(u.delSplitKey),this.delProduct(e);
},
updateTotalCount:function(){
if(this._o.totalCountDom&&this._o.totalCountDom.length>0){
var t=this;
this.getTotalCount({
callback:function(e){
"undefined"!=typeof e&&t.renderTotalCount(e);
}
});
}
},
renderTotalCount:function(t){
this._o.totalCountDom&&this._o.totalCountDom.length>0&&this._o.totalCountDom.text(t||0);
},
getTotalCount:function(t){
var e=this._g.categoryObj.getData();
e.page_num=1,e.page_size=this._o.pageSize,s.post({
url:"/cgi-bin/productmaterial?action=product_list",
data:e,
mask:!1
},{
done:function(e){
e&&e.base_resp&&0==e.base_resp.ret&&t.callback(e.total);
},
fail:function(){}
});
},
cancelAllSelect:function(){
var t=this._g,e=this._o;
t.selectedData=[],this._o.listContainner.find(".js_checkbox").checkbox("checked",!1),
e.selectAllDom&&e.selectAllDom.checkbox("checked",!1),this.renderSelectCount();
},
renderSelectCount:function(){
var t=this._o,e=this.getSelectedCount();
e>0?(t.cancelSelectBtn&&t.cancelSelectBtn.removeClass("btn_disabled"),t.batchDelBtn&&t.batchDelBtn.removeClass("btn_disabled")):(t.cancelSelectBtn&&t.cancelSelectBtn.addClass("btn_disabled"),
t.batchDelBtn&&t.batchDelBtn.addClass("btn_disabled")),t.selectedCountDom&&t.selectedCountDom.text(e);
},
initPageBar:function(t){
var e=this;
if("import"==e._g.curMod)new o({
container:this._o.pagebarContainer,
perPage:this._o.pageSize,
initShowPage:t.curPage,
totalItemsNum:t.total,
last:!1,
isNavHide:!0,
callback:function(t){
e.renderList({
code:0,
list:e.getImportData(1*t.currentPage),
total:e._g.importData.length,
page:1*t.currentPage
});
}
});else{
var a=Math.ceil(this._g.poloTotal/this._o.pageSize);
if(1>=a)return void this._o.pagebarContainer.hide();
var i=!1;
(t.last===!0||t.curPage>=a)&&(i=!0),this._o.pagebarContainer.html(this._g.PagebarCompile({
page_num:t.curPage,
totalPage:a,
last:i
})).show();
}
},
getSelectedCount:function(){
return this._g.selectedData.length;
},
getSelectedData:function(){
return this._g.selectedData;
},
refresh:function(t){
var e,o,a=this._g.categoryObj.getData();
"pre"==t?(e=Math.max(1,this._g.queryOpt.page_num-1),o=this._g.prePageContext):"next"==t?(e=this._g.queryOpt.page_num+1,
o=this._g.pageContext):"cur"==t?(e=this._g.queryOpt.page_num,o=this._g.curPageContext):e=1,
e>1&&o?(a.pageContext=o,a.page_num=e):a.page_num=1,this.getList(a);
},
refreshAllData:function(){
this._g.categoryObj.select(1,"");
},
destroy:function(){
this._g.hasDestroy=!0,this._g.myupload&&"function"==typeof this._g.myupload.destroy&&this._g.myupload.destroy(),
this._g.categoryObj&&this._g.categoryObj.handle("destroy");
}
},e;
});