define("cardticket/select_shop_popup.js",["cardticket/select_shop.js","common/wx/popup.js","common/wx/Tips.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{},p,t);
var e=this,t=this.opt;
this.opt.buttons=[],t.hasnext&&this.opt.buttons.push({
text:"取消",
type:"default",
click:function(){
this.remove();
}
}),this.opt.buttons.push({
text:t.hasnext?"下一步":"完成",
click:function(){
var o={},p=e.shop_select.values(o);
return o.nostore||p&&p.length?t.selectLimit&&p.length>+t.selectLimit?void s.err("超过选择的数量限制："+t.selectLimit):(this.hide(),
void e.opt.selectComplete(p,o)):void s.err("请选择门店");
},
type:"primary"
});
var i=t.onHide;
this.opt.onHide=function(){
this.remove(),"function"==typeof i&&i.call(e);
},e.$popup=$("<div class='js_shop_popup_container'></div>").popup(t),t.container=e.$popup.popup("get").find(".js_shop_popup_container");
var n=t.initComplete;
t.initComplete=function(){
e.$popup.popup("resetPosition"),"function"==typeof n&&n.call(e);
},t.selectAll=function(){
e.$popup.popup("hide");
var t={},o=this.values(t);
e.opt.selectComplete(o,t);
},this.shop_select=new o(t);
}
var o=t("cardticket/select_shop.js"),p=(t("common/wx/popup.js"),{
autoShow:!1,
title:"选择门店",
hasnext:!1,
selectComplete:$.noop
}),s=t("common/wx/Tips.js");
return e.prototype={
show:function(){
this.$popup.popup("show");
},
getData:function(){
return this.shop_select.opt.data;
},
getCacheData:function(){
return this.shop_select.cache_data;
}
},e;
});