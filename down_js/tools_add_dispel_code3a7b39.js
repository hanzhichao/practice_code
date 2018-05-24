define("cardticket/tools_add_dispel_code.js",["cardticket/add/maxlength.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js"],function(s){
"use strict";
function e(s){
var e=!1,o=$(a).popup({
title:"添加验证码",
buttons:[{
text:"确定",
click:function(){
var t=$.trim(r.val());
if(!/^[0-9]{3}$/.test(t))return void r.focus();
if(!e){
e=!0;
var a=this;
c.post({
url:"/merchant/cardsecuritycodemgr",
data:{
action:"add",
security_code:t
},
complete:function(){
e=!1;
}
},function(e){
0==e.base_resp.ret?(i.suc("添加验证码成功"),a.hide(),s.success&&s.success(t)):14015==e.base_resp.ret?(i.err("验证码已经存在"),
r.focus()):14016==e.base_resp.ret?(i.err("验证码个数不能超过3个"),a.hide()):c.show(e);
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
}),n=o.popup("get"),r=n.find(".js_code"),d=n.find(".js_frm_tips");
r.keyup(function(){
var s=$.trim($(this).val());
s&&!/^[0-9]{3}$/.test(s)?d.css("color","#e15f63"):d.css("color","");
}),t({
container:n.find(".js_maxlength"),
lentype:2
});
}
var t=s("cardticket/add/maxlength.js"),c=s("common/wx/Cgi.js"),i=s("common/wx/Tips.js"),a=(s("common/wx/popup.js"),
'<div class="card_code_dialog_wrp" style="display:none">			<div class="card_code_dialog">			<p>店员可以凭借此验证码核销本公众号下发的优惠券</p>			<div class="frm_control_group frm_card_extend">			    <label for="" class="frm_label">			        添加验证码			    </label>			    <span class="frm_input_box with_counter counter_in append">			        <input value="" name="code" type="text" data-maxlength="3" target=".js_add_dispel_code_tips" 			        class="frm_input js_code js_maxlength" placeholder="">			        <span class="frm_input_append frm_counter"><span class="js_add_dispel_code_tips">0</span>/3</span>			    </span>			    <p class="frm_tips js_frm_tips">请输入3位数数字</p>			</div>			</div>		</div>');
return e;
});