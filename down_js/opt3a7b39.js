define("discuss/opt.js",["common/wx/popover.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/reply.js"],function(t){
"use strict";
function e(t){
m.top=$(t.id).find(".js_top"),m.elect=$(t.id).find(".jsElect"),m.del=$(t.id).find(".jsElectDel"),
m.reply=$(t.id).find(".jsElectReply"),m.elect.reload=t.electReload,m.top.click(function(){
var t=$(this),e=t.data("action");
n.post({
url:"/misc/appmsgcomment",
data:{
comment_id:t.data("commentid"),
action:t.data("action"),
user_comment_id:t.data("id")
}
},function(o){
0==o.base_resp.ret?(a.suc("操作成功"),location.reload(),"remove_top_comment"==e?t.text("置顶").data("action","set_top_comment"):t.text("取消置顶").data("action","remove_top_comment")):16001==o.base_resp.ret&&a.err("置顶数不可超过5条");
});
}),m.elect.click(function(){
var t=$(this),e=t.data("action");
n.post({
url:"/misc/appmsgcomment",
data:{
comment_id:t.data("commentid"),
action:t.data("action"),
user_comment_id_count:1,
user_comment_id_0:t.data("id")
}
},function(o){
0==o.base_resp.ret?(a.suc("操作成功"),"remove_good_comment"==e?t.text("移入精选").data("action","set_good_comment"):t.text("移出精选").data("action","remove_good_comment"),
1==m.elect.reload&&window.location.reload()):200007==o.base_resp.ret?1==data.user_comment_id_count?a.err("该留言因违反相关规定被删除"):(n.handleRet(o,{
id:64462,
key:25,
url:"/misc/appmsgcomment?action="+e
}),a.err("所选留言中有因违反相关规定被删除，请刷新后再继续操作")):16e3==o.base_resp.ret&&a.err("超出精选留言数量限制，请重新选择");
});
}),m.del.click(function(){
var t=$(this),e=$(this).data("id"),a=$(this).data("elected"),n=$(this).data("commentid");
new c({
dom:$(this),
content:a?"删除后将移出精选并且无法恢复，确定删除该留言吗？":"删除后无法恢复，确定删除该留言吗？",
hideIfBlur:!0,
buttons:[{
text:"确认",
click:function(c){
var a=this;
$(c.target).btn(!1),o([{
commentID:n,
ID:e
}],t,a);
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
}),m.reply.each(function(t,e){
var o=$(e).data("commentid"),c=$(e).data("contentid"),a=$(e).data("replynum"),n={
label:"回复该留言",
appendTo:$(e).closest("li"),
clickBt:$(e),
wordlimit:140,
comment_id:o,
content_id:c,
callback:function(t){
t.box.remove();
}
};
1==a&&(n.replyList=[{
content:$(e).attr("data-content"),
createtime:$(e).data("createtime"),
replyid:$(e).data("replyid")
}]);
var m=new i(n);
$(e).data("reply",m);
}),m.reply.click(function(){
$(this).data("reply").$dom.box.is(":visible")?$(this).data("reply").hide():$(this).data("reply").show();
});
}
function o(t,e,o){
for(var c={
count:t.length
},i=0;i<t.length;i++)c["comment_id_"+i]=t[i].commentID,c["user_comment_id_"+i]=t[i].ID;
n.post({
url:"/misc/appmsgcomment?action=batch_delete_comment",
data:c
},function(t){
0==t.base_resp.ret?(a.suc("删除成功"),e.closest("li").remove(),o.remove(),window.location.reload()):(n.handleRet(t,{
id:64462,
key:27,
url:"/misc/appmsgcomment?action=batch_delete_comment"
}),a.err("删除失败，请重试"));
});
}
var c=t("common/wx/popover.js"),a=t("common/wx/Tips.js"),n=t("common/wx/Cgi.js"),i=t("common/wx/reply.js"),m={};
return{
init:e
};
});