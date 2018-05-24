define("cardticket/common_validate.js",["biz_common/jquery.validate.js","cardticket/common_template_helper.js"],function(t){
"use strict";
var e=t("biz_common/jquery.validate.js"),o=t("cardticket/common_template_helper.js");
return $.validator.addMethod("byteMaxLength",function(t,e,o){
return this.optional(e)||t.len()<=o;
},"_(必须为小于{0}个字节)"),$.validator.addMethod("utf8byteMaxLength",function(t,e,r){
return this.optional(e)||o.strlen(t)<=r;
},"_(必须为小于{0}个字节)"),$.validator.addMethod("telephone",function(t){
var o=$.trim(t);
return/^[0-9]{3,4}-[0-9]{5,}$/.test(o)||e.rules.mobile(t);
}),$.validator.addMethod("telechar",function(t,e){
var o=$.trim(t);
return this.optional(e)||/^(-|[0-9])+$/.test(o);
}),$.validator.addMethod("posnum",function(t,e){
return this.optional(e)||/^[0-9\.]+$/.test(t)&&parseFloat(t)>=.01;
}),$.validator.addMethod("reduce_cost",function(t,e){
return this.optional(e)||parseFloat(t)>=1;
}),$.validator.addMethod("money",function(t,e){
return this.optional(e)||/^[0-9]+(\.[0-9]{1,2})?$/.test(t)&&parseFloat(t)>=.01;
}),$.validator.addMethod("service_phone",function(t){
var o=$.trim(t);
return/^[0-9]{3,4}-[0-9]{5,}$/.test(o)||e.rules.mobile(t);
}),$.validator.addMethod("customer_phone",function(t,o){
var r=$.trim(t);
return this.optional(o)||/^[-0-9]{5,15}$/.test(r)||e.rules.mobile(r);
}),$.validator.addMethod("discount",function(t){
var e=$("#js_supply_discount");
if(e.length&&!e.prop("checked"))return!0;
var o=$.trim(t);
return/^[0-9\.]+$/.test(o)&&parseFloat(o)>=1&&parseFloat(o)<10;
}),$.validator.addMethod("bonus_rules",function(t,e){
return!$("#js_supply_bonus").prop("checked")||""!=$.trim($(e).val());
}),$.validator.addMethod("check_friend_card_word",function(t,e){
return this.optional(e)||o.check_friend_card_word(t,function(){});
}),e;
});