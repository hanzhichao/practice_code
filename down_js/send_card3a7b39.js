define("cardticket/send_card.js",["common/wx/popup.js","common/wx/Step.js","cardticket/send_card_table.js","tpl/cardticket/send_card.html.js"],function(e){
"use strict";
var t=(e("common/wx/popup.js"),{
removeOnHide:!0,
view_mode:window.view_mode||0
}),p=(e("common/wx/Step.js"),function(e){
this.opt=$.extend(!0,{},t,e),this.init();
}),o=e("cardticket/send_card_table.js");
return p.prototype={
_html:e("tpl/cardticket/send_card.html.js"),
init:function(){
var e=this.opt,t=this,p=$(template.compile(this._html)()).popup({
title:"选择卡券",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
t.sendCardTable.select();
}
},{
text:"取消",
type:"default",
click:function(){
t.sendCardTable.isLoading()||this.hide();
}
}],
onHide:function(){
e.onHide&&e.onHide.call(t),e.removeOnHide&&this.remove();
},
className:"send_card align_edge",
width:960
});
if(this.$send_popup=p,e.container=this.$send_popup,e.pageChanged=function(){
t.$send_popup.popup("resetPosition");
},e.getDataComplete=function(){
t.$send_popup.popup("resetPosition");
},e.selectComplete){
var n=e.selectComplete;
e.selectComplete=function(){
n.call(t,arguments[0],arguments[1],arguments[2]),t.hide();
};
}else e.selectComplete=function(){
t.hide();
};
e.hidePopup=function(){
t.$send_popup.popup("hide");
},this.sendCardTable=new o(e);
},
show:function(){
this.$send_popup.popup("show"),this.$send_popup.popup("resetPosition");
},
hide:function(){
this.$send_popup.popup("hide");
},
destroy:function(){
this.$send_popup.popup("remove");
}
},p;
});