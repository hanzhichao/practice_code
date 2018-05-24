define("user/user_cgi_tag.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e,a,r){
"use strict";
var t={
add:"/cgi-bin/user_tag?action=batch_set_tag",
del:"/cgi-bin/user_tag?action=del_tag",
remark:"/cgi-bin/user_tag?action=add_mark",
getBuddy:"/cgi-bin/user_tag?action=get_fans_info",
add_black:"/cgi-bin/user_tag?action=set_black",
del_black:"/cgi-bin/user_tag?action=cancle_black"
},n=e("common/wx/Tips.js"),o=e("common/wx/Cgi.js");
window.location&&window.location.pathname&&("/merchant/rewardstat"==window.location.pathname?(t.add_black+="&source=1",
t.del_black+="&source=1"):"/misc/appmsgcomment"==window.location.pathname?(t.add_black+="&source=2",
t.del_black+="&source=2"):"/cgi-bin/user_tag"==window.location.pathname?(t.add_black+="&source=3",
t.del_black+="&source=3"):"/cgi-bin/message"==window.location.pathname&&(t.add_black+="&source=4",
t.del_black+="&source=4")),r.exports={
del_tag:function(e,a,r,i){
o.post({
mask:!1,
url:t.del,
data:{
user_openid:e,
groupid_list:a
}
},function(e){
if(!e||!e.base_resp)return void n.err("修改失败");
var a=1*e.base_resp.ret;
return 0!==a?void o.handleRet(e,{
id:64462,
key:74,
url:t.del,
msg:"修改失败"
}):(n.suc("修改成功"),"function"==typeof r&&r(e),void(i&&i.remove()));
});
},
add_tag:function(e,a,r,i,d){
o.post({
mask:!1,
url:t.add,
data:{
user_openid_list:e,
groupid_list:a,
cexpandcol:r
}
},function(e){
if(!e||!e.base_resp)return void n.err("修改失败");
var a=1*e.base_resp.ret;
return 0!==a?void o.handleRet(e,{
id:64462,
key:75,
url:t.add,
msg:"修改失败"
}):(n.suc("修改成功"),"function"==typeof i&&i(e),void(d&&d.remove()));
});
},
change_remark:function(e,a,r,i){
o.post({
mask:!1,
url:t.remark,
data:{
user_openid:e,
mark_name:a
}
},function(e){
if(!e||!e.base_resp)return void n.err("修改失败");
var a=1*e.base_resp.ret;
return 0!==a?void o.handleRet(e,{
id:64462,
key:76,
url:t.remark,
msg:"修改失败"
}):(n.suc("修改成功"),"function"==typeof r&&r(e),void(i&&i.remove()));
});
},
getBuddyInfo:function(e,a){
o.post({
mask:!1,
url:t.getBuddy,
data:{
lang:wx.cgiData.lang||"zh_CN",
user_openid:e
}
},function(r){
"function"==typeof a&&a(r,e),r&&r.base_resp&&r.base_resp.ret&&o.handleRet(r,{
id:64462,
key:77,
url:t.getBuddy,
showMsg:!1
});
});
},
add_black:function(e,a,r,i,d){
var s={
user_openid_list:e
};
d&&(s=$.extend(s,d)),console.log(s),r&&(s.is_harassment=1),o.post({
mask:!1,
url:t.add_black,
data:s
},function(e){
if(!e||!e.base_resp)return void n.err("加入黑名单失败");
var r=1*e.base_resp.ret;
return 0!==r?void o.handleRet(e,{
id:64462,
key:78,
url:t.add_black,
msg:"加入黑名单失败"
}):(n.suc("加入黑名单成功"),"function"==typeof a&&a(e),void(i&&i.remove()));
});
},
del_black:function(e,a,r){
o.post({
mask:!1,
url:t.del_black,
data:{
user_openid_list:e
}
},function(e){
if(!e||!e.base_resp)return void n.err("移除黑名单失败");
var i=1*e.base_resp.ret;
return 0!==i?void o.handleRet(e,{
id:64462,
key:79,
url:t.del_black,
msg:"移除黑名单失败"
}):(n.suc("移除黑名单成功"),"function"==typeof a&&a(e),void(r&&r.remove()));
});
}
};
});