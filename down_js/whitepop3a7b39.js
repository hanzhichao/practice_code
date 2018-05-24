define("original/whitepop.js",["original/tpl/whitepop.html.js","common/wx/popover.js"],function(o){
"use strict";
function e(o){
var e=this;
e.opt=$.extend(!0,{},p,o);
var n=e.opt.dom;
n.html(template.compile(i)({
showAllowRe:!1,
showModify:!1,
showHideSor:!1
})),n.find(".js_popinput").checkbox({
multi:!0,
onChanged:function(){
if(this.values().length>0||e.opt.showAllowRe){
var o=this.values(),i=o.indexOf("md")>-1?"1":"0",p=Number(i)&&o.indexOf("hs")>-1?"1":"0";
if(!Number(i))return n.find(".js_popinput").eq(1).checkbox("disabled",!0),n.find(".js_popinput").eq(1).checkbox("checked",!1),
void e.opt.bad();
n.find(".js_popinput").eq(1).checkbox("disabled",!1),e.opt.done({
can_modify:i,
can_hide_source:p
});
}else 0==this.values().length?(n.find(".js_popinput").eq(1).checkbox("disabled",!0),
n.find(".js_popinput").eq(1).checkbox("checked",!1),e.opt.bad()):e.opt.bad();
}
}),n.find(".js_popinput").eq(1).checkbox("disabled",!0);
}
var i=o("original/tpl/whitepop.html.js"),p=(o("common/wx/popover.js"),{
dom:null,
showAllowRe:!1,
done:$.noop,
bad:$.noop
});
return e;
});