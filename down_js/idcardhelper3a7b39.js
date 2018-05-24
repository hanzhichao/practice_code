define("common/wx/idcardhelper.js",["tpl/idcardhelper.html.js","common/wx/popup.js"],function(t,p,e){
"use strict";
function o(){
$("body").append(i);
}
var i=t("tpl/idcardhelper.html.js");
t("common/wx/popup.js"),e.exports={
show:function(){
o();
$("#idcard_help_tpl").popup({
title:"手持身份证详细要求",
width:960,
className:"idcard_wrp",
buttons:[{
text:"我知道了",
click:function(){
this.remove();
},
type:"primary"
}],
onHide:function(){
this.remove();
}
});
}
};
});