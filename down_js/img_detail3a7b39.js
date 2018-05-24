define("original/img_detail.js",["common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/popover.js","biz_common/moment.js"],function(t){
"use strict";
function i(){
var t=window.wx.cgiData;
u.list=t.data.list,u.info=t.data.ori_info;
for(var i=0,o=u.list.length;o>i;i++){
var n=u.list[i];
n.createTimeStr=p.unix(n.create_time).format("YYYY-MM-DD"),n.statusDesc=u.statusMap[n.status]||"";
}
u.info.title=u.info.title.html(!0);
}
function o(){
$("#main").html(template.render("main_tpl",{
info:u.info,
list:u.list
})),n();
}
function n(){
{
var t=window.wx.cgiData,i=t.data.ori_info.total_cites,o=t.count,n=t.begin;
new m({
container:".pagination_wrp",
perPage:o,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:i,
callback:function(t){
var i=t.currentPage;
if(i!=n)return location.href=wx.url("/cgi-bin/imgcopyright?action=reprint&begin=%s&count=%s&img_url=%s".sprintf(i,o,u.info.url)),
!1;
}
});
}
}
function a(){
$("#data_list").on("mouseover",".js_lb_content",e),$("#data_list").on("click",".js_complain",function(){
var t=$(this);
s.show({
title:"图片举报",
msg:"举报通过后，抄袭文章将会被删除。你的图片如果不符合《图片原创声明须知》，平台将按恶意举报对帐号进行一定期限内的封号处理，情节严重的将永久封禁帐号。是否确认举报？",
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
var i=this,o=this.dom.find(".btn_primary");
if(!o.hasClass("btn_loading")){
var n={
list:[{
fakeuin:t.data("fakeuin"),
img_url:t.data("imgurl"),
article_url:t.data("articleurl")
}]
};
o.btn(0),r.post({
url:"/cgi-bin/imgcopyright?",
data:{
action:"add_complaints",
orignal_img_url:u.info.url,
reprint_info:JSON.stringify(n)
},
mask:!1
},function(t){
return o.btn(1),t&&t.base_resp?void(0==t.base_resp.ret?(c.suc("举报成功"),i.remove(),
window.location.reload(!0)):1==t.base_resp.ret?(c.suc("举报失败，该文章已被删除"),setTimeout(function(){
i.remove(),window.location.reload(!0);
},1e3)):(r.handleRet(t,{
id:64462,
key:34,
url:"/cgi-bin/imgcopyright?action=add_complaints"
}),c.err("操作失败，请重试"))):void c.err("操作失败，请重试");
});
}
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
}
function e(){
var t=$(this),i={
uin:t.data("fakeuin"),
nick_name:t.data("nickname"),
signature:t.data("signature"),
alias:t.data("alias"),
signature:t.data("signature")
};
u._oPop&&u._oPop.remove(),u._oPop=new l({
className:"popover_biz_account",
dom:this,
content:template.render("popupdesc",i),
hover:!0,
hideIfBlur:!0,
margin:"left"
}),u._oPop.$pop.css({
left:parseInt(u._oPop.$pop.css("left"))-20+"px",
top:parseInt(u._oPop.$pop.css("top"))-10+"px"
});
}
var r=t("common/wx/Cgi.js"),s=t("common/wx/dialog.js"),c=t("common/wx/Tips.js"),m=t("common/wx/pagebar.js"),l=t("common/wx/popover.js"),p=t("biz_common/moment.js"),u={
statusMap:{
0:"",
21:"审核中",
22:"已删文",
23:"审核不通过"
}
};
i(),o(),a();
});