define("cardticket/detail/edit_custom_url.js",["cardticket/add/config_url.js","common/wx/Tips.js","common/wx/stopMultiRequest.js"],function(o){
"use strict";
function t(o){
function t(){
c.mod_config_url.is_max()?c.$adddom.addClass("btn_disabled"):c.$adddom.removeClass("btn_disabled");
}
var n=o.data;
this.opt=o,this.$dom=$(o.container),this.mod_config_url=new i({
data:n,
container:this.$dom.find(".js_config_url_p"),
onchanged:function(){
t();
},
max:3
});
var c=this;
this.$adddom=$(".js_add_config_url",this.$dom).click(function(){
return c.mod_config_url.is_max()?(d.err("最多只能添加3个自定义入口"),!1):void c.mod_config_url.add();
}),t(),$(".js_edit_custom_url_cancel",this.$dom).click(function(){
c.hide();
}),$(".js_edit_custom_url_submit",this.$dom).click(function(){
var o=c.mod_config_url.val();
return o?(o.action="mod_custom_url",o.id=n.id,void Cgi.post({
url:"/merchant/electroniccardmgr",
data:o,
btn:this
},function(o){
0==o.base_resp.ret?(d.suc("会员卡详情修改成功"),location.reload()):Cgi.handleRet(o,{
id:64463,
key:31,
url:"/merchant/electroniccardmgr"
});
})):!1;
});
}
var i=o("cardticket/add/config_url.js"),d=o("common/wx/Tips.js");
return o("common/wx/stopMultiRequest.js"),t.prototype.show=function(){
var o=this.opt.onshow;
this.$dom.show(),o&&o();
},t.prototype.hide=function(){
var o=this.opt.onhide;
this.$dom.hide(),o&&o();
},t;
});