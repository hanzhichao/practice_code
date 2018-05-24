define("cardticket/assistsend_detail.js",["cardticket/common_template_helper.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js","cardticket/topmenu.js"],function(t){
"use strict";
for(var e=t("cardticket/common_template_helper.js"),o=e,a=wx.cgiData,r={},n=t("common/wx/Cgi.js"),c=t("common/wx/Tips.js"),s=t("common/wx/tooltips.js"),s=(t("common/wx/tooltipsManager.js"),
t("common/wx/tooltips.js")),i=a.category_info,m=t("common/wx/dialog.js"),l=i.primary_category,p=0;p<l.length;p++)0!=l[p].status&&(r[l[p].primary_category_id]=l[p]);
template.helper("$category",function(t,e){
var o=r[t],a="";
if(o){
var n=o.secondary_category;
if(a+=o.category_name,n)for(var c=0;c<n.length;c++)if(n[c].secondary_category_id==e){
a+="&nbsp;"+n[c].category_name;
break;
}
}
return a;
}),$("#js_merchant_detail_container").html(template.render("js_merchant_detail_tpl",{
data:a.data
}));
new s({
container:$(".js_refuse_reason"),
reposition:!0,
content:o.nl2br(wx.cgiData.refuse_reason).html(!1)||"无",
type:"hover"
});
$(".js_delete").on("click",function(t){
var e=$(this).attr("data-id"),o=$(this).attr("brand_name"),a=!1;
m.show({
type:"warn",
title:"移除子商户",
msg:"将删除子商户"+o+"|移除后，将删除该子商户信息。",
buttons:[{
text:"取消",
click:function(t){
this.remove(t);
},
type:"normal"
},{
text:"确定",
click:function(t){
if(!a){
a=!0;
var o=this;
n.post({
mask:!1,
url:"/merchant/cardhelpmakesend",
data:{
action:"delete",
sub_merchant_id:e
}
},function(e){
"0"==e.base_resp.ret?(c.suc("删除商户成功"),o.remove(t),location.href=wx.url("/merchant/cardstat?action=overviewpage")):n.show(e);
});
}
},
type:"primary"
}]
}),t.stopPropagation();
}),t("cardticket/topmenu.js").selected("overviewpage");
});