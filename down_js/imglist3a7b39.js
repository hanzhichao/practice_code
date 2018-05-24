define("shop/imglist.js",["biz_web/ui/checkbox.js","common/wx/pagebar.js","biz_web/utils/upload.js","common/wx/tooltipsManager.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Tips.js","shop/feedback.js","common/wx/top.js","common/wx/tooltip.js"],function(t){
"use strict";
var e=(wx.T,template.render),o=(t("biz_web/ui/checkbox.js"),t("common/wx/pagebar.js")),s=t("biz_web/utils/upload.js"),i=t("common/wx/tooltipsManager.js"),a=(t("common/wx/popup.js"),
t("common/wx/Cgi.js")),n=t("common/wx/Tips.js"),c=(t("biz_web/ui/checkbox.js"),t("shop/feedback.js")),r=t("common/wx/top.js"),l=t("common/wx/tooltip.js"),p=wx.cgiData,f={
list:[],
offset:0,
count:0,
total:0
},m=$.extend({},f,p);
!function(){
new r("#topTab",r.DATA.shop).selected(6),c();
for(var t=0,p=m.list.length;p>t;t++)m.list[t].count=m.list[t].product.length;
m.list.length>0?($(".shop_img_list").html(e("tpl_img",{
data:m.list
})).show(),new l({
dom:$(".shop_img_list").find(".js_tooltip"),
position:{
x:0,
y:10
}
})):$(".empty_tips").show();
var f=$(".shop_img_list .frm_checkbox").checkbox({
multi:!0
});
$("#selectAll").click(function(){
var t=$(this).prop("checked");
$(".shop_img_list .frm_checkbox").each(function(){
$(this).prop("disabled")||$(this).checkbox().checked(t);
});
}).checkbox(),$("#js_delall").on("click",function(){
for(var t=f.values(),e=t.length,o=[],s=0;e>s;s++)o.push('"'+t[s]+'"');
if(0==o.length)return void n.err("请选择要删除的图片");
var i='{"url":['+o.join(",")+"]}";
a.post({
url:wx.url("/merchant/goodsimage?action=delimage"),
data:{
url:i
},
mask:!1
},function(t){
if(!t||!t.base_resp)return void n.err("系统错误，请重试");
switch(+t.base_resp.ret){
case 0:
n.suc("删除成功");
var o=location.href,s=+m.offset,i=+m.total,c=+m.count;
s=i-e>s?s:s-c>0?s-c:0,/([\?&])offset=\d*/.test(o)?location.href=o.replace(/([\?&])offset=\d*/,"$1offset="+s):setTimeout(function(){
location.reload();
},300);
break;

default:
n.err("删除失败，请重试"),a.handleRet(t,{
id:64462,
key:95,
url:"/merchant/goodsimage?action=delimage"
});
}
});
}),i.init(".js_del",{
type:"click",
parentClass:"",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var t='{"url":["'+this.$container.data("id")+'"]}';
a.post({
url:wx.url("/merchant/goodsimage?action=delimage"),
data:{
url:t
},
mask:!1
},function(t){
if(!t||!t.base_resp)return void n.err("系统错误，请重试");
switch(+t.base_resp.ret){
case 0:
n.suc("删除成功");
var e=location.href,o=+m.offset,s=+m.total,i=+m.count;
o=s-1>o?o:o-i>0?o-i:0,/([\?&])offset=\d*/.test(e)?location.href=e.replace(/([\?&])offset=\d*/,"$1offset="+o):setTimeout(function(){
location.reload();
},300);
break;

default:
n.err("删除失败，请重试"),a.handleRet(t,{
id:64462,
key:95,
url:"/merchant/goodsimage?action=delimage"
});
}
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
this.hide();
}
}],
onshow:function(){
var t='<h3 class="popover_title">删除图片</h3><p class="popover_tips">确定删除该图片?</p>';
this.$dom.find(".popover_content").html(t),i.hideAll(),this.show();
}
}),s.uploadShopFile({
container:"#upload",
multi:!0,
type:8,
queueSizeLimit:99999,
onComplete:function(t,e,o,s){
0==s.base_resp.ret?n.suc("上传成功"):n.err(-7010==s.base_resp.ret?"上传失败，图片库已满":"上传失败");
},
onAllComplete:function(){
setTimeout(function(){
location.reload();
},300);
},
showError:!0
});
var u=m.total,h=m.offset,d=m.count>0?m.count:m.list.length;
if(u>d){
var g=h>0?Math.floor(h/d)+1:1;
new o({
container:"#imgpages",
perPage:d,
initShowPage:g,
totalItemsNum:u,
first:!1,
last:!1,
startRange:2,
midRange:3,
endRange:2,
isSimple:!0,
callback:function(t){
var e=""+t.perPage*(t.currentPage-1),o=location.href;
return location.href=/([\?&])offset=\d*/.test(o)?o.replace(/([\?&])offset=\d*/,"$1offset="+e):o+"&offset=%s&count=%s".sprintf(e,t.perPage),
!1;
}
});
}
setTimeout(function(){
$(".js_lazy").each(function(){
$(this).attr("src",$(this).data("src"));
});
},300);
}();
});