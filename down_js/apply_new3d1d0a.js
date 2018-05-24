define("infringement/apply_new.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/Step.js","biz_web/utils/upload.js","common/wx/region.js","common/wx/dialog.js","common/wx/popup.js","biz_common/jquery.validate.js","biz_web/ui/checkbox.js","common/wx/popover.js","safe/safe_check.js","safe/Scan.js","common/qq/jquery.plugin/serializeObject.js"],function(e){
"use strict";
wx.data.t=wx.cgiData.token;
var i=e("common/wx/Cgi.js"),t=e("common/wx/Tips.js"),n=e("common/wx/Step.js"),s=e("biz_web/utils/upload.js"),a=e("common/wx/region.js"),o=e("common/wx/dialog.js"),l=(e("common/wx/popup.js"),
e("biz_common/jquery.validate.js")),r=(e("biz_web/ui/checkbox.js"),e("common/wx/popover.js")),c=(e("safe/safe_check.js"),
e("safe/Scan.js")),d=(e("common/wx/popup.js"),template.render),p={};
e("common/qq/jquery.plugin/serializeObject.js");
var _=function(){
var e,_,m=wx.cgiData,u="ok",h="no",f={
dialog:{},
add:function(e,i){
var t=[],n=f.getList(e).split("	");
i.each(function(){
var e=encodeURIComponent($(this).attr("data-value"));
-1==$.inArray(e,n)&&t.push({
nickname:$(this).data("nickname"),
alias:$(this).data("alias"),
headimg_url:$(this).data("headimg"),
biz_uin:$(this).data("value"),
del:1,
link:$(this).data("value"),
title:$(this).data("title"),
msid:$(this).data("msid")
});
});
var s=$(".js_infListEntry"+e),a=s.find("a.js_infListBtn").data("tpl");
s.find(".js_list").append(d(a,{
data:t,
need_more:0
}));
var o=f.getNum(e);
$(".js_remain"+e).text(40-o),$(".js_infListEntry"+e).find(".frm_msg").hide().children().hide();
},
remove:function(e,i){
var t,n;
(14==e||15==e)&&(n=i.parent().index())>=0?(t=$(".js_infListEntry"+e).find(".js_list").children(),
t.eq(n).remove(),t=f.dialog[e].popup("get").find(".js_list").children(),t.eq(n).remove()):i.parent().remove(),
$(".js_remain"+e).text(40-f.getNum(e));
},
list:function(e,i){
var t=f.dialog[1],n=t.popup("get").find(".js_list");
n[i](template.render("tpl_bizlist",e));
},
getNum:function(e){
var i=$(".js_infListEntry"+e).find(".js_list");
return i.length?i.children().length:-1;
},
getList:function(e,i){
var t=[],n=$(".js_infListEntry"+e).find(".js_list").children();
return i?(n.each(function(){
t.push({
headimg:$(this).data("headimg"),
nickname:$(this).data("nickname"),
alias:$(this).data("alias"),
link:$(this).data("value"),
title:$(this).data("title"),
msid:$(this).data("msid")
});
}),t):(n.each(function(){
var i=$(this).data("value");
if(i=14==e||15==e?encodeURIComponent(i):i,""==i)throw"logic err";
t.push(i);
}),t.join("	"));
}
},g=function(){
var i=!0,n=$("input[name=complain_type]:checked").val(),s=f.getNum(n),a=e.obligee.getAll();
return-1==a.country||-1==a.province||-1==a.city?(t.err("请完整填写权利人的通信地址"),!1):1==$("input[name=is_agent]:checked").val()&&(a=e.agent.getAll(),
-1==a.country||-1==a.province||-1==a.city)?(t.err("请完整填写代理人的通信地址"),!1):s>40?(t.err("最多添加40个帐号或内容链接"),
!1):"pending"==u?(t.err("正在校验原创内容链接"),!1):(i=$("#js_form").valid(),0==s&&($(".js_infListEntry"+n).find(".frm_msg").show().children().show(),
i=!1),i||t.err("请完整填写表单"),i);
},b=function(i){
var t,n=$("#js_form").serializeObject();
if(n.obligee_type=$("#js_obligeeType").find("li.selected").data("value"),t=e.obligee.getAll(),
n.obligee_country=t.country,n.obligee_province=t.province,n.obligee_city=t.city,
n.is_agent=0,14==n.complain_type||15==n.complain_type)n.complain_url_list=f.getList(n.complain_type),
i&&(n.url_list=f.getList(n.complain_type,!0));else if(1==m.type||4==m.type)n.complain_uin_list=f.getList(n.complain_type),
1==wx.cgiData.fescene&&(n.complain_list=f.getList(n.complain_type)),i&&(n.biz_list=f.getList(n.complain_type,!0));else if(i){
var a=$("input[name=complain_uin_list]");
n.biz_list=[{
headimg:a.data("headimg"),
alias:a.data("alias"),
nickname:a.data("nickname")
}];
}
if(i&&(n.upload_list=[],$(".js_material"+n.complain_type).each(function(){
$(this).find("input[type=checkbox]").is(":checked")&&n.upload_list.push({
title:$(this).find("input[type=checkbox]").data("label"),
url:s.tmpFileUrl($(this).find("input[type=hidden]").val())
});
}),$("#js_other").is(":checked"))){
var o=[];
$("#js_other").closest(".upload_section").find("img").each(function(){
o.push($(this).attr("src"));
}),n.upload_list.push({
title:$("#js_other").data("label"),
url_list:o
});
}
return n;
},v=function(e,n,s,a){
var o=b();
return 0==o?void t.err("请完整填写表单"):(s&&(o.uuid=s),a&&(o.msgid=a),o.obligee_zip_code&&(o.obligee_zip_code=$.trim(o.obligee_zip_code)),
o.obligee_mobile_phone&&(o.obligee_mobile_phone=$.trim(o.obligee_mobile_phone)),
o.action=1==wx.cgiData.fescene?"submit":"submit_new",o.type=wx.cgiData.type,1==wx.cgiData.fescene&&(o.token=wx.cgiData.token),
void i.post({
url:wx.url(1==wx.cgiData.fescene?"/acct/newinfringement":"/acct/infringement"),
data:o,
mask:!1
},function(i){
i&&i.base_resp&&0==i.base_resp.ret?e():i&&i.base_resp&&200013==i.base_resp.ret?(t.err("提交频率过高，请稍后再试"),
e&&e()):t.err(i&&i.base_resp&&14502==i.base_resp.ret?"填写的投诉单ID格式不正确":i&&i.base_resp&&14503==i.base_resp.ret?"填写的投诉单ID不存在":i&&i.base_resp&&14504==i.base_resp.ret?"填写的投诉单类型不正确":i&&i.base_resp&&14505==i.base_resp.ret?"填写的投诉单正在审核中":"请完整填写表单"),
n.btn(!0);
}));
},j=function(e,i){
var t=i.numberOfInvalids();
0!=t&&$("html, body").animate({
scrollTop:$(i.errorList[0].element).parent().offset().top-100
},500);
},y=function(){
var i=$("#js_form").serializeObject(),t=e.obligee.getAll(),n=$("input[name=complain_type]:checked").val();
if(i.complain_type=$("input[name=complain_type]:checked").data("label"),i.complain_second_type=$("input[name=complain_second_type]:checked").data("label")||"",
i.adress=(t.country||"")+(t.province||"")+(t.city||"")+(i.obligee_address||""),14==n||15==n?(i.isLink=!0,
i.links=f.getList(n,!0)):(i.isLink=!1,i.links=f.getList(n,!0)),i.materials=[],$(".js_material"+n).each(function(){
$(this).find("input[type=checkbox]").is(":checked")&&i.materials.push({
title:$(this).find("input[type=checkbox]").data("label"),
url:s.tmpFileUrl($(this).find("input[type=hidden]").val())
});
}),$("#js_other").is(":checked")){
var a=[];
$("#js_other").closest(".upload_section").find("img").each(function(){
a.push($(this).attr("src"));
}),i.materials.push({
title:$("#js_other").data("label"),
url_list:a
});
}
$("#confirm_body").html(d("confirm_tpl",i));
},w={
init:function(){
w.initComplainTips(),w.initStep(),w.initValidate(),w.initUpload(),w.initRegion(),
w.initPopup(),w.initCheckbox(),w.initEvent(),w.afterload();
},
initComplainTips:function(){
p.complain_tips={
defaut:"",
11:"如认为他人使用的昵称侵犯了你的商标、组织名称或姓名权等合法权益，可发起昵称侵权投诉。",
12:"如认为他人使用的头像侵犯了你的商标、版权、肖像等合法权益，可发起头像侵权投诉。",
13:"如你认为他人的功能介绍侵犯了你的商标、组织名称或姓名权合法权益，可发起功能介绍侵权投诉。",
14:"如你认为内容未经授权，擅自转载或使用了你的原创文字、图片、视频、影视作品等内容，或从事其他侵犯你作品版权的行为，可发起此项投诉。",
15:"如你认为内容存在诽谤侮辱、泄露个人隐私、侵犯肖像等内容且侵犯了你的合法权益，可发起此项投诉。",
17:"如你认为公众帐号对你存在整体冒用、混淆时，可发起此项投诉。此类投诉需提供充分、确凿的证据（包括但不限于你的权益证明、被投诉方的侵权行为证据等）供平台审核，否则将无法审核通过。"
},p.complain_second_tips={
defaut:"",
"16_3":"当你认为平台其他帐号对你存在冒用、混淆时，可提起此项投诉。此类投诉需提供充分、确凿的证据（包括但不限于你的权益证明、被投诉方的侵权行为证据等）供平台进行比对核实，否则平台将无法审核通过。你可收集更多证据后，重新发起投诉。"
},p.complain_second_tips["11_1"]=p.complain_second_tips["11_2"]=p.complain_second_tips["11_3"]=p.complain_second_tips[12]=p.complain_second_tips[13]=p.complain_second_tips["16_4"]=p.complain_second_tips["16_5"]="被侵权内容为单选，若被侵权多项内容，需对每个侵权内容分别投诉。若投诉成立，您投诉的内容将被删除，平台还将视违规情节、依协议规则对该帐号进行其他处罚。",
p.complain_second_tips["16_1"]=p.complain_second_tips["16_2"]="被侵权内容为单选，若被侵权多项内容，需对每个侵权内容分别投诉。若投诉成立，您投诉的帐号将依平台规则进行处罚。",
p.complain_second_tips["11_4"]="当你认为他人占用的名称侵犯了你的合法权益，可提起此项投诉。若侵权投诉成功，被投诉人7天内可以申诉，如果申诉无效，则名称占用将释放。";
},
initStep:function(){
_=new n({
container:"#js_processor",
selected:1,
names:["1 填写投诉内容","2 预览","3 提交通知书"]
});
},
initValidate:function(){
var e={
obligee_name:{
required:!0,
maxlength:100
},
obligee_cert_no:{
required:!0,
cert:!0
},
obligee_cert_copy_id:{
required:{
depends:function(){
return 1!=$("#js_obligeeType").find("li.selected").data("value");
}
},
file_len:1==wx.cgiData.fescene?1:2
},
obligee_address:{
required:!0,
maxlength:50
},
obligee_zip_code:{
required:!0,
postcode:!0
},
obligee_contacts_name:{
required:{
depends:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value");
}
},
maxlength:10
},
obligee_mobile_phone:{
required:!0,
mobile:!0
},
obligee_email:{
required:!0,
email:!0,
email2:!0,
maxlength:50
},
complain_type_hidden:{
required:!0
},
complain_second_type_hidden:{
required:{
depends:function(){
var e=$("input[name=complain_type]:checked").val();
return 11==e||12==e||13==e||16==e;
}
}
},
complain_desc:{
required:1==m.type,
maxlength:150
},
material:{
required:{
depends:function(){
var e=$("input[name=complain_type]:checked").val();
return $(".js_material"+e).find("input[type=checkbox]:checked").length+$("#js_other:checked").length==0;
}
}
},
trademark_copy_id:{
required:{
depends:function(){
var e=$("input[name=complain_type]:checked").val();
return(11==e||12==e||13==e||16==e)&&$("#js_trademark").is(":checked");
}
}
},
license_copy_id:{
required:{
depends:function(){
var e=$("input[name=complain_type]:checked").val();
return(11==e||12==e||13==e||16==e)&&$("#js_license").is(":checked");
}
}
},
id_card_copy_id:{
required:{
depends:function(){
var e=$("input[name=complain_type]:checked").val();
return(11==e||12==e||13==e||16==e)&&$("#js_idCard").is(":checked");
}
}
},
publish_copy_id:{
required:{
depends:function(){
return 14==$("input[name=complain_type]:checked").val()&&$("#js_publish").is(":checked");
}
}
},
valid_publish_copy_id:{
required:{
depends:function(){
return 14==$("input[name=complain_type]:checked").val()&&$("#js_validPublish").is(":checked");
}
}
},
ori_article_copy_id:{
required:{
depends:function(){
return 14==$("input[name=complain_type]:checked").val()&&$("#js_article").is(":checked");
}
}
},
other_copy_id:{
required:{
depends:function(){
return $("#js_other").is(":checked");
}
}
},
ori_article_url:{
url:!0
}
},i={
obligee_name:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请填写该组织的名称":"请填写姓名";
},
maxlength:"不能超过100个字"
},
obligee_cert_no:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请填写有效证件号":"请填写有效身份证号";
}
},
obligee_cert_copy_id:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请上传有效证件扫描件":"请上传身份证正反照片";
},
file_len:"你还需上传1个"
},
complain_type_hidden:{
required:"请选择投诉分类"
},
complain_second_type_hidden:{
required:"请选择被侵权内容"
},
obligee_address:{
required:"请填写街道名称",
maxlength:"不能超过50个字"
},
obligee_zip_code:"请填写邮编",
obligee_contacts_name:{
required:"请填写联系人",
maxlength:"不能超过10个字"
},
obligee_mobile_phone:"请填写手机号码",
obligee_email:{
required:"请填写E-mail",
maxlength:"不能超过50个字"
},
complain_desc:{
required:"您未添加任何描述",
maxlength:"不能超过150个字"
},
material:"至少选择一项证明材料",
trademark_copy_id:"请上传图片",
license_copy_id:"请上传图片",
id_card_copy_id:"请上传图片",
publish_copy_id:"请上传图片",
valid_publish_copy_id:"请上传图片",
ori_article_copy_id:"请上传图片",
other_copy_id:"请至少上传一张图片",
ori_article_url:{
url:"请输入正确的原创内容链接"
}
};
$("#js_form").validate({
rules:e,
messages:i,
ignore:[],
focusInvalid:!0,
submitHandler:function(){
return!1;
},
invalidHandler:j
}),l.addMethod("cert",function(e){
return e=$.trim(e),1==$("#js_obligeeType").find("li.selected").data("value")?!0:l.rules.idcard(e);
},l.messages.idcard),l.addMethod("file_len",function(e,i,t){
var n=!!this.optional(i);
e=$.trim(e);
var s=e.split("	").length;
return s==t?n||!0:n||!1;
},"请上传图片"),l.addMethod("postcode",function(e){
return e=$.trim(e),/^\d{6}$/.test(e);
},"请输入正确的邮编格式"),l.addMethod("articleurl",function(e){
return e=$.trim(e),""==e?!0:"ok"==u;
},"请输入正确的内容链接"),l.addMethod("complainuinlist",function(e){
return e=$.trim(e),"ok"==h;
},"请填写正确的原始ID或微信号"),l.addMethod("email2",function(e){
return e=$.trim(e),/^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
},"请输入正确格式的电子邮件");
},
initUpload:function(){
var e=0;
$(".js_select_file").each(function(){
var i=$(this),n="js_upload"+e++,a=1*(i.data("multi")||0);
i.attr("id",i.attr("id")||n),s.uploadTmpFile({
container:i,
multi:!!a,
type:2,
width:106,
onComplete:function(e,n,o,l){
if(l&&l.base_resp&&0==l.base_resp.ret){
var r=i.parent().find("input[type=hidden]"),c=i.parent().parent().find(".upload_preview").show(),d=i.parent().parent().find(".js_remain"),p=r.val();
if(a){
if(""!=p&&p.split("	").length>=a)return void t.err("最多可以上传%s张".sprintf(a));
r.val(p=""==p?l.content:p+"	"+l.content),c.append('<span><img src="%s" /><a href="javascript:;" class="in_opt js_remove">删除</a></span>'.sprintf(s.tmpFileUrl(l.content)));
var _=a-p.split("	").length;
d.text(_);
}else i.text("重新上传"),r.val(l.content),c.html('<img src="%s" />'.sprintf(s.tmpFileUrl(l.content)));
i.closest(".upload_box").find(".frm_msg").hide(),i.closest(".upload_section").parent().find(".frm_msg").hide();
}
},
onAllComplete:function(){
var e=i.parent().find("input[type=hidden]"),t=e.val(),n=a-t.split("	").length;
i.parent().find(".upload_file_box").html("").hide(),0==n&&i.parent().find("object").css("left","99999999px");
}
}),i.on("click",function(){
var e=$(this).data("multi"),n=i.parent().find("input[type=hidden]").val();
e&&n.split("	").length>=e&&t.err("最多可以上传%s张".sprintf(e));
});
}),$("body").on("click",".upload_preview .js_remove",function(){
var e=$(this).parent(),i=e.index(),t=e.parent().parent(),n=t.find("input[type=hidden]"),s=n.val().split("	"),a=1*(t.find(".js_select_file").data("multi")||0);
e.remove(),s.splice(i,1),t.find(".js_remain").text(a-s.length),n.val(s.join("	")),
t.find("object").css("left","0");
});
},
initRegion:function(){
e={},e.obligee=new a({
container:"#js_obligeeRegion",
data:{
country:m.obligee_country||"中国",
province:m.obligee_province||null,
city:m.obligee_city||null
}
});
},
initPopup:function(){
$(".js_infListBtn").on("click",function(){
var e=$("input[name=complain_type]:checked").val(),i=$("input[name=complain_second_type]:checked").val(),n=14==e||15==e;
if(!n&&"undefined"==typeof i)return void t.err("请选择被侵权内容");
var s=f.getNum(e);
if(s>=40)return void t.err("最多添加40个");
var a=11==e&&4==i||12==e||13==e||16==e||17==e?"tpl_biz":$(this).data("popuptpl"),o=$("#"+a).popup({
title:n?"添加侵权内容链接":"添加侵权的帐号",
data:{
type:e
},
className:"infringement_dialog",
width:n?void 0:956,
buttons:[{
text:"确定",
click:function(){
if(n){
var i=this.$dialogWrp.find(".js_list").children();
if(i.length>40)return void t.err("最多添加40个链接");
}else{
if(this.$dialogWrp.find(".dialog_ft>span:eq(0)").hasClass("btn_disabled"))return;
var i=this.$dialogWrp.find("li.account_selected");
if(i.length+s>40)return void t.err("最多添加40个帐号");
}
f.add(e,i),this.hide();
},
type:n?"primary":"disabled"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
});
o.popup("get").find("input").placeholder(),n?w.initDialog(e,o):w.initDialog1(o,e,i);
}),$("body").on("click",".js_list .js_remove",function(){
$(this).parent().remove();
});
},
initDialog1:function(e,n,s){
var a="",o=e.popup("get");
11==n&&4==s?($("#js_searchInput:visible").attr("placeholder","请输入被占用名称"),$(".js_mini_tips").show()):(12==n||13==n||16==n||17==n)&&($("#js_searchInput:visible").attr("placeholder","可通过公众帐号名称及微信号进行搜索"),
$(".js_mini_tips").hide());
var l=function(l,r){
if(l=l||0,l||o.find(".js_list").empty(),$(".dialog:visible").attr("data-type",s),
!r||"biz"===r){
var c=o.find(".js_biz_list_area");
c.find(".js_loading").show(),c.find(".js_empty").hide(),1==wx.cgiData.fescene&&11==n&&4==s?i.post({
url:wx.url("/acct/newinfringement"),
data:{
action:"search_biz_list",
nickname:a,
begin:l,
search_type:1,
complain_type:11,
token:wx.cgiData.token
},
mask:!1
},function(n){
if(console.log("占用名称场景化数据："),console.log(n),c.find(".js_loading").hide(),n&&n.base_resp&&0==n.base_resp.ret&&n.getbizlist_resp){
var s={};
if("string"==typeof n.getbizlist_resp?s=JSON.parse(n.getbizlist_resp):n.getbizlist_resp&&n.getbizlist_resp.data&&(s=n.getbizlist_resp),
!s.data&&s.biz_info_list&&(s.data=s.biz_info_list),0==s.data.length&&0==l)c.find(".js_empty").show(),
c.find(".js_biz_list").hide();else{
c.find(".js_empty").hide(),c.find(".js_biz_list").show();
var a=e.popup("get").find(".js_biz_list"),o=0==l?"html":"append";
if(s.type="biz",a[o](template.render("tpl_bizlist",s)),"4"==$(".dialog:visible").data("type"))if(0==l)$(".js_bizItem:visible").each(function(){
$(this).trigger("click");
});else for(var r=l;r<l+s.data.length;r++)$(".js_bizItem:visible").eq(r).trigger("click");
}
return void(1==s.end&&c.find(".js_more").remove());
}
n.getbizlist_resp?i.show(n):t.err("系统错误，请重试");
}):i.post({
url:wx.url("/acct/infringement"),
data:{
action:"4"==s?"getnicknameinvadelist":"getbizlist",
nickname:a,
begin:l,
type:m.type
},
mask:!1
},function(n){
if(c.find(".js_loading").hide(),n&&n.base_resp&&0==n.base_resp.ret&&n.getbizlist_resp){
if(0==n.getbizlist_resp.data.length&&0==l)c.find(".js_empty").show(),c.find(".js_biz_list").hide();else{
c.find(".js_empty").hide(),c.find(".js_biz_list").show();
var s=e.popup("get").find(".js_biz_list"),a=0==l?"html":"append";
if(n.getbizlist_resp.type="biz",s[a](template.render("tpl_bizlist",n.getbizlist_resp)),
"4"==$(".dialog:visible").data("type"))if(0==l)$(".js_bizItem:visible").each(function(){
$(this).trigger("click");
});else for(var o=l;o<l+n.getbizlist_resp.data.length;o++)$(".js_bizItem:visible").eq(o).trigger("click");
}
return void(1==n.getbizlist_resp.end&&c.find(".js_more").remove());
}
n.getbizlist_resp?i.show(n):t.err("系统错误，请重试");
});
}
if(11==n&&4!=s&&(!r||"wxa"===r)){
var d=o.find(".js_wxa_list_area");
d.find(".js_loading").show(),d.find(".js_empty").hide(),i.post({
url:wx.url("/acct/infringement"),
data:{
action:"getwxalist",
nickname:a,
begin:l,
type:m.type
},
mask:!1
},function(n){
if(d.find(".js_loading").hide(),n&&n.base_resp&&0==n.base_resp.ret&&n.getbizlist_resp){
if(0==n.getbizlist_resp.data.length&&0==l)d.find(".js_empty").show(),d.find(".js_wxa_list").hide();else{
d.find(".js_empty").hide(),d.find(".js_wxa_list").show();
var s=e.popup("get").find(".js_wxa_list"),a=0==l?"html":"append";
n.getbizlist_resp.type="wxa",s[a](template.render("tpl_bizlist",n.getbizlist_resp));
}
return void(1==n.getbizlist_resp.end&&d.find(".js_more").remove());
}
n.getbizlist_resp?i.show(n):t.err("系统错误，请重试");
});
}
};
$("#js_search").on("click",function(){
var e=$.trim($("#js_searchInput").val());
return""==e?void t.err("不能为空"):(a=e,void l());
}),$("#js_searchInput").on("keypress",function(e){
13==e.keyCode&&$("#js_search").click();
}),o.on("click",".js_bizItem",function(){
$(this).siblings(".account_selected").length>=40?t.err("最多选择40个"):1==$(this).data("can_chosen")&&$(this).toggleClass("account_selected"),
$(this).parent().find("li.account_selected").length>0?o.find(".dialog_ft>span:eq(0)").removeClass("btn_disabled").addClass("btn_primary"):o.find(".dialog_ft>span:eq(0)").removeClass("btn_primary").addClass("btn_disabled");
}).on("click",".js_more",function(e){
var i=o.find(".js_bizItem").length;
$(this).remove(),l(i,$(e.currentTarget).data("type"));
}).on("mousewheel",".in_bd",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll",".in_bd",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
}).on("mouseover",".list_item_disabled",function(){
var e=$(this),i="该账号正在名称审核中/认证中/保护期，暂时不能被投诉";
1==e.data("unchosen_type")?i="名称被此帐号在名称审核中占用，暂不支持投诉。":2==e.data("unchosen_type")?i="名称被此帐号在认证审核中占用，暂不支持投诉。":3==e.data("unchosen_type")?i="名称在侵权争议中，被此帐号占用，暂不支持投诉。":4==e.data("unchosen_type")&&(i="该帐号正在改名中，暂不支持投诉。"),
new r({
dom:e,
content:i,
isToggle:!0
});
});
},
initDialog:function(e,n){
$("#js_add"+e).on("click",function(){
var s=$(this).find("i");
if(!s.hasClass("btn_loading")){
var a=$.trim($("#js_addInput"+e).val());
if(""==a)return void t.err("不能为空");
if(n.popup("get").find(".js_list").children().length>=40)return void t.err("最多添加40个链接");
if(!/^http(s)?:\/\/mp\.weixin\.qq\.com/.test(a))return void t.err("请输入mp.weixin.qq.com域名下的内容链接");
s.btn(!1),i.post({
url:wx.url("/acct/infringement"),
data:{
action:"checkurl",
complain_url:encodeURIComponent(a),
type:m.type
},
mask:!1
},function(i){
s.btn(!0);
var o=+(i&&i.checkurl_resp?i.checkurl_resp.base_resp.ret:-1);
if(0==o){
var l=i.checkurl_resp.title,r=i.checkurl_resp.biz+"_"+i.checkurl_resp.mid+"_"+i.checkurl_resp.idx,c=n.popup("get").find(".js_list"),p=!1,_=d("tpl_linkitem",{
link:a,
title:l,
msid:r
});
c.children().each(function(){
(a==$(this).data("value")||r==$(this).data("msid"))&&(p=!0);
}),p||n.popup("get").find(".js_list").append(_),$("#js_addInput"+e).val("");
}else t.err(-1==o?"系统错误，请重试":-2==o?"此内容已被封":"请输入mp.weixin.qq.com域名下的内容链接");
});
}
}),$("#js_addInput"+e).on("keypress",function(i){
13==i.keyCode&&$("#js_add"+e).click();
}),n.popup("get").find(".js_list").html(d("tpl_linklist",{
data:f.getList(e,!0)
}));
},
initCheckbox:function(){
var e=$("input[name=complain_type]");
e.checkbox({
onChanged:function(e){
var t=e.val();
if($("#complain_type_hidden").val(t),$("#complain_second_type_hidden").val(""),$("#complain_desc_div").show(),
$("#section3").show(),$(".js_infListEntry").hide(),$(".js_infListEntry"+t).show(),
$(".js_material").hide(),$(".js_material"+t).show(),$(".js_step[data-step=1]").removeClass("btn_disabled"),
$("#complain_tips").text(p.complain_tips[t]||p.complain_tips.defaut),$("#complain_second_tips").text(p.complain_second_tips[t]||""),
$(".js_bizItem").parents("ul.js_list").empty(),14==t)$("#js_original").show().find("label").text("原创内容链接（选填）"),
$("#complain_second_type").hide().find(".js_list").html(""),p.complain_second_type=null;else if(15==t)$("#js_original").show().find("label").text("被篡改内容链接（选填）"),
$("#complain_second_type").hide().find(".js_list").html(""),p.complain_second_type=null;else{
$("#js_original").hide();
var n="";
17==t?($("#complain_type_hidden").val(16),$("#complain_second_type_hidden").val(3),
p.complain_second_type=null,$("#complain_second_type").hide().find(".js_list").html(""),
$(".js_infListEntry").hide(),$("#complain_desc_div").hide(),$("#section3").hide(),
$(".js_materialelse").show(),$(".js_materialnomater").hide(),$(".js_step[data-step=1]").removeClass("btn_disabled").unbind("mouseover"),
i&&i.remove()):n=16==t?"complain_second_type_2":"complain_second_type_1",n&&$("#complain_second_type").show().find(".js_list").html($("#"+n).html()).find("input").checkbox({
onChanged:function(e){
$(".js_bizItem").parents("ul.js_list").empty();
var n=e.val();
$("#complain_second_tips").text(p.complain_second_tips[t]||p.complain_second_tips[t+"_"+n]||p.complain_second_tips.defaut),
$("#complain_second_type_hidden").val(n),$(".js_infListEntry"+t).show(),$("#complain_desc_div").show(),
$("#section3").show(),11==t&&4==n?($(".js_materialelse").hide(),$(".js_materialnomater").show(),
$("#js_noMater").attr("checked")&&$(".js_step[data-step=1]").addClass("btn_disabled")):($(".js_materialelse").show(),
$(".js_materialnomater").hide(),$(".js_step[data-step=1]").removeClass("btn_disabled").unbind("mouseover"),
i&&i.remove());
}
}),"11"==t?($(".js_namecomplain").parent("label").show(),$(".js_imgcomplain").parent("label").hide()):$(".js_namecomplain").parent("label").hide();
}
}
}),e.each(function(){
$(this).checkbox("checked",!1);
}),$("#complain_tips").text(p.complain_tips.defaut);
var i,t=$(".js_material").parent().find("input[type=checkbox]");
t.checkbox({
onChanged:function(e){
e.closest(".upload_section").find(".upload_box").toggle(),"js_noMater"==e.attr("id")&&e.closest(".upload_section").find(".upload_box:visible").length?(e.closest(".upload_section").siblings(".upload_section").find(".upload_box:visible").each(function(e,i){
$(i).parent().find("input[type=checkbox]").trigger("click");
}),$(".js_step[data-step=1]").addClass("btn_disabled").on("mouseover",function(){
i=new r({
dom:$(this),
content:"如没有上述材料，但有其他证明材料（如软件著作权等不具有专有权利的）能证明对方存在故意混淆，可在上方的投诉分类选择“其他”中的“冒用他人”进行投诉。",
isToggle:!0
});
})):($("#js_noMater:visible").attr("checked")||!$("#js_noMater:visible").attr("checked")&&$(".js_step[data-step=1]").hasClass("btn_disabled"))&&($("#js_noMater:visible").trigger("click"),
$(".js_step[data-step=1]").removeClass("btn_disabled").unbind("mouseover"),i&&i.remove());
}
}),t.each(function(){
var e=$(this).closest(".upload_section");
e.find("input[type=hidden]").val(""),$(this).checkbox("checked",!1);
});
},
initEvent:function(){
$("#js_obligeeType").on("click","li",function(){
if(!$(this).hasClass("selected")){
$(this).parent().children().removeClass("selected"),$(this).addClass("selected");
var e={
stop:$("#js_obligeeStop"),
name:$("#js_obligeeName"),
cert:$("#js_obligeeCertNo"),
copyid:$("#js_obligeeCertCopyId"),
company:$("#js_obligeeCompany"),
contact:$("#js_obligeeContactsName")
};
1==$(this).data("value")?(e.stop.css({
left:150
}),e.name.find("label").text("名称"),e.name.find("input[name=obligee_name]").attr("placeholder","请填写组织机构名称"),
e.cert.find("label").text("营业执照或组织机构代码证"),e.cert.find("input[name=obligee_cert_no]").attr("placeholder","请填写有效营业执照或组织机构代码证"),
e.cert.find(".frm_tips").show(),e.copyid.hide(),e.company.show(),e.contact.show()):(e.stop.css({
left:250
}),e.name.find("label").text("姓名"),e.name.find("input[name=obligee_name]").attr("placeholder","请填写权利人名称"),
e.cert.find("label").text("有效证件号(身份证)"),e.cert.find("input[name=obligee_cert_no]").attr("placeholder","请填写有效身份证号码"),
e.cert.find(".frm_tips").hide(),e.copyid.show(),e.company.hide(),e.contact.hide()),
e.name.find("input").val(""),e.cert.find("input").val(""),e.copyid.find(".upload_preview").empty().hide(),
e.copyid.find("input").val("");
}
}),$("body").on("click",".js_step",function(){
if(!$(this).hasClass("btn_loading")&&!$(this).hasClass("btn_disabled")){
var e=$(this),t=$(this).data("type"),n=$(this).data("step");
if("next"==t&&1==n){
{
var s=$("input[name=complain_type]:checked").val();
$("input[name=complain_second_type]:checked").val();
}
17==s?window.location.href=wx.url("/acct/infringement?action=getmanual&t=infringement/manual&type=1&old=1"):g()&&($(".js_stepWrapper").hide(),
$("#js_step2Wrapper").show(),y(),_.setStep(2),window.scrollTo(0,0));
}else if("prev"==t&&2==n)$(".js_stepWrapper").hide(),$("#js_step1Wrapper").show(),
_.setStep(1),window.scrollTo(0,0);else if("next"==t&&2==n){
e.btn(!1);
var a=wx.cgiData.strategy_info.html(!1)?JSON.parse(wx.cgiData.strategy_info.html(!1)):"",l=a.wx_alias?a.wx_alias:"";
if(!l&&wx.cgiData.cgitoken&&!wx.cgiData.feregister){
{
$(".js_onprotect_noform").popup({
title:"开启安全保护",
width:960,
close:function(){
this.remove();
},
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"default"
}]
});
}
return;
}
if(1e3!=wx.cgiData.user_type||wx.cgiData.feregister){
if(1002==wx.cgiData.user_type||wx.cgiData.feregister){
var r=o.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"正在提交中|请不要关闭本页面。",
buttons:[]
});
v(function(){
r.remove(),$(".js_stepWrapper").hide(),$("#js_step3Wrapper").show(),_.setStep(3),
window.scrollTo(0,0);
},e,null,null);
}
}else{
var d=null;
$(".js_scan").popup({
title:"微信验证",
width:860,
onShow:function(){
var t=this;
d=new c({
container:$(".js_scan"),
type:"check",
source:"infringement",
status_container:".status_container",
distinguish:!0,
auto_msgid:!0,
wx_name:l,
onconfirm:function(){
if(t.remove(),this&&(this.isadmin||this.issubadmin)){
var n=o.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"正在提交中|请不要关闭本页面。",
buttons:[]
});
v(function(){
e.btn(!0),n.remove(),$(".js_stepWrapper").hide(),$("#js_step3Wrapper").show(),_.setStep(3),
window.scrollTo(0,0);
},e,this.opt.uuid,this.opt.msgid);
}else{
var s=o.show({
title:"提示",
hideClose:!0,
type:"info",
msg:"请不要关闭页面，操作管理员确认中|请等待公众号管理员微信号%s验证操作申请，验证通过后操作将立即执行。此申请在30分钟后过期，请尽快联系管理员验证。若关闭页面，本次提交申请将中断。".sprintf(l),
buttons:[]
});
e.btn(!0);
var a,r=this,c=!1,d=function(){
var t={
action:"admin_action",
token:wx.cgiData.token,
type:"15",
msgid:r.opt.msgid
};
i.post({
url:wx.url("/misc/safeassistant?lang=zh_CN"),
data:t
},{
done:function(i){
if(i&&0==i.status?c=!1:i&&1==i.status?c=!0:i&&2==i.status&&(c=!0),c)if(window.clearInterval(a),
1==i.status){
s.remove();
var t=o.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"管理员已通过操作申请，正在提交中|请不要关闭本页面。",
buttons:[]
});
v(function(){
e.btn(!0),t.remove(),$(".js_stepWrapper").hide(),$("#js_step3Wrapper").show(),_.setStep(3),
window.scrollTo(0,0);
},e,r.opt.uuid,r.opt.msgid);
}else if(2==i.status){
s.remove();
var t=o.show({
title:"提示",
type:"err",
msg:"管理员已拒绝操作申请|公众号管理员%s已拒绝该次侵权投诉。".sprintf(l),
buttons:[]
});
}
},
fail:function(){
setTimeout(d,300);
}
});
};
a=setInterval(d,5e3);
}
}
});
},
close:function(){
d&&d.destroy(),this.remove(),e.btn(!0);
}
});
}
}
}
}),$("body").on("click","#js_print",function(){
window.open(wx.url("/acct/infringement?action=getprint&t=infringement/print")),$("#js_printedstep").enable();
}),$("#js_reapply").on("click",function(){
o.show({
type:"warn",
msg:"重新填写，则清空已填内容，申请新的投诉单。",
buttons:[{
text:"重新填写",
click:function(){
location.href=wx.url("/acct/infringement?action=getinfo&t=infringement/infringement_add&type="+m.type);
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}],
title:"未完成投诉单"
});
});
var e=0;
$(window).on("scroll",function(){
var i=$("#js_printtips");
if(0!=i.length){
e=e||i.offset().top;
var t=$(window).scrollTop()-e;
t>0?i.addClass("mod_sticky"):i.removeClass("mod_sticky");
}
});
},
afterload:function(){
1==wx.cgiData.fescene&&($('input[name="complain_type"]').trigger("click").siblings("i.icon_radio").hide().parent("label").css("cursor","default"),
$('input[name="complain_second_type"][value="4"]').trigger("click").siblings("i.icon_radio").hide().parent("label").css("cursor","default").siblings("label").hide());
}
};
return w;
}();
_.init();
});