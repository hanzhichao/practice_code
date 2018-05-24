define("service/pay.js",["biz_common/moment.js","common/wx/Cgi.js"],function(t){
"use strict";
var e=t("biz_common/moment.js"),a=t("common/wx/Cgi.js"),i=function(){
function t(){
var t={
userName:wx.cgiData.userName,
userId:wx.cgiData.userId,
orderId:wx.cgiData.orderId
};
switch(t.time=e.unix(wx.cgiData.date).format("YYYY-MM-DD H:mm"),t.price=(wx.cgiData.price/100).toFixed(2),
wx.cgiData.name){
case"package":
t.name="高级接口";
break;

case"verify":
t.name="微信认证";
}
$("#jsMain").html(template.render("tpl",t)),0==wx.cgiData.status?($("#qrNormal").show(),
r.init()):($("#paySucc").show(),$("#detailBt").show());
}
return{
init:t
};
}(),r=function(){
function t(){
setTimeout(e,r);
}
function e(){
a.get({
url:i+"&order_id="+wx.cgiData.orderId,
mask:!1,
error:function(){
setTimeout(e,r);
}
},function(t){
0!=t.base_resp.ret||0!=wx.cgiData.status||1!=t.order_info.status&&3!=t.order_info.status&&6!=t.order_info.status?setTimeout(e,r):(wx.cgiData.status=t.order_info.status,
$("#paySucc").show(),$("#detailBt").show(),$("#qrNormal").hide());
});
}
var i="/merchant/order?action=query",r=3e3;
return{
init:t
};
}();
i.init();
});