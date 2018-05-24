define("mall/template_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),r=e("common/wx/Tips.js"),n={};
n={
create:wx.url("/store/template/create"),
getlist:wx.url("/store/templates/get"),
update:wx.url("/store/template/update"),
"delete":wx.url("/store/template/delete")
};
var o={
save:function(e,o,c){
var i=n.create,s="创建";
e.id&&(i=n.update,s="更新"),t.post({
url:i,
data:e,
error:function(){
c&&c(e);
}
},function(e){
e&&0==e.err_code?(r.suc("%s成功！".sprintf(s)),o&&o(e)):(r.err("%s失败！".sprintf(s)),
c&&c(e));
});
},
getlist:function(e,o,c){
t.get({
url:n.getlist,
data:{
begin:e.begin||0,
count:e.count||10
},
error:function(){
c&&c();
}
},function(e){
e&&0==e.err_code?o&&o(e):(r.err("获取列表失败"),c&&c(e));
});
},
del:function(e,o,c){
t.post({
url:n["delete"],
data:{
id:e
},
error:function(){
c&&c();
}
},function(e){
e&&0==e.err_code?(r.suc("删除成功"),o&&o(e)):(r.err("删除失败"),c&&c(e));
});
}
};
return o;
});