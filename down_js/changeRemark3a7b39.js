define("cardticket/changeRemark.js",["common/wx/Tips.js","common/qq/events.js","common/wx/Cgi.js","common/wx/simplePopup.js"],function(n,e,t){
"use strict";
var i=n("common/wx/Tips.js"),o=n("common/qq/events.js"),c=o(!0),m=n("common/wx/Cgi.js"),s=n("common/wx/simplePopup.js"),r=function(){
this.id=null,this.remarkName=null,this._init();
};
r.prototype={
_init:function(){
var n=this;
c.off("Remark:change"),c.on("Remark:change",function(e,t){
n.show(e,t);
});
},
show:function(n,e){
this.id=n,this.remarkName=e;
var t=this;
new s({
title:"添加备注",
callback:function(e){
m.post({
url:wx.url("/merchant/carduse"),
data:{
action:"remarkchecker",
openid:n,
remark:e
}
},function(){
i.suc("修改备注成功"),c.trigger("Remark:changed",t.id,(e+"").html(!0));
});
},
rule:function(n){
return n.length<=30;
},
value:(e+"").html(!1),
msg:"备注不能超过30个字"
});
},
hide:function(){}
},t.exports=new r;
});