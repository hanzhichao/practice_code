define("scan/item_antifake.js",[],function(t,n,e){
"use strict";
function i(t){
t&&t.model&&(a=t.model),o=$("#js_form_antifake"),console.log("!!!!",a.getData()),
a.getData().antifake_info?o.show():o.hide();
}
var o,a=null;
e.exports={
init:i,
check:function(t){
return"function"==typeof t&&t.call(void 0,valid),!0;
},
triggerEditMode:function(){}
};
});