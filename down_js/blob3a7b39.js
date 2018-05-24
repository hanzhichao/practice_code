define("biz_web/lib/webuploader/lib/blob.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/client.js"],function(e){
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
});