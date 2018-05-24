define("infringement/manual.js",["common/wx/top.js","common/wx/dialog.js"],function(e){
"use strict";
var n=template.render,t=e("common/wx/top.js"),i=e("common/wx/dialog.js");
if(wx.cgiData.fescene||(1==wx.cgiData.type?new t("#topTab",t.DATA.infringement).selected("infringement"):2==wx.cgiData.type&&new t("#topTab",t.DATA.infringement).selected("antiinfringement")),
1==wx.cgiData.fescene)var a=wx.url("/acct/newinfringement?action=get_form&t=infringement/infringement_add_new&type="+wx.cgiData.type+"&lang=zh_CN&fescene="+wx.cgiData.fescene+(1==wx.cgiData.feregister?"&feregister=1":"")).replace("token=","token="+wx.cgiData.token);else var a=wx.url("/acct/infringement?action=getinfo&t=infringement/infringement_add&type="+wx.cgiData.type);
wx.cgiData.entrance_source&&(a+="&entrance_source="+wx.cgiData.entrance_source),
$("#js_apply").on("click",function(){
$(this).data("type");
1==wx.cgiData.exist?i.show({
type:"warn",
msg:"您有未完成的侵权投诉单，继续完成？|点击重新填写，则清空已填内容，申请新的投诉单。",
buttons:[{
text:"继续",
click:function(){
window.open(1==wx.cgiData.fescene?wx.url("/acct/newinfringement?action=get_form&t=infringement/infringement_add&refill=1&fescene="+wx.cgiData.fescene+(1==wx.cgiData.feregister?"&feregister=1":"")+"&type="+wx.cgiData.tempType):wx.url("/acct/infringement?action=getinfo&t=infringement/infringement_add&refill=1&type="+wx.cgiData.tempType)),
this.remove();
},
type:"primary"
},{
text:"重新填写",
click:function(){
window.open(a),this.remove();
},
type:"normal"
}],
title:"未完成投诉单"
}):window.open(a);
}),1==wx.cgiData.is_overseas&&$("#js_div_page").html(n("tpl_overseas"));
});