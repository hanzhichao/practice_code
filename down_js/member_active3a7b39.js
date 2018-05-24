define("cardticket/add/member_active.js",["common/wx/multiSelector.js","common/wx/popup.js","common/wx/popover.js","common/wx/Step.js","common/wx/Tips.js","tpl/multiSelector/item.html.js","cardticket/add/member_info_flag.js","biz_web/ui/checkbox.js"],function(e){
"use strict";
function t(e){
if(e){
var t=$._data(e,"events")||{};
t.click||(t.click=[]);
for(var i=0;i<t.click.length;i++){
var s=t.click[i];
!function(e){
"function"==typeof e&&(t.click[i].handler=function(t){
return e.apply(t.currentTarget,arguments),!1;
});
}(s.handler);
}
}
}
function i(e){
var t=e.active_obj,i=t.active_popup,s=i.popup("get");
this.$active_first=s.find(".js_active_first_container"),this.$active_last=s.find(".js_active_last"),
this.$btns=s.find(".js_btn_p"),this.step=new _({
container:s.find(".js_active_step"),
selected:1,
names:["1 选择必填信息","2 选择选填信息"]
}),this.active_obj=e.active_obj,s.find(".js_active_step").hide(),this.last();
}
function s(e){
var t=e,i=t.require_select.getValue().sys,s=t.option_select.getValue().sys,n=s.concat(i);
t.require_select.setDisabledItemsByID(n),t.require_select.setDisabledItemsByID(m),
t.option_select.setDisabledItemsByID(n),o(e,i,s);
}
function o(e,t,i,s){
var o=e.active_popup.popup("get");
s&&o.find(".jsLevel").each(function(){
var e=$(this);
e.hasClass("jsLevel1")||e.text(e.text().replace(/\(.*?\)$/,""));
});
for(var n=0;n<t.length;n++){
var a=t[n];
"object"==typeof a&&(a=a.id);
var r=o.find("a[data-id='"+a+"']");
r.text(a+"(必填)");
}
for(var n=0;n<i.length;n++){
var a=i[n];
"object"==typeof a&&(a=a.id);
var r=o.find("a[data-id='"+a+"']");
r.text(a+"(选填)");
}
}
function n(e){
return"__"+encodeURIComponent(e).replace(/%|\.|\*/g,"");
}
function a(e){
{
var t=$(e.container),i=t.find("label"),s=i.find(".js_hasSelect").text(),o=i.find(".js_leaveSelect").text(),n=$("<label>%s(<span class='txt_hint js_hasSelect'>%s</span>/<span class='txt_hint'>%s</span>)</label>".sprintf(e.info,s,o));
$("<a class='add_active' href='javascript:;'>手动添加</a>");
}
i.replaceWith(n);
}
function r(e,i){
var s=$(e.container),o=s.find("label"),n=o.find(".js_hasSelect").text(),a=o.find(".js_leaveSelect").text(),r=$("<label>%s(<span class='txt_hint js_hasSelect'>%s</span>/<span class='txt_hint'>%s</span>)</label>".sprintf(e.info,n,a)),d=$("<a class='add_active' href='javascript:;'>手动添加</a>");
r.append(d),o.replaceWith(r);
var c=new l({
dom:d,
content:template.render("js_add_active_name",{
i:x++
}),
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
if(i.total_self_count>=5)return void this.hide();
var t=$.trim(c.$pop.find(".js_name").val());
return t?/\s+/.test(t)?void p.err("自定义信息的名称不能包含空格"):t.len()>14?void p.err("自定义信息的名称长度不超过7个汉字或14个英文字母/数字"):(e.onok&&e.onok.call(c,t),
void this.hide()):void p.err("请输入自定义信息的名称");
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}]
});
return c.hide(),c.$pop.css("z-index",1e4),c.$pop.find(".popover_inner").prepend("<div class='js_no_more'>最多可添加5个自定义信息</div>"),
d.click(function(){
return i.option_select.getSelectedCount()>=k?void p.err("最多只能添加13个字段"):($(".popover").hide(),
i.total_self_count>=5?(c.$pop.find(".jsPopOverContent").hide(),c.$pop.find(".js_no_more").show()):(c.$pop.find(".jsPopOverContent").show(),
c.$pop.find(".js_no_more").hide()),c.show(),c.$pop.find(".js_name").focus(),c.resetPosition(),
!1);
}),c.$pop.find(".jsPopoverBt").each(function(){
t(this);
}),c;
}
function d(e){
this.opt=$.extend(!0,{},S,e),this.init();
}
for(var c=e("common/wx/multiSelector.js"),l=(e("common/wx/popup.js"),e("common/wx/popover.js")),_=e("common/wx/Step.js"),p=e("common/wx/Tips.js"),f=e("tpl/multiSelector/item.html.js"),h=e("cardticket/add/member_info_flag.js"),u=e("biz_web/ui/checkbox.js"),v={
data:[{
id:"1",
name:"个人信息",
sub:[{
id:"姓名",
name:"姓名"
},{
id:"性别",
name:"性别"
},{
id:"生日",
name:"生日"
}]
},{
id:"2",
name:"联系方式",
sub:[{
id:"手机号",
name:"手机号(默认为必填)"
},{
id:"邮箱",
name:"邮箱"
},{
id:"详细地址",
name:"详细地址"
}]
},{
id:"3",
name:"教育与工作信息",
sub:[{
id:"学历",
name:"学历"
},{
id:"行业",
name:"行业"
},{
id:"收入",
name:"收入"
}]
},{
id:"4",
name:"其它信息",
sub:[{
id:"爱好",
name:"爱好"
}]
}],
title:"请选择选填信息",
tip:""
},m=[],y=0;y<v.data.length;y++){
var w=v.data[y];
if(w.sub)for(var g=0;g<w.sub.length;g++)m.push(w.sub[g].id);
}
var k=13,j=function(e){
e=$.extend({},v,e);
var i=new c(e);
i.addSelectedItems=function(e){
if(!this.opt.beforeAddSelectedItems||this.opt.beforeAddSelectedItems.call(this,e)){
for(var t=null,i=0,s=0;s<e.length;s++)if("手机号"==e[s].id){
t=e[s],e.splice(i++,0,e.splice(s,1)[0]);
break;
}
this.$before&&!this.is_self(e)?this.$before.before(template.compile(f)({
list:e
})):$(".jsToList",this.container).append(template.compile(f)({
list:e
})),this.setHasSelect(e.length),this.opt.onchanged&&this.opt.onchanged.call(this),
this.opt.onAdded&&this.opt.onAdded.call(this,e);
}
},i.getValue=function(){
for(var e=c.prototype.getValue.call(this),t={
sys:[],
define:[]
},i=0;i<e.length;i++){
var s=e[i];
this.is_self(s)?t.define.push(s):t.sys.push(s.id);
}
return t;
},i.setItemsByID=function(){
this.$before=null,c.prototype.setItemsByID.apply(this,arguments),this.init_before();
},i.init_before=function(){
var e=this.container.find(".jsToList");
this.$before=$("<li class='js_before_stub'></li>").appendTo(e);
},i.is_self=function(e){
return e?"undefined"==typeof e.length?0==e.id.indexOf(q):e.length>=1&&0==e[0].id.indexOf(q)?!0:void 0:void 0;
};
var s=i.container.find(".jsFromList")[0];
return t(s),t(i.container[0]),i;
},b='<div class="msg_row_area">         {if exist_keyword}         <dl class="msg_row group">             <dt class="msg_row_title">必填信息</dt>             <dd class="msg_row_content">                 {each require_keywords as key}                <span class="">{key}</span>                 {/each}                {each require_self_keywords as key}                <span class="">{key.name}</span>                 {/each}            </dd>         </dl>         <dl class="msg_row group last_msg_row">             <dt class="msg_row_title">激活信息</dt>             <dd class="msg_row_content">                 {each option_keywords as key}                <span class="">{key}</span>                 {/each}                {each option_self_keywords as key}                <span class="">{key.name}</span>                 {/each}            </dd>         </dl>         {else}         <dl class="msg_row last_msg_row">             <dt class="">请设置激活时需要填写的信息</dt>         </dl>         {/if}         </div>         <div class="frm_control">             {if can_modify}                 允许用户自主修改以上信息             {else}                 不允许用户自主修改以上信息             {/if}         </div>';
i.prototype.first=function(){
this.$active_first.show(),this.$active_last.hide(),this.step.go(1),this.$btns.hide(),
$(this.$btns[0]).show(),s(this.active_obj),this.$active_first.find(".jsFail").hide();
},i.prototype.last=function(){
this.$active_first.hide(),this.$active_last.show(),this.step.go(2),this.$btns.hide(),
$(this.$btns[2]).show(),s(this.active_obj),this.$active_last.find(".jsFail").hide();
};
var x=0,q="______self______",S={
data:{
require_keywords:["手机号"],
option_keywords:[],
require_self_keywords:[],
option_self_keywords:[]
}
};
return d.prototype={
init:function(){
var e=this.opt,t=this,s=e.data;
this.require_keywords=[],this.option_keywords=[];
for(var o=0;o<s.require_keywords.length;o++)this.require_keywords.push(s.require_keywords[o]);
for(var o=0;o<s.option_keywords.length;o++)this.option_keywords.push(s.option_keywords[o]);
this.require_self_keywords=[],this.option_self_keywords=[];
for(var o=0;o<s.require_self_keywords.length;o++){
var a=s.require_self_keywords[o],r={
id:q+n(a),
name:a
};
this.require_self_keywords.push(r);
}
for(var o=0;o<s.option_self_keywords.length;o++){
var a=s.option_self_keywords[o],r={
id:q+n(a),
name:a
};
this.option_self_keywords.push(r);
}
this.can_modify=s.can_modify,this.init_result(),this.active_popup=$("<div><div class='js_active_step'></div>                    <div class='js_active_first_container'><div class='js_active_first'></div><span class='dialog_footer_tips'>为帮助用户快速激活，“必选信息“只能是“手机号”这项。</span></div>                    <div class='js_active_last'></div>                    <div class='js_can_modify_wrap selector_extend'></div></div>").popup({
autoShow:!1,
title:"设置激活信息",
buttons:[{
text:"下一步",
click:function(){
t.stepmgr.last();
},
type:"primary"
},{
text:"上一步",
click:function(){
t.stepmgr.first();
}
},{
text:"确定",
click:function(){
var e=t.require_select.getValue(),i=t.option_select.getValue();
t.require_keywords=e.sys,t.require_self_keywords=e.define,t.option_keywords=i.sys,
t.option_self_keywords=i.define,t.can_modify=$(".js_can_modify_wrap").find("input[type=checkbox]").is(":checked")?1:0,
t.init_selected(),t.init_result(),this.hide();
},
type:"primary"
}],
className:"align_edge",
onHide:function(){
t.init_selected();
}
}),this.init_dom(),this.init_selected();
var d=this.active_popup.popup("get");
d.find(".jsLevel1").click(),this.stepmgr=new i({
active_obj:this
});
},
init_dom:function(){
var e=this,t=this.active_popup.popup("get"),i=t.find(".js_active_first"),s=t.find(".js_active_last");
this.require_select=new j({
container:i,
disableLevel1Select:!0,
max:wx.cgiData.cardid&&1==wx.cgiData.data.create_source?1e4:1,
onAdded:function(t){
return t?this.is_self(t)?void(e.total_self_count+="number"==typeof t.length?t.length:1):void o(e,t,[]):void 0;
},
onDeleted:function(i){
if(this.is_self(i))return void e.total_self_count--;
var s=$("a[data-id='"+i.id+"']",t);
s.text(s.text().replace(/\(.*?\)$/,"")).removeClass("disabled");
},
beforeAddSelectedItems:function(){
return!0;
}
}),a({
container:i.find(".choosed_scope .scope_hd"),
info:"必填信息"
}),this.option_select=new j({
container:s,
disableLevel1Select:!0,
max:wx.cgiData.cardid&&1==wx.cgiData.data.create_source?1e4:13,
onAdded:function(t){
return t?this.is_self(t)?void(e.total_self_count+="number"==typeof t.length?t.length:1):void o(e,[],t):void 0;
},
onDeleted:function(i){
if(this.is_self(i))return void e.total_self_count--;
var s=$("a[data-id='"+i.id+"']",t);
s.text(s.text().replace(/\(.*?\)$/,"")).removeClass("disabled");
},
beforeAddSelectedItems:function(t){
return e.option_select.getSelectedCount()+t.length>k?(p.err("最多只能添加13个字段"),!1):!0;
}
}),this.option_select.getSelectedCount=function(){
return c.prototype.getSelectedCount.call(this)+1;
},s.find(".unchoose_scope .scope_list").prepend("<dd class='required_fields'><span>手机号</span></dd>"),
s.find(".choosed_scope .scope_list").prepend("<dd class='required_fields'><span>手机号(必填)</span></dd>"),
r({
container:s.find(".choosed_scope .scope_hd"),
onok:function(t){
e.option_select.addSelectedItems([{
id:q+n(t),
name:t
}]);
},
info:"激活信息"
},this);
var d=new u({
container:".js_can_modify_wrap",
label:"允许用户自主修改以上信息",
name:"can_modify",
type:"checkbox"
});
d.checked(wx.cgiData.data.can_modify);
},
init_selected:function(){
this.require_select.setItemsByID(this.require_keywords),this.option_select.setItemsByID(this.option_keywords),
this.total_self_count=0,this.require_select.addSelectedItems(this.require_self_keywords),
this.option_select.addSelectedItems(this.option_self_keywords),s(this);
var e=this.active_popup.popup("get"),t=e.find(".js_active_first");
t.find('a.jsClose[data-id="手机号"]').hide(),e.find(".jsFail").hide();
},
init_result:function(){
var e=this.opt,t=this.require_keywords,i=this.option_keywords,s=this.option_self_keywords,o=this.require_self_keywords,n=t.length||i.length||s.length||o.length,a=this.can_modify,r=$(e.container);
r.find(".js_keywords").html(template.compile(b)({
exist_keyword:n,
require_keywords:t,
option_keywords:i,
require_self_keywords:o,
option_self_keywords:s,
can_modify:a
}));
},
val:function(e){
if(!e)return{
required_info_flag:0,
optional_info_flag:0,
required_field_list_size:0,
optional_field_list_size:0,
can_modify:0
};
for(var t=this.require_select.getValue(),i=this.option_select.getValue(),s={
required_info_flag:h.info2flag(t.sys),
optional_info_flag:h.info2flag(i.sys),
required_field_list_size:t.define.length,
optional_field_list_size:i.define.length,
can_modify:this.can_modify
},o=0;o<t.define.length;o++)s["required_field_list_"+o]=t.define[o].name;
for(var o=0;o<i.define.length;o++)s["optional_field_list_"+o]=i.define[o].name;
return s;
},
show:function(){
this.active_popup.popup("show"),this.active_popup.popup("resetPosition");
},
hide:function(){
this.active_popup.popup("hide");
},
destroy:function(){
this.active_popup.popup("remove");
}
},d;
});