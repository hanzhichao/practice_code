define("ibeacon/data_manage.js",["common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/popover.js","common/wx/Tips.js","common/wx/top.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),o=(t("biz_common/moment.js"),t("common/wx/pagebar.js")),n=t("common/wx/popover.js"),a=t("common/wx/Tips.js"),i=t("common/wx/top.js"),c=$("#js_tbody"),s=($(".pagination_wrp"),
$("#js_qrcode"));
new i("#js_div_toptab",i.DATA.ibeacon).selected("dataReport");
var r=402,u=403,d=405,m=500,l=null,p=function(t){
t>15&&new o({
container:".pagination_wrp",
perPage:15,
first:!1,
last:!1,
isSimple:!0,
initShowPage:1,
totalItemsNum:t,
callback:function(t){
window.scrollTo(0,0),c.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records.slice(15*(t.currentPage-1),15*t.currentPage)
}));
}
});
},w=function(){
c.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records.slice(0,15)
})),$("body").on("click",".js_unbind",function(){
var t=$(this).data("id"),o=$(this).data("nick");
new n({
dom:this,
hideIfBlur:!0,
content:"解绑后%s将无法再接受到数据日报及业务通知，是否确认解绑?".sprintf(o),
buttons:[{
type:"primary",
text:"解绑",
click:function(){
var o=this;
o.$pop.find(".jsPopoverBt").eq(0).btn(!1),e.post({
url:"/merchant/beaconstatuser?action=unbind",
data:{
weixin_id:t
},
success:function(t){
0==t.base_resp.ret?(o.remove(),a.suc("已删除"),location.reload()):(o.remove(),a.err("系统错误"));
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
var t=function(){
window.clearInterval(l),e.post({
url:wx.url("/misc/safeassistant"),
data:{
action:"get_ticket"
}
},function(t){
return t&&t.base_resp&&0==t.base_resp.ret?void e.get({
url:"/safe/safeqrconnect",
data:{
ticket:t.ticket,
redirect_uri:wx.cgiData.redirect_uri,
token:wx.data.t
},
success:function(e){
e&&e.uuid&&(s.attr("src","/safe/safeqrcode?action=shake_beacon&ticket="+t.ticket+"&uuid="+e.uuid),
l=window.setInterval(function(){
o(e.uuid);
},2e3));
}
}):void a.err("系统错误，请稍后重试");
});
},o=function(o){
e.post({
url:"/safe/safeuuid",
data:{
uuid:o,
action:"json",
type:"json"
},
success:function(e){
switch(e.errcode){
case m:
t();
break;

case r:
t();
break;

case u:
t();
break;

case d:
window.clearInterval(l),a.suc("已确认成功"),location.reload();
}
}
});
};
t(),p(wx.cgiData.records.length);
};
w();
});