define("wxverify/validateExtend.js",["biz_common/jquery.validate.js","common/qq/prototype.js"],function(t){
"use strict";
var e=t("biz_common/jquery.validate.js"),a=e.rules,n=(t("common/qq/prototype.js"),
{
timeDelta:function(t){
var e=new Date;
return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate())-e)/1e3/24/3600);
},
newDate:function(t){
var e=t.split("-");
return new Date(e[0],parseInt(e[1],10)-1,e[2]);
}
});
$.validator.addMethod("rangelen",function(t,e,a){
t=$.trim(t)+"";
var n=a[0],d=a[1];
return t.len()>=n&&t.len()<=d;
},"字数必须在{0}到{1}之间"),$.validator.addMethod("trimemail",function(t,e,n){
return t=$.trim(t),this.optional(e)||a.email(t,n);
},"请输入正确的邮箱格式"),$.validator.addMethod("verifycode",function(t){
return t=$.trim(t),/^\d{6}$/.test(t);
},"验证码应为6位数字"),$.validator.addMethod("postcode",function(t){
return t=$.trim(t),/^\d{6}$/.test(t);
},"请输入正确的邮编格式"),$.validator.addMethod("orgcode",function(t){
return t=$.trim(t),/^[\d|A-Z]{8,8}-[\d|A-Z]{1,1}$/.test(t);
},"请输入正确的组织机构代码。示例：12345678-9。"),$.validator.addMethod("foundationdate",function(t){
var e;
return t=$.trim(t),e=!/^\d{4,4}-\d{2,2}-\d{2,2}$/.test(t)||n.timeDelta(n.newDate(t))>0,
!e;
},"成立日期有误，请重新填写"),$.validator.addMethod("deadline",function(t){
var e;
return t=$.trim(t),e=!$("#long_date").is(":checked")&&(!/^\d{4}-\d{2}-\d{2}$/.test(t)||n.timeDelta(n.newDate(t))<0),
!e;
},"营业期限已过，请重新填写"),$.validator.addMethod("nickname",function(t){
return t=$.trim(t),t.bytes()<=50;
},"公众号名称过长"),$.validator.addMethod("realname",function(t){
return t=$.trim(t),/^[\u4e00-\u9fa5]+$/.test(t)||/^[a-zA-Z][a-zA-Z\s]*$/.test(t);
},"人名只能是中文或者英文");
});