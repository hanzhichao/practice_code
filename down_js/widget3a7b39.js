define("biz_web/lib/webuploader/widgets/widget.js",["biz_web/lib/webuploader/base.js","biz_web/lib/webuploader/uploader.js"],function(e){
function n(e){
if(!e)return!1;
var n=e.length,t=o.type(e);
return 1===e.nodeType&&n?!0:"array"===t||"function"!==t&&"string"!==t&&(0===n||"number"==typeof n&&n>0&&n-1 in e);
}
function t(e){
this.owner=e,this.options=e.options;
}
var i=e("biz_web/lib/webuploader/base.js"),r=e("biz_web/lib/webuploader/uploader.js"),o=i.$,s=r.prototype._init,u=r.prototype.destroy,p={},a=[];
return o.extend(t.prototype,{
init:i.noop,
invoke:function(e,n){
var t=this.responseMap;
return t&&e in t&&t[e]in this&&o.isFunction(this[t[e]])?this[t[e]].apply(this,n):p;
},
request:function(){
return this.owner.request.apply(this.owner,arguments);
}
}),o.extend(r.prototype,{
_init:function(){
var e=this,n=e._widgets=[],t=e.options.disableWidgets||"";
return o.each(a,function(i,r){
(!t||!~t.indexOf(r._name))&&n.push(new r(e));
}),s.apply(e,arguments);
},
request:function(e,t,r){
var o,s,u,a,l=0,d=this._widgets,h=d&&d.length,b=[],f=[];
for(t=n(t)?t:[t];h>l;l++)o=d[l],s=o.invoke(e,t),s!==p&&(i.isPromise(s)?f.push(s):b.push(s));
return r||f.length?(u=i.when.apply(i,f),a=u.pipe?"pipe":"then",u[a](function(){
var e=i.Deferred(),n=arguments;
return 1===n.length&&(n=n[0]),setTimeout(function(){
e.resolve(n);
},1),e.promise();
})[r?a:"done"](r||i.noop)):b[0];
},
destroy:function(){
u.apply(this,arguments),this._widgets=null;
}
}),r.register=t.register=function(e,n){
var r,s={
init:"init",
destroy:"destroy",
name:"anonymous"
};
return 1===arguments.length?(n=e,o.each(n,function(e){
return"_"===e[0]||"name"===e?void("name"===e&&(s.name=n.name)):void(s[e.replace(/[A-Z]/g,"-$&").toLowerCase()]=e);
})):s=o.extend(s,e),n.responseMap=s,r=i.inherits(t,n),r._name=s.name,a.push(r),r;
},r.unRegister=t.unRegister=function(e){
if(e&&"anonymous"!==e)for(var n=a.length;n--;)a[n]._name===e&&a.splice(n,1);
},t;
});