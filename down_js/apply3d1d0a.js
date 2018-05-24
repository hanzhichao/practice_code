define("infringement/apply.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/Step.js","biz_web/utils/upload.js","common/wx/region.js","common/wx/dialog.js","common/wx/popup.js","common/wx/popover.js","biz_common/jquery.validate.js","biz_web/ui/checkbox.js","safe/safe_check.js","safe/Scan.js","common/qq/jquery.plugin/serializeObject.js"],function(e){
"use strict";
var i=e("common/wx/Cgi.js"),t=e("common/wx/Tips.js"),n=e("common/wx/Step.js"),a=e("biz_web/utils/upload.js"),s=e("common/wx/region.js"),o=e("common/wx/dialog.js"),r=(e("common/wx/popup.js"),
e("common/wx/popover.js")),l=e("biz_common/jquery.validate.js"),c=(e("biz_web/ui/checkbox.js"),
e("safe/safe_check.js"),e("safe/Scan.js")),p=(e("common/wx/popup.js"),template.render);
e("common/qq/jquery.plugin/serializeObject.js");
var d=function(){
var e,d,_=wx.cgiData,u="ok",m="no",f={
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
}),$("#js_infListEntry"+e).find(".js_list").append(1==e||4==e?p("tpl_bizlist",{
data:t,
need_more:0
}):p("tpl_linklist",{
data:t
}));
var a=f.getNum(e);
$(".js_remain"+e).text(40-a),$("#js_infListEntry"+e).find(".frm_msg").hide().children().hide();
},
remove:function(e,i){
var t,n;
e>1&&(n=i.parent().index())>=0?(t=$("#js_infListEntry"+e).find(".js_list").children(),
t.eq(n).remove(),t=f.dialog[e].popup("get").find(".js_list").children(),t.eq(n).remove()):i.parent().remove(),
$(".js_remain"+e).text(40-f.getNum(e));
},
list:function(e,i){
var t=f.dialog[1],n=t.popup("get").find(".js_list");
n[i](template.render("tpl_bizlist",e));
},
getNum:function(e){
var i=$("#js_infListEntry"+e).find(".js_list");
return i.length?i.children().length:-1;
},
getList:function(e,i){
var t=[],n=$("#js_infListEntry"+e).find(".js_list").children();
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
if(i=1==e?i:encodeURIComponent(i),""==i)throw"logic err";
t.push(i);
}),t.join("	"));
}
},g=function(){
var i=!0,n=$("input[name=complain_type]:checked").val(),a=f.getNum(n),s=e.obligee.getAll();
return-1==s.country||-1==s.province||-1==s.city?(t.err("请完整填写权利人的通信地址"),!1):1==$("input[name=is_agent]:checked").val()&&(s=e.agent.getAll(),
-1==s.country||-1==s.province||-1==s.city)?(t.err("请完整填写代理人的通信地址"),!1):a>40?(t.err("最多添加40个帐号或内容链接"),
!1):"pending"==u?(t.err("正在校验原创内容链接"),!1):(i=$("#js_form").valid(),0==a&&($("#js_infListEntry"+n).find(".frm_msg").show().children().show(),
i=!1),i);
},h=function(i){
var t,n=$("#js_form").serializeObject();
if(n.obligee_type=$("#js_obligeeType").find("li.selected").data("value"),n.agent_type=$("#js_agentType").find("li.selected").data("value"),
t=e.obligee.getAll(),n.obligee_country=t.country,n.obligee_province=t.province,n.obligee_city=t.city,
t=e.agent.getAll(),n.agent_country=t.country,n.agent_province=t.province,n.agent_city=t.city,
n.is_agent=$("input[name=is_agent]:checked").val()||0,1==n.complain_type||4==n.complain_type){
if(1==_.type)n.complain_uin_list=f.getList(n.complain_type),i&&(n.biz_list=f.getList(n.complain_type,!0));else if(i){
var s=$("input[name=complain_uin_list]");
4==n.complain_type&&n.associated_infringement_id?n.associated_infringement_id=n.associated_infringement_id:n.biz_list=[{
headimg:s.data("headimg"),
alias:s.data("alias"),
nickname:s.data("nickname")
}];
}
}else n.complain_url_list=f.getList(n.complain_type),i&&(n.url_list=f.getList(n.complain_type,!0));
if(i&&(n.upload_list=[],$(".js_material"+n.complain_type).each(function(){
$(this).find("input[type=checkbox]").is(":checked")&&n.upload_list.push({
title:$(this).find("input[type=checkbox]").data("label"),
url:a.tmpFileUrl($(this).find("input[type=hidden]").val())
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
},b=function(e){
var n=h();
return 0==n?(t.err("请完整填写表单"),void e(!1)):(n.action="presubmit",n.entrance_source=_.entrance_source,
n.obligee_zip_code&&(n.obligee_zip_code=$.trim(n.obligee_zip_code)),n.obligee_mobile_phone&&(n.obligee_mobile_phone=$.trim(n.obligee_mobile_phone)),
wx.cgiData.complainid&&(n.action="submit",n.type=2,n.associated_infringement_id=wx.cgiData.complainid.split("_")[0],
n.associated_infringement_sub_id=wx.cgiData.complainid.split("_")[1],n.token=wx.cgiData.token,
1==wx.cgiData.fescene&&(n.complain_type=11)),void i.post({
url:wx.url(wx.cgiData.complainid?"/acct/newinfringement":"/acct/infringement"),
data:n,
mask:!1
},function(i){
i&&i.presubmit_resp&&0==i.presubmit_resp.ret||i&&i.base_resp&&0==i.base_resp.ret&&wx.cgiData.complainid?wx.cgiData.complainid?($(".js_stepWrapper").hide(),
$("#js_submited").show()):e(!0):i&&i.base_resp&&14502==i.base_resp.ret?(t.err("被投诉单号不正确"),
e(!1)):i&&i.base_resp&&14503==i.base_resp.ret?(t.err("填写的投诉单ID不存在"),e(!1)):i&&i.base_resp&&14504==i.base_resp.ret?(t.err("填写的投诉单类型不正确"),
e(!1)):i&&i.base_resp&&14505==i.base_resp.ret?(t.err("填写的投诉单正在审核中"),e(!1)):(t.err("请完整填写表单"),
e(!1));
}));
},v=function(e,n,a){
var s=$("input[name=notice_copy_id]").val();
if(""==s)return t.err("请上传投诉通知书扫描件"),void e();
var o={
action:"submit",
type:$("input[name=type]").val(),
notice_copy_id:s
};
n&&(o.uuid=n),a&&(o.msgid=a),i.post({
url:wx.url("/acct/infringement"),
data:o,
mask:!1
},function(i){
i&&i.base_resp&&0==i.base_resp.ret?($(".js_stepWrapper").hide(),$("#js_submited").show(),
e&&e()):i&&i.base_resp&&200013==i.base_resp.ret?(t.err("提交频率过高，请稍后再试"),e&&e()):i&&i.base_resp&&14502==i.base_resp.ret?(t.err("填写的投诉单ID格式不正确"),
e(i)):i&&i.base_resp&&14503==i.base_resp.ret?(t.err("填写的投诉单ID不存在"),e(i)):i&&i.base_resp&&14504==i.base_resp.ret?(t.err("填写的投诉单类型不正确"),
e(i)):i&&i.base_resp&&14505==i.base_resp.ret?(t.err("填写的投诉单正在审核中"),e(i)):(t.err("请完整填写表单"),
e(i));
});
},y=function(e,i){
var t=i.numberOfInvalids();
0!=t&&$("html, body").animate({
scrollTop:$(i.errorList[0].element).parent().offset().top-100
},500);
},j=function(){
var e=$("#js_step2Wrapper"),i=h(!0);
i.obligee_cert_copy_id=a.tmpFileUrl(i.obligee_cert_copy_id),i.agent_cert_copy_id=a.tmpFileUrl(i.agent_cert_copy_id),
i.agent_permission_copy_id=a.tmpFileUrl(i.agent_permission_copy_id);
var t=p("tpl_preview",i);
e.html(t).show();
},w={
init:function(){
w.initStep(),w.initValidate(),w.initUpload(),w.initRegion(),w.initPopup(),w.initCheckbox(),
w.initEvent(),w.afterload();
},
initStep:function(){
wx.cgiData.complainid||(d=new n({
container:"#js_processor",
selected:1,
names:["1 填写投诉内容","2 预览并打印通知书","3 盖章或签名后提交通知书"]
}),1==_.refill&&d.setStep(3));
},
initValidate:function(){
var e=($("input[name=complain_type]:checked").val(),{
obligee_name:{
required:!0,
maxlength:100
},
obligee_cert_no:{
required:0==wx.cgiData.is_wx_verify,
cert:0==wx.cgiData.is_wx_verify
},
obligee_cert_copy_id:{
required:0==wx.cgiData.is_wx_verify
},
obligee_company:{
required:{
depends:function(){
return 0==wx.cgiData.is_wx_verify&&1==$("#js_obligeeType").find("li.selected").data("value");
}
}
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
agent_permission_copy_id:{
required:{
depends:function(){
return 1==$("input[name=is_agent]:checked").val();
}
}
},
complain_alias:{
required:{
depends:function(){
return 2==_.type&&1==$("input[name=complain_type]:checked").val();
}
},
complainuinlist:{
depends:function(){
return 2==_.type&&1==$("input[name=complain_type]:checked").val();
}
}
},
complain_desc:{
required:1==_.type,
maxlength:150
},
complain_reason:{
required:2==wx.cgiData.type,
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
return 1==$("input[name=complain_type]:checked").val()&&$("#js_trademark").is(":checked");
}
}
},
license_copy_id:{
required:{
depends:function(){
return 1==$("input[name=complain_type]:checked").val()&&$("#js_license").is(":checked");
}
}
},
id_card_copy_id:{
required:{
depends:function(){
return 1==$("input[name=complain_type]:checked").val()&&$("#js_idCard").is(":checked");
}
}
},
publish_copy_id:{
required:{
depends:function(){
return 2==$("input[name=complain_type]:checked").val()&&$("#js_publish").is(":checked");
}
}
},
valid_publish_copy_id:{
required:{
depends:function(){
return 2==$("input[name=complain_type]:checked").val()&&$("#js_validPublish").is(":checked");
}
}
},
ori_article_copy_id:{
required:{
depends:function(){
return 2==$("input[name=complain_type]:checked").val()&&$("#js_article").is(":checked");
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
}),i={
obligee_name:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请填写该组织的名称":"请填写姓名";
},
maxlength:"不能超过100个字"
},
agent_name:{
required:function(){
return 1==$("#js_agentType").find("li.selected").data("value")?"请填写该组织的名称":"请填写姓名";
},
maxlength:"不能超过10个字"
},
obligee_cert_no:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请填写有效证件号":"请填写有效身份证号";
}
},
agent_cert_no:{
required:function(){
return 1==$("#js_agentType").find("li.selected").data("value")?"请填写有效证件号":"请填写有效身份证号";
}
},
obligee_cert_copy_id:{
required:function(){
return 1==$("#js_obligeeType").find("li.selected").data("value")?"请上传有效证件扫描件":"请填写身份证扫描件";
}
},
agent_cert_copy_id:{
required:function(){
return 1==$("#js_agentType").find("li.selected").data("value")?"请上传有效证件扫描件":"请填写身份证扫描件";
}
},
obligee_company:"请填写法定代表人/负责人",
agent_company:"请填写法定代表人/负责人",
obligee_address:{
required:"请填写街道名称",
maxlength:"不能超过50个字"
},
agent_address:{
required:"请填写街道名称",
maxlength:"不能超过50个字"
},
obligee_zip_code:"请填写邮编",
agent_zip_code:"请填写邮编",
obligee_contacts_name:{
required:"请填写联系人",
maxlength:"不能超过10个字"
},
agent_contacts_name:{
required:"请填写联系人",
maxlength:"不能超过10个字"
},
obligee_mobile_phone:"请填写手机号码",
agent_mobile_phone:"请填写手机号码",
obligee_email:{
required:"请填写E-mail",
maxlength:"不能超过50个字"
},
agent_email:{
required:"请填写E-mail",
maxlength:"不能超过50个字"
},
agent_permission_copy_id:"请上传代理许可证",
complain_alias:{
required:"请填写原始ID或微信号"
},
complain_desc:{
required:"您未添加任何描述",
maxlength:"不能超过150个字"
},
complain_reason:{
required:"请填写您的理由",
maxlength:"不能超过150个字"
},
material:"至少选择一项证明材料",
trademark_copy_id:"请上传图片",
license_copy_id:"请上传图片",
id_card_copy_id:"请上传图片",
publish_copy_id:"请上传图片",
valid_publish_copy_id:"请上传图片",
ori_article_copy_id:"请至少上传一张图片",
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
submitHandler:v,
invalidHandler:y
}),$("#js_agentForm").find("input").each(function(){
var i=$(this).attr("name"),t={};
~i.indexOf("agent")&&("agent_company"==i||"agent_contacts_name"==i?t.required={
depends:function(){
return 1==$("input[name=is_agent]:checked").val()&&1==$("#js_agentType").find("li.selected").data("value");
}
}:(i="obligee"+i.substr(5),t=$.extend(!0,{},e[i]),$.each(t,function(e,i){
"number"!=typeof i&&(t[e]={
depends:function(){
return 1==$("input[name=is_agent]:checked").val();
}
});
})),$(this).rules("add",t));
}),l.addMethod("cert",function(e,i){
var t=-1==$(i).attr("name").indexOf("agent")?"js_obligeeType":"js_agentType";
return e=$.trim(e),1==$("#"+t).find("li.selected").data("value")?!0:l.rules.idcard(e);
},l.messages.idcard),l.addMethod("postcode",function(e){
return e=$.trim(e),/^\d{6}$/.test(e);
},"请输入正确的邮编格式"),l.addMethod("articleurl",function(e){
return e=$.trim(e),""==e?!0:"ok"==u;
},"请输入正确的内容链接"),l.addMethod("complainuinlist",function(e){
return e=$.trim(e),"ok"==m;
},"请填写正确的原始ID或微信号"),l.addMethod("email2",function(e){
return e=$.trim(e),/^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
},"请输入正确格式的电子邮件");
},
initUpload:function(){
var e=0;
$(".js_select_file").each(function(){
var i=$(this),n="js_upload"+e++,s=1*(i.data("multi")||0);
i.attr("id",i.attr("id")||n),a.uploadTmpFile({
container:i,
multi:!!s,
type:2,
width:106,
onComplete:function(e,n,o,r){
if(r&&r.base_resp&&0==r.base_resp.ret){
var l=i.parent().find("input[type=hidden]"),c=i.parent().parent().find(".upload_preview").show(),p=i.parent().parent().find(".js_remain"),d=l.val();
if(s){
if(""!=d&&d.split("	").length>=s)return void t.err("最多可以上传%s张".sprintf(s));
l.val(d=""==d?r.content:d+"	"+r.content),c.append('<span><img src="%s" /><a href="javascript:;" class="in_opt js_remove">删除</a></span>'.sprintf(a.tmpFileUrl(r.content)));
var _=s-d.split("	").length;
p.text(_);
}else i.text("重新上传"),l.val(r.content),c.html('<img src="%s" />'.sprintf(a.tmpFileUrl(r.content)));
i.closest(".upload_box").find(".frm_msg").hide(),i.closest(".upload_section").parent().find(".frm_msg").hide();
}
},
onAllComplete:function(){
var e=i.parent().find("input[type=hidden]"),t=e.val(),n=s-t.split("	").length;
i.parent().find(".upload_file_box").html("").hide(),0==n&&i.parent().find("object").css("left","99999999px");
}
}),i.on("click",function(){
var e=$(this).data("multi"),n=i.parent().find("input[type=hidden]").val();
e&&n.split("	").length>=e&&t.err("最多可以上传%s张".sprintf(e));
});
}),$("body").on("click",".upload_preview .js_remove",function(){
var e=$(this).parent(),i=e.index(),t=e.parent().parent(),n=t.find("input[type=hidden]"),a=n.val().split("	"),s=1*(t.find(".js_select_file").data("multi")||0);
e.remove(),a.splice(i,1),t.find(".js_remain").text(s-a.length),n.val(a.join("	")),
t.find("object").css("left","0");
});
},
initRegion:function(){
e={},e.obligee=new s({
container:"#js_obligeeRegion",
data:{
country:_.obligee_country||"中国",
province:_.obligee_province||null,
city:_.obligee_city||null
}
}),e.agent=new s({
container:"#js_agentRegion",
data:{
country:_.agent_country||"中国",
province:_.agent_province||null,
city:_.agent_city||null
}
});
},
initPopup:function(){
$(".js_infListBtn").on("click",function(){
var e=$("input[name=complain_type]:checked").val(),i=f.getNum(e);
if(i>=40)return void t.err("最多添加40个");
var n=$(1==e||4==e?4==e?"#tpl_biz":"#tpl_biz_wxa":"#tpl_link").popup({
title:1==e||4==e?"添加侵权的帐号":"添加侵权内容链接",
data:{
type:e
},
className:"infringement_dialog",
width:1==e||4==e?956:void 0,
buttons:[{
text:"确定",
click:function(){
if(1==e||4==e){
if(this.$dialogWrp.find(".dialog_ft>span:eq(0)").hasClass("btn_disabled"))return;
var n=this.$dialogWrp.find("li.account_selected");
if(n.length+i>40)return void t.err("最多添加40个帐号");
}else{
var n=this.$dialogWrp.find(".js_list").children();
if(n.length>40)return void t.err("最多添加40个链接");
}
f.add(e,n),this.hide();
},
type:1==e||4==e?"disabled":"primary"
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
switch(n.popup("get").find("input").placeholder(),e){
case"1":
w.initDialog1(n);
break;

case"2":
case"3":
w.initDialog(e,n);
break;

case"4":
w.initDialog1(n,e);
}
}),$("body").on("click",".js_list .js_remove",function(){
$(this).parent().remove();
});
},
initDialog1:function(e,n){
var a="",s=e.popup("get"),o=function(o,r){
if(o=o||0,o||s.find(".js_list").empty(),$(".dialog:visible").attr("data-type",n),
!r||"biz"===r){
var l=s.find(".js_biz_list_area");
l.find(".js_loading").show(),l.find(".js_empty").hide(),i.post({
url:wx.url("/acct/infringement"),
data:{
action:"4"==n?"getnicknameinvadelist":"getbizlist",
nickname:a,
begin:o,
type:_.type
},
mask:!1
},function(n){
if(l.find(".js_loading").hide(),n&&n.base_resp&&0==n.base_resp.ret&&n.getbizlist_resp){
if(0==n.getbizlist_resp.data.length&&0==o)l.find(".js_empty").show(),l.find(".js_biz_list").hide();else{
l.find(".js_empty").hide(),l.find(".js_biz_list").show();
var a=e.popup("get").find(".js_biz_list"),s=0==o?"html":"append";
if(n.getbizlist_resp.type="biz",a[s](template.render("tpl_bizlist",n.getbizlist_resp)),
"4"==$(".dialog:visible").data("type"))if(0==o)$(".js_bizItem:visible").each(function(){
$(this).trigger("click");
});else for(var r=o;r<o+n.getbizlist_resp.data.length;r++)$(".js_bizItem:visible").eq(r).trigger("click");
}
return void(1==n.getbizlist_resp.end&&l.find(".js_more").remove());
}
n.getbizlist_resp?i.show(n):t.err("系统错误，请重试");
});
}
if(4!=n&&(!r||"wxa"===r)){
var c=s.find(".js_wxa_list_area");
c.find(".js_loading").show(),c.find(".js_empty").hide(),i.post({
url:wx.url("/acct/infringement"),
data:{
action:"getwxalist",
nickname:a,
begin:o,
type:_.type
},
mask:!1
},function(n){
if(c.find(".js_loading").hide(),n&&n.base_resp&&0==n.base_resp.ret&&n.getbizlist_resp){
if(0==n.getbizlist_resp.data.length&&0==o)c.find(".js_empty").show(),c.find(".js_wxa_list").hide();else{
c.find(".js_empty").hide(),c.find(".js_wxa_list").show();
var a=e.popup("get").find(".js_wxa_list"),s=0==o?"html":"append";
n.getbizlist_resp.type="wxa",a[s](template.render("tpl_bizlist",n.getbizlist_resp));
}
return void(1==n.getbizlist_resp.end&&c.find(".js_more").remove());
}
n.getbizlist_resp?i.show(n):t.err("系统错误，请重试");
});
}
};
$("#js_search").on("click",function(){
var e=$.trim($("#js_searchInput").val());
return""==e?void t.err("不能为空"):(a=e,void o());
}),$("#js_searchInput").on("keypress",function(e){
13==e.keyCode&&$("#js_search").click();
}),s.on("click",".js_bizItem",function(){
$(this).siblings(".account_selected").length>=40?t.err("最多选择40个"):1==$(this).data("can_chosen")&&$(this).toggleClass("account_selected"),
$(this).parent().find("li.account_selected").length>0?s.find(".dialog_ft>span:eq(0)").removeClass("btn_disabled").addClass("btn_primary"):s.find(".dialog_ft>span:eq(0)").removeClass("btn_primary").addClass("btn_disabled");
}).on("click",".js_more",function(e){
var i=s.find(".js_bizItem").length;
$(this).remove(),o(i,$(e.currentTarget).data("type"));
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
var a=$(this).find("i");
if(!a.hasClass("btn_loading")){
var s=$.trim($("#js_addInput"+e).val());
if(""==s)return void t.err("不能为空");
if(n.popup("get").find(".js_list").children().length>=40)return void t.err("最多添加40个链接");
if(!/^http(s)?:\/\/mp\.weixin\.qq\.com/.test(s))return void t.err("请输入mp.weixin.qq.com域名下的内容链接");
a.btn(!1),i.post({
url:wx.url("/acct/infringement"),
data:{
action:"checkurl",
complain_url:encodeURIComponent(s),
type:_.type
},
mask:!1
},function(i){
a.btn(!0);
var o=+(i&&i.checkurl_resp?i.checkurl_resp.base_resp.ret:-1);
if(0==o){
var r=i.checkurl_resp.title,l=i.checkurl_resp.biz+"_"+i.checkurl_resp.mid+"_"+i.checkurl_resp.idx,c=n.popup("get").find(".js_list"),d=!1,_=p("tpl_linkitem",{
link:s,
title:r,
msid:l
});
c.children().each(function(){
(s==$(this).data("value")||l==$(this).data("msid"))&&(d=!0);
}),d||n.popup("get").find(".js_list").append(_),$("#js_addInput"+e).val("");
}else t.err(-1==o?"系统错误，请重试":-2==o?"此内容已被封":"请输入mp.weixin.qq.com域名下的内容链接");
});
}
}),$("#js_addInput"+e).on("keypress",function(i){
13==i.keyCode&&$("#js_add"+e).click();
}),n.popup("get").find(".js_list").html(p("tpl_linklist",{
data:f.getList(e,!0)
}));
},
initCheckbox:function(){
$("input[name=is_agent]").checkbox({
onChanged:function(e){
1==e.val()?$("#js_agentForm").show():$("#js_agentForm").hide();
}
}).adjust(_.is_agent||"0"),$("input[name=complain_type]").checkbox({
onChanged:function(e){
var i=e.val();
$(".js_infListEntry").hide(),4==i&&wx.cgiData.complainid||$("#js_infListEntry"+i).show(),
$(".js_material").hide(),$(".js_material"+i).show(),$(".js_bizItem").parents("ul.js_list").empty(),
$("#complain_tips").text(1==wx.cgiData.type&&4==i?"当你认为他人占用的名称侵犯了你的合法权益，可提起此项投诉。若侵权投诉成功，被投诉人7天内可以申诉，如果申诉无效，则名称占用将释放。":1==wx.cgiData.type&&1==i?"当你认为平台其他帐号对你存在冒用、混淆时，可提起此项投诉。此类投诉需提供充分、确凿的证据（包括但不限于你的权益证明、被投诉方的侵权行为证据等）供平台进行比对核实，否则平台将无法审核通过。你可收集更多证据后，重新发起投诉。":""),
2==i?($("#js_original").show(),$("#complain_tips").text("如你认为内容未经授权，擅自转载或使用了你的原创文字、图片、视频、影视作品等内容，或从事其他侵犯你作品版权的行为，可发起此项投诉。")):$("#js_original").hide(),
4==i&&1==_.type?($(".js_materialelse").hide(),$("#js_noMater").attr("checked")&&$(".js_step[data-step=1]").addClass("btn_disabled")):1==_.type&&($(".js_materialelse").show(),
$(".js_step[data-step=1]").removeClass("btn_disabled"));
}
});
var e=_.complain_type||"4";
setTimeout(function(){
$("input[name=complain_type][value="+e+"]").trigger("click");
},0),1==_.entrance_source&&($("input[name=complain_type]").eq(0).closest("label").hide(),
$("input[name=complain_type]").eq(2).closest("label").hide(),$("input[name=complain_type]").eq(1).click()),
wx.cgiData.complainid&&$(".icon_radio").hide();
var i,t=$(".js_material").parent().find("input[type=checkbox]");
t.checkbox({
onChanged:function(e){
e.closest(".upload_section").find(".upload_box").toggle(),"js_noMater"==e.attr("id")&&e.closest(".upload_section").find(".upload_box:visible").length?(e.closest(".upload_section").siblings(".upload_section").find(".upload_box:visible").each(function(e,i){
$(i).parent().find("input[type=checkbox]").trigger("click");
}),$(".js_step[data-step=1]").disable("btn_disabled").on("mouseover",function(){
i=new r({
dom:$(this),
content:"如没有上述材料，但有其他证明材料（如软件著作权等不具有专有权利的）能证明对方存在故意混淆，可在上方的投诉分类选择“冒充他人”进行投诉。",
isToggle:!0
});
})):($("#js_noMater:visible").attr("checked")||!$("#js_noMater:visible").attr("checked")&&$(".js_step[data-step=1]").hasClass("btn_disabled"))&&($("#js_noMater:visible").trigger("click"),
$(".js_step[data-step=1]").enable("btn_disabled").unbind("mouseover"),i&&i.remove());
}
}),t.each(function(){
var e=$(this).closest(".upload_section");
e.find("input[type=hidden]").val(""),$(this).checkbox("checked",!1);
});
},
initEvent:function(){
function e(){
var e=$("input[name=complain_alias]"),t=$.trim(e.val());
""!=t&&($("input[name=complain_uin_list]").val(""),m="pending",i.post({
url:wx.url("/acct/infringement"),
data:{
action:"getbizlist",
nickname:t,
begin:0,
type:_.type
},
mask:!1
},function(i){
if(i&&i.base_resp&&0==i.base_resp.ret){
var t=i.getbizlist_resp.data,n=e.parent().siblings(".frm_msg");
return void(1==t.length&&t[0].biz_uin?($("input[name=complain_uin_list]").val(t[0].biz_uin).data("headimg",t[0].headimg_url).data("nickname",t[0].nickname).data("alias",t[0].alias),
m="ok"):(n.length?n.show().children().show().text("请填写正确的原始ID或微信号"):e.parent().after('<p class="frm_msg fail" style="display: block;"><span for="complain_alias" class="frm_msg_content" style="display: inline;">请填写正确的原始ID或微信号</span></p>'),
m="wrong"));
}
m="wrong";
}));
}
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
e.cert.find(".frm_tips").show(),e.copyid.find("label").text("有效证件扫描件"),e.copyid.find(".upload_tips").html("请上传营业执照或组织机构代码证清晰彩色原件扫描件或数码照<br/>支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。"),
e.company.show(),e.contact.show()):(e.stop.css({
left:250
}),e.name.find("label").text("姓名"),e.name.find("input[name=obligee_name]").attr("placeholder","请填写权利人名称"),
e.cert.find("label").text("有效证件号(身份证)"),e.cert.find("input[name=obligee_cert_no]").attr("placeholder","请填写有效身份证号码"),
e.cert.find(".frm_tips").hide(),e.copyid.find("label").text("有效证件扫描件(身份证)"),e.copyid.find(".upload_tips").html("身份证上的所有信息清晰可见，必须能看清证件号码。<br/>支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。"),
e.company.hide(),e.contact.hide()),e.name.find("input").val(""),e.cert.find("input").val(""),
e.copyid.find(".upload_preview").empty().hide(),e.copyid.find("input").val("");
}
}),$("#js_agentType").on("click","li",function(){
if(!$(this).hasClass("selected")){
$(this).parent().children().removeClass("selected"),$(this).addClass("selected");
var e={
stop:$("#js_agentStop"),
name:$("#js_agentName"),
cert:$("#js_agentCertNo"),
copyid:$("#js_agentCertCopyId"),
company:$("#js_agentCompany"),
contact:$("#js_agentContactsName")
};
1==$(this).data("value")?(e.stop.css({
left:150
}),e.name.find("label").text("名称"),e.name.find("input[name=obligee_name]").attr("placeholder","请填写组织机构名称"),
e.cert.find("label").text("有效证件号"),e.cert.find(".frm_tips").show(),e.copyid.find("label").text("有效证件扫描件"),
e.copyid.find(".upload_tips").html("请上传营业执照或组织机构代码证清晰彩色原件扫描件或数码照<br/>支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。"),
e.company.show(),e.contact.show()):(e.stop.css({
left:250
}),e.name.find("label").text("姓名"),e.name.find("input[name=obligee_name]").attr("placeholder","请填写权利人名称"),
e.cert.find("label").text("有效证件号(身份证)"),e.cert.find(".frm_tips").hide(),e.copyid.find("label").text("有效证件扫描件(身份证)"),
e.copyid.find(".upload_tips").html("身份证上的所有信息清晰可见，必须能看清证件号码。<br/>支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。"),
e.company.hide(),e.contact.hide()),e.name.find("input").val(""),e.cert.find("input").val(""),
e.copyid.find(".upload_preview").empty().hide(),e.copyid.find("input").val("");
}
}),$("body").on("click",".js_step",function(){
if(!$(this).hasClass("btn_loading")&&!$(this).hasClass("btn_disabled")){
var e=$(this),n=$(this).data("type"),a=$(this).data("step");
if("next"==n&&1==a&&g())$(this).btn(!1),b(function(i){
e.btn(!0),i&&($(".js_stepWrapper").hide(),j(),$(window).scrollTop(0),d.setStep(2));
});else if("prev"==n&&2==a)$(".js_stepWrapper").hide(),$("#js_step1Wrapper").show(),
d.setStep(1);else if("next"==n&&2==a){
if(e.hasClass("btn_disabled"))return void t.err("请先打印通知书");
$(".js_stepWrapper").hide(),$("#js_step3Wrapper").show(),d.setStep(3),$(window).scrollTop(0);
}else if("prev"==n&&3==a)$(".js_stepWrapper").hide(),$("#js_step2Wrapper").show(),
d.setStep(2);else if("next"==n&&3==a){
e.btn(!1);
var s=$("input[name=notice_copy_id]").val();
if(""==s)return t.err("请上传投诉通知书扫描件"),void e.btn(!0);
var r=wx.cgiData.strategy_info.html(!1)?JSON.parse(wx.cgiData.strategy_info.html(!1)):"",l=r.wx_alias?r.wx_alias:"";
if(!l&&wx.cgiData.cgitoken){
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
return void e.btn(!0);
}
if(1!=_.type&&2!=_.type||!wx.cgiData.cgitoken)v(function(){
e.btn(!0);
});else{
var p=null;
$(".js_scan").popup({
title:"微信验证",
width:860,
onShow:function(){
var t=this;
p=new c({
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
e.btn(!0),n.remove();
},this.opt.uuid,this.opt.msgid);
}else{
var a=o.show({
title:"提示",
hideClose:!0,
type:"info",
msg:"请不要关闭页面，操作管理员确认中|请等待公众号管理员微信号%s验证操作申请，验证通过后操作将立即执行。此申请在30分钟后过期，请尽快联系管理员验证。若关闭页面，本次提交申请将中断。".sprintf(l),
buttons:[]
});
e.btn(!0);
var s,r=this,c=!1,p=function(){
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
if(i&&0==i.status?c=!1:i&&1==i.status?c=!0:i&&2==i.status&&(c=!0),c)if(window.clearInterval(s),
1==i.status){
a.remove();
var t=o.show({
title:"提示",
hideClose:!0,
type:"succ",
msg:"管理员已通过操作申请，正在提交中|请不要关闭本页面。",
buttons:[]
});
v(function(){
e.btn(!0),t.remove(),window.scrollTo(0,0);
},r.opt.uuid,r.opt.msgid);
}else if(2==i.status){
a.remove();
var t=o.show({
title:"提示",
type:"err",
msg:"管理员已拒绝操作申请|公众号管理员%s已拒绝该次侵权投诉。".sprintf(l),
buttons:[]
});
}
},
fail:function(){
setTimeout(p,300);
}
});
};
s=setInterval(p,5e3);
}
}
});
},
close:function(){
p&&p.destroy(),this.remove(),e.btn(!0);
}
});
}
}
}
}),$("body").on("click","#js_print",function(){
window.open(wx.url("/acct/infringement?action=getprint&t=infringement/print")),$("#js_printedstep").enable();
}),$("input[name=complain_alias]").on("blur",e),""!=$("input[name=complain_alias]").val()&&e(),
$("#js_reapply").on("click",function(){
o.show({
type:"warn",
msg:"重新填写，则清空已填内容，申请新的投诉单。",
buttons:[{
text:"重新填写",
click:function(){
window.onbeforeunload=null,location.href=wx.url("/acct/infringement?action=getinfo&t=infringement/infringement_add&type="+_.type);
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
var n=0;
$(window).on("scroll",function(){
var e=$("#js_printtips");
if(0!=e.length){
n=n||e.offset().top;
var i=$(window).scrollTop()-n;
i>0?e.addClass("mod_sticky"):e.removeClass("mod_sticky");
}
}),window.onbeforeunload=function(){
return $("#js_step2Wrapper:visible,#js_step3Wrapper:visible").length?"为数据安全起见，关闭后只能上传通知书或反通知书的扫描件，无法进行内容更改或下载。":void 0;
};
},
afterload:function(){
if(1==wx.cgiData.is_wx_ori){
var e=[];
console.log("after"),$("input[name=complain_type]").eq(1).click();
var i=JSON.parse(wx.cgiData.complain_list);
console.log(i),$.each(i.list,function(t){
console.log(i.list[t]),e.push({
link:i.list[t].url,
title:i.list[t].title
});
}),console.log(e),$("#js_infListEntry2").find(".js_list").append(p("tpl_linklist",{
data:e
})),$("input[name=ori_article_url]").val("http://mp.weixin.qq.com"+i.ori_url);
}
}
};
return w;
}();
d.init();
});