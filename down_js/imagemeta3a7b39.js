define("biz_web/lib/webuploader/runtime/html5/imagemeta.js",["biz_web/lib/webuploader/runtime/html5/util.js"],function(e){
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
});