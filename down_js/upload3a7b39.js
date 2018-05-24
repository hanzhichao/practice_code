define("biz_web/lib/webuploader/widgets/upload.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/file.js","biz_web/lib/webuploader/lib/transport.js","biz_web/lib/webuploader/widgets/widget.js"],function(t){
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
});