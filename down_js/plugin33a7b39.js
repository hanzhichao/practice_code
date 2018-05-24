define("homepage/plugins/plugin3.js",["page/homepage/plugins/plugin3.css","tpl/homepage/plugins/plugin3.html.js","tpl/homepage/plugins/plugin3_edit.html.js","homepage/plugins/base.js","common/wx/wxt.js","homepage/importAppmsgList.js","common/wx/Tips.js"],function(i){
"use strict";
i("page/homepage/plugins/plugin3.css");
var t=i("tpl/homepage/plugins/plugin3.html.js"),p=i("tpl/homepage/plugins/plugin3_edit.html.js"),e=i("homepage/plugins/base.js"),n=i("common/wx/wxt.js"),s=e.base,o=e.inherit,l=i("homepage/importAppmsgList.js"),r=i("common/wx/Tips.js"),g={
plugin3:{
appmsg_list:[{
title:"封面示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6vDmpWKn1M8Sk9tNGOiaGPPmxxPoXR7GM16AFk2lsfiaL2iapIm0RFicCvA/300",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
},{
title:"封面示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6vDmpWKn1M8Sk9tNGOiaGPPmxxPoXR7GM16AFk2lsfiaL2iapIm0RFicCvA/300",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
}]
}
},a=function(i){
var t=this;
t.opt=i,s.apply(this,arguments),this._initEditArea();
};
return o(a,s),a.prototype.tpl=t,a.prototype.edit_tpl=p,a.prototype.default_json=g,
a.prototype._initEditArea=function(){
var i=this.opt,t=this,p=i.idx,e=$("#js_plugin_edit_area_"+p),n=(e.find(".js_appmsg_list"),
[]);
t.renderjson.plugin3&&t.renderjson.plugin3.appmsg_list&&(n=t.renderjson.plugin3.appmsg_list),
t.isSorting=!1,t._importAppmsgList=new l({
container:e.find(".js_import_appmsglist"),
maxNum:30,
title:"内容列表",
list:n,
callback:function(i){
var p=$.extend(!0,{},t.default_json);
i&&i.length>0?(p={
plugin3:{
appmsg_list:i
}
},t.renderjson=p):t.renderjson={
plugin3:{
appmsg_list:[]
}
},t._renderTpl(p);
},
startSort:function(){
t.isSorting=!0;
},
endSort:function(){
t.isSorting=!1;
}
});
},a.prototype._getSelectList=function(){
var i=!!this.renderjson.plugin3&&this.renderjson.plugin3.appmsg_list;
if(i&&i.length>0){
for(var t=[],p=0,e=i.length;e>p;++p)t.push(i[p].aid);
return t;
}
return[];
},a.prototype.getRenderJson=function(i){
return i&&i.plugin3&&i.plugin3.appmsg_list&&i.plugin3.appmsg_list.length>0?i:$.extend(!0,{},this.default_json);
},a.prototype.getEditData=function(){
if(this.isSorting)return r.err("排序完成后才能发布"),!1;
var i=this._getSelectList();
return i.length>0?{
aid_list:i
}:(r.err("请至少选择一篇文章"),!1);
},a.getRenderHTML=function(i){
var p="plugin",e={};
e[p]=i;
var s=t.replace(/<name>/gi,p);
return n.compile(s)(e);
},a;
});