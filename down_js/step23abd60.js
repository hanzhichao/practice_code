define("wxverify/step2.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/qrcheck_weapp.js","common/wx/region.js","biz_common/aes.js","common/wx/overseasList.js","biz_web/lib/json.js","biz_common/jquery.validate.js","biz_web/ui/checkbox.js","wxverify/init.js","biz_web/utils/multiupload.js","common/qq/queryString.js","wxverify/entreg.js","wxverify/mediaentreg.js","wxverify/govreg.js","wxverify/nonprofitreg.js","wxverify/civilianreg.js","wxverify/profitablereg.js","wxverify/shopreg.js","wxverify/socialreg.js","wxverify/mediareg.js","wxverify/artistreg.js","wxverify/publicservice.js","wxverify/individualbizreg.js","wxverify/overseas_entreg.js","tpl/wxverify/entreg.html.js","tpl/wxverify/mediaentreg.html.js","tpl/wxverify/govreg.html.js","tpl/wxverify/nonprofitreg.html.js","tpl/wxverify/civilianreg.html.js","tpl/wxverify/profitablereg.html.js","tpl/wxverify/shopreg.html.js","tpl/wxverify/socialreg.html.js","tpl/wxverify/mediareg.html.js","tpl/wxverify/artistreg.html.js","tpl/wxverify/publicservice.html.js","tpl/wxverify/individualbizreg.html.js","tpl/wxverify/overseas_entreg.html.js","tpl/wxverify/commonreg.html.js","tpl/wxverify/step2.html.js","biz_web/lib/store.js"],function(e,t,i){
"use strict";
function a(e){
var t=R.get(e);
if(!t)return t;
try{
t=z.parse(b.AES.decrypt(t,wx.data.uin).toString(b.enc.Utf8));
}catch(i){}
return t;
}
function r(e,t){
try{
var i=b.AES.encrypt(z.stringify2(t),wx.data.uin).toString();
R.set(e,i);
}catch(a){}
}
function s(){
var e=$("#mp_operator_phone");
f&&clearTimeout(f);
var t=(new Date).getTime(),i=Math.floor((t-v)/1e3);
i>=60?($("#sendmobile").html("发送验证码").attr("disabled",!1).removeClass("btn_disabled"),
e.prop("readonly",!1),I=!0):(e.prop("readonly",!0),I=!1,$("#sendmobile").attr("disabled",!0).addClass("btn_disabled").html("%s秒后可重发".sprintf(60-i)),
f=setTimeout(s,1e3));
}
function o(){
function e(){
if(I){
var e=$.trim(i.val());
F.mobile(e)?t.attr("disabled",!1).removeClass("btn_disabled").addClass("btn_default"):t.attr("disabled",!0).addClass("btn_disabled").removeClass("btn_default");
}
}
var t=$("#sendmobile"),i=$("#mp_operator_phone");
i.keyup(e).blur(e).keyup(),t.click(function(){
var a;
"disabled"!==t.attr("disabled")&&(0==y.is_overseas?a="+86"+$.trim(i.val()):1==y.is_overseas&&(a=G[$("#js_input_country").val()]+$.trim(i.val())),
v=new Date,s((new Date).getTime()),g.post({
url:"/cgi-bin/contractorverify",
data:{
action:"verifycode",
mobile:a
},
mask:!1
},function(t){
if(!t||!t.base_resp)return I=!0,e(),void g.handleRet(t,{
id:"64430",
key:"12",
msg:"获取验证码失败"
});
var i=1*t.base_resp.ret;
if(0==i)w.suc("验证码已经发送");else{
switch(i){
case 200013:
w.err("登录超时，请重新登录");
break;

default:
g.handleRet(t,{
id:"64430",
key:"12",
msg:"获取验证码失败"
});
}
I=!0,e();
}
}));
});
}
function n(e,t,i){
O&&c(),O=x.init({
container:"#js_div_qrcheck",
container_class:"qrcheck_box primary",
cgiURI:"/cgi-bin/safeqrcode",
showImgInfo:!1,
size:120,
typeid:23,
msgData:{
name:t,
name_title:"运营者"
},
data:{
operator_name:t,
operator_id:e
},
extra:{
operator_name:t,
operator_id:e,
subject:i
},
onSuccess:function(e){
$("#js_input_qrcheck_ticket").val(e);
},
onFail:function(e,t){
$("#js_input_qrcheck_status").val(t);
},
onMsgUpdate:function(e,t,i){
console.log("onMsgUpdate:",e,t,i),$("#js_input_qrcheck_status").val(t);
},
onTipsChange:function(e,t){
var i="";
return i=1==e?$("#tpl_qrcheck_tips_1")[0].innerHTML:wx.T($("#js_div_qrcheck .js_qrcheck_ret_"+e)[0].outerHTML,t);
}
}),$.trim(e)&&$.trim(t)&&O.load();
}
function c(){
O&&(O.destroy(),$("#js_div_qrcheck").html(""),$("#js_input_qrcheck_ticket").val(""),
$("#js_input_qrcheck_status").val(""));
}
function l(){
var e=wx.cgiData.saveDataTimer;
e&&clearTimeout(e),wx.cgiData.saveDataTimer=null;
var t=$("#js_content form").serializeObject(),i=a(U),s={};
t.type==y.type&&y.data.name||(s[t.type]=t,r(U,$.extend(!0,i,s)),R.set(P,(new Date).valueOf()),
w.suc("已自动保存，仅在本机当天有效")),wx.cgiData.saveDataTimer=setTimeout(l,3e4);
}
function _(){
var e=R.get(P);
return new Date-e>864e5;
}
function d(e){
var t={
1:[1],
2:[7],
3:[9,2],
4:[3,11],
5:[4,8,5,6]
},i=0;
return $.each(t,function(t,a){
$.each(a,function(a,r){
r==e&&(i=t);
});
}),i;
}
function m(){
function e(){
h.hide(),f.html("");
}
function t(){
function e(){
var e=h.find('input[name="qy_operator_type"]:checked').data("type");
"1"==e?(h.find("#js_div_corp_id").hide(),$("#js_div_corp_id_letter").hide(),$("#js_div_non_corp_id_letter").show(),
$("#qy_operator_corp_id").val("")):(h.find("#js_div_corp_id").show(),$("#js_div_corp_id_letter").show(),
$("#js_div_non_corp_id_letter").hide());
}
function t(){
var e=1*$("#scale").val();
console.log(e),1e3>e?($("#js_div_ent_scale_verify_detail").hide(),$("#js_div_ent_scale_verify_detail").find("input, textarea").addClass("js_input_ignore")):($("#js_div_ent_scale_verify_detail").show(),
$("#js_div_ent_scale_verify_detail").find("input, textarea").removeClass("js_input_ignore"));
}
x.values();
console.log("currentType:",s),$("#fake_toolbar").hide(),wx.cgiData.saveDataTimer=setTimeout(l,3e4);
var i={
urls:A,
data:{},
refill_type:y.refill_type,
remark:wx.cgiData.remark||"",
baseData:wx.data
};
if(i.data=y.data,!(_()||y.data.name&&y.type==s)){
var r=a(U);
r&&r[s]&&(i.data=$.extend(!0,{},r[s],i.data));
}
_()&&(R.remove(U),R.remove(P)),i.data.currentType=s,i.data.preview_action="bizmedia",
i.data.artist_autorization_vedio_file_name=wx.cgiData.vedio_file_name,v.text(m),
i.data.serviceType=y.service_type,i.tmp_service_type=wx.cgiData.tmp_service_type,
i.data.tmp_service_type=wx.cgiData.tmp_service_type,i.is_overseas=wx.cgiData.is_overseas,
i.data.is_overseas=wx.cgiData.is_overseas,console.log(i),f.html(u(S[s],i)),h.show(),
E=$("#js_content form").serialize(),N[s](i),o(),q(),C.init({
container:$("#js_div_complement_material"),
title:"补充材料",
desc:"",
name:"attachment",
range:[1,10],
minUploadNum:0,
files:[{
id:i.data.attachment1,
preview:"multimedia"
},{
id:i.data.attachment2,
preview:"multimedia"
},{
id:i.data.attachment3,
preview:"multimedia"
},{
id:i.data.attachment4,
preview:"multimedia"
},{
id:i.data.attachment5,
preview:"multimedia"
},{
id:i.data.attachment6,
preview:"multimedia"
},{
id:i.data.attachment7,
preview:"multimedia"
},{
id:i.data.attachment8,
preview:"multimedia"
},{
id:i.data.attachment9,
preview:"multimedia"
},{
id:i.data.attachment10,
preview:"multimedia"
}]
}),2==y.refill_type&&$("#js_content .frm_tab").hide();
$("#has_extra_scale").checkbox({
onChanged:function(e){
"checked"==e.attr("checked")?$("#span_extra_scale").show():($("#extra_scale").val(""),
$("#span_extra_scale").hide());
}
});
if($("input[divlayer]").each(function(){
$(this).checkbox({
onChanged:function(e){
var t=e.attr("divlayer");
"checked"==e.attr("checked")?($("#"+t).show(),q()):$("#"+t).hide();
}
});
}),h.find('input[name="qy_operator_type"]').length>0&&(h.find('input[name="qy_operator_type"]').checkbox({
multi:!1,
onChanged:e
}),e()),"4"==wx.cgiData.tmp_service_type&&$("#organization_code").length>0&&$("#organization_code").on("change",function(){
var e=this,t=$(e).parents(".frm_controls").find(".frm_msg");
t.length<=0&&(t=$('<p class="frm_msg fail"></p>'),t.insertBefore($(e).parents(".frm_controls").find(".frm_tips"))),
t.hide(),g.post({
url:"/acct/wxverify?action=orgcode_check",
data:{
orgcode:$(e).val()
},
mask:!1
},function(e){
if(e&&0==e.base_resp.ret)if(0!=e.full){
var i="根据公众平台的规则，一个组织机构代码只能认证一个企业号。";
i+=e.operator_name&&e.operator_name[0]?"该组织机构代码已被认证其他企业号：%s。申请者：%s**，电话：%s。".sprintf(e.entity_name,e.operator_name[0],e.operator_phone[0]):"该组织机构代码已被认证其他企业号。",
i+="建议贵司内部协调使用同一企业号。如有其他问题，请咨询腾讯客服。",t.html(i).show();
}else t.hide();else t.hide(),g.handleRet(e,{
id:"64430",
key:"13",
showMsg:!1
});
});
}),$("#jsPrev").hide(),$("#jsPrev").click(function(){
location.href=T.replace(location.href,"step","proto");
}),"4"==wx.cgiData.tmp_service_type){
var d=null;
$("#scale").on("input propertychange",function(){
d&&clearTimeout(d),d=setTimeout(t,500);
}),t();
}
for(var p=["working_place_scale_stuff","biz_tel_scale_stuff","wages_paying_scale_stuff","social_insure_scale_stuff","earnings_scale_stuff","individual_tax_scale_stuff","branch_scale_stuff","relation_proof_stuff"],w=0;w<p.length;w++)i.data[p[w]]&&$("#"+p[w]).click();
$("#employee_div").find("input[type=checkbox]:checked").length>0&&$("#employee_check").click(),
0==wx.cgiData.can_modify_type&&($("input[name=level1]").checkbox("disabled",!0),
$("input[name=check_level]").checkbox("disabled",!0)),function(){
if(1!=wx.cgiData.is_overseas){
var e=$("#mp_operator_name"),t=$("#mp_operator_idcard_number"),i=$("#name"),a=null,r=function(){
e.val()&&e.valid()&&t.val()&&t.valid()&&i.val()&&i.valid()?($("#js_div_qrcheck_none").hide(),
n(t.val(),e.val(),i.val())):($("#js_div_idverify_none").show(),c());
},s=function(e){
switch(e.which){
case 16:
break;

case 17:
break;

case 18:
break;

case 27:
break;

case 35:
break;

case 36:
break;

case 37:
break;

case 38:
break;

case 39:
break;

case 40:
break;

case 78:
break;

case 110:
break;

case 190:
break;

default:
a&&clearTimeout(a),a=setTimeout(r,500);
}
};
e.on("keyup change",s),t.on("keyup change",s),i.on("keyup change",s),r();
}
}(),1==y.is_overseas&&new j({
container:"#js_div_location",
data:{
country:"中国大陆"
},
retain:{
country:H,
province:[-1],
city:[-1]
},
is_overseas:!0,
onChange:function(e,t){
$("#js_input_"+e).val(t);
}
});
}
var i=$(".js_type"),r=$(".js_detail"),s="0",m="",p=$("#js_fillList"),h=$("#js_fillForm"),v=$("#js_title"),f=$("#js_content");
$("#jsPrevCover").hide(),$("#jsPrevCover").click(function(){
location.href=T.replace(location.href,"step","proto");
});
{
var x=$("input[name=check_level]").checkbox({
multi:!1,
onChanged:function(e){
m=e.parent().find(".js_title").text(),s=e.val(),t(),$(".js_detail").hide(),0==e.parents(".js_detail").length?$("input[name=level1]:checked").checkbox("checked",!1):e.parents(".js_detail").show();
}
});
$("input[name=level1]").checkbox({
multi:!1,
onChanged:function(t){
$("input[name=check_level]").checkbox("checked",!1),e(),i.removeClass("item_selected"),
r.hide();
var a=t.closest(".js_type");
if(""!=a.data("onshow")){
var s=$(a.data("onshow")),o=s.find(".js_subSelect").find("input[type=radio]").size();
a.addClass("item_selected"),o>0&&o>1&&s.show();
}
}
});
}
$("#js_confirm_fake").on("click",function(){
w.err("请选择一种类型");
}),$("#js_change").on("click",function(){
($("#js_content form").serialize()==E||confirm("查看其它类别的页面将会丢失您刚才修改的内容和上传的资料，是否继续？"))&&(clearTimeout(wx.cgiData.saveDataTimer),
p.show(),h.hide());
}),y.type&&($("input[name=level1]").filter("[value="+d(y.type)+"]").click(),$("input[name=check_level]").filter("[value="+y.type+"]").click(),
$("#js_confirm").click());
}
function p(){
$(L).appendTo("body"),wx.cgiData.data.select_all_cust=wx.cgiData.select_all_cust,
console.log({
data:wx.cgiData.data,
order:wx.cgiData.order,
service_type:wx.cgiData.service_type,
tmp_service_type:wx.cgiData.tmp_service_type
}),$("#wxverify").html(u(M,{
data:wx.cgiData.data,
order:wx.cgiData.order,
service_type:wx.cgiData.service_type,
tmp_service_type:wx.cgiData.tmp_service_type,
fix_cust_type:wx.cgiData.fix_cust_type,
is_overseas:wx.cgiData.is_overseas,
remark:wx.cgiData.remark||"",
refill_type:wx.cgiData.refill_type||0
})),2==y.refill_type&&$("#js_fillList").hide(),7!=wx.cgiData.type&&$("#js_fillList .js_type_7").hide();
}
function h(){
for(var e in y.data)"string"==typeof y.data[e]&&(y.data[e]=(y.data[e]+"").replace(/<br\/>/g,"\n").html(!1));
}
var v,f,u=wx.T,y=wx.cgiData,g=e("common/wx/Cgi.js"),w=e("common/wx/Tips.js"),x=e("common/wx/qrcheck_weapp.js"),j=e("common/wx/region.js"),b=e("biz_common/aes.js"),k=e("common/wx/overseasList.js"),z=e("biz_web/lib/json.js"),D=e("biz_common/jquery.validate.js"),q=(e("biz_web/ui/checkbox.js"),
e("wxverify/init.js").initUpload),C=e("biz_web/utils/multiupload.js"),T=e("common/qq/queryString.js"),N={
1:e("wxverify/entreg.js"),
2:e("wxverify/mediaentreg.js"),
3:e("wxverify/govreg.js"),
4:e("wxverify/nonprofitreg.js"),
5:e("wxverify/civilianreg.js"),
6:e("wxverify/profitablereg.js"),
7:e("wxverify/shopreg.js"),
8:e("wxverify/socialreg.js"),
9:e("wxverify/mediareg.js"),
10:e("wxverify/artistreg.js"),
11:e("wxverify/publicservice.js"),
12:e("wxverify/individualbizreg.js"),
14:e("wxverify/overseas_entreg.js")
},S={
1:e("tpl/wxverify/entreg.html.js"),
2:e("tpl/wxverify/mediaentreg.html.js"),
3:e("tpl/wxverify/govreg.html.js"),
4:e("tpl/wxverify/nonprofitreg.html.js"),
5:e("tpl/wxverify/civilianreg.html.js"),
6:e("tpl/wxverify/profitablereg.html.js"),
7:e("tpl/wxverify/shopreg.html.js"),
8:e("tpl/wxverify/socialreg.html.js"),
9:e("tpl/wxverify/mediareg.html.js"),
10:e("tpl/wxverify/artistreg.html.js"),
11:e("tpl/wxverify/publicservice.html.js"),
12:e("tpl/wxverify/individualbizreg.html.js"),
14:e("tpl/wxverify/overseas_entreg.html.js")
},A={
govInfoRegister:"/mpres/zh_CN/htmledition/doc/xxdjb_zheng_fu-.doc",
govAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
mediaInfoRegister:"/mpres/zh_CN/htmledition/doc/xxdjb_mei_ti-.doc",
mediaAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
entAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
otherAuthority:"/mpres/zh_CN/htmledition/doc/xxdjb_shou_quan_yun_ying-.doc",
letterGov:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_goverment.doc",
letterMedia:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_media.doc",
letterEnt:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_enterprise.doc",
letterEntArtist:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_enterprise_artist.doc",
letterIndividial:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_person.doc",
letterShop:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_shop.doc",
letterOther:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_other.doc",
letterAuthorization:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_authorization.docx",
letterEnt_forEnt:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_enterprise_register.doc",
letterEnt_forGov:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_enterprise_gov.doc",
letterEnt_forOther:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_enterprise_other.doc"
},E="",L=e("tpl/wxverify/commonreg.html.js"),M=e("tpl/wxverify/step2.html.js"),I=!0,R=e("biz_web/lib/store.js"),U="__draft__"+wx.data.uin,P="__draft__time__"+wx.data.uin,O=null,F=D.rules,G=k.mobilePrefix,H=k.countryCode;
template.helper("$areaCode",function(e){
return e?e.split("-")[0]:"";
}),template.helper("$telephone",function(e){
return e?e.split("-")[1]:"";
}),template.helper("$tele_extension",function(e){
return e?e.split("-")[2]:"";
}),y.data.mp_operator_phone&&0==y.is_overseas?y.data.mp_operator_phone=y.data.mp_operator_phone.replace(/^\+86/,""):y.data.mp_operator_phone&&1==y.is_overseas&&(y.data.mp_operator_phone=y.data.mp_operator_phone.replace($("#js_input_country").val(),"")),
i.exports=function(){
h(),p(),m();
};
});