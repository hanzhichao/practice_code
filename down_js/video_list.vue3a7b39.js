"use strict";
define("original/video_list.vue.js",["layout/baseui.vue.js","components/tips.vue.js","biz_common/moment.js","utils/cgi.vue.js","components/pagebar.vue.js"],function(i,o,t){
var e=i("layout/baseui.vue.js"),n=i("components/tips.vue.js"),a=i("biz_common/moment.js"),s=i("utils/cgi.vue.js");
i("components/pagebar.vue.js");
var c=new e({
el:"#app",
data:function r(){
var r={
loading:!1
};
Object.keys(window.cgiData).forEach(function(i){
r[i]=window.cgiData[i];
});
for(var i=0;i<r.list.length;i++)r.list[i].time=a.unix(r.list[i].timestamp).format("YYYY-MM-DD");
return r;
},
computed:{
page:function(){
return this.begin/this.count+1;
}
},
methods:{
cancel:function(i){
this.$refs.dialog.show(),this._currenVid=i;
},
dialogClose:function(){
this.$refs.dialog.hide();
},
dialogOK:function(){
var i=this;
this.loading=!0,s.post({
url:"/cgi-bin/ori_video?action=cancel_ori",
data:{
vid:this._currenVid
}
},function(o){
o.base_resp&&0===Number(o.base_resp.ret)?(n.suc("操作成功"),i.$refs.dialog.hide(),1===i.list.length&&0!==i.begin?location.href="/cgi-bin/ori_video?action=get_ori_video_list&begin=%s&offset=%s".sprintf(i.begin-10,i.count)+window.commonData.data.param:location.reload()):(n.err("操作失败，请重试"),
s.handleRet(o,{
id:64462,
key:43,
url:"/cgi-bin/ori_video?action=cancel_ori"
}));
});
},
pagechange:function(i){
var o=i.currentPage;
o!==this.page&&(o--,location.href="/cgi-bin/ori_video?action=get_ori_video_list&begin=%s&offset=%s".sprintf(this.count*o,this.count)+window.commonData.data.param);
}
}
});
t.exports=c;
});