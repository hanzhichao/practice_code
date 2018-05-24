define("infringement/detail2.js",["common/wx/top.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/Cgi.js"],function(i){
"use strict";
var n=i("common/wx/top.js"),t=i("common/wx/Tips.js"),o=i("common/wx/dialog.js"),s=i("common/wx/Cgi.js"),e={
submited:0
};
new n("#topTab",n.DATA.infringement).selected("list"),$("#confirm_btn").click(function(){
1!=e.submited&&o.show({
type:"warn",
msg:"确定承认侵权吗？|承认后投诉会终止，平台将自动删除被投诉内容（处罚减半或取消）",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var i=this,n=this.dom.find(".btn_primary");
n.hasClass("btn_loading")||(n.btn(0),s.post({
url:"/acct/infringement?",
data:{
action:"admit",
sub_id:window.cgiData.sub_id,
id:window.cgiData.id
},
mask:!1
},function(o){
n.btn(1),o&&o.base_resp&&0==o.base_resp.ret?(t.suc("操作成功"),e.submited=1,i.remove(),
window.location.reload(!0)):t.err("操作失败，请重试");
}));
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
});