define("wifi/homemanager_modify/appmsg.js",["wifi/homemanager_modify/utils.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/popup.js"],function(e,t,i){
"use strict";
var s=e("wifi/homemanager_modify/utils.js"),p=(e("biz_web/ui/checkbox.js"),e("common/wx/Cgi.js")),n=e("common/wx/Tips.js"),a=e("common/wx/pagebar.js");
e("common/wx/popup.js");
var c={},o=wx.cgiData,m=[],r=[],_=[];
c._getAppmsgIdx=function(e,t){
for(var i=0;i<e.length;i++)if(e[i].aid==t)return i;
return-1;
},c._initData=function(){
1==o.appmsg.type?(_=o.appmsg.list,r=[],m=[]):(p.post({
url:"/cgi-bin/appmsg?action=list_ex",
data:{
begin:0,
count:3,
type:9
}
},function(e){
if(!e||!e.base_resp||0!=e.base_resp.ret)return n.err("系统错误，请稍后重试"),void that.remove();
var t=Math.min(e.app_msg_list.length,3);
_=e.app_msg_list.splice(0,t);
}),r=o.appmsg.list.slice(),m=o.appmsg.list.slice());
},c._renderEdit=function(){
var e=$(".js_edit_msg_wrap").find("input[type=radio]");
e.checkbox({
multi:!1
});
var t=$(".js_edit_msg_choose");
e.eq(o.appmsg.type).checkbox("checked",!0),2==o.appmsg.type&&t.show(),this._renderEditAppmsgList();
},c._renderView=function(){
var e=$(".js_view_appmsg_wrap").hide(),t=$(".js_view_appmsg_list").empty(),i=$(".js_edit_msg_radio:checked").data("type"),p=[];
0==i&&(p=[]),1==i?p=_:2==i&&(p=m),p.length>0&&(e.show(),$.each(p,function(e,i){
i.date=s.getDateStr(i.update_time),$($.trim(wx.T($("#tpl_view_appmsg_item").html(),i))).appendTo(t);
}));
},c._renderEditAppmsgList=function(){
var e=this,t=$(".js_edit_msg_list").empty();
$.each(m,function(e,i){
$($.trim(wx.T($("#tpl_appmsg_list_item").html(),i))).appendTo(t);
}),t.find(".js_edit_msg_item_del").click(function(){
var t=$(this).data("aid"),i=e._getAppmsgIdx(m,t);
-1!==i&&(m.splice(i,1),e._renderView(),$(this).parent().remove());
});
},c._bindEvent=function(){
var e=this,t=$(".js_edit_msg_wrap").find("input[type=radio]"),i=$(".js_edit_msg_choose");
t.on("change",function(){
t.filter("[data-type=2]").is(":checked")?i.show():i.hide(),e._renderView();
}),$(".js_edit_msg_choose_btn").click(function(){
var t,i=function(i){
p.post({
url:"/cgi-bin/appmsg?action=list_ex",
data:{
begin:i,
count:5,
type:9
}
},function(i){
if(_.popup("resetPosition"),!i||!i.base_resp||0!=i.base_resp.ret)return n.err("系统错误，请稍后重试"),
void e.remove();
var p=_.find(".js_list").empty();
$.each(i.app_msg_list,function(e,t){
t.idx=e,t.date=s.getDateStr(t.update_time),$($.trim(wx.T($("#tpl_appmsg_item").html(),t))).appendTo(p);
}),c(p.find("input[type=checkbox]"),i.app_msg_list),t||o(i.app_msg_cnt);
});
},c=function(t,i){
t.checkbox(),$.each(t,function(t,i){
-1!==e._getAppmsgIdx(r,$(i).data("aid"))&&$(i).attr("checked",!0).checkbox("checked",!0);
}),t.on("change",function(){
if($(this).is(":checked")){
if(r.length>=s.MAX_APPMSG_NUM)return n.err("最多选择3篇图文消息"),$(this).attr("checked",!1).checkbox("checked",!1),
!1;
r.push(i[$(this).data("idx")]);
}else{
var t=e._getAppmsgIdx(r,$(this).data("aid"));
-1!==t&&r.splice(t,1);
}
});
},o=function(e){
t=new a({
container:_.find(".js_page"),
perPage:5,
totalItemsNum:e,
initShowPage:1,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
i(e-1);
}
});
},_=$("#tpl_appmsg").popup({
title:"选择图文消息",
buttons:[{
text:"确定",
click:function(){
m=r.slice(),e._renderEditAppmsgList(),e._renderView(),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}],
onShow:function(){
r=m.slice(),i(0);
}
});
});
},c.getData=function(){
var e=$(".js_edit_msg_radio:checked").data("type"),t={
choice_appmsg:{
type:e
}
};
if(2==e){
var i=[];
$.each(m,function(e,t){
i.push({
app_msg_key:{
appmsgid:t.appmsgid,
idx:t.itemidx
}
});
}),t.choice_appmsg.appmsg_items=i;
}
return s.makeData(t);
},c.init=function(){
this._initData(),this._renderEdit(),this._bindEvent(),this._renderView();
},i.exports=c;
});