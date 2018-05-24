define("material/common_edit.js",["common/wx/popup.js","material/material_cgi.js","common/wx/media/imageDialog.js","biz_common/jquery.validate.js","common/wx/Tips.js"],function(i){
"use strict";
function t(i,t,e){
var r=this,s=n.call(this);
return s?(!!e&&e.btn(!1),void o.edit(s,function(t){
t.material_info_list&&t.material_info_list[0]?(t=t.material_info_list[0],m.suc("保存成功"),
r.id=t.id,i&&i(t),r.opt.suc&&r.opt.suc(t)):m.err("保存失败！请稍后再试"),!!e&&e.btn(!0);
},function(){
m.err("保存失败！请稍后再试"),t&&t(),!!e&&e.btn(!0);
})):!1;
}
function e(i){
for(var t="<>&'\"/\\",e=[],n=0,r=i.length;r>n;++n){
var o=i.charAt(n);
-1!=t.indexOf(o)&&e.push(o);
}
return e.join("、");
}
function n(){
var i=this.opt,t=$(i.title$).val().trim(),n=this.ueditor.getContent().replace(/<img\s+src="/g,'<img data-src="').replace(/&nbsp;/g," ").replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
if(!c.rangelength(t,[1,64]))return m.err("标题不能为空且长度不能超过%s字".sprintf(64)),$(i.title$).focus(),
!1;
var r=e(t);
return r?(m.err("标题不能包含以下特殊字符："+r),!1):c.rangelength(n.text(),[1,2e4])?{
id:this.id,
title:t,
body:n
}:(m.err("正文不能为空且长度不能超过%s字".sprintf(2e4)),!1);
}
function r(i){
function t(i,t,e){
e=e||"保存";
var r=n.call(c);
return r?(i.btn(!1),void o.edit(r,function(n){
n.material_info_list&&n.material_info_list[0]?(n=n.material_info_list[0],m.suc(e+"成功"),
t&&t(n),i.btn(!0)):(i.btn(!0),m.err(e+"失败！请稍后再试"));
},function(){
i.btn(!0),m.err(e+"失败！请稍后再试");
})):!1;
}
this.opt=i;
var e=i.id,r=i.title||"",a=i.body||"";
r=r.trim();
var c=this;
c.id=e,1==i.can_use_hyperlink&&UEDITOR_CONFIG.toolbars&&UEDITOR_CONFIG.toolbars[0].splice(8,0,"|"),
UEDITOR_CONFIG.toolbarsPermission&&(UEDITOR_CONFIG.toolbarsPermission.link=UEDITOR_CONFIG.toolbarsPermission.unlink=i.can_use_copyright||i.can_use_hyperlink,
"1"==i.is_link_white&&(UEDITOR_CONFIG.toolbarsPermission.link=UEDITOR_CONFIG.toolbarsPermission.unlink=1));
var l=new baidu.editor.ui.Editor({
wordCount:!1,
elementPathEnabled:!1,
customDomain:!0
});
window._ueditor=l,window.can_use_hyperlink=i.can_use_hyperlink,l.addListener("openimagedialog",function(){
s({
maxSelect:100,
onOK:function(i){
l.execCommand("insertimage",i.map(function(i){
return i.src=i._src=i.url,i;
})),this.destroy();
},
onHide:function(){
this.destroy();
}
});
}),this.ueditor=l,l.render(i.editor_id),l.ready(function(){
a=a.replace(/<img\s+data\-src="/g,'<img src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"",
l.setContent(a);
}),$(i.title$).val(r.html(!1)),$(i.save$).click(function(){
t($(i.save$),function(t){
c.id=t.id,i.suc&&i.suc(t);
});
}),$(i.preview$).click(function(){
t($(i.preview$),function(t){
i.pre_preview&&i.pre_preview(),c.id=t.id;
var e=$(i.preview_iframe$);
e.attr("src",("https://mp.weixin.qq.com/mp/ad?id=%s&sign=%s&__biz=%s&r="+Math.random()+"#wechat_redirect").sprintf(c.id,t.sign,wx.data.uin_base64)),
i.preview&&i.preview(t);
},"刷新");
});
}
i("common/wx/popup.js"),document.domain="qq.com";
var o=i("material/material_cgi.js"),s=i("common/wx/media/imageDialog.js"),a=i("biz_common/jquery.validate.js"),c=a.rules,m=i("common/wx/Tips.js");
return r.prototype.setId=function(i){
this.id=i;
},r.prototype.saveAndCb=function(i,e,n){
t.call(this,i,e,n);
},r.prototype.setContent=function(i){
var t=this.ueditor;
t.ready(function(){
i=i.replace(/<img\s+data\-src="/g,'<img src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"",
t.setContent(i);
});
},r;
});