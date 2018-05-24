define("material/material_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var t={
getSingleList:"/merchant/ad_material?action=get_material_list_json&f=json",
del:"/merchant/ad_material?action=delete_material&f=json",
create:"/merchant/ad_material?action=create_material&f=json",
update:"/merchant/ad_material?action=update_material&f=json"
},a=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),n=function(e,t,n,r,o){
i[e]({
url:t,
data:n,
error:function(){
o&&o();
}
},function(e){
if(e&&e.base_resp){
var t=e.base_resp.ret;
return 0==t&&r&&r(e),void(200003==t&&a.err("登录态超时，请重新登录。"));
}
o&&o(e);
});
};
return{
del:function(e,a,i){
n("post",t.del,e,a,i);
},
edit:function(e,a,i){
var r=t.create;
e.id&&(r=t.update),n("post",r,e,a,i);
},
getSingleList:function(e,i,r,o){
n("get",t.getSingleList,{
begin:i,
count:r
},o,function(){
a.err("获取列表失败");
});
}
};
});