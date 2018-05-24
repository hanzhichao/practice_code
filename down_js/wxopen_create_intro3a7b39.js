define("wxopen/wxopen_create_intro.js",["common/wx/Tips.js","common/wx/Cgi.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
var c=(e("common/wx/Tips.js"),e("common/wx/Cgi.js"),e("biz_web/ui/checkbox.js"),
$("#js_check_agree")),n=$("#js_btn_submit");
c.checkbox({
onChanged:function(e){
e.is(":checked")?n.enable():n.disable();
}
}),c.prop("checked")?n.enable():n.disable(),n.on("click",function(){
return location.href="/cgi-bin/fastregister?token="+wx.cgiData.token+"&lang="+wx.cgiData.lang,
!1;
});
});