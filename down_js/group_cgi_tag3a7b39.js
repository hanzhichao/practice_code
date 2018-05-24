define("user/group_cgi_tag.js",["common/wx/Cgi.js","biz_web/lib/json.js","common/wx/Tips.js"],function(e,i,t){
"use strict";
var r=e("common/wx/Cgi.js"),n=(e("biz_web/lib/json.js"),e("common/wx/Tips.js"));
t.exports={
add:function(e,i,t,a){
r.post({
url:"/cgi-bin/user_tag",
data:{
action:"create_group",
group_name:e
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("添加失败");
var s=1*e.base_resp.ret;
switch(s){
case 0:
"function"==typeof i&&i(e);
break;

case 213001:
var o=t.$pop.find(".js_tips, .js_tag_putOn_tips");
return o.text("该标签名字已存在，请重新输入").show(),t.$pop.find(".js_tag_putOn_add_input").enable(),
void t.$pop.find(".jsPopoverBt:eq(0)").btn(!0);

default:
r.handleRet(e,{
id:64462,
key:63,
url:"/cgi-bin/user_tag?action=create_group",
msg:"添加失败"
});
}
t&&!a&&t.remove();
});
},
rename:function(e,i,t,a){
r.post({
url:"/cgi-bin/user_tag",
data:{
action:"rename_group",
groupid:e,
group_name:i
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("修改失败");
var i=e.base_resp.ret;
switch(i){
case 0:
n.suc("修改成功"),"function"==typeof t&&t(e);
break;

case 213001:
var s=a.$pop.find(".js_tips");
return s.text("该标签名字已存在，请重新输入").show(),void a.$pop.find(".jsPopoverBt:eq(0)").btn(!0);

default:
r.handleRet(e,{
id:64462,
key:64,
url:"/cgi-bin/user_tag?action=rename_group",
msg:"修改失败"
});
}
a&&!a.$pop.hasClass("js_putOn")&&a.remove();
});
},
del:function(e,i,t){
r.post({
url:"/cgi-bin/user_tag",
data:{
action:"del_group",
groupid:e
},
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("删除失败");
var a=e.base_resp.ret;
0==a?(n.suc("删除成功"),"function"==typeof i&&i(e)):r.handleRet(e,{
id:64462,
key:65,
url:"/cgi-bin/user_tag?action=del_group",
msg:"删除失败"
}),t&&t.remove();
});
},
get_user:function(e,i){
var t={
limit:20,
offset:0,
backfoward:1
};
if(e=$.extend(t,e),-1==e.groupid){
var a="/cgi-bin/user_tag?action=get_black_list&limit="+e.limit+"&offset="+e.offset+"&backfoward="+e.backfoward;
e.begin_openid&&e.begin_create_time&&(a+="&begin_openid="+e.begin_openid+"&begin_create_time="+e.begin_create_time),
r.get({
url:a,
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("获取用户列表失败");
var t=e.base_resp.ret;
0==t?"function"==typeof i&&i(e):r.handleRet(e,{
id:64462,
key:66,
url:"/cgi-bin/user_tag?action=get_black_list",
msg:"获取用户列表失败"
});
});
}else e=$.extend({
begin_openid:-1,
begin_create_time:-1
},e),r.get({
url:"/cgi-bin/user_tag?action=get_user_list&groupid="+e.groupid+"&begin_openid="+e.begin_openid+"&begin_create_time="+e.begin_create_time+"&limit="+e.limit+"&offset="+e.offset+"&backfoward="+e.backfoward,
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("获取用户列表失败");
var t=e.base_resp.ret;
0==t?"function"==typeof i&&i(e):r.handleRet(e,{
id:64462,
key:67,
url:"/cgi-bin/user_tag?action=get_user_list",
msg:"获取用户列表失败"
});
});
},
search:function(e,i){
var t={
pagesize:20,
pageidx:0
};
e=$.extend(t,e),r.post({
url:"/cgi-bin/user_tag?action=search",
data:e,
mask:!1
},function(e){
if(!e||!e.base_resp)return void n.err("系统错误，请稍后重试");
var t=e.base_resp.ret;
0==t?"function"==typeof i&&i(e):r.handleRet(e,{
id:64462,
key:68,
url:"/cgi-bin/user_tag?action=search",
msg:"系统错误，请稍后重试"
});
});
}
};
});