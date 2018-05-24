define("biz_web/lib/webuploader/mediator.js",["biz_web/lib/webuploader/base.js"],function(t){
function n(t,n,e,i){
return u.grep(t,function(t){
return!(!t||n&&t.e!==n||e&&t.cb!==e&&t.cb._cb!==e||i&&t.ctx!==i);
});
}
function e(t,n,e){
u.each((t||"").split(o),function(t,i){
e(i,n);
});
}
function i(t,n){
for(var e,i=!1,r=-1,s=t.length;++r<s;)if(e=t[r],e.cb.apply(e.ctx2,n)===!1){
i=!0;
break;
}
return!i;
}
var r,s=t("biz_web/lib/webuploader/base.js"),u=s.$,c=[].slice,o=/\s+/;
return r={
on:function(t,n,i){
var r,s=this;
return n?(r=this._events||(this._events=[]),e(t,n,function(t,n){
var e={
e:t
};
e.cb=n,e.ctx=i,e.ctx2=i||s,e.id=r.length,r.push(e);
}),this):this;
},
once:function(t,n,i){
var r=this;
return n?(e(t,n,function(t,n){
var e=function(){
return r.off(t,e),n.apply(i||r,arguments);
};
e._cb=n,r.on(t,e,i);
}),r):r;
},
off:function(t,i,r){
var s=this._events;
return s?t||i||r?(e(t,i,function(t,e){
u.each(n(s,t,e,r),function(){
delete s[this.id];
});
}),this):(this._events=[],this):this;
},
trigger:function(t){
var e,r,s;
return this._events&&t?(e=c.call(arguments,1),r=n(this._events,t),s=n(this._events,"all"),
i(r,e)&&i(s,arguments)):this;
}
},u.extend({
installTo:function(t){
return u.extend(t,r);
}
},r);
});