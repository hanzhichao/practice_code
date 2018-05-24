define("cardticket/member_manage/member_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(r){
"use strict";
var e={
get_detail:"/merchant/membercardmgr?action=user_detail&f=json",
mod_remark:"/merchant/membercardmgr?action=set_remark&f=json",
add_user_tag:"/merchant/membercardmgr?action=add_user_tag&f=json",
batch_add_users_tags:"/merchant/membercardmgr?action=batch_add_users_tags&f=json",
batch_modify_users_tags:"/merchant/membercardmgr?action=modify_user_tags&f=json",
drop_user_tag:"/merchant/membercardmgr?action=drop_user_tag&f=json",
add_card_tag:"/merchant/membercardmgr?action=add_card_tag&f=json",
drop_card_tag:"/merchant/membercardmgr?action=drop_card_tag&f=json",
rename_card_tag:"/merchant/membercardmgr?action=rename_card_tag&f=json"
},a=r("common/wx/Tips.js"),t=r("common/wx/Cgi.js"),s=function(r,e,a,s,n,c){
t[r]({
url:e,
data:a,
error:function(){
n&&n();
},
complete:function(){
c&&c();
}
},function(r){
return r&&r.base_resp&&0==r.base_resp.ret?void(s&&s(r)):(n&&n(r),void t.handleRet(r,{
id:64463,
key:32,
url:e,
showMsg:!1
}));
});
};
return{
getDetail:function(r,t,n){
s("get",e.get_detail,r,t,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){
default:
a.err("系统繁忙，请稍后重试");
}
n&&n(r);
});
},
renameTag:function(r,a,t,n){
var c=r.tag_id?e.rename_card_tag:e.add_card_tag;
s("post",c,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
delTag:function(r,a,t,n){
s("post",e.drop_card_tag,{
tag_id:r
},a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
modRemark:function(r,a,t,n){
s("post",e.mod_remark,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
addUserTag:function(r,a,t,n){
s("post",e.add_user_tag,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
delUserTag:function(r,a,t,n){
s("post",e.drop_user_tag,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
batchAddUsersTags:function(r,a,t,n){
s("post",e.batch_add_users_tags,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
},
batchModifyUsersTags:function(r,a,t,n){
s("post",e.batch_modify_users_tags,r,a,function(r){
var e=r.base_resp.ret;
switch(r.ret=e,e){}
t&&t(r);
},n);
}
};
});