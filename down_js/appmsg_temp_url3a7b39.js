define("media/appmsg_temp_url.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),e=i("common/wx/Tips.js");
return function(i,a,n){
n=n||"/cgi-bin/appmsg?action=get_temp_url",$(i).on("click",a,function(i){
var a=$(this),r=a.attr("href"),s=a.find("a").attr("href");
if(!(r&&0!=r.indexOf("javascript:")||s&&0!=s.indexOf("javascript:"))){
i.preventDefault();
var o=window.open();
t.get({
url:n,
data:{
appmsgid:$(this).data("msgid"),
itemidx:$(this).data("idx")+1
}
},function(i){
i.base_resp&&0==i.base_resp.ret?o&&o.location&&(o.location.href=i.temp_url):(o.close(),
e.err("生成临时链接失败，请重试"));
});
}
});
};
});