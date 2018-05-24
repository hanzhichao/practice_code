define("cardticket/member_profile.js",["cardticket/member_manage/member_cgi.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js","common/qq/events.js","cardticket/common_template_helper.js","tpl/cardticket/card_use_record_detail.html.js","biz_web/ui/dropdown.js","tpl/cardticket/member_manage/member_tag.html.js","cardticket/topmenu.js","cardticket/member_manage/add_tag_to_user.js","cardticket/common_init.js"],function(e){
"use strict";
function t(e){
if("number"!=typeof e||0==e)return 0;
for(var t=1;1!=e;)e>>=1,t++;
return t;
}
var a=wx.cgiData.user_detail,r=a.fakeid,i=e("cardticket/member_manage/member_cgi.js"),n=e("common/wx/Tips.js"),o=e("common/wx/pagebar.js"),s=e("common/wx/Cgi.js"),_=e("common/qq/events.js"),c=_(!0),d=(e("cardticket/common_template_helper.js"),
e("tpl/cardticket/card_use_record_detail.html.js")),m=(e("biz_web/ui/dropdown.js"),
e("tpl/cardticket/member_manage/member_tag.html.js"));
e("cardticket/topmenu.js").selected("cardmgr_member");
for(var l=[],u=[{
name:"自定义字段",
sort_prop:1e4
},{
name:"手机",
sort_prop:1
},{
name:"性别",
sort_prop:2
},{
name:"地区",
sort_prop:11
},{
name:"生日",
sort_prop:3
},{
name:"身份证",
sort_prop:6
},{
name:"邮箱",
sort_prop:5
},{
name:"详细地址",
sort_prop:4
},{
name:"学历",
sort_prop:7
},{
name:"职位",
sort_prop:12
},{
name:"行业",
sort_prop:8
},{
name:"年收入",
sort_prop:9
},{
name:"爱好",
sort_prop:10
},{
name:"姓名",
sort_prop:0
}],p=wx.cgiData.fields||[],f=(u.length,0),g=p.list.length;g>f;++f){
var h=p.list[f],j=h.info_flag,w=t(j);
if(w>=0&&u[w]){
var k=u[w];
l.push({
name:0==w?h.field_name:k.name,
sort_prop:k.sort_prop,
value:h.value
});
}
1==j?a.hide_tel=!0:4096==j&&(a.hide_name=!0);
}
l.sort(function(e,t){
return e.sort_prop<=t.sort_prop?-1:1;
}),a.fields_info=l,a.card_list=wx.cgiData.card_list,$("#js_main_container").html(template.render("js_main_container_tpl",wx.cgiData));
var v=$("#js_main_container"),b=v.find(".js_modify_remark"),x=v.find(".js_remarkname"),T=v.find(".js_mod_remark"),y=v.find(".js_mod_remark_sure"),D=v.find(".js_mod_remark_input"),q=v.find(".js_mod_remark_cancel");
b.click(function(){
D.val(a.remark),T.show(),$(this).hide();
}),y.click(function(){
var e=$.trim(D.val());
return!e||e.length>10?(n.err("备注名必须为1-10个字"),D.focus(),!1):void i.modRemark({
user_uin:a.fakeid,
remark:e
},function(){
a.remark=e,x.text("("+e+")").show(),T.hide(),b.show();
},function(){
D.focus(),n.err("修改备注名失败，请稍后重试");
});
}),q.click(function(){
T.hide(),b.show(),x.show();
});
var N=v.find(".js_tag_list"),P=v.find(".js_add_tag"),S=v.find(".js_add_tag_input"),U=v.find(".js_ic_check"),z={},A=a.tag_page.datas,C=A.length;
$.each(A,function(e,t){
z[t.name.html(!1)]=!0;
});
var I=[];
A.reverse(),$.each(A,function(e,t){
0!=t.type?I.splice(0,0,t):I.push(t);
}),N.append(wx.T(m,{
showdel:!0,
tags_list:I
})),N.find(".js_tag_name_count").hide(),N.find(".js_del_tag").show(),P.click(function(){
P.find(".ic_add").hide(),P.find(".js_add_tag_word").hide(),U.show(),S.show().focus();
}),U.click(function(){
var e=S,t=(e.data("name")+"").html(!1),a=$.trim(e.val());
return C>=50?(n.err("用户的标签数量已达上限50个，请删除后再添加"),!1):z[a]?(n.err("该标签名已存在，请勿创建重复标签"),
e.focus(),!1):!a||a.length>6?(n.err("标签必须为1-6个字"),e.focus(),!1):(e.attr("disabled",!0),
void i.addUserTag({
user_uin:r,
tag_name:a
},function(r){
console.log(r),z[t]=!1,z[a]=!0,e.val(""),C++;
var i=r.add_user_tag.tag,n=$($.trim(wx.T(m,{
showdel:!0,
tags_list:[{
id:i.id,
name:i.name
}]
})));
n.insertAfter(N.find(".js_add_tag")),n.find(".js_del_tag").show();
},function(t){
var a=t.base_resp.ret;
switch(a){
case 154005:
n.err("用户的标签数量已达上限50个，请删除后再添加");
break;

default:
n.err("系统繁忙，请重新编辑");
}
e.focus();
},function(){
e.attr("disabled",!1).focus();
}));
}),S.on("keyup",function(e){
13==e.which&&U.click();
}),S.on("blur",function(){
var e=$(this).val();
""==e&&($(this).hide().next().hide(),$(this).prev().show().prev().show());
}),N.on("click",".js_del_tag",function(){
var e=$(this),t=e.data("id"),a=(""+e.data("name")).html(!1);
e.parent().hide(),z[a]=!1,i.delUserTag({
user_uin:r,
tag_id:t
},function(){
e.parent().remove(),C--;
},function(){
n.err("删除标签失败"),e.parent().show(),z[a]=!0;
});
});
var J=wx.cgiData.record,O=v.find(".js_bonus_list").html(template.render("js_bonus_tpl",{
record_list:J.record_list
})),M=0,R=5,B=1,E=(new o({
container:v.find(".js_pageNavigator"),
perPage:R,
isSimple:!0,
last:!1,
first:!1,
initShowPage:B,
totalItemsNum:J.total_count,
callback:function(e){
var t=e.currentPage;
t!=B&&(t--,M=t*R,v.find(".js_record_item").hide(),v.find(".js_record_loading").show(),
i.getDetail({
user_card_id:a.user_card_id,
begin:M,
count:R
},function(t){
return 0!=t.base_resp.ret?void s.show(t):(console.log(t),B=e.currentPage,J=$.parseJSON(t.user_detail.json_record),
void v.find(".js_bonus_list").html(template.render("js_bonus_tpl",{
record_list:J.record_list
})));
},function(){}));
}
}),$("#js_use_detail")),F=$("#js_page_nav");
E.on("click",".js_goback",function(){
v.show(),E.hide(),F.show();
}),O.on("click",".js_carduse_detail",function(){
var e=$(this).attr("data-idx");
e=parseInt(e);
var t=J.record_list[e];
t&&(t.__from=1,E.html(template.compile(d)(t)).show(),v.hide(),F.hide());
});
var G=e("cardticket/member_manage/add_tag_to_user.js"),A=[];
s.get({
url:"/merchant/membercardmgr?action=user_list&upper_valid_time=1375372799&lower_valid_time=1375286400"
},function(e){
A=$.parseJSON(e.user_list.json_tag_page).datas,$.each(A,function(e,t){
t.name=t.name.html(!1);
});
var t=[];
$.each(A,function(e,a){
0!=a.type||t.push(a);
}),A=t,$(".js_member_tags").on("click",function(){
var e=wx.cgiData.user_detail;
e&&new G({
tags_list:A,
selected_tags:e.tag_page.datas,
can_modify:!0,
container:this,
onsubmit:function(t,a){
i.batchModifyUsersTags({
user_uin:e.fakeid,
del_tag_ids:a.join("|"),
add_tag_ids:t.join("|")
},function(){
n.suc("修改成功"),location.reload();
});
},
on_add_tag:function(e){
H(e);
}
});
});
});
var H=function(e){
c.trigger("afterAddTag",A,e),n.suc("新建标签成功");
};
e("cardticket/common_init.js");
});