define("cardticket/add/business_service.js",["biz_web/ui/checkbox.js"],function(e){
"use strict";
function c(e){
this.service_checkbox=$(e.container).find("input").checkbox();
}
e("biz_web/ui/checkbox.js");
return template.helper("$has_service",function(e,c){
return e&&e&1<<c-1?"checked":"";
}),c.prototype.val=function(){
for(var e=this.service_checkbox.values(),c=0,i=0;i<e.length;i++){
var t=parseInt(e[i]);
c+=1<<t;
}
return c;
},c;
});