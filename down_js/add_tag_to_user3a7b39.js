define("cardticket/member_manage/add_tag_to_user.js",["common/wx/popover.js","common/qq/events.js","cardticket/member_manage/member_cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js"],function(t){
"use strict";
function a(t){
var a=new e({
dom:$(t.container),
hideIfBlur:!0,
content:'<div class="tag_list pop_tag_list js_batch_tag_list"></div><div class="pop_add_tag_wrp"><a href="javascript:;" class="pop_add_tag js_add_tag_start" data-actionid="6015">新建标签</a><div class="pop_add_tag_from js_add_tag_container"><span class="frm_input_box"><input type="text" class="frm_input js_add_tag_input"></span> <a href="javascript:;" class="js_submit_add">添加</a><a class="js_cancel_add" href="javascript:;">取消</a></div>',
place:"bottom",
margin:"center",
className:"popover_tag",
buttons:[{
text:"确定",
click:function(){
var a=this;
a.hide();
var e=s.find(".js_select_tag_check").checkbox().values();
if(!t.can_modify&&e.length<=0)return n.err("至少选择一个标签"),!1;
var c=t.selected_tags||[],i=[],_=[],d=[];
c.each(function(t){
i.push(t.id+"");
});
for(var o=0;o<e.length;o++)$.inArray(e[o],i)<0&&_.push(e[o]);
for(var o=0;o<i.length;o++)$.inArray(i[o],e)<0&&d.push(i[o]);
t.onsubmit&&t.onsubmit(_,d);
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
},
onHide:function(){
this.remove(),i.off("afterAddTag");
}
}),s=a.$pop.find(".js_batch_tag_list"),_="{each tags_list as tag}<label class='checkbox'>                        <i class='icon_checkbox'></i>                         <span class='lbl_content'>{tag.name}</span>                        <input {$tag_is_checked tag.id selected_tags} class='checkbox js_select_tag_check' value='{tag.id}' type='checkbox'>                        </label>{/each}",d=function(a){
var e=$(template.compile(_)({
tags_list:a,
selected_tags:t.selected_tags
})),c=e.find(".js_select_tag_check").checkbox();
t.can_modify||c.disable(t.selected_tags.map(function(t){
return t.id+"";
})),s.html("").append(e);
};
i.on("afterAddTag",function(t,a){
var e=$(template.compile(_)({
tags_list:[a],
selected_tags:[a]
}));
e.find(".js_select_tag_check").checkbox(),s.prepend(e);
}),d(t.tags_list);
var o=a.$pop,r=o.find(".js_add_tag_start"),l=o.find(".js_add_tag_input"),g=o.find(".js_add_tag_container");
r.click(function(){
$(this).hide(),g.show();
}),o.find(".js_cancel_add").click(function(){
g.hide(),r.show();
}),o.find(".js_submit_add").click(function(){
f(l,function(a){
g.hide(),r.show(),t.on_add_tag&&t.on_add_tag(a);
});
});
for(var m={},h=0;h<t.tags_list.length;h++)m[t.tags_list[h].name]=!0;
var f=function(a,e){
var s=a.data("id"),i=(a.data("name")+"").html(!1),_=$.trim(a.val());
return i!=_&&m[_]?(n.err("该标签名已存在，请勿创建重复标签"),a.focus(),!1):!s&&t.tags_list.length>=50?(n.err("你的标签数量已达上限50个，请管理现有标签或删除后再添加"),
!1):!_||_.length>6?((s||_.length>6)&&(n.err("标签必须为1-6个字"),a.focus()),!1):s||i!=_?(a.attr("disabled",!0),
c.renameTag({
tag_id:s,
tag_name:_
},function(t){
if(console.log(t),m[i]=!1,m[_]=!0,s)a.data("name",_.html(!0));else{
a.val("");
var c=t.add_card_tag.tag;
n.suc("新建标签成功"),!!e&&e(c);
}
},function(){
n.err("系统繁忙，请重新编辑"),a.focus();
},function(){
a.attr("disabled",!1);
}),!0):!1;
};
}
var e=t("common/wx/popover.js"),s=t("common/qq/events.js"),c=t("cardticket/member_manage/member_cgi.js"),n=t("common/wx/Tips.js"),i=s(!0);
return t("biz_web/ui/checkbox.js"),template.helper("$tag_is_checked",function(t,a){
if(!a)return"";
for(var e=0;e<a.length;e++)if(a[e].id==t)return"checked";
return"";
}),a;
});