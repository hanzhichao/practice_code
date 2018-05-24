define("wxverify/step3_141210.js",["common/wx/Cgi.js","common/wx/Tips.js","wxverify/init.js","tpl/wxverify/step3_141210.html.js","tpl/wxverify/confirmname_141210.html.js","biz_web/ui/checkbox.js","tpl/wxverify/commonreg_141210.html.js","common/qq/queryString.js"],function(e,t,i){
"use strict";
var n=wx.T,r=wx.cgiData,s=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),o=e("wxverify/init.js").initUpload,l=e("tpl/wxverify/step3_141210.html.js"),c=e("tpl/wxverify/confirmname_141210.html.js"),m=(e("biz_web/ui/checkbox.js"),
e("tpl/wxverify/commonreg_141210.html.js")),f=e("common/qq/queryString.js"),_=wx.cgiData.naming_type,u={
trademarkAuthorizationOther:"/mpres/zh_CN/htmledition/comm_htmledition/res/sqh_trademark_authorization.doc"
},d={
0:{},
1:{
rules:{
brand_register_stuff:{
required:!0
}
},
messages:{
brand_register_stuff:{
required:"商标注册证书不能为空"
}
}
},
2:{},
3:{
rules:{
naming_building_stuff:{
required:!0
}
},
messages:{
naming_building_stuff:{
required:"文件不能为空"
}
}
},
4:{
rules:{
naming_tel_account_stuff:{
required:!0
}
},
messages:{
naming_tel_account_stuff:{
required:"电话号码所有权证明不能为空"
}
}
},
5:{},
6:{
rules:{
naming_media_licesnse_stuff:{
required:!0
}
},
messages:{
naming_media_licesnse_stuff:{
required:"文件不能为空"
}
}
},
7:{},
8:{
rules:{
naming_other_stuff:{
required:!0
}
},
messages:{
naming_other_stuff:{
required:"文件不能为空"
}
}
},
10:{
rules:{
brand_acceptance_stuff:{
required:!0
}
},
messages:{
brand_acceptance_stuff:{
required:"商标注册受理通知书不能为空"
}
}
}
};
i.exports=function(){
$(m).appendTo("body"),console.log("step3"),console.log(r),$("#wxverify").html(n(l,r)),
$("body").append(c),$("#jsPrevCover").click(function(){
location.href=f.replace(location.href,"step","stuff");
});
{
var e,t,i=$(".js_type"),p=$(".js_detail"),g=$("#js_content"),v=$("#js_fillList"),h=$("#js_fillForm"),x=$("#js_title"),y=$("input[name=level1]").checkbox({
multi:!1,
onChanged:function(n){
console.log("level1");
var r=n.closest(".js_type"),s=r.find(".js_detail");
e=r.find(".js_title").text(),t=r.attr("type_num"),p.hide(),i.removeClass("item_selected"),
s.show(),r.addClass("item_selected");
}
});
$("input[name=level2]").checkbox({
multi:!1,
onChanged:function(i){
console.log("level2"),console.log(i),console.log(i.prev().text()),e="基于商标-"+i.prev().text(),
t=i.attr("value");
}
});
}
if($("#js_select").on("click",function(){
var i=y.values();
if(0==i.length)a.err("请选择一种类型");else{
var n={
data:{},
urls:u
};
""!==r.refill_type&&(n.refill_type=r.refill_type,n.state=r.state),console.log("type="+t+" , naming_type="+_),
t==_&&(n.data=r.data),n.tmp_service_type=r.tmp_service_type,r.naming_type=t,console.log(e),
x.text(e),g.html('<form class="form"></form>');
var l=g.find("form");
console.log("formdata type="+t),console.log(n),l.html(template.render("tmpl"+t,n)),
v.hide(),h.show(),o(),l.validate($.extend(!0,{},{
ignore:[],
rules:{
nick_name:{
required:!0,
nickname:!0
}
},
messages:{
nick_name:{
required:"公众号名称不能为空",
nickname:"公众号名称过长"
}
},
errorPlacement:function(e,t){
var i=t.parent().parent();
i.find(".fail").remove(),e.insertBefore(t.is(".file_field")?i.find(".upload_preview"):i.find(".name_example"));
},
submitHandler:function(e){
var t=$(e).serializeObject();
t.naming_type=r.naming_type,t.step=r.step,$("#submit_info").btn(!1);
var i;
i="undefined"==typeof r.refill_type?"agree_naming":"submit_refill",s.post({
url:"/acct/wxverify?action="+i,
data:t,
timeout:6e4,
error:function(){
$("#submit_info").btn(!0);
}
},function(e){
return"0"!=e.base_resp.ret?(49==e.base_resp.ret?a.err("公众号名称过长"):202100==e.base_resp.ret?wx.cgiData.checkAdminPopup.load():s.show(e),
void $("#submit_info").btn(!0)):void(location.href=1===wx.cgiData.refill_type&&5===wx.cgiData.state||0===wx.cgiData.refill_type&&11===wx.cgiData.state?wx.url("/merchant/order?action=detail&t=service/detail&order_id="+wx.cgiData.order_id):f.replace(location.href,"step","invoice"));
});
}
},d[t])),$("#jsPrev").click(function(){
location.href=f.replace(location.href,"step","stuff");
});
}
}),console.log(_),console.log(r.data.nick_name),""!==_&&r.data.nick_name){
var j=_;
10==j&&(j=1),$("li[type_num="+j+"]").find("input[name=level1]").click(),console.log("_tmp="+j),
10==_&&$(".fill_type_item_main").find("input[value=10]").click(),$("#js_select").click();
}
$("#js_change").on("click",function(){
v.show(),h.hide();
});
};
});