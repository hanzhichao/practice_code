define("register/step4.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","biz_common/jquery.validate.js","register/mod/form_person.js","register/mod/form_ent.js","register/mod/form_media.js","register/mod/form_gov.js","register/mod/form_other.js","register/mod/form_team.js"],function(t,e,o){
"use strict";
function r(){
d=$("#js_div_step4_head"),c=$("#js_form_step4"),m=$("#js_div_fakebtn"),_.setData(function(t){
t.fileUrls=h;
});
}
function s(){
1==_.getData().refill&&"1"!=_.getData().no_reason&&d.append(p("tpl_step4_head_refill",_.getData())),
d.append(4==_.getData().service_type?p("tpl_step4_head_firm",_.getData()):p("tpl_step4_head_normal",_.getData()));
}
function i(){
$(".js_btn_contractor_type").on("click",function(t){
if(t.preventDefault(),$(this).hasClass("selected"))return!1;
if($(this).hasClass("btn_disabled"))return!1;
if($(".js_btn_contractor_type").filter(".selected").length>0){
var e=confirm("查看其他类别页面将会清空本类别已经填写的内容和上传的资料，是否继续？");
if(!e)return!1;
}
$(".js_btn_contractor_type").removeClass("selected"),$(this).addClass("selected");
var o=1*$(this).data("type");
$(".js_form_tips").hide(),$(".js_form_tips_"+o).show(),$("#js_err_contractor_type").hide(),
_.setData(function(t){
t.contractor_type=o;
}),f[o].init({
model:_
}),m.hide();
}),1==_.getData().is_overseas&&($('.js_btn_contractor_type[form="entreg"]').click(),
$(".js_form_tips_1").hide()),1==_.getData().refill&&4!=_.getData().service_type&&1!=_.getData().is_old&&$(".js_btn_contractor_type").each(function(){
var t=$(this).data("type");
t==_.getData().contractor_type&&$(this).click(),$(this).disable();
}),$("#div_register").on("click",".js_btn_prev",function(t){
return t.preventDefault(),window.location.href=1==_.getData().is_overseas?"/acct/contractorpage?action=showsubmit&step=3&lang="+window.wx.data.lang:"/acct/contractorpage?action=showreg&step=3&lang="+window.wx.data.lang,
!1;
});
}
function n(){}
function a(t){
g||(_=t.model,g=!0,r(),s(),i(),n());
}
var _,d,c,m,p=template.render,g=(t("common/wx/Cgi.js"),t("common/wx/Tips.js"),t("common/wx/popup.js"),
t("biz_common/jquery.validate.js"),!1),f={
0:t("register/mod/form_person.js"),
1:t("register/mod/form_ent.js"),
2:t("register/mod/form_media.js"),
3:t("register/mod/form_gov.js"),
4:t("register/mod/form_other.js"),
5:t("register/mod/form_team.js")
},h={
govInfoRegister:"/mpres/zh_CN/htmledition/doc/xxdjb_zheng_fu-.doc",
govAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
mediaInfoRegister:"/mpres/zh_CN/htmledition/doc/xxdjb_mei_ti-.doc",
mediaAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
entAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
otherAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc"
};
o.exports={
init:a
};
});