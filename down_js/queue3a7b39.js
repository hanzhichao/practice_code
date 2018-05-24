define("biz_web/lib/webuploader/queue.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/mediator.js","biz_web/lib/webuploader/file.js"],function(e){
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
});