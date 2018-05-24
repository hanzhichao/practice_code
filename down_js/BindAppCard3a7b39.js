define("original/common/BindAppCard.js",["original/common/tpl/BindAppCard.html.js","common/wx/popover.js"],function(o){
"use strict";
function n(o){
var n=this;
n.opt=$.extend(!0,{},t,o);
for(var a={},r=0,d=n.opt.data.length;d>r;r++){
var m=n.opt.data[r];
a[m.bizuin_code]={
uin:m.bizuin_code,
nick_name:m.nickname,
alias:m.alias,
signature:m.signature,
logo:m.headimgurl,
token:n.opt.token,
verify_flag:1==+m.verify_flag?!0:!1,
verify_info:m.verify_info
};
}
var p="string"==typeof n.opt.dom?$(n.opt.dom):n.opt.dom;
p.each(function(){
var o=$(this),n=o.data("code"),t=a[n];
return n&&t?void new e({
className:"popover_biz_account",
dom:o,
content:template.compile(i)(t),
hideIfBlur:!0,
isToggle:!0,
hover:!0,
margin:"left"
}).hide():!1;
});
}
var i=o("original/common/tpl/BindAppCard.html.js"),e=o("common/wx/popover.js"),t={
dom:null,
data:[],
token:""
};
return n;
});