"use strict";
define("original/img_list.vue.js",["layout/baseui.vue.js","utils/cgi.vue.js","components/tips.vue.js","biz_common/moment.js","components/pagebar.vue.js","components/imgpreview.vue.js"],function(i,e,t){
var n=i("layout/baseui.vue.js"),o=i("utils/cgi.vue.js"),a=i("components/tips.vue.js"),s=i("biz_common/moment.js");
i("components/pagebar.vue.js"),i("components/imgpreview.vue.js");
var r=new n({
el:"#app",
data:function c(){
var c={
loading:!1,
imgs:[]
},i=window.cgiData.data||{},e=i.list||[];
c.list=e,c.count=window.cgiData.count,c.begin=window.cgiData.begin,c.totalNum=i.total_num;
for(var t=0;t<e.length;++t){
var n=e[t];
n.encodeurl=window.encodeURIComponent(n.url),n.createTimeStr=s.unix(n.create_time).format("YYYY-MM-DD"),
n.title=n.title.html(!0),c.imgs.push(n.url);
}
return c;
},
computed:{
page:function(){
return this.begin;
}
},
methods:{
previewImgs:function(i){
this.$refs.imgpreview.setCurIdx(i),this.$refs.imgpreview.show();
},
cancel:function(i){
this.$refs.dialog.show(),this._currenUrl=i;
},
dialogClose:function(){
this.$refs.dialog.hide();
},
dialogOK:function(){
var i=this;
this.loading=!0,o.post({
url:"/cgi-bin/imgcopyright?action=cancel_orginal",
data:{
img_url:this._currenUrl
}
},function(e){
e.base_resp&&0===Number(e.base_resp.ret)?(a.suc("操作成功"),i.dialog=!1,1===i.list.length&&0!==i.begin?location.href="/cgi-bin/imgcopyright?action=original&begin=%s&count=%s".sprintf(i.begin-1,i.count)+window.commonData.data.param:location.reload(!0)):(o.handleRet(e,{
id:64462,
key:35,
url:"/cgi-bin/imgcopyright?action=cancel_orginal"
}),a.err("操作失败，请重试"));
});
},
pagechange:function(i){
var e=i.currentPage;
e!==this.page&&(location.href="/cgi-bin/imgcopyright?action=original&begin=%s&count=%s".sprintf(e,this.count)+window.commonData.data.param);
}
}
});
t.exports=r;
});