"use strict";
define("discuss/index.vue.js",["layout/baseui.vue.js","utils/cgi.vue.js","components/tips.vue.js","components/top.vue.js","components/pagebar.vue.js","components/popover.vue.js"],function(s,e,t){
var n=s("layout/baseui.vue.js"),o=s("utils/cgi.vue.js"),i=s("components/tips.vue.js"),a=s("components/top.vue.js");
s("components/pagebar.vue.js"),s("components/popover.vue.js");
var c=function(s){
var e=new Date(s);
return"%s-%s-%s".sprintf(e.getFullYear(),e.getMonth()+1,e.getDate());
},p=new n({
el:"#app",
data:function u(){
var u={
seenBanPopoverIndex:-1,
tabs:a.discuss,
tab:"index",
loading:!1
},s=window.cgiData.list,e=s;
u.count=window.cgiData.count,u.begin=window.cgiData.begin,u.list=e.app_msg||[],u.totalNum=e.total_count||0;
for(var t=0;t<u.list.length;++t){
var n=u.list[t];
n.date_time_str=c(1e3*n.date_time);
}
return u;
},
computed:{
page:function(){
return this.begin>0?Math.floor(this.begin/this.count)+1:1;
}
},
methods:{
closeAllPopover:function(){
this.seenBanPopoverIndex=-1;
},
showBanPopover:function(s){
this.seenBanPopoverIndex=s;
},
dialogClose:function(){
this.$refs.dialog.hide();
},
dialogOK:function(){
var s=this._closeDiscussOpt;
this.loading=!0,this.toggleDiscuss(s.index,s.commentId,s.appmsgId,s.appmsgIdx,!0);
},
openDiscuss:function(s,e,t,n){
this.toggleDiscuss(s,e,t,n,!1);
},
closeDiscuss:function(s,e,t,n){
this.$refs.dialog.show(),this._closeDiscussOpt={
index:s,
commentId:e,
appmsgId:t,
appmsgIdx:n
};
},
toggleDiscuss:function(s,e,t,n,a){
var c=this;
o.post({
url:"/misc/appmsgcomment?action=set_can_comment",
data:{
enabled:a?0:1,
comment_id:e,
app_msg_id:t,
app_msg_item_idx:n
}
},function(e){
0===e.base_resp.ret?(i.suc(a?"关闭留言成功":"开启留言成功"),c.list[s].enabled=a?0:1):200007===e.base_resp.ret?i.err("该文章留言因违反相关规定被关闭"):(o.handleRet(e,{
id:64462,
key:24,
url:"/misc/appmsgcomment?action=set_can_comment"
}),i.err(e.base_resp.err_msg));
},function(){},function(){
c.$refs.dialog.hide(),c.loading=!1;
});
},
pagechange:function(s){
var e=s.currentPage;
e!==this.page&&(e--,window.location.href="/misc/appmsgcomment?action=list_app_msg&begin=%s&count=%s".sprintf(e*this.count,this.count)+window.commonData.data.param);
}
}
});
t.exports=p;
});