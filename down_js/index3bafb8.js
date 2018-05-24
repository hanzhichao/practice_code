define("setting/index.js",["common/wx/Tips.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/dialog.js","common/wx/Cgi.js","common/qq/queryString.js","common/wx/Step.js","biz_web/utils/upload.js","common/wx/Idcheck.js","common/wx/time.js","common/wx/top.js","common/wx/popover.js","common/wx/popup.js","setting/rename_popup.js","biz_common/moment.js","setting/delAccountDialog.js","setting/bindLegalPersonDialog.js","setting/unbindLegalPersonDialog.js","common/wx/qrcheck_weapp.js","common/lib/jquery.Jcrop.js","biz_web/ui/checkbox.js","setting/link_weapp.js"],function(e){
"use strict";
{
var t=template.render,i=e("common/wx/Tips.js"),n=(e("common/wx/tooltips.js"),e("biz_common/jquery.validate.js"),
e("common/wx/dialog.js")),a=e("common/wx/Cgi.js"),s=(e("common/qq/queryString.js"),
e("common/wx/Step.js")),o=e("biz_web/utils/upload.js"),c=o.uploadTmpFile,r=(e("common/wx/Idcheck.js"),
e("common/wx/time.js")),l=e("common/wx/top.js"),d=e("common/wx/popover.js"),p=(e("common/wx/popup.js"),
e("setting/rename_popup.js")),u=e("biz_common/moment.js"),f=e("setting/delAccountDialog.js"),h=e("setting/bindLegalPersonDialog.js"),m=e("setting/unbindLegalPersonDialog.js"),_=e("common/wx/qrcheck_weapp.js"),g=wx.data.t;
wx.data.lang;
}
e("common/lib/jquery.Jcrop.js"),e("common/wx/popup.js"),e("biz_web/ui/checkbox.js"),
e("setting/link_weapp.js");
var w=new l("#topTab",l.DATA.setting);
w.selected(0),""==$(".weapplink_list").html().trim()?($(".link_weapp_container").html('<span class="weapplink_nodata">暂无相关小程序</span>'),
$("#bind_weapp_first").show()):$("#bind_weapp_other").show(),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),u.unix(e).format(t);
});
var b={
submitting:!1,
back:function(){
var e=this.get().find(".js_btn_p").hide();
e.eq(1).show(),$("#step1Desc").css("display","block"),$("#step2Desc").css("display","none"),
this.resetPosition();
},
agree:function(){
var e=this.get().find(".js_btn_p").hide();
e.eq(0).show(),e.eq(2).show(),$("#step1Desc").css("display","none"),$("#step2Desc").css("display","block"),
this.resetPosition();
},
next:function(e){
if($("#modifyInput").on("change",function(){
$("#js_div_account_warning").empty();
}),$(".nickname_input").length>0){
if(0!=v.nickname())return;
cgiData.checkNickname=$("#modifyInput").val(),cgiData.invadeType=0;
var t=this,n=this.get().find(".js_btn_p");
if(b.submitting)return;
n.eq(2).btn(!1),b.submitting=!0,a.post({
url:"/cgi-bin/setuserinfo?action=check_nickname",
data:{
nick_name:cgiData.checkNickname
},
complete:function(){
b.submitting=!1,n.eq(2).btn(!0);
}
},function(s){
if(!s||!s.base_resp)return void i.err("系统错误，请稍后重试");
var o=1*s.base_resp.ret;
if(cgiData.invadeType=o,0==o||2==o||3==o||4==o){
var c=$("#normal_nickname"),r=$("#invade_nickname");
0==o?(c.show().find("span[type=before]").text(cgiData.nickname),c.find("span[type=after]").text(cgiData.checkNickname),
r.hide()):(c.hide(),r.show().find("span[type=invade]").text(cgiData.checkNickname)),
e.setStep(3),n.hide(),n.eq(3).show(),n.eq(4).show(),$(".frm_msg").css("display","none"),
$("#step2Desc").css("display","none"),$("#step3Desc").css("display","block"),t.resetPosition();
}else-41==o?$("#js_div_account_warning").html('<p class="frm_msg fail" style="display:block;">公众账号名称只允许含有中文、英文大小写、数字，长度为3-30个字符</p>'):1004==o?$("#js_div_account_warning").html('<p class="frm_msg fail" style="display:block;">名称与平台内已有名称重复。基于帐号名称唯一原则，请重新提交一个新名称。如果你认为已有名称侵犯了你的合法权益，可以进行<a target="_blank" href="/acct/newinfringement?action=get_agreement&t=infringement/manual&type=1&token='+g+"&fescene=1"+wx.data.param+'">侵权投诉</a>。<a href="http://kf.qq.com/faq/120911VrYVrA160331BzmE7z.html" target="_blank">了解更多</a></p>'):65201==o?$("#js_div_account_warning").html('<p class="frm_msg fail" style="display:block;">不能使用该名称</p>'):210050==o?$("#js_div_account_warning").html('<p class="frm_msg fail" style="display:block;">名称不能与已有公众帐号的微信号重复</p>'):200013==o?i.err("提交次数过于频繁，请稍后再试"):210041==o?i.err("名称长度为3-30个字符，不能含有特殊字符及“微信”等保留字"):1==o?i.err("不能使用该名称注册"):a.handleRet(s,{
id:64463,
key:9,
url:"/cgi-bin/setuserinfo?action=check_nickname"
});
});
}else{
if($(".userinfo_input").length&&0!=v.intro())return;
if($("#largeHeadImg").length&&0!=v.headimg())return void i.err("请先上传头像 ");
e.setStep(3);
var n=this.get().find(".js_btn_p").hide();
n.eq(3).show(),n.eq(4).show(),$(".frm_msg").css("display","none"),$("#step2Desc").css("display","none"),
$("#step3Desc").css("display","block"),$("#ensure_input").text($.trim($("#modifyInput").val())),
this.resetPosition();
}
},
prev:function(){
var e=this.get().find(".js_btn_p").hide();
e.eq(0).show(),e.eq(2).show(),$("#step2Desc").css("display","block"),$("#step3Desc").css("display","none"),
this.resetPosition();
},
show:function(e){
var t,i,n=$(e.tplId).popup({
title:e.title,
width:e.width,
className:e.className,
buttons:[{
text:"返回",
click:function(){
i.setStep(1),b.back.call(this);
}
},{
text:"同意并进入下一步",
click:function(){
i.setStep(2),b.agree.call(this),e.agreeInit&&e.agreeInit();
},
type:"primary"
},{
text:"下一步",
click:function(){
b.next.call(this,i);
},
type:"primary"
},{
text:"上一步",
click:function(){
i.setStep(2),$("#error_tip").hide(),b.prev.call(this);
},
type:"default"
},{
text:"确定",
click:e.done||function(){},
type:"primary"
}],
onHide:function(){
this.remove();
}
});
i=new s({
container:"#Js_stepBar",
names:["1 同意协议","2 "+e.title,"3 确定修改"]
}),t=n.popup("get").find(".js_btn_p").hide(),t.eq(1).show(),e.init(),n.popup("show");
}
},k={
submitting:!1,
next:function(e){
if($("#modifyInput").on("change",function(){
$("#js_div_account_warning").empty();
}),!$(".userinfo_input").length||0==v.intro()){
if($("#largeHeadImg").length&&0!=v.headimg())return void i.err("请先上传头像 ");
e.setStep(2);
var t=this.get().find(".js_btn_p").hide();
t.eq(2).show(),t.eq(1).show(),$(".frm_msg").hide(),$("#step1Desc").hide(),$("#step2Desc").show(),
$("#ensure_input").text($.trim($("#modifyInput").val())),this.resetPosition();
}
},
prev:function(){
var e=this.get().find(".js_btn_p").hide();
e.eq(0).show(),$("#step1Desc").show(),$("#step2Desc").hide(),this.resetPosition();
},
show:function(e){
var t,i,n=$(e.tplId).popup({
title:e.title,
width:e.width||960,
className:e.className||"",
buttons:[{
text:"下一步",
click:function(){
k.next.call(this,i);
},
type:"primary"
},{
text:"上一步",
click:function(){
i.setStep(1),$("#error_tip").hide(),k.prev.call(this);
},
type:"default"
},{
text:"确定",
click:e.done||$.noop,
type:"primary"
}],
onHide:function(){
this.remove();
}
});
i=new s({
container:"#Js_stepBar",
names:["1 "+e.title,"2 确定修改"]
}),t=n.popup("get").find(".js_btn_p").hide(),t.eq(0).show(),e.init&&e.init(),e.agreeInit&&e.agreeInit(),
n.popup("show");
}
},v={
intro:function(){
var e=$.trim($("#modifyInput").val()).length;
return 4>e||e>120?($(".frm_msg").css("display","block"),-1):($(".frm_msg").hide(),
0);
},
nickname:function(){
var e=$.trim($("#modifyInput").val()),t=e.length;
return 0==t?($(".frm_msg").css("display","block"),-1):/(微\s*信|we\s*chat)/gi.test(e)?($(".frm_msg").css("display","block"),
-1):($(".frm_msg").css("display","none"),0);
},
headimg:function(){
return-1!=$("#uploadFileSrc").attr("src").indexOf("cgi-bin")?0:-1;
}
},y=function(){
var e=[];
return{
register:function(t,i){
e.push({
name:t,
init:i.init
});
},
init:function(){
$("#Js_weiboVerify").on("click",function(){
n.show("用户达到500才可申请认证");
}),function(){
var e=cgiData.errcode;
""!=e&&i.err("10000"==e?"选定的腾讯微博帐号已经被其他公众号绑定，绑定失败":"绑定失败，请稍后再试");
}(),$.each(e,function(){
this.init();
});
}
};
}();
y.register("moresize",{
init:function(){
$("#more_size").click(function(){
var e=$("#tpl_moresize").popup({
title:"更多尺寸",
width:960,
className:"more_size",
data:{
pixSet:[8,12,15,30,50],
dist:[.5,.8,1,1.5,2.5],
qrcode:cgiData.links.qrcode
},
buttons:[{
text:"关闭",
click:function(){
this.hide();
},
type:"primary"
}],
onHide:function(){
this.remove();
}
});
e.popup("show");
});
}
}),y.register("username",{
init:function(){
if(3==cgiData.can_modify_nickname){
var e=$("#js_div_nickname_pass_time");
if(e.length>0&&cgiData.nickname_modify_time>0){
var n=new Date(1e3*cgiData.nickname_modify_time);
e.text("于%s提交名称修改申请，审核时间为7个工作日".sprintf(r.formatDate(n,"YYYY年MM月DD日")));
}
}
if(cgiData.nickname_mod_list&&$("#js_btn_rename_history").length>0){
var s=cgiData.nickname_mod_list.change_info_list||[],o=new d({
className:"rename_history_dialog",
dom:$("#js_btn_rename_history"),
content:t("tpl_rename_history",{
list:s
}),
isToggle:!0,
onShow:function(){
this.resetPosition();
}
});
o.hide();
}
$("#js_btn_rename_cancel").on("click",function(){
p.setData({
newName:cgiData.new_nickname,
oldName:cgiData.nickname,
deadline:cgiData.name_cancel_deadline,
realnameType:cgiData.realname_type
}),p.show("result");
}),$("#js_btn_rename").on("click",function(){
"verify"==$(this).data("method")?$("#tpl_rename_via_verify").popup({
title:"提醒",
buttons:[{
text:"去认证",
type:"primary",
click:function(){
location.href=wx.url("/acct/wxverifyorder?action=index");
}
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
}):(p.setData({
oldName:cgiData.nickname,
realnameType:cgiData.realname_type
}),p.show(""));
}),$("#js_btn_rename1").click(function(){
var e={
title:"修改名称",
tplId:"#tpl_nickname",
width:960,
className:"modify_nickName",
init:function(){
$("#modifyInput").blur(v.nickname);
},
done:function(){
if(2==cgiData.invadeType||3==cgiData.invadeType||4==cgiData.invadeType)window.location.href=wx.url("/cgi-bin/frame?t=setting/auth_frame&invadetype="+cgiData.invadeType+"&nickname="+encodeURIComponent(cgiData.checkNickname));else if(0==cgiData.invadeType){
var e=this.get().find(".js_btn_p");
if(b.submitting)return;
e.eq(4).btn(!1),b.submitting=!0,a.post({
url:"/cgi-bin/setuserinfo?action=nickname",
data:{
nick_name:cgiData.checkNickname,
invade_type:0
},
complete:function(){
b.submitting=!1,e.eq(4).btn(!0);
}
},function(e){
if(!e||!e.base_resp)return void i.err("系统错误，请稍后重试");
var t=1*e.base_resp.ret;
0==t?(i.suc("修改成功"),setTimeout(function(){
window.location.reload(!0);
},1e3)):1004==t?i.err("名称与平台内已有名称重复，请重新设置"):200013==t?i.err("提交次数过于频繁，请稍后再试"):210041==t?i.err("名称长度为3-30个字符，不能含有特殊字符及“微信”等保留字"):210050==t?i.err("名称不能与已有公众帐号的微信号重复"):65201==t?i.err("不能使用该名称"):a.handleRet(e,{
id:64463,
key:10,
url:"/cgi-bin/setuserinfo?action=nickname"
});
});
}
}
};
b.show(e);
});
}
}),y.register("avatar",function(){
var e,t,n,s,r,l,d,p,u,f,h='<img class="round_img" src="'+cgiData.links.rimgcrop+'"/>',m='<img class="round_white_img" src="'+cgiData.links.rimgcropwhite+'"/>',_=('<img class="round_img" src="'+cgiData.links.rimgcropframe+'"/>',
{
suc:function(a,s,c){
i.suc(a),e.find(".jcrop-holder").show(),$("#circleImgUpload").attr("src",cgiData.links.imgupload+"&share=circle&r="+Math.random());
var h=o.tmpFileUrl(s);
r.attr("src",h),l.attr("src",h),d.attr("src",h),$(".round_img").css("display","block"),
f.setImage(h,function(){
var i=f.getWidgetSize(),a=f.getBounds();
f.ui.holder.css("margin","0").css({
margin:(e.height()-i[1])/2+"px auto 0"
}),$.extend(u,{
fid:s,
share:c,
c:{},
lar:{
w:a[0],
h:a[1]
},
mid:{
w:t.width(),
h:t.height()
},
sml:{
w:n.width(),
h:n.height()
}
});
var o=u.lar.w||t.width();
f.setSelect([0,0,o,o]),p.enable();
});
},
err:function(e){
i.err(e),x();
}
}),g=function(){
e=$("#largeHeadImg"),t=$("#squareHeadImg"),n=$("#circleHeadImg").append(m),s=$('<img src="'+cgiData.links.spacer+'"/>').appendTo(e),
r=$('<img class="square_img" id="uploadFileSrc" src="'+cgiData.links.spacer+'"/>').appendTo(t),
l=$('<img class="circle_img" src="'+cgiData.links.spacer+'"/>').appendTo(n),d=$(".ensure_avatar_preview"),
p=$("#saveAvatar"),p.enable=function(){
p.removeClass("btnDisable").attr("disable",!1);
},p.disable=function(){
p.addClass("btnDisable").attr("disable",!0);
},p.click(v).disable();
var i=$("#settingArea"),a=$("#cropImgArea");
a.data("class",a.attr("class")),$("#cancelSaveAvatar").click(function(){
i.show(),a.hide().attr("class",a.data("class")),x();
}),u={
fid:null,
share:null,
c:{},
lar:{},
mid:{
w:r.width(),
h:r.height()
},
sml:{
w:l.width(),
h:l.height()
}
},s.Jcrop({
onChange:y,
onSelect:y,
setSelect:[100,100,50,50],
createHandles:["nw","ne","se","sw"],
aspectRatio:1,
boxWidth:e.width(),
boxHeight:e.height()
},function(){
f=this,e.find(".jcrop-holder").hide(),$(".jcrop-tracker",this.ui.selection).html(h),
$(".jcrop-handle",this.ui.selection).css({
width:"7px",
height:"7px"
});
});
},w=function(){
c({
container:$("#Js_uploadAvatar"),
type:7,
share:"circle",
multi:!1,
compress:!1,
onComplete:function(e,t,i,n){
if(n.base_resp)switch(+n.base_resp.ret){
case 0:
_.suc("上传成功",n.content,"circle");
break;

case 1:
_.err("图片太大，请重新上传");
}
}
});
},b=!1,v=function(){
var e=(u.share,u.fid),t={
fid:e
};
if(e){
var n,s=u.c,o=u.lar.w,c=u.lar.h;
$.extend(t,{
x1:s.x/o,
y1:s.y/c,
x2:s.x2/o,
y2:s.y2/c,
width:Math.floor(s.w),
height:Math.floor(s.h),
x:Math.floor(s.x),
y:Math.floor(s.y)
}),n=wx.url("/misc/cropimg?t=ajax-response"),1!=b&&(b=!0,a.post({
url:n,
data:t,
mask:!1
},function(e){
e&&0==e.ret?(i.suc("保存成功"),location.reload(!0)):(b=!1,a.handleRet(e,{
id:64463,
key:11,
url:"/misc/cropimg?t=ajax-response"
}),p.enable());
}));
}
},y=function(e){
if(parseInt(e.w)>0){
var t=u.lar.w,i=u.lar.h,n=u.mid.w/e.w,a=u.mid.h/e.h;
r.css({
width:Math.round(n*t)+"px",
height:Math.round(a*i)+"px",
marginLeft:"-"+Math.round(n*e.x)+"px",
marginTop:"-"+Math.round(a*e.y)+"px"
}),d.css({
width:Math.round(n*t)+"px",
height:Math.round(a*i)+"px",
marginLeft:"-"+Math.round(n*e.x)+"px",
marginTop:"-"+Math.round(a*e.y)+"px"
}),n=u.sml.w/e.w,a=u.sml.h/e.h,l.css({
width:Math.round(n*t)+"px",
height:Math.round(a*i)+"px",
marginLeft:"-"+Math.round(n*e.x)+"px",
marginTop:"-"+Math.round(a*e.y)+"px"
}),u.c=e;
}
},x=function(){
$("#squareImgUpload").attr("src",cgiData.links.imgupload+"&share=square"),$("#circleImgUpload").attr("src",cgiData.links.imgupload+"&share=circle");
};
return{
init:function(){
$("#changeHeadImg").click(function(){
var e={
title:"修改头像",
tplId:"#tpl_avatar",
init:g,
agreeInit:w,
width:960,
className:"change_avatar",
done:function(){
$("#saveAvatar").trigger("click");
}
};
k.show(e);
});
}
};
}());
var x=!1;
y.register("userinfo",function(){
var e="/cgi-bin/setuserinfo?action=intro&t=ajax-response",t=function(){
var t=$.trim($("#modifyInput").val().replace(/\s/g," "));
if(t.length>140)return i.err("用户信息不能超过140个字"),!0;
var n={};
n.intro=t,1!=x&&(x=!0,a.post({
url:wx.url(e),
data:n,
mask:!1
},function(e){
if(!e||!e.base_resp)return x=!1,void i.err("提交失败");
var t=1*e.base_resp.ret;
if(0!=t){
switch(x=!1,t){
case 62005:
i.err("你已经是认证用户了");
break;

case 62006:
i.err("提交失败");
break;

case 65202:
$("#error_tip").text("不能含有虚假的、冒充、利用他人名义的、容易构成混淆、误认的、法律、法规和政策禁止的内容").show();
break;

case 210042:
i.err("用户信息长度应为4~120个字");
break;

default:
a.handleRet(e,{
id:64463,
key:12,
url:"/cgi-bin/setuserinfo?action=intro&t=ajax-response"
});
}
return!0;
}
i.suc("提交成功"),location.reload(!0);
}));
};
return{
init:function(){
$("#modifyUserInfo").click(function(){
var e={
title:"修改功能介绍",
tplId:"#tpl_intro",
width:960,
className:"modify_intro label_block",
init:function(){
$("#modifyInput").blur(v.intro);
},
done:t
};
k.show(e);
});
}
};
}()),y.register("wechatid",function(){
var e,n,o,c,r=function(e){
var t="";
if(e.query)for(var n in e.query)t+="&"+n.toString()+"="+e.query[n].toString();
a.post({
url:wx.url("/cgi-bin/setuserinfo?action="+e.action+"&cgi=setuserinfo&t=ajax-response&alias="+encodeURIComponent(e.alias)+t),
data:e.data||{},
mask:!1
},function(t){
if(!t||!t.base_resp)return void i.err("微信号设置失败，请稍后重试");
var n=1*t.base_resp.ret;
0==n?e.success(t):e.fail(n,t);
});
};
return{
init:function(){
if(cgiData.nickname_mod_list&&$("#js_btn_modify_alias_history").length>0){
var l=new d({
className:"rename_history_dialog",
dom:$("#js_btn_modify_alias_history"),
content:t("tpl_modify_wechatid_history",{
list:cgiData.modify_alias_info.items||[]
}),
isToggle:!0,
onShow:function(){
this.resetPosition();
}
});
l.hide();
}
$("#setWeChatID").click(function(){
if(""===cgiData.alias){
var t=0;
n=$("#tpl_wechatid").popup({
title:"设置微信号",
width:960,
className:"wx_account align_edge simple",
buttons:[{
text:"下一步",
click:function(){
o.eq(0).hasClass("btn_primary")&&(c.setStep(3),o.hide(),o.eq(1).show(),o.eq(2).show(),
u.hide(),f.find(".js_modAliasShow").text("微信号："+e),f.find(".js_aliasToBe").text(e),
f.show());
},
type:"disabled"
},{
text:"上一步",
click:function(){
c.setStep(2),o.hide(),o.eq(0).show(),f.hide(),u.show();
}
},{
text:"完成",
click:function(){
r({
action:"set_alias",
alias:e,
query:{
ticket:t
},
success:function(){
i.suc("微信号设置成功"),location.reload();
},
fail:function(e,t){
switch(-1==e&&(e=62004),e){
case 62001:
i.err("微信号设置失败");
break;

case 62002:
i.err("微信号包含非法字符");
break;

case 62003:
i.err("公众号已经设置了微信号，不能再次设置");
break;

case 62004:
i.err("你设置的微信号已存在，请重新设置");
break;

case 200044:
i.err("二维码失效，请刷新二维码后重试");
break;

default:
a.handleRet(t,{
id:64463,
key:13,
url:"/cgi-bin/setuserinfo?action=set_alias"
});
}
}
});
},
type:"primary"
}],
onHide:function(){
this.remove();
}
}),o=n.popup("get").find(".js_btn_p").hide();
var l=o.eq(0),d=n.find(".js_checkStatus");
c=new s({
container:n.find(".js_process"),
selected:1,
names:["1 验证身份","2 检测有效微信号","3 确认设置"]
});
var p=n.find(".js_step1").show(),u=n.find(".js_step2"),f=n.find(".js_step3"),h=_.init({
container:"#js_div_qrcheck_set",
container_class:"",
scene:0,
data:{
typeid:13,
nickname:cgiData.nickname
},
size:165,
cgiURI:"/cgi-bin/safeqrcode",
showImgInfo:!0,
onSuccess:function(e,n){
console.log("onSuccess"),0==n.base_resp.ret?(c.setStep(2),l.show(),p.hide(),u.show(),
t=e):i.err(1e3==n.base_resp?"缺少参数":1001==n.base_resp?"第三方不合法":1002==n.base_resp?"跳转URI不合法":"系统错误，请稍后重试");
},
onFail:function(e,t,i){
console.log("onFail",e,t,i);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
});
h.load(),n.popup("show"),cgiData.nickname&&(n.find(".js_pre_nick").text(cgiData.nickname),
n.find(".js_pre_nickname").text("昵称："+cgiData.nickname)),cgiData.intro&&(cgiData.intro=cgiData.intro.replace(/&nbsp;/g," "),
n.find(".js_pre_intro").text(cgiData.intro)),cgiData.headimg&&n.find(".js_pre_headimg").find("img").attr("src",cgiData.headimg);
var m=n.find(".js_modAliasShow"),g=n.find(".js_checkAliasBtn"),w=$("#js_modAliasInput");
w.on("keyup propertychange",function(){
var e=$(this).val().trim();
m.text("微信号："+e),d.hide(),l.removeClass("btn_primary").addClass("btn_disabled");
}),g.on("click",function(){
var t=$(this),i=t.parent(),n=i.find(".js_checkStatus"),s=i.find(".js_good"),o=i.find(".js_warn"),c=w.val().trim();
return t.attr("disabled")?!1:(n.hide(),t.btn(!1),void(c&&/^[\da-z\_-]{6,20}$/i.test(c)&&/^[a-z]/i.test(c)?r({
action:"check_alias",
alias:c,
success:function(){
e=c,t.btn(!0),s.show(),l.removeClass("btn_disabled").addClass("btn_primary");
},
fail:function(e,i){
switch(-1==e&&(e=62004),e){
case 62001:
t.btn(!0),o.text("微信号设置失败").show();
break;

case 62002:
t.btn(!0),o.text("微信微信号包含非法字符号设置失败").show();
break;

case 62003:
t.btn(!0),o.text("公众号已经设置了微信号，不能再次设置").show();
break;

case 62004:
t.btn(!0),o.text("你设置的微信号已存在，请重新设置").show();
break;

case 200044:
t.btn(!0),o.text("二维码失效，请刷新二维码后重试").show();
break;

default:
t.btn(!0),o.text("微信号设置失败，请稍后重试").show(),a.handleRet(i,{
id:64463,
key:13,
url:"/cgi-bin/setuserinfo?action=check_alias"
});
}
}
}):(t.btn(!0),o.text("可以使用6~20个字母、数字、下划线和减号，必须以字母开头。").show())));
});
}else{
var b=!1,t=0;
n=$("#tpl_modify_wechatid").popup({
title:"修改微信号",
width:960,
className:"align_edge modify_wechat_dialog",
buttons:[{
text:"确定",
click:function(){
k.hide();
var t=$("#js_modifyAliasInput").val().trim();
t&&/^[\da-z\_-]{6,20}$/i.test(t)&&/^[a-z]/i.test(t)?r({
action:"check_alias",
alias:t,
success:function(){
e=t,c.setStep(3),o.hide(),o.eq(1).show(),o.eq(2).show(),f.find(".js_new_wechat").text(e),
u.hide(),f.show();
},
fail:function(e,t){
switch(-1==e&&(e=62004),e){
case 62001:
k.text("微信号设置失败").show();
break;

case 62002:
k.text("微信号包含非法字符").show();
break;

case 62003:
k.text("公众号已经设置了微信号，不能再次设置").show();
break;

case 62004:
k.text("你设置的微信号已存在，请重新设置").show();
break;

case 200044:
k.text("二维码失效，请刷新二维码后重试").show();
break;

default:
k.text("微信号设置失败，请稍后重试").show(),a.handleRet(t,{
id:64463,
key:13,
url:"/cgi-bin/setuserinfo?action=check_alias"
});
}
}
}):k.text("可以使用6~20个字母、数字、下划线和减号，必须以字母开头。").show();
},
type:"primary"
},{
text:"上一步",
click:function(){
c.setStep(2),o.hide(),o.eq(0).show(),u.show(),f.hide();
}
},{
text:"确定",
click:function(){
r({
action:"set_alias",
alias:e,
query:{
ticket:t
},
success:function(){
b=!0,i.suc("微信号修改成功"),n.find(".js_process").hide(),o.hide(),o.eq(3).show(),v.find(".js_new_wechat").text(e),
f.hide(),v.show();
},
fail:function(e,t){
switch(-1==e&&(e=62004),e){
case 62001:
i.err("微信号设置失败");
break;

case 62002:
i.err("微信号包含非法字符");
break;

case 62003:
i.err("公众号已经设置了微信号，不能再次设置");
break;

case 62004:
i.err("你设置的微信号已存在，请重新设置");
break;

case 200044:
i.err("二维码失效，请刷新二维码后重试");
break;

default:
a.handleRet(t,{
id:64463,
key:13,
url:"/cgi-bin/setuserinfo?action=set_alias"
});
}
}
});
},
type:"primary"
},{
text:"关闭",
click:function(){
location.reload();
},
type:"primary"
}],
onHide:function(){
b?location.reload():this.remove();
}
}),o=n.popup("get").find(".js_btn_p").hide();
var k=n.find(".js_warn");
c=new s({
container:n.find(".js_process"),
selected:1,
names:["1 验证身份","2 修改微信号","3 确定修改"]
});
var p=n.find(".js_step1").show(),u=n.find(".js_step2"),f=n.find(".js_step3"),v=n.find(".js_step4"),y=n.find("#js_modifyAliasLen"),h=_.init({
container:"#js_div_qrcheck_modify",
container_class:"",
scene:0,
data:{
typeid:13,
nickname:cgiData.nickname
},
size:165,
cgiURI:"/cgi-bin/safeqrcode",
showImgInfo:!0,
onSuccess:function(e,n){
console.log("onSuccess"),0==n.base_resp.ret?($("#js_modifyAliasInput").on("keyup propertychange",function(){
var e=$(this).val().trim();
y.text(e.length),k.hide();
}),c.setStep(2),o.eq(0).show(),p.hide(),u.show(),t=e):i.err(1e3==n.base_resp?"缺少参数":1001==n.base_resp?"第三方不合法":1002==n.base_resp?"跳转URI不合法":"系统错误，请稍后重试");
},
onFail:function(e,t,i){
console.log("onFail",e,t,i);
},
onMsgUpdate:function(){
console.log("onMsgUpdate");
}
});
h.load(),n.popup("show");
}
});
}
};
}()),y.register("authentication",{
init:function(){
var e=26,t=cgiData.isNeedVerify;
$("#Js_authentication").on("click",function(){
$("#tpl_authentication").popup({
title:"身份验证",
onOK:function(){
var e=this.get().find(".js_btn").eq(0),n=$.trim($("#Js_question").find("input").val());
return-1==t?(i.err("请选择一项"),!0):1==t&&""==n?(i.err("验证问题不能为空"),!0):n.length>26?(i.err("验证问题不能超过26个字"),
!0):(a.post({
url:wx.url("/cgi-bin/setuserinfo?t=ajax-response"),
data:{
action:"meetingsettings",
need_verify:t,
verify_question:$("#Js_question").find("input").val()
},
beforeSend:function(){
e.btn(0);
},
error:function(){
i.err("系统错误，请重试"),e.btn(1);
}
},function(t){
return e.btn(1),t&&t.base_resp?void(0==t.base_resp.ret?(i.suc("设置成功"),location.reload()):a.handleRet(t,{
id:64463,
key:14,
url:"/cgi-bin/setuserinfo?action=meetingsettings"
})):void i.err("设置失败");
}),!0);
},
onCancel:function(){
this.hide();
},
onHide:function(){
$("#Js_question").remove(),this.remove();
}
}),$("#Js_question").find("input").val(cgiData.question.html(!1)),$(".Js_authenticationRadio").checkbox({
multi:!1,
onChanged:function(e){
t=e.val(),"Js_needAuth"==e.attr("id")?$("#Js_question").show():$("#Js_question").hide();
}
}),$("#Js_question").find("i").on("click",function(){
var e=$("#Js_question").find("ul");
return e.hasClass("dn")?e.show(100).toggleClass("dn"):e.hide(100).toggleClass("dn"),
$(this).toggleClass("select_icon_up").toggleClass("select_icon_down"),!1;
}),$(document).on("click",function(){
$("#Js_question").find("ul").hide(100).addClass("dn"),$("#Js_question").find("i").removeClass("select_icon_up").addClass("select_icon_down");
}),$("#Js_question").on("click","li",function(){
var e=$(this).text();
$("#Js_question").find("input").val(e).focus();
}),$("#Js_question").find("input").on("focus",function(){
$("#Js_wordNum").show().text(26-$(this).val().length);
}).on("blur",function(){
$("#Js_wordNum").hide();
}).on("keyup",function(){
$("#Js_wordNum").text(26-$(this).val().length);
}).on("keydown",function(t){
if(!t.ctrlKey)switch(t.keyCode){
case 8:
case 13:
case 37:
case 38:
case 39:
case 40:
case 46:
break;

default:
$(this).val().length>=e&&t.preventDefault();
}
}).on("paste",function(e){
var t="";
return window.clipboardData&&clipboardData.getData?t=clipboardData.getData("Text"):e.originalEvent.clipboardData&&(t=e.originalEvent.clipboardData.getData("text/plain")),
$(this).val(($(this).val()+t).substr(0,26)),!t;
});
});
}
}),y.register("customerServicePhone",{
init:function(){
$.validator.addMethod("phone",function(e){
return e=$.trim(e),""===e||/^\d+$/.test(e)||/^\d{1,4}(-\d{1,12})+$/.test(e);
},"请输入正确的手机号码");
var e=$("#tpl_customerServicePhone").popup({
title:"修改客服电话",
width:960,
height:609,
className:"simple customer_phone",
autoShow:!1,
data:{
phone:cgiData.service_phone
},
onOK:function(){
if($("#customerServiceForm").valid()){
var e=$.trim($("#customerServicePhone").val());
a.post({
url:"/cgi-bin/setuserinfo?t=ajax-response",
data:{
action:"servicephone",
phonenumber:e
}
},function(e){
if(!e||!e.base_resp)return void i.err("设置失败，请稍后再试");
switch(+e.base_resp.ret){
case 0:
i.suc("设置成功"),location.reload();
break;

case 200002:
i.err("所填写的电话号码格式不正确，请重新输入");
break;

case-1:
i.err("设置失败，请稍后再试");
break;

default:
a.handleRet(e,{
id:64463,
key:15,
url:"/cgi-bin/setuserinfo?action=servicephone"
});
}
});
}
return!0;
},
onCancel:function(){
this.hide();
}
});
$("#js_customerServicePhone").on("click",function(){
return e.popup("show"),!1;
});
var t=cgiData.service_phone,n=$("#phone_number_copy");
$("#customerServicePhone").on("keyup input blur propertychange",function(){
var e=$(this),i=$.trim(e.val()).html(!0);
t!=i&&(t=i?i:"&nbsp;",n.html(t));
}),$("#customerServiceForm").validate({
rules:{
phone:{
required:1==cgiData.can_use_merchant?!0:!1,
phone:!0
}
},
messages:{
phone:{
required:"你已开通微信支付，必须设置客服电话。",
phone:"所填写的电话号码格式不正确"
}
},
errorPlacement:function(e,t){
var i=t.parent().parent();
i.find(".fail").remove(),e.insertBefore(i.find(".frm_tips").eq(0));
}
});
}
}),y.register("bizTransfer",{
init:function(){
$(".js_transfer").on("click",function(){
if(1==cgiData.can_apply_acct_transfer)window.location.href=wx.url("/acct/biztransferorder?action=index");else{
var e="";
1==cgiData.is_overseas?e="海外公众号暂不支持帐号迁移功能。":3==cgiData.can_not_apply_acct_transfer_reason?e="帐号因违规无法发起帐号迁移流程。":4==cgiData.can_not_apply_acct_transfer_reason?(cgiData.acct_transfer_illegal_reason.shift(),
e=cgiData.acct_transfer_illegal_reason.join("、"),e="检测到帐号正处于能力封禁期，请在能力封禁处罚结束后再发起迁移流程。<br>处罚类型：%s<br>处罚详情请查看站内信通知。".sprintf(e)):e="0"==cgiData.realname_type?"当前帐号尚未注册成功，请先完成注册。":"你的帐号还未验证主体真实性，暂无法进入流程，满足以下条件之一即可进入：<br>1. 帐号已在注册时小额打款并验证成功。<br>2. 帐号曾认证成功(包括资质认证成功)，可在设置-微信认证中按流程发起认证。",
n.show({
type:"info",
msg:e,
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}
});
}
}),y.register("turnToService",{
init:function(){
function e(){
function n(){
a.post({
url:wx.url("/misc/safeassistant"),
data:{
action:"get_ticket"
}
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?void s(e.ticket):void i.err("系统错误，请稍后重试");
});
}
function s(e){
a.post({
url:"/safe/safeqrconnect",
mask:!1,
data:{
action:"check",
type:"verify_upgrade",
ticket:e,
state:0
}
},function(t){
return t&&t.uuid?void o(e,t.uuid):void showErr("系统错误，请稍后重试");
});
}
function o(i,n){
var s="https://mp.weixin.qq.com/safe/safeqrcode?action=check&type=verify_upgrade&auth=ticket&ticket=%s&uuid=%s".sprintf(i,n);
l.find(".js_qrcode").attr("src",s).show(),l.find(".js_qrcode_alias").text(cgiData.wx_alias),
$(".js_upgrade_loading").hide(),u=setInterval(function(){
a.get({
url:"/safe/safeuuid?timespam="+(new Date).valueOf()+"&uuid="+n,
mask:!1
},function(i){
if(!i||!i.errcode)return void clearInterval(u);
switch(console.log(i.errcode),1*i.errcode){
case 401:
break;

case 403:
e();
break;

case 404:
$(".js_upgrade_fix").text("请在手机上确认身份...");
break;

case 405:
$(".js_upgrade_fix").text("确认成功，正在转为服务号..."),t(i.code,n);
break;

default:
e();
}
});
},1e3);
}
clearInterval(u),$(".js_qrcode").hide(),$(".js_upgrade_fix").text(""),$(".js_upgrade_loading").show(),
n();
}
function t(e,t){
clearInterval(u),a.post({
url:"/cgi-bin/setuserinfo?action=verify_upgrade",
data:{
code:e,
uuid:t
}
},function(e){
if(!e||!e.base_resp)return void i.err("系统错误，请稍后重试");
switch(+e.base_resp.ret){
case 0:
i.suc("转换成功"),setTimeout(function(){
location.reload();
},400);
break;

default:
i.err("系统错误，请稍后重试");
}
});
}
function n(t){
d.go(t);
var i=l.find(".js_btn");
1==t?(i.eq(0).text("取消"),i.eq(1).text("下一步")):2==t?(i.eq(0).text("上一步"),i.eq(1).text("确定")):e(),
l.find(".js_turn_step").hide(),l.find('.js_turn_step[data-step="%s"]'.sprintf(t)).show(),
l.popup("resetPosition");
}
function o(){
p--,0>=p?l.popup("remove"):n(p);
}
function c(){
p++,p>=3&&(l.find(".dialog_ft").remove(),l.popup("resetPosition")),n(p);
}
function r(){
return $("#tpl_turn_service").popup({
title:"订阅号转为服务号",
width:960,
className:"wx_upgrade_dialog",
buttons:[{
text:"取消",
click:function(){
o();
}
},{
text:"下一步",
click:function(){
c();
},
type:"primary"
}],
onShow:function(){
this.$dialogWrp.find(".dialog_bd").css("padding",0);
var e=this.$dialogWrp.find(".js_process");
d=new s({
container:e,
names:["1 了解账号区别","2 再次确认","3 验证管理员身份"]
}),this.resetPosition();
},
onHide:function(){
clearInterval(u),this.remove();
}
});
}
var l,d,p,u;
$(".js_turn_to_service").click(function(){
l=r(),p=1;
});
}
}),y.register("deleteAccount",{
init:function(){
return 1!=cgiData.realname_status?void $("#deleteAccount").on("click",function(){
n.show({
type:"info",
className:"del_acct_dialog",
msg:"注销帐号|未完成注册的帐号不能注销",
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}):void("0"!=cgiData.can_write_off?$("#deleteAccount").on("click",function(){
if("0"==cgiData.is_writeoff_timeout&&0!=cgiData.realname_type){
var e=new f({
type:cgiData.realname_type,
principal_name:cgiData.principal_name
});
e.self.stepBar.setStep(3),e.self.dialog.find(".js_step_1").hide(),e.self.dialog.find(".js_step_other_3").show(),
e.self.dialog.find(".js_money").html("&yen;"+cgiData.remit_info.money),e.self.dialog.find(".js_code").html(cgiData.remit_info.remit_bank_no+"&nbsp;"+cgiData.remit_info.remit_code),
e.self.dialog.find(".js_date").text(u.unix(cgiData.remit_info.deadline).format("YYYY年MM月DD日")),
e.self.btns.eq(0).hide(),e.self.btns.eq(1).hide(),e.self.btns.eq(3).show(),e.self.dialog.show();
}else new f({
type:cgiData.realname_type,
principal_name:cgiData.principal_name
});
}):"0"==cgiData.can_write_off&&$("#deleteAccount").on("click",function(){
n.show({
type:"info",
msg:"注销帐号|该帐号不能注销",
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}));
}
}),y.register("bindLegalPerson",{
init:function(){
0!=cgiData.realname_type&&($("#bindLegalPerson").on("click",function(){
new h;
}),$("#unbindLegalPerson").on("click",function(){
new m({
admin_name:cgiData.wx_alias
});
}));
}
}),y.init();
});