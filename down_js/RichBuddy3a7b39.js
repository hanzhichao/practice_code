define("common/wx/RichBuddy.js",["common/qq/emoji.js","tpl/RichBuddy/RichBuddyLayout.html.js","tpl/RichBuddy/RichBuddyContent.html.js","widget/rich_buddy.css","common/wx/Tips.js","common/qq/Class.js","common/wx/remark.js","common/wx/popover.js","user/user_cgi.js","common/qq/events.js","biz_web/ui/dropdown.js","common/wx/inputCounter.js"],function(e,i,n){
"use strict";
e("common/qq/emoji.js");
var t=e("tpl/RichBuddy/RichBuddyLayout.html.js"),o=e("tpl/RichBuddy/RichBuddyContent.html.js"),s=template.compile(o),a=(e("widget/rich_buddy.css"),
e("common/wx/Tips.js")),r=e("common/qq/Class.js"),d=(e("common/wx/remark.js"),e("common/qq/emoji.js"),
e("common/wx/popover.js")),m=e("user/user_cgi.js"),u=e("common/qq/events.js"),h=e("biz_web/ui/dropdown.js"),c=e("common/wx/inputCounter.js"),p=u(!0),l={},_=r.declare({
init:function(e){
e&&(this._init_opts=$.extend(!0,this._init_opts,e));
},
$element:null,
$content:null,
hideTimer:null,
namespace:".RichBuddy",
options:{},
_init_opts:{
hideGroup:!1,
data:void 0,
autoRefresh:!1
},
_init:function(){
{
var e,i=this.options,n=this,o=i.fakeId;
i.position;
}
this._unbindEvent(),this.$element||(this.$element=$(t).appendTo(document.body)),
this.$content=this.$element.find(".buddyRichContent"),this.$loading=this.$element.find(".loadingArea"),
"object"==typeof this._init_opts.data&&null!==this._init_opts.data&&(l=this._init_opts.data),
l[o]?(e=l[o],n._init_opts.hideGroup=!e.groups||0==e.groups.length&&1!==e.group_id,
this.$content.html(s(e)),this._hideLoading(),this._bindEvent()):(this._showLoading(),
"undefined"!=typeof i.tmpmsgid&&(console.log("setTemp"),m.setTempMsgid(i.tmpmsgid)),
m.getBuddyInfo(o,function(e){
if(!e||!e.base_resp)return void a.err("系统出错，请稍后重试！");
if(0==e.base_resp.ret){
var t=e.contact_info;
e.groups?(n._init_opts.hideGroup=!1,t.groups=e.groups.groups):(t.groups=[],n._init_opts.hideGroup=!0),
1==t.group_id&&1==e.contact_info.group_id&&(n._init_opts.hideGroup=!1),e=t;
for(var r in e)"string"==typeof e[r]&&(e[r]=e[r].replace(/&nbsp;/gi," "));
e.nick_name=e.nick_name.emoji(),e.fake_id&&(l[o]=e),e.fake_id==i.fakeId&&(n._hideLoading(),
n.$content.html(s(e)),n._bindEvent());
}else switch(+e.base_resp.ret){
case 1:
a.err("该用户已经对您取消关注");
break;

case 2:
break;

case-3:
a.err("会话过期，请重新登录");
break;

default:
a.err("系统出错，请稍后重试！");
}
}));
},
_showLoading:function(){
this.$loading.show(),this.$content.hide();
},
_hideLoading:function(){
this.$loading.hide(),this.$content.show();
},
_bindEvent:function(){
var e=this,i=this.options,n=l[i.fakeId];
if(n){
if(this.$element.bind("mouseover"+this.namespace,function(){
clearTimeout(e.hideTimer),e.hideTimer=null,e.$element.show();
}).bind("mouseout"+this.namespace,function(){
e._mouseout();
}),i.isUserIndex){
var t=this.$element;
t.find(".js_remarkNameBox").hide(),this.$element.find(".js_changeRemark").bind("click"+this.namespace,function(){
var e,n;
$(this).hide(),t.find(".js_remarkNameBox").show(),(e=t.find(".js_remarkName").text())?t.find(".js_remarkName_input").val(e):(n=t.find(".nickName .frm_label").text().replace(/<span.*<\/span>/,""))&&t.find(".js_remarkName_input").val(n),
t.find(".js_remarkName_input").val()&&t.find(".js_remarkName_input").select(),t.find(".js_remarkName").hide();
var o=new c(t.find(".js_remarkName_input"),{
maxLength:30,
showCounter:!0
});
t.find(".js_remarkName_input").on("blur",function(){
$(this).unbind();
var n=t.find(".js_remarkName_input").val();
n.length>30?a.err("备注名不能超过30个字"):e!=n?m.changeRemark(i.fakeId,n,function(){
a.suc("修改成功"),p.trigger("Remark:changed",i.fakeId,(n+"").html(!0));
}):a.suc("修改成功"),t.find(".js_remarkName").show(),t.find(".js_changeRemark").show(),
o.$inputBox.hide();
});
});
}else this.$element.find(".js_remarkNameBox").hide(),this.$element.find(".js_changeRemark").bind("click"+this.namespace,function(){
p.trigger("Remark:change",i.fakeId,n.remark_name);
});
p.on("Remark:changed",function(i,n){
l[i]&&(l[i].remark_name=n),e.$element.find(".js_remarkName").html(n);
}),n.groups||(n.groups=[]);
for(var o,s=[],r=0;r<n.groups.length;r++)"屏蔽组"==n.groups[r].name&&(n.groups[r].name="黑名单"),
"未分组"==n.groups[r].name&&(n.groups[r].name="默认组"),1!=n.groups[r].id&&s.push({
name:n.groups[r].name,
value:n.groups[r].id
}),n.group_id==n.groups[r].id&&(o=n.groups[r].name);
new h({
container:this.$element.find(".js_group"),
label:o||"请选择",
data:s,
callback:function(e){
if(n.group_id!=e){
var t=i.fakeId;
m.changeGroup(t,e,function(){
l[t].GroupID=e,i.autoRefresh&&setTimeout(function(){
location.reload();
},300);
},1);
}
},
search:!1
}),this._init_opts.hideGroup?this.$element.find(".js_group_container").hide():(this.$element.find(".js_group_container").show(),
1==n.group_id?($(".js_pop_group").find(".jsDropdownBt").hide(),$(".js_group_container").on("click",".js_popAddToBlackList",function(){
var e=$(this);
m.changeGroup(e.data("fakeid"),0,function(){
setTimeout(function(){
location.reload();
},1e3);
},1,e.data("gid"));
})):$(".js_group_container").on("click",".js_popAddToBlackList",function(){
var e=$(this);
new d({
dom:e,
content:"加入黑名单后，你将无法接收粉丝发来的消息，且该粉丝无法接收到群发消息。确认加入黑名单？",
place:"bottom",
margin:"center",
hover:!1,
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
m.changeGroup(e.data("fakeid"),1,function(){
setTimeout(function(){
location.reload();
},1e3);
},1,e.data("gid")),this.hide();
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
},
type:"default"
}]
});
}));
}
},
_unbindEvent:function(){
if(this.$element){
var e=this.namespace;
this.$element.find(".js_changeRemark").unbind(e),this.$element.unbind(e),this.$element.stop(),
this.$element.css("opacity",1),this.$element.show();
}
},
_mouseout:function(){
var e=this;
e.hideTimer||(e.hideTimer=setTimeout(function(){
!!e.$element&&e.$element.fadeOut(),e.hideTimer=null;
},1e3));
},
show:function(e){
console.log("show"),console.log(e);
var i=this.options.fakeId;
e&&(this.options=e),clearTimeout(this.hideTimer),this.hideTimer=null,e.fakeId!==i&&this._init(),
this.$element.css(e.position),this.$element.show();
},
hide:function(){
this._mouseout();
}
});
n.exports=_;
});