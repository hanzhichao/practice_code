define("cardticket/invoice_bank.js",["biz_web/ui/dropdown.js","register/data_bank_city.js"],function(n){
"use strict";
function a(n){
this.opt=$.extend(!0,{},i,n),n=this.opt;
var a=this,c=n.bankInfo;
this.dropdownProvince=new t({
container:n.provinceDom,
label:c.bank_province?c.bank_province:"省份",
data:e.province,
callback:function(i){
a.province=i,$("#js_input_bank_name").val(a.val()),$("#js_input_bank_name").valid(),
a.dropdownCity&&a.dropdownCity.destroy(),a.dropdownCity=new t({
container:n.cityDom,
label:"城市",
data:e.city[i],
callback:function(n){
a.city=n,$("#js_input_bank_name").val(a.val()),$("#js_input_bank_name").valid();
},
search:!1
});
},
search:!1
}),c.bank_province&&(a.dropdownCity=new t({
container:n.cityDom,
label:c.bank_city?c.bank_city:"城市",
data:e.city[c.bank_province],
callback:function(n){
a.city=n,$("#js_input_bank_name").val(a.val()),$("#js_input_bank_name").valid();
},
search:!1
}));
}
var i={
provinceDom:"#js_div_bank_province",
cityDom:"#js_div_bank_city",
bankInfo:{}
},t=n("biz_web/ui/dropdown.js"),e=n("register/data_bank_city.js");
return a.prototype.val=function(){
var n=this;
return n.province&&n.city&&n.bank_name?n.province+n.city+n.bank_name:"";
},a;
});