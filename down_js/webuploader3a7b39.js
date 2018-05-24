define("biz_web/lib/webuploader/promise.js",[],function(){
return{
Deferred:$.Deferred,
when:$.when,
isPromise:function(e){
return e&&"function"==typeof e.then;
}
};
});;define("biz_web/lib/webuploader/base.js",["biz_web/lib/webuploader/promise.js"],function(r){
function t(r){
return function(){
return a.apply(r,arguments);
};
}
function e(r,t){
return function(){
return r.apply(t,arguments);
};
}
function n(r){
var t;
return Object.create?Object.create(r):(t=function(){},t.prototype=r,new t);
}
var o=r("biz_web/lib/webuploader/promise.js"),i=function(){},a=Function.call;
return{
version:"@version@",
$:$,
Deferred:o.Deferred,
isPromise:o.isPromise,
when:o.when,
browser:function(r){
var t={},e=r.match(/WebKit\/([\d.]+)/),n=r.match(/Chrome\/([\d.]+)/)||r.match(/CriOS\/([\d.]+)/),o=r.match(/MSIE\s([\d\.]+)/)||r.match(/(?:trident)(?:.*rv:([\w.]+))?/i),i=r.match(/Firefox\/([\d.]+)/),a=r.match(/Safari\/([\d.]+)/),u=r.match(/OPR\/([\d.]+)/);
return e&&(t.webkit=parseFloat(e[1])),n&&(t.chrome=parseFloat(n[1])),o&&(t.ie=parseFloat(o[1])),
i&&(t.firefox=parseFloat(i[1])),a&&(t.safari=parseFloat(a[1])),u&&(t.opera=parseFloat(u[1])),
t;
}(navigator.userAgent),
os:function(r){
var t={},e=r.match(/(?:Android);?[\s\/]+([\d.]+)?/),n=r.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
return e&&(t.android=parseFloat(e[1])),n&&(t.ios=parseFloat(n[1].replace(/_/g,"."))),
t;
}(navigator.userAgent),
inherits:function(r,t,e){
var o;
return"function"==typeof t?(o=t,t=null):o=t&&t.hasOwnProperty("constructor")?t.constructor:function(){
return r.apply(this,arguments);
},$.extend(!0,o,r,e||{}),o.__super__=r.prototype,o.prototype=n(r.prototype),t&&$.extend(!0,o.prototype,t),
o;
},
noop:i,
bindFn:e,
log:function(){
return window.console?e(console.log,console):i;
}(),
nextTick:function(){
return function(r){
setTimeout(r,1);
};
}(),
slice:t([].slice),
guid:function(){
var r=0;
return function(t){
for(var e=(+new Date).toString(32),n=0;5>n;n++)e+=Math.floor(65535*Math.random()).toString(32);
return(t||"wu_")+e+(r++).toString(32);
};
}(),
formatSize:function(r,t,e){
var n;
for(e=e||["B","K","M","G","TB"];(n=e.shift())&&r>1024;)r/=1024;
return("B"===n?r:r.toFixed(t||2))+n;
}
};
});;define("biz_web/lib/webuploader/mediator.js",["biz_web/lib/webuploader/base.js"],function(t){
function n(t,n,e,i){
return u.grep(t,function(t){
return!(!t||n&&t.e!==n||e&&t.cb!==e&&t.cb._cb!==e||i&&t.ctx!==i);
});
}
function e(t,n,e){
u.each((t||"").split(o),function(t,i){
e(i,n);
});
}
function i(t,n){
for(var e,i=!1,r=-1,s=t.length;++r<s;)if(e=t[r],e.cb.apply(e.ctx2,n)===!1){
i=!0;
break;
}
return!i;
}
var r,s=t("biz_web/lib/webuploader/base.js"),u=s.$,c=[].slice,o=/\s+/;
return r={
on:function(t,n,i){
var r,s=this;
return n?(r=this._events||(this._events=[]),e(t,n,function(t,n){
var e={
e:t
};
e.cb=n,e.ctx=i,e.ctx2=i||s,e.id=r.length,r.push(e);
}),this):this;
},
once:function(t,n,i){
var r=this;
return n?(e(t,n,function(t,n){
var e=function(){
return r.off(t,e),n.apply(i||r,arguments);
};
e._cb=n,r.on(t,e,i);
}),r):r;
},
off:function(t,i,r){
var s=this._events;
return s?t||i||r?(e(t,i,function(t,e){
u.each(n(s,t,e,r),function(){
delete s[this.id];
});
}),this):(this._events=[],this):this;
},
trigger:function(t){
var e,r,s;
return this._events&&t?(e=c.call(arguments,1),r=n(this._events,t),s=n(this._events,"all"),
i(r,e)&&i(s,arguments)):this;
}
},u.extend({
installTo:function(t){
return u.extend(t,r);
}
},r);
});;define("biz_web/lib/webuploader/runtime/runtime.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js"],function(e){
function t(e){
this.options=r.extend({
container:document.body
},e),this.uid=n.guid("rt_");
}
var n=e("biz_web/lib/webuploader/base.js"),i=e("biz_web/lib/webuploader/mediator.js"),r=n.$,o={},a=function(e){
for(var t in e)if(e.hasOwnProperty(t))return t;
return null;
};
return r.extend(t.prototype,{
getContainer:function(){
var e,t,n=this.options;
return this._container?this._container:(e=r(n.container||document.body).parent(),
t=r(document.createElement("div")),t.attr("id","rt_"+this.uid),t.css({
position:"absolute",
top:"0px",
left:"0px",
width:"1px",
height:"1px",
overflow:"hidden"
}),e.append(t),e.addClass("webuploader-container"),this._container=t,this._parent=e,
t);
},
init:n.noop,
exec:n.noop,
destroy:function(){
this._container&&this._container.remove(),this._parent&&this._parent.removeClass("webuploader-container"),
this.off();
}
}),t.orders="html5,flash",t.addRuntime=function(e,t){
o[e]=t;
},t.hasRuntime=function(e){
return!!(e?o[e]:a(o));
},t.create=function(e,n){
var i,s;
if(n=n||t.orders,r.each(n.split(/\s*,\s*/g),function(){
return o[this]?(i=this,!1):void 0;
}),i=i||a(o),!i)throw new Error("Runtime Error");
return s=new o[i](e);
},i.installTo(t.prototype),t;
});;define("biz_web/lib/webuploader/runtime/compbase.js",[],function(){
function t(t,i){
this.owner=t,this.options=t.options,this.getRuntime=function(){
return i;
},this.getRuid=function(){
return i.uid;
},this.trigger=function(){
return t.trigger.apply(t,arguments);
};
}
return t;
});;define("biz_web/lib/webuploader/runtime/flash/runtime.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/runtime.js","biz_web/lib/webuploader/runtime/compbase.js"],function(e){
function t(){
var e;
try{
e=navigator.plugins["Shockwave Flash"],e=e.description;
}catch(t){
try{
e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");
}catch(i){
e="0.0";
}
}
return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1],10);
}
function i(){
function e(e,t){
var a,s,r=e.type||e;
a=r.split("::"),s=a[0],r=a[1],"Ready"===r&&s===n.uid?n.trigger("ready"):i[s]&&i[s].trigger(r.toLowerCase(),e,t);
}
var t={},i={},r=this.destroy,n=this,o=a.guid("webuploader_");
s.apply(n,arguments),n.type=u,n.exec=function(e,s){
var r,u=this,o=u.uid,h=a.slice(arguments,2);
return i[o]=u,l[e]&&(t[o]||(t[o]=new l[e](u,n)),r=t[o],r[s])?r[s].apply(r,h):n.flashExec.apply(u,arguments);
},window[o]=function(){
var t=arguments;
setTimeout(function(){
e.apply(null,t);
},1);
},this.jsreciver=o,this.destroy=function(){
return r&&r.apply(this,arguments);
},this.flashExec=function(e,t){
var i=n.getFlash(),s=a.slice(arguments,2);
return i.exec(this.uid,e,t,s);
};
}
var a=e("biz_web/lib/webuploader/base.js"),s=e("biz_web/lib/webuploader/runtime/runtime.js"),r=e("biz_web/lib/webuploader/runtime/compbase.js"),n=a.$,u="flash",l={};
return a.inherits(s,{
constructor:i,
init:function(){
var e,t=this.getContainer(),i=this.options;
t.css({
position:"absolute",
top:"-8px",
left:"-8px",
width:"9px",
height:"9px",
overflow:"hidden"
}),e='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+i.swf+'" ',
a.browser.ie&&(e+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),e+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+i.swf+'" /><param name="flashvars" value="uid='+this.uid+"&jsreciver="+this.jsreciver+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',
t.html(e);
},
getFlash:function(){
return this._flash?this._flash:(this._flash=n("#"+this.uid).get(0),this._flash);
}
}),i.register=function(e,t){
return t=l[e]=a.inherits(r,n.extend({
flashExec:function(){
var e=this.owner,t=this.getRuntime();
return t.flashExec.apply(e,arguments);
}
},t));
},t()>=11.4&&s.addRuntime(u,i),i;
});;define("biz_web/lib/webuploader/runtime/flash/image.js",["biz_web/lib/webuploader/runtime/flash/runtime.js"],function(e){
var i=e("biz_web/lib/webuploader/runtime/flash/runtime.js");
return i.register("Image",{
loadFromBlob:function(e){
var i=this.owner;
i.info()&&this.flashExec("Image","info",i.info()),i.meta()&&this.flashExec("Image","meta",i.meta()),
this.flashExec("Image","loadFromBlob",e.uid);
}
});
});;define("biz_web/lib/webuploader/runtime/client.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js","biz_web/lib/webuploader/runtime/runtime.js"],function(e){
function t(e,t){
var r,u=n.Deferred();
this.uid=n.guid("client_"),this.runtimeReady=function(e){
return u.done(e);
},this.connectRuntime=function(e,s){
if(r)throw new Error("already connected!");
return u.done(s),"string"==typeof e&&i.get(e)&&(r=i.get(e)),r=r||i.get(null,t),r?(n.$.extend(r.options,e),
r.__promise.then(u.resolve),r.__client++):(r=o.create(e,e.runtimeOrder),r.__promise=u.promise(),
r.once("ready",u.resolve),r.init(),i.add(r),r.__client=1),t&&(r.__standalone=t),
r;
},this.getRuntime=function(){
return r;
},this.disconnectRuntime=function(){
r&&(r.__client--,r.__client<=0&&(i.remove(r),delete r.__promise,r.destroy()),r=null);
},this.exec=function(){
if(r){
var t=n.slice(arguments);
return e&&t.unshift(e),r.exec.apply(this,t);
}
},this.getRuid=function(){
return r&&r.uid;
},this.destroy=function(e){
return function(){
e&&e.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),
this.disconnectRuntime();
};
}(this.destroy);
}
var i,n=e("biz_web/lib/webuploader/base.js"),r=e("biz_web/lib/webuploader/mediator.js"),o=e("biz_web/lib/webuploader/runtime/runtime.js");
return i=function(){
var e={};
return{
add:function(t){
e[t.uid]=t;
},
get:function(t,i){
var n;
if(t)return e[t];
for(n in e)if(!i||!e[n].__standalone)return e[n];
return null;
},
remove:function(t){
delete e[t.uid];
}
};
}(),r.installTo(t.prototype),t;
});;define("biz_web/lib/webuploader/lib/blob.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js"],function(e){
function i(e,i){
var t=this;
t.source=i,t.ruid=e,this.size=i.size||0,this.type=!i.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?"image/"+("jpg"===this.ext?"jpeg":this.ext):i.type||"application/octet-stream",
b.call(t,"Blob"),this.uid=i.uid||this.uid,e&&t.connectRuntime(e);
}
var t=e("biz_web/lib/webuploader/base.js"),b=e("biz_web/lib/webuploader/runtime/client.js");
return t.inherits(b,{
constructor:i,
slice:function(e,i){
return this.exec("slice",e,i);
},
getSource:function(){
return this.source;
}
}),i;
});;define("biz_web/lib/webuploader/runtime/flash/blob.js",["biz_web/lib/webuploader/runtime/flash/runtime.js","biz_web/lib/webuploader/lib/blob.js"],function(b){
var e=b("biz_web/lib/webuploader/runtime/flash/runtime.js"),i=b("biz_web/lib/webuploader/lib/blob.js");
return e.register("Blob",{
slice:function(b,e){
var l=this.flashExec("Blob","slice",b,e);
return new i(l.uid,l);
}
});
});;define("biz_web/lib/webuploader/runtime/flash/transport.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/flash/runtime.js","biz_web/lib/webuploader/runtime/client.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),r=e("biz_web/lib/webuploader/runtime/flash/runtime.js"),n=e("biz_web/lib/webuploader/runtime/client.js"),s=t.$,o=1;
return r.register("Transport",{
init:function(){
this._status=0,this._response=null,this._responseJson=null;
},
send:function(){
var e,t=this.owner,r=this.options,n=this._initAjax(),i=t._blob,a=r.server;
a+="&seq="+o++,n.connectRuntime(i.ruid),r.sendAsBinary?(a+=(/\?/.test(a)?"&":"?")+s.param(t._formData),
e=i.uid):(s.each(t._formData,function(e,t){
n.exec("append",e,t);
}),n.exec("appendBlob",r.fileVal,i.uid,r.filename||t._formData.name||"")),this._setRequestHeader(n,r.headers),
n.exec("send",{
method:r.method,
url:a,
forceURLStream:r.forceURLStream,
mimeType:"application/octet-stream"
},e);
},
getStatus:function(){
return this._status;
},
getResponse:function(){
return this._response||"";
},
getResponseAsJson:function(){
return this._responseJson;
},
abort:function(){
var e=this._xhr;
e&&(e.exec("abort"),e.destroy(),this._xhr=e=null);
},
destroy:function(){
this.abort();
},
_initAjax:function(){
var e=this,t=new n("XMLHttpRequest");
return t.on("uploadprogress progress",function(t){
var r=t.loaded/t.total;
return r=Math.min(1,Math.max(0,r)),e.trigger("progress",r);
}),t.on("load",function(){
var r,n=t.exec("getStatus"),s=!1,o="";
return t.off(),e._xhr=null,n>=200&&300>n?s=!0:n>=500&&600>n?(s=!0,o="server"):o="http",
s&&(e._response=t.exec("getResponse"),e._response=decodeURIComponent(e._response),
r=window.JSON&&window.JSON.parse||function(e){
try{
return new Function("return "+e).call();
}catch(t){
return{};
}
},e._responseJson=e._response?r(e._response):{}),t.destroy(),t=null,o?e.trigger("error",o):e.trigger("load");
}),t.on("error",function(){
t.off(),e._xhr=null,e.trigger("error","http");
}),e._xhr=t,t;
},
_setRequestHeader:function(e,t){
s.each(t,function(t,r){
e.exec("setRequestHeader",t,r);
});
}
});
});;define("biz_web/lib/webuploader/runtime/flash/filepicker.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/flash/runtime.js"],function(e){
var i=e("biz_web/lib/webuploader/base.js"),t=e("biz_web/lib/webuploader/runtime/flash/runtime.js"),l=i.$;
return t.register("FilePicker",{
init:function(e){
var i,t,r=l.extend({},e);
for(i=r.accept&&r.accept.length,t=0;i>t;t++)r.accept[t].title||(r.accept[t].title="Files");
delete r.button,delete r.id,delete r.container,this.flashExec("FilePicker","init",r);
},
destroy:function(){
this.flashExec("FilePicker","destroy");
}
});
});;define("biz_web/lib/webuploader/runtime/html5/runtime.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/runtime.js","biz_web/lib/webuploader/runtime/compbase.js"],function(e){
function i(){
var e={},i=this,n=this.destroy;
t.apply(i,arguments),i.type=b,i.exec=function(t,n){
var b,a=this,s=a.uid,o=r.slice(arguments,2);
return u[t]&&(b=e[s]=e[s]||new u[t](a,i),b[n])?b[n].apply(b,o):void 0;
},i.destroy=function(){
return n&&n.apply(this,arguments);
};
}
var r=e("biz_web/lib/webuploader/base.js"),t=e("biz_web/lib/webuploader/runtime/runtime.js"),n=e("biz_web/lib/webuploader/runtime/compbase.js"),b="html5",u={};
return r.inherits(t,{
constructor:i,
init:function(){
var e=this;
setTimeout(function(){
e.trigger("ready");
},1);
}
}),i.register=function(e,i){
var t=u[e]=r.inherits(n,i);
return t;
},window.Blob&&window.FileReader&&window.DataView&&t.addRuntime(b,i),i;
});;define("biz_web/lib/webuploader/runtime/html5/util.js",["biz_web/lib/webuploader/base.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),r=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL,n=t.noop,a=n;
return r&&(n=function(){
return r.createObjectURL.apply(r,arguments);
},a=function(){
return r.revokeObjectURL.apply(r,arguments);
}),{
createObjectURL:n,
revokeObjectURL:a,
dataURL2Blob:function(e){
var t,r,n,a,o,i;
for(i=e.split(","),t=~i[0].indexOf("base64")?atob(i[1]):decodeURIComponent(i[1]),
n=new ArrayBuffer(t.length),r=new Uint8Array(n),a=0;a<t.length;a++)r[a]=t.charCodeAt(a);
return o=i[0].split(":")[1].split(";")[0],this.arrayBufferToBlob(n,o);
},
dataURL2ArrayBuffer:function(e){
var t,r,n,a;
for(a=e.split(","),t=~a[0].indexOf("base64")?atob(a[1]):decodeURIComponent(a[1]),
r=new Uint8Array(t.length),n=0;n<t.length;n++)r[n]=t.charCodeAt(n);
return r.buffer;
},
arrayBufferToBlob:function(e,t){
var r,n=window.BlobBuilder||window.WebKitBlobBuilder;
return n?(r=new n,r.append(e),r.getBlob(t)):new Blob([e],t?{
type:t
}:{});
},
canvasToDataUrl:function(e,t,r){
return e.toDataURL(t,r/100);
},
parseMeta:function(e,t){
t(!1,{});
},
updateImageHead:function(e){
return e;
}
};
});;define("biz_web/lib/webuploader/runtime/html5/image.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/html5/runtime.js","biz_web/lib/webuploader/runtime/html5/util.js"],function(t){
var e=t("biz_web/lib/webuploader/base.js"),a=t("biz_web/lib/webuploader/runtime/html5/runtime.js"),i=t("biz_web/lib/webuploader/runtime/html5/util.js"),r="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
return a.register("Image",{
modified:!1,
init:function(){
var t=this,e=new Image;
e.onload=function(){
t._info={
type:t.type,
width:this.width,
height:this.height
},t._metas||"image/jpeg"!==t.type?t.owner.trigger("load"):i.parseMeta(t._blob,function(e,a){
t._metas=a;
try{
t._info.type=t._blob.type=t.type=a.imageType;
}catch(i){}
t.owner.trigger("load");
});
},e.onerror=function(){
t.owner.trigger("error");
},t._img=e;
},
loadFromBlob:function(t){
var e=this,a=e._img;
e._blob=t,e.type=t.type,a.src=i.createObjectURL(t.getSource()),e.owner.once("load",function(){
i.revokeObjectURL(a.src);
});
},
resize:function(t,e){
var a=this._canvas||(this._canvas=document.createElement("canvas"));
this._resize(this._img,a,t,e),this._blob=null,this.modified=!0,this.owner.trigger("complete","resize");
},
crop:function(t,e,a,i,r){
var n=this._canvas||(this._canvas=document.createElement("canvas")),s=this.options,o=this._img,h=o.naturalWidth,l=o.naturalHeight,c=this.getOrientation();
r=r||1,n.width=a,n.height=i,s.preserveHeaders||this._rotate2Orientaion(n,c),this._renderImageToCanvas(n,o,-t,-e,h*r,l*r),
this._blob=null,this.modified=!0,this.owner.trigger("complete","crop");
},
getAsBlob:function(t,e){
var a,r=this._blob,n=this.options;
if(t=t||this.type,this.modified||this.type!==t){
if(a=this._canvas,"image/jpeg"===t){
if(r=i.canvasToDataUrl(a,t,e||n.quality),n.preserveHeaders&&this._metas&&this._metas.imageHead)return r=i.dataURL2ArrayBuffer(r),
r=i.updateImageHead(r,this._metas.imageHead),r=i.arrayBufferToBlob(r,t);
}else r=i.canvasToDataUrl(a,t);
r=i.dataURL2Blob(r);
}
return r;
},
getAsDataUrl:function(t){
var e=this.options;
return t=t||this.type,"image/jpeg"===t?i.canvasToDataUrl(this._canvas,t,e.quality):this._canvas.toDataURL(t);
},
getOrientation:function(){
return this._metas&&this._metas.exif&&this._metas.exif.get("Orientation")||1;
},
info:function(t){
return t?(this._info=t,this):this._info;
},
meta:function(t){
return t?(this._meta=t,this):this._meta;
},
destroy:function(){
var t=this._canvas;
this._img.onload=null,t&&(t.getContext("2d").clearRect(0,0,t.width,t.height),t.width=t.height=0,
this._canvas=null),this._img.src=r,this._img=this._blob=null;
},
_resize:function(t,e,a,i){
var r,n,s,o,h,l=this.options,c=t.width,g=t.height,d=this.getOrientation();
~[5,6,7,8].indexOf(d)&&(a^=i,i^=a,a^=i),r=Math[l.crop?"max":"min"](a/c,i/g),l.allowMagnify||(r=Math.min(1,r)),
n=c*r,s=g*r,l.crop?(e.width=a,e.height=i):(e.width=n,e.height=s),o=(e.width-n)/2,
h=(e.height-s)/2,l.preserveHeaders||this._rotate2Orientaion(e,d),this._renderImageToCanvas(e,t,o,h,n,s);
},
_rotate2Orientaion:function(t,e){
var a=t.width,i=t.height,r=t.getContext("2d");
switch(e){
case 5:
case 6:
case 7:
case 8:
t.width=i,t.height=a;
}
switch(e){
case 2:
r.translate(a,0),r.scale(-1,1);
break;

case 3:
r.translate(a,i),r.rotate(Math.PI);
break;

case 4:
r.translate(0,i),r.scale(1,-1);
break;

case 5:
r.rotate(.5*Math.PI),r.scale(1,-1);
break;

case 6:
r.rotate(.5*Math.PI),r.translate(0,-i);
break;

case 7:
r.rotate(.5*Math.PI),r.translate(a,-i),r.scale(-1,1);
break;

case 8:
r.rotate(-.5*Math.PI),r.translate(-a,0);
}
},
_renderImageToCanvas:function(){
function t(t,e,a){
var i,r,n,s=document.createElement("canvas"),o=s.getContext("2d"),h=0,l=a,c=a;
for(s.width=1,s.height=a,o.drawImage(t,0,0),i=o.getImageData(0,0,1,a).data;c>h;)r=i[4*(c-1)+3],
0===r?l=c:h=c,c=l+h>>1;
return n=c/a,0===n?1:n;
}
function a(t){
var e,a,i=t.naturalWidth,r=t.naturalHeight;
return i*r>1048576?(e=document.createElement("canvas"),e.width=e.height=1,a=e.getContext("2d"),
a.drawImage(t,-i+1,0),0===a.getImageData(0,0,1,1).data[3]):!1;
}
return e.os.ios?e.os.ios>=7?function(e,a,i,r,n,s){
var o=a.naturalWidth,h=a.naturalHeight,l=t(a,o,h);
return e.getContext("2d").drawImage(a,0,0,o*l,h*l,i,r,n,s);
}:function(e,i,r,n,s,o){
var h,l,c,g,d,u,m,b=i.naturalWidth,_=i.naturalHeight,f=e.getContext("2d"),w=a(i),p="image/jpeg"===this.type,v=1024,y=0,A=0;
for(w&&(b/=2,_/=2),f.save(),h=document.createElement("canvas"),h.width=h.height=v,
l=h.getContext("2d"),c=p?t(i,b,_):1,g=Math.ceil(v*s/b),d=Math.ceil(v*o/_/c);_>y;){
for(u=0,m=0;b>u;)l.clearRect(0,0,v,v),l.drawImage(i,-u,-y),f.drawImage(h,0,0,v,v,r+m,n+A,g,d),
u+=v,m+=g;
y+=v,A+=d;
}
f.restore(),h=l=null;
}:function(t){
var a=e.slice(arguments,1),i=t.getContext("2d");
i.drawImage.apply(i,a);
};
}()
});
});;define("biz_web/lib/webuploader/runtime/html5/transport.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/html5/runtime.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),r=e("biz_web/lib/webuploader/runtime/html5/runtime.js"),s=t.noop,n=t.$,a=1;
return r.register("Transport",{
init:function(){
this._status=0,this._response=null;
},
send:function(){
var e,r,s,o=this.owner,i=this.options,u=this._initAjax(),d=o._blob,p=i.server;
p+="&seq="+a++,i.sendAsBinary?(p+=(/\?/.test(p)?"&":"?")+n.param(o._formData),r=d.getSource()):(e=new FormData,
n.each(o._formData,function(t,r){
e.append(t,r);
}),e.append(i.fileVal,d.getSource(),i.filename||o._formData.name||"")),i.withCredentials&&"withCredentials"in u?(u.open(i.method,p,!0),
u.withCredentials=!0):u.open(i.method,p),this._setRequestHeader(u,i.headers),r?(u.overrideMimeType&&u.overrideMimeType("application/octet-stream"),
t.os.android?(s=new FileReader,s.onload=function(){
u.send(this.result),s=s.onload=null;
},s.readAsArrayBuffer(r)):u.send(r)):u.send(e);
},
getResponse:function(){
return this._response;
},
getResponseAsJson:function(){
return this._parseJson(this._response);
},
getStatus:function(){
return this._status;
},
abort:function(){
var e=this._xhr;
e&&(e.upload.onprogress=s,e.onreadystatechange=s,e.abort(),this._xhr=e=null);
},
destroy:function(){
this.abort();
},
_initAjax:function(){
var e=this,t=new XMLHttpRequest,r=this.options;
return!r.withCredentials||"withCredentials"in t||"undefined"==typeof XDomainRequest||(t=new XDomainRequest),
t.upload.onprogress=function(t){
var r=0;
return t.lengthComputable&&(r=t.loaded/t.total),e.trigger("progress",r);
},t.onreadystatechange=function(){
return 4===t.readyState?(t.upload.onprogress=s,t.onreadystatechange=s,e._xhr=null,
e._status=t.status,t.status>=200&&t.status<300?(e._response=t.responseText,e.trigger("load")):t.status>=500&&t.status<600?(e._response=t.responseText,
e.trigger("error","server")):e.trigger("error",e._status?"http":"abort")):void 0;
},e._xhr=t,t;
},
_setRequestHeader:function(e,t){
n.each(t,function(t,r){
e.setRequestHeader(t,r);
});
},
_parseJson:function(e){
var t;
try{
t=JSON.parse(e);
}catch(r){
t={};
}
return t;
}
});
});;define("biz_web/lib/webuploader/runtime/html5/imagemeta.js",["biz_web/lib/webuploader/runtime/html5/util.js"],function(e){
var a,t=e("biz_web/lib/webuploader/runtime/html5/util.js");
return a={
parsers:{
65505:[]
},
maxMetaDataSize:262144,
parse:function(e,a){
var t=this,r=new FileReader;
r.onload=function(){
a(!1,t._parse(this.result)),r=r.onload=r.onerror=null;
},r.onerror=function(e){
a(e.message),r=r.onload=r.onerror=null;
},e=e.slice(0,t.maxMetaDataSize),r.readAsArrayBuffer(e.getSource());
},
_parse:function(e,t){
if(!(e.byteLength<6)){
var r,n,i,s,g=new DataView(e),u=2,l=g.byteLength-4,m=u,b={};
if(65496===g.getUint16(0)){
for(;l>u&&(r=g.getUint16(u),r>=65504&&65519>=r||65534===r)&&(n=g.getUint16(u+2)+2,
!(u+n>g.byteLength));){
if(i=a.parsers[r],!t&&i)for(s=0;s<i.length;s+=1)i[s].call(a,g,u,n,b);
u+=n,m=u;
}
m>6&&(b.imageHead=e.slice?e.slice(2,m):new Uint8Array(e).subarray(2,m));
}
switch(g.getUint16(0)){
case 65496:
b.imageType="image/jpeg";
break;

case 35152:
b.imageType="image/png";
break;

case 16973:
b.imageType="image/bmp";
break;

case 18249:
70==g.getUint8(2)&&(b.imageType="image/gif");
}
return b;
}
},
updateImageHead:function(e,a){
var t,r,n,i=this._parse(e,!0);
return n=2,i.imageHead&&(n=2+i.imageHead.byteLength),r=e.slice?e.slice(n):new Uint8Array(e).subarray(n),
t=new Uint8Array(a.byteLength+2+r.byteLength),t[0]=255,t[1]=216,t.set(new Uint8Array(a),2),
t.set(new Uint8Array(r),a.byteLength+2),t.buffer;
}
},t.parseMeta=function(){
return a.parse.apply(a,arguments);
},t.updateImageHead=function(){
return a.updateImageHead.apply(a,arguments);
},a;
});;define("biz_web/lib/webuploader/runtime/html5/imagemeta/exif.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/html5/imagemeta.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),i=e("biz_web/lib/webuploader/runtime/html5/imagemeta.js"),n={};
return n.ExifMap=function(){
return this;
},n.ExifMap.prototype.map={
Orientation:274
},n.ExifMap.prototype.get=function(e){
return this[e]||this[this.map[e]];
},n.exifTagTypes={
1:{
getValue:function(e,t){
return e.getUint8(t);
},
size:1
},
2:{
getValue:function(e,t){
return String.fromCharCode(e.getUint8(t));
},
size:1,
ascii:!0
},
3:{
getValue:function(e,t,i){
return e.getUint16(t,i);
},
size:2
},
4:{
getValue:function(e,t,i){
return e.getUint32(t,i);
},
size:4
},
5:{
getValue:function(e,t,i){
return e.getUint32(t,i)/e.getUint32(t+4,i);
},
size:8
},
9:{
getValue:function(e,t,i){
return e.getInt32(t,i);
},
size:4
},
10:{
getValue:function(e,t,i){
return e.getInt32(t,i)/e.getInt32(t+4,i);
},
size:8
}
},n.exifTagTypes[7]=n.exifTagTypes[1],n.getExifValue=function(e,i,a,r,f,g){
var u,s,l,o,d,b,p=n.exifTagTypes[r];
if(!p)return void t.log("Invalid Exif data: Invalid tag type.");
if(u=p.size*f,s=u>4?i+e.getUint32(a+8,g):a+8,s+u>e.byteLength)return void t.log("Invalid Exif data: Invalid data offset.");
if(1===f)return p.getValue(e,s,g);
for(l=[],o=0;f>o;o+=1)l[o]=p.getValue(e,s+o*p.size,g);
if(p.ascii){
for(d="",o=0;o<l.length&&(b=l[o],"\x00"!==b);o+=1)d+=b;
return d;
}
return l;
},n.parseExifTag=function(e,t,i,a,r){
var f=e.getUint16(i,a);
r.exif[f]=n.getExifValue(e,t,i,e.getUint16(i+2,a),e.getUint32(i+4,a),a);
},n.parseExifTags=function(e,i,n,a,r){
var f,g,u;
if(n+6>e.byteLength)return void t.log("Invalid Exif data: Invalid directory offset.");
if(f=e.getUint16(n,a),g=n+2+12*f,g+4>e.byteLength)return void t.log("Invalid Exif data: Invalid directory size.");
for(u=0;f>u;u+=1)this.parseExifTag(e,i,n+2+12*u,a,r);
return e.getUint32(g,a);
},n.parseExifData=function(e,i,a,r){
var f,g,u=i+10;
if(1165519206===e.getUint32(i+4)){
if(u+8>e.byteLength)return void t.log("Invalid Exif data: Invalid segment size.");
if(0!==e.getUint16(i+8))return void t.log("Invalid Exif data: Missing byte alignment offset.");
switch(e.getUint16(u)){
case 18761:
f=!0;
break;

case 19789:
f=!1;
break;

default:
return void t.log("Invalid Exif data: Invalid byte alignment marker.");
}
if(42!==e.getUint16(u+2,f))return void t.log("Invalid Exif data: Missing TIFF marker.");
g=e.getUint32(u+4,f),r.exif=new n.ExifMap,g=n.parseExifTags(e,u,u+g,f,r);
}
},i.parsers[65505].push(n.parseExifData),n;
});;define("biz_web/lib/webuploader/runtime/html5/filepicker.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/html5/runtime.js","biz_web/lib/webuploader/runtime/html5/util.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),i=e("biz_web/lib/webuploader/runtime/html5/runtime.js"),n=(e("biz_web/lib/webuploader/runtime/html5/util.js"),
t.$);
return i.register("FilePicker",{
init:function(){
var e,t,i,l,r=this.getRuntime().getContainer(),a=this,o=a.owner,u=a.options,s=this.label=n(document.createElement("label")),c=this.input=n(document.createElement("input"));
if(c.attr("type","file"),c.attr("name",u.name),c.css("display","none"),s.on("click",function(){
c.trigger("click");
}),s.css({
opacity:0,
width:"100%",
height:"100%",
display:"block",
cursor:"pointer",
background:"#ffffff"
}),u.multiple&&c.attr("multiple","multiple"),u.accept&&u.accept.length>0){
for(e=[],t=0,i=u.accept.length;i>t;t++)e.push(u.accept[t].mimeTypes);
c.attr("accept",e.join(","));
}
r.append(c),r.append(s),l=function(e){
o.trigger(e.type);
},c.on("change",function(e){
var t,i=arguments.callee;
a.files=e.target.files,t=this.cloneNode(!0),t.value=null,this.parentNode.replaceChild(t,this),
c.off(),c=n(t).on("change",i).on("mouseenter mouseleave",l),o.trigger("change");
}),s.on("mouseenter mouseleave",l);
},
getFiles:function(){
return this.files;
},
destroy:function(){
this.input.off(),this.label.off();
}
});
});;define("biz_web/lib/webuploader/lib/blob.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js"],function(e){
function i(e,i){
var t=this;
t.source=i,t.ruid=e,this.size=i.size||0,this.type=!i.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?"image/"+("jpg"===this.ext?"jpeg":this.ext):i.type||"application/octet-stream",
b.call(t,"Blob"),this.uid=i.uid||this.uid,e&&t.connectRuntime(e);
}
var t=e("biz_web/lib/webuploader/base.js"),b=e("biz_web/lib/webuploader/runtime/client.js");
return t.inherits(b,{
constructor:i,
slice:function(e,i){
return this.exec("slice",e,i);
},
getSource:function(){
return this.source;
}
}),i;
});;define("biz_web/lib/webuploader/runtime/html5/blob.js",["biz_web/lib/webuploader/runtime/html5/runtime.js","biz_web/lib/webuploader/lib/blob.js"],function(e){
var b=e("biz_web/lib/webuploader/runtime/html5/runtime.js"),i=e("biz_web/lib/webuploader/lib/blob.js");
return b.register("Blob",{
slice:function(e,b){
var l=this.owner.source,r=l.slice||l.webkitSlice||l.mozSlice;
return l=r.call(l,e,b),new i(this.getRuid(),l);
}
});
});;define("biz_web/lib/webuploader/uploader.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js"],function(e){
function t(e){
this.options=n.extend(!0,{},t.options,e),this._init(this.options);
}
var i=e("biz_web/lib/webuploader/base.js"),s=e("biz_web/lib/webuploader/mediator.js"),n=i.$;
return t.options={},s.installTo(t.prototype),n.each({
upload:"start-upload",
stop:"stop-upload",
getFile:"get-file",
getFiles:"get-files",
addFile:"add-file",
addFiles:"add-file",
sort:"sort-files",
removeFile:"remove-file",
cancelFile:"cancel-file",
skipFile:"skip-file",
retry:"retry",
isInProgress:"is-in-progress",
makeThumb:"make-thumb",
md5File:"md5-file",
getDimension:"get-dimension",
addButton:"add-btn",
predictRuntimeType:"predict-runtime-type",
refresh:"refresh",
disable:"disable",
enable:"enable",
reset:"reset"
},function(e,i){
t.prototype[e]=function(){
return this.request(i,arguments);
};
}),n.extend(t.prototype,{
state:"pending",
_init:function(e){
var t=this;
t.request("init",e,function(){
t.state="ready",t.trigger("ready");
});
},
option:function(e,t){
var i=this.options;
return arguments.length>1?void(n.isPlainObject(t)&&n.isPlainObject(i[e])?n.extend(i[e],t):i[e]=t):e?i[e]:i;
},
getStats:function(){
var e=this.request("get-stats");
return e?{
successNum:e.numOfSuccess,
progressNum:e.numOfProgress,
cancelNum:e.numOfCancel,
invalidNum:e.numOfInvalid,
uploadFailNum:e.numOfUploadFailed,
queueNum:e.numOfQueue,
interruptNum:e.numofInterrupt
}:{};
},
trigger:function(e){
var t=[].slice.call(arguments,1),i=this.options,r="on"+e.substring(0,1).toUpperCase()+e.substring(1);
return s.trigger.apply(this,arguments)===!1||n.isFunction(i[r])&&i[r].apply(this,t)===!1||n.isFunction(this[r])&&this[r].apply(this,t)===!1||s.trigger.apply(s,[this,e].concat(t))===!1?!1:!0;
},
destroy:function(){
this.request("destroy",arguments),this.off();
},
request:i.noop
}),i.create=t.create=function(e){
return new t(e);
},i.Uploader=t,t;
});;define("biz_web/lib/webuploader/lib/image.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/lib/blob.js"],function(e){
function i(e){
this.options=s.extend({},i.options,e),n.call(this,"Image"),this.on("load",function(){
this._info=this.exec("info"),this._meta=this.exec("meta");
});
}
var t=e("biz_web/lib/webuploader/base.js"),n=e("biz_web/lib/webuploader/runtime/client.js"),o=e("biz_web/lib/webuploader/lib/blob.js"),s=t.$;
return i.options={
quality:90,
crop:!1,
preserveHeaders:!1,
allowMagnify:!1
},t.inherits(n,{
constructor:i,
info:function(e){
return e?(this._info=e,this):this._info;
},
meta:function(e){
return e?(this._meta=e,this):this._meta;
},
loadFromBlob:function(e){
var i=this,t=e.getRuid();
this.connectRuntime(t,function(){
i.exec("init",i.options),i.exec("loadFromBlob",e);
});
},
resize:function(){
var e=t.slice(arguments);
return this.exec.apply(this,["resize"].concat(e));
},
crop:function(){
var e=t.slice(arguments);
return this.exec.apply(this,["crop"].concat(e));
},
getAsDataUrl:function(e){
return this.exec("getAsDataUrl",e);
},
getAsBlob:function(e,i){
var t=i?this.exec("getAsBlob",e,i):this.exec("getAsBlob",e);
return new o(this.getRuid(),t);
}
}),i;
});;define("biz_web/lib/webuploader/widgets/widget.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js"],function(e){
function n(e){
if(!e)return!1;
var n=e.length,t=o.type(e);
return 1===e.nodeType&&n?!0:"array"===t||"function"!==t&&"string"!==t&&(0===n||"number"==typeof n&&n>0&&n-1 in e);
}
function t(e){
this.owner=e,this.options=e.options;
}
var i=e("biz_web/lib/webuploader/base.js"),r=e("biz_web/lib/webuploader/uploader.js"),o=i.$,s=r.prototype._init,u=r.prototype.destroy,p={},a=[];
return o.extend(t.prototype,{
init:i.noop,
invoke:function(e,n){
var t=this.responseMap;
return t&&e in t&&t[e]in this&&o.isFunction(this[t[e]])?this[t[e]].apply(this,n):p;
},
request:function(){
return this.owner.request.apply(this.owner,arguments);
}
}),o.extend(r.prototype,{
_init:function(){
var e=this,n=e._widgets=[],t=e.options.disableWidgets||"";
return o.each(a,function(i,r){
(!t||!~t.indexOf(r._name))&&n.push(new r(e));
}),s.apply(e,arguments);
},
request:function(e,t,r){
var o,s,u,a,l=0,d=this._widgets,h=d&&d.length,b=[],f=[];
for(t=n(t)?t:[t];h>l;l++)o=d[l],s=o.invoke(e,t),s!==p&&(i.isPromise(s)?f.push(s):b.push(s));
return r||f.length?(u=i.when.apply(i,f),a=u.pipe?"pipe":"then",u[a](function(){
var e=i.Deferred(),n=arguments;
return 1===n.length&&(n=n[0]),setTimeout(function(){
e.resolve(n);
},1),e.promise();
})[r?a:"done"](r||i.noop)):b[0];
},
destroy:function(){
u.apply(this,arguments),this._widgets=null;
}
}),r.register=t.register=function(e,n){
var r,s={
init:"init",
destroy:"destroy",
name:"anonymous"
};
return 1===arguments.length?(n=e,o.each(n,function(e){
return"_"===e[0]||"name"===e?void("name"===e&&(s.name=n.name)):void(s[e.replace(/[A-Z]/g,"-$&").toLowerCase()]=e);
})):s=o.extend(s,e),n.responseMap=s,r=i.inherits(t,n),r._name=s.name,a.push(r),r;
},r.unRegister=t.unRegister=function(e){
if(e&&"anonymous"!==e)for(var n=a.length;n--;)a[n]._name===e&&a.splice(n,1);
},t;
});;define("biz_web/lib/webuploader/widgets/image.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/lib/image.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
function i(e,t,s,r){
var n,a;
return e*=s.quality/100,n=o.support("html5")?t.getAsBlob(s.type,0|e):t.getAsBlob(s.type),
console.log(n.size,0|e),a=r.size,n.size<a&&s.afterCompressSizeLimit&&n.size>s.afterCompressSizeLimit&&e>40&&(r.size=n.size,
e=i(e,t,s,r).quality),{
quality:e,
blob:n
};
}
var t=e("biz_web/lib/webuploader/base.js"),o=e("biz_web/lib/webuploader/uploader.js"),s=e("biz_web/lib/webuploader/lib/image.js");
e("biz_web/lib/webuploader/widgets/widget.js");
var r,n=t.$;
return r=function(e){
var i=0,t=[],o=function(){
for(var o;t.length&&e>i;)o=t.shift(),i+=o[0],o[1]();
};
return function(e,s,r){
t.push([s,r]),e.once("destroy",function(){
i-=s,setTimeout(o,1);
}),setTimeout(o,1);
};
}(5242880),n.extend(o.options,{
thumb:{
width:110,
height:110,
quality:70,
allowMagnify:!0,
crop:!0,
preserveHeaders:!1,
type:"image/jpeg"
},
compress:{
width:1600,
height:1600,
quality:90,
allowMagnify:!1,
crop:!1,
preserveHeaders:!0
}
}),o.register({
name:"image",
makeThumb:function(e,i,t,o){
var a,l;
return e=this.request("get-file",e),e.type.match(/^image/)?(a=n.extend({},this.options.thumb),
n.isPlainObject(t)&&(a=n.extend(a,t),t=null),t=t||a.width,o=o||a.height,l=new s(a),
l.once("load",function(){
e._info=e._info||l.info(),e._meta=e._meta||l.meta(),1>=t&&t>0&&(t=e._info.width*t),
1>=o&&o>0&&(o=e._info.height*o),l.resize(t,o);
}),l.once("complete",function(){
i(!1,l.getAsDataUrl(a.type)),l.destroy();
}),l.once("error",function(e){
i(e||!0),l.destroy();
}),void r(l,e.source.size,function(){
e._info&&l.info(e._info),e._meta&&l.meta(e._meta),l.loadFromBlob(e.source);
})):void i(!0);
},
beforeSendFile:function(e){
{
var o,r,a=this.options.compress||this.options.resize,l=a&&a.compressSize||0;
a&&a.noCompressIfLarger||!1;
}
return e=this.request("get-file",e),a&&~"image/gif".indexOf(e.type)&&e.size>a.afterCompressSizeLimit?(r=t.Deferred(),
setTimeout(function(){
r.reject("F_EXCEED_COMPRESS_SIZE");
},0),r.promise()):!a||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(e.type)||e.size<l||e._compressed?void 0:(a=n.extend({},a),
r=t.Deferred(),o=new s(a),r.always(function(){
o.destroy(),o=null;
}),o.once("error",r.reject),o.once("load",function(){
var i=a.width,t=a.height;
e._info=e._info||o.info(),e._meta=e._meta||o.meta(),1>=i&&i>0&&(i=e._info.width*i),
1>=t&&t>0&&(t=e._info.height*t),a.resizeSize&&e.size<a.resizeSize&&(!a.maxResolution||e._info.width*e._info.height<a.maxResolution)?o.resize(e._info.width,e._info.height):o.resize(i,t);
}),o.once("complete",function(){
var t,s,n;
try{
s=e.size,n=i(100,o,a,{
source:e.source,
size:e.size
}),t=n.blob,(!a.noCompressIfLarger||t.size<s)&&(e.source=t,e.size=t.size,e.trigger("resize",t.size,s)),
e._compressed=!0,e.size>a.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve();
}catch(l){
e.size>a.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve();
}
}),e._info&&o.info(e._info),e._meta&&o.meta(e._meta),o.loadFromBlob(e.source),r.promise());
}
});
});;define("biz_web/lib/webuploader/file.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js"],function(t){
function e(){
return o+r++;
}
function i(t){
this.name=t.name||"Untitled",this.size=t.size||0,this.width=t.width||-1,this.height=t.height||-1,
this.type=t.type||"application/octet-stream",this.lastModifiedDate=t.lastModifiedDate||1*new Date,
this.id=e(),this.ext=u.exec(this.name)?RegExp.$1:"",this.statusText="",d[this.id]=i.Status.INITED,
this.source=t,this.loaded=0,this.on("error",function(t){
this.setStatus(i.Status.ERROR,t);
});
}
var s=t("biz_web/lib/webuploader/base.js"),n=t("biz_web/lib/webuploader/mediator.js"),a=s.$,o="WU_FILE_",r=0,u=/\.([^.]+)$/,d={};
return a.extend(i.prototype,{
setStatus:function(t,e){
var i=d[this.id];
"undefined"!=typeof e&&(this.statusText=e),t!==i&&(d[this.id]=t,this.trigger("statuschange",t,i));
},
getStatus:function(){
return d[this.id];
},
getSource:function(){
return this.source;
},
destroy:function(){
this.off(),delete d[this.id];
}
}),n.installTo(i.prototype),i.Status={
INITED:"inited",
QUEUED:"queued",
PROGRESS:"progress",
ERROR:"error",
COMPLETE:"complete",
CANCELLED:"cancelled",
INTERRUPT:"interrupt",
INVALID:"invalid"
},i;
});;define("biz_web/lib/webuploader/widgets/validator.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/file.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
var i=e("biz_web/lib/webuploader/base.js"),t=e("biz_web/lib/webuploader/uploader.js"),n=e("biz_web/lib/webuploader/file.js");
e("biz_web/lib/webuploader/widgets/widget.js");
var o,r=i.$,u={};
return o={
addValidator:function(e,i){
u[e]=i;
},
removeValidator:function(e){
delete u[e];
}
},t.register({
name:"validator",
init:function(){
var e=this;
i.nextTick(function(){
r.each(u,function(){
this.call(e.owner);
});
});
}
}),o.addValidator("fileNumLimit",function(){
var e=this,i=e.options,t=0,n=parseInt(i.fileNumLimit,10),o=!0;
n&&(e.on("beforeFileQueued",function(e){
return t>=n&&o&&(o=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",n,e),setTimeout(function(){
o=!0;
},1)),t>=n?!1:!0;
}),e.on("fileQueued",function(){
t++;
}),e.on("fileDequeued",function(){
t--;
}),e.on("reset",function(){
t=0;
}));
}),o.addValidator("fileSizeLimit",function(){
var e=this,i=e.options,t=0,n=parseInt(i.fileSizeLimit,10),o=!0;
n&&(e.on("beforeFileQueued",function(e){
var i=t+e.size>n;
return i&&o&&(o=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",n,e),setTimeout(function(){
o=!0;
},1)),i?!1:!0;
}),e.on("fileQueued",function(e){
t+=e.size;
}),e.on("fileDequeued",function(e){
t-=e.size;
}),e.on("reset",function(){
t=0;
}));
}),o.addValidator("fileSingleSizeLimit",function(){
var e=this,i=e.options,t=i.fileSingleSizeLimit;
t&&e.on("beforeFileQueued",function(e){
return e.size>t?(e.setStatus(n.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",t,e),
!1):void 0;
});
}),o.addValidator("duplicate",function(){
function e(e){
for(var i,t=0,n=0,o=e.length;o>n;n++)i=e.charCodeAt(n),t=i+(t<<6)+(t<<16)-t;
return t;
}
var i=this,t=i.options,n={};
t.duplicate||(i.on("beforeFileQueued",function(i){
var t=i.__hash||(i.__hash=e(i.name+i.size+i.lastModifiedDate));
return n[t]?(this.trigger("error","F_DUPLICATE",i),!1):void 0;
}),i.on("fileQueued",function(e){
var i=e.__hash;
i&&(n[i]=!0);
}),i.on("fileDequeued",function(e){
var i=e.__hash;
i&&delete n[i];
}),i.on("reset",function(){
n={};
}));
}),o;
});;define("biz_web/lib/webuploader/lib/transport.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/mediator.js"],function(e){
function t(e){
var i=this;
e=i.options=s.extend(!0,{},t.options,e||{}),o.call(this,"Transport"),this._blob=null,
this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),
this.on("load error",function(){
i.trigger("progress",1),clearTimeout(i._timer);
});
}
var i=e("biz_web/lib/webuploader/base.js"),o=e("biz_web/lib/webuploader/runtime/client.js"),n=e("biz_web/lib/webuploader/mediator.js"),s=i.$;
return t.options={
server:"",
method:"POST",
withCredentials:!1,
fileVal:"file",
timeout:12e4,
formData:{},
headers:{},
sendAsBinary:!1
},s.extend(t.prototype,{
appendBlob:function(e,t,i){
var o=this,n=o.options;
o.getRuid()&&o.disconnectRuntime(),o.connectRuntime(t.ruid,function(){
o.exec("init");
}),o._blob=t,n.fileVal=e||n.fileVal,n.filename=i||n.filename;
},
append:function(e,t){
"object"==typeof e?s.extend(this._formData,e):this._formData[e]=t;
},
setRequestHeader:function(e,t){
"object"==typeof e?s.extend(this._headers,e):this._headers[e]=t;
},
send:function(e){
this.exec("send",e),this._timeout();
},
abort:function(){
return clearTimeout(this._timer),this.exec("abort");
},
destroy:function(){
this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime();
},
getResponse:function(){
return this.exec("getResponse");
},
getResponseAsJson:function(){
return this.exec("getResponseAsJson");
},
getStatus:function(){
return this.exec("getStatus");
},
_timeout:function(){
var e=this,t=e.options.timeout;
t&&(clearTimeout(e._timer),e._timer=setTimeout(function(){
e.abort(),e.trigger("error","timeout");
},t));
}
}),n.installTo(t.prototype),t;
});;define("biz_web/lib/webuploader/widgets/upload.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/file.js","biz_web/lib/webuploader/lib/transport.js","biz_web/lib/webuploader/widgets/widget.js"],function(t){
function e(t,e){
var i,r,n=[],s=t.source,o=s.size,a=e?Math.ceil(o/e):1,u=0,l=0;
for(r={
file:t,
has:function(){
return!!n.length;
},
shift:function(){
return n.shift();
},
unshift:function(t){
n.unshift(t);
}
};a>l;)i=Math.min(e,o-u),n.push({
file:t,
start:u,
end:e?u+i:o,
total:o,
chunks:a,
chunk:l++,
cuted:r
}),u+=i;
return t.blocks=n.concat(),t.remaning=n.length,r;
}
var i=t("biz_web/lib/webuploader/base.js"),r=t("biz_web/lib/webuploader/uploader.js"),n=t("biz_web/lib/webuploader/file.js"),s=t("biz_web/lib/webuploader/lib/transport.js");
t("biz_web/lib/webuploader/widgets/widget.js");
var o=i.$,a=i.isPromise,u=n.Status;
o.extend(r.options,{
prepareNextFile:!1,
chunked:!1,
chunkSize:5242880,
chunkRetry:2,
threads:3,
formData:{}
}),r.register({
name:"upload",
init:function(){
var t=this.owner,e=this;
this.runing=!1,this.progress=!1,t.on("startUpload",function(){
e.progress=!0;
}).on("uploadFinished",function(){
e.progress=!1;
}),this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this.__tick=i.bindFn(this._tick,this),
t.on("uploadComplete",function(t){
t.blocks&&o.each(t.blocks,function(t,e){
e.transport&&(e.transport.abort(),e.transport.destroy()),delete e.transport;
}),delete t.blocks,delete t.remaning;
});
},
reset:function(){
this.request("stop-upload",!0),this.runing=!1,this.pool=[],this.stack=[],this.pending=[],
this.remaning=0,this._trigged=!1,this._promise=null;
},
startUpload:function(t){
var e=this;
if(o.each(e.request("get-files",u.INVALID),function(){
e.request("remove-file",this);
}),t)if(t=t.id?t:e.request("get-file",t),t.getStatus()===u.INTERRUPT)o.each(e.pool,function(e,i){
i.file===t&&i.transport&&i.transport.send();
}),t.setStatus(u.QUEUED);else{
if(t.getStatus()===u.PROGRESS)return;
t.setStatus(u.QUEUED);
}else o.each(e.request("get-files",[u.INITED]),function(){
this.setStatus(u.QUEUED);
});
if(!e.runing){
e.runing=!0;
var r=[];
o.each(e.pool,function(t,i){
var n=i.file;
n.getStatus()===u.INTERRUPT&&(r.push(n),e._trigged=!1,i.transport&&i.transport.send());
});
for(var t;t=r.shift();)t.setStatus(u.PROGRESS);
t||o.each(e.request("get-files",u.INTERRUPT),function(){
this.setStatus(u.PROGRESS);
}),e._trigged=!1,i.nextTick(e.__tick),e.owner.trigger("startUpload");
}
},
stopUpload:function(t,e){
var r=this;
if(t===!0&&(e=t,t=null),r.runing!==!1){
if(t){
if(t=t.id?t:r.request("get-file",t),t.getStatus()!==u.PROGRESS&&t.getStatus()!==u.QUEUED)return;
return t.setStatus(u.INTERRUPT),o.each(r.pool,function(e,i){
i.file===t&&(i.transport&&i.transport.abort(),r._putback(i),r._popBlock(i));
}),i.nextTick(r.__tick);
}
r.runing=!1,this._promise&&this._promise.file&&this._promise.file.setStatus(u.INTERRUPT),
e&&o.each(r.pool,function(t,e){
e.transport&&e.transport.abort(),e.file.setStatus(u.INTERRUPT);
}),r.owner.trigger("stopUpload");
}
},
cancelFile:function(t){
t=t.id?t:this.request("get-file",t),t.blocks&&o.each(t.blocks,function(t,e){
var i=e.transport;
i&&(i.abort(),i.destroy(),delete e.transport);
}),t.setStatus(u.CANCELLED),this.owner.trigger("fileDequeued",t);
},
isInProgress:function(){
return!!this.progress;
},
_getStats:function(){
return this.request("get-stats");
},
skipFile:function(t,e){
t=t.id?t:this.request("get-file",t),t.setStatus(e||u.COMPLETE),t.skipped=!0,t.blocks&&o.each(t.blocks,function(t,e){
var i=e.transport;
i&&(i.abort(),i.destroy(),delete e.transport);
}),this.owner.trigger("uploadSkip",t);
},
_tick:function(){
var t,e,r=this,n=r.options;
return r._promise?r._promise.always(r.__tick):void(r.pool.length<n.threads&&(e=r._nextBlock())?(r._trigged=!1,
t=function(t){
r._promise=null,t&&t.file&&r._startSend(t),i.nextTick(r.__tick);
},r._promise=a(e)?e.always(t):t(e)):r.remaning||r._getStats().numOfQueue||r._getStats().numofInterrupt||(r.runing=!1,
r._trigged||i.nextTick(function(){
r.owner.trigger("uploadFinished",r._getStats());
}),r._trigged=!0));
},
_putback:function(t){
var e;
t.cuted.unshift(t),e=this.stack.indexOf(t.cuted),~e||this.stack.unshift(t.cuted);
},
_getStack:function(){
for(var t,e=0;t=this.stack[e++];){
if(t.has()&&t.file.getStatus()===u.PROGRESS)return t;
(!t.has()||t.file.getStatus()!==u.PROGRESS&&t.file.getStatus()!==u.INTERRUPT)&&this.stack.splice(--e,1);
}
return null;
},
_nextBlock:function(){
var t,i,r,n,s=this,o=s.options;
return(t=this._getStack())?(o.prepareNextFile&&!s.pending.length&&s._prepareNextFile(),
t.shift()):s.runing?(!s.pending.length&&s._getStats().numOfQueue&&s._prepareNextFile(),
i=s.pending.shift(),r=function(i){
return i?(t=e(i,o.chunked?o.chunkSize:0),s.stack.push(t),t.shift()):null;
},a(i)?(n=i.file,i=i[i.pipe?"pipe":"then"](r),i.file=n,i):r(i)):void 0;
},
_prepareNextFile:function(){
var t,e=this,i=e.request("fetch-file"),r=e.pending;
i&&(t=e.request("before-send-file",i,function(){
return i.getStatus()===u.PROGRESS||i.getStatus()===u.INTERRUPT?i:e._finishFile(i);
}),e.owner.trigger("uploadStart",i),i.setStatus(u.PROGRESS),t.file=i,t.done(function(){
var e=o.inArray(t,r);
~e&&r.splice(e,1,i);
}),t.fail(function(t){
var r=e.options.compress;
i.setStatus(u.ERROR,t),"F_EXCEED_COMPRESS_SIZE"==t&&e.owner.trigger("error",t,r&&r.afterCompressSizeLimit,i),
e.owner.trigger("uploadError",i,t),e.owner.trigger("uploadComplete",i);
}),r.push(t));
},
_popBlock:function(t){
var e=o.inArray(t,this.pool);
this.pool.splice(e,1),t.file.remaning--,this.remaning--;
},
_startSend:function(t){
var e,r=this,n=t.file;
return n.getStatus()!==u.PROGRESS?void(n.getStatus()===u.INTERRUPT&&r._putback(t)):(r.pool.push(t),
r.remaning++,t.blob=1===t.chunks?n.source:n.source.slice(t.start,t.end),e=r.request("before-send",t,function(){
n.getStatus()===u.PROGRESS?r._doSend(t):(r._popBlock(t),i.nextTick(r.__tick));
}),void e.fail(function(){
1===n.remaning?r._finishFile(n).always(function(){
t.percentage=1,r._popBlock(t),r.owner.trigger("uploadComplete",n),i.nextTick(r.__tick);
}):(t.percentage=1,r.updateFileProgress(n),r._popBlock(t),i.nextTick(r.__tick));
}));
},
_doSend:function(t){
var e,r,n=this,a=n.owner,l=n.options,p=t.file,c=new s(l),d=o.extend({},l.formData),f=o.extend({},l.headers);
t.transport=c,c.on("destroy",function(){
delete t.transport,n._popBlock(t),i.nextTick(n.__tick);
}),c.on("progress",function(e){
t.percentage=e,n.updateFileProgress(p);
}),e=function(e){
var i;
return r=c.getResponseAsJson()||{},r._raw=c.getResponse(),i=function(t){
e=t;
},a.trigger("uploadAccept",t,r,i)||(e=e||"server"),e;
},c.on("error",function(i,r){
t.retried=t.retried||0,t.chunks>1&&~"http,abort".indexOf(i)&&t.retried<l.chunkRetry?(t.retried++,
c.send()):(r||"server"!==i||(i=e(i)),p.setStatus(u.ERROR,i),a.trigger("uploadError",p,i),
a.trigger("uploadComplete",p));
}),c.on("load",function(){
var t;
return(t=e())?void c.trigger("error",t,!0):void(1===p.remaning?n._finishFile(p,r):c.destroy());
}),d=o.extend(d,{
id:p.id,
name:p.name,
type:p.type,
lastModifiedDate:p.lastModifiedDate,
size:p.size
}),t.chunks>1&&o.extend(d,{
chunks:t.chunks,
chunk:t.chunk
}),a.trigger("uploadBeforeSend",t,d,f),c.appendBlob(l.fileVal,t.blob,p.name),c.append(d),
c.setRequestHeader(f),c.send();
},
_finishFile:function(t,e,i){
var r=this,n=this.owner;
return n.request("after-send-file",arguments,function(){
t.setStatus(u.COMPLETE),n.trigger("uploadSuccess",t,e,r._getStats(),i);
}).fail(function(e){
t.getStatus()===u.PROGRESS&&t.setStatus(u.ERROR,e),n.trigger("uploadError",t,e);
}).always(function(){
n.trigger("uploadComplete",t);
});
},
updateFileProgress:function(t){
var e=0,i=0;
t.blocks&&(o.each(t.blocks,function(t,e){
i+=(e.percentage||0)*(e.end-e.start);
}),e=i/t.size,this.owner.trigger("uploadProgress",t,e||0));
}
});
});;define("biz_web/lib/webuploader/widgets/runtime.js",["biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/runtime/runtime.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
var i=e("biz_web/lib/webuploader/uploader.js"),r=e("biz_web/lib/webuploader/runtime/runtime.js");
return e("biz_web/lib/webuploader/widgets/widget.js"),i.support=function(){
return r.hasRuntime.apply(r,arguments);
},i.register({
name:"runtime",
init:function(){
if(!this.predictRuntimeType())throw Error("Runtime Error");
},
predictRuntimeType:function(){
var e,i,t=this.options.runtimeOrder||r.orders,u=this.type;
if(!u)for(t=t.split(/\s*,\s*/g),e=0,i=t.length;i>e;e++)if(r.hasRuntime(t[e])){
this.type=u=t[e];
break;
}
return u;
}
});
});;define("biz_web/lib/webuploader/lib/file.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/lib/blob.js"],function(e){
function i(e,i){
var b;
this.name=i.name||"untitled"+a++,b=l.exec(i.name)?RegExp.$1.toLowerCase():"",!b&&i.type&&(b=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(i.type)?RegExp.$1.toLowerCase():"",
this.name+="."+b),this.ext=b,this.lastModifiedDate=i.lastModifiedDate||(new Date).toLocaleString(),
t.apply(this,arguments);
}
var b=e("biz_web/lib/webuploader/base.js"),t=e("biz_web/lib/webuploader/lib/blob.js"),a=1,l=/\.([^.]+)$/;
return b.inherits(t,i);
});;define("biz_web/lib/webuploader/queue.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js","biz_web/lib/webuploader/file.js"],function(e){
function t(){
this.stats={
numOfQueue:0,
numOfSuccess:0,
numOfCancel:0,
numOfProgress:0,
numOfUploadFailed:0,
numOfInvalid:0,
numofDeleted:0,
numofInterrupt:0
},this._queue=[],this._map={};
}
var u=e("biz_web/lib/webuploader/base.js"),n=e("biz_web/lib/webuploader/mediator.js"),i=e("biz_web/lib/webuploader/file.js"),s=u.$,a=i.Status;
return s.extend(t.prototype,{
append:function(e){
return this._queue.push(e),this._fileAdded(e),this;
},
prepend:function(e){
return this._queue.unshift(e),this._fileAdded(e),this;
},
getFile:function(e){
return"string"!=typeof e?e:this._map[e];
},
fetch:function(e){
var t,u,n=this._queue.length;
for(e=e||a.QUEUED,t=0;n>t;t++)if(u=this._queue[t],e===u.getStatus())return u;
return null;
},
sort:function(e){
"function"==typeof e&&this._queue.sort(e);
},
getFiles:function(){
for(var e,t=[].slice.call(arguments,0),u=[],n=0,i=this._queue.length;i>n;n++)e=this._queue[n],
(!t.length||~s.inArray(e.getStatus(),t))&&u.push(e);
return u;
},
removeFile:function(e){
var t=this._map[e.id];
t&&(delete this._map[e.id],e.destroy(),this.stats.numofDeleted++);
},
_fileAdded:function(e){
var t=this,u=this._map[e.id];
u||(this._map[e.id]=e,e.on("statuschange",function(e,u){
t._onFileStatusChange(e,u);
}));
},
_onFileStatusChange:function(e,t){
var u=this.stats;
switch(t){
case a.PROGRESS:
u.numOfProgress--;
break;

case a.QUEUED:
u.numOfQueue--;
break;

case a.ERROR:
u.numOfUploadFailed--;
break;

case a.INVALID:
u.numOfInvalid--;
break;

case a.INTERRUPT:
u.numofInterrupt--;
}
switch(e){
case a.QUEUED:
u.numOfQueue++;
break;

case a.PROGRESS:
u.numOfProgress++;
break;

case a.ERROR:
u.numOfUploadFailed++;
break;

case a.COMPLETE:
u.numOfSuccess++;
break;

case a.CANCELLED:
u.numOfCancel++;
break;

case a.INVALID:
u.numOfInvalid++;
break;

case a.INTERRUPT:
u.numofInterrupt++;
}
}
}),n.installTo(t.prototype),t;
});;define("biz_web/lib/webuploader/widgets/queue.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/queue.js","biz_web/lib/webuploader/file.js","biz_web/lib/webuploader/lib/file.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
var t=e("biz_web/lib/webuploader/base.js"),i=e("biz_web/lib/webuploader/uploader.js"),r=e("biz_web/lib/webuploader/queue.js"),u=e("biz_web/lib/webuploader/file.js"),s=e("biz_web/lib/webuploader/lib/file.js"),n=e("biz_web/lib/webuploader/runtime/client.js");
e("biz_web/lib/webuploader/widgets/widget.js");
var l=t.$,a=u.Status;
return i.register({
name:"queue",
init:function(e){
var i,u,s,a,o,b,c,d=this;
if(l.isPlainObject(e.accept)&&(e.accept=[e.accept]),e.accept){
for(o=[],s=0,u=e.accept.length;u>s;s++)a=e.accept[s].extensions,a&&o.push(a);
o.length&&(b="\\."+o.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),d.accept=new RegExp(b,"i");
}
return d.queue=new r,d.stats=d.queue.stats,"html5"===this.request("predict-runtime-type")?(i=t.Deferred(),
this.placeholder=c=new n("Placeholder"),c.connectRuntime({
runtimeOrder:"html5"
},function(){
d._ruid=c.getRuid(),i.resolve();
}),i.promise()):void 0;
},
_wrapFile:function(e){
if(!(e instanceof u)){
if(!(e instanceof s)){
if(!this._ruid)throw new Error("Can't add external files.");
e=new s(this._ruid,e);
}
e=new u(e);
}
return e;
},
acceptFile:function(e){
var t=!e||!e.size||this.accept&&!this.accept.test(e.name);
return!t;
},
_addFile:function(e){
var t=this;
return e=t._wrapFile(e),t.owner.trigger("beforeFileQueued",e)?t.acceptFile(e)?(t.queue.append(e),
t.owner.trigger("fileQueued",e),e):void t.owner.trigger("error","Q_TYPE_DENIED",e):void 0;
},
getFile:function(e){
return this.queue.getFile(e);
},
addFile:function(e){
var t=this;
e.length||(e=[e]),e=l.map(e,function(e){
return t._addFile(e);
}),t.owner.trigger("filesQueued",e),t.options.auto&&setTimeout(function(){
t.request("start-upload");
},20);
},
getStats:function(){
return this.stats;
},
removeFile:function(e,t){
var i=this;
e=e.id?e:i.queue.getFile(e),this.request("cancel-file",e),t&&this.queue.removeFile(e);
},
getFiles:function(){
return this.queue.getFiles.apply(this.queue,arguments);
},
fetchFile:function(){
return this.queue.fetch.apply(this.queue,arguments);
},
retry:function(e,t){
var i,r,u,s=this;
if(e)return e=e.id?e:s.queue.getFile(e),e.setStatus(a.QUEUED),void(t||s.request("start-upload"));
for(i=s.queue.getFiles(a.ERROR),r=0,u=i.length;u>r;r++)e=i[r],e.setStatus(a.QUEUED);
s.request("start-upload");
},
sortFiles:function(){
return this.queue.sort.apply(this.queue,arguments);
},
reset:function(){
this.owner.trigger("reset"),this.queue=new r,this.stats=this.queue.stats;
},
destroy:function(){
this.reset(),this.placeholder&&this.placeholder.destroy();
}
});
});;define("biz_web/lib/webuploader/lib/filepicker.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/lib/file.js","biz_web/lib/webuploader/lib/image.js"],function(e){
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
});;define("biz_web/lib/webuploader/widgets/filepicker.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/lib/filepicker.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
var i=e("biz_web/lib/webuploader/base.js"),t=e("biz_web/lib/webuploader/uploader.js"),n=e("biz_web/lib/webuploader/lib/filepicker.js");
e("biz_web/lib/webuploader/widgets/widget.js");
var r=i.$;
return r.extend(t.options,{
pick:null,
accept:null
}),t.register({
name:"picker",
init:function(e){
return this.pickers=[],e.pick&&this.addBtn(e.pick);
},
refresh:function(){
r.each(this.pickers,function(){
this.refresh();
});
},
addBtn:function(e){
var t=this,s=t.options,b=s.accept,c=[];
if(e)return r.isPlainObject(e)||(e={
id:e
}),r(e.id).each(function(){
var l,a,d;
d=i.Deferred(),l=r.extend({},e,{
accept:r.isPlainObject(b)?[b]:b,
swf:s.swf,
runtimeOrder:s.runtimeOrder,
imageSize:s.imageSize,
id:this
}),a=new n(l),a.once("ready",d.resolve),a.on("select",function(e){
t.owner.request("add-file",[e]);
}),a.init(),t.pickers.push(a),c.push(d.promise());
}),i.when.apply(i,c);
},
disable:function(){
r.each(this.pickers,function(){
this.disable();
});
},
enable:function(){
r.each(this.pickers,function(){
this.enable();
});
},
destroy:function(){
r.each(this.pickers,function(){
this.destroy();
}),this.pickers=null;
}
});
});;define("biz_web/lib/webuploader.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/widgets/filepicker.js","biz_web/lib/webuploader/widgets/queue.js","biz_web/lib/webuploader/widgets/runtime.js","biz_web/lib/webuploader/widgets/upload.js","biz_web/lib/webuploader/widgets/validator.js","biz_web/lib/webuploader/widgets/image.js","biz_web/lib/webuploader/runtime/html5/blob.js","biz_web/lib/webuploader/runtime/html5/filepicker.js","biz_web/lib/webuploader/runtime/html5/imagemeta/exif.js","biz_web/lib/webuploader/runtime/html5/transport.js","biz_web/lib/webuploader/runtime/html5/image.js","biz_web/lib/webuploader/runtime/flash/filepicker.js","biz_web/lib/webuploader/runtime/flash/transport.js","biz_web/lib/webuploader/runtime/flash/blob.js","biz_web/lib/webuploader/runtime/flash/image.js"],function(e){
var b=e("biz_web/lib/webuploader/base.js");
return e("biz_web/lib/webuploader/widgets/filepicker.js"),e("biz_web/lib/webuploader/widgets/queue.js"),
e("biz_web/lib/webuploader/widgets/runtime.js"),e("biz_web/lib/webuploader/widgets/upload.js"),
e("biz_web/lib/webuploader/widgets/validator.js"),e("biz_web/lib/webuploader/widgets/image.js"),
e("biz_web/lib/webuploader/runtime/html5/blob.js"),e("biz_web/lib/webuploader/runtime/html5/filepicker.js"),
e("biz_web/lib/webuploader/runtime/html5/imagemeta/exif.js"),e("biz_web/lib/webuploader/runtime/html5/transport.js"),
e("biz_web/lib/webuploader/runtime/html5/image.js"),e("biz_web/lib/webuploader/runtime/flash/filepicker.js"),
e("biz_web/lib/webuploader/runtime/flash/transport.js"),e("biz_web/lib/webuploader/runtime/flash/blob.js"),
e("biz_web/lib/webuploader/runtime/flash/image.js"),b;
});;