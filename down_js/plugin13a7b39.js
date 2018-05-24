define("homepage/plugins/plugin1.js",["page/homepage/plugins/plugin1.css","tpl/homepage/plugins/plugin1.html.js","tpl/homepage/plugins/plugin1_edit.html.js","homepage/plugins/base.js","common/wx/wxt.js","homepage/importAppmsgList.js","common/wx/Tips.js"],function(t){
"use strict";
t("page/homepage/plugins/plugin1.css");
var i=t("tpl/homepage/plugins/plugin1.html.js"),e=t("tpl/homepage/plugins/plugin1_edit.html.js"),n=t("homepage/plugins/base.js"),p=n.base,s=n.inherit,o=t("common/wx/wxt.js"),g=t("homepage/importAppmsgList.js"),r=t("common/wx/Tips.js"),l={
plugin1:{
appmsg_list:[{
title:"封面示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6gnzTDiaOx5oOeMKOibNZ95hsY9aVozutJUSvqUvRmTxY2OqRvsTFeIyQ/640",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
},{
title:"封面示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6gnzTDiaOx5oOeMKOibNZ95hsY9aVozutJUSvqUvRmTxY2OqRvsTFeIyQ/640",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
}]
}
},a=function(t){
var i=this;
i.opt=t,p.apply(this,arguments),this._initEditArea();
};
return s(a,p),a.prototype.tpl=i,a.prototype.edit_tpl=e,a.prototype.default_json=l,
a.prototype._initEditArea=function(){
var t=this.opt,i=this,e=t.idx,n=$("#js_plugin_edit_area_"+e),p=(n.find(".js_appmsg_list"),
[]);
i.renderjson.plugin1&&i.renderjson.plugin1.appmsg_list&&(p=i.renderjson.plugin1.appmsg_list),
i.isSorting=!1,i._importAppmsgList=new g({
container:n.find(".js_import_appmsglist"),
maxNum:3,
title:"封面文章",
list:p,
callback:function(t){
var e=$.extend(!0,{},i.default_json);
t&&t.length>0?(e={
plugin1:{
appmsg_list:t
}
},i.renderjson=e):i.renderjson={
plugin1:{
appmsg_list:[]
}
},i._renderTpl(e);
},
startSort:function(){
i.isSorting=!0;
},
endSort:function(){
i.isSorting=!1;
}
});
},a.prototype._getSelectList=function(){
var t=!!this.renderjson.plugin1&&this.renderjson.plugin1.appmsg_list;
if(t&&t.length>0){
for(var i=[],e=0,n=t.length;n>e;++e)i.push(t[e].aid);
return i;
}
return[];
},a.prototype.getRenderJson=function(t){
return t&&t.plugin1&&t.plugin1.appmsg_list&&t.plugin1.appmsg_list.length>0?t:$.extend(!0,{},this.default_json);
},a.prototype.getEditData=function(){
if(this.isSorting)return r.err("排序完成后才能发布"),!1;
var t=this._getSelectList();
return t.length>0?{
aid_list:t
}:(r.err("请至少选择一篇文章"),!1);
},a.getRenderHTML=function(t){
var e="plugin",n={};
n[e]=t;
var p=i.replace(/<name>/gi,e);
return o.compile(p)(n);
},a;
});