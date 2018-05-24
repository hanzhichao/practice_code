define("biz_web/lib/webuploader/runtime/flash/runtime.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/runtime/runtime.js","biz_web/lib/webuploader/runtime/compbase.js"],function(e){
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
});