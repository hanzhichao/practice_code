define("cardticket/multi_pic_upload.js",["tpl/cardticket/multi_pic_upload.html.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/media/imageDialog.js","biz_web/utils/upload.js","page/cardticket/widget_add_img.css"],function(t){
"use strict";
var e=template.compile(t("tpl/cardticket/multi_pic_upload.html.js")),i=t("common/wx/pagebar.js"),a=t("common/wx/Tips.js"),n=t("common/wx/media/imageDialog.js"),r=(t("biz_web/utils/upload.js"),
{
container:"",
page:{
pageCount:9,
currentPage:1
},
pagedata:[],
maxSelect:100,
onChanged:$.noop,
type:"edit",
data:[]
}),c=function(t){
this.opt=$.extend(!0,{},r,t),this.init();
};
t("page/cardticket/widget_add_img.css");
template.compile('		<div class="edit_pic_wrp js_edit_pic_wrp">            <img src="{pic_url}" alt="">            <div class="edit_pic_mask">                <a href="javascript:;" class="icon18_common del_gray js_delete"></a>            </div>        </div>');
return c.prototype={
init:function(){
var t=this.opt;
this.$container=$(t.container),"preview"==t.type&&t.page.pageCount++,this._init();
},
_init:function(){
var t=this.opt,i=t.page,a=t.data,n=i.pageCount*(i.currentPage-1),r=i.pageCount*i.currentPage;
t.pagedata=[];
for(var c=n;r>c&&c<a.length;c++)a[c]&&t.pagedata.push((a[c]+"").http2https());
this.$container.html(e(t)),this.initEvent(),this.initPager();
},
initEvent:function(){
var t=this,e=t.opt,i=e.data;
$(".js_upload").click(function(){
return n({
maxSelect:e.maxSelect-e.data.length,
desc:"建议尺寸：640像素 * 340像素",
onOK:function(i){
var n=t.getValues();
if(i.length+n.length>e.maxSelect)return a.err("最多选择100张图片"),!1;
if(i.length){
for(var r=i.length-1;r>=0;r--)e.data.unshift(i[r].url);
setTimeout(function(){
t._init();
},10),e.onChanged.call(t),this.destroy();
}
},
onCancel:function(){
this.destroy();
}
}),!1;
}),this.$container.find(".js_delete").click(function(){
var a=$(this).closest(".js_edit_pic_wrp"),n=$(".js_edit_pic_wrp",t.$container),r=n.index(a);
return i.splice(r,1),i.length==e.page.pageCount*(e.page.currentPage-1)&&e.page.currentPage>1&&e.page.currentPage--,
a.remove(),t._init(),e.onChanged.call(t),!1;
}),this.$container.on("mouseover",".js_edit_pic_wrp",function(){
$(this).find(".js_edit_area").show();
}).on("mouseout",".js_edit_pic_wrp",function(){
$(this).find(".js_edit_area").hide();
});
},
initPager:function(){
var t=this,e=this.opt,a=e.page,n=$(".js_pager",this.$container);
e.data.length>a.pageCount?(this.pagebar=null,this.pagebar=new i({
container:n,
perPage:a.pageCount,
initShowPage:a.currentPage,
totalItemsNum:e.data.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=e.currentPage;
a.currentPage=i,t._init();
}
})):n.html("");
},
getValues:function(){
for(var t=this.opt.data,e=[],i=0;i<t.length;i++)t[i]&&e.push((t[i]+"").https2http());
return e;
},
toObject:function(t){
for(var e={},i=this.getValues(),a=0;a<i.length;a++)e["pic_url"+a]=i[a],t&&(t["pic_url"+a]=i[a]);
return e;
}
},c;
});