define("cardticket/init_sub_merchant_list.js",["common/wx/Cgi.js","biz_web/ui/dropdown.js","cardticket/select_sub_merchant.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
for(var t=0;t<e.length;t++)_[e[t].Id]||(_[e[t].Id]=e[t]);
}
function a(e){
e=$.extend(!0,{
count:10,
initComplete:$.noop,
sub_merchant_id:0,
sub_merchant_brand_name:"",
defaultLabel:"子商户"
},e),s.get({
url:"/merchant/cardhelpmakesend?action=list",
data:{
offset:0,
limit:e.count,
status_list:""
}
},function(a){
if(0==a.base_resp.ret){
var s=$.parseJSON(a.bind_list);
e.data=s.List,e.total_count=a.total_count||0,t(e.data),n(e);
}else l.err("系统繁忙，请稍后重试");
});
}
function n(e){
for(var a=e.data,n=[{
name:"全部子商户",
value:""
}],s=0;s<a.length;s++)n.push({
name:a[s].BrandName,
value:a[s].Id
});
e.total_count>a.length&&n.push({
name:"更多",
value:o
});
var l=new c({
container:e.container,
label:e.sub_merchant_brand_name||e.defaultLabel,
data:n,
callback:function(t){
if(t==o);else if(t!=e.sub_merchant_id){
e.sub_merchant_id=t;
var a=_[t];
e.selectComplete&&e.selectComplete(a);
}
t||l.bt.find(".jsBtLabel").html(e.defaultLabel);
}
});
l.selected(e.sub_merchant_id||0),l.bt.on("click",function(){
$(".ta_calendar").hide();
}),l.dropdown.find(".jsDropdownItem[data-value="+o+"]").click(function(){
new i({
multi:!1,
data:null,
is_sns_card:!1,
max_card:1,
param:{
status_list:""
},
check_remain_quota:!1,
onHide:function(){
this.__success||l.selected(e.sub_merchant_id);
},
selectComplete:function(a,n){
n&&(l.bt.find(".jsBtLabel").html(n.BrandName),this.__success=!0,e.sub_merchant_id=n.Id,
t([n]),e.selectComplete&&e.selectComplete(n));
}
}).show();
}),e.initComplete&&e.initComplete();
}
var s=e("common/wx/Cgi.js"),c=e("biz_web/ui/dropdown.js"),i=e("cardticket/select_sub_merchant.js"),l=e("common/wx/Tips.js"),o="-_______more_sub_merchant__",_={};
return a;
});