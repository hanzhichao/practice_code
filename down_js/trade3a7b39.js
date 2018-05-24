define("common/wx/trade.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js","common/qq/prototype.js"],function(t,i,n){
"use strict";
function e(t){
this.opt=t,this.container=$(t.container),this.label=this.opt.label||{
field1:"未选择",
field2:"未选择"
},this.init();
}
{
var o=t("common/wx/Cgi.js"),a=t("biz_web/ui/dropdown.js");
t("common/qq/prototype.js");
}
e.prototype={
init:function(){
var t,i=this;
$.each(["field1","field2"],function(t,n){
i.container.append('<div class="%s"></div>'.sprintf(n));
}),o.get({
url:"/advanced/tmplmsgapply?action=apply&f=json",
mask:!1
},function(n){
switch(n.base_resp.ret){
case 0:
t=$.parseJSON(n.store_tmpl_class_info),i.opt.initData&&i.opt.initData.field1||i.initItem("field2",[]),
i.initItem("field1",t.class_info.sub_class);
}
});
},
initItem:function(t,i){
var n,e=this,o=e.container.find("."+t).get(0),l=[];
if(e.opt.list&&e.opt.list[t])for(n=0;n<e.opt.list[t].length;n++)l.push({
name:e.opt.list[t][n].name,
value:e.opt.list[t][n].id
});
for(n=0;n<i.length;n++)l.push({
name:i[n].name,
value:n
});
e[t]=new a({
container:o,
label:e.label[t],
data:l,
callback:function(n,o){
e.opt.input&&e.opt.input[t]&&$(e.opt.input[t]).val("name"==e.opt.input.type?o:id),
"field1"==t&&e.opt.input&&e.opt.input.field2&&$(e.opt.input.field2).val(""),e.opt.onChange&&e.opt.onChange(t,n,o),
i[n]&&i[n].sub_class&&i[n].sub_class.length>0&&"field1"==t?e.initItem("field2",i[n].sub_class):"field1"==t&&e.initItem("field2",[]);
}
}),e.opt.initData&&e.opt.initData[t]&&(e[t].selected(e.opt.initData[t]),e.opt.initData[t]=null);
},
get:function(t){
return this[t].name;
},
getAll:function(){
return{
field1:this.get("field1"),
field2:this.get("field2")
};
}
},n.exports=e;
});