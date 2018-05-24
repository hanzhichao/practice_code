define("ad_system/client.js",["common/wx/dialog.js","common/wx/Step.js","biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/lib/json.js","biz_web/utils/upload.js","ad_system/helper.js","biz_web/ui/dropdown.js"],function(e){
"use strict";
function n(){
1!=p&&([1,2,3].each(function(e){
u({
container:$("#otherFile"+e),
type:2,
multi:!1,
onComplete:function(e,n,a,i){
if(i.base_resp)switch(+i.base_resp.ret){
case 0:
r.suc("上传成功");
var s=this.container.data("index");
f[s]||(f[s]={}),f[s].name="补充材料"+(s+1),f[s].url=i.content,$(this.container).parent().parent().parent().find(".upload_preview").html('<img src="'+i.content+'" />');
break;

case 1:
r.err("图片太大");
break;

case 200011:
r.err("请上传合法的图片格式");
break;

default:
r.err("上传图片失败");
}
}
});
}),p=!0);
}
function a(e){
$("#files").html(template.render("tpl",e)),$("#other").click(function(){
$(this).find("i").hasClass("single_down")?($(this).find("i").setClass("icon14_common rank_gray single_up"),
$("#others").show(),n()):($(this).find("i").setClass("icon14_common rank_gray single_down"),
$("#others").hide());
});
var a=$("#files").find(".jsUpload");
a.each(function(e,n){
n=$(n),u({
container:n,
type:2,
multi:!1,
onComplete:function(e,a,s,t){
switch(+t.base_resp.ret){
case 0:
i(n,t),r.suc("上传成功");
break;

case 1:
r.err("图片太大");
break;

case 200011:
r.err("请上传合法的图片格式");
break;

default:
r.err("上传图片失败");
}
}
});
});
}
function i(e,n){
h[e.data("index")]={
name:e.data("name"),
url:n.content
},e.parent().parent().find(".jsView").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:n.content,
src:n.content
}));
}
var s=(e("common/wx/dialog.js"),e("common/wx/Step.js"));
e("biz_web/ui/checkbox.js");
var t=e("common/wx/Cgi.js"),r=e("common/wx/Tips.js");
e("biz_web/lib/json.js");
var o,c,l,d,m=e("biz_web/utils/upload.js"),u=m.uploadCdnFile,b=(e("ad_system/helper.js"),
e("biz_web/ui/dropdown.js")),h=[],f=[];
"undefined"!=typeof _ad_client_list&&(wx.cgiData.source=_ad_client_list),l=new b({
container:"#level1",
label:"请选择",
data:wx.cgiData.source,
callback:function(e,n,i,s){
o=e.slice(0,4),c="",h=[],$("#files").html(""),$("#level2").html(""),$("#submit").removeClass("btn_primary").addClass("btn_disabled"),
d=new b({
container:"#level2",
label:"请选择",
data:s.sub,
callback:function(e,n,i,s){
c=e,h=[],s.files&&s.files.each(function(e,n){
e.need&&(h[n]={
name:e.name
});
}),$("#submit").addClass("btn_primary").removeClass("btn_disabled"),a(s);
}
});
}
}),$("#files").on("keyup",".jsInput",function(){
f[$(this).data("index")]||(f[$(this).data("index")]={}),f[$(this).data("index")].name=$(this).val();
});
var p=!1;
$("#agree").checkbox(),$("#agree").change(function(){
$(this).prop("checked")?$("#next").addClass("btn_primary").removeClass("btn_disabled"):$("#next").removeClass("btn_primary").addClass("btn_disabled");
});
var _=new s({
container:"#step",
names:["1 同意协议","2 选择行业"]
});
$("#next").click(function(){
$(this).hasClass("btn_primary")&&(_.go(2),$("#step2").show().siblings().hide());
}),$("#back").click(function(){
_.go(1),$("#step1").show().siblings().hide();
}),$("#submit").click(function(){
if(!$("#submit").hasClass("btn_disabled")){
var e;
if(h.concat(f).each(function(n){
return n.name&&!n.url?(e=n.name,!1):void 0;
}),e)r.err("请上传文件："+e);else{
var n;
if(f.each(function(e){
return e.url&&!e.name?(n=e._name,delete e._name,!1):void delete e._name;
}),n)return void r.err(n+"文件名称不能为空");
var a=[];
h.concat(f).each(function(e){
e&&e.name&&e.url&&a.push(e);
});
var i={
industry:c,
industry_name:l.name+"."+d.name,
file:JSON.stringify2({
file:a
})
};
t.post({
url:"/merchant/ad_client?action=open",
data:i
},function(e){
0==e.base_resp.ret?($("#step").hide(),$("#ok").show().siblings().hide()):r.err();
});
}
}
});
});