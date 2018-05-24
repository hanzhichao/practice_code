define("common/wx/remark.js",["common/wx/Tips.js","common/qq/events.js","user/user_cgi.js","common/wx/simplePopup.js"],function(n,e,i){
"use strict";
var s=n("common/wx/Tips.js"),t=n("common/qq/events.js"),o=t(!0),m=n("user/user_cgi.js"),r=n("common/wx/simplePopup.js"),c=function(){
this.id=null,this.remarkName=null,this._init();
};
c.prototype={
_init:function(){
var n=this;
o.on("Remark:change",function(e,i){
n.show(e,i);
});
},
show:function(n,e){
this.id=n,this.remarkName=e;
var i=this;
new r({
title:"添加备注",
callback:function(n){
m.changeRemark(i.id,n,function(){
s.suc("修改成功"),o.trigger("Remark:changed",i.id,(n+"").html(!0));
});
},
rule:function(n){
return n.length<=30;
},
inputrequire:!1,
value:(e+"").html(!1),
msg:"备注不能超过30个字"
});
},
hide:function(){}
},i.exports=new c;
});