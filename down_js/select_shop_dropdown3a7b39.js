define("cardticket/select_shop_dropdown.js",["common/wx/Cgi.js","cardticket/overview_enum.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/select_shop_popup.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
if(e=$.extend(!0,{
count:10,
wx_poi_uid:"",
business_name:"",
initComplete:$.noop,
show_all_shop:!0
},e),void 0===e.url)_.listStore({
getDataExtra:{
audit_state:"2|3",
count:e.count
},
success:function(t){
e.data=t,o(e);
}
});else{
var t={
begin:0,
count:e.count,
audit_state:"2|3"
};
i.get({
url:e.url,
data:t
},function(t){
if(0==t.base_resp.ret){
var n=$.parseJSON(t.data),a={
shop_list:n.store_location,
total_num:t.total_count
};
e.data=a,o(e);
}else console.log(t),i.show(t);
});
}
}
function n(e){
return(e.business_name?e.business_name:e.branch_name)+(e.business_name&&e.branch_name?e.branch_name:"");
}
function o(e){
var t=e.data.shop_list,o=[{
name:"全部门店",
value:""
}];
e.show_all_shop||(o=[]),e.initComplete&&e.initComplete(e.data);
for(var i=0;i<t.length;i++)t[i].new_business_name=n(t[i]),o.push({
name:t[i].new_business_name,
value:t[i].wx_poi_uid
});
e.data.total_num>t.length&&o.push({
name:"更多门店",
value:u
});
var a=new s({
container:e.container,
label:e.shop_name,
data:o,
callback:function(t,n){
t==u||t!=e.wx_poi_uid&&(e.wx_poi_uid=t,e.callback&&e.callback(e.wx_poi_uid,n));
}
}).selected(e.wx_poi_uid||0);
a.bt.on("click",function(){
$(".ta_calendar").hide();
}),a.dropdown.find(".jsDropdownItem[data-value="+u+"]").click(function(){
var t=new c({
multi:!1,
data:null,
url:e.url,
audit_state:"2|3",
pageCapacity:5,
nostore:!1,
onHide:function(){
this.__success||a.selected(e.wx_poi_uid||0);
},
initComplete:function(){
$(".js_help_tips",t.shop_select.$dom).hide();
},
selectComplete:function(t){
if(t&&t.length){
var o=n(t[0]);
a.bt.find(".jsBtLabel").html(o),this.__success=!0,e.wx_poi_uid=t[0].wx_poi_uid,e.callback&&e.callback(e.wx_poi_uid,o);
}
}
});
t.show();
});
}
var i=e("common/wx/Cgi.js"),a=e("cardticket/overview_enum.js"),s=(a.sort_key,e("biz_web/ui/dropdown.js")),_=(a.sort_type,
e("cardticket/store_cgi.js")),c=e("cardticket/select_shop_popup.js"),u=(e("common/wx/Tips.js"),
"-_______more_shop__");
return t;
});