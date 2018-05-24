define("err/user_err_tmpl.js",["biz_common/moment.js"],function(e){
"use strict";
var r=e("biz_common/moment.js");
template.helper("datestring",function(e){
return r.unix(e).format("YYYY-M-D");
}),template.helper("moneytrans",function(e){
var r=e/100;
return r+"元";
});
var t=wx.cgiData.remit_verify_data;
if(console.log(t),t){
if(t.fail_result=0,t.is_timeout=0,4==t.verify_result)t.is_timeout=1;else if(2==t.verify_result){
var _=t.remit_record_list.length-1,i=t.remit_record_list[_].diff_flag;
0!=(1&i)?t.fail_result=1:0!=(2&i)?t.fail_result=2:0!=(4&i)&&(t.fail_result=3),t.last_money=t.remit_record_list[_].money,
t.last_bank_acct_name=t.remit_record_list[_].bank_acct_name,t.last_bank_acct_num=t.remit_record_list[_].bank_acct_num;
}
var a=template.render("user_remit_err",t);
$("#js_user_remit_err").html(a);
}
});