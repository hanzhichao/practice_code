define("biz_web/lib/webuploader/lib/transport.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js","biz_web/lib/webuploader/mediator.js"],function(e){
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
});