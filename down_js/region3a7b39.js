define("common/wx/region.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js"],function(t,e,n){
"use strict";
var i=t("common/wx/Cgi.js"),o=t("biz_web/ui/dropdown.js"),a={
disabled:!1
},c=function(t){
this.opt=$.extend(!0,{},a,t),this.container=$(t.container),this._action=null,u.call(this);
},r="/cgi-bin/getregions?t=setting/ajax-getregions&id={id}",s={
country:"国家",
province:"省份",
city:"城市"
},l=function(t){
return void 0===t&&(t=""),t+="",t&&t.replace(/(\u00a0|&nbsp;)/g," ").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'");
},p=function(t,e){
var n=wx.url(r.format({
id:t||-1
}));
i.get({
url:n,
mask:!1
},e);
},u=function(){
var t=this;
t.opt.cgi&&(r=t.opt.cgi+"?t=setting/ajax-getregions&id={id}"),t.opt.list?$.each(["country","province","city"],function(e,n){
t.opt.list[n]=t.opt.list[n]||[];
}):t.opt.list={
country:[],
province:[],
city:[]
},t.opt.display=t.opt.display||{
country:!0,
province:!0,
city:!0
},t.selectors={},$.each(["country","province","city"],function(e,n){
var i="js_"+n+(1e4*Math.random()|0);
$('<div id="'+i+'" style="display:none"></div>').appendTo(t.container),t.selectors[n]="#"+i;
}),d.call(this,"0","country");
},d=function(t,e){
var n=this;
n._action=t,n.status="loading",p(t,function(i){
if(i&&i.base_resp&&0==i.base_resp.ret&&n._action==t){
n.status="loaded";
var o=[],a=n.opt.list[e];
$.each(i.data,function(t,i){
var a=l($.trim(i.name)).replace(/"/g,"&quot;"),c=!0;
n.opt.retain&&n.opt.retain[e]&&n.opt.retain[e].length>0?n.opt.retain[e].indexOf(parseInt(i.id,10))>-1?"中国"==a?o.unshift({
name:a,
value:i.id
}):o.push({
name:a,
value:i.id
}):c=!1:"中国"==a?o.unshift({
name:a,
value:i.id
}):o.push({
name:a,
value:i.id
}),c&&n.opt.remove&&n.opt.remove[e]&&n.opt.remove[e].length>0&&-1!=n.opt.remove[e].indexOf(parseInt(i.id,10))&&("中国"==a?o.shift():o.pop());
}),o=a.concat(o),n.opt.is_overseas&&$.each(o,function(t,e){
"中国"==e.name?o[t].name="中国大陆":"中国香港"==e.name?o[t].name="香港":"中国澳门"==e.name?o[t].name="澳门":"中国台湾"==e.name&&(o[t].name="台湾");
}),h.call(n,e,o);
var c=n.opt.data;
c&&c[e]&&n[e].selected(c[e]),(v.call(n,e)||0==n.opt.display[e])&&n[e].container.hide(),
(v.call(n,e)||"city"==e)&&n.opt.onComplete&&n.opt.onComplete.call(n),n.opt.onLoadComplete&&n.opt.onLoadComplete.call(n,e,t);
}
});
},h=function(t,e){
var n=this;
n[t]=new o({
container:n.selectors[t],
label:s[t],
data:e,
disabled:n.opt.disabled,
callback:function(e,i){
switch(t){
case"country":
d.call(n,e,"province");
break;

case"province":
d.call(n,e,"city");
}
switch(t){
case"country":
n.province&&n.province.container.hide(),n.province=null;

case"province":
n.city&&n.city.container.hide(),n.city=null;
}
n.opt.onChange&&n.opt.onChange(t,e,i);
}
}),n[t].container.show();
},v=function(t){
return"loading"!=this.status&&(null==this[t]||0==this[t].opt.data.length);
},m={
get:function(t){
return v.call(this,t)?"":this[t]&&this[t].name||-1;
},
getAll:function(){
return{
country:this.get("country"),
province:this.get("province"),
city:this.get("city")
};
}
};
$.extend(c.prototype,m),n.exports=c;
});