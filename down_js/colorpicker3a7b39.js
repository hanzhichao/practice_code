define("common/lib/colorpicker.js",["widget/colorpicker/colorpicker.css"],function(t){
t("widget/colorpicker/colorpicker.css");
var e;
return function(t,o,i){
function s(e){
if(t.event&&t.event.contentOverflow!==i)return{
x:t.event.offsetX,
y:t.event.offsetY
};
if(e.offsetX!==i&&e.offsetY!==i)return{
x:e.offsetX,
y:e.offsetY
};
var o=e.target.parentNode.parentNode;
return{
x:e.layerX-o.offsetLeft,
y:e.layerY-o.offsetTop
};
}
function r(t,e,i){
t=o.createElementNS(y,t);
for(var s in e)t.setAttribute(s,e[s]);
"[object Array]"!=Object.prototype.toString.call(i)&&(i=[i]);
for(var r=0,n=i[0]&&i.length||0;n>r;r++)t.appendChild(i[r]);
return t;
}
function n(t){
var e,o,i,s,r,n=t.h%360/60;
r=t.v*t.s,s=r*(1-Math.abs(n%2-1)),e=o=i=t.v-r,n=~~n,e+=[r,s,0,0,s,r][n],o+=[s,r,r,s,0,0][n],
i+=[0,0,s,r,r,s][n];
var l=Math.floor(255*e),a=Math.floor(255*o),c=Math.floor(255*i);
return{
r:l,
g:a,
b:c,
hex:"#"+(16777216|c|a<<8|l<<16).toString(16).slice(1)
};
}
function l(t){
var e=t.r,o=t.g,i=t.b;
(t.r>1||t.g>1||t.b>1)&&(e/=255,o/=255,i/=255);
var s,r,n,l;
return n=Math.max(e,o,i),l=n-Math.min(e,o,i),s=0==l?null:n==e?(o-i)/l+(i>o?6:0):n==o?(i-e)/l+2:(e-o)/l+4,
s=s%6*60,r=0==l?0:l/n,{
h:s,
s:r,
v:n
};
}
function a(e,o,r){
return function(l){
l=l||t.event;
var a=s(l);
e.h=a.y/o.offsetHeight*360+g;
var c=n({
h:e.h,
s:1,
v:1
}),f=n({
h:e.h,
s:e.s,
v:e.v
});
return r.style.backgroundColor=c.hex,e.callback&&e.callback(f.hex,{
h:e.h-g,
s:e.s,
v:e.v
},{
r:f.r,
g:f.g,
b:f.b
},i,a),l.stopPropagation?(l.stopPropagation(),l.preventDefault()):l.cancelBubble=!0,
!1;
};
}
function c(e,o){
return function(i){
i=i||t.event;
var r=s(i),l=o.offsetWidth,a=o.offsetHeight;
e.s=r.x/l,e.v=(a-r.y)/a;
var c=n(e);
return e.callback&&e.callback(c.hex,{
h:e.h-g,
s:e.s,
v:e.v
},{
r:c.r,
g:c.g,
b:c.b
},r),i.stopPropagation?(i.stopPropagation(),i.preventDefault()):i.cancelBubble=!0,
!1;
};
}
function f(t,e,o){
t.attachEvent?t.attachEvent("on"+e,o):t.addEventListener&&t.addEventListener(e,o,!1);
}
function p(t,e,o){
var i=!1;
f(e,"mousedown",function(){
i=!0;
}),f(e,"mouseup",function(){
i=!1;
}),f(e,"mouseout",function(){
i=!1;
}),f(e,"mousemove",function(t){
i&&o(t);
});
}
function h(t,e,o,i){
t.h=e.h%360,t.s=e.s,t.v=e.v;
var s=n(t),r={
y:t.h*t.slideElement.offsetHeight/360,
x:0
},l=t.pickerElement.offsetHeight,a={
x:t.s*t.pickerElement.offsetWidth,
y:l-t.v*l
};
return t.pickerElement.style.backgroundColor=n({
h:t.h,
s:1,
v:1
}).hex,t.callback&&t.callback(i||s.hex,{
h:t.h,
s:t.s,
v:t.v
},o||{
r:s.r,
g:s.g,
b:s.b
},a,r),t;
}
var d,v,u=t.SVGAngle||o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML",g=15,y="http://www.w3.org/2000/svg",m=['<div class="picker-wrapper">','<div class="picker"></div>','<div class="picker-indicator"></div>',"</div>",'<div class="slide-wrapper">','<div class="slide"></div>','<div class="slide-indicator"></div>',"</div>"].join("");
"SVG"==u?(v=r("svg",{
xmlns:"http://www.w3.org/2000/svg",
version:"1.1",
width:"100%",
height:"100%"
},[r("defs",{},r("linearGradient",{
id:"gradient-hsv",
x1:"0%",
y1:"100%",
x2:"0%",
y2:"0%"
},[r("stop",{
offset:"0%",
"stop-color":"#FF0000",
"stop-opacity":"1"
}),r("stop",{
offset:"13%",
"stop-color":"#FF00FF",
"stop-opacity":"1"
}),r("stop",{
offset:"25%",
"stop-color":"#8000FF",
"stop-opacity":"1"
}),r("stop",{
offset:"38%",
"stop-color":"#0040FF",
"stop-opacity":"1"
}),r("stop",{
offset:"50%",
"stop-color":"#00FFFF",
"stop-opacity":"1"
}),r("stop",{
offset:"63%",
"stop-color":"#00FF40",
"stop-opacity":"1"
}),r("stop",{
offset:"75%",
"stop-color":"#0BED00",
"stop-opacity":"1"
}),r("stop",{
offset:"88%",
"stop-color":"#FFFF00",
"stop-opacity":"1"
}),r("stop",{
offset:"100%",
"stop-color":"#FF0000",
"stop-opacity":"1"
})])),r("rect",{
x:"0",
y:"0",
width:"100%",
height:"100%",
fill:"url(#gradient-hsv)"
})]),d=r("svg",{
xmlns:"http://www.w3.org/2000/svg",
version:"1.1",
width:"100%",
height:"100%"
},[r("defs",{},[r("linearGradient",{
id:"gradient-black",
x1:"0%",
y1:"100%",
x2:"0%",
y2:"0%"
},[r("stop",{
offset:"0%",
"stop-color":"#000000",
"stop-opacity":"1"
}),r("stop",{
offset:"100%",
"stop-color":"#CC9A81",
"stop-opacity":"0"
})]),r("linearGradient",{
id:"gradient-white",
x1:"0%",
y1:"100%",
x2:"100%",
y2:"100%"
},[r("stop",{
offset:"0%",
"stop-color":"#FFFFFF",
"stop-opacity":"1"
}),r("stop",{
offset:"100%",
"stop-color":"#CC9A81",
"stop-opacity":"0"
})])]),r("rect",{
x:"0",
y:"0",
width:"100%",
height:"100%",
fill:"url(#gradient-white)"
}),r("rect",{
x:"0",
y:"0",
width:"100%",
height:"100%",
fill:"url(#gradient-black)"
})])):"VML"==u&&(v=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',"</v:rect>","</DIV>"].join(""),
d=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>",'<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>","</DIV>"].join(""),
o.namespaces.v||o.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"));
var b=0;
e=function(t,o,i){
if(!(this instanceof e))return new e(t,o,i);
if(this.h=0,this.s=1,this.v=1,i)this.callback=i,this.pickerElement=o,this.slideElement=t;else{
var s=t;
s.innerHTML=m,this.slideElement=s.getElementsByClassName("slide")[0],this.pickerElement=s.getElementsByClassName("picker")[0];
var r=s.getElementsByClassName("slide-indicator")[0],n=s.getElementsByClassName("picker-indicator")[0];
e.fixIndicators(r,n),this.callback=function(t,i,s,l,a){
e.positionIndicators(r,n,a,l),o(t,i,s);
};
}
if("SVG"==u){
var l=v.cloneNode(!0),h=d.cloneNode(!0),g=l.getElementById("gradient-hsv"),y=l.getElementsByTagName("rect")[0];
g.id="gradient-hsv-"+b,y.setAttribute("fill","url(#"+g.id+")");
var x=[h.getElementById("gradient-black"),h.getElementById("gradient-white")],k=h.getElementsByTagName("rect");
x[0].id="gradient-black-"+b,x[1].id="gradient-white-"+b,k[0].setAttribute("fill","url(#"+x[1].id+")"),
k[1].setAttribute("fill","url(#"+x[0].id+")"),this.slideElement.appendChild(l),this.pickerElement.appendChild(h),
b++;
}else this.slideElement.innerHTML=v,this.pickerElement.innerHTML=d;
f(this.slideElement,"click",a(this,this.slideElement,this.pickerElement)),f(this.pickerElement,"click",c(this,this.pickerElement)),
p(this,this.slideElement,a(this,this.slideElement,this.pickerElement)),p(this,this.pickerElement,c(this,this.pickerElement));
},e.hsv2rgb=function(t){
var e=n(t);
return delete e.hex,e;
},e.hsv2hex=function(t){
return n(t).hex;
},e.rgb2hsv=l,e.rgb2hex=function(t){
return n(l(t)).hex;
},e.hex2hsv=function(t){
return l(e.hex2rgb(t));
},e.hex2rgb=function(t){
return{
r:parseInt(t.substr(1,2),16),
g:parseInt(t.substr(3,2),16),
b:parseInt(t.substr(5,2),16)
};
},e.prototype.setHsv=function(t){
return h(this,t);
},e.prototype.setRgb=function(t){
return h(this,l(t),t);
},e.prototype.setHex=function(t){
return h(this,e.hex2hsv(t),i,t);
},e.positionIndicators=function(t,e,o,i){
o&&(t.style.top=o.y-t.offsetHeight/2+"px"),i&&(e.style.top=i.y-e.offsetHeight/2+"px",
e.style.left=i.x-e.offsetWidth/2+"px");
},e.fixIndicators=function(t,e){
e.style.pointerEvents="none",t.style.pointerEvents="none";
};
}(window,window.document),e;
});