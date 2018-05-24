define("statistics/menu_stat/summary/version-tree.js",[],function(){
"use strict";
function n(){
this.versions={},this.clk_pv=0,this.clk_uv=0;
}
function e(n){
n.primary_menu_name=u.html(n.primary_menu_name||"").text(),n.secondary_menu_name=u.html(n.secondary_menu_name||"").text();
}
function t(n){
return"0"==n.parent_button_id;
}
n.prototype.build=function(n){
function t(){
_.clk_uv+=n.clk_uv,_.clk_pv+=n.clk_pv,u.clk_uv+=n.clk_uv,u.clk_pv+=n.clk_pv;
}
var u=this;
if(e(n),this.versions[n.version])var _=this.versions[n.version];else var _=this.versions[n.version]={
clk_pv:0,
clk_uv:0,
menus:{},
rawVersion:n.rawVersion
};
var r=n.button_id+n.button_key,v=n.parent_button_id+n.parent_button_key;
if(this.isParent(n)){
var i=_.menus[r];
return i?(i.clk_uv+=n.clk_uv,i.clk_pv+=n.clk_pv):(i=jQuery.extend({
menus:{}
},n),_.menus[r]=i),void t();
}
var i=_.menus[v]||{
clk_pv:0,
clk_uv:0,
menus:{},
button_id:n.parent_button_id,
button_key:n.parent_button_key,
parent_button_id:0,
parent_button_key:"",
id:n.parent_button_id+n.parent_button_key,
parent_id:"0",
primary_menu_name:n.primary_menu_name,
version:n.version
},s=i.menus[r];
s?(s.clk_uv+=n.clk_uv,s.clk_pv+=n.clk_pv):i.menus[r]=jQuery.extend({},n),i.clk_uv+=n.clk_uv,
i.clk_pv+=n.clk_pv,i.clk_av=0==i.clk_uv?0:i.clk_pv/i.clk_uv,t(),_.menus[v]=i;
};
var u=jQuery("<div/>");
return n.prototype.isParent=t,n.isParent=t,n.prototype.find=function(n,e,t){
var u=this.versions[n]||{
menus:{},
clk_uv:0,
clk_pv:0
};
if(!e)return u;
if("0"===e)return u.menus[t];
var _=u.menus[e]||{
menus:{},
clk_uv:0,
clk_pv:0
};
if(!t)return _;
var r=_.menus[t]||{
clk_uv:0,
clk_pv:0
};
return r;
},n;
});