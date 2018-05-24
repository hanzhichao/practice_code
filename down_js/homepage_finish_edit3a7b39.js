define("wifi/homepage_finish_edit.js",["wifi/top.js","common/wx/Cgi.js","common/wx/dialog.js","common/wx/Tips.js"],function(i){
"use strict";
i("wifi/top.js");
var o=i("common/wx/Cgi.js"),t=i("common/wx/dialog.js"),s=i("common/wx/Tips.js"),e=$(".js_edit_view"),n=$(".js_url"),r=$("#js_submit"),c=$("#js_url_error"),a=$(".js_build_qrcode");
a.on("click",function(){
var i=n.val();
return/^http(s)?:\/\//.test(i)&&""!=i?void e.find("img").attr("src",wx.url("/wifi/wifimpcomm?action=get_qr_img&url="+i)):(c.show(),
n.focus(),!1);
}),n.on("input propertychange",function(){
c.hide();
}),r.on("click",function(){
var i=n.val();
return/^http(s)?:\/\//.test(i)&&""!=i?void t.show({
msg:"保存后新的内容将发布，旧的内容将被替换，确定保存并发布？",
buttons:[{
text:"确定",
type:"primary",
click:function(){
o.post({
url:wx.url("/wifi/wifihomepage?action=edit_finish_page"),
data:{
shop_id:wx.cgiData.shop_id,
finish_page_url:n.val()
}
},function(i){
i&&i.base_resp&&0==i.base_resp.ret?(s.suc("提交成功"),location.href=wx.url("/wifi/wifihomepage?action=get_finish_page_list&t=wifi/homepage_finish_list_tmpl&page_idx=1&page_size=10")):s.err("系统错误");
});
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}):(c.show(),n.focus(),!1);
});
});