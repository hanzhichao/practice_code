define("user/add_user.js",["tpl/user/search.html.js","common/wx/Cgi.js","common/wx/Tips.js","user/common_template_helper.js","common/wx/popup.js","biz_web/lib/json.js","common/wx/stopMultiRequest.js","widget/wechat_search.css"],function(e){
"use strict";
var s=e("tpl/user/search.html.js"),i=template.compile('{each users as item i}<li class="wechat_item js_user_item" data-openid="{item.openid}" data-username="{item.username}">      <img class="wechat_avatar" src="{item.headimg_url}" alt="">      <strong class="wechat_nickname">{item.nickname}</strong>      <div class="wechat_mask js_user_mask">      <i class="icon20_common del_media_white js_user_del" data-openid="{item.openid}" data-username="{item.username}"></i>      <span class="vm_box"></span>      </div>    </li>{/each}'),t=e("common/wx/Cgi.js"),n=e("common/wx/Tips.js"),a={
searchuser:{
5e5:"该微信用户不存在, 请重新搜索",
500001:"该微信用户已经成功绑定了该公众号，无需重复绑定",
500002:"已经给该微信用户发送了绑定邀请，无需重复绑定",
5000017:"操作频繁，请稍后重试",
500012:"超过最大绑定次数",
500013:"该微信号已经绑定了5个小程序开发者，不可继续绑定。",
5000015:"已经绑定管理员，不能绑定运营者了",
"500013_1":"该微信号已经绑定了5个小程序体验者，不可继续绑定。",
5000017:"搜索用户中频率限制",
5000018:"搜索不到该用户<br>请输入正确的微信号，并确保“微信-我-隐私”中的“通过微信号搜索到我”选项处于打开状态。",
5000027:"该微信号已绑定为管理员，自动拥有开发者的所有权限，无需重复绑定。",
5000029:" 管理员具备最高权限，不允许给再管理员授权。",
"5000027_1":"该微信号已绑定为管理员，自动拥有体验者的所有权限，无需重复绑定。",
157011:"你当前操作次数太频繁，请稍后再试。",
200103:"该微信用户不存在，请重新搜索",
"-1027":"已经给该微信用户发送了绑定邀请，无需重复绑定"
}
},o=e("user/common_template_helper.js"),r=o.user_type_map;
e("common/wx/popup.js"),e("biz_web/lib/json.js"),e("common/wx/stopMultiRequest.js"),
e("widget/wechat_search.css");
var c=function(e){
function o(e){
e?l.find(".js_fail_msg").html(e).show():l.find(".js_fail_msg").hide();
}
function c(e){
e?l.find(".js_search_loading").show():l.find(".js_search_loading").hide(),g=e?!0:!1;
}
function m(s){
if(!s)return void h.focus();
if(!g){
if(w>=e.left_bind_num)return void n.err("最多还能绑定%s个".sprintf(e.left_bind_num)+d);
c(!0),o(),console.log("search "+s);
var r=({
username:s,
type:e.type,
ticket:p.qrcheckTicket
},"/misc/wxaadmin?action=search ");
5==e.type&&(r="/misc/wxopenkf?action=search"),t.post({
url:r,
data:{
username:s,
type:e.type,
ticket:p.qrcheckTicket
}
},{
done:function(r){
if(c(!1),console.log(r),0==r.base_resp.ret){
var m=r.userinfo||{};
if(5==e.type?(m.headimg_url=r.headimgurl?r.headimgurl+"/0":"http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
m.openid=r.openid,m.username=r.username):4==e.type&&(m.headimg_url=r.headimg_url,
m.nickname=r.nickname,m.username=s,m.openid=""),h.val(""),j[m.openid])return void n.err("该微信号已添加, 请勿重复搜索");
w++,f.prepend(i({
users:[m]
})).scrollTop(0),j[m.openid]=!0,_.find(".dialog_ft").find(".left_bind_num").text(e.left_bind_num-w);
}else{
var u=r.base_resp.ret+(3==e.type?"":"_1"),d=a.searchuser[u]||a.searchuser[r.base_resp.ret];
if(d)return o(d),void h.focus();
h.focus(),t.show(r),o("error:"+r.base_resp.ret);
}
},
fail:function(e){
c(!1),console.log(e);
}
});
}
}
var u=e.type,d=r[u],_=$(s).popup({
autoShow:!0,
width:600,
stepNames:["管理员验证","绑定"+d],
title:"绑定"+d,
buttons:[{
text:"确定",
step:1,
click:function(){
var s=this,i=f.find(".js_user_item");
if(!i.length)return void n.err("请先搜索微信号");
var a={
openid_count:i.length,
type:e.type
};
i.each(function(e){
a["openid"+e]=$(this).attr("data-openid");
}),a.ticket=p.qrcheckTicket,console.log(a);
var o="/misc/wxaadmin?action=add_user";
if(5==e.type){
o="/misc/wxopenkf?action=add";
for(var r=[],c=0;c<a.openid_count;c++)r.push(a["openid"+c]);
a.openid_string=r.join(",");
}else 4==e.type&&(a={
auth_list:JSON.stringify({
items:[{
username:i.data("username"),
authority:2
}]
})
});
t.post({
url:o,
data:a
},{
done:function(e){
var i=e.base_resp.ret;
0==e.base_resp.ret?(n.suc("绑定成功"),s.hide(),location.reload()):(t.show(e),"-1027"==i?n.err("已经给该微信用户发送了绑定邀请，无需重复绑定"):"-1026"==i?n.err("该微信用户已经成功绑定了该小程序，无需重复绑定"):"-1023"==i&&n.err("客服人员上限已满，无法绑定更多微信号"));
},
fail:function(e){
console.log(e);
}
});
},
type:"primary"
},{
text:"取消",
step:1,
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
},
className:"align_edge wechat_search_dialog qrcheck_dialog step_pop_dialog"
}),l=_,p=this,h=l.find(".js_search_input"),f=l.find(".js_user_list"),g=!1;
h.keyup(function(e){
if(wx.isHotkey(e,"enter")){
var s=$.trim($(this).val());
m(s);
}
}),l.on("click",".js_search_btn",function(){
var e=$.trim(h.val());
m(e);
});
var j={},w=0;
l.on("mouseover",".js_user_item",function(){
$(this).find(".js_user_mask").show();
}).on("mouseout",".js_user_item",function(){
$(this).find(".js_user_mask").hide();
}).on("click",".js_user_del",function(){
var s=$(this).attr("data-openid");
j[s]=!1,w--,_.find(".dialog_ft").find(".left_bind_num").text(e.left_bind_num-w),
$(this).closest(".js_user_item").remove();
});
};
return c;
});