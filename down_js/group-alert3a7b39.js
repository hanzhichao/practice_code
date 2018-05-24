define("advanced/group-alert.js",["common/wx/dialog.js","common/wx/Tips.js","common/wx/popover.js","common/wx/top.js","common/wx/Cgi.js"],function(e){
"use strict";
function t(){
n(),o();
}
function n(){
var e="#topTab",t=new a(e,a.DATA.advanced);
t.selected(1);
}
function o(){
$("a[key-id]").on("click",function(){
$(".popover").hide();
{
var e=$(this).attr("key-id"),t=$(this).attr("key"),n=$(this),o=$(this).attr("alarmcnt");
new c({
dom:$(this),
content:"<p>描述的情况发生超过%s次/5分钟时，将在微信群中报警。</p>".sprintf('<input type="text" size="5" id="inputFreq" value="'+o+'" selected>')+'<p class="tips">设定次数可以是0-10000的任何值。</p>',
buttons:[{
text:"确定",
click:function(){
var o=$("#inputFreq")[0].value,c=this;
""==o||parseInt(o)<0||parseInt(o)>1e4?i.err("设置次数为0-10000的任何值。"):s.post({
url:"/advanced/advanced?action=setrule&count="+parseInt(o)+"&id="+e+"&key="+t
}).success(function(e){
0==e.base_resp.ret?($("span[key="+t+"]").html(o),n.attr("alarmcnt",o),i.suc("设置成功"),
c.remove()):(s.handleRet(e,{
id:64463,
key:3,
url:"/advanced/advanced?action=setrule"
}),c.remove());
});
},
type:"primary"
},{
text:"取消",
type:"default",
click:function(){
this.remove();
}
}]
});
}
$(".popover").addClass("pop_alarm");
}),$(".g_member_op").on("click",function(){
var e=$(this).attr("gid"),t=$(this).parent(),n=$(this).parent().children(".g_member_name"),o=parseInt($("member_cnt").html());
$(".popover").hide();
new c({
dom:n,
content:"<p>是否从报警群中移除该微信号？</p>",
buttons:[{
text:"确定",
click:function(){
var n=this;
s.post({
url:"/advanced/advanced?action=kick&id="+e
}).success(function(e){
0==e.base_resp.ret?(o>1?($("member_cnt").html(o-1),t.hide()):window.location=window.location,
n.hide()):(i.err(e.base_resp.err_msg),n.hide());
});
},
type:"primary"
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}]
});
});
}
var i=(e("common/wx/dialog.js"),e("common/wx/Tips.js")),c=e("common/wx/popover.js"),a=e("common/wx/top.js"),s=e("common/wx/Cgi.js");
t();
});