define("bizpage/cgi.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),r=e("common/wx/Tips.js"),a={};
a={
get:wx.url("/advanced/homepage?action=get"),
create:wx.url("/advanced/homepage?action=create"),
getlist:wx.url("/advanced/homepage?action=getlist"),
update:wx.url("/advanced/homepage?action=update"),
"delete":wx.url("/advanced/homepage?action=delete")
};
var n={
save:function(e,n,o){
var s=a.create,c="创建";
e.id&&(s=a.update,c="更新"),t.post({
url:s,
data:e,
error:function(){
o&&o(e);
}
},function(e){
var t=e.ret||e&&e.base_resp&&e.base_resp.ret;
e&&!t?(r.suc("%s成功！".sprintf(c)),n&&n(e)):(r.err("%s失败！".sprintf(c)),o&&o(e));
});
},
get:function(e,n,o){
t.get({
url:a.get,
data:e,
error:function(){
o&&o();
}
},function(e){
var t=e.ret||e&&e.base_resp&&e.base_resp.ret;
e&&!t?n&&n(e):(r.err("获取失败"),o&&o(e));
});
},
getlist:function(e,n,o){
t.get({
url:a.getlist,
data:{
begin:e.begin||0,
count:e.count||10
},
error:function(){
o&&o();
}
},function(e){
var t=e.ret||e&&e.base_resp&&e.base_resp.ret;
e&&!t?n&&n(e):(r.err("获取列表失败"),o&&o(e));
});
},
del:function(e,n,o){
t.post({
url:a["delete"],
data:{
id:e
},
error:function(){
o&&o();
}
},function(e){
var t=e.ret||e&&e.base_resp&&e.base_resp.ret;
e&&!t?(r.suc("删除成功"),n&&n(e)):(r.err("删除失败"),o&&o(e));
});
}
};
return n;
});