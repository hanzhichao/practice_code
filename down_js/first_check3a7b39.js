define("business/first_check.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/dropdown.js","biz_web/utils/upload.js"],function(e){
"use strict";
function t(){
[1,2,3].each(function(e){
r({
container:$("#otherFile"+e),
type:2,
multi:!1,
onComplete:function(e,t,a,i){
if(i.base_resp)switch(+i.base_resp.ret){
case 0:
n.suc("上传成功");
var r=this.container.data("index");
d[r]={
name:"补充材料"+(r+1),
file_id:i.content
},$(this.container).parent().parent().parent().find(".upload_preview").html('<img src="'+s.tmpFileUrl(i.content)+'" />');
break;

case 1:
n.err("图片太大");
break;

case 200011:
n.err("请上传合法的图片格式");
break;

default:
n.err("上传图片失败");
}
}
});
});
}
var a=e("common/wx/Cgi.js"),n=e("common/wx/Tips.js"),i=e("biz_web/ui/dropdown.js"),s=e("biz_web/utils/upload.js"),r=s.uploadTmpFile,o=$.parseJSON(wx.cgiData.data).sub_class,c=[{
name:"进口化妆品卫生许批件",
tip:"非进口化妆品可不传"
},{
name:"入境检验检疫卫生证书",
tip:"非进口食品可不传"
}],l={
values:[],
create:function(e,t){
l[e]&&l[e].destroy(),l[e]=new i({
container:"#Js_dropdown"+e,
label:"未选择",
data:t,
callback:function(a,n,i){
$("#Js_cat"+e).find(".Js_tips").hide(),l.change(e,n,t[i]),l.values[e]=n;
}
}),$("#Js_cat"+e).show(),$("#Js_cat"+e).find(".Js_tips").show();
},
change:function(e,t,a){
l.range(e,t);
var n=a.sub_class;
return n&&n.length?(l.create(e+1,n),void(0==e&&l.create(2,[]))):(l[e+1]=null,l[e+2]=null,
l.hide(e),l.rate(a.rate),l.cycle(a.cycle),l.money(a.money),void l.files(a.file_list));
},
range:function(e,t){
var a=$(".Js_selected"),n=l;
switch(+e){
case 0:
a.text(t);
break;

case 1:
a.text("%s-%s".sprintf(n[0].name,t));
break;

case 2:
a.text("%s-%s-%s".sprintf(n[0].name,n[1].name,t));
}
},
rate:function(e){
$("#Js_rate").text(e);
},
cycle:function(e){
$("#Js_cycle").text(e);
},
money:function(e){
return-1==e?($("#Js_others").show(),void $("#Js_normal").hide()):(e/=100,$("#Js_others").hide(),
$("#Js_normal").show(),void $("#Js_money").text(e));
},
files:function(e){
var t=$("#Js_files");
t.html(""),e.length>0&&e[0]?($("#files").show(),e.each(function(e,a){
var n,i;
for(n=0;n<c.length;n++)c[n].name==e&&(i=c[n].tip);
t.append(template.render("tpl_material",{
name:e,
index:a,
tip:i
})),f(a,function(e,t){
$(this).data("fid",t.content),$(this).parent().parent().find(".Js_filename").text(e.name),
$(this).parent().parent().parent().find(".upload_preview").html('<img src="%s" />'.sprintf(s.tmpFileUrl(t.content)));
});
})):$("#files").hide();
},
hide:function(e){
$("#Js_cat"+(e+1)).hide(),$("#Js_cat"+(e+2)).hide();
}
},f=function(e,t){
var a=$("#Js_upload"+e);
r({
container:a,
type:2,
multi:!1,
onComplete:function(e,i,s,r){
if(r.base_resp)switch(+r.base_resp.ret){
case 0:
n.suc("上传成功"),t.call(a,s,r);
break;

case 1:
n.err("图片太大");
break;

case 200011:
n.err("请上传合法的图片格式");
break;

default:
n.err("上传图片失败");
}
}
});
};
l.create(0,o),l.create(1,[]),l.create(2,[]),$(".Js_tips").hide(),$("#Js_saveBtn").on("click",function(){
var e=$(this),t=l;
if(!e.hasClass("btn_disabled")){
for(var i=0;3>i;i++)if(t[i]&&!t[i].name)return n.err("请选择完整的类目"),void $(window).scrollTop(0);
var s={
class1:t[0]&&t[0].name||"",
class2:t[1]&&t[1].name||"",
class3:t[2]&&t[2].name||""
};
if("22"!=wx.cgiData.role){
var r=$.trim($("#Js_scope").val());
if(""==r)return n.err("请填写经营内容"),$(window).scrollTop($("#Js_scope").offset().top-$(window).height()/2-40),
void $("#Js_scope").focus();
s.scope=r;
}
if("22"!=wx.cgiData.role){
var o=[],f=!0;
if($(".Js_upload").each(function(){
var e=$(this),t=e.data("fid"),a=e.data("name");
if(""==t){
var s=!1;
for(i=0;i<c.length;i++)c[i].name==a&&(s=!0);
if(!s)return n.err("请上传"+a),f=!1,!1;
}
o.push({
name:a,
file_id:t
});
}),!f)return;
var p=[];
d.each(function(e){
e&&p.push(e);
}),s.files=JSON.stringify2({
qf_file:o,
opt_file:p
});
}
var u=$("#rtx").val().trim();
if(!(u.length>0))return n.err("内部联系人不能为空"),void $(window).scrollTop($("#rtx").offset().top-$(window).height()/2-40);
if(!/^[a-z]+$/.test(u))return void n.err("内部联系人格式不合法,请填写正确的英文全名");
s.rtx=$("#rtx").val().trim(),a.post({
url:"/merchant/bizpayinitcheck",
data:s,
mask:!1,
beforeSend:function(){
e.disable("btn_disabled").removeClass("btn_primary");
},
complete:function(){
e.enable("btn_disabled").addClass("btn_primary");
}
},function(e){
if(e&&e.base_resp){
var t=+e.base_resp.ret;
switch(t){
case 0:
n.suc("提交成功"),location.href=wx.url("/merchant/business?action=index");
break;

default:
n.err("提交失败，请重试");
}
}
});
}
});
var d=[];
t();
});