define("biz_web/lib/webuploader/widgets/validator.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js","biz_web/lib/webuploader/file.js","biz_web/lib/webuploader/widgets/widget.js"],function(e){
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
});