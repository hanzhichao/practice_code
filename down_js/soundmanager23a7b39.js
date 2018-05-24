define("biz_web/lib/soundmanager2.js",[],function(){
"use strict";
function e(e,n){
function o(e){
return pt.preferFlash&&rt&&!pt.ignoreFlash&&pt.flash[e]!==t&&pt.flash[e];
}
function i(e){
return function(t){
var n,o=this._s;
return o&&o._a?n=e.call(this,t):(pt._wD(o&&o.id?o.id+": Ignoring "+t.type:wt+"Ignoring "+t.type),
n=null),n;
};
}
this.setupOptions={
url:e||null,
flashVersion:8,
debugMode:!1,
debugFlash:!1,
useConsole:!1,
consoleOnly:!0,
waitForWindowLoad:!1,
bgColor:"#ffffff",
useHighPerformance:!1,
flashPollingInterval:null,
html5PollingInterval:null,
flashLoadTimeout:1e3,
wmode:null,
allowScriptAccess:"always",
useFlashBlock:!1,
useHTML5Audio:!0,
html5Test:/^(probably|maybe)$/i,
preferFlash:!0,
noSWFCache:!1,
idPrefix:"sound"
},this.defaultOptions={
autoLoad:!1,
autoPlay:!1,
from:null,
loops:1,
onid3:null,
onload:null,
whileloading:null,
onplay:null,
onpause:null,
onresume:null,
whileplaying:null,
onposition:null,
onstop:null,
onfailure:null,
onfinish:null,
multiShot:!0,
multiShotEvents:!1,
position:null,
pan:0,
stream:!0,
to:null,
type:null,
usePolicyFile:!1,
volume:100
},this.flash9Options={
isMovieStar:null,
usePeakData:!1,
useWaveformData:!1,
useEQData:!1,
onbufferchange:null,
ondataerror:null
},this.movieStarOptions={
bufferTime:3,
serverURL:null,
onconnect:null,
duration:null
},this.audioFormats={
mp3:{
type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],
required:!0
},
mp4:{
related:["aac","m4a","m4b"],
type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],
required:!1
},
ogg:{
type:["audio/ogg; codecs=vorbis"],
required:!1
},
opus:{
type:["audio/ogg; codecs=opus","audio/opus"],
required:!1
},
wav:{
type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],
required:!1
}
},this.movieID="sm2-container",this.id=n||"sm2movie",this.debugID="soundmanager-debug",
this.debugURLParam=/([#?&])debug=1/i,this.versionNumber="V2.97a.20130512",this.version=null,
this.movieURL=null,this.altURL=null,this.swfLoaded=!1,this.enabled=!1,this.oMC=null,
this.sounds={},this.soundIDs=[],this.muted=!1,this.didFlashBlock=!1,this.filePattern=null,
this.filePatterns={
flash8:/\.mp3(\?.*)?$/i,
flash9:/\.mp3(\?.*)?$/i
},this.features={
buffering:!1,
peakData:!1,
waveformData:!1,
eqData:!1,
movieStar:!1
},this.sandbox={
type:null,
types:{
remote:"remote (domain-based) rules",
localWithFile:"local with file access (no internet access)",
localWithNetwork:"local with network (internet access only, no local access)",
localTrusted:"local, trusted (local+internet access)"
},
description:null,
noRemote:null,
noLocal:null
},this.html5={
usingFlash:null
},this.flash={},this.html5Only=!1,this.ignoreFlash=!1;
var a,s,r,l,u,d,f,h,c,p,m,_,g,y,w,v,b,O,D,M,L,T,P,S,F,I,H,E,A,k,C,x,R,N,U,B,W,j,q,V,Q,$,K,J,X,z,G,Z,Y,et,tt,nt,ot,it,at,st,rt,lt,ut,dt,ft,ht,ct,pt=this,mt=null,_t=null,gt="soundManager",yt=gt+": ",wt="HTML5::",vt=navigator.userAgent,bt=window.location.href.toString(),Ot=document,Dt=[],Mt=!0,Lt=!1,Tt=!1,Pt=!1,St=!1,Ft=!1,It=0,Ht=["log","info","warn","error"],Et=8,At=null,kt=null,Ct=!1,xt=!1,Rt=0,Nt=null,Ut=[],Bt=null,Wt=Array.prototype.slice,jt=!1,qt=0,Vt=vt.match(/(ipad|iphone|ipod)/i),Qt=vt.match(/android/i),$t=vt.match(/msie/i),Kt=vt.match(/webkit/i),Jt=vt.match(/safari/i)&&!vt.match(/chrome/i),Xt=vt.match(/opera/i),zt=vt.match(/firefox/i),Gt=vt.match(/(mobile|pre\/|xoom)/i)||Vt||Qt,Zt=!bt.match(/usehtml5audio/i)&&!bt.match(/sm2\-ignorebadua/i)&&Jt&&!vt.match(/silk/i)&&vt.match(/OS X 10_6_([3-7])/i),Yt=window.console!==t&&console.log!==t,en=Ot.hasFocus!==t?Ot.hasFocus():null,tn=Jt&&(Ot.hasFocus===t||!Ot.hasFocus()),nn=!tn,on=/(mp3|mp4|mpa|m4a|m4b)/i,an=1e3,sn="about:blank",rn=Ot.location?Ot.location.protocol.match(/http/i):null,ln=rn?"":"http://",un=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,dn=["mpeg4","aac","flv","mov","mp4","m4v","f4v","m4a","m4b","mp4v","3gp","3g2"],fn=new RegExp("\\.("+dn.join("|")+")(\\?.*)?$","i");
this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,this.useAltURL=!rn,
W={
swfBox:"sm2-object-box",
swfDefault:"movieContainer",
swfError:"swf_error",
swfTimedout:"swf_timedout",
swfLoaded:"swf_loaded",
swfUnblocked:"swf_unblocked",
sm2Debug:"sm2_debug",
highPerf:"high_performance",
flashDebug:"flash_debug"
},this.hasHTML5=function(){
try{
return Audio!==t&&(Xt&&opera!==t&&opera.version()<10?new Audio(null):new Audio).canPlayType!==t;
}catch(e){
return!1;
}
}(),this.setup=function(e){
var n=!pt.url;
return e!==t&&Pt&&Bt&&pt.ok()&&(e.flashVersion!==t||e.url!==t||e.html5Test!==t)&&Q(N("setupLate")),
m(e),e&&(n&&F&&e.url!==t&&pt.beginDelayedInit(),F||e.url===t||"complete"!==Ot.readyState||setTimeout(P,1)),
pt;
},this.ok=function(){
return Bt?Pt&&!St:pt.useHTML5Audio&&pt.hasHTML5;
},this.supported=this.ok,this.getMovie=function(e){
return s(e)||Ot[e]||window[e];
},this.createSound=function(e,n){
function o(){
return r=q(r),pt.sounds[r.id]=new a(r),pt.soundIDs.push(r.id),pt.sounds[r.id];
}
var i,s,r,l=null;
if(i=gt+".createSound(): ",s=i+N(Pt?"notOK":"notReady"),!Pt||!pt.ok())return Q(s),
!1;
if(n!==t&&(e={
id:e,
url:n
}),r=p(e),r.url=z(r.url),void 0===r.id&&(r.id=pt.setupOptions.idPrefix+qt++),r.id.toString().charAt(0).match(/^[0-9]$/)&&pt._wD(i+N("badID",r.id),2),
pt._wD(i+r.id+(r.url?" ("+r.url+")":""),1),$(r.id,!0))return pt._wD(i+r.id+" exists",1),
pt.sounds[r.id];
if(Y(r))l=o(),pt._wD(r.id+": Using HTML5"),l._setup_html5(r);else{
if(pt.html5Only)return pt._wD(r.id+": No HTML5 support for this sound, and no Flash. Exiting."),
o();
if(pt.html5.usingFlash&&r.url&&r.url.match(/data\:/i))return pt._wD(r.id+": data: URIs not supported via Flash. Exiting."),
o();
d>8&&(null===r.isMovieStar&&(r.isMovieStar=!!(r.serverURL||(r.type?r.type.match(un):!1)||r.url&&r.url.match(fn))),
r.isMovieStar&&(pt._wD(i+"using MovieStar handling"),r.loops>1&&h("noNSLoop"))),
r=V(r,i),l=o(),8===d?_t._createSound(r.id,r.loops||1,r.usePolicyFile):(_t._createSound(r.id,r.url,r.usePeakData,r.useWaveformData,r.useEQData,r.isMovieStar,r.isMovieStar?r.bufferTime:!1,r.loops||1,r.serverURL,r.duration||null,r.autoPlay,!0,r.autoLoad,r.usePolicyFile),
r.serverURL||(l.connected=!0,r.onconnect&&r.onconnect.apply(l))),r.serverURL||!r.autoLoad&&!r.autoPlay||l.load(r);
}
return!r.serverURL&&r.autoPlay&&l.play(),l;
},this.destroySound=function(e,t){
if(!$(e))return!1;
var n,o=pt.sounds[e];
for(o._iO={},o.stop(),o.unload(),n=0;n<pt.soundIDs.length;n++)if(pt.soundIDs[n]===e){
pt.soundIDs.splice(n,1);
break;
}
return t||o.destruct(!0),o=null,delete pt.sounds[e],!0;
},this.load=function(e,t){
return $(e)?pt.sounds[e].load(t):!1;
},this.unload=function(e){
return $(e)?pt.sounds[e].unload():!1;
},this.onPosition=function(e,t,n,o){
return $(e)?pt.sounds[e].onposition(t,n,o):!1;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t,n){
return $(e)?pt.sounds[e].clearOnPosition(t,n):!1;
},this.play=function(e,t){
var n=null,o=t&&!(t instanceof Object);
if(!Pt||!pt.ok())return Q(gt+".play(): "+N(Pt?"notOK":"notReady")),!1;
if($(e,o))o&&(t={
url:t
});else{
if(!o)return!1;
o&&(t={
url:t
}),t&&t.url&&(pt._wD(gt+'.play(): Attempting to create "'+e+'"',1),t.id=e,n=pt.createSound(t).play());
}
return null===n&&(n=pt.sounds[e].play(t)),n;
},this.start=this.play,this.setPosition=function(e,t){
return $(e)?pt.sounds[e].setPosition(t):!1;
},this.stop=function(e){
return $(e)?(pt._wD(gt+".stop("+e+")",1),pt.sounds[e].stop()):!1;
},this.stopAll=function(){
var e;
pt._wD(gt+".stopAll()",1);
for(e in pt.sounds)pt.sounds.hasOwnProperty(e)&&pt.sounds[e].stop();
},this.pause=function(e){
return $(e)?pt.sounds[e].pause():!1;
},this.pauseAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].pause();
},this.resume=function(e){
return $(e)?pt.sounds[e].resume():!1;
},this.resumeAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].resume();
},this.togglePause=function(e){
return $(e)?pt.sounds[e].togglePause():!1;
},this.setPan=function(e,t){
return $(e)?pt.sounds[e].setPan(t):!1;
},this.setVolume=function(e,t){
return $(e)?pt.sounds[e].setVolume(t):!1;
},this.mute=function(e){
var t=0;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.mute(): Muting "'+e+'"'),
pt.sounds[e].mute()):!1;
for(pt._wD(gt+".mute(): Muting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].mute();
return pt.muted=!0,!0;
},this.muteAll=function(){
pt.mute();
},this.unmute=function(e){
var t;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.unmute(): Unmuting "'+e+'"'),
pt.sounds[e].unmute()):!1;
for(pt._wD(gt+".unmute(): Unmuting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].unmute();
return pt.muted=!1,!0;
},this.unmuteAll=function(){
pt.unmute();
},this.toggleMute=function(e){
return $(e)?pt.sounds[e].toggleMute():!1;
},this.getMemoryUse=function(){
var e=0;
return _t&&8!==d&&(e=parseInt(_t._getMemoryUse(),10)),e;
},this.disable=function(e){
var n;
if(e===t&&(e=!1),St)return!1;
for(St=!0,h("shutdown",1),n=pt.soundIDs.length-1;n>=0;n--)C(pt.sounds[pt.soundIDs[n]]);
return c(e),at.remove(window,"load",w),!0;
},this.canPlayMIME=function(e){
var t;
return pt.hasHTML5&&(t=et({
type:e
})),!t&&Bt&&(t=e&&pt.ok()?!!((d>8?e.match(un):null)||e.match(pt.mimePattern)):null),
t;
},this.canPlayURL=function(e){
var t;
return pt.hasHTML5&&(t=et({
url:e
})),!t&&Bt&&(t=e&&pt.ok()?!!e.match(pt.filePattern):null),t;
},this.canPlayLink=function(e){
return e.type!==t&&e.type&&pt.canPlayMIME(e.type)?!0:pt.canPlayURL(e.href);
},this.getSoundById=function(e,t){
if(!e)return null;
var n=pt.sounds[e];
return n||t||pt._wD(gt+'.getSoundById(): Sound "'+e+'" not found.',2),n;
},this.onready=function(e,t){
var n="onready",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y(),o=!0,o;
},this.ontimeout=function(e,t){
var n="ontimeout",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y({
type:n
}),o=!0,o;
},this._writeDebug=function(e,n){
var o,i,a="soundmanager-debug";
return pt.debugMode?Yt&&pt.useConsole&&(n&&"object"==typeof n?console.log(e,n):Ht[n]!==t?console[Ht[n]](e):console.log(e),
pt.consoleOnly)?!0:(o=s(a))?(i=Ot.createElement("div"),++It%2===0&&(i.className="sm2-alt"),
n=n===t?0:parseInt(n,10),i.appendChild(Ot.createTextNode(e)),n&&(n>=2&&(i.style.fontWeight="bold"),
3===n&&(i.style.color="#ff3333")),o.insertBefore(i,o.firstChild),o=null,!0):!1:!1;
},-1!==bt.indexOf("sm2-debug=alert")&&(this._writeDebug=function(e){
window.alert(e);
}),this._wD=this._writeDebug,this._debug=function(){
var e,t;
for(h("currentObj",1),e=0,t=pt.soundIDs.length;t>e;e++)pt.sounds[pt.soundIDs[e]]._debug();
},this.reboot=function(e,t){
pt.soundIDs.length&&pt._wD("Destroying "+pt.soundIDs.length+" SMSound object"+(1!==pt.soundIDs.length?"s":"")+"...");
var n,o,i;
for(n=pt.soundIDs.length-1;n>=0;n--)pt.sounds[pt.soundIDs[n]].destruct();
if(_t)try{
$t&&(kt=_t.innerHTML),At=_t.parentNode.removeChild(_t);
}catch(a){
h("badRemove",2);
}
if(kt=At=Bt=_t=null,pt.enabled=F=Pt=Ct=xt=Lt=Tt=St=jt=pt.swfLoaded=!1,pt.soundIDs=[],
pt.sounds={},qt=0,e)Dt=[];else for(n in Dt)if(Dt.hasOwnProperty(n))for(o=0,i=Dt[n].length;i>o;o++)Dt[n][o].fired=!1;
return t||pt._wD(gt+": Rebooting..."),pt.html5={
usingFlash:null
},pt.flash={},pt.html5Only=!1,pt.ignoreFlash=!1,window.setTimeout(function(){
T(),t||pt.beginDelayedInit();
},20),pt;
},this.reset=function(){
return h("reset"),pt.reboot(!0,!0);
},this.getMoviePercent=function(){
return _t&&"PercentLoaded"in _t?_t.PercentLoaded():null;
},this.beginDelayedInit=function(){
Ft=!0,P(),setTimeout(function(){
return xt?!1:(H(),L(),xt=!0,!0);
},20),v();
},this.destruct=function(){
pt._wD(gt+".destruct()"),pt.disable(!0);
},a=function(e){
var n,o,i,a,s,r,l,u,c,m,_=this,g=!1,y=[],w=0,v=null;
c={
duration:null,
time:null
},this.id=e.id,this.sID=this.id,this.url=e.url,this.options=p(e),this.instanceOptions=this.options,
this._iO=this.instanceOptions,this.pan=this.options.pan,this.volume=this.options.volume,
this.isHTML5=!1,this._a=null,m=this.url?!1:!0,this.id3={},this._debug=function(){
pt._wD(_.id+": Merged options:",_.options);
},this.load=function(e){
var n,o=null;
if(e!==t?_._iO=p(e,_.options):(e=_.options,_._iO=e,v&&v!==_.url&&(h("manURL"),_._iO.url=_.url,
_.url=null)),_._iO.url||(_._iO.url=_.url),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,
n=_._iO,pt._wD(_.id+": load ("+n.url+")"),!n.url&&!_.url)return pt._wD(_.id+": load(): url is unassigned. Exiting.",2),
_;
if(_.isHTML5||8!==d||_.url||n.autoPlay||pt._wD(_.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1),
n.url===_.url&&0!==_.readyState&&2!==_.readyState)return h("onURL",1),3===_.readyState&&n.onload&&ct(_,function(){
n.onload.apply(_,[!!_.duration]);
}),_;
if(_.loaded=!1,_.readyState=1,_.playState=0,_.id3={},Y(n))o=_._setup_html5(n),o._called_load?pt._wD(_.id+": Ignoring request to load again"):(_._html5_canplay=!1,
_.url!==n.url&&(pt._wD(h("manURL")+": "+n.url),_._a.src=n.url,_.setPosition(0)),
_._a.autobuffer="auto",_._a.preload="auto",_._a._called_load=!0,n.autoPlay&&_.play());else{
if(pt.html5Only)return pt._wD(_.id+": No flash support. Exiting."),_;
if(_._iO.url&&_._iO.url.match(/data\:/i))return pt._wD(_.id+": data: URIs not supported via Flash. Exiting."),
_;
try{
_.isHTML5=!1,_._iO=V(q(n)),n=_._iO,8===d?_t._load(_.id,n.url,n.stream,n.autoPlay,n.usePolicyFile):_t._load(_.id,n.url,!!n.stream,!!n.autoPlay,n.loops||1,!!n.autoLoad,n.usePolicyFile);
}catch(i){
h("smError",2),f("onload",!1),E({
type:"SMSOUND_LOAD_JS_EXCEPTION",
fatal:!0
});
}
}
return _.url=n.url,_;
},this.unload=function(){
return 0!==_.readyState&&(pt._wD(_.id+": unload()"),_.isHTML5?(a(),_._a&&(_._a.pause(),
v=nt(_._a))):8===d?_t._unload(_.id,sn):_t._unload(_.id),n()),_;
},this.destruct=function(e){
pt._wD(_.id+": Destruct"),_.isHTML5?(a(),_._a&&(_._a.pause(),nt(_._a),jt||i(),_._a._s=null,
_._a=null)):(_._iO.onfailure=null,_t._destroySound(_.id)),e||pt.destroySound(_.id,!0);
},this.play=function(e,n){
var o,i,a,l,f,h,c,y=!0,w=null;
if(o=_.id+": play(): ",n=n===t?!0:n,e||(e={}),_.url&&(_._iO.url=_.url),_._iO=p(_._iO,_.options),
_._iO=p(e,_._iO),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,!_.isHTML5&&_._iO.serverURL&&!_.connected)return _.getAutoPlay()||(pt._wD(o+" Netstream not connected yet - setting autoPlay"),
_.setAutoPlay(!0)),_;
if(Y(_._iO)&&(_._setup_html5(_._iO),s()),1!==_.playState||_.paused||(i=_._iO.multiShot,
i?pt._wD(o+"Already playing (multi-shot)",1):(pt._wD(o+"Already playing (one-shot)",1),
_.isHTML5&&_.setPosition(_._iO.position),w=_)),null!==w)return w;
if(e.url&&e.url!==_.url&&(_.readyState||_.isHTML5||8!==d||!m?_.load(_._iO):m=!1),
_.loaded?pt._wD(o.substr(0,o.lastIndexOf(":"))):0===_.readyState?(pt._wD(o+"Attempting to load"),
_.isHTML5||pt.html5Only?_.isHTML5?_.load(_._iO):(pt._wD(o+"Unsupported type. Exiting."),
w=_):(_._iO.autoPlay=!0,_.load(_._iO)),_.instanceOptions=_._iO):2===_.readyState?(pt._wD(o+"Could not load - exiting",2),
w=_):pt._wD(o+"Loading - attempting to play..."),null!==w)return w;
if(!_.isHTML5&&9===d&&_.position>0&&_.position===_.duration&&(pt._wD(o+"Sound at end, resetting to position:0"),
e.position=0),_.paused&&_.position>=0&&(!_._iO.serverURL||_.position>0))pt._wD(o+"Resuming from paused state",1),
_.resume();else{
if(_._iO=p(e,_._iO),null!==_._iO.from&&null!==_._iO.to&&0===_.instanceCount&&0===_.playState&&!_._iO.serverURL){
if(l=function(){
_._iO=p(e,_._iO),_.play(_._iO);
},_.isHTML5&&!_._html5_canplay?(pt._wD(o+"Beginning load for from/to case"),_.load({
oncanplay:l
}),w=!1):_.isHTML5||_.loaded||_.readyState&&2===_.readyState||(pt._wD(o+"Preloading for from/to case"),
_.load({
onload:l
}),w=!1),null!==w)return w;
_._iO=u();
}
(!_.instanceCount||_._iO.multiShotEvents||_.isHTML5&&_._iO.multiShot&&!jt||!_.isHTML5&&d>8&&!_.getAutoPlay())&&_.instanceCount++,
_._iO.onposition&&0===_.playState&&r(_),_.playState=1,_.paused=!1,_.position=_._iO.position===t||isNaN(_._iO.position)?0:_._iO.position,
_.isHTML5||(_._iO=V(q(_._iO))),_._iO.onplay&&n&&(_._iO.onplay.apply(_),g=!0),_.setVolume(_._iO.volume,!0),
_.setPan(_._iO.pan,!0),_.isHTML5?_.instanceCount<2?(s(),a=_._setup_html5(),_.setPosition(_._iO.position),
a.play()):(pt._wD(_.id+": Cloning Audio() for instance #"+_.instanceCount+"..."),
f=new Audio(_._iO.url),h=function(){
at.remove(f,"onended",h),_._onfinish(_),nt(f),f=null;
},c=function(){
at.remove(f,"canplay",c);
try{
f.currentTime=_._iO.position/an;
}catch(e){
Q(_.id+": multiShot play() failed to apply position of "+_._iO.position/an);
}
f.play();
},at.add(f,"ended",h),_._iO.position?at.add(f,"canplay",c):f.play()):(y=_t._start(_.id,_._iO.loops||1,9===d?_.position:_.position/an,_._iO.multiShot||!1),
9!==d||y||(pt._wD(o+"No sound hardware, or 32-sound ceiling hit",2),_._iO.onplayerror&&_._iO.onplayerror.apply(_)));
}
return _;
},this.start=this.play,this.stop=function(e){
var t,n=_._iO;
return 1===_.playState&&(pt._wD(_.id+": stop()"),_._onbufferchange(0),_._resetOnPosition(0),
_.paused=!1,_.isHTML5||(_.playState=0),l(),n.to&&_.clearOnPosition(n.to),_.isHTML5?_._a&&(t=_.position,
_.setPosition(0),_.position=t,_._a.pause(),_.playState=0,_._onTimer(),a()):(_t._stop(_.id,e),
n.serverURL&&_.unload()),_.instanceCount=0,_._iO={},n.onstop&&n.onstop.apply(_)),
_;
},this.setAutoPlay=function(e){
pt._wD(_.id+": Autoplay turned "+(e?"on":"off")),_._iO.autoPlay=e,_.isHTML5||(_t._setAutoPlay(_.id,e),
e&&(_.instanceCount||1!==_.readyState||(_.instanceCount++,pt._wD(_.id+": Incremented instance count to "+_.instanceCount))));
},this.getAutoPlay=function(){
return _._iO.autoPlay;
},this.setPosition=function(e){
e===t&&(e=0);
var n,o,i=_.isHTML5?Math.max(e,0):Math.min(_.duration||_._iO.duration,Math.max(e,0));
if(_.position=i,o=_.position/an,_._resetOnPosition(_.position),_._iO.position=i,
_.isHTML5){
if(_._a){
if(_._html5_canplay){
if(_._a.currentTime!==o){
pt._wD(_.id+": setPosition("+o+")");
try{
_._a.currentTime=o,(0===_.playState||_.paused)&&_._a.pause();
}catch(a){
pt._wD(_.id+": setPosition("+o+") failed: "+a.message,2);
}
}
}else if(o)return pt._wD(_.id+": setPosition("+o+"): Cannot seek yet, sound not ready",2),
_;
_.paused&&_._onTimer(!0);
}
}else n=9===d?_.position:o,_.readyState&&2!==_.readyState&&_t._setPosition(_.id,n,_.paused||!_.playState,_._iO.multiShot);
return _;
},this.pause=function(e){
return _.paused||0===_.playState&&1!==_.readyState?_:(pt._wD(_.id+": pause()"),_.paused=!0,
_.isHTML5?(_._setup_html5().pause(),a()):(e||e===t)&&_t._pause(_.id,_._iO.multiShot),
_._iO.onpause&&_._iO.onpause.apply(_),_);
},this.resume=function(){
var e=_._iO;
return _.paused?(pt._wD(_.id+": resume()"),_.paused=!1,_.playState=1,_.isHTML5?(_._setup_html5().play(),
s()):(e.isMovieStar&&!e.serverURL&&_.setPosition(_.position),_t._pause(_.id,e.multiShot)),
!g&&e.onplay?(e.onplay.apply(_),g=!0):e.onresume&&e.onresume.apply(_),_):_;
},this.togglePause=function(){
return pt._wD(_.id+": togglePause()"),0===_.playState?(_.play({
position:9!==d||_.isHTML5?_.position/an:_.position
}),_):(_.paused?_.resume():_.pause(),_);
},this.setPan=function(e,n){
return e===t&&(e=0),n===t&&(n=!1),_.isHTML5||_t._setPan(_.id,e),_._iO.pan=e,n||(_.pan=e,
_.options.pan=e),_;
},this.setVolume=function(e,n){
return e===t&&(e=100),n===t&&(n=!1),_.isHTML5?_._a&&(_._a.volume=Math.max(0,Math.min(1,e/100))):_t._setVolume(_.id,pt.muted&&!_.muted||_.muted?0:e),
_._iO.volume=e,n||(_.volume=e,_.options.volume=e),_;
},this.mute=function(){
return _.muted=!0,_.isHTML5?_._a&&(_._a.muted=!0):_t._setVolume(_.id,0),_;
},this.unmute=function(){
_.muted=!1;
var e=_._iO.volume!==t;
return _.isHTML5?_._a&&(_._a.muted=!1):_t._setVolume(_.id,e?_._iO.volume:_.options.volume),
_;
},this.toggleMute=function(){
return _.muted?_.unmute():_.mute();
},this.onPosition=function(e,n,o){
return y.push({
position:parseInt(e,10),
method:n,
scope:o!==t?o:_,
fired:!1
}),_;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t){
var n;
if(e=parseInt(e,10),isNaN(e))return!1;
for(n=0;n<y.length;n++)e===y[n].position&&(t&&t!==y[n].method||(y[n].fired&&w--,
y.splice(n,1)));
},this._processOnPosition=function(){
var e,t,n=y.length;
if(!n||!_.playState||w>=n)return!1;
for(e=n-1;e>=0;e--)t=y[e],!t.fired&&_.position>=t.position&&(t.fired=!0,w++,t.method.apply(t.scope,[t.position]));
return!0;
},this._resetOnPosition=function(e){
var t,n,o=y.length;
if(!o)return!1;
for(t=o-1;t>=0;t--)n=y[t],n.fired&&e<=n.position&&(n.fired=!1,w--);
return!0;
},u=function(){
var e,t,n=_._iO,o=n.from,i=n.to;
return t=function(){
pt._wD(_.id+': "To" time of '+i+" reached."),_.clearOnPosition(i,t),_.stop();
},e=function(){
pt._wD(_.id+': Playing "from" '+o),null===i||isNaN(i)||_.onPosition(i,t);
},null===o||isNaN(o)||(n.position=o,n.multiShot=!1,e()),n;
},r=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.onPosition(parseInt(e,10),t[e]);
},l=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.clearOnPosition(parseInt(e,10));
},s=function(){
_.isHTML5&&K(_);
},a=function(){
_.isHTML5&&J(_);
},n=function(e){
e||(y=[],w=0),g=!1,_._hasTimer=null,_._a=null,_._html5_canplay=!1,_.bytesLoaded=null,
_.bytesTotal=null,_.duration=_._iO&&_._iO.duration?_._iO.duration:null,_.durationEstimate=null,
_.buffered=[],_.eqData=[],_.eqData.left=[],_.eqData.right=[],_.failures=0,_.isBuffering=!1,
_.instanceOptions={},_.instanceCount=0,_.loaded=!1,_.metadata={},_.readyState=0,
_.muted=!1,_.paused=!1,_.peakData={
left:0,
right:0
},_.waveformData={
left:[],
right:[]
},_.playState=0,_.position=null,_.id3={};
},n(),this._onTimer=function(e){
var t,n,o=!1,i={};
return _._hasTimer||e?(_._a&&(e||(_.playState>0||1===_.readyState)&&!_.paused)&&(t=_._get_html5_duration(),
t!==c.duration&&(c.duration=t,_.duration=t,o=!0),_.durationEstimate=_.duration,n=_._a.currentTime*an||0,
n!==c.time&&(c.time=n,o=!0),(o||e)&&_._whileplaying(n,i,i,i,i)),o):void 0;
},this._get_html5_duration=function(){
var e=_._iO,t=_._a&&_._a.duration?_._a.duration*an:e&&e.duration?e.duration:null,n=t&&!isNaN(t)&&1/0!==t?t:null;
return n;
},this._apply_loop=function(e,t){
!e.loop&&t>1&&pt._wD("Note: Native HTML5 looping is infinite.",1),e.loop=t>1?"loop":"";
},this._setup_html5=function(e){
var t,i=p(_._iO,e),a=jt?mt:_._a,s=decodeURI(i.url);
if(jt?s===decodeURI(st)&&(t=!0):s===decodeURI(v)&&(t=!0),a){
if(a._s)if(jt)a._s&&a._s.playState&&!t&&a._s.stop();else if(!jt&&s===decodeURI(v))return _._apply_loop(a,i.loops),
a;
t||(n(!1),a.src=i.url,_.url=i.url,v=i.url,st=i.url,a._called_load=!1);
}else _._a=i.autoLoad||i.autoPlay?new Audio(i.url):Xt&&opera.version()<10?new Audio(null):new Audio,
a=_._a,a._called_load=!1,jt&&(mt=a);
return _.isHTML5=!0,_._a=a,a._s=_,o(),_._apply_loop(a,i.loops),i.autoLoad||i.autoPlay?_.load():(a.autobuffer=!1,
a.preload="auto"),a;
},o=function(){
function e(e,t,n){
return _._a?_._a.addEventListener(e,t,n||!1):null;
}
if(_._a._added_events)return!1;
var t;
_._a._added_events=!0;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
return!0;
},i=function(){
function e(e,t,n){
return _._a?_._a.removeEventListener(e,t,n||!1):null;
}
var t;
pt._wD(_.id+": Removing event listeners"),_._a._added_events=!1;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
},this._onload=function(e){
var t,n=!!e||!_.isHTML5&&8===d&&_.duration;
return t=_.id+": ",pt._wD(t+(n?"onload()":"Failed to load / invalid sound?"+(_.duration?" -":" Zero-length duration reported.")+" ("+_.url+")"),n?1:2),
n||_.isHTML5||(pt.sandbox.noRemote===!0&&pt._wD(t+N("noNet"),1),pt.sandbox.noLocal===!0&&pt._wD(t+N("noLocal"),1)),
_.loaded=n,_.readyState=n?3:2,_._onbufferchange(0),_._iO.onload&&ct(_,function(){
_._iO.onload.apply(_,[n]);
}),!0;
},this._onbufferchange=function(e){
return 0===_.playState?!1:e&&_.isBuffering||!e&&!_.isBuffering?!1:(_.isBuffering=1===e,
_._iO.onbufferchange&&(pt._wD(_.id+": Buffer state change: "+e),_._iO.onbufferchange.apply(_)),
!0);
},this._onsuspend=function(){
return _._iO.onsuspend&&(pt._wD(_.id+": Playback suspended"),_._iO.onsuspend.apply(_)),
!0;
},this._onfailure=function(e,t,n){
_.failures++,pt._wD(_.id+": Failures = "+_.failures),_._iO.onfailure&&1===_.failures?_._iO.onfailure(_,e,t,n):pt._wD(_.id+": Ignoring failure");
},this._onfinish=function(){
var e=_._iO.onfinish;
_._onbufferchange(0),_._resetOnPosition(0),_.instanceCount&&(_.instanceCount--,_.instanceCount||(l(),
_.playState=0,_.paused=!1,_.instanceCount=0,_.instanceOptions={},_._iO={},a(),_.isHTML5&&(_.position=0)),
(!_.instanceCount||_._iO.multiShotEvents)&&e&&(pt._wD(_.id+": onfinish()"),ct(_,function(){
e.apply(_);
})));
},this._whileloading=function(e,t,n,o){
var i=_._iO;
_.bytesLoaded=e,_.bytesTotal=t,_.duration=Math.floor(n),_.bufferLength=o,_.durationEstimate=_.isHTML5||i.isMovieStar?_.duration:i.duration?_.duration>i.duration?_.duration:i.duration:parseInt(_.bytesTotal/_.bytesLoaded*_.duration,10),
_.isHTML5||(_.buffered=[{
start:0,
end:_.duration
}]),(3!==_.readyState||_.isHTML5)&&i.whileloading&&i.whileloading.apply(_);
},this._whileplaying=function(e,n,o,i,a){
var s,r=_._iO;
return isNaN(e)||null===e?!1:(_.position=Math.max(0,e),_._processOnPosition(),!_.isHTML5&&d>8&&(r.usePeakData&&n!==t&&n&&(_.peakData={
left:n.leftPeak,
right:n.rightPeak
}),r.useWaveformData&&o!==t&&o&&(_.waveformData={
left:o.split(","),
right:i.split(",")
}),r.useEQData&&a!==t&&a&&a.leftEQ&&(s=a.leftEQ.split(","),_.eqData=s,_.eqData.left=s,
a.rightEQ!==t&&a.rightEQ&&(_.eqData.right=a.rightEQ.split(",")))),1===_.playState&&(_.isHTML5||8!==d||_.position||!_.isBuffering||_._onbufferchange(0),
r.whileplaying&&r.whileplaying.apply(_)),!0);
},this._oncaptiondata=function(e){
pt._wD(_.id+": Caption data received."),_.captiondata=e,_._iO.oncaptiondata&&_._iO.oncaptiondata.apply(_,[e]);
},this._onmetadata=function(e,t){
pt._wD(_.id+": Metadata received.");
var n,o,i={};
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.metadata=i,_._iO.onmetadata&&_._iO.onmetadata.apply(_);
},this._onid3=function(e,t){
pt._wD(_.id+": ID3 data received.");
var n,o,i=[];
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.id3=p(_.id3,i),_._iO.onid3&&_._iO.onid3.apply(_);
},this._onconnect=function(e){
e=1===e,pt._wD(_.id+": "+(e?"Connected.":"Failed to connect? - "+_.url),e?1:2),_.connected=e,
e&&(_.failures=0,$(_.id)&&(_.getAutoPlay()?_.play(t,_.getAutoPlay()):_._iO.autoLoad&&_.load()),
_._iO.onconnect&&_._iO.onconnect.apply(_,[e]));
},this._ondataerror=function(e){
_.playState>0&&(pt._wD(_.id+": Data error: "+e),_._iO.ondataerror&&_._iO.ondataerror.apply(_));
},this._debug();
},I=function(){
return Ot.body||Ot._docElement||Ot.getElementsByTagName("div")[0];
},s=function(e){
return Ot.getElementById(e);
},p=function(e,n){
var o,i,a=e||{};
o=n===t?pt.defaultOptions:n;
for(i in o)o.hasOwnProperty(i)&&a[i]===t&&(a[i]="object"!=typeof o[i]||null===o[i]?o[i]:p(a[i],o[i]));
return a;
},ct=function(e,t){
e.isHTML5||8!==d?t():window.setTimeout(t,0);
},_={
onready:1,
ontimeout:1,
defaultOptions:1,
flash9Options:1,
movieStarOptions:1
},m=function(e,n){
var o,i=!0,a=n!==t,s=pt.setupOptions,r=_;
if(e===t){
i=[];
for(o in s)s.hasOwnProperty(o)&&i.push(o);
for(o in r)r.hasOwnProperty(o)&&i.push("object"==typeof pt[o]?o+": {...}":pt[o]instanceof Function?o+": function() {...}":o);
return pt._wD(N("setup",i.join(", "))),!1;
}
for(o in e)if(e.hasOwnProperty(o))if("object"!=typeof e[o]||null===e[o]||e[o]instanceof Array||e[o]instanceof RegExp)a&&r[n]!==t?pt[n][o]=e[o]:s[o]!==t?(pt.setupOptions[o]=e[o],
pt[o]=e[o]):r[o]===t?(Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1):pt[o]instanceof Function?pt[o].apply(pt,e[o]instanceof Array?e[o]:[e[o]]):pt[o]=e[o];else{
if(r[o]!==t)return m(e[o],o);
Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1;
}
return i;
},at=function(){
function e(e){
var t=Wt.call(e),n=t.length;
return i?(t[1]="on"+t[1],n>3&&t.pop()):3===n&&t.push(!1),t;
}
function t(e,t){
var n=e.shift(),o=[a[t]];
i?n[o](e[0],e[1]):n[o].apply(n,e);
}
function n(){
t(e(arguments),"add");
}
function o(){
t(e(arguments),"remove");
}
var i=window.attachEvent,a={
add:i?"attachEvent":"addEventListener",
remove:i?"detachEvent":"removeEventListener"
};
return{
add:n,
remove:o
};
}(),dt={
abort:i(function(){
pt._wD(this._s.id+": abort");
}),
canplay:i(function(){
var e,n=this._s;
if(n._html5_canplay)return!0;
if(n._html5_canplay=!0,pt._wD(n.id+": canplay"),n._onbufferchange(0),e=n._iO.position===t||isNaN(n._iO.position)?null:n._iO.position/an,
n.position&&this.currentTime!==e){
pt._wD(n.id+": canplay: Setting position to "+e);
try{
this.currentTime=e;
}catch(o){
pt._wD(n.id+": canplay: Setting position of "+e+" failed: "+o.message,2);
}
}
n._iO._oncanplay&&n._iO._oncanplay();
}),
canplaythrough:i(function(){
var e=this._s;
e.loaded||(e._onbufferchange(0),e._whileloading(e.bytesLoaded,e.bytesTotal,e._get_html5_duration()),
e._onload(!0));
}),
ended:i(function(){
var e=this._s;
pt._wD(e.id+": ended"),e._onfinish();
}),
error:i(function(){
pt._wD(this._s.id+": HTML5 error, code "+this.error.code),this._s._onload(!1);
}),
loadeddata:i(function(){
var e=this._s;
pt._wD(e.id+": loadeddata"),e._loaded||Jt||(e.duration=e._get_html5_duration());
}),
loadedmetadata:i(function(){
pt._wD(this._s.id+": loadedmetadata");
}),
loadstart:i(function(){
pt._wD(this._s.id+": loadstart"),this._s._onbufferchange(1);
}),
play:i(function(){
this._s._onbufferchange(0);
}),
playing:i(function(){
pt._wD(this._s.id+": playing"),this._s._onbufferchange(0);
}),
progress:i(function(e){
var t,n,o,i=this._s,a=0,s="progress"===e.type,r=e.target.buffered,l=e.loaded||0,u=e.total||1;
if(i.buffered=[],r&&r.length){
for(t=0,n=r.length;n>t;t++)i.buffered.push({
start:r.start(t)*an,
end:r.end(t)*an
});
if(a=(r.end(0)-r.start(0))*an,l=Math.min(1,a/(e.target.duration*an)),s&&r.length>1){
for(o=[],n=r.length,t=0;n>t;t++)o.push(e.target.buffered.start(t)*an+"-"+e.target.buffered.end(t)*an);
pt._wD(this._s.id+": progress, timeRanges: "+o.join(", "));
}
s&&!isNaN(l)&&pt._wD(this._s.id+": progress, "+Math.floor(100*l)+"% loaded");
}
isNaN(l)||(i._onbufferchange(0),i._whileloading(l,u,i._get_html5_duration()),l&&u&&l===u&&dt.canplaythrough.call(this,e));
}),
ratechange:i(function(){
pt._wD(this._s.id+": ratechange");
}),
suspend:i(function(e){
var t=this._s;
pt._wD(this._s.id+": suspend"),dt.progress.call(this,e),t._onsuspend();
}),
stalled:i(function(){
pt._wD(this._s.id+": stalled");
}),
timeupdate:i(function(){
this._s._onTimer();
}),
waiting:i(function(){
var e=this._s;
pt._wD(this._s.id+": waiting"),e._onbufferchange(1);
})
},Y=function(e){
var t;
return t=e&&(e.type||e.url||e.serverURL)?e.serverURL||e.type&&o(e.type)?!1:e.type?et({
type:e.type
}):et({
url:e.url
})||pt.html5Only||e.url.match(/data\:/i):!1;
},nt=function(e){
var t;
return e&&(t=Jt&&!Vt?null:zt?sn:null,e.removeAttribute("src"),void 0!==e._called_unload&&(e._called_load=!1)),
jt&&(st=null),t;
},et=function(e){
if(!pt.useHTML5Audio||!pt.hasHTML5)return!1;
var n,i,a,s,r=e.url||null,l=e.type||null,u=pt.audioFormats;
if(l&&pt.html5[l]!==t)return pt.html5[l]&&!o(l);
if(!tt){
tt=[];
for(s in u)u.hasOwnProperty(s)&&(tt.push(s),u[s].related&&(tt=tt.concat(u[s].related)));
tt=new RegExp("\\.("+tt.join("|")+")(\\?.*)?$","i");
}
return a=r?r.toLowerCase().match(tt):null,a&&a.length?a=a[1]:l?(i=l.indexOf(";"),
a=(-1!==i?l.substr(0,i):l).substr(6)):n=!1,a&&pt.html5[a]!==t?n=pt.html5[a]&&!o(a):(l="audio/"+a,
n=pt.html5.canPlayType({
type:l
}),pt.html5[a]=n,n=n&&pt.html5[l]&&!o(l)),n;
},it=function(){
function e(e){
var t,n,o,i=!1,a=!1;
if(!s||"function"!=typeof s.canPlayType)return i;
if(e instanceof Array){
for(n=0,o=e.length;o>n;n++)(pt.html5[e[n]]||s.canPlayType(e[n]).match(pt.html5Test))&&(a=!0,
pt.html5[e[n]]=!0,pt.flash[e[n]]=!!e[n].match(on));
i=a;
}else t=s&&"function"==typeof s.canPlayType?s.canPlayType(e):!1,i=!(!t||!t.match(pt.html5Test));
return i;
}
if(!pt.useHTML5Audio||!pt.hasHTML5)return pt.html5.usingFlash=!0,Bt=!0,!1;
var n,o,i,a,s=Audio!==t?Xt&&opera.version()<10?new Audio(null):new Audio:null,r={};
i=pt.audioFormats;
for(n in i)if(i.hasOwnProperty(n)&&(o="audio/"+n,r[n]=e(i[n].type),r[o]=r[n],n.match(on)?(pt.flash[n]=!0,
pt.flash[o]=!0):(pt.flash[n]=!1,pt.flash[o]=!1),i[n]&&i[n].related))for(a=i[n].related.length-1;a>=0;a--)r["audio/"+i[n].related[a]]=r[n],
pt.html5[i[n].related[a]]=r[n],pt.flash[i[n].related[a]]=r[n];
return r.canPlayType=s?e:null,pt.html5=p(pt.html5,r),pt.html5.usingFlash=Z(),Bt=pt.html5.usingFlash,
!0;
},M={
notReady:"Unavailable - wait until onready() has fired.",
notOK:"Audio support is not available.",
domError:gt+"exception caught while appending SWF to DOM.",
spcWmode:"Removing wmode, preventing known SWF loading issue(s)",
swf404:yt+"Verify that %s is a valid path.",
tryDebug:"Try "+gt+".debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",
localFail:yt+"Non-HTTP page ("+Ot.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
waitFocus:yt+"Special case: Waiting for SWF to load with window focus...",
waitForever:yt+"Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF:yt+"Waiting for 100% SWF load...",
needFunction:yt+"Function object expected for %s",
badID:'Sound ID "%s" should be a string, starting with a non-numeric character',
currentObj:yt+"_debug(): Current sound objects",
waitOnload:yt+"Waiting for window.onload()",
docLoaded:yt+"Document already loaded",
onload:yt+"initComplete(): calling soundManager.onload()",
onloadOK:gt+".onload() complete",
didInit:yt+"init(): Already called?",
secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
badRemove:yt+"Failed to remove Flash node.",
shutdown:gt+".disable(): Shutting down",
queue:yt+"Queueing %s handler",
smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
fbTimeout:"No flash response, applying ."+W.swfTimedout+" CSS...",
fbLoaded:"Flash loaded",
fbHandler:yt+"flashBlockHandler()",
manURL:"SMSound.load(): Using manually-assigned URL",
onURL:gt+".load(): current URL already assigned.",
badFV:gt+'.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",
noNSLoop:"Note: Looping not implemented for MovieStar formats",
needfl9:"Note: Switching to flash 9, required for MP4 formats.",
mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash:yt+"Fatal error: Flash is needed to play some required formats, but is not available.",
gotFocus:yt+"Got window focus.",
policy:"Enabling usePolicyFile for data access",
setup:gt+".setup(): allowed parameters: %s",
setupError:gt+'.setup(): "%s" cannot be assigned with this method.',
setupUndef:gt+'.setup(): Could not find option "%s"',
setupLate:gt+".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL:yt+"Flash URL required. Call soundManager.setup({url:...}) to get started.",
sm2Loaded:"SoundManager 2: Ready.",
reset:gt+".reset(): Removing event callbacks",
mobileUA:"Mobile UA detected, preferring HTML5 by default.",
globalHTML5:"Using singleton HTML5 Audio() pattern for this device."
},N=function(){
var e,t,n=Wt.call(arguments),o=n.shift(),i=M&&M[o]?M[o]:"";
if(i&&n&&n.length)for(e=0,t=n.length;t>e;e++)i=i.replace("%s",n[e]);
return i;
},q=function(e){
return 8===d&&e.loops>1&&e.stream&&(h("as2loop"),e.stream=!1),e;
},V=function(e,t){
return e&&!e.usePolicyFile&&(e.onid3||e.usePeakData||e.useWaveformData||e.useEQData)&&(pt._wD((t||"")+N("policy")),
e.usePolicyFile=!0),e;
},Q=function(e){
Yt&&console.warn!==t?console.warn(e):pt._wD(e);
},r=function(){
return!1;
},C=function(e){
var t;
for(t in e)e.hasOwnProperty(t)&&"function"==typeof e[t]&&(e[t]=r);
t=null;
},x=function(e){
e===t&&(e=!1),(St||e)&&pt.disable(e);
},R=function(e){
var t,n=null;
if(e)if(e.match(/\.swf(\?.*)?$/i)){
if(n=e.substr(e.toLowerCase().lastIndexOf(".swf?")+4))return e;
}else e.lastIndexOf("/")!==e.length-1&&(e+="/");
return t=(e&&-1!==e.lastIndexOf("/")?e.substr(0,e.lastIndexOf("/")+1):"./")+pt.movieURL,
pt.noSWFCache&&(t+="?ts="+(new Date).getTime()),t;
},O=function(){
d=parseInt(pt.flashVersion,10),8!==d&&9!==d&&(pt._wD(N("badFV",d,Et)),pt.flashVersion=d=Et);
var e=pt.debugMode||pt.debugFlash?"_debug.swf":".swf";
pt.useHTML5Audio&&!pt.html5Only&&pt.audioFormats.mp4.required&&9>d&&(pt._wD(N("needfl9")),
pt.flashVersion=d=9),pt.version=pt.versionNumber+(pt.html5Only?" (HTML5-only mode)":9===d?" (AS3/Flash 9)":" (AS2/Flash 8)"),
d>8?(pt.defaultOptions=p(pt.defaultOptions,pt.flash9Options),pt.features.buffering=!0,
pt.defaultOptions=p(pt.defaultOptions,pt.movieStarOptions),pt.filePatterns.flash9=new RegExp("\\.(mp3|"+dn.join("|")+")(\\?.*)?$","i"),
pt.features.movieStar=!0):pt.features.movieStar=!1,pt.filePattern=pt.filePatterns[8!==d?"flash9":"flash8"],
pt.movieURL=(8===d?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",e),
pt.features.peakData=pt.features.waveformData=pt.features.eqData=d>8;
},A=function(e,t){
return _t?void _t._setPolling(e,t):!1;
},k=function(){
if(pt.debugURLParam.test(bt)&&(pt.debugMode=!0),s(pt.debugID))return!1;
var e,t,n,o,i;
if(!(!pt.debugMode||s(pt.debugID)||Yt&&pt.useConsole&&pt.consoleOnly)){
e=Ot.createElement("div"),e.id=pt.debugID+"-toggle",o={
position:"fixed",
bottom:"0px",
right:"0px",
width:"1.2em",
height:"1.2em",
lineHeight:"1.2em",
margin:"2px",
textAlign:"center",
border:"1px solid #999",
cursor:"pointer",
background:"#fff",
color:"#333",
zIndex:10001
},e.appendChild(Ot.createTextNode("-")),e.onclick=j,e.title="Toggle SM2 debug console",
vt.match(/msie 6/i)&&(e.style.position="absolute",e.style.cursor="hand");
for(i in o)o.hasOwnProperty(i)&&(e.style[i]=o[i]);
if(t=Ot.createElement("div"),t.id=pt.debugID,t.style.display=pt.debugMode?"block":"none",
pt.debugMode&&!s(e.id)){
try{
n=I(),n.appendChild(e);
}catch(a){
throw new Error(N("domError")+" \n"+a.toString());
}
n.appendChild(t);
}
}
n=null;
},$=this.getSoundById,h=function(e,t){
return e?pt._wD(N(e),t):"";
},j=function(){
var e=s(pt.debugID),t=s(pt.debugID+"-toggle");
return e?(Mt?(t.innerHTML="+",e.style.display="none"):(t.innerHTML="-",e.style.display="block"),
void(Mt=!Mt)):!1;
},f=function(e,n,o){
if(window.sm2Debugger!==t)try{
sm2Debugger.handleEvent(e,n,o);
}catch(i){
return!1;
}
return!0;
},B=function(){
var e=[];
return pt.debugMode&&e.push(W.sm2Debug),pt.debugFlash&&e.push(W.flashDebug),pt.useHighPerformance&&e.push(W.highPerf),
e.join(" ");
},U=function(){
var e=N("fbHandler"),t=pt.getMoviePercent(),n=W,o={
type:"FLASHBLOCK"
};
return pt.html5Only?!1:void(pt.ok()?(pt.didFlashBlock&&pt._wD(e+": Unblocked"),pt.oMC&&(pt.oMC.className=[B(),n.swfDefault,n.swfLoaded+(pt.didFlashBlock?" "+n.swfUnblocked:"")].join(" "))):(Bt&&(pt.oMC.className=B()+" "+n.swfDefault+" "+(null===t?n.swfTimedout:n.swfError),
pt._wD(e+": "+N("fbTimeout")+(t?" ("+N("fbLoaded")+")":""))),pt.didFlashBlock=!0,
y({
type:"ontimeout",
ignoreInit:!0,
error:o
}),E(o)));
},g=function(e,n,o){
Dt[e]===t&&(Dt[e]=[]),Dt[e].push({
method:n,
scope:o||null,
fired:!1
});
},y=function(e){
if(e||(e={
type:pt.ok()?"onready":"ontimeout"
}),!Pt&&e&&!e.ignoreInit)return!1;
if("ontimeout"===e.type&&(pt.ok()||St&&!e.ignoreInit))return!1;
var t,n,o={
success:e&&e.ignoreInit?pt.ok():!St
},i=e&&e.type?Dt[e.type]||[]:[],a=[],s=[o],r=Bt&&!pt.ok();
for(e.error&&(s[0].error=e.error),t=0,n=i.length;n>t;t++)i[t].fired!==!0&&a.push(i[t]);
if(a.length)for(t=0,n=a.length;n>t;t++)a[t].scope?a[t].method.apply(a[t].scope,s):a[t].method.apply(this,s),
r||(a[t].fired=!0);
return!0;
},w=function(){
window.setTimeout(function(){
pt.useFlashBlock&&U(),y(),"function"==typeof pt.onload&&(h("onload",1),pt.onload.apply(window),
h("onloadOK",1)),pt.waitForWindowLoad&&at.add(window,"load",w);
},1);
},lt=function(){
if(rt!==t)return rt;
var e,n,o,i=!1,a=navigator,s=a.plugins,r=window.ActiveXObject;
if(s&&s.length)n="application/x-shockwave-flash",o=a.mimeTypes,o&&o[n]&&o[n].enabledPlugin&&o[n].enabledPlugin.description&&(i=!0);else if(r!==t&&!vt.match(/MSAppHost/i)){
try{
e=new r("ShockwaveFlash.ShockwaveFlash");
}catch(l){
e=null;
}
i=!!e,e=null;
}
return rt=i,i;
},Z=function(){
var e,t,n=pt.audioFormats,o=Vt&&!!vt.match(/os (1|2|3_0|3_1)/i);
if(o?(pt.hasHTML5=!1,pt.html5Only=!0,pt.oMC&&(pt.oMC.style.display="none")):pt.useHTML5Audio&&(pt.html5&&pt.html5.canPlayType||(pt._wD("SoundManager: No HTML5 Audio() support detected."),
pt.hasHTML5=!1),Zt&&pt._wD(yt+"Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(rt?"will use flash fallback for MP3/MP4, if available":" would use flash fallback for MP3/MP4, but none detected."),1)),
pt.useHTML5Audio&&pt.hasHTML5){
G=!0;
for(t in n)n.hasOwnProperty(t)&&n[t].required&&(pt.html5.canPlayType(n[t].type)?pt.preferFlash&&(pt.flash[t]||pt.flash[n[t].type])&&(e=!0):(G=!1,
e=!0));
}
return pt.ignoreFlash&&(e=!1,G=!0),pt.html5Only=pt.hasHTML5&&pt.useHTML5Audio&&!e,
!pt.html5Only;
},z=function(e){
var t,n,o,i=0;
if(e instanceof Array){
for(t=0,n=e.length;n>t;t++)if(e[t]instanceof Object){
if(pt.canPlayMIME(e[t].type)){
i=t;
break;
}
}else if(pt.canPlayURL(e[t])){
i=t;
break;
}
e[i].url&&(e[i]=e[i].url),o=e[i];
}else o=e;
return o;
},K=function(e){
e._hasTimer||(e._hasTimer=!0,!Gt&&pt.html5PollingInterval&&(null===Nt&&0===Rt&&(Nt=setInterval(X,pt.html5PollingInterval)),
Rt++));
},J=function(e){
e._hasTimer&&(e._hasTimer=!1,!Gt&&pt.html5PollingInterval&&Rt--);
},X=function(){
var e;
if(null!==Nt&&!Rt)return clearInterval(Nt),Nt=null,!1;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].isHTML5&&pt.sounds[pt.soundIDs[e]]._hasTimer&&pt.sounds[pt.soundIDs[e]]._onTimer();
},E=function(e){
e=e!==t?e:{},"function"==typeof pt.onerror&&pt.onerror.apply(window,[{
type:e.type!==t?e.type:null
}]),e.fatal!==t&&e.fatal&&pt.disable();
},ut=function(){
if(!Zt||!lt())return!1;
var e,t,n=pt.audioFormats;
for(t in n)if(n.hasOwnProperty(t)&&("mp3"===t||"mp4"===t)&&(pt._wD(gt+": Using flash fallback for "+t+" format"),
pt.html5[t]=!1,n[t]&&n[t].related))for(e=n[t].related.length-1;e>=0;e--)pt.html5[n[t].related[e]]=!1;
},this._setSandboxType=function(e){
var n=pt.sandbox;
n.type=e,n.description=n.types[n.types[e]!==t?e:"unknown"],"localWithFile"===n.type?(n.noRemote=!0,
n.noLocal=!1,h("secNote",2)):"localWithNetwork"===n.type?(n.noRemote=!1,n.noLocal=!0):"localTrusted"===n.type&&(n.noRemote=!1,
n.noLocal=!1);
},this._externalInterfaceOK=function(e){
if(pt.swfLoaded)return!1;
var t;
return f("swf",!0),f("flashtojs",!0),pt.swfLoaded=!0,tn=!1,Zt&&ut(),e&&e.replace(/\+dev/i,"")===pt.versionNumber.replace(/\+dev/i,"")?void setTimeout(u,$t?100:1):(t=gt+': Fatal: JavaScript file build "'+pt.versionNumber+'" does not match Flash SWF build "'+e+'" at '+pt.url+". Ensure both are up-to-date.",
setTimeout(function(){
throw new Error(t);
},0),!1);
},H=function(e,n){
function o(){
var e,t=[],n=[],o=" + ";
e="SoundManager "+pt.version+(!pt.html5Only&&pt.useHTML5Audio?pt.hasHTML5?" + HTML5 audio":", no HTML5 audio support":""),
pt.html5Only?pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"):(pt.preferFlash&&t.push("preferFlash"),
pt.useHighPerformance&&t.push("useHighPerformance"),pt.flashPollingInterval&&t.push("flashPollingInterval ("+pt.flashPollingInterval+"ms)"),
pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"),
pt.wmode&&t.push("wmode ("+pt.wmode+")"),pt.debugFlash&&t.push("debugFlash"),pt.useFlashBlock&&t.push("flashBlock")),
t.length&&(n=n.concat([t.join(o)])),pt._wD(e+(n.length?o+n.join(", "):""),1),ft();
}
function i(e,t){
return'<param name="'+e+'" value="'+t+'" />';
}
if(Lt&&Tt)return!1;
if(pt.html5Only)return O(),o(),pt.oMC=s(pt.movieID),u(),Lt=!0,Tt=!0,!1;
var a,r,l,d,f,h,c,p,m=n||pt.url,_=pt.altURL||m,g="JS/Flash audio component (SoundManager 2)",y=I(),w=B(),v=null,b=Ot.getElementsByTagName("html")[0];
if(v=b&&b.dir&&b.dir.match(/rtl/i),e=e===t?pt.id:e,O(),pt.url=R(rn?m:_),n=pt.url,
pt.wmode=!pt.wmode&&pt.useHighPerformance?"transparent":pt.wmode,null!==pt.wmode&&(vt.match(/msie 8/i)||!$t&&!pt.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(Ut.push(M.spcWmode),
pt.wmode=null),a={
name:e,
id:e,
src:n,
quality:"high",
allowScriptAccess:pt.allowScriptAccess,
bgcolor:pt.bgColor,
pluginspage:ln+"www.macromedia.com/go/getflashplayer",
title:g,
type:"application/x-shockwave-flash",
wmode:pt.wmode,
hasPriority:"true"
},pt.debugFlash&&(a.FlashVars="debug=1"),pt.wmode||delete a.wmode,$t)r=Ot.createElement("div"),
d=['<object id="'+e+'" data="'+n+'" type="'+a.type+'" title="'+a.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+ln+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',i("movie",n),i("AllowScriptAccess",pt.allowScriptAccess),i("quality",a.quality),pt.wmode?i("wmode",pt.wmode):"",i("bgcolor",pt.bgColor),i("hasPriority","true"),pt.debugFlash?i("FlashVars",a.FlashVars):"","</object>"].join("");else{
r=Ot.createElement("embed");
for(l in a)a.hasOwnProperty(l)&&r.setAttribute(l,a[l]);
}
if(k(),w=B(),y=I())if(pt.oMC=s(pt.movieID)||Ot.createElement("div"),pt.oMC.id)p=pt.oMC.className,
pt.oMC.className=(p?p+" ":W.swfDefault)+(w?" "+w:""),pt.oMC.appendChild(r),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;else{
if(pt.oMC.id=pt.movieID,pt.oMC.className=W.swfDefault+" "+w,h=null,f=null,pt.useFlashBlock||(pt.useHighPerformance?h={
position:"fixed",
width:"8px",
height:"8px",
bottom:"0px",
left:"0px",
overflow:"hidden"
}:(h={
position:"absolute",
width:"6px",
height:"6px",
top:"-9999px",
left:"-9999px"
},v&&(h.left=Math.abs(parseInt(h.left,10))+"px"))),Kt&&(pt.oMC.style.zIndex=1e4),
!pt.debugFlash)for(c in h)h.hasOwnProperty(c)&&(pt.oMC.style[c]=h[c]);
try{
$t||pt.oMC.appendChild(r),y.appendChild(pt.oMC),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;
}catch(D){
throw new Error(N("domError")+" \n"+D.toString());
}
}
return Lt=!0,o(),!0;
},L=function(){
return pt.html5Only?(H(),!1):_t?!1:pt.url?(_t=pt.getMovie(pt.id),_t||(At?($t?pt.oMC.innerHTML=kt:pt.oMC.appendChild(At),
At=null,Lt=!0):H(pt.id,pt.url),_t=pt.getMovie(pt.id)),"function"==typeof pt.oninitmovie&&setTimeout(pt.oninitmovie,1),
ht(),!0):(h("noURL"),!1);
},v=function(){
setTimeout(b,1e3);
},b=function(){
var e,t=!1;
return pt.url?Ct?!1:(Ct=!0,at.remove(window,"load",v),tn&&!en?(h("waitFocus"),!1):(Pt||(e=pt.getMoviePercent(),
e>0&&100>e&&(t=!0)),void setTimeout(function(){
return e=pt.getMoviePercent(),t?(Ct=!1,pt._wD(N("waitSWF")),window.setTimeout(v,1),
!1):(Pt||(pt._wD(gt+": No Flash response within expected time. Likely causes: "+(0===e?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(pt.debugFlash?" "+N("checkSWF"):""),2),
!rn&&e&&(h("localFail",2),pt.debugFlash||h("tryDebug",2)),0===e&&pt._wD(N("swf404",pt.url),1),
f("flashtojs",!1," (Check flash security or flash blockers)")),void(!Pt&&nn&&(null===e?pt.useFlashBlock||0===pt.flashLoadTimeout?(pt.useFlashBlock&&U(),
h("waitForever")):!pt.useFlashBlock&&G?window.setTimeout(function(){
Q(yt+"useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false..."),
pt.setup({
preferFlash:!1
}).reboot(),pt.didFlashBlock=!0,pt.beginDelayedInit();
},1):(h("waitForever"),y({
type:"ontimeout",
ignoreInit:!0
})):0===pt.flashLoadTimeout?h("waitForever"):x(!0))));
},pt.flashLoadTimeout))):!1;
},D=function(){
function e(){
at.remove(window,"focus",D);
}
return en||!tn?(e(),!0):(nn=!0,en=!0,h("gotFocus"),Ct=!1,v(),e(),!0);
},ht=function(){
Ut.length&&(pt._wD("SoundManager 2: "+Ut.join(" "),1),Ut=[]);
},ft=function(){
ht();
var e,t=[];
if(pt.useHTML5Audio&&pt.hasHTML5){
for(e in pt.audioFormats)pt.audioFormats.hasOwnProperty(e)&&t.push(e+" = "+pt.html5[e]+(!pt.html5[e]&&Bt&&pt.flash[e]?" (using flash)":pt.preferFlash&&pt.flash[e]&&Bt?" (preferring flash)":pt.html5[e]?"":" ("+(pt.audioFormats[e].required?"required, ":"")+"and no flash support)"));
pt._wD("SoundManager 2 HTML5 support: "+t.join(", "),1);
}
},c=function(e){
if(Pt)return!1;
if(pt.html5Only)return h("sm2Loaded"),Pt=!0,w(),f("onload",!0),!0;
var t,n=pt.useFlashBlock&&pt.flashLoadTimeout&&!pt.getMoviePercent(),o=!0;
return n||(Pt=!0,St&&(t={
type:!rt&&Bt?"NO_FLASH":"INIT_TIMEOUT"
})),pt._wD("SoundManager 2 "+(St?"failed to load":"loaded")+" ("+(St?"Flash security/load error":"OK")+")",St?2:1),
St||e?(pt.useFlashBlock&&pt.oMC&&(pt.oMC.className=B()+" "+(null===pt.getMoviePercent()?W.swfTimedout:W.swfError)),
y({
type:"ontimeout",
error:t,
ignoreInit:!0
}),f("onload",!1),E(t),o=!1):f("onload",!0),St||(pt.waitForWindowLoad&&!Ft?(h("waitOnload"),
at.add(window,"load",w)):(pt.waitForWindowLoad&&Ft&&h("docLoaded"),w())),o;
},l=function(){
var e,n=pt.setupOptions;
for(e in n)n.hasOwnProperty(e)&&(pt[e]===t?pt[e]=n[e]:pt[e]!==n[e]&&(pt.setupOptions[e]=pt[e]));
},u=function(){
function e(){
at.remove(window,"load",pt.beginDelayedInit);
}
if(Pt)return h("didInit"),!1;
if(pt.html5Only)return Pt||(e(),pt.enabled=!0,c()),!0;
L();
try{
_t._externalInterfaceTest(!1),A(!0,pt.flashPollingInterval||(pt.useHighPerformance?10:50)),
pt.debugMode||_t._disableDebug(),pt.enabled=!0,f("jstoflash",!0),pt.html5Only||at.add(window,"unload",r);
}catch(t){
return pt._wD("js/flash exception: "+t.toString()),f("jstoflash",!1),E({
type:"JS_TO_FLASH_EXCEPTION",
fatal:!0
}),x(!0),c(),!1;
}
return c(),e(),!0;
},P=function(){
return F?!1:(F=!0,l(),k(),function(){
var e="sm2-usehtml5audio=",t="sm2-preferflash=",n=null,o=null,i=bt.toLowerCase();
-1!==i.indexOf(e)&&(n="1"===i.charAt(i.indexOf(e)+e.length),Yt&&console.log((n?"Enabling ":"Disabling ")+"useHTML5Audio via URL parameter"),
pt.setup({
useHTML5Audio:n
})),-1!==i.indexOf(t)&&(o="1"===i.charAt(i.indexOf(t)+t.length),Yt&&console.log((o?"Enabling ":"Disabling ")+"preferFlash via URL parameter"),
pt.setup({
preferFlash:o
}));
}(),!rt&&pt.hasHTML5&&(pt._wD("SoundManager: No Flash detected"+(pt.useHTML5Audio?". Trying HTML5-only mode.":", enabling HTML5."),1),
pt.setup({
useHTML5Audio:!0,
preferFlash:!1
})),it(),!rt&&Bt&&(Ut.push(M.needFlash),pt.setup({
flashLoadTimeout:1
})),Ot.removeEventListener&&Ot.removeEventListener("DOMContentLoaded",P,!1),L(),
!0);
},ot=function(){
return"complete"===Ot.readyState&&(P(),Ot.detachEvent("onreadystatechange",ot)),
!0;
},S=function(){
Ft=!0,at.remove(window,"load",S);
},T=function(){
Gt&&((!pt.setupOptions.useHTML5Audio||pt.setupOptions.preferFlash)&&Ut.push(M.mobileUA),
pt.setupOptions.useHTML5Audio=!0,pt.setupOptions.preferFlash=!1,(Vt||Qt&&!vt.match(/android\s2\.3/i))&&(Ut.push(M.globalHTML5),
Vt&&(pt.ignoreFlash=!0),jt=!0));
},T(),lt(),at.add(window,"focus",D),at.add(window,"load",v),at.add(window,"load",S),
Ot.addEventListener?Ot.addEventListener("DOMContentLoaded",P,!1):Ot.attachEvent?Ot.attachEvent("onreadystatechange",ot):(f("onload",!1),
E({
type:"NO_DOM2_EVENTS",
fatal:!0
}));
}
var t,n=null;
return void 0!==window.SM2_DEFER&&SM2_DEFER||(n=new e),window.soundManager=n,n;
});