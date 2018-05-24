define("ibeacon/page_step1.js",["biz_web/ui/checkbox.js","common/wx/Step.js","common/wx/Cgi.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js");
{
var c=e("common/wx/Step.js"),n=(e("common/wx/Cgi.js"),{
1:"/merchant/beacongetpage?action=diy",
10:"/merchant/beacongetpage?action=card",
11:"/merchant/beacongetpage?action=store",
14:"/merchant/beacongetpage?action=draw"
}),o=10;
new c({
container:"#js_step_bar",
selected:1,
names:["1 选择页面类型","2 编辑页面"]
});
}
$(".js_checkbox").checkbox({
type:"checkbox",
multi:!1,
onChanged:function(e){
o=e.val(),$(".js_type_img").hide(),$(".js_img_"+o).show();
}
}),$(".js_checkbox_10").trigger("click"),$("#js_next").click(function(){
location.href=n[o]+"&token="+wx.cgiData.token+"&lang="+wx.cgiData.lang;
});
});