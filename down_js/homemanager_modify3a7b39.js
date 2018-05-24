define("wifi/homemanager_modify.js",["common/wx/Tips.js","common/wx/Cgi.js","wifi/top.js","wifi/homemanager_modify/welcome.js","wifi/homemanager_modify/color.js","wifi/homemanager_modify/cells.js","wifi/homemanager_modify/appmsg.js"],function(i){
"use strict";
var o=i("common/wx/Tips.js"),e=i("common/wx/Cgi.js");
i("wifi/top.js");
var n=function(n){
function a(){
g.push(f),g.push(r),g.push(c),g.push(u);
}
function s(){
$.each(g,function(i,o){
o.init();
});
}
function m(){
$(".js_submit").click(function(){
$(this).btn(!1);
for(var i={},a=0;a<g.length;a++){
var s=g[a].getData();
if(!s.status.success)return o.err(s.status.msg),!1;
i=$.extend(!0,{},i,s.data);
}
console.log(i),e.post({
url:"/wifi/wifihomemanager?pluginuin=10034&action=modify",
data:{
poi_key:n.poiKey,
barpage:JSON.stringify(i)
}
},function(i){
return i&&i.base_resp&&0==i.base_resp.ret?(o.suc("修改成功"),void setTimeout(function(){
location.href=wx.url("/wifi/wifihomemanager?pluginuin=10034&action=list&page_idx=1&page_size=10");
},500)):void o.err("系统错误，请稍后重试");
});
});
}
function t(){
a(),s(),m();
}
var f=i("wifi/homemanager_modify/welcome.js"),r=i("wifi/homemanager_modify/color.js"),c=i("wifi/homemanager_modify/cells.js"),u=i("wifi/homemanager_modify/appmsg.js"),g=[];
return{
init:t
};
}(wx.cgiData);
n.init();
});