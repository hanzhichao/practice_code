define("scan/add_firmcat.js",["common/wx/Cgi.js","common/wx/Tips.js","scan/mvp/codecat.js","scan/mvp/extendfile.js","scan/mvp/apply_model.js"],function(e){
"use strict";
function t(){
var e=$("#js_div_step"),t=$("#js_div_step1");
0==t.length&&(t=$(a("tpl_step1")),e.append(t)),t.show();
var s=t.find(".js_btn_submit");
_.set("codecat_container","#js_div_codecat"),p?p.show(!0):(p=new d.presenter(_),
u=new d.view,p.setView(u),p.init()),s.on("click",function(){
return 0==p.isValid()?!1:(_.set("codecat",p.getData()),void _.setStep(2));
});
}
function s(){
var e=$("#js_div_step"),t=$("#js_div_step2");
e.find(".js_div_step").hide(),0==t.length&&(t=$(a("tpl_step2")),e.append(t)),t.show();
var s=t.find(".js_btn_submit"),n=t.find(".js_btn_previous");
_.set("extendfile_container","#js_div_extendfile"),f?f.show(!0):(f=new o.presenter(_),
m=new o.view,f.setView(m),f.init()),n.on("click",function(){
var e=confirm("返回上一步将清空已填写的内容");
e&&(t.remove(),f=null,m=null,_.setStep(1));
}),s.on("click",function(){
if(0==f.isValid())return!1;
s.btn(!1);
var e=f.getData(),t={
business_license_stuff:wx.cgiData.business_license_stuff,
data:JSON.stringify({
data:e
})
};
c.post({
url:"/merchant/scanqualification?action=addfirmcat",
data:t,
mask:!1
},function(e){
s.btn(!0),0==e.base_resp.ret?(_.set("result",e.firm_info_add_result),_.setStep(3)):l.err(14150==e.base_resp.ret?"商标名称和厂商信息不吻合":14153==e.base_resp.ret?"厂商信息已被认领，请更换":"提交失败，请重试");
});
});
}
function n(){
$("#js_div_body").html(a("tpl_result"));
}
function i(){
_=new r,_.initStep({
container:"#js_div_stepbar",
selected:1,
names:["1 上传资质","2 确认主体"],
stepCallback:{
1:t,
2:s,
3:n
}
}),_.setStep(1);
}
var a=template.render,c=e("common/wx/Cgi.js"),l=e("common/wx/Tips.js"),d=e("scan/mvp/codecat.js"),o=e("scan/mvp/extendfile.js"),r=e("scan/mvp/apply_model.js"),_=null,p=null,u=null,f=null,m=null;
i();
});