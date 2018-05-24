define("user/unbind_user.js",["common/wx/Cgi.js","common/wx/Tips.js","user/common_template_helper.js","biz_web/lib/json.js","common/wx/stopMultiRequest.js"],function(o){
"use strict";
function e(o){
var e=o.openid,n=o.type,u=(o.nick_name,t[n]),a=o.workid,c=m.UNBIND_TEST_USER;
3==n?c=m.UNBIND_DEV_USER:5==n&&(c=47);
var r="/misc/wxaadmin?action=save_auth",p={
openid:e,
type:n,
workid:a
};
5==n?r="/misc/wxopenkf?action=del":4==n&&(p={
auth_list:JSON.stringify({
items:[{
authority:0,
openid:e
}]
})
}),s.post({
url:r,
data:p
},{
done:function(o){
0==o.base_resp.ret?(i.suc("解绑"+u+"成功"),location.reload()):s.show(o);
},
fail:function(o){
console.log(o);
}
});
}
var s=o("common/wx/Cgi.js"),i=o("common/wx/Tips.js"),n=o("user/common_template_helper.js"),t=n.user_type_map,m=n.AuthTypes;
return o("biz_web/lib/json.js"),o("common/wx/stopMultiRequest.js"),e;
});