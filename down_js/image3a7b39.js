define("biz_web/lib/webuploader/lib/image.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/lib/blob.js"],function(e){
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
});