define("common/wx/media/appmsg.js",["widget/media.css","common/wx/time.js","media/appmsg_temp_url.js","tpl/media/appmsg.html.js","common/qq/Class.js"],function(e){
"use strict";
e("widget/media.css");
var t=/[\u2600-\u27BF]|[\u2B00-\u2BFF]|[\u3291-\u32B0]|[\uD83C\uD83D][\uDC00-\uDFFF]/,i=(wx.T,
e("common/wx/time.js")),a=e("media/appmsg_temp_url.js"),m=e("tpl/media/appmsg.html.js"),l=e("common/qq/Class.js"),r=l.declare({
init:function(e){
if(e&&e.container){
if(e.data=e.data||$.extend({},e),e.data.multi_item)for(var l=0;l<e.data.multi_item.length;l++){
var r=e.data.multi_item[l];
if(1==r.smart_product){
e.data.smart_product=1;
break;
}
}
var o=e.data,s=o.multi_item||[],d=s.length,p=null,u=!0,c="",n=[];
if(!(0>=d)){
p=s[0],p.completed=!0,(!p.title||!p.cover&&7!=p.share_page_type)&&(u=!1,p.completed=!1),
t.test(p.title)&&(c="title-emoji",u=!1,p.completed=!1),p.cover&&(p.cover=p.cover.nogif());
for(var l=1;d>l;++l){
var r=s[l];
r.completed=!0,n.push(r),r.title&&r.cover||7==r.share_page_type||(u=!1,r.completed=!1),
t.test(r.title)&&(c="title-emoji",u=!1,p.completed=!1),r.cover&&(r.cover=r.cover.nogif());
}
var h={
highlight:e.highlight===!0?!0:!1,
id:o.app_id,
type:e.type,
file_id:o.file_id,
time:o.create_time?i.timeFormat(o.create_time):"",
update_time:o.update_time?i.timeFormat(o.update_time):"",
isMul:d>1,
first:p,
list:n,
completed:u,
notCompletedType:c,
is_illegal:1*o.is_illegal||0,
token:wx.data.t,
showEdit:e.showEdit||!1,
showMask:e.showMask||!1,
useUpdateTime:e.useUpdateTime||!1,
isShareMul:e.isShareMul||!1,
isSupportShareMul:e.isSupportShareMul||!1
},_=$(e.container).html(wx.T(m,h));
if(e.highlight===!0){
for(var r=$.extend({},e),l=0,g=r.data.multi_item.length;g>l;l++){
var v=r.data.multi_item[l];
v.title=v.title.replace(/<em>/g,"").replace(/<\/em>/g,"");
}
_.data("opt",r);
}else _.data("opt",e);
this.renderData=h,a(e.container,".js_title a,.js_preview");
}
}
},
getData:function(){
return this.renderData;
}
});
return r;
});