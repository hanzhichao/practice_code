define("original/SearchAppId.js",["common/wx/Cgi.js","original/tpl/SearchAppId.html.js"],function(t){
"use strict";
function e(t){
var e=this;
e.opt=$.extend(!0,{},n,t);
var o=e.opt.dom;
o.html(template.compile(a)({
loading_img:e.opt.loading_img,
list:e.opt.search_history
}));
{
var s=!1,r=o.find(".js_keyword"),c=o.find(".js_search_loading"),d=o.find(".js_search"),p=o.find(".js_no_user"),h=o.find(".js_search_result");
o.find(".js_btn_p").eq(0);
}
o.find("a").on("click",function(){
var t=$(this),e=t.data("gh");
return e?(r.val(e),void d.click()):!1;
}),d.click(function(){
if(s)return!1;
p.removeClass("red").hide();
var t=r.val().trim();
if(!t)return p.text("请输入后进行搜索").show(),void r.focus();
h.hide(),s=!0,c.show();
var a={
action:"searchacct",
username:t
};
for(var n in e.opt.postData)e.opt.postData.hasOwnProperty(n)&&(a[n]=e.opt.postData[n]);
i.post({
url:"/cgi-bin/appmsgcopyright",
data:a,
complete:function(){
s=!1;
}
},function(a){
c.hide(),a.base_resp&&"undefined"!=typeof a.base_resp.ret||p.text("系统错误，请稍候再试").show();
var n=+a.base_resp.ret,o=+a.status;
switch(n){
case 0:
if([0,2,3].indexOf(o)>-1){
h.show();
var s=a.pic_url||"";
s=s?s.endsWith("/0")?s:s+"/0":"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",
h.find("img").attr("src",s),a.nickname=a.nickname||"",h.find(".js_nickname").text(a.nickname),
0==o?e.opt.done({
username:t
}):2==o?p.text("该公众号已在转载帐号中，无需重复添加").addClass("red").show():3==o&&p.text("无法添加自己为转载帐号").addClass("red").show();
}else 1==o?p.text("无法找到该公众号，请检查你填写的帐号是否正确。").show():p.text("系统错误，请稍候再试").show();
break;

case 200013:
p.text("操作频繁，请稍后重试").show();
break;

default:
p.text("系统错误，请稍候再试").show(),i.handleRet(a,{
id:64462,
key:39,
url:"/cgi-bin/appmsgcopyright?action=searchacct"
});
}
(0!=n||0!=o)&&e.opt.bad();
});
}),r.on("keyup",function(t){
wx.isHotkey(t,"enter")&&d.click();
}).on("change",function(){
d.click();
}).focus();
}
var i=t("common/wx/Cgi.js"),a=t("original/tpl/SearchAppId.html.js"),n={
dom:null,
postData:{},
loading_img:"",
done:$.noop,
bad:$.noop
};
return e;
});