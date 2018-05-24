define("register/remitverify.js",["biz_common/moment.js","common/wx/Cgi.js","common/wx/Tips.js","common/qq/jquery.plugin/zclip.js"],function(e){
"use strict";
function t(){
var e=$("#js_div_main");
template.helper("datestring",function(e){
return r.unix(e).format("YYYY-MM-DD HH:mm:ss");
}),template.helper("moneytran",function(e){
return e/100;
}),e.html(template.render("tpl_verify_info",wx.cgiData.remit_verify_data)),$("#js_copy_account").zclip({
path:"/mpres/zh_CN/htmledition/plprecorder/biz_web/ZeroClipboard.swf",
copy:function(){
return $("#js_txt_bank_code").text();
},
afterCopy:function(){
a.suc("复制成功");
}
}),$("#js_btn_show_info_result").on("click",function(){
o.get({
url:location.href,
success:function(e){
if(0==e.base_resp.ret){
var t=e.remit_verify_data;
"string"==typeof t&&(t=$.parseJSON(t));
var _=t.verify_result;
_==s.VERIFY_RESULT_SUCC?location.href="/":_==s.VERIFY_RESULT_FAIL||_==s.VERIFY_RESULT_EXPIRED?location.reload():($("#js_div_info").hide(),
$("#js_div_info_result").show());
}else o.show(e);
}
});
}),$("#js_btn_show_info").on("click",function(){
$("#js_div_info").show(),$("#js_div_info_result").hide();
}),$("#js_btn_refresh_info").on("click",function(){
location.reload();
});
}
function _(){
template.helper("datestring",function(e){
return r.unix(e).format("YYYY-M-D");
}),template.helper("moneytrans",function(e){
var t=e/100;
return t+"元";
});
var e=wx.cgiData.remit_verify_data||{};
if(console.log(e),e){
if(e.fail_result=0,e.is_timeout=0,4==e.verify_result)e.is_timeout=1;else if(2==e.verify_result)for(var t=e.remit_record_list.length-1;t>=0;t--){
var _=e.remit_record_list[t];
if(_.verify_result==s.VERIFY_RESULT_FAIL){
var i=_.diff_flag;
0!=(1&i)?e.fail_result=1:0!=(2&i)?e.fail_result=2:0!=(4&i)&&(e.fail_result=3),e.last_money=_.money,
e.last_bank_acct_name=_.bank_acct_name,e.last_bank_acct_num=_.bank_acct_num;
break;
}
}
var n=template.render("tpl_fail",e);
$("#js_div_main").html(n);
}
}
function i(){
var e=wx.cgiData.remit_verify_data.verify_result;
console.log("verify_result:",e),e==s.VERIFY_RESULT_SUCC?location.href="/":e==s.VERIFY_RESULT_FAIL||e==s.VERIFY_RESULT_EXPIRED?_():t();
}
var r=e("biz_common/moment.js"),n=wx.cgiData.remit_verify_data,o=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js");
e("common/qq/jquery.plugin/zclip.js");
var s={
VERIFY_RESULT_NONE:0,
VERIFY_RESULT_PENDING:1,
VERIFY_RESULT_FAIL:2,
VERIFY_RESULT_SUCC:3,
VERIFY_RESULT_EXPIRED:4,
VERIFY_RESULT_IGNORE:5
};
n.is_from_org_realname_check=wx.cgiData.is_from_org_realname_check,i();
});