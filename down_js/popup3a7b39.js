define("common/wx/popup.js",["common/wx/widgetBridge.js","biz_common/jquery.ui/jquery.ui.draggable.js","tpl/popup.html.js"],function(t){
"use strict";
t("common/wx/widgetBridge.js"),t("biz_common/jquery.ui/jquery.ui.draggable.js");
var i=t("tpl/popup.html.js"),n=template.compile(i),o={
disabled:"btn_disabled",
primary:"btn_primary",
"default":"btn_default"
};
$.widgetBridge("popup",{
$dialogWrp:null,
options:{
title:"温馨提示",
width:726,
height:null,
template:template.compile,
miniTips:null,
data:null,
buttons:[],
onHide:null,
onShow:null,
onOK:null,
onCancel:null,
mask:!0,
autoShow:!0
},
_create:function(){
var t=this,i=$.extend(!0,{},this.options),e=function(){
t.hide();
};
if(i.miniTips&&i.miniTips.text){
i.miniTips.text=i.miniTips.text.replace(/#type_end#/g,"</span>");
var s="";
"red"==i.miniTips.type?s='<span class="js_mini_tips_type mini_tips warn">':"green"==i.miniTips.type&&(s='<span class="js_mini_tips_type mini_tips success">'),
i.miniTips.text=i.miniTips.text.replace(/#type_start#/g,s);
}
i.buttons&&!$.isArray(i.buttons)&&(i.buttons=[i.buttons]),!i.buttons.length&&i.onOK&&(i.buttons=[{
text:"确定",
type:"primary",
classWrap:"",
isHide:!1,
click:function(){
var t=i.onOK&&i.onOK.call(this);
!t&&e();
}
},{
text:"取消",
isHide:!1,
classWrap:"",
click:function(){
var t=i.onCancel&&i.onCancel.call(this);
!t&&e();
}
}]),$.each(i.buttons,function(t,i){
i.type=o[i.type||"default"],i.isHide=i.isHide===!0?!0:!1,i.classWrap=i.classWrap||"";
});
var a;
if(this.element.is("script[type=text/html]"))a=this.element.html(),this.options.data&&this.options.template&&(a=this.options.template(a)(this.options.data));else{
var l=$("<div></div>").append(this.element.clone()),a=l.html();
if(this.options.data&&this.options.template)try{
a=this.options.template(a)(this.options.data);
}catch(p){
BJ_REPORT.monitor(114,JSON.stringify(this.options.data),90),a="系统错误：非法字符";
}
}
if(i.content=a,this.$dialogWrp=$(n(i)).appendTo("body"),this.$dialogWrp.find(".dialog_bd").children(":first").show(),
i.autoShow||this.$dialogWrp.hide(),this.$dialogWrp.find(".pop_closed").click(i.onClose||e),
this.$dialogWrp.find(".js_btn").each(function(n){
var o=i.buttons[n].click,e=o?function(i){
o.call(t,i);
}:function(){};
$(this).click(e);
}),this.resetPosition(),i.autoShow){
var r=t.options.onShow;
"function"==typeof r&&r.call(t);
}
return this.$dialogWrp.draggable({
handle:".dialog_hd"
}),this.get();
},
show:function(){
var t=this,i=t.options.onShow,n=!0;
this.$dialogWrp.fadeIn(function(){
n&&("function"==typeof i&&i.call(t),n=!1);
});
},
resetPosition:function(){
$(this.$dialogWrp.get(0)).css({
"margin-left":-1*this.$dialogWrp.outerWidth()/2,
"margin-top":-1*this.$dialogWrp.outerHeight()/2
});
},
get:function(){
return this.$dialogWrp.filter(".dialog_wrp");
},
hide:function(){
var t=this,i=t.options.onHide||t.options.close,n=!0;
this.$dialogWrp.fadeOut(function(){
n&&("function"==typeof i&&i.call(t),n=!1);
});
},
remove:function(){
this.destroy(),this.$dialogWrp.remove();
}
});
});