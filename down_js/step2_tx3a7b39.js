define("wbverify/step2_tx.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(o,c,n){
"use strict";
var s=o("common/wx/Tips.js"),t=o("common/wx/Cgi.js");
n.exports=function(o){
$("#js_shareToTencentMicroblog").click(function(){
s.suc("正在分享到微博，请稍后..."),t.post({
url:"/acct/connectwb?t=ajax-response",
data:{
type:"txadd"
},
mask:!1,
error:function(){
s.err("分享失败，请稍后重试。");
}
},function(c){
"0"==c.ret?(s.suc("分享成功"),o(3)):s.err("分享失败，请稍后重试。");
});
});
};
});