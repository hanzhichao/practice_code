define("biz_web/lib/webuploader/lib/filepicker.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/lib/file.js","biz_web/lib/webuploader/lib/image.js"],function(e){
function i(e){
if(e=this.options=s.extend({},i.options,e),e.container=s(e.id),!e.container.length)throw new Error("按钮指定错误");
e.button=e.container,n.call(this,"FilePicker",!0);
}
var t=e("biz_web/lib/webuploader/base.js"),n=e("biz_web/lib/webuploader/runtime/client.js"),r=e("biz_web/lib/webuploader/lib/file.js"),o=e("biz_web/lib/webuploader/lib/image.js"),s=t.$;
return i.options={
button:null,
container:null,
label:null,
innerHTML:null,
multiple:!0,
accept:null
},t.inherits(n,{
constructor:i,
init:function(){
var e=this,i=e.options,n=i.button;
n.addClass("webuploader-pick"),e.on("all",function(t){
var l,a;
switch(t){
case"mouseenter":
n.addClass("webuploader-pick-hover");
break;

case"mouseleave":
n.removeClass("webuploader-pick-hover");
break;

case"change":
l=e.exec("getFiles"),a=0,l=s.map(l,function(t){
if(t=new r(e.getRuid(),t),t._refer=i.container,i.imageSize&&~"image/jpeg,image/jpg,image/png,image/bmp,image/gif".indexOf(t.type)){
var n=new o(i.compress||i.resize);
n.on("load",function(){
var r=n.info();
t.width=r.width,t.height=r.height,a++,a==l.length&&e.trigger("select",l,i.container);
}),n.on("error",function(){
a++,a==l.length&&e.trigger("select",l,i.container);
}),n.loadFromBlob(t);
}else a++;
return t;
}),a==l.length&&e.trigger("select",l,i.container);
}
}),e.connectRuntime(i,function(){
e.refresh(),e.exec("init",i),e.trigger("ready");
}),this._resizeHandler=t.bindFn(this.refresh,this),s(window).on("resize",this._resizeHandler);
},
refresh:function(){
var e=this.getRuntime().getContainer(),i=this.options.button,t=i.outerWidth?i.outerWidth():i.width(),n=i.outerHeight?i.outerHeight():i.height(),r=i.offset();
try{
i.is(":visible")||(t+=parseInt(i.css("min-width"))||0);
}catch(o){}
t&&n&&e.css({
bottom:"auto",
right:"auto",
width:t+"px",
height:n+"px"
}).offset(r);
},
enable:function(){
var e=this.options.button;
e.removeClass("webuploader-pick-disable"),this.refresh();
},
disable:function(){
var e=this.options.button;
this.getRuntime().getContainer().css({
top:"-99999px"
}),e.addClass("webuploader-pick-disable");
},
destroy:function(){
var e=this.options.button;
s(window).off("resize",this._resizeHandler),e.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick");
}
}),i;
});