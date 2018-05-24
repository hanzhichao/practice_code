define("homepage/plugins/plugin2.js",["page/homepage/plugins/plugin2.css","tpl/homepage/plugins/plugin2.html.js","tpl/homepage/plugins/plugin2_edit.html.js","homepage/plugins/base.js","common/wx/wxt.js","common/wx/Tips.js","homepage/cateList.js"],function(t){
"use strict";
t("page/homepage/plugins/plugin2.css");
var e=t("tpl/homepage/plugins/plugin2.html.js"),n=t("tpl/homepage/plugins/plugin2_edit.html.js"),i=t("homepage/plugins/base.js"),s=t("common/wx/wxt.js"),a=i.base,r=i.inherit,o=t("common/wx/Tips.js"),p=t("homepage/cateList.js"),l={
plugin2:{
cate_list:[]
}
},c=function(t){
var e=this;
e.opt=t,a.apply(this,arguments),this._initEditArea();
};
return r(c,a),c.prototype.tpl=e,c.prototype.edit_tpl=n,c.prototype.default_json=l,
c.prototype._createCateList=function(t,e){
var n=this.opt,i=this,s=n.idx,a=$("#js_plugin_edit_area_"+s),r=n.container,o=a.find(".js_tab_nav");
e=e||{},i.json[t]=e;
var l=new p({
container:a.find(".js_catelist_area"),
idx:t,
tab_container:o,
data:e,
setOuterJson:function(t){
i.json[this.idx]=t;
},
canRemove:function(){
var t=i._getRenderJson();
return t.plugin2.cate_list.length>1;
},
renderCallback:function(t){
var e=this.idx;
i.json[e]=t,i.selectTab=e,i._renderTpl(i._getRenderJson());
},
renderCnameCallback:function(t){
var e=this.idx;
i.json[e].cname=t;
var n=i._getRealShowIdx(e);
r.find(".js_cname_item").eq(n).text(t);
},
afterShow:function(){
var t=i._getRealShowIdx(this.idx);
r.find(".js_cname_item").eq(t).click(),r.find(".js_article_list").hide().eq(t).show();
},
afterRemove:function(){
i.json[this.idx]=!1,i.selectTab=0,i._renderTpl(i._getRenderJson()),o.find(".js_tab_nav_item").eq(0).click();
}
});
return l;
},c.prototype._initEditArea=function(){
{
var t=this.opt,e=this,n=t.idx,i=$("#js_plugin_edit_area_"+n),s=t.container;
i.find(".js_tab_nav");
}
this.json=[],this.selectTab=0,this.cateList=[];
var a=[];
e.renderjson.plugin2&&e.renderjson.plugin2.cate_list&&(a=e.renderjson.plugin2.cate_list);
var r=a.length;
r=r||2;
for(var p=0;r>p;++p){
var l=a[p];
this.cateList.push(this._createCateList(p,l));
}
this._renderTpl(this._getRenderJson()),s.on("click",".js_cname_item",function(){
s.find(".js_cname_item").removeClass("active"),$(this).addClass("active");
}),i.on("click",".js_add_nav",function(){
if(e.getCateLen()>=5)return o.err("最多只能添加5个分类"),!1;
var t=e.cateList.length,n={
cname:"",
appmsg_list:[]
},i=e._createCateList(t,n);
e.cateList.push(i),i.initShow();
}),r>0&&this.cateList[0].show();
},c.prototype._getRealCateIdx=function(t){
for(var e=this.json,n=0,i=e.length;i>n;++n)if(e[n]){
if(0>=t)return n;
t--;
}
return-1;
},c.prototype._getRealShowIdx=function(t){
for(var e=this.json,n=0,i=0;t>i;++i)e[i]&&n++;
return n;
},c.prototype._getRenderJson=function(){
for(var t=this.json,e=[],n=0,i=t.length;i>n;++n){
var s=t[n];
s&&e.push(s);
}
return{
plugin2:{
cate_list:e
}
};
},c.prototype._afterRenderTpl=function(){
var t=this.opt,e=t.container,n=this.selectTab||0,i=e.find(".js_cname_item"),s=i.length;
if(s>0&&(i.css({
width:100/s+"%"
}).removeClass("active").eq(n).addClass("active"),this.cateList)){
var a=this._getRealCateIdx(n);
a>=0&&a<this.cateList.length&&this.cateList[a].show();
}
},c.prototype.getRenderJson=function(t){
return t&&t.plugin2&&t.plugin2.cate_list&&t.plugin2.cate_list.length>0?t:$.extend(!0,{},this.default_json);
},c.prototype.getCateLen=function(){
for(var t=this.cateList,e=this.json,n=0,i=0,s=t.length;s>i;++i)e[i]&&t[i]&&n++;
return n;
},c.prototype.getEditData=function(){
for(var t=this.cateList,e=this.json,n=[],i=0,s=t.length;s>i;++i)if(e[i]&&t[i]){
var a=t[i],r=a.getEditData();
if(0==r)return a.show(),!1;
n.push(r);
}
return{
cate_list:n
};
},c.getRenderHTML=function(t){
var n="plugin",i={};
i[n]=t;
var a=e.replace(/<name>/gi,n);
return s.compile(a)(i);
},c;
});