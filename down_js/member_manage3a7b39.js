define("cardticket/member_manage.js",["biz_web/ui/input/lentips.js","common/wx/pagebar.js","biz_common/moment.js","common/wx/popover.js","biz_web/ui/checkbox.js","cardticket/member_manage/member_cgi.js","tpl/cardticket/member_manage/member_tag.html.js","tpl/cardticket/member_manage/member_tag_pop.html.js","common/wx/Tips.js","common/qq/events.js","common/qq/queryString.js","common/wx/report_util.js","cardticket/member_manage/add_tag_to_user.js","cardticket/common_init.js","cardticket/topmenu.js"],function(t){
"use strict";
function e(){
$("#js_member_list").find(".js_checkbox:checked").length?$(js_add_tags).removeClass("btn_disabled").addClass("btn_default"):$(js_add_tags).addClass("btn_disabled").removeClass("btn_default");
}
var a=t("biz_web/ui/input/lentips.js"),i=(t("common/wx/pagebar.js"),t("biz_common/moment.js")),n=t("common/wx/popover.js"),r=wx.cgiData,s=(t("biz_web/ui/checkbox.js"),
t("cardticket/member_manage/member_cgi.js")),o=(t("tpl/cardticket/member_manage/member_tag.html.js"),
t("tpl/cardticket/member_manage/member_tag_pop.html.js"),t("common/wx/Tips.js")),_=r.tags||[],c=t("common/qq/events.js"),m=c(!0),l=r.userlist.total,d=t("common/wx/popover.js"),u=r.userlist.datas;
$("#js_status_help_area").hover(function(){
new d({
content:$("#t_help_tpl").html(),
dom:$("#js_status_help_area"),
hover:!0
});
}),$("#js_tags_tips").hover(function(){
new d({
content:$("#t_tags_tpl").html(),
dom:$("#js_tags_tips"),
hover:!0
});
}),template.helper("member_format_time",function(t){
return i.unix(1*t).format("YYYY-MM-DD HH:mm");
}),$.each(u,function(t,e){
e.user_card_id=encodeURIComponent(e.user_card_id);
}),$.each(wx.cgiData.tags_list.datas,function(t,e){
e.name=e.name.html(!1);
}),$("#js_member_list").html(wx.T($("#t_member_list").html(),{
userlist:u,
token:wx.data.t
}));
var p=$("#js_member_list").find(".js_checkbox").checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
1*this.values()[0];
e();
}
}),g=($("#js_total_select_member").find(".frm_checkbox").checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
var t=1*this.values()[0];
p.checked("1"==t),e();
}
}),t("common/qq/queryString.js")),f=new g,h=t("common/wx/report_util.js");
!function(){
function t(t){
var e=$.trim($("#js_keyword").val());
(!t||t&&wx.isHotkey(t,"enter"))&&e&&(location.href=wx.url("/merchant/membercardmgr?action=search_user&keyword=%s".sprintf(encodeURIComponent(e))));
}
var e="YYYY-MM-DD";
$("#js_keyword").keyup(function(e){
t(e);
}).val(wx.cgiData.keyword.html(!1).html(!1)),$("#js_search").click(function(){
window.report_click_ele&&window.report_click_ele(this),t();
}),$(".js_clear_keyword").click(function(){
location.href=wx.url("/merchant/membercardmgr?action=user_list");
}),$(".js_typeSelect").click(function(){
var t=parseInt($(this).attr("type"));
if(t){
var a=i().unix(),n=i().add("d",-t+1);
n=i(n.format(e),e).unix();
var s=wx.url("/merchant/membercardmgr?action=user_list&upper_valid_time=%s&lower_valid_time=%s".sprintf(a,n));
r.tags&&(s+="&tags="+r.tags.join(",")),location.href=s;
}
});
var a=86400,n=r.upper_valid_time-r.lower_valid_time,s=parseInt(n/a)+(n%a>0?1:0);
$(".js_typeSelect[type="+s+"]").parent().addClass("selected"),h.initDateRange({
begintime:r.lower_valid_time?i.unix(r.lower_valid_time).format(e):i().format(e),
endtime:r.upper_valid_time?i.unix(r.upper_valid_time).format(e):i().add("d",-6).format(e),
dateDom:$("#js_begin_time_container"),
isTodayValid:!0,
showUnlimit:!0,
callback:function(t,a){
var n=i(t,e).unix(),s=i(a,e).add("d",1).unix()-1,o=wx.url("/merchant/membercardmgr?action=user_list&upper_valid_time=%s&lower_valid_time=%s".sprintf(s,n));
r.tags&&(o+="&tags="+r.tags.join(",")),window.report_click&&window.report_click(6011),
location.href=o;
}
}),$("#js_clear_time").click(function(){
location.href=wx.url("/merchant/membercardmgr?action=user_list");
});
}(),function(){
var t=$("#js_prev_page"),e=$("#js_next_page");
if(!(u.length<=0)){
var a="search_user"==r.action;
a&&(r.userlist.has_next=r.userlist.total>r.begin+r.count,r.userlist.has_prev=r.begin>=r.count),
!!r.userlist.has_prev&&t.show(),!!r.userlist.has_next&&e.show();
var i=u[0].paging_update_time,n=u[0].fakeid,s=u[u.length-1].paging_update_time,o=u[u.length-1].fakeid;
t.click(function(){
if("user_list"==r.action){
var t=wx.url("/merchant/membercardmgr?action=user_list&t=cardticket/member_manage&last_user_uin=%s&last_update_time=%s&up_or_down=0&count=10&tags=%s".sprintf(n,i,_.join("|")));
r.lower_valid_time&&(t+="&lower_valid_time="+r.lower_valid_time),r.upper_valid_time&&(t+="&upper_valid_time="+r.upper_valid_time),
location.href=t;
}else location.href=f.replace("begin",Math.max(r.begin-r.count,0)).getUrl();
}),e.click(function(){
if("user_list"==r.action){
var t=wx.url("/merchant/membercardmgr?action=user_list&t=cardticket/member_manage&last_user_uin=%s&last_update_time=%s&up_or_down=1&count=10&tags=%s".sprintf(o,s,_.join("|")));
r.lower_valid_time&&(t+="&lower_valid_time="+r.lower_valid_time),r.upper_valid_time&&(t+="&upper_valid_time="+r.upper_valid_time),
location.href=t;
}else location.href=f.replace("begin",r.begin+r.count).getUrl();
});
}
}(),function(){
function e(t){
return r.userlist.datas[t];
}
var i=(r.up_or_down||"",r.last_user_uin||"",r.last_update_time||"",$("#js_tag_list")),_=$("#js_add_tag"),c=$(".js_modify_tag"),d=$(".js_delete_tag"),u={},g=r.tags_list.datas,f=[];
$.each(g,function(t,e){
u[e.name.html(!1)]=!0,0!=e.type||f.push(e);
}),r.tags_list.datas=f,g=f,i.append(template.render("js_tag_list_item_tpl",{
tags_list:f,
show_count:!0,
total_user:l,
show_total:!0
}));
var h=function(t){
g.splice(0,0,t),i.find(".js_tag_item").first().before(template.render("js_tag_list_item_tpl",{
tags_list:[t],
show_count:!0,
total_user:l
})),m.trigger("afterAddTag",g,t),o.suc("新建标签成功");
},b=function(t,e){
for(var a=0;a<g.length;a++)if(g[a].id==t){
g[a].name=e;
break;
}
var i=$("#js_tag_id_"+t);
i.find(".js_tag_name_content").text(e),o.suc("修改标签成功");
},j=function(t,e){
var a=t.data("id"),i=(t.data("name")+"").html(!1),n=$.trim(t.val());
return i!=n&&u[n]?(o.err("该标签名已存在，请勿创建重复标签"),t.focus(),!1):!a&&g.length>=50?(o.err("你的标签数量已达上限50个，请管理现有标签或删除后再添加"),
!1):!n||n.length>6?((a||n.length>6)&&(o.err("标签必须为1-6个字"),t.focus()),!1):a||i!=n?(t.attr("disabled",!0),
s.renameTag({
tag_id:a,
tag_name:n
},function(r){
if(console.log(r),u[i]=!1,u[n]=!0,t.keyup(),a)t.data("name",n.html(!0)),b(a,n);else{
t.val("");
var s=r.add_card_tag.tag;
h(s);
}
!!e&&e(a,n);
},function(){
o.err("系统繁忙，请重新编辑"),t.focus();
},function(){
t.attr("disabled",!1);
}),!0):!1;
};
i.on("click",".js_tag_item",function(){
var t=$(this),e=t.data("id");
return window.report_click_ele&&window.report_click_ele(this),location.href=wx.url("/merchant/membercardmgr?action=user_list&tags=%s".sprintf(e)),
!1;
}),d.on("click",function(){
var t=$(this),e=t.data("id"),a=(t.data("name")+"").html(!1);
$(".popover").hide(),new n({
dom:this,
content:"删除标签后，该标签下的所有用户将失去标签属性。是否确定删除？",
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
{
var i=this;
i.$pop.find(".jsPopoverBt").eq(0).btn(!1);
}
t.parent().hide(),i.remove(),u[a]=!1,s.delTag(e,function(){
location.href=wx.url("/merchant/membercardmgr?action=user_list");
},function(){
t.parent().show(),u[a]=!0;
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
var v=new n({
dom:_,
hideIfBlur:!0,
content:'<label for="" class="frm_label">标签名称</label><div class="frm_input_box with_counter counter_in append"><input type="text" class="frm_input" placeholder="" id="js_add_tag_input"><span class="frm_input_append frm_counter" id="js_add_tag_input_len">0/6</span></div>',
place:"bottom",
margin:"center",
className:"pop_new_tag",
buttons:[{
text:"确定",
click:function(){
var t=this;
j(w,function(){
t.hide();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onShow:function(){
this.resetPosition();
}
});
v.hide();
var w=$("#js_add_tag_input");
new a({
input:w,
tip:$("#js_add_tag_input_len"),
maxlimit:6,
trim:!0,
className:"txt_hint",
callback:function(){}
}),_.on("click",function(){
v.show();
});
var k=$("#js_add_tags"),x=t("cardticket/member_manage/add_tag_to_user.js");
k.click(function(){
var t=$("#js_member_list").find(".js_checkbox:checked"),a=[];
if(!t.length)return!1;
var i=!1;
1==t.length&&(i=!0),t.each(function(t){
var i=$(this).attr("data-idx"),n=e(i),r=n.tag_page.datas;
if(0==t)a=r.concat();else for(var s=r.map(function(t){
return t.id;
}),o=0;o<a.length;)$.inArray(a[o].id,s)<0?a.splice(o,1):o++;
}),new x({
tags_list:r.tags_list.datas,
selected_tags:a,
can_modify:i,
container:k,
onsubmit:function(t,e){
var a=p.values();
return!a||a.length<=0?(o.err("至少选择一个会员"),!1):void(i?s.batchModifyUsersTags({
user_uin:a[0],
del_tag_ids:e.join("|"),
add_tag_ids:t.join("|")
},function(){
o.suc("修改成功"),location.reload();
}):s.batchAddUsersTags({
user_uins:a.join("|"),
new_tag_ids:t.join("|")
},function(){
o.suc("修改成功"),location.reload();
}));
},
on_add_tag:function(t){
h(t);
}
});
}),$("#js_member_list").on("click",".js_member_tags",function(){
var t=$(this).data("idx"),a=e(t);
a&&new x({
tags_list:r.tags_list.datas,
selected_tags:a.tag_page.datas,
can_modify:!0,
container:this,
onsubmit:function(t,e){
s.batchModifyUsersTags({
user_uin:a.fakeid,
del_tag_ids:e.join("|"),
add_tag_ids:t.join("|")
},function(){
o.suc("修改成功"),location.reload();
});
},
on_add_tag:function(t){
h(t);
}
});
});
for(var y="",q=0;q<g.length;q++)if(g[q].id==r.tags){
y=g[q].name.html(!1);
break;
}
if(y){
$("#js_current_tag_name").text(y);
var C=new n({
dom:c,
hideIfBlur:!0,
content:template.compile('<label for="" class="frm_label">标签名称</label><div class="frm_input_box with_counter counter_in append"><input type="text" data-id="{id}" data-name="{tag_name}" class="frm_input" placeholder="" id="js_modify_tag_input"><span class="frm_input_append frm_counter" id="js_modify_tag_input_len">0/6</span></div>')({
tag_name:y,
id:r.tags[0]
}),
place:"bottom",
margin:"center",
className:"pop_new_tag",
buttons:[{
text:"确定",
click:function(){
var t=this;
j(T,function(e,a){
y=a,$("#js_current_tag_name").text(y),t.hide();
});
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onShow:function(){
this.$pop.find("#js_modify_tag_input_len").html(y.length+" <em>/</em> 6"),T.val(y).keyup(),
this.resetPosition();
}
});
C.hide();
var T=$("#js_modify_tag_input");
new a({
input:T,
tip:$("#js_modify_tag_input_len"),
maxlimit:6,
trim:!0,
className:"txt_hint",
callback:function(){}
}),c.click(function(){
C.show();
});
}
}(),t("cardticket/common_init.js"),t("cardticket/topmenu.js").selected("cardmgr_member");
});