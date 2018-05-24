define("cardticket/add/member_detail.js",["biz_web/ui/checkbox.js","common/wx/tooltips.js"],function(e){
"use strict";
function i(e){
function i(e){
e.each(function(e,i){
var o=$(i),t=o.prop("checked"),n=o.attr("target");
if(n){
var r=$("#js_"+n+"_item");
t?r.show():r.hide(),"bonus_rules"==n&&(t?$("#js_bonus_rule_detail").show():$("#js_bonus_rule_detail").hide());
}
});
}
var t=(e.data,$("#js_member_privilege .js_privilege"));
t.checkbox({
onChanged:function(e){
i(e);
}
}),new o({
container:$("#js_member_privilege .js_supply_bonus_ask"),
reposition:!0,
content:"积分有助于吸引用户成为忠实会员",
type:"hover"
}),new o({
container:$("#js_member_privilege .js_supply_discount_ask"),
reposition:!0,
content:"折扣优惠能够鼓励用户到店消费",
type:"hover"
}),i(t),this.$priv_checkbox=t;
}
e("biz_web/ui/checkbox.js");
var o=e("common/wx/tooltips.js");
return i.prototype.isvalid=function(){
var e=!1;
return this.$priv_checkbox.each(function(){
return $(this).prop("checked")?(e=!0,!1):void 0;
}),e;
},i;
});