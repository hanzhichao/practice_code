define("infringement/supplement.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/utils/upload.js"],function(n){
"use strict";
function e(){
var n=wx.cgiData.supplement_copy_id;
if(n&&(n=n.replace(/\t$/,"").split("	"),n&&0!=n.length)){
var e=$("#js_preview"),t=1*$("#js_upload").data("multi"),i=a.mainDom.find(".js_remain"),p=a.mainDom.find("input[name=supplement_copy_id]"),r=Math.max(t-n.length,0),o=[];
i.text(r);
for(var l=0,m=Math.min(n.length,t);m>l;l++)e.append('<span><img src="%s" /><a href="javascript:;" class="in_opt js_remove">删除</a></span>'.sprintf(s.mediaFileUrl(n[l]))),
e.show(),o.push(n[l]);
p.val(o.join("	"));
}
}
function t(){
var n=$("#js_upload"),e=1*n.data("multi");
s.uploadTmpFile({
container:n,
multi:!0,
type:2,
width:106,
onComplete:function(t,i,a,r){
if(r&&r.base_resp&&0==r.base_resp.ret){
var o=n.parent().find("input[type=hidden]"),l=n.parent().parent().find(".upload_preview").show(),m=n.parent().parent().find(".js_remain"),d=o.val();
if(""!=d&&d.split("	").length>=e)return void p.err("最多可以上传%s张".sprintf(e));
o.val(d=""==d?r.content:d+"	"+r.content),l.append('<span><img src="%s" /><a href="javascript:;" class="in_opt js_remove">删除</a></span>'.sprintf(s.tmpFileUrl(r.content)));
var u=e-d.split("	").length;
m.text(u),n.closest(".upload_box").find(".frm_msg").hide(),n.closest(".upload_section").parent().find(".frm_msg").hide();
}
},
onAllComplete:function(){
var t=n.parent().find("input[type=hidden]"),i=t.val(),p=e-i.split("	").length;
n.parent().find(".upload_file_box").html("").hide(),0==p&&n.parent().find("object").css("left","99999999px");
},
onSelect:function(){
var n=a.mainDom.find("input[name=supplement_copy_id]").val();
n.split("	").length>=e&&p.err("最多可以上传%s张".sprintf(e));
}
}),a.mainDom.on("click",".js_remove",function(){
var n=$(this).parent(),t=n.index(),i=n.parent().parent(),p=i.find("input[type=hidden]"),s=p.val().split("	");
n.remove(),s.splice(t,1),i.find(".js_remain").text(e-s.length),p.val(s.join("	"));
}),$("#js_submit").on("click",function(){
var n=$("input[name=supplement_copy_id]"),t=n.val();
if(""==t)return void n.parent().find(".frm_msg").show();
if(t.split("	").length>e)return void p.err("最多可以上传%s张".sprintf(e));
var s=$(this);
s.btn(!1),i.post({
url:wx.url("/acct/infringement"),
type:"post",
data:{
action:"uploadsupplement",
supplement_copy_id:t,
id:wx.cgiData.id
},
mask:!1
},function(n){
n&&n.submit_resp&&0==n.submit_resp.ret?($("#js_supplement").hide(),$("#js_submited").show()):n&&n.submit_resp&&14501==n.submit_resp.ret?(p.err("已补充过材料，请勿重复操作"),
s.btn(!0)):(p.err("系统错误，请重试"),s.btn(!0));
});
});
}
var i=n("common/wx/Cgi.js"),p=n("common/wx/Tips.js"),s=n("biz_web/utils/upload.js"),a={
mainDom:$("#js_supplement")
};
a.mainDom&&0!=a.mainDom.length&&(e(),t());
});