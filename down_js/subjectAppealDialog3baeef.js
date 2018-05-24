define("common/wx/subjectAppealDialog.js",["common/wx/dialog.js"],function(o){
"use strict";
var t=o("common/wx/dialog.js"),n=function(o){
var n=o.reason||"该主体信息曾因涉嫌违规，违反《微信公众平台运营规范》，暂无法使用。如有异议，请发起申诉。",e=[{
text:"确定",
click:function(){
this.remove();
}
}];
o.canAppeal&&e.push({
text:"发起申诉",
click:function(){
window.location.href=o.jumpUrl+"&appeal_ticket="+o.appealTicket;
}
}),t.show({
type:"warn",
msg:"该主体信息暂无法使用|"+n,
buttons:e
});
};
return n;
});