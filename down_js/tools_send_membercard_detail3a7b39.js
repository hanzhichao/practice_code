define("cardticket/tools_send_membercard_detail.js",["common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/dialog.js","biz_common/moment.js","cardticket/topmenu.js","cardticket/tools/tools_cgi.js"],function(t){
"use strict";
var e=(t("common/wx/Cgi.js"),t("common/wx/pagebar.js"),t("common/wx/Tips.js")),o=t("common/wx/dialog.js"),c=t("biz_common/moment.js");
t("cardticket/topmenu.js").selected("cardsend");
var n=t("cardticket/tools/tools_cgi.js"),i=function(t){
function i(){
$(".js_create_time").text(c(1e3*t.create_time).format("YYYY-MM-DD HH:mm")),$(".js_begin_end_time").text(c(1e3*t.begin_time).format("YYYY-MM-DD")+"至"+c(1e3*t.end_time).format("YYYY-MM-DD")),
$(".js_least_cost_num").text(t.least_cost/100),$(".js_remove").click(function(){
o.show({
title:"删除规则",
msg:"删除规则|确定要删除这条规则？",
type:"warn",
buttons:[{
text:"确定",
type:"normal",
click:function(){
var o=this.dom.find(".js_btn:eq(0)");
o.btn(!1),n.deleteRule({
rule_id:t.rule_id,
type:1,
success:function(){
e.suc("删除成功"),setTimeout(function(){
location.href=wx.url("/merchant/paygiftcard?action=authority&type=1");
},500);
},
error:function(){
e.err("删除失败");
},
complete:function(){
o.btn(!0);
}
});
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
}
return{
init:i
};
}(wx.cgiData);
i.init();
});