"use strict";
define("services/kf_public_text.vue.js",["layout/baseui.vue.js","utils/cgi.vue.js","components/tips.vue.js","components/popover.vue.js"],function(t,e,s){
var i=t("layout/baseui.vue.js"),o=t("utils/cgi.vue.js"),a=t("components/tips.vue.js");
t("components/popover.vue.js");
var p=new i({
el:"#app",
data:function d(){
var d={
tabs:[{
id:"account",
name:"账号管理",
url:"/misc/kf?t=services/list&action=list",
acl:1
},{
id:"state",
name:"客服数据",
url:"/misc/kf?t=services/kf_stat&action=getstatpage",
acl:1
},{
id:"media",
name:"客服素材",
url:"/misc/kf?t=services/kf-public-text&action=publicreplypage",
acl:1
}],
tab:"media",
addPopup:{
popup:!1,
loading:!1,
text:"",
errText:"",
seq:window.cgiData.maxSeq+1
},
delPopover:{
seenIndex:-1,
loading:!1
},
leftCount:20-window.cgiData.lists.length,
lists:window.cgiData.lists,
listEmpty:0===window.cgiData.lists.length?!0:!1,
maxSeq:window.cgiData.maxSeq+1
};
return d;
},
computed:{
wordLength:function(){
return this.addPopup.text.length;
}
},
methods:{
addNew:function(){
this.addPopup.text="",this.addPopup.seq=this.maxSeq,this.$refs.popup.show();
},
addPopupClose:function(){
this.$refs.popup.hide(),this.addPopup.loading=!1;
},
editHandler:function(t){
this.addPopup.text=this.lists[t].content,this.addPopup.seq=this.lists[t].seq,this.$refs.popup.show();
},
delHandler:function(t){
this.$refs.popover[t].show();
},
closePopover:function(t){
this.$refs.popover[t].hide();
},
delSubmit:function(t){
var e={
url:"/misc/kf?action=bizdelfastreply",
data:{
seq:this.lists[t].seq
}
},s=this;
this.delPopover.loading||(this.delPopover.loading=!0,o.post(e,function(e){
return s.delPopover.loading=!1,0!==e.base_resp.ret?void a.err("系统错误，请稍后再试"):(a.suc("删除成功"),
s.lists.splice(t,1),void s.$refs.popover[t].hide());
}));
},
addSubmit:function(){
var t={};
t=this.addPopup.seq===this.maxSeq?{
url:"/misc/kf?action=bizaddfastreply",
data:{
msgtype:1,
content:this.addPopup.text
}
}:{
url:"/misc/kf?action=bizsetfastreply",
data:{
seq:this.addPopup.seq,
content:this.addPopup.text
}
};
var e=this;
this.addPopup.loading||(this.addPopup.loading=!0,o.post(t,function(s){
if(e.addPopup.loading=!1,0!==s.base_resp.ret)return a.err("系统错误，请稍后再试"),!1;
if(a.suc("操作成功"),t.data.seq===e.maxSeq)e.maxSeq+=1,e.lists.push(t.data);else for(var i=0;i<e.lists.length;i++)e.lists[i].seq===t.data.seq&&(e.lists[i].content=t.data.content);
e.$refs.popup.hide();
}),this.addPopup.popup=!1);
}
}
});
s.exports=p;
});