define("shop/express.js",["biz_common/jquery.validate.js"],function(t,n,e){
"use strict";
t("biz_common/jquery.validate.js");
$.validator.addMethod("expressCompany",function(t,n){
var e=$(n).attr("id").split("_")[1];
return""==$("#deliveryCompanyInput_"+e).val()?!1:!0;
},"请先选择一个物流公司"),$.validator.addMethod("expressCompanyName",function(t,n){
var e=$(n).attr("id").split("_")[1];
return $("#deliveryForm_"+e).find(".js_companyName").is(":hidden")?!0:""!==$(n).val();
},"请填写物流公司名称"),$.validator.addMethod("express",function(t,n){
var e=$(n).attr("id").split("_")[1],r=$("#deliveryCompanyInput_"+e).val();
switch(t=$.trim(t)+"",r){
case"Fsearch_code":
return/^\w{2}\d{9}\w{2}$/.test(t);

case"002shentong":
return""!=t;

case"066zhongtong":
return!(!t||11!=t.length&&12!=t.length);

case"056yuantong":
return""!=t;

case"042tiantian":
return""!=t;

case"003shunfeng":
return/^\d{12}$/.test(t);

case"059Yunda":
return/^\d{13}$/.test(t);

case"064zhaijisong":
return/^\d{2}\w{1}\d*$/.test(t);

case"020huitong":
return/^(([ABCDEH0][DX0-9][A0-9]\d{10})|([23]\d{11}))$/.test(t);

case"zj001yixun":
return""!=t;

default:
return""!=t;
}
return!0;
},"请填写正确的运单号"),$.validator.addMethod("multipleExpressCompany",function(t,n){
var e=$(n).attr("id").split("_")[1];
return""==$("#multipleDeliveryCompanyInput_"+e).val()?!1:!0;
},"请先选择一个物流公司"),$.validator.addMethod("multipleExpress",function(t,n){
var e=$(n).attr("id").split("_")[1],r=$("#multipleDeliveryCompanyInput_"+e).val();
switch(t=$.trim(t)+"",r){
case"Fsearch_code":
return/^\w{2}\d{9}\w{2}$/.test(t);

case"002shentong":
return""!=t;

case"066zhongtong":
return/^((618|680|778|768|688|828|988|118|888|571|518|10|628|205|880|717|718|728|738|762|763|701|757|761)\d{9})|((2008|2010|8050|7518)\d{8})$/.test(t);

case"056yuantong":
return""!=t;

case"042tiantian":
return/^\d{14}$/.test(t);

case"003shunfeng":
return/^\d{12}$/.test(t);

case"059Yunda":
return/^\d{13}$/.test(t);

case"064zhaijisong":
return/^\d{2}\w{1}\d*$/.test(t);

case"020huitong":
return/^([ABCDEH0][DX0-9][A0-9]\d{10})|([23]\d{11})$/.test(t);

case"zj001yixun":
return""!=t;
}
return!0;
},"请填写正确的运单号"),e.exports=[{
code:"YZTKZD",
contact:"",
id:"Fsearch_code",
name:"邮政EMS",
pinyin:"youzhengguoji",
supportQuery:"0",
url:"http://www.ems.com.cn/"
},{
code:"申通;申通快递",
contact:"40088-95543",
id:"002shentong",
name:"申通快递",
pinyin:"Shentong",
supportQuery:"0",
url:"http://www.sto.cn"
},{
code:"中通;中通速递",
contact:"4008-270-270",
id:"066zhongtong",
name:"中通速递",
pinyin:"zhongtong",
supportQuery:"1",
url:"http://www.zto.cn/"
},{
code:"圆通;圆通速递",
contact:"021-69777888/999",
id:"056yuantong",
name:"圆通速递",
pinyin:"yuantong",
supportQuery:"1",
url:"http://www.yto.net.cn/"
},{
code:"天天;天天快递",
contact:"4007-160-170",
id:"042tiantian",
name:"天天快递",
pinyin:"tiantian",
supportQuery:"1",
url:"http://www.ttkdex.com/"
},{
code:"顺风;顺丰;顺风快递;顺丰快递;顺丰速运;顺风速运",
contact:"4008-111-111",
id:"003shunfeng",
name:"顺丰速运",
pinyin:"shunfeng",
supportQuery:"1",
url:"http://www.sf-express.com"
},{
code:"韵达;韵达快运",
contact:"021-39207888",
id:"059Yunda",
name:"韵达快运",
pinyin:"Yunda",
supportQuery:"1",
url:"http://www.yundaex.com/"
},{
code:"宅急送",
contact:"400-6789-000",
id:"064zhaijisong",
name:"宅急送",
pinyin:"zhaijisong",
supportQuery:"1",
url:"http://www.zjs.com.cn/"
},{
code:"PY",
contact:"",
id:"Fsearch_code",
name:"平邮",
pinyin:"pingyou",
supportQuery:"0",
url:"http://yjcx.chinapost.com.cn/"
},{
code:"汇通;汇通快运",
contact:"021-62963636",
id:"020huitong",
name:"汇通快运",
pinyin:"huitongkuaidi",
supportQuery:"1",
url:"http://www.htky365.com/ "
},{
code:"易迅",
contact:"400-828-6699",
id:"zj001yixun",
name:"易迅快递",
pinyin:"icson",
supportQuery:"1",
url:"http://sz.icson.com/"
}];
});