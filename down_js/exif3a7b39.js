define("biz_web/lib/webuploader/runtime/html5/imagemeta/exif.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/html5/imagemeta.js"],function(e){
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
});