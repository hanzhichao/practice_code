define("common/wx/dialog.js",["biz_common/jquery.ui/jquery.ui.draggable.js","tpl/dialog.html.js"],function(t,i){
"use strict";
function e(t){
var i=this;
"string"==typeof t&&(t={
msg:t
}),t=$.extend(!0,{},o,t),i.id=t.id=[n.uiName,"_",++n.uid].join(""),t.icon=n.iconClass[t.type||"warn"];
var e=[];
e=t.msg.split("|"),t.msg=e[0]?e[1]?{
title:e[0],
text:e[1],
msgClass:""
}:{
title:t.msg,
msgClass:"single_line"
}:{
text:e[1],
msgClass:"single_line"
},$.each(t.buttons,function(t,i){
i.type=n.btTypes[i.type||"primary"];
}),i.opt=t,$(template.compile(n.html)(t)).appendTo("body"),i.dom=$("#"+this.id).parent(),
i.dom.css("margin-left",-1*i.dom.outerWidth()/2).css("margin-top",-1*i.dom.outerHeight()/2),
i.dom.fadeIn(),t.draggable&&i.dom.draggable({
handle:".dialog_hd"
}),function(){
$.each($("#"+i.id+" .js_btn"),function(e,o){
t.buttons[e].click&&$(o).click(function(){
return t.buttons[e].click.apply(i),!1;
});
}),$("#"+i.id+" .pop_closed").click(function(){
return t.close&&"function"==typeof t.close?void(t.close()&&i.remove()):void i.remove();
});
}();
}
t("biz_common/jquery.ui/jquery.ui.draggable.js");
var o={
title:"温馨提示",
type:"warn",
msg:"错误信息|对不起，系统繁忙请稍后尝试。",
buttons:[{
text:"确定",
click:function(t){
this.remove(t);
}
}],
width:720,
height:0,
draggable:!0,
mask:!0,
className:""
},n={
uid:0,
uiName:"wxDialog",
iconClass:{
succ:"success",
err:"error",
warn:"warn",
info:"info",
warn_primary:"warn_primary",
waiting:"waiting"
},
btTypes:{
primary:"btn_primary",
normal:"btn_default",
disabled:"btn_disabled"
}
};
n.html=t("tpl/dialog.html.js"),e.prototype={
hide:function(){
this.opt.mask&&this.dom.next().remove(),this.dom.fadeOut();
},
remove:function(){
this.opt.mask&&this.dom.next().remove(),this.dom.remove();
},
resetPos:function(){
var t=this;
t.dom.css("margin-left",-1*t.dom.outerWidth()/2).css("margin-top",-1*t.dom.outerHeight()/2);
}
},i.show=function(t){
return new e(t);
};
});