define("common/wx/RichBuddy_tag.js",["common/qq/emoji.js","tpl/RichBuddy/RichBuddyLayout_tag.html.js","tpl/RichBuddy/RichBuddyContent_tag.html.js","tpl/RichBuddy/RichBuddyGroup_tag.html.js","tpl/RichBuddy/RichBuddy_addToBlackList.html.js","widget/rich_buddy.css","common/wx/Tips.js","common/qq/Class.js","common/wx/remark.js","common/wx/popover.js","user/user_cgi_tag.js","user/group_cgi_tag.js","common/qq/events.js","biz_web/ui/checkbox.js","common/wx/inputCounter.js","common/wx/Cgi.js","biz_common/moment.js"],function(e,t,n){
"use strict";
e("common/qq/emoji.js");
var i=e("tpl/RichBuddy/RichBuddyLayout_tag.html.js"),o=e("tpl/RichBuddy/RichBuddyContent_tag.html.js"),s=e("tpl/RichBuddy/RichBuddyGroup_tag.html.js"),d=e("tpl/RichBuddy/RichBuddy_addToBlackList.html.js"),a=template.compile(o),r=(e("widget/rich_buddy.css"),
e("common/wx/Tips.js")),c=e("common/qq/Class.js"),u=(e("common/wx/remark.js"),e("common/qq/emoji.js"),
e("common/wx/popover.js")),m=e("user/user_cgi_tag.js"),_=e("user/group_cgi_tag.js"),h=e("common/qq/events.js"),l=e("biz_web/ui/checkbox.js"),p=e("common/wx/inputCounter.js"),f=e("common/wx/Cgi.js"),g=h(!0),j={},k=[],v=!1,b=!1,x=20,w=5,y=e("biz_common/moment.js"),B=function(e){
var t=e.data.user_info,n=0,i=e.data.uid,o=e.data.$dom,d=function(e){
var t=$(e.target);
if("checked"===t.attr("checked"))h.find(".js_tag_putOn_maxTips").hide(),n--,j.find('input[type="checkbox"]').checkbox().setall(!0);else if(n===x){
h.find(".js_tag_putOn_maxTips").show(),h.find(".jsPopOverContent").scrollTop(1e3);
var i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey=27826_10_1",e.preventDefault(),$(e.target).removeAttr("checked").parent().removeClass("selected");
}else h.find(".js_tag_putOn_maxTips").hide(),n++;
},a=function(){
for(var e=[],i=0;i<k.length;i++)k[i].group_id>0&&e.push({
name:O(k[i].group_name),
cnt:k[i].group_cnt,
create_time:k[i].group_create_time,
id:k[i].group_id
});
j.empty();
for(var i=0;i<e.length;i++)e[i].name&&e[i].name.length>0&&1!=e[i].id&&new l({
container:j,
label:e[i].name,
name:e[i].id,
type:"checkbox"
});
j.find('input[type="checkbox"]').each(function(){
$(this).val($(this).attr("name"));
}).on("click",d).checkbox();
for(var o=t.user_group_id,i=0;i<o.length;i++)j.find('input[name="'+o[i]+'"]').trigger("click");
n=o.length;
},r=function(n){
for(var o=function(){
wx&&wx.renderPage&&wx.renderPage(),c.remove(),e.data.self.hide(),$(".rich_buddy").fadeOut();
},s=j.find('input[type="checkbox"]').checkbox(),d=s.values(),a=t.user_group_id,r=[],u=[],_=0;_<a[_];_++)a[_]=a[_].toString();
for(var _=0;_<a.length;_++)-1===d.indexOf(a[_])&&r.push(a[_]);
for(var _=0;_<d.length;_++)-1===a.indexOf(d[_])&&u.push(d[_]);
if(u.length>w||r.length>w)return h.find(".js_tag_putOn_maxTips").text("每次同时更改标签数量不能超过5个").show(),
h.find(".jsPopOverContent").scrollTop(1e3),void n.btn(!0);
if(s.setall(!1),0===r.length){
if(0===u.length)return wx&&wx.renderPage&&wx.renderPage(),c.remove(),e.data.self.hide(),
void $(".rich_buddy").fadeOut();
m.add_tag(i,u.join("|"),e.data.scene,o,c);
}else 0===u.length?m.del_tag(i,r.join("|"),o,c):m.del_tag(i,r.join("|"),function(){
m.add_tag(i,u.join("|"),e.data.scene,o);
},c);
},c=new u({
dom:o,
className:"tag_popover",
content:s,
hideIfBlur:!0,
isToggle:!0,
buttons:[{
text:"确定",
click:function(){
h.find(".btn_primary").btn(!1).off(),f.off("click"),r(h.find(".btn_primary"));
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onShow:function(){
v=!0;
},
onHide:function(){
v=!1,this.remove(),e.data.self.hide();
}
}),h=c.$pop,f=h.find(".js_tag_putOn_add_btn"),g=h.find(".js_tag_input_wrap"),j=h.find(".js_tag_putOn_tags"),b=h.find(".js_tag_putOn_add_input"),y=h.find(".js_tag_putOn_add_a"),B=h.find(".js_tag_putOn_cancel_a"),R=h.find(".js_tag_putOn_tips"),T=(a(j),
new p(b,{
maxLength:6,
showCounter:!0,
useGBKLength:!0,
GBKBased:!0
}));
h.find(".js_counter").hide(),f.on("click",function(){
$(this).hide(),g.show(),b.enable().val(""),R.hide(),b.focus().trigger("keyup");
}).show(),b.on("keyup",function(){
T.getCount()>6?R.text("不得超过6个汉字或12个字符").show():T.getCount()>0&&R.hide();
}),y.off().on("click",function(){
var e=b.val();
return b.val()?T.getCount()>6?void R.text("不得超过6个汉字或12个字符").show():(b.disable(),
void _.add(e,function(t){
g.hide(),f.show();
var i=new l({
container:j,
label:O(e),
name:t.groupid,
type:"checkbox"
});
i.$input.val(t.add_groupid).on("click",d),x>n&&i.$input.trigger("click"),wx&&wx.renderPage&&wx.renderPage(),
k.push({
group_cnt:0,
group_id:t.add_groupid,
group_name:e
});
},c,!0)):void R.text("请输入标签名称").show();
}),B.click(function(){
f.show(),g.hide(),R.hide();
}),v=!0;
},O=function(e){
return $("<div></div>").text(e).html();
},R=c.declare({
$element:null,
$content:null,
hideTimer:null,
namespace:".RichBuddy",
options:{},
_init:function(){
j={},$(".rich_buddy").remove();
var e=function(e,t){
for(var n="",i=0,o=0;o<t.length;o++)-1!=e.user_group_id.indexOf(t[o].group_id)&&3>i&&(n+='<span class="dib user_tag">'+O(t[o].group_name)+"</span>",
i++);
return n;
},t=this.options.id,n=this;
n._unbindEvent(),n.$element=$(i).appendTo(document.body),n.$content=n.$element.find(".buddyRichContent"),
n.$loading=n.$element.find(".loadingArea"),n._showLoading(),m.getBuddyInfo(t,function(i,o){
if(!i||!i.base_resp)return void r.err("系统出错，请稍后重试");
if(0==i.base_resp.ret){
var s=i.user_list.user_info_list[0];
s.user_name="undefined"==typeof s.user_name?"未关注用户":s.user_name?s.user_name.emoji():"",
s.group_content=e(s,i.group_info.group_info_list),s.group_len=s.user_group_id.length,
void 0===s.user_remark&&(s.hide_group=!0),s.user_remark=O(s.user_remark),-1!=s.user_group_id.indexOf(1)&&(s.is_black=!0),
1==s.user_in_blacklist&&(s.is_black=!0),j[t]=s,k=i.group_info.group_info_list,s.user_head_img=s.user_head_img||"http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiamT5wyGSOdQic96mUmXf8yJypIeHLvw5iaRjO79tyh1iaD42d7YPFnS4jjWb17FgYcf28/0",
s.user_comment_cnt=s.user_comment_cnt,s.user_msg_cnt=s.user_msg_cnt||0,"undefined"!=typeof s.user_reward_money&&(s.user_reward_money=((s.user_reward_money||0)/100).toFixed(2)),
s.user_create_time&&(s.user_create_time=y.unix(s.user_create_time).format("YYYY-MM-DD")),
o==n.options.id&&(n._hideLoading(),n.$content.html(a(s)),n._bindEvent());
}else r.err("系统出错，请稍后重试");
});
},
_showLoading:function(){
this.$loading.show(),this.$content.hide();
},
_hideLoading:function(){
this.$loading.hide(),this.$content.show();
},
_bindEvent:function(){
var e=this,t=this.options,n=j[t.id];
if(n){
this.$element.bind("mouseover"+this.namespace,function(){
clearTimeout(e.hideTimer),e.hideTimer=null,e.$element.show();
}).bind("mouseout"+this.namespace,function(){
e._mouseout();
});
var i=this.$element;
i.find(".js_remarkNameBox").hide(),this.$element.find(".js_changeRemark").bind("click"+this.namespace,function(){
var e,n;
$(this).hide(),i.find(".js_remarkNameBox").show(),i.find(".js_remarkName").text()?(e=i.find(".js_remarkName").text(),
i.find(".js_remarkName_input").val(e),i.find(".js_remarkName_input").select()):i.find(".nickName .frm_label").text()&&(n=i.find(".nickName .frm_label").text().replace(/<span.*<\/span>/,""),
i.find(".js_remarkName_input").val(n),i.find(".js_remarkName_input").select()),i.find(".js_remarkName").hide();
var o=new p(i.find(".js_remarkName_input"),{
maxLength:30,
showCounter:!0
});
i.find(".js_remarkName_input").on("blur",function(){
$(this).unbind();
var n=i.find(".js_remarkName_input").val();
n.length>30?r.err("备注名不能超过30个字"):e!=n?m.change_remark(t.id,n,function(){
g.trigger("Remark:changed",t.id,(n+"").html(!0));
}):r.suc("修改成功"),i.find(".js_remarkName").show(),i.find(".js_changeRemark").show(),
o.$inputBox.hide();
});
}),g.on("Remark:changed",function(t,n){
j[t]&&(j[t].user_remark=n),e.$element.find(".js_remarkName").html(n);
}),this.$element.find(".js_buddy_tags_btn").on("click",{
uid:t.id,
$dom:this.$element.find(".js_buddy_tags_btn"),
user_info:$.extend({},j[e.options.id],!0),
self:this,
scene:2
},B),this.$element.find(".js_popAddToBlackList").click(function(){
var t=$(this);
1==t.data("black")?(new u({
dom:t,
content:"确认移出黑名单？",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
m.del_black(t.data("id"),function(){
location.reload();
}),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onShow:function(){
b=!0;
},
onHide:function(){
b=!1,this.remove(),e.hide();
}
}),b=!0):(new u({
dom:t,
content:d,
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
var n,i=this,o={};
if(e.options&&e.options.listOpt){
n=e.options.listOpt.filterData,n.tmpmsgid=e.options.tmpmsgid,n.fake_id=t.data("id");
for(var s in n)n[s]&&(o[s]=n[s]);
}
console.log(o),m.add_black(t.data("id"),function(){
e.options&&e.options.listOpt&&"message"==e.options.listOpt.refer?f.get({
mask:!1,
url:"message?action=get_msg_count",
data:o
},function(t){
console.log(t),e.options.listOpt.messageCb(t),e.$element.fadeOut();
}):location.reload();
},i._checked,!1,n),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onShow:function(){
var e=this;
this.$pop.find(".js_checkbox").checkbox({
type:"checkbox",
onChanged:function(t){
e._checked=t.prop("checked")?1:0;
}
}),b=!0;
},
onHide:function(){
b=!1,this.remove(),e.hide();
}
}).show(),b=!0);
}),j={};
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
b||v||e.hideTimer||$(".tag_popover").is(":visible")||(e.hideTimer=setTimeout(function(){
!e.$element||v||b||$(".tag_popover").is(":visible")||(e.$element.fadeOut(),e.hideTimer=null);
},1e3));
},
show:function(e){
this.options.id;
e&&(this.options=e),clearTimeout(this.hideTimer),this.hideTimer=null,this._init(),
e.position&&(e.position.top=e.position.top-12,e.position.left=e.position.left-2,
this.$element.css(e.position)),this.$element.show(),v=!1,b=!1;
},
hide:function(){
this._mouseout();
}
});
n.exports=R;
});