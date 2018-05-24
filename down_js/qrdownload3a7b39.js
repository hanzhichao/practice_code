define("cardticket/qrdownload.js",["cardticket/common_template_helper.js","common/wx/popup.js","common/wx/Step.js","biz_common/moment.js","common/wx/Cgi.js","cardticket/send_card_table.js","cardticket/select_shop.js","tpl/cardticket/qrdownload_content.html.js"],function(e){
"use strict";
e("cardticket/common_template_helper.js");
var t=(e("common/wx/popup.js"),e("common/wx/Step.js")),o=(e("biz_common/moment.js"),
e("common/wx/Cgi.js"),{
removeOnHide:!0,
view_mode:window.view_mode||1
}),n=function(e){
this.opt=$.extend(!0,{},o,e),this.init();
},i=e("cardticket/send_card_table.js"),p=e("cardticket/select_shop.js");
return n.prototype={
_html:e("tpl/cardticket/qrdownload_content.html.js"),
init:function(){
function e(){
var e=c.popup("get").find(".js_btn_p");
$(e[0]).show(),$(e[1]).show(),$(e[2]).hide(),$(e[3]).hide(),d.step.go(1),$(a[0]).show(),
$(a[1]).hide(),c.popup("resetPosition");
}
function o(){
var e=c.popup("get").find(".js_btn_p");
$(e[0]).hide(),$(e[1]).hide(),$(e[2]).show(),$(e[3]).show(),$(a[0]).hide(),$(a[1]).show(),
d.step.go(2),c.popup("resetPosition"),console.dir(a.html()),d.qrdownloadTable2=new p({
pageCapacity:6,
container:$(".js_shop_list",a),
audit_state:"2|3|4",
pageChange:function(){
d.$send_popup.popup("resetPosition");
},
selectLimit:100,
multi:!0,
nostore:!1,
url:"/merchant/entityshop?action=list_by_card_id&card_id="+d.selectedCard.id,
selectComplete:n,
initComplete:function(){
this.$dom.find(".js_select_all").click();
}
});
}
function n(e,t){
if(0===t)d.selectedCard=e,o();else if(1===t){
d.selectedShop=e;
var n=d.selectedShop.join(","),i="/merchant/cardqrcode?action=copydownload_location&token="+wx.data.t+"&lang=zh_CN&location="+n+"&cardid="+d.selectedCard.id;
console.log(i),window.open(i);
}
}
var s=this.opt,d=this,c=$(template.compile(this._html)()).popup({
title:"制作门店二维码投放",
autoShow:!1,
buttons:[{
text:"取消",
type:"default",
click:function(){
d.qrdownloadTable.isLoading()||this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
d.qrdownloadTable.select(),c.popup("resetPosition");
}
},{
text:"上一步",
type:"default",
click:function(){
e(),c.popup("resetPosition");
}
},{
text:"确定",
type:"primary",
click:function(){
d.qrdownloadTable2.select()&&d.hide();
}
}],
onHide:function(){
s.onHide&&s.onHide.call(d),s.removeOnHide&&this.remove();
},
className:"send_card align_edge",
width:960
}),a=c.popup("get").find(".js_step_content");
this.$send_popup=c,this.step=new t({
container:this.$send_popup.find(".js_step_container"),
names:["1 选择卡券","2 选择投放门店"]
}),e(),s.container=this.$send_popup,s.pageChanged=function(){
d.$send_popup.popup("resetPosition");
},s.getDataComplete=function(){
d.$send_popup.popup("resetPosition");
},s.selectComplete=n,s.hidePopup=function(){
d.$send_popup.popup("hide");
},s.$dom=a,s.sns_card_type=0,this.qrdownloadTable=new i(s),this.qrdownloadTable2=null;
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
},n;
});