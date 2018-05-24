define("cardticket/tools/tools_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(e,t,c){
"use strict";
var r=e("common/wx/Cgi.js"),s=e("common/wx/Tips.js"),o=10,i={};
i.getRuleList=function(e){
r.get({
url:"/merchant/paygiftcard?action=list_rule",
data:{
effective:e.effective,
offset:(e.page-1)*o,
count:o,
type:e.type
}
},function(t){
t&&0==t.base_resp.ret?e.success&&e.success(t):e.error&&e.error(t),e.complete&&e.complete(t);
});
},i.deleteRule=function(e){
r.post({
url:"/merchant/paygiftcard?action=delete_rule",
data:{
rule_id:e.rule_id,
type:e.type
}
},function(t){
t&&0==t.base_resp.ret?e.success&&e.success(t):e.error&&e.error(t),e.complete&&e.complete(t);
});
},i.addMchid=function(e){
var t={
200009:"商户号不存在",
100010:"请输入本公众号下的正确商户号",
640021:"请输入本公众号下的正确商户号",
640022:"请输入本公众号下的正确商户号"
};
r.post({
url:"/merchant/paygiftcard?action=bind_mchid",
data:{
mchid:e.mchid
}
},function(c){
var r=c?c.base_resp.ret:-1;
0!=r?(s.err(t[r]||"系统错误，请稍后重试"),e.error&&e.error(c)):e.success&&e.success(c),e.complete&&e.complete(c);
});
},c.exports=i;
});