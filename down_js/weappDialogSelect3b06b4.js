define("common/wx/media/weappDialogSelect.js",["common/wx/popup.js","tpl/media/weapp_dialog_select.html.js","tpl/media/weapp_dialog_content.html.js","common/wx/Cgi.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i){
s.get({
url:"/advanced/operselfmenu?action=get_bind_wxopen_info"
},function(e){
e&&e.base_resp&&0==e.base_resp.ret&&e.bind_info?(a=JSON.parse(e.bind_info).bind_list,
"function"==typeof i&&i(a)):s.handleRet(e,{
id:"64524",
key:"2",
msg:"获取小程序信息失败"
});
});
}
i("common/wx/popup.js");
var n=i("tpl/media/weapp_dialog_select.html.js"),t=i("tpl/media/weapp_dialog_content.html.js"),s=i("common/wx/Cgi.js"),o=i("common/wx/Tips.js"),a=null,p=function(i,s){
var p=void 0,l={
appid:"",
nick_name:"",
pic_url:""
},c=$(n).popup({
title:"选择小程序",
width:960,
className:"weapp_select_dialog",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_ok btn_disabled",
click:function(){
return p?(s(p,l),void this.remove()):void o.err("请选择小程序");
}
},{
text:"取消",
type:"default",
classWrap:"js_cancel_btn",
click:function(){
this.remove();
}
}],
onCancel:function(){
this.remove();
},
onHide:function(){
this.remove();
}
}),d=function(){
var i=c.find(".js_weapp_select_step1"),n=function(i){
if(i.find(".js_weapplink_loading").hide(),a.length){
$.each(a,function(i,e){
e.pic_url=e.pic_url||"http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
}),i.find(".js_weapplink_hint_select").show(),i.find(".js_weapplink_list").html(wx.T(t,{
list:a
})).show();
var e=i.find(".js_weapplink_item_inner").click(function(){
e.find(".js_weapplink_select_mask").hide(),$(this).find(".js_weapplink_select_mask").show(),
p=$(this).data("appid");
for(var i=0;i<a.length;i++)a[i].appid===p&&(l=a[i]);
c.find(".js_ok").removeClass("btn_disabled");
}).each(function(){
p===$(this).data("appid")&&$(this).find(".js_weapplink_select_mask").show();
});
}else i.find(".js_weapplink_hint_none").show();
};
a?n(i):e(function(){
n(i);
});
};
d();
};
return{
show:p,
getInfo:e
};
});