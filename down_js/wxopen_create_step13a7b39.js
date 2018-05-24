define("wxopen/wxopen_create_step1.js",["common/wx/Tips.js","common/wx/Cgi.js","safe/Scan.js","common/wx/qrcheck.js"],function(e,c,n){
"use strict";
function s(e){
i=e.page,p=$(t("tpl_step1",i.data)),p.hide(),$("#js_div_steps").append(p);
}
function o(){
i.hideSteper(),p.show();
var e=null;
e=new a({
container:".js_div_qrcheck",
type:"check",
source:"create_weapp",
wx_name:wx.cgiData.wx_alias,
onconfirm:function(){
i.data.qrcheck_ticket=this.code,i.showStep(2);
}
});
}
var t=template.render,a=(e("common/wx/Tips.js"),e("common/wx/Cgi.js"),e("safe/Scan.js")),i=(e("common/wx/qrcheck.js"),
null),p=null;
n.exports={
init:s,
show:o
};
});