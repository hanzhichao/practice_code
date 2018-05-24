"use strict";
define("vote/list.vue.js",["layout/baseui.vue.js","utils/cgi.vue.js","components/tips.vue.js","components/pagebar.vue.js","components/popover.vue.js"],function(e,t,n){
var o=e("layout/baseui.vue.js"),s=e("utils/cgi.vue.js"),a=e("components/tips.vue.js");
e("components/pagebar.vue.js"),e("components/popover.vue.js");
var i=new o({
el:"#app",
data:function p(){
var p={
seenIndex:-1,
total_count:-1,
super_vote_id:-1,
super_vote_info:[],
content:"<p>确认删除此投票？</p><p>删除后投票数据无法恢复，且图文消息中不再显示。</p>"
};
Object.keys(window.cgiData.list).forEach(function(e){
p[e]=window.cgiData.list[e];
});
var e=function(e,t){
var n=t||location.search,o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),s=n.substr(n.indexOf("?")+1).match(o);
return null!==s?s[2]:"";
};
return p.perpage=parseInt(e("count")?e("count"):10,10),p.page=e("begin")>0?Math.floor(e("begin")/p.perpage)+1:1,
p.param="token="+e("token")+"&lang="+e("lang"),p;
},
methods:{
pageChange:function(e){
var t=e.currentPage;
t!==this.showpage&&(t--,location.href="/cgi-bin/newoperatevote?action=list&begin=%s&count=%s".sprintf(t*this.perpage,this.perpage)+"&"+this.param);
},
confirm:function(e,t){
this.cancel(t),s.post({
url:"/cgi-bin/newoperatevote?action=del",
data:{
action:"del",
supervoteid:e
},
dataType:"json"
},function(e){
0===e.base_resp.ret?(a.suc("删除成功"),location.reload()):a.err(e.base_resp.err_msg);
});
},
cancel:function(e){
this.$refs.popover[e].hide();
},
showPopover:function(e){
this.$refs.popover[e].show();
}
}
});
n.exports=i;
});