define("cardticket/add/maxlength.js",[],function(){
"use strict";
function t(t){
$(t.container).on("keyup",function(){
var n=$.trim($(this).val());
$(t.hint).text(Math.round((1==t.lentype?n.len()/2:n.length)||0));
}).keyup();
}
function n(n){
n||(n={}),$(n.container||".js_maxlength").each(function(){
var e=$(this).attr("data-maxlength"),a=$(this).attr("target");
e&&t({
container:this,
hint:a,
max:e,
lentype:n.lentype||1
});
});
}
return n;
});