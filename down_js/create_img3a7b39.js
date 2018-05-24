define("shop/create_img.js",["common/wx/Tips.js","biz_web/utils/upload.js"],function(e){
"use strict";
var t=e("common/wx/Tips.js"),n=template.render,i=e("biz_web/utils/upload.js"),a={
itemleft:function(){
var e=$(this).parent().parent(),t=e.prev(".edit_pic_wrp");
t.length&&e.insertBefore(t);
},
itemright:function(){
var e=$(this).parent().parent(),t=e.next(".edit_pic_wrp");
t.length&&e.insertAfter(t);
},
itemcount:function(e){
var t=e.find("img").length;
e.data("count",t).data("queue",0),10>t?e.parent().parent().find(".upload_area").show():e.parent().parent().find(".upload_area").hide();
},
itemdel:function(){
$(this).closest(".upload_preview").parent().find("a").show(),$(this).parent().parent().remove();
},
mainimage:function(e,n){
return function(i,r,p,s){
if(0==s.base_resp.ret){
var o=s.data,c=p.name,d=$(e).parent().parent().parent().find(n),u=$(e),l=$('<div class="edit_pic_wrp"><img src="%s" alt="%s"><div class="edit_pic_mask"><a href="javascript:;" class="icon18_common del_gray js_delete"></a></div></div>'.sprintf(o,c));
l.find(".js_delete").on("click",a.itemdel),d.html(l),u.hide(),t.suc("上传成功");
}else t.err(-7010==s.base_resp.ret?"上传失败，图片库已满":"上传失败");
};
},
subimage:function(e,r){
i.uploadShopFile({
container:e,
multi:!0,
type:2,
timeout:30,
onComplete:function(i,p,s,o){
if(0==o.base_resp.ret){
var c=o.data,d=s.name,u=$(e).parent().parent().parent().find(r),l=$(n("tpl_guige_images_unitysub",{
imgname:d,
imgurl:c
}));
l.find(".js_left").on("click",a.itemleft),l.find(".js_right").on("click",a.itemright),
l.find(".js_delete").on("click",function(){
$(this).parent().parent().remove(),a.itemcount(u);
}),u.prepend(l),t.suc("上传成功");
}else t.err(-7010==o.base_resp.ret?"上传失败，图片库已满":"上传失败");
},
canContinueUpload:function(){
var n=$(e).parent().parent().parent().find(r),i=+(n.data("count")||0),a=+(n.data("queue")||0);
return i+a>=10?(t.err("最多可上传10张"),!1):(n.data("queue",a+1),!0);
},
onAllComplete:function(){
a.itemcount($(e).parent().parent().parent().find(r));
}
});
}
};
return a;
});