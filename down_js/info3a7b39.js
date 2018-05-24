define("shop_verify/info.js",["common/wx/Tips.js","biz_web/ui/checkbox.js","biz_web/ui/dropdown.js","common/wx/dialog.js","common/wx/Cgi.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var a=e("common/wx/Tips.js"),t=template.render,n=(e("biz_web/ui/checkbox.js"),e("biz_web/ui/dropdown.js")),r=e("common/wx/dialog.js"),c=e("common/wx/Cgi.js");
if(e("biz_common/jquery.validate.js"),"1"==wx.cgiData.is_new_account){
var i=$("#js_form_new");
i.find(".js_list").html(t("tpl_account",wx.cgiData));
var s=i.find("input").checkbox({
multi:!1
});
i.show();
var o=$("#js_submit");
o.on("click",function(){
if(!$(this).attr("disabled")){
o.btn(!1);
var e=s.values();
if(1==e.length){
var t={
mchid:e[0],
is_new_account:"1"
};
c.post({
url:"/merchant/merchantentrance",
data:t,
mask:!1
},{
done:function(e){
switch(e.base_resp.ret){
case 0:
a.suc("商户号已设置"),location.href=wx.url("/merchant/merchantentrance?action=updatepage");
break;

case 5:
r.show({
type:"warn",
msg:"警告|抱歉，您的商户号已经绑定了其他电商平台，不可以再申请小店",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),o.btn(!0);
break;

default:
a.err("系统繁忙，请稍后再试"),o.btn(!0);
}
},
fail:function(){
a.err("系统繁忙，请稍后再试"),o.btn(!0);
}
});
}else a.err("请选择要绑定的商户号"),o.btn(!0);
}
});
}else $("#js_form").show();
var u=new n({
container:"#js_type",
data:[{
name:"境内（使用人民币结算）",
value:"1"
},{
name:"境外（可选择结算币种）",
value:"2"
}],
callback:function(e){
"1"==e?$(".js_fee_group").hide():$(".js_fee_group").show();
}
}),m=new n({
container:"#js_fee",
data:[{
name:"人民币",
value:"CNY"
},{
name:"英镑",
value:"GBP"
},{
name:"港币",
value:"HKD"
},{
name:"美元",
value:"USD"
},{
name:"日元",
value:"JPY"
},{
name:"加拿大元",
value:"CAD"
},{
name:"澳大利亚元",
value:"AUD"
},{
name:"欧元",
value:"EUR"
}],
callback:function(){}
});
u.selected(0),m.selected(0),$("#js_type").width($(".frm_input_box").outerWidth()),
$("#js_fee").width($(".frm_input_box").outerWidth()),$("#js_form").validate({
rules:{
account:"required",
secret:"required"
},
messages:{
account:"商户号不能为空",
secret:"商户密钥不能为空"
},
errorPlacement:function(e,a){
var t=a.parent().parent();
t.find(".fail").remove(),e.insertBefore(t.find(".frm_tips"));
},
submitHandler:function(e){
var t=$(e).serializeObject();
t.feetype=m.value,"1"==u.value&&(t.feetype=""),c.post({
url:"/merchant/merchantentrance",
data:t,
mask:!1
},function(e){
switch(e.base_resp.ret){
case 0:
a.suc("商户号已设置"),location.href=wx.url("/merchant/merchantentrance?action=updatepage");
break;

case-2:
a.err("商户号或密钥填写错误");
break;

case-1:
default:
a.err("系统繁忙，请稍后再试");
}
});
}
});
});