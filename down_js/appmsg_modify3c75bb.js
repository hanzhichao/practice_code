define("media/appmsg_modify.js",["common/wx/mpEditor/pluginsList.js","common/wx/popover.js","common/wx/dialog.js","common/wx/qrcheck_weapp.js","common/wx/Tips.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/media/previewDialog.js","common/wx/mpEditor/editor_all_min.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function t(){
var e,t,n,o,a,r=0;
z=[],L=0,$(".modified").each(function(i){
0==i?(a="",o="",t=parseInt($(this).attr("data-index"))):parseInt($(this).attr("data-index"))!=e+1&&(n=e,
z.push({
beginIndex:t,
endIndex:n,
beforeText:o,
afterText:a,
index:r
}),a="",o="",t=parseInt($(this).attr("data-index")),r++),L++,e=parseInt($(this).attr("data-index")),
a+=$(this).text(),o+=$(this).attr("data-raw-text");
}),0!=$(".modified").length&&z.push({
beginIndex:t,
endIndex:e,
beforeText:o,
afterText:a,
index:r
}),i(z);
}
function i(e){
$("#js_modify_points").html(template.compile($("#js_modify_point_tmpl").html())({
modify_points:e
})),$("#js_modified_num").text(L);
}
function n(e){
var t,i,n,a,r,s,d,c,m,l,h,p="",_="",x=0;
if($(".character.hover").removeClass("hover"),0!=e.length){
var u;
if(c=M-L<e.length?M-L:e.length,0>=c&&!$(e[0]).hasClass("modified"))return o("全文修改字数已达到5字，不可再修改",e[0],!0),
!1;
for(var u=0;u<e.length;u++)if($(e[u]).hasClass("modified")){
m=!0;
for(var g=0;g<z.length;g++)z[g].beginIndex<=parseInt($(e[u]).attr("data-index"))&&z[g].endIndex>=parseInt($(e[u]).attr("data-index"))&&(l||(l=z[g].beginIndex),
h=z[g].endIndex);
}
m?(r=parseInt(e[0].getAttribute("data-index")),s=r,e[c-1]&&(s=parseInt(e[c-1].getAttribute("data-index"))),
r>l&&(r=l),h>s&&(s=h)):(r=parseInt(e[0].getAttribute("data-index")),s=parseInt(e[c-1].getAttribute("data-index"))),
n=parseInt($(".selected").eq(0).attr("data-index"))-1,a=parseInt($(".selected").eq($(".selected").length-1).attr("data-index"))+1,
console.log(r,s),d=e.length<c?e.length:c,(n>=r&&s>=n||a>=r&&s>=a||r>=n&&a>=s||n>=r&&s>=a)&&(i=!0,
r=n+1>r?r:n+1,s=s>a-1?s:a-1);
for(var u=r;s>=u;u++)$(".character[data-index="+u+"]").hasClass("modified")&&x++;
if(s-r-x>M-L-1)return o("此处只能修改"+(M-L)+"个字",e[0],!0),!1;
t=$(".character[data-index="+r+"]").eq(0).get(0),console.log("isBeside:",i),i||($(".selected").removeClass("selected"),
y&&y.remove(),I&&clearTimeout(I),T&&clearTimeout(T),y=new f({
dom:t,
content:$("#js_modify_popover_tmpl").html(),
className:"js_modify_popover",
isToggle:!1
}));
for(var u=r;s>=u;u++)$(".character[data-index="+u+"]").addClass("selected");
O=parseInt($(".selected").eq(0).attr("data-index")),R=parseInt($(".selected").eq($(".selected").length-1).attr("data-index")),
""==_?$(".selected").each(function(){
p+=$(this).attr("data-raw-text"),_+=$(this).text();
}):$("#js_replace_after").val(_),$("#js_replace_after").val(_),$("#js_replace_before").text(p),
$("#js_has_modify_num").text(_.length),$("#js_should_modify_num").text(p.length),
setTimeout(function(){
$("#js_replace_after").focus();
},500);
}
}
function o(e,t,i){
var n,o,a=template.compile($("#js_modify_error_popover_tmpl").html())({
err_msg:e
});
i&&null!=$(".js_appmsg_modify_popover_content").parent().width()?(n=$(".js_appmsg_modify_popover_content").parent().html(),
o=$("#js_replace_after").val(),$(".js_appmsg_modify_popover_content").parent().html(a),
T=setTimeout(function(){
return n.indexOf("js_modify_error_msg")>0?!1:($(".js_appmsg_modify_popover_content").parent().html(n),
void $("#js_replace_after").val(o));
},1500)):(y&&y.remove(),y=new f({
dom:$('.character[data-index="'+t.getAttribute("data-index")+'"]').get(0),
content:a,
className:"js_modify_popover",
isToggle:!1
}),I=setTimeout(function(){
y.remove();
},1500));
}
function a(e){
for(var t,i,n,o=0;o<e.childNodes.length;o++)if(t=e.childNodes[o],"IFRAME"==e.nodeName&&(t.textContent=t.textContent.html(!1)),
1==t.nodeType)a(t);else if(3==t.nodeType){
i="";
for(var r=0;r<t.textContent.length;r++)" "!=t.textContent[r]||"	"!=t.textContent[r]||"\n"!=t.textContent[r]?(i+='<span data-raw-text="'+t.textContent[r]+'" data-textnode-index="'+A+'" data-index="'+N+'" class="character">'+t.textContent[r]+"</span>",
N++,H+=160==t.textContent[r].charCodeAt(0)?" ":t.textContent[r]):i+=t.textContent[r];
A++,n=document.createElement("span"),n.innerHTML=i,e.replaceChild(n,t);
}
}
function r(){
y&&y.remove(),$(".selected").removeClass("selected");
}
function s(e,t){
for(var i,n,o=0;o<e.childNodes.length;o++)if(i=e.childNodes[o],1==i.nodeType)s(i,t);else if(3==i.nodeType){
for(var a in t)parseInt(a)==B&&(n="",$('.character[data-textnode-index="'+a+'"]').each(function(){
n+=$(this).text();
}),i.textContent=n);
B++;
}
return e;
}
function d(e){
var t={},i={
list:[]
};
B=0,$(".modified").each(function(){
t[$(this).attr("data-textnode-index")]||(t[$(this).attr("data-textnode-index")]={
chars:[]
}),t[$(this).attr("data-textnode-index")].chars.push({
index:$(this).attr("data-index"),
content:$(this).html(),
beforeText:$(this).attr("data-raw-text")
}),i.list.push({
index:$(this).attr("data-index"),
after_text:$(this).html(),
before_text:160==$(this).attr("data-raw-text").charCodeAt(0)?" ":$(this).attr("data-raw-text")
});
});
var n=document.createElement("div");
n.innerHTML=e;
var o=s(n,t);
return{
content:$(o).html(),
modifyDetail:i
};
}
function c(){
g.suc("修改成功"),location.href=wx.url("/cgi-bin/home?t=home/index");
}
function m(e){
var t={
container_class:"qrcheck_box",
cgiURI:"/cgi-bin/safeqrcode",
typeid:38,
msgData:{
name:"管理员"
},
data:{
token:wx.cgiData.token
},
extra:{
appmsgid:wx.cgiData.app_id.toString(),
idx:wx.cgiData.idx.toString(),
seq:e.toString(),
msgid:wx.cgiData.msgid.toString()
},
askExtra:{
appmsgid:wx.cgiData.app_id.toString(),
idx:wx.cgiData.idx.toString(),
seq:e.toString(),
msgid:wx.cgiData.msgid.toString()
},
onSuccess:function(e,t){
t.scan_user_type>0?c():(D?D.popup("show"):D=$("#js_submit_confirm_tmpl").popup({
title:"微信验证",
width:960,
mask:!1
}),U.destroy());
}
};
U=u.initPopup(t),U.load();
}
function l(){
$("#js_artical").html(q),a($("#js_artical")[0]),console.log("count char:",N),q=$("#js_artical").html();
for(var e in _)_.hasOwnProperty(e)&&("Video"==e?q=_[e].beforeSetContent({
isPreview:!1,
html:q,
width:900
}):"Ad"==e?q=_[e].beforeSetContent({
html:q,
can_see_ad:!1
}):"function"==typeof _[e].beforeSetContent&&(q=_[e].beforeSetContent({
html:q
})));
$("#js_artical").html(q),$("#js_artical").find("iframe").each(function(){
var e=this;
$(e).hasClass("js_editor_vote_card")&&$(e).on("load",function(){
$(e.contentWindow.document).on("finished",function(){
var t=$(this).height();
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight),
$(e).height(t),$(e).prev().hasClass("js_connot_click_iframe")&&$(e).prev().height(t);
}),$(e).off("load");
});
}),$("iframe").each(function(e){
$('<div class="iframe_contain_'+e+'"></div>').css({
position:"relative",
display:"inline-block",
width:$(this).width(),
height:$(this).height()
}).insertBefore(this),$(this).appendTo(".iframe_contain_"+e),$('<div class="js_connot_click_iframe"></div>').css({
position:"absolute",
display:"block",
width:$(this).width(),
height:$(this).height()
}).insertBefore(this);
}),h(),S.setBasicTime({
uin:wx&&wx.cgiData&&wx.cgiData.biz_uin||0,
pid:411
}),S.send();
}
function h(){
var e,t,i,n,o=223,a=$(window).scrollTop(),r=$(".js_main_inner"),s=$("#js_side_bar"),d=$(".js_appmsg_modify"),c="appmsg_extract_wrp_fixed";
e=($("body").width()-r.width())/2+(r.width()-s.width()),i=a-$(".js_appmsg_modify").offset().top,
n=d.height()-s.height(),n=Math.min(i,n),b&&$(".js_modify_popover_dele").css({
top:b.offset().top+28+"px"
}),a>o?(s.addClass(c),t=r.get(0).getBoundingClientRect().bottom-a,s.css({
top:n+"px"
})):(s.removeClass(c),s.css({
top:0
}));
}
var p=e("common/wx/mpEditor/pluginsList.js"),_=p.getList(),f=e("common/wx/popover.js"),x=e("common/wx/dialog.js"),u=e("common/wx/qrcheck_weapp.js"),g=e("common/wx/Tips.js"),v=(e("common/wx/ban.js"),
e("common/wx/Cgi.js")),w=e("common/wx/media/previewDialog.js");
e("common/wx/mpEditor/editor_all_min.js");
var b,j,y,C,k,D,I,T,S=e("biz_common/utils/wxgspeedsdk.js"),q=wx.cgiData.appmsg_data.content.html(!1),E=q,N=0,A=0,H="",B=0,L=0,M=5,O=0,R=0,z=[],P=!0,U=null;
l(),$("body").on("click",".js_connot_click_iframe, img",function(){
return g.err("只支持修改正文文字内容"),!1;
}).on("click",function(){
I&&(clearTimeout(I),$("#js_modify_error_msg").width()>0&&y.remove());
}),$("#js_artical").on("mouseenter",".character",function(){
var e,t=new UE.dom.Selection(document),i=t.getRange(),n=i.cloneContents(),o=0,a=M-$(".character.modified").length;
return n?(e=document.createElement("div"),e.appendChild(n),$(".character.hover").removeClass("hover"),
void $(e).find(".character").each(function(){
return o>=a?!1:($(".character[data-index="+$(this).attr("data-index")+"]").hasClass("selected")||$(".character[data-index="+$(this).attr("data-index")+"]").addClass("hover"),
void o++);
})):o>=a?!1:($(".character.hover").removeClass("hover"),void $(this).addClass("hover"));
}).on("mouseleave",".character",function(){
$(this).removeClass("hover");
}).on("click",".character",function(){
function e(){
t=[$(i)[0]],n(t);
}
var t=[],i=this;
return P?(k=setTimeout(function(){
e(),P=!0;
},150),P=!1,!1):(clearTimeout(k),clearTimeout(C),C=setTimeout(function(){
P=!0;
},200),!1);
}),$("body").on("mouseup",function(){
var e,t,i,o=new UE.dom.Selection(document),a=o.getRange();
if(a.adjustmentBoundary(),i=a.cloneContents()){
if(3==i.childNodes[0].nodeType){
if(a.endContainer.parentElement.className.indexOf("character")<0)return!1;
e=[a.endContainer.parentElement];
}else t=document.createElement("div"),t.appendChild(i),e=$(t).find(".character");
n(e);
}
}),$("body").on("click","#js_modify_confirm",function(){
var e=$("#js_replace_after").val(),i=$("#js_replace_before").text();
if(e.length!=i.length)return!1;
for(var n=O;R>=n;n++)$(".character[data-index="+n+"]").html(e[n-O].html(!0)),e[n-O]==i[n-O]?$(".character[data-index="+n+"]").removeClass("modified"):$(".character[data-index="+n+"]").addClass("modified");
y.remove(),t(),$(".selected").removeClass("selected");
}).on("click","#js_modify_hide",function(){
y.remove(),$(".selected").removeClass("selected");
}).on("keyup","#js_replace_after",function(e){
var t=$("#js_replace_after").val(),i=$("#js_replace_before").text(),n=e.keyCode||e.which;
return 13==n?void $("#js_modify_confirm").click():(t.length!=i.length?$("#js_modify_confirm").addClass("btn_disabled"):$("#js_modify_confirm").removeClass("btn_disabled"),
void $("#js_has_modify_num").text(t.length));
}).on("click","#js_i_know",function(){
D.popup("hide");
}),$(window).on("scroll",function(){
h();
}),$("#js_modify_points").on("click",".js_modify_point_op",function(){
var e=$(this),t=parseInt(e.data("index")),i=z[t],o=$('.character[data-index="'+i.beginIndex+'"]').get(0);
r(),I&&clearTimeout(I),T&&clearTimeout(T),n([o]);
}).on("click",".js_delete_point_op",function(){
{
var e=$(this),i=parseInt(e.data("index")),n=z[i],o=parseInt(n.beginIndex),a=parseInt(n.endIndex);
$('.character[data-index="'+n.beginIndex+'"]').get(0);
}
b=$(this),j&&j.remove(),j=new f({
dom:this,
content:$("#js_delete_confirm_tmpl").html(),
className:"js_modify_popover_dele",
isToggle:!1,
buttons:[{
text:"确定删除",
click:function(){
this.hide(),r();
for(var e=o;a>=e;e++)$('.character[data-index="'+e+'"]').text(n.beforeText[e-o]).removeClass("modified"),
L--;
t();
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
}),$("#js_preview").click(function(){
var e=d(E),t=e.content,i=this;
r(),$(i).btn(!1),v.post({
mask:!1,
url:wx.url("/cgi-bin/masssendmodify?action=content_check"),
data:{
appmsgid:wx.cgiData.app_id,
idx:wx.cgiData.idx,
content:t,
textnode_info:H,
modify_detail:JSON.stringify(e.modifyDetail),
preview:1,
msgid:wx.cgiData.msgid
},
error:function(){
g.err("删除失败"),$(this).btn(!0);
}
},function(e){
return $(i).btn(!0),e.check_res?void g.err(10008==e.check_res?"检测到文章没有修改":10003==e.check_res?"修改字符匹配失败":10011==e.check_res?"正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑":10007==e.check_res?"修改字数不允许超过5个字":10006==e.check_res?"修改字符匹配失败":"系统繁忙，请稍后再试"):e.submit_res?void g.err(10004==e.submit_res?"检测到文章已被修改":"系统繁忙，请稍后再试"):void 0!==e&&e.base_resp&&0===e.base_resp.ret?void new w({
AppMsgId:wx.cgiData.new_appmsg_id,
type:2,
hasConfirmed:!0,
selectFun:null,
uin:wx.cgiData.biz_uin,
token:wx.cgiData.token,
nickname:wx.cgiData.nick_name
}):void g.err("系统繁忙，请稍后再试");
});
}),$("#js_confirm").click(function(){
r();
var e=d(E),t=e.content,i=this;
$(i).btn(!1),v.post({
mask:!1,
url:wx.url("/cgi-bin/masssendmodify?action=content_check"),
data:{
appmsgid:wx.cgiData.app_id,
idx:wx.cgiData.idx,
content:t,
textnode_info:H,
modify_detail:JSON.stringify(e.modifyDetail),
msgid:wx.cgiData.msgid
},
error:function(){
g.err("系统繁忙，请稍后再试"),$(this).btn(!0);
}
},function(e){
var t;
return $(i).btn(!0),e.check_res?void g.err(10008==e.check_res?"检测到文章没有修改":10003==e.check_res?"修改字符匹配失败":10011==e.check_res?"正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑":10007==e.check_res?"修改字数不允许超过5个字":10006==e.check_res?"修改字符匹配失败":"系统繁忙，请稍后再试"):e.submit_res?void g.err(10004==e.submit_res?"检测到文章已被修改":"系统繁忙，请稍后再试"):void 0!==e&&e.base_resp&&0===e.base_resp.ret?(t=e.seq)?void v.post({
mask:!1,
url:wx.url("/cgi-bin/masssendmodify?action=submit"),
data:{
appmsgid:wx.cgiData.app_id,
idx:wx.cgiData.idx,
seq:t,
msgid:wx.cgiData.msgid
},
error:function(){
g.err("删除失败"),$(this).btn(!0);
}
},function(e){
return void 0===e&&e.base_resp&&0!==e.base_resp.ret?void g.err("系统繁忙，请稍后再试"):0==e.need_qrcode?void c():void x.show({
type:"info",
msg:"确认提交修改|修改成功后，用户打开页面将看到更新后的内容，文章底部将显示修改时间。一篇文章只能修改一次，请核对并确认。",
buttons:[{
text:"确定",
click:function(){
m(t),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}):void g.err("获取seq失败"):void g.err("系统繁忙，请稍后再试");
});
});
});