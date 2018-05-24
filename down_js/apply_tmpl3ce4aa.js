define("wxopen/apply_tmpl.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js"],function(o){
"use strict";
var n=o("common/wx/Cgi.js"),t=o("common/wx/Tips.js"),i=(o("common/wx/popup.js"),
!1);
$(".js_open_btn").on("click",function(){
i||(i=!0,$(this).addClass("btn_loading"),n.post({
url:"/cgi-bin/wxopen?action=apply",
data:{},
complete:function(){
i=!1,$(this).removeClass("btn_loading");
}
},function(o){
o=o.base_resp,0==o.ret?(t.suc("操作成功"),location.href="/cgi-bin/wxopen?action=list&token="+wx.data.t+"&lang=zh_CN"):t.err(1==o.ret?"您不满足开通条件，无法开通":1004==o.ret?"请到“设置-安全中心-管理员和运营者设置“绑定管理员，再开通小程序。":"系统错误，请稍后再试");
}));
});
});