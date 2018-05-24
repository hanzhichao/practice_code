define("entityshop/manage_category.js",["biz_common/utils/string/html.js","common/wx/popup.js","biz_web/utils/upload.js","biz_web/ui/dropdown.js","tpl/entityshop/manage_category.html.js","tpl/entityshop/category_dropdown.html.js","tpl/entityshop/credentials.html.js","tpl/entityshop/credentials_upload.html.js","common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js"],function(t){
"use strict";
function e(t){
this._o={
type:"add",
qrcheckTicket:t.qrcheckTicket,
curCategorList:[],
data:{
err_msg:"",
firstid:"",
first_name:"",
secondid:"",
second_name:""
},
previewImg:!0,
container:null,
canDel:!0,
limit:1,
ini_value_flag:!1
},i(this._o,t),this._init();
}
function i(t,e){
for(var i in e)t[i]=e[i];
}
function n(t,e,i){
return h.getCategorySuc=e,h.getCategoryFail=i,h.categoryList?void("function"==typeof h.getCategorySuc&&(h.getCategorySuc(),
h.getCategorySuc=null)):void(t?a(t):"function"==typeof h.getCategoryFail&&(h.getCategoryFail(),
h.getCategoryFail=null));
}
function o(t,e){
if(h.getCategorySuc=t,h.getCategoryFail=e,!h.gettingCategeory){
if(h.categoryList)return void("function"==typeof h.getCategorySuc&&(h.getCategorySuc(),
h.getCategorySuc=null));
h.gettingCategeory=!0,g.get({
url:"/wxopen/category?action=get_category_list"
},{
done:function(t){
h.gettingCategeory=!1,t&&t.base_resp&&0==t.base_resp.ret&&t.categories?a(t.categories):"function"==typeof h.getCategoryFail&&(h.getCategoryFail(),
h.getCategoryFail=null);
},
fail:function(){
h.gettingCategeory=!1,h.categoryList=null,"function"==typeof h.getCategoryFail&&(h.getCategoryFail(),
h.getCategoryFail=null);
}
});
}
}
function a(t){
if(t){
for(var e=[],i={},n=0,o=t.length;o>n;n++){
var a=t[n];
1==a.level?(a.value=a.id,e.push(a),i[a.id]||(i[a.id]=[])):2==a.level&&(i[a.father]||(i[a.father]=[]),
a.value=a.id,i[a.father].push(a));
}
e.length>0?(h.categoryList={
first:e,
second:i
},"function"==typeof h.getCategorySuc&&(h.getCategorySuc(),h.getCategorySuc=null)):"function"==typeof h.getCategoryFail&&(h.getCategoryFail(),
h.getCategoryFail=null);
}
}
t("biz_common/utils/string/html.js");
var r=(t("common/wx/popup.js"),t("biz_web/utils/upload.js")),s=t("biz_web/ui/dropdown.js"),d=t("tpl/entityshop/manage_category.html.js"),l=t("tpl/entityshop/category_dropdown.html.js"),r=t("biz_web/utils/upload.js"),_=t("tpl/entityshop/credentials.html.js"),c=t("tpl/entityshop/credentials_upload.html.js"),g=t("common/wx/Cgi.js"),p=t("common/wx/Tips.js"),f=t("biz_web/ui/checkbox.js"),h={
getCategorySuc:null,
getCategoryFail:null
};
return e.prototype.setData=function(t,e){
this._o.ini_value_flag=t,this._o.data=e;
},e.prototype._init=function(){
this._initData(),this._render(),this._bindEvent();
},e.prototype._initData=function(){
this._g={
rule:[{
name:"first",
errmsg:"请选择一级服务类目"
},{
name:"second",
errmsg:"请选择二级服务类目"
},{
name:"fileid",
errmsg:"请上传资质证明"
}],
historyFirstStr:"",
historySecondStr:""
};
for(var t=this._o.curCategorList,e=0,i=t.length;i>e;e++){
var n=t[e];
this._g.historyFirstStr+=","+n.first,this._g.historySecondStr+=","+n.second;
}
this._g.historyFirstStr&&(this._g.historyFirstStr+=","),this._g.historySecondStr&&(this._g.historySecondStr+=",");
},e.prototype._render=function(){
var t=this,e=this._o;
e.container.html(template(d)({
type:e.type,
limit:e.limit
})),this._o.ini_value_flag||t._addDropdown();
},e.prototype._addDropdown=function(){
var t,e=this,i=this._o;
t=$(template(l)({
type:i.type,
first:i.data.firstid,
second:i.data.secondid,
err_msg:i.data.err_msg
})).insertBefore(i.container.find(".js_add")),e._initDropdown(t.find(".js_first_dropdown")),
e._o.container.find(".frm_msg[for=add_catagory_btn]").hide(),i.limit=Math.max(0,i.limit-1),
0==i.limit&&i.container.find(".js_add").hide();
},e.prototype._bindEvent=function(){
var t=this,e=this._o.container;
e.on("click",".js_del_category",function(){
var i=$(this);
i.parents(".js_category").remove(),t._o.limit+=1,e.find(".js_add").show(),0==e.find(".js_category").length&&e.find(".frm_msg[for=add_catagory_btn]").show();
}),e.on("click",".js_add_btn",function(){
t._addDropdown();
}),e.on("click",".js_upload_remove",function(){
var t=$(this),e=t.data("fileid"),i=t.parents(".js_preview_item"),n=t.parents(".js_upload_box"),o=1*n.find(".js_upload").data("multi"),a=n.find("input.js_upload_hidden"),r=a.val()||"",s=n.find(".js_remain");
if(i.remove(),!r)return void s.text(o);
r=r.split(",");
for(var d=0,l=r.length;l>d;d++)if(r[d]==e){
r.splice(d,1);
break;
}
s.text(o-r.length),a.val(r.join(","));
});
},e.prototype._initDropdown=function(t){
var e=this,i=this._o;
if("add"==i.type){
if(new s({
container:t,
label:i.ini_value_flag?i.data.first_name:"请选择",
data:h.categoryList.first,
callback:function(i){
t.siblings("input.js_first_dropdown_hidden").val(i),t.siblings(".frm_msg[for=first]").hide();
var n=t.parents(".js_category").find(".js_second_dropdown");
e._initSecondDropdown(n,h.categoryList.second[i]),e._delCredentials(t.parents(".js_category").find(".js_credentials"));
}
}),i.ini_value_flag){
var n=t.parents(".js_category").find(".js_second_dropdown");
e._initSecondDropdown(n,h.categoryList.second[parseInt(i.data.firstid)]);
}
}else{
new s({
container:t,
disabled:!0,
label:i.data.first_name,
data:[]
});
var n=t.parents(".js_category").find(".js_second_dropdown");
e._initSecondDropdown(n,[]);
}
},e.prototype._initSecondDropdown=function(t,e){
if(e){
var i=this,n=this._o;
"add"==n.type?(new s({
container:t,
label:n.ini_value_flag?n.data.second_name:"请选择",
data:e,
callback:function(e,n,o,a){
t.siblings("input.js_second_dropdown_hidden").val(e),t.siblings(".frm_msg[for=second]").hide();
var r=t.parents(".js_category"),s=r.find(".js_credentials");
a.sensitive_type?i._addCredentials(s,a.id):i._delCredentials(s),i._validTheSameCategory(r);
}
}),$('<input type="hidden" name="second" class="js_second_dropdown_hidden" value="">').insertAfter(t),
n.ini_value_flag&&(t.siblings("input.js_second_dropdown_hidden").val(n.data.secondid),
n.type="modify",i._addCredentials(t.parents(".js_category").find(".js_credentials"),n.data.secondid),
n.type="add")):(new s({
container:t,
disabled:!0,
label:n.data.second_name,
data:e
}),$('<input type="hidden" name="second" class="js_second_dropdown_hidden" value="'+n.data.secondid+'">').insertAfter(t),
i._addCredentials(t.parents(".js_category").find(".js_credentials"),n.data.secondid));
}
},e.prototype._validTheSameCategory=function(){
var t=this,e=!0,i="",n="",o=this._g.historySecondStr,a=this._g.historyFirstStr;
return this._o.container.find(".js_category").each(function(){
var r=$(this),s=r.find("input.js_first_dropdown_hidden").val(),d=r.find("input.js_second_dropdown_hidden"),l=d.val();
if(""!==s&&void 0!==s&&null!==s&&""!==l&&void 0!==l&&null!==l){
var _=","+s+",",c=","+l+",";
o&&a&&o.indexOf(c)>=0&&a.indexOf(_)>=0?(e=!1,t._showErrTips({
dom:d,
errmsg:"不能添加相同服务类目",
name:"second",
show:!0
})):i&&n&&i.indexOf(_)>=0&&n.indexOf(c)>=0&&(e=!1,t._showErrTips({
dom:d,
errmsg:"不能添加相同服务类目",
name:"second",
show:!0
})),i&&n?(i+=s+",",n+=l+","):(i+=_,n+=c);
}
}),e;
},e.prototype._addCredentials=function(t,e){
var i=this._o,n=h.categoryList.second,o=[];
for(var a in n)for(var r=n[a],s=0;s<r.length;s++){
var d=r[s];
1==d.sensitive_type&&d.id==e&&(o=d.qualify.exter_list);
}
if(0!=o.length){
var l=this;
t.html(template(_)({
credentials_length:o.length,
err_msg:i.data.err_msg
}));
for(var c=t.find(".js_radio_box"),g=0;g<o.length;g++){
for(var p="",u=o[g].inner_list,s=0;s<u.length;s++)p+=u[s].name+"及";
p=p.substr(0,p.length-1),new f({
container:c,
label:p,
name:g,
type:"radio"
});
}
if(o.length>1)c.find('input[type="radio"]').each(function(){}).on("click",function(){
var t=$(this).attr("name"),e=o[t].inner_list;
l._addCredentialsUploads($(this).parent().parent().parent().parent().find(".upload_container"),e);
}).checkbox(),$(c.find('input[type="radio"]')[0]).click();else{
var u=o[0].inner_list;
l._addCredentialsUploads(t.find(".upload_container"),u);
}
}
},e.prototype._addCredentialsUploads=function(t,e){
for(var i=this._o,n="",o=0;o<e.length;o++){
var a=template(c)({
type:i.type,
name:e[o].name,
url:e[o].url,
token:wx.data.t
});
n+=a;
}
t.html(n);
for(var r=t.find(".js_upload"),o=0;o<r.length;o++)this._initUpload($(r[o]));
},e.prototype._delCredentials=function(t){
t.html("");
},e.prototype._initUpload=function(t){
var e=this,i=t.parents(".js_upload_box");
r.uploadTmpFile({
container:t,
type:2,
multi:!1,
fileSingleSizeLimit:512e4,
onProgress:function(){
i.addClass("uploading");
},
onComplete:function(n,o,a,r){
if(r&&r.base_resp&&0==r.base_resp.ret){
{
var s=t.parents(".js_upload_box"),d=s.find("input.js_upload_hidden"),l=s.find(".js_upload_preview").show(),_=(s.find(".js_remain"),
d.val()||"");
_?_.split(","):[];
}
i.removeClass("uploading"),t.text("重新上传");
var c=s.parent().parent().find(".js_label").text();
d.val(c+","+r.content),l.html(e._getPreviewImgTpl({
tmpFileid:r.content,
fileName:(a.name||r.content).html(!0)
})),s.find(".frm_msg[for=fileid]").hide();
}
}
});
},e.prototype._getPreviewImgTpl=function(t){
var e=r.tmpFileUrl(t.tmpFileid);
return this._o.previewImg?'<img src="'+e+'" />':"<span>"+t.fileName+"</span>";
},e.prototype.getFormData=function(){
var t=!1,e="",i=this,n=(this._o.container.find(".js_category"),this._g.rule),o=[];
return this._o.container.find(".js_category").each(function(){
for(var a=$(this),r={},s=0,d=n.length;d>s;s++){
var l=n[s],_=a.find("input[name="+l.name+"]"),c=!1,g=_.val()||"";
if(_&&0!=_.length){
if(2==s&&_.length>1){
g="";
for(var p=0;p<_.length;p++)$(_[p]).val()&&(g=g+$(_[p]).val()+";");
g=g.substring(0,g.length-1),g.split(";").length!=_.length&&(g="");
}
r[l.name]=g,g?c=!1:(t=!0,e="请完善表单数据",c=!0),i._showErrTips({
dom:_,
errmsg:l.errmsg,
name:l.name,
show:c
});
}
}
for(var f=h.categoryList.first,p=0;p<f.length;p++)f[p].value==parseInt(r.first)&&(r.first_name=f[p].name);
if(f=h.categoryList.second[r.first])for(var p=0;p<f.length;p++)f[p].value==parseInt(r.second)&&(r.second_name=f[p].name);
o.push(r);
}),0==i._o.curCategorList.length&&0==o.length?(i._o.container.find(".frm_msg[for=add_catagory_btn]").show(),
p.err("请添加服务类目"),!1):("add"==this._o.type&&this._validTheSameCategory()===!1&&(t=!0,
e=e||"不能添加相同服务类目"),t?(p.err(e),!1):{
qrcheckTicket:this._o.qrcheckTicket,
data:o
});
},e.prototype._showErrTips=function(t){
var e=$(t.dom).parent().find("p.frm_msg[for="+t.name+"]");
t.show===!0&&e.is(":hidden")?(e.find(".js_err_tip").text(t.errmsg),e.show()):t.show===!1&&e.hide();
},{
classFn:e,
getCategoryList:o,
getCategoryListSync:n
};
});