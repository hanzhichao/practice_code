define("cardticket/tools_store_qrcode.js",["cardticket/topmenu.js","cardticket/qrdownload.js","common/wx/dialog.js","cardticket/store_cgi.js"],function(t){
"use strict";
t("cardticket/topmenu.js").selected("cardsend");
var a=t("cardticket/qrdownload.js"),i=t("common/wx/dialog.js"),c=t("cardticket/store_cgi.js"),e=$("#js-btn-download");
e.click(function(){
if(wx.cgiData.no_location===!1&&wx.cgiData.no_available_card===!1){
var t=new a({
multi:!1,
param:{
status:"3|6",
is_filter_out_apicard:1,
need_member_card:1
},
onSendSubmit:function(){}
});
t.show();
}else{
if(wx.cgiData.no_available_card===!0)return!1;
if(wx.cgiData.no_location===!0){
$(this).btn(!1);
var e,n,o,s=this;
c.listStore({
success:function(t){
$(s).btn(!0),t.access_deny?(e="无门店权限，请前往开通",n="/merchant/newentityshop?action=apply",
o="开通门店"):(e="无有效门店，请先创建门店",o="创建门店",n=t.is_from_wxapoi?"/merchant/newentityshop?action=list":"/merchant/entityshop?action=list"),
i.show({
title:"提示",
msg:e,
type:"info",
buttons:[{
text:"取消",
type:"normal",
click:function(){
this.hide();
}
},{
text:o,
click:function(){
window.location.href=wx.url(n);
}
}]
});
}
});
}
}
}),wx.cgiData.no_available_card===!0&&e.removeClass("btn_primary").addClass("btn_disabled");
});