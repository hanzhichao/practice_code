define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),c=t("common/wx/tooltipsManager.js"),n=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
e.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(s.suc("删除门店成功"),t.success&&t.success()):e.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var e=new o({
container:t.container,
content:"删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var e=t.success;
t.success=function(){
e&&e(),c.removeAll();
};
}
n.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
c.removeAll();
}
}]
});
e.show(),c.removeAll(),c.add(e);
}
},
listStore:function(t){
var s=$.extend({},{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
},t.getDataExtra);
e.get({
url:"/merchant/entityshop",
data:s
},function(s){
var o,c=s?1*s.base_resp.ret:-1;
if(0===c){
var n=$.parseJSON(s.data);
o={
shop_list:n.store_location,
total_num:s.total_count,
is_from_wxapoi:"true"===s.is_from_wxapoi
};
}else{
if(-7!==c&&200007!==c)return void e.show(s);
o={
shop_list:[],
total_num:0,
access_deny:!0
};
}
t.success&&t.success(o),wx.cgiData&&!wx.cgiData._store_data&&(wx.cgiData._store_data=o);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return n;
});