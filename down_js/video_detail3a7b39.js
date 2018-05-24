define("original/video_detail.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popover.js","common/wx/pagebar.js","common/wx/dialog.js","biz_common/moment.js"],function(t){
"use strict";
function o(){
for(var t=0;t<f.length;t++)f[t].time=p.unix(f[t].create_time).format("YYYY-MM-DD");
}
function i(){
if(d.append(_.join("、")),u.html(template.render("js_list_tmpl",{
list:f
})),wx.cgiData.total_num){
var t=window.wx.cgiData,o=t.total_num,i=t.count,n=t.begin/i+1,e=t.vid;
new m({
container:".pagination_wrp",
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:o,
callback:function(t){
var o=t.currentPage;
if(o!=n)return o--,location.href=wx.url("/cgi-bin/ori_video?action=get_ori_video_info&begin=%s&offset=%s&vid=%s".sprintf(i*o,i,e)),
!1;
}
});
}
}
function n(){
u.on("mouseover",".js_acct_detail",function(){
var t=$(this),o={
fakeuin:t.data("fakeuin"),
nick_name:t.data("nick_name"),
alias:t.data("alias"),
func_introduce:t.data("func_introduce")
};
a&&a.remove(),a=new c({
dom:this,
content:template.render("js_popover",o),
hover:!0,
hideIfBlur:!0,
margin:"left"
}),a.$pop.css({
left:parseInt(a.$pop.css("left"))-20+"px",
top:parseInt(a.$pop.css("top"))-10+"px"
});
}).on("click",".js_report",function(){
var t=$(this);
l.show({
title:"视频举报",
msg:"举报通过后，抄袭文章将会被删除。你的视频如果不符合《视频原创声明须知》，平台将按恶意举报对帐号进行一定期限内的封号处理，情节严重的将永久封禁帐号。是否确认举报？",
mask:!0,
type:"warn",
buttons:[{
text:"确定",
click:function(){
var o=this,i=this.dom.find(".btn_primary");
i.hasClass("btn_loading")||(i.btn(0),r.post({
url:"/cgi-bin/ori_video?action=report",
data:{
vid:wx.cgiData.vid,
fakeuin:t.data("fakeuin"),
url:t.data("url")
},
mask:!1
},function(t){
return i.btn(1),t&&t.base_resp?void(0==t.base_resp.ret?(s.suc("举报成功"),o.remove(),
window.location.reload(!0)):1==t.base_resp.ret?(s.suc("举报失败，该文章已被删除"),setTimeout(function(){
o.remove(),window.location.reload(!0);
},1e3)):(r.handleRet(t,{
id:64462,
key:42,
url:"/cgi-bin/ori_video?action=report"
}),s.err("操作失败，请重试"))):void s.err("操作失败，请重试");
}));
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
o(),i(),n();
}
var a,r=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),c=t("common/wx/popover.js"),m=t("common/wx/pagebar.js"),l=t("common/wx/dialog.js"),p=t("biz_common/moment.js"),u=$("#js_reprint_list"),d=$("#js_tags"),f=wx.cgiData.list,_=(wx.cgiData.total_count,
wx.cgiData.tags);
e();
});