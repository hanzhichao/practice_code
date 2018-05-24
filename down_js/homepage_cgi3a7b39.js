define("homepage/homepage_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var a={
create:"/advanced/homepage?action=create&f=json",
update:"/advanced/homepage?action=update&f=json",
del:"/advanced/homepage?action=del&f=json"
},n=e("common/wx/Tips.js"),o=e("common/wx/Cgi.js"),t=function(e,a,n,t,r){
o[e]({
url:a,
data:n,
error:function(){
r&&r();
}
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?void(t&&t(e)):void(r&&r(e));
});
};
return{
edit:function(e,o,r){
var c=a.create;
e.hid&&(c=a.update),t("post",c,e,function(e){
n.suc("保存成功"),o&&o(e);
},function(e){
var a=e.base_resp.ret;
switch(e.ret=a,a){
case 200071:
n.err("最多只能创建15个主页，请删除其它主页后再保存");
break;

default:
n.err("系统繁忙，请稍后重试");
}
r&&r(e);
});
},
del:function(e,n,o){
var r=a.del;
t("post",r,e,n,o);
}
};
});