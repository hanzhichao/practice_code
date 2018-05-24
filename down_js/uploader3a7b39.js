define("biz_web/lib/webuploader/uploader.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js"],function(e){
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
});