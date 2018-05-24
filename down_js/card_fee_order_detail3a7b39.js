define("cardticket/card_fee_order_detail.js",["cardticket/common_template_helper.js","tpl/cardticket/card_fee_order_detail.html.js"],function(t){
"use strict";
function e(t){
var e=t.data;
if(this.opt=t,e.buf){
if("string"==typeof e.buf)try{
e.buf=$.parseJSON(e.buf);
}catch(r){
e.buf={};
}
}else e.buf={};
for(var n=t.uin_to_username||[],i={},a=0;a<n.length;a++){
var c=n[a];
i[c.uin]=c.username;
}
template.helper("$uin_to_nickname",function(t){
return i[t]||t;
}),$(t.container).html(template.compile(o)(e)),t.autoShow?$(t.container).show():$(t.container).hide();
}
t("cardticket/common_template_helper.js");
var o=t("tpl/cardticket/card_fee_order_detail.html.js");
return e.prototype.show=function(){
var t=this.opt;
$(t.container).show(),t.onshow&&t.onshow();
},e.prototype.hide=function(){
var t=this.opt;
$(t.container).hide(),t.onhide&&t.onhide();
},e.prototype.destroy=function(){
var t=this.opt;
$(t.container).html(""),this.hide();
},e;
});