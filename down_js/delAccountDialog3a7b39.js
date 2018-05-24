define("setting/delAccountDialog.js",["common/wx/popup.js","biz_common/jquery.validate.js","common/wx/Step.js","common/wx/Cgi.js","common/wx/qrcheck.js","common/wx/Tips.js","setting/tpl/delAccountDialog.html.js","biz_common/moment.js","common/wx/region.js","register/data_bank_city.js","biz_web/ui/dropdown.js"],function(e){
"use strict";
e("common/wx/popup.js"),e("biz_common/jquery.validate.js");
var s=e("common/wx/Step.js"),i=e("common/wx/Cgi.js"),n=e("common/wx/qrcheck.js"),t=e("common/wx/Tips.js"),a=e("setting/tpl/delAccountDialog.html.js"),l=e("biz_common/moment.js"),o=(e("common/wx/region.js"),
e("register/data_bank_city.js")),d=e("biz_web/ui/dropdown.js"),f=function(e){
this.self={
dialog:null,
stepBar:null,
Scanner:null,
btns:[],
type:0,
step:1
},this._hasSubmit=!1,this._hasSelectBankName=!1,this.init(e);
};
return f.prototype._getStepBarNames=function(e){
var s=["1 同意协议"];
return 0!=e?s.push("2 主体验证","3 小额打款"):s.push("2 主体验证"),s;
},f.prototype.next=function(){
var e=this;
if(0==this.self.type)this.self.step=2,this.self.stepBar.setStep(2),this.self.dialog.find(".js_step_1").hide(),
this.self.btns.eq(0).hide(),this.self.btns.eq(1).hide(),this.self.dialog.find(".js_step_person").show(),
this.self.btns.eq(2).show(),this.self.Scanner||(this.self.Scanner=new n({
container:e.self.dialog.find(".js_scanner"),
cgiURI:"/acct/slaveqrcheckoper",
scene:15,
size:200,
idCard:null,
name:null,
extra:{},
renderData:{
name:"",
name_title:""
},
askSpeed:5,
askMaxNum:60,
onTicketChange:function(s){
e.self.dialog.find("#js_input_qrcheck_ticket").val(s);
},
onStatusChange:function(s){
e.self.dialog.find("#js_input_qrcheck_status").val(s),1==s&&i.post({
url:"/cgi-bin/acctclose?action=confirm",
data:{
qrcheck_ticket:e.self.dialog.find("#js_input_qrcheck_ticket").val()
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?window.location.href=wx.url("/cgi-bin/acctclose?action=page"):t.err("系统错误，请稍后重试");
});
},
onTipsChange:function(s,i){
var n;
return n="0"==s||"1"==s?template.render("tpl_qrcheck_tips_"+s,{}):wx.T(e.self.dialog.find(".js_scanner").find(".js_qrcheck_ret_"+s).show()[0].outerHTML,i);
}
})),this.self.Scanner.updateUser(null,null);else if(1!=this.self.step||this._hasSubmit){
if(1==this.self.step&&this._hasSubmit)this.self.step=3,this.self.stepBar.setStep(3),
this.self.dialog.find(".js_step_1").hide(),this.self.dialog.find(".js_step_other_3").show(),
this.self.btns.eq(0).hide(),this.self.btns.eq(1).hide(),this.self.btns.eq(2).hide(),
this.self.btns.eq(3).show(),this.self.btns.eq(4).hide();else if(2==this.self.step){
if(0==this.self.dialog.find("form").valid())return!1;
var s=this.self.dialog.find("form").serializeObject();
e.self.btns.eq(4).btn(!1),e.self.btns.eq(4).removeClass("btn_primary").addClass("btn_disabled"),
i.post({
url:"/cgi-bin/acctclose?action=remitverify",
data:{
bank_acct_num:s.bank_acct_num,
bank_province:s.bank_province,
bank_city:s.bank_city,
bank_name:s.bank_name
}
},function(s){
if(s&&s.base_resp&&0==s.base_resp.ret){
e._hasSubmit=!0;
var i=s.remit_info;
i.money=i.money/100,e.self.dialog.find(".js_money").html("&yen;"+i.money),e.self.dialog.find(".js_code").html(i.remit_bank_no+"&nbsp;"+i.remit_code),
e.self.dialog.find(".js_date").text(l.unix(i.deadline).format("YYYY年MM月DD日")),e.self.dialog.find(".js_step_other_3").show(),
e.self.step=3,e.self.stepBar.setStep(3),e.self.dialog.find(".js_step_other_2").hide(),
e.self.btns.eq(0).hide(),e.self.btns.eq(1).hide(),e.self.btns.eq(2).hide(),e.self.btns.eq(3).show(),
e.self.btns.eq(4).hide();
}else t.err("系统错误，请稍后重试");
e.self.btns.eq(4).btn(!0),e.self.btns.eq(4).addClass("btn_primary").removeClass("btn_disabled");
});
}
}else this.self.step=2,this.self.stepBar.setStep(2),this.self.dialog.find(".js_step_1").hide(),
this.self.btns.eq(0).hide(),this.self.btns.eq(1).hide(),this.self.dialog.find(".js_step_other_2").show(),
this.self.btns.eq(2).show(),this.self.btns.eq(4).show(),!e.self.dropdownProvince&&(e.self.dropdownProvince=new d({
container:e.self.dialog.find("#js_div_bank_province"),
labal:"省份",
data:o.province,
callback:function(s){
e.self.dialog.find("#js_input_bank_province").val(s),e.self.dialog.find("#js_input_bank_province").valid(),
e.self.dialog.find("#js_input_bank_city").val(""),e.self.dropdownCity&&e.self.dropdownCity.destroy(),
e.self.dropdownCity=new d({
container:e.self.dialog.find("#js_div_bank_city"),
label:"城市",
data:o.city[s],
callback:function(s){
e.self.dialog.find("#js_input_bank_city").val(s),e.self.dialog.find("#js_input_bank_city").valid();
}
});
}
})),!e.self.dropdownBank&&(e.self.dropdownBank=new d({
container:e.self.dialog.find("#js_div_bank_name"),
label:"请选择开户银行",
data:[{
name:"中国工商银行",
value:"中国工商银行"
},{
name:"其他银行",
value:""
}],
callback:function(s){
e._hasSelectBankName=!0,e.self.dialog.find("#js_input_bank_name").val(s),e.self.dialog.find("#js_input_bank_name").valid();
}
}));
},f.prototype.prev=function(){
this.self.step=1,this.self.stepBar.setStep(1),this.self.dialog.find(".js_step_1").show(),
0==this.self.type?this.self.dialog.find(".js_step_person").hide():this.self.dialog.find(".js_step_other_2").hide(),
this.self.btns.eq(0).show(),this.self.btns.eq(1).show(),this.self.btns.eq(2).hide(),
this.self.btns.eq(3).hide(),this.self.btns.eq(4).hide();
},f.prototype.init=function(e){
this.self.type=e.type,this.self.principal_name=e.principal_name||"";
var i=this;
return $(wx.T(a,{
principal_name:this.self.principal_name
})).popup({
title:"注销帐号",
className:"align_edge",
width:800,
buttons:[{
text:"同意并下一步",
type:"primary",
click:function(){
i.next();
}
},{
text:"取消",
type:"default",
click:function(){
i.destroy(),this.remove();
}
},{
text:"上一步",
type:"default",
click:function(){
i.prev();
}
},{
text:"关闭",
type:"primary",
click:function(){
i.destroy(),this.remove();
}
},{
text:"下一步",
type:"primary",
click:function(){
i.next();
}
}],
onShow:function(){
i.self.dialog=this.$dialogWrp,i.self.stepBar=new s({
container:i.self.dialog.find(".js_step_bar"),
selected:1,
names:i._getStepBarNames(i.self.type)
}),i.self.btns=this.get().find(".js_btn_p"),i.self.btns.eq(2).hide(),i.self.btns.eq(3).hide(),
i.self.btns.eq(4).hide(),i.self.dialog.find(".js_step_1").show(),this.resetPosition(),
i.self.dialog.find("form").validate({
ignore:{},
errorPlacement:function(e,s){
var i=s.parent().parent();
i.find(".fail").remove(),i.append(e);
}
}),$.validator.addMethod("bank_name",function(e){
return i._hasSelectBankName?!0:e.length>0?!0:!1;
}),i.self.dialog.find("form").find('input[name="bank_acct_num"]').rules("add",{
required:!0,
number:!0,
rangelength:[2,35],
messages:{
required:"请输入对公账户",
number:"对公账户应为数字",
rangelength:$.validator.format("对公账户为{0}到{1}个数字")
}
}),i.self.dialog.find("form").find('input[name="bank_acct_num_confirm"]').rules("add",{
required:!0,
equalTo:{
param:i.self.dialog.find("form").find('input[name="bank_acct_num"]'),
depends:function(){
return!0;
}
},
messages:{
required:"请再次输入对公账户",
equalTo:"两次对公账户号码不一致"
}
}),i.self.dialog.find("form").find('input[name="bank_province"]').rules("add",{
required:!0,
messages:{
required:"请选择开户地点"
}
}),i.self.dialog.find("form").find('input[name="bank_city"]').rules("add",{
required:!0,
messages:{
required:"请选择开户地点"
}
}),i.self.dialog.find("form").find('input[name="bank_name"]').rules("add",{
bank_name:!0,
messages:{
bank_name:"请选择开户银行"
}
});
},
onHide:function(){
i.destroy(),this.remove();
}
}),this;
},f.prototype.destroy=function(){
this.self.Scanner&&this.self.Scanner.destroy(),this.self.dialog=null,this.self.stepBar=null,
this.self.Scanner=null;
},f;
});