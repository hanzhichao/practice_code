define("common/lib/jquery.Jcrop.js",["jquery.Jcrop.min.css"],function(e){
e("jquery.Jcrop.min.css"),function(e){
e.Jcrop=function(t,n){
function o(e){
return Math.round(e)+"px";
}
function r(e){
return R.baseClass+"-"+e;
}
function a(){
return e.fx.step.hasOwnProperty("backgroundColor");
}
function i(t){
var n=e(t).offset();
return[n.left,n.top];
}
function s(e){
return[e.pageX-A[0]+R.offsetX,e.pageY-A[1]+R.offsetY];
}
function c(t){
"object"!=typeof t&&(t={}),R=e.extend(R,t),e.each(["onChange","onSelect","onRelease","onDblClick"],function(e,t){
"function"!=typeof R[t]&&(R[t]=function(){});
});
}
function u(e,t,n){
if(A=i(N),Ct.setCursor("move"===e?e:e+"-resize"),"move"===e)return Ct.activateHandlers(l(t),b,n);
var o=yt.getFixed(),r=f(e),a=yt.getCorner(f(r));
yt.setPressed(yt.getCorner(r)),yt.setCurrent(a),Ct.activateHandlers(d(e,o),b,n);
}
function d(e,t){
return function(n){
if(R.aspectRatio)switch(e){
case"e":
n[1]=t.y+1;
break;

case"w":
n[1]=t.y+1;
break;

case"n":
n[0]=t.x+1;
break;

case"s":
n[0]=t.x+1;
}else switch(e){
case"e":
n[1]=t.y2;
break;

case"w":
n[1]=t.y2;
break;

case"n":
n[0]=t.x2;
break;

case"s":
n[0]=t.x2;
}
yt.setCurrent(n),xt.update();
};
}
function l(e){
var t=e;
return St.watchKeys(),function(e){
yt.moveOffset([e[0]-t[0],e[1]-t[1]]),t=e,xt.update();
};
}
function f(e){
switch(e){
case"n":
return"sw";

case"s":
return"nw";

case"e":
return"nw";

case"w":
return"ne";

case"ne":
return"sw";

case"nw":
return"se";

case"se":
return"nw";

case"sw":
return"ne";
}
}
function h(e){
return function(t){
return R.disabled?!1:"move"!==e||R.allowMove?(A=i(N),lt=!0,u(e,s(t)),t.stopPropagation(),
t.preventDefault(),!1):!1;
};
}
function p(e,t){
var n=e.width(),o=e.height();
n=t,o=t/e.width()*e.height(),ut=e.width()/n,dt=e.height()/o,e.width(n).height(o);
}
function g(e){
return{
x:e.x*ut,
y:e.y*dt,
x2:e.x2*ut,
y2:e.y2*dt,
w:e.w*ut,
h:e.h*dt
};
}
function b(){
var e=yt.getFixed();
e.w>R.minSelect[0]&&e.h>R.minSelect[1]?(xt.enableHandles(),xt.done()):xt.release(),
Ct.setCursor(R.allowSelect?"crosshair":"default");
}
function w(e){
if(R.disabled)return!1;
if(!R.allowSelect)return!1;
lt=!0,A=i(N),xt.disableHandles(),Ct.setCursor("crosshair");
var t=s(e);
return yt.setPressed(t),xt.update(),Ct.activateHandlers(v,b,"touch"===e.type.substring(0,5)),
St.watchKeys(),e.stopPropagation(),e.preventDefault(),!1;
}
function v(e){
yt.setCurrent(e),xt.update();
}
function y(){
var t=e("<div></div>").addClass(r("tracker"));
return K&&t.css({
opacity:0,
backgroundColor:"white"
}),t;
}
function m(e){
et.removeClass().addClass(r("holder")).addClass(e);
}
function x(e,t){
function n(){
window.setTimeout(v,l);
}
var o=e[0]/ut,r=e[1]/dt,a=e[2]/ut,i=e[3]/dt;
if(!ft){
var s=yt.flipCoords(o,r,a,i),c=yt.getFixed(),u=[c.x,c.y,c.x2,c.y2],d=u,l=R.animationDelay,f=s[0]-u[0],h=s[1]-u[1],p=s[2]-u[2],g=s[3]-u[3],b=0,w=R.swingSpeed;
o=d[0],r=d[1],a=d[2],i=d[3],xt.animMode(!0);
var v=function(){
return function(){
b+=(100-b)/w,d[0]=Math.round(o+b/100*f),d[1]=Math.round(r+b/100*h),d[2]=Math.round(a+b/100*p),
d[3]=Math.round(i+b/100*g),b>=99.8&&(b=100),100>b?(S(d),n()):(xt.done(),xt.animMode(!1),
"function"==typeof t&&t.call(kt));
};
}();
n();
}
}
function C(e){
S([e[0]/ut,e[1]/dt,e[2]/ut,e[3]/dt]),R.onSelect.call(kt,g(yt.getFixed())),xt.enableHandles();
}
function S(e){
yt.setPressed([e[0],e[1]]),yt.setCurrent([e[2],e[3]]),xt.update();
}
function k(){
var e=yt.getFixed();
return g({
x:e.x-R.offsetX,
y:e.y-R.offsetY,
x2:e.x2-R.offsetX,
y2:e.y2-R.offsetY,
w:e.w,
h:e.h
});
}
function M(){
var e=yt.getFixed();
return{
x:e.x-R.offsetX,
y:e.y-R.offsetY,
x2:e.x2-R.offsetX,
y2:e.y2-R.offsetY,
w:e.w,
h:e.h
};
}
function z(e,t){
c(e),t!==!0&&X();
}
function O(){
R.disabled=!0,xt.disableHandles(),xt.setCursor("default"),Ct.setCursor("default");
}
function j(){
R.disabled=!1,X();
}
function B(){
xt.done(),Ct.activateHandlers(null,null);
}
function F(){
et.remove(),W.show(),W.css("visibility","visible"),e(t).removeData("Jcrop");
}
function H(){
return{
w:N.width(),
h:N.height()
};
}
function I(){
var e=H(),t=e.w,n=e.h,o=R.offsetX,r=R.offsetY,a=o+t,i=r+n;
U=o,Z=r,$=a,_=i,R.maxBound&&4==R.maxBound.length&&(U=Math.max(U,R.maxBound[0]),Z=Math.max(Z,R.maxBound[1]),
$=Math.min($,R.maxBound[2]),_=Math.min(_,R.maxBound[3]));
}
function P(e){
R.offsetX=e.offsetX,R.offsetY=e.offsetY,I();
}
function D(e){
ut=e.xscale,dt=e.yscale,I(),yt.setPressed([e.selectionPos[0],e.selectionPos[1]]),
yt.setCurrent([e.selectionPos[2],e.selectionPos[3]]),X();
}
function J(e,t){
xt.release(),O();
var n=new Image;
n.onload=function(){
var o=n.width,r=n.height,a=R.boxWidth,i=R.boxHeight;
N.width(o).height(r),N.attr("src",e),tt.attr("src",e),p(N,a,i);
var s=N.width(),c=N.height();
tt.width(s).height(c),gt.width(s+2*pt).height(c+2*pt),et.width(s).height(c),I(),
mt.resize(s,c),j(),"function"==typeof t&&t.call(kt);
},n.src=e;
}
function Y(e,t,n){
var o=t||R.bgColor;
R.bgFade&&a()&&R.fadeTime&&!n?e.animate({
backgroundColor:o
},{
queue:!1,
duration:R.fadeTime
}):e.css("backgroundColor",o);
}
function X(e){
if(R.allowResize?e?xt.enableOnly():xt.enableHandles():xt.disableHandles(),Ct.setCursor(R.allowSelect?"crosshair":"default"),
xt.setCursor(R.allowMove?"move":"default"),R.hasOwnProperty("trueSize")){
var t=H();
ut=R.trueSize[0]/t.w,dt=R.trueSize[1]/t.h;
}
R.hasOwnProperty("setSelect")&&(C(R.setSelect),xt.done(),delete R.setSelect),mt.refresh(),
R.bgColor!=bt&&(Y(R.shade?mt.getShades():et,R.shade?R.shadeColor||R.bgColor:R.bgColor),
bt=R.bgColor),wt!=R.bgOpacity&&(wt=R.bgOpacity,R.shade?mt.refresh():xt.setBgOpacity(wt)),
at=R.maxSize[0]||0,it=R.maxSize[1]||0,st=R.minSize[0]||0,ct=R.minSize[1]||0,R.hasOwnProperty("outerImage")&&(N.attr("src",R.outerImage),
delete R.outerImage),xt.refresh();
}
var A,R=e.extend({},e.Jcrop.defaults),T=navigator.userAgent.toLowerCase(),K=/msie/.test(T),q=/msie [1-6]\./.test(T);
"object"!=typeof t&&(t=e(t)[0]),"object"!=typeof n&&(n={}),c(n);
var E={
border:"none",
visibility:"visible",
margin:0,
padding:0,
position:"absolute",
top:0,
left:0
},W=e(t),L=!0;
if("IMG"==t.tagName){
if(0!=W[0].width&&0!=W[0].height)W.width(W[0].width),W.height(W[0].height);else{
var G=new Image;
G.src=W[0].src,W.width(G.width),W.height(G.height);
}
var N=W.clone().removeAttr("id").css(E).show();
N.width(W.width()),N.height(W.height()),W.after(N).hide();
}else N=W.css(E).show(),L=!1,null===R.shade&&(R.shade=!0);
p(N,R.boxWidth,R.boxHeight);
var V=N.width(),Q=N.height(),U=0,Z=0,$=V+U,_=Q+Z,et=e("<div />").width(V).height(Q).addClass(r("holder")).css({
position:"relative",
backgroundColor:R.bgColor
}).insertAfter(W).append(N);
I(),R.addClass&&et.addClass(R.addClass);
var tt=e("<div />"),nt=e("<div />").width("100%").height("100%").css({
zIndex:310,
position:"absolute",
overflow:"hidden"
}),ot=e("<div />").width("100%").height("100%").css("zIndex",320),rt=e("<div />").css({
position:"absolute",
zIndex:600
}).dblclick(function(){
var e=yt.getFixed();
R.onDblClick.call(kt,e);
}).insertBefore(N).append(nt,ot);
L&&(tt=e("<img />").attr("src",N.attr("src")).css(E).width(V).height(Q),nt.append(tt)),
q&&rt.css({
overflowY:"hidden"
});
var at,it,st,ct,ut,dt,lt,ft,ht,pt=R.boundary,gt=y().width(V+2*pt).height(Q+2*pt).css({
position:"absolute",
top:o(-pt),
left:o(-pt),
zIndex:290
}).mousedown(w),bt=R.bgColor,wt=R.bgOpacity;
A=i(N);
var vt=function(){
function e(){
var e,t={},n=["touchstart","touchmove","touchend"],o=document.createElement("div");
try{
for(e=0;e<n.length;e++){
var r=n[e];
r="on"+r;
var a=r in o;
a||(o.setAttribute(r,"return;"),a="function"==typeof o[r]),t[n[e]]=a;
}
return t.touchstart&&t.touchend&&t.touchmove;
}catch(i){
return!1;
}
}
function t(){
return R.touchSupport===!0||R.touchSupport===!1?R.touchSupport:e();
}
return{
createDragger:function(e){
return function(t){
return R.disabled?!1:"move"!==e||R.allowMove?(A=i(N),lt=!0,u(e,s(vt.cfilter(t)),!0),
t.stopPropagation(),t.preventDefault(),!1):!1;
};
},
newSelection:function(e){
return w(vt.cfilter(e));
},
cfilter:function(e){
return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,
e;
},
isSupported:e,
support:t()
};
}(),yt=function(){
function e(e){
e=i(e),p=f=e[0],g=h=e[1];
}
function t(e){
e=i(e),d=e[0]-p,l=e[1]-g,p=e[0],g=e[1];
}
function n(){
return[d,l];
}
function o(e){
var t=e[0],n=e[1];
U>f+t&&(t=U-f),Z>h+n&&(n=Z-h),g+n>_&&(n=_-g),p+t>$&&(t=$-p),f+=t,p+=t,h+=n,g+=n;
}
function r(e){
var t=a();
switch(e){
case"ne":
return[t.x2,t.y];

case"nw":
return[t.x,t.y];

case"se":
return[t.x2,t.y2];

case"sw":
return[t.x,t.y2];
}
}
function a(){
if(!R.aspectRatio)return c();
var e,t,n,o,r=R.aspectRatio,a=R.minSize[0]/ut,i=R.maxSize[0]/ut,d=R.maxSize[1]/dt,l=p-f,b=g-h,w=Math.abs(l),v=Math.abs(b),y=w/v;
return 0===i&&(i=10*($-U)),0===d&&(d=10*(_-Z)),r>y?(t=g,n=v*r,e=0>l?f-n:n+f,0>e?(e=0,
o=Math.abs((e-f)/r),t=0>b?h-o:o+h):e>$&&(e=$,o=Math.abs((e-f)/r),t=0>b?h-o:o+h)):(e=p,
o=w/r,t=0>b?h-o:h+o,0>t?(t=0,n=Math.abs((t-h)*r),e=0>l?f-n:n+f):t>_&&(t=_,n=Math.abs(t-h)*r,
e=0>l?f-n:n+f)),e>f?(a>e-f?e=f+a:e-f>i&&(e=f+i),t=t>h?h+(e-f)/r:h-(e-f)/r):f>e&&(a>f-e?e=f-a:f-e>i&&(e=f-i),
t=t>h?h+(f-e)/r:h-(f-e)/r),0>e?(f-=e,e=0):e>$&&(f-=e-$,e=$),0>t?(h-=t,t=0):t>_&&(h-=t-_,
t=_),u(s(f,h,e,t));
}
function i(e){
return e[0]<U&&(e[0]=U),e[1]<Z&&(e[1]=Z),e[0]>$&&(e[0]=$),e[1]>_&&(e[1]=_),[Math.round(e[0]),Math.round(e[1])];
}
function s(e,t,n,o){
var r=e,a=n,i=t,s=o;
return e>n&&(r=n,a=e),t>o&&(i=o,s=t),[r,i,a,s];
}
function c(){
var e,t=p-f,n=g-h;
return at&&Math.abs(t)>at&&(p=t>0?f+at:f-at),it&&Math.abs(n)>it&&(g=n>0?h+it:h-it),
ct/dt&&Math.abs(n)<ct/dt&&(g=n>0?h+ct/dt:h-ct/dt),st/ut&&Math.abs(t)<st/ut&&(p=t>0?f+st/ut:f-st/ut),
p>$&&(e=p-$,f-=e,p-=e),g>_&&(e=g-_,h-=e,g-=e),f>$&&(e=f-_,g-=e,h-=e),h>_&&(e=h-_,
g-=e,h-=e),u(s(f,h,p,g));
}
function u(e){
return{
x:e[0],
y:e[1],
x2:e[2],
y2:e[3],
w:e[2]-e[0],
h:e[3]-e[1]
};
}
var d,l,f=0,h=0,p=0,g=0;
return{
flipCoords:s,
setPressed:e,
setCurrent:t,
getOffset:n,
moveOffset:o,
getCorner:r,
getFixed:a
};
}(),mt=function(){
function t(e,t){
p.left.css({
height:o(t)
}),p.right.css({
height:o(t)
});
}
function n(){
return r(yt.getFixed());
}
function r(e){
p.top.css({
left:o(e.x),
width:o(e.w),
height:o(e.y)
}),p.bottom.css({
top:o(e.y2),
left:o(e.x),
width:o(e.w),
height:o(_-e.y2)
}),p.right.css({
left:o(e.x2),
width:o($-e.x2)
}),p.left.css({
width:o(e.x)
});
}
function a(){
return e("<div />").css({
position:"absolute",
backgroundColor:R.shadeColor||R.bgColor
}).appendTo(h);
}
function i(){
f||(f=!0,h.insertBefore(N),n(),xt.setBgOpacity(1,0,1),tt.hide(),s(R.shadeColor||R.bgColor,1),
xt.isAwake()?u(R.bgOpacity,1):u(1,1));
}
function s(e,t){
Y(l(),e,t);
}
function c(){
f&&(h.remove(),tt.show(),f=!1,xt.isAwake()?xt.setBgOpacity(R.bgOpacity,1,1):(xt.setBgOpacity(1,1,1),
xt.disableHandles()),Y(et,0,1));
}
function u(e,t){
f&&(R.bgFade&&!t?h.animate({
opacity:1-e
},{
queue:!1,
duration:R.fadeTime
}):h.css({
opacity:1-e
}));
}
function d(){
R.shade?i():c(),xt.isAwake()&&u(R.bgOpacity);
}
function l(){
return h.children();
}
var f=!1,h=e("<div />").css({
position:"absolute",
zIndex:240,
opacity:0
}),p={
top:a(),
left:a().height(_-Z),
right:a().height(_-Z),
bottom:a()
};
return{
update:n,
updateRaw:r,
getShades:l,
setBgColor:s,
enable:i,
disable:c,
resize:t,
refresh:d,
opacity:u
};
}(),xt=function(){
function t(t){
var n=e("<div />").css({
position:"absolute",
opacity:R.borderOpacity
}).addClass(r(t));
return nt.append(n),n;
}
function n(t,n){
var o=e("<div />").mousedown(h(t)).css({
cursor:t+"-resize",
position:"absolute",
zIndex:n
}).addClass("ord-"+t);
return vt.support&&o.bind("touchstart.jcrop",vt.createDragger(t)),ot.append(o),o;
}
function a(e){
var t=R.handleSize,o=n(e,O++).css({
opacity:R.handleOpacity
}).addClass(r("handle"));
return t&&o.width(t).height(t),o;
}
function i(e){
return n(e,O++).addClass("jcrop-dragbar");
}
function s(e){
var t;
for(t=0;t<e.length;t++)F[e[t]]=i(e[t]);
}
function c(e){
var n,o;
for(o=0;o<e.length;o++){
switch(e[o]){
case"n":
n="hline";
break;

case"s":
n="hline bottom";
break;

case"e":
n="vline right";
break;

case"w":
n="vline";
}
j[e[o]]=t(n);
}
}
function u(e){
var t;
for(t=0;t<e.length;t++)B[e[t]]=a(e[t]);
}
function d(e,t){
R.shade||tt.css({
top:o(-t+R.offsetY||0),
left:o(-e+R.offsetX||0)
}),rt.css({
top:o(t),
left:o(e)
});
}
function l(e,t){
rt.width(Math.round(e)).height(Math.round(t));
}
function f(){
var e=yt.getFixed();
yt.setPressed([e.x,e.y]),yt.setCurrent([e.x2,e.y2]),p();
}
function p(e){
return z?b(e):void 0;
}
function b(e){
var t=yt.getFixed();
l(t.w,t.h),d(t.x,t.y),R.shade&&mt.updateRaw(t),z||v(),e?R.onSelect.call(kt,g(t)):R.onChange.call(kt,g(t),t);
}
function w(e,t,n){
(z||t)&&(R.bgFade&&!n?N.animate({
opacity:e
},{
queue:!1,
duration:R.fadeTime
}):N.css("opacity",e));
}
function v(){
rt.show(),R.shade?mt.opacity(wt):w(wt,!0),z=!0;
}
function m(){
S(),rt.hide(),R.shade?mt.opacity(1):w(1),z=!1,R.onRelease.call(kt);
}
function x(){
H&&ot.show();
}
function C(){
return H=!0,R.allowResize?(ot.show(),!0):void 0;
}
function S(){
H=!1,ot.hide();
}
function k(e){
e?(ft=!0,S()):(ft=!1,C());
}
function M(){
k(!1),f();
}
var z,O=370,j={},B={},F={},H=!1;
R.dragEdges&&e.isArray(R.createDragbars)&&s(R.createDragbars),e.isArray(R.createHandles)&&u(R.createHandles),
R.drawBorders&&e.isArray(R.createBorders)&&c(R.createBorders),e(document).bind("touchstart.jcrop-ios",function(t){
e(t.currentTarget).hasClass("jcrop-tracker")&&t.stopPropagation();
});
var I=y().mousedown(h("move")).css({
cursor:"move",
position:"absolute",
zIndex:360
});
return vt.support&&I.bind("touchstart.jcrop",vt.createDragger("move")),nt.append(I),
S(),{
updateVisible:p,
update:b,
release:m,
refresh:f,
isAwake:function(){
return z;
},
setCursor:function(e){
I.css("cursor",e);
},
enableHandles:C,
enableOnly:function(){
H=!0;
},
showHandles:x,
disableHandles:S,
animMode:k,
setBgOpacity:w,
done:M
};
}(),Ct=function(){
function t(t){
gt.css({
zIndex:450
}),t?e(document).bind("touchmove.jcrop",i).bind("touchend.jcrop",c):f&&e(document).bind("mousemove.jcrop",o).bind("mouseup.jcrop",r);
}
function n(){
gt.css({
zIndex:290
}),e(document).unbind(".jcrop");
}
function o(e){
return d&&d(s(e)),!1;
}
function r(e){
return e.preventDefault(),e.stopPropagation(),lt&&(lt=!1,l&&l(s(e)),xt.isAwake()&&R.onSelect.call(kt,g(yt.getFixed())),
n(),d=function(){},l=function(){}),!1;
}
function a(e,n,o){
return lt=!0,d=e,l=n,t(o),!1;
}
function i(e){
return d&&d(s(vt.cfilter(e))),!1;
}
function c(e){
return r(vt.cfilter(e));
}
function u(e){
gt.css("cursor",e);
}
var d=function(){},l=function(){},f=R.trackDocument;
return f||gt.mousemove(o).mouseup(r).mouseout(r),N.before(gt),{
activateHandlers:a,
setCursor:u
};
}(),St=function(){
function t(){
R.keySupport&&(a.show(),a.focus());
}
function n(){
a.hide();
}
function o(e,t,n){
R.allowMove&&(yt.moveOffset([t,n]),xt.updateVisible(!0)),e.preventDefault(),e.stopPropagation();
}
function r(e){
if(e.ctrlKey||e.metaKey)return!0;
ht=e.shiftKey?!0:!1;
var t=ht?10:1;
switch(e.keyCode){
case 37:
o(e,-t,0);
break;

case 39:
o(e,t,0);
break;

case 38:
o(e,0,-t);
break;

case 40:
o(e,0,t);
break;

case 27:
R.allowSelect&&xt.release();
break;

case 9:
return!0;
}
return!1;
}
var a=e('<input type="radio" />').css({
position:"fixed",
left:"-120px",
width:"12px"
}).addClass("jcrop-keymgr"),i=e("<div />").css({
position:"absolute",
overflow:"hidden"
}).append(a);
return R.keySupport&&(a.keydown(r).blur(n),q||!R.fixedSupport?(a.css({
position:"absolute",
left:"-20px"
}),i.append(a).insertBefore(N)):a.insertBefore(N)),{
watchKeys:t
};
}();
vt.support&&gt.bind("touchstart.jcrop",vt.newSelection),ot.hide(),X(!0);
var kt={
updateOffset:P,
changeImgScale:D,
setImage:J,
animateTo:x,
setSelect:C,
setOptions:z,
tellSelect:k,
tellScaled:M,
setClass:m,
disable:O,
enable:j,
cancel:B,
release:xt.release,
destroy:F,
focus:St.watchKeys,
getBounds:function(){
return[($-U)*ut,(_-Z)*dt];
},
getWidgetSize:function(){
return[$-U,_-Z];
},
getScaleFactor:function(){
return[ut,dt];
},
getOptions:function(){
return R;
},
ui:{
botImg:N,
topImg:tt,
trk:gt,
holder:et,
selection:rt
}
};
return K&&et.bind("selectstart",function(){
return!1;
}),W.data("Jcrop",kt),kt;
},e.fn.Jcrop=function(t,n){
var o;
return this.each(function(){
if(e(this).data("Jcrop")){
if("api"===t)return e(this).data("Jcrop");
e(this).data("Jcrop").setOptions(t);
}else"IMG"==this.tagName?e.Jcrop.Loader(this,function(){
e(this).css({
display:"block",
visibility:"hidden"
}),o=e.Jcrop(this,t),e.isFunction(n)&&n.call(o);
}):(e(this).css({
display:"block",
visibility:"hidden"
}),o=e.Jcrop(this,t),e.isFunction(n)&&n.call(o));
}),this;
},e.Jcrop.Loader=function(t,n,o){
function r(){
i.complete?(a.unbind(".jcloader"),e.isFunction(n)&&n.call(i)):window.setTimeout(r,50);
}
var a=e(t),i=a[0];
a.bind("load.jcloader",r).bind("error.jcloader",function(){
a.unbind(".jcloader"),e.isFunction(o)&&o.call(i);
}),i.complete&&e.isFunction(n)&&(a.unbind(".jcloader"),n.call(i));
},e.Jcrop.defaults={
allowSelect:!0,
allowMove:!0,
allowResize:!0,
trackDocument:!0,
offsetX:0,
offsetY:0,
baseClass:"jcrop",
addClass:null,
bgColor:"transparent",
bgOpacity:.6,
bgFade:!1,
borderOpacity:.4,
handleOpacity:.5,
handleSize:null,
aspectRatio:0,
keySupport:!0,
createHandles:["n","s","e","w","nw","ne","se","sw"],
createDragbars:["n","s","e","w"],
createBorders:["n","s","e","w"],
drawBorders:!0,
dragEdges:!0,
fixedSupport:!0,
touchSupport:null,
shade:null,
boxWidth:0,
boxHeight:0,
boundary:2,
fadeTime:400,
animationDelay:20,
swingSpeed:3,
minSelect:[0,0],
maxSize:[0,0],
minSize:[0,0],
maxBound:null,
onChange:function(){},
onSelect:function(){},
onDblClick:function(){},
onRelease:function(){}
};
}(jQuery);
});