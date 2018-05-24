define("cardticket/clickreport.js",["biz_web/lib/store.js","biz_common/jquery.md5.js"],function(e){
"use strict";
function t(e){
e||(e=location.href);
var t=e.indexOf("?");
if(t>=0){
e=e.substr(t+1);
for(var n=e.split("&"),r={},o=0;o<n.length;o++){
var i=n[o].split("=");
i[0]&&i[1]&&(r[i[0]]=decodeURIComponent(i[1]));
}
return r;
}
return{};
}
var n=e("biz_web/lib/store.js");
e("biz_common/jquery.md5.js");
var r=function(){
function e(e,t){
t||(t=2);
var n;
return n=2==t?"time_on_page":"action_id","/merchant/cardclickreport?action=report&"+n+"="+e+"&type="+t+"&url="+encodeURIComponent(location.href)+"&page_id="+encodeURIComponent(r(location.href))+"&from_page_id="+encodeURIComponent(r(document.referrer))+"&referer="+encodeURIComponent(document.referrer)+"&bizuin="+wx.data.uin+"&timestamp="+ +new Date+"&_token="+wx.data.t;
}
function r(e){
e||(e=location.href),e||(e="");
var n=e;
e=e.replace(location.protocol+"//"+location.host,"");
var r=e.indexOf("?"),o=r>=0?e.substring(0,r):e,i=t(e),a=o.replace(/\/$/,"")+(i.action?"?action="+i.action:i.t?"?t="+i.t:"");
return o.indexOf("electroniccardmgr")>=0&&/^addpage|batch$/.test(i.action)&&(a+="&flag="+(i.flag?i.flag:"0")),
o.indexOf("cardstat")>=0&&/^cardstatpage|carddetailstatpage$/.test(i.action)&&(a+="&ispay="+(i.ispay?i.ispay:"0")),
s.transformUrl&&(a=s.transformUrl(n,a)),a;
}
function o(){
s.clickele(this,!0);
}
function i(e){
for(var t=e.target,n=0;4>n&&t&&t!==document.body;){
var r=$(t).attr("data-actionid");
if(r){
s.clickele(t);
break;
}
t=t.parentNode,n++;
}
}
function a(e){
if(s.transformEle){
var t=s.transformEle(e);
if(t)return t;
}
if(e===document)return!1;
if($(e).closest(".col_side").length||$(e).closest("#header").length)return!1;
if(e.isdelegate)return e;
var n=$._data(e,"events"),r=n&&n.click,o=e.tagName.toLowerCase(),i=e.getAttribute("type"),a=e.parentNode.className||"",c=e.className||"";
if(c.indexOf("lbl_content")>=0)return!1;
if((a.indexOf("frm_checkbox_label")>=0||a.indexOf("frm_radio_label")>=0)&&-1===c.indexOf("frm_radio")&&-1===c.indexOf("frm_checkbox"))return!1;
if("input"==o&&("checkbox"==i||"radio"==i))return e.isdelegate=!0,e;
if("label"==o&&c.indexOf("frm_radio_label")>=0||c.indexOf("frm_checkbox_label")>=0)return!1;
var d=e.className||"",a=e.parentNode.className||"";
if(d.indexOf("jsBtLabel")>=0||d.indexOf("jsDropdownBt")>=0){
var l=$(e).closest(".dropdown_menu")[0];
return l.isdelegate=!0,l;
}
if(d.indexOf("jsDropdownItem")>=0||a.indexOf("jsDropdownItem")>=0)return!1;
var f=e.parentNode,u=e.id||"";
if(r&&r.length){
if(0==u.indexOf("calendar_")||0==u.indexOf("dateRangeNextMonth")||0==u.indexOf("dateRangePreMonth"))return!1;
if(c.indexOf("ta_btn")>=0)return e.isdelegate=!0,e;
if(0==u.indexOf("js_dateRangeTitle")||0==u.indexOf("js_dateRangeTrigger")){
var l=$(e).closest(".ta_date").parent()[0];
return l.isdelegate=!0,l.type="daterange",l;
}
return e.isdelegate=!0,e;
}
for(var f=e.parentNode,p=0;f&&f!==document;){
if(n=$._data(f,"events"),r=n&&n.click,r&&r.delegateCount>0)for(var m=0;m<r.length;m++){
var _=r[m].selector;
if($(e).is(_))return e.isdelegate=!0,e;
}
f=f.parentNode,p++;
}
for(var g=3,m=0,h=e;g>m&&h&&h!==document.body;){
if("a"===h.tagName.toLowerCase()){
var b=h.getAttribute("href")||"";
if(0==b.indexOf("javascript:")){
h=h.parentNode;
continue;
}
return void s.clickele(h);
}
h=h.parentNode;
}
for(var h=e.parentNode,m=0;h&&h!==document&&5>m;){
var v=$._data(h,"events"),r=v&&v.click;
if(r&&r.length&&$(h).data("actionid"))return h.isdelegate=!0,h;
h=h.parentNode,m++;
}
return s.notfoundele?s.notfoundele(e):!1;
}
function c(e){
if(e||(e=""),e=$.trim(e),!e)return 0;
e=$.md5(e).substr(0,8).toLowerCase();
for(var t="a".charCodeAt(0),n=0,r=1,o=0;o<e.length;o++){
var i=e[o];
n+=i>="0"&&"9">=i?parseInt(i)*r:(e.charCodeAt(o)-t+10)*r,r*=16;
}
return n;
}
function d(e){
if($(e).attr("data-actionid")){
var t,n,r=$(e).offset();
t=l($(e).text()),t||(t=$(e).attr("data-tooltip")),n||(n=$(e).attr("type"));
var o=e.tagName.toLowerCase();
if("input"===o)("checkbox"==e.type||"radio"==e.type)&&(t=l($(e.parentNode).find(".lbl_content").text()),
r=$(e.parentNode).offset()),"submit"===e.type||"button"===e.type?(n="button",t=e.value):n=e.type||"text";else if($(e).hasClass("dropdown_menu"))n="dropdown",
t=$(e).attr("id");else if("a"===o){
var i=$(e).attr("href");
n=i&&0!==i.indexOf("javascript:")?"link":"btn";
}else"button"===o?n="button":e.className.indexOf("ta_btn")>=0?n="daterange":$(e).hasClass("btn")?n="button":"daterange"==e.type&&(n=e.type,
t=e.id);
s.transformText&&(t=s.transformText(e,t)),s.transformType&&(n=s.transformType(e,n));
for(var a="",d=0;d<s.modulefunc.length;d++){
var f=s.modulefunc[d].call(s,e,n,t);
if(f!==!1&&f&&(a=f),f===!1)return;
}
var u=$(e).attr("data-actionid")||0;
if((t||u)&&(t=a?a+"_"+t:t,t&&t.length>50&&(t=t.substr(0,50)),u||(u=c(t),s.getActionid&&(u=s.getActionid(e,n,t)),
u)))return{
type:n,
text:t,
actionid:u,
offset:r
};
}
}
function l(e){
return $.trim(e).replace(/\r|\n/g,"");
}
var s={
click:function(e){
e=$.extend(!0,{
x:0,
y:0,
inputtype:"",
text:"",
action_id:0
},e),this.send({
url:"/merchant/cardclickreport?action=report&type=1&action_id="+e.action_id+"&inputtype="+e.inputtype+"&x="+e.x+"&y="+e.y+"&text="+encodeURIComponent(e.text||0)
});
},
timeonpage:function(e){
e||(e={}),e.begintime||(e.begintime=this._begintime||this.begintime()),e.begintime&&(e.usetime=+new Date-e.begintime,
this.send({
url:"/merchant/cardclickreport?action=report&time_on_page="+e.usetime+"&type=2&action_id="+(e.actionid||0),
onabort:function(e){
e.store_time();
},
callback:function(){}
}));
}
},f="__time_cache_key__",u=r(location.href)+"__"+Math.random(),p=3e3,m=u+"_end_time";
return s.store_time=function(){
if(n){
var t=this;
t._endtime=+new Date;
var r=t._endtime-t._begintime,o=e(r);
try{
var i=[],a=n.get(f);
a&&(i=a.split("|")),i.indexOf(u)<0&&(i.push(u),n.set(f,i.join("|"))),n.set(m,t._endtime),
n.set(u,o);
}catch(c){
throw c;
}
}
},s.report_store_vals=function(){
if(n)try{
var e=n.get(f);
if(e){
for(var t,r=e.split("|"),o=[],i=0;i<r.length;i++){
t=n.get(r[i]);
var a=n.get(r[i]+"_end_time");
+new Date-parseInt(a)>p?(n.remove(r[i]),n.remove(r[i]+"_end_time"),this.sendurl(t+"&abort=1")):o.push(r[i]);
}
n.set(f,o.join("|"));
}
}catch(c){
throw c;
}
},s.sendurl=function(e){
var t=new Image,n="__timeonpage_report__"+Math.random();
window[n]=t,t.onload=t.onerror=t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null;
},t.src=e+wx.data.param;
},s.send=function(e){
var t=new Image,n="__timeonpage_report__"+Math.random(),o=this;
window[n]=t,t.onload=t.onerror=t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null,e.callback&&e.callback();
},t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null,e.onabort&&e.onabort(o);
},t.src=e.url+"&url="+encodeURIComponent(location.href)+"&page_id="+encodeURIComponent(r(location.href))+wx.data.param+"&from_page_id="+encodeURIComponent(r(document.referrer))+"&referer="+encodeURIComponent(document.referrer)+"&bizuin="+wx.data.uin+"&timestamp="+ +new Date+"&_token="+wx.data.t;
},s.regclick=function(){
$(document).on("click",".js_clickreport",o);
},wx&&!wx.str2int&&(wx.str2int=c),s.hasevent=a,s.click4ie=function(e){
document.addEventListener||this.clickele(e);
},s.clickele=function(t,n){
if((n||$(t).attr("data-actionid"))&&(n||!this.canreport||this.canreport(t))){
var o,i,a="",c=d(t);
if(c){
o=c.text,a=c.type;
var l=c.actionid;
if(i=c.offset,l){
var s=$("#js_container_box").offset();
if(s||(s=$("#body").offset()),s){
var f=e(l,1);
f+="&x="+parseInt(i.left-s.left)+"&y="+parseInt(i.top-s.top)+"&text="+encodeURIComponent(o||"")+"&inputtype="+a,
this.sendurl(f),console&&console.log&&(console.log(c),console.log(r(location.href)));
}
}
}
}
},s.reportele=s.clickele,s.report=function(t){
var n=e(t,1);
n+="&x=0&y=0&text="+encodeURIComponent(t||"")+"&inputtype=",this.sendurl(n);
},window.report_click_ele=function(e){
return s.clickele(e);
},window.report_click=function(e){
return s.report(e);
},s.regcommonclick=function(){
document.addEventListener?document.addEventListener("click",i,!1):$(document).on("click",i);
},s.getparams=function(e){
return d(e);
},window._getreportparams=function(e){
var t=$(e)[0];
return t?s.getParam(t):null;
},s.regtimeonpage=function(){
var e=this;
this._begintime=this.begintime(),$(window).on("unload",function(){
e.timeonpage();
}),setInterval(function(){
e.report_store_vals();
},3e3),this.report_store_vals();
},s.begintime=function(){
return window._points&&window._points[0]||+new Date;
},s.regpv=function(){
var e=this;
setTimeout(function(){
e.click({
action_id:"0",
x:0,
y:0,
text:"",
inputtype:""
});
});
},s.regreport=function(){
s.regclick(),s.regtimeonpage(),s.regpv();
},s.setopt=function(e){
this.transformText=e.transformText,this.transformType=e.transformType,this.transformEle=e.transformEle,
this.transformUrl=e.transformUrl,this.canreport=e.canreport,this.getActionid=e.getActionid,
e.acl&&(this.acl=e.acl),this.notfoundele=e.notfoundele;
},s.modulefunc=[],s.acl={
dialog:!0,
popover:!1
},s.addmodulefunc=function(e){
"function"==typeof e&&s.modulefunc.push(e);
},s;
},o=r();
return o;
});