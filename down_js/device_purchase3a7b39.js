define("ibeacon/device_purchase.js",["common/wx/pagebar.js","common/wx/top.js"],function(e){
"use strict";
var t=e("common/wx/pagebar.js"),a=e("common/wx/top.js");
new a("#js_div_toptab",a.DATA.ibeacon).selected("deviceManagement");
for(var s=wx.cgiData.total_count,i=wx.cgiData.showpage,r=0;r<wx.cgiData.records.length;r++)wx.cgiData.records[r].items=JSON.parse(wx.cgiData.records[r].items);
var c=$("#js_tbody");
c.html(template.render("js_tbody_tpl",{
list:wx.cgiData.records
}));
var n=$(".js_toggle");
n.click(function(){
var e=$(this).parents("tr").next();
e.hasClass("dn")?($(this).text("收起详情"),$(this).parent().removeClass("ui-pos-r decive__selected"),
e.removeClass("dn")):($(this).text("展开详情"),$(this).parent().addClass("ui-pos-r decive__selected"),
e.addClass("dn"));
}),s>0&&new t({
container:".pagination_wrp",
perPage:10,
first:!1,
last:!1,
isSimple:!0,
initShowPage:i,
totalItemsNum:s,
callback:function(e){
var t=e.currentPage;
if(t!=i)return location.href(wx.url("/merchant/beaconselllist?action=list&page_index="+t)),
!1;
}
});
});