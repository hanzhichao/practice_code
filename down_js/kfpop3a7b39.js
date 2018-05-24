define("services/kfpop.js",["services/tpl/kfpop.html.js","common/wx/inputCounter.js","common/wx/Tips.js","biz_web/utils/upload.js"],function(e){
"use strict";
function i(e){
var i=this;
i.opt=$.extend(!0,{},r,e);
var o=i.opt.dom;
o.html(template.compile(n)({})),e.name&&o.find("input[type=text][name=nickname]").val(e.name),
i.counter=new t(o.find("input"),{
minLength:0,
maxLength:16
}),o.find("input").on("keyup",function(){
o.find(".js_nickfail").hide();
}),a({
container:o.find(".js_select_file"),
type:2,
multi:!1,
onComplete:function(e,i,n,t){
if(o.find(".js_upfail").hide(),t.base_resp)switch(+t.base_resp.ret){
case 0:
s.suc("上传成功");
var a=t.content,r="/300";
a=a.replace(/\/0$/,r).replace(/\/0\?/,r+"?"),o.find("img").attr("src",a).show();
break;

case 1:
s.err("图片太大");
break;

case 200011:
s.err("请上传合法的图片格式");
break;

default:
s.err("上传图片失败");
}
}
});
}
var n=e("services/tpl/kfpop.html.js"),t=e("common/wx/inputCounter.js"),s=e("common/wx/Tips.js"),o=e("biz_web/utils/upload.js"),a=o.uploadCdnFile,r={
dom:null
};
return i.prototype.check=function(){
var e=this.opt.dom,i=this.counter.getValue(),n=this.counter.hasOverflowed(),t=e.find("img").attr("src");
return i&&!n&&t?(e.find(".js_nickfail").hide(),e.find(".js_upfail").hide(),{
nickname:i,
headimgurl:t
}):(!i||n?e.find(".js_nickfail").show():e.find(".js_nickfail").hide(),t?e.find(".js_upfail").hide():e.find(".js_upfail").show(),
!1);
},i;
});