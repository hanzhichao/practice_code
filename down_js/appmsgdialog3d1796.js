define("homepage/appmsgdialog.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/time.js","common/wx/pagebar.js","common/wx/popup.js","tpl/homepage/appmsgdialog.html.js","tpl/homepage/appmsglist.html.js"],function(t,e,a){
"use strict";
function i(t){
return this._init(t),this;
}
var s=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js"),c=(t("biz_web/ui/checkbox.js"),
t("common/wx/time.js")),l=(wx.T,t("common/wx/pagebar.js")),o=(t("common/wx/popup.js"),
t("tpl/homepage/appmsgdialog.html.js")),g=t("tpl/homepage/appmsglist.html.js");
i.prototype._init=function(t){
var e=this;
this.perPage=t.perPage||10,this._cfg=t,this._cfg.selectData=[],"undefined"==typeof this._cfg.multi&&(this._cfg.multi=!0),
"undefined"==typeof this._cfg.maxNum&&1==this._cfg.multi&&(this._cfg.maxNum=1e4),
this.dlgtpl=this._cfg.dlgtpl||o,this.msglisttpl=this._cfg.msglisttpl||g;
var a=this._mDlg=e._buildDialog(),i=a.find(".js_appmsg_tab"),s=a.find(".js_mass_tab"),n=a.find(".js_appmsg_container"),c=a.find(".js_mass_container");
i.click(function(){
i.addClass("selected"),s.removeClass("selected"),n.show(),c.hide();
}),s.click(function(){
i.removeClass("selected"),s.addClass("selected"),n.hide(),c.show();
}),this._bindEvent(this._mDlg);
},i.prototype._buildList=function(t,e,a,i,s){
var c=this,l=this._formatData(e,s);
a=a||".js_listContainer",i=i||".js_loading";
var o=t.find(a),g=t.find(i);
o.html(template.compile(this.msglisttpl)({
app_msg_list:l,
multi:c._cfg.multi
})).show(),g.hide();
o.find(".js_appmsgid").checkbox({
multi:c._cfg.multi,
onChanged:function(t){
if(c._cfg.multi===!0){
if(t[0].checked)c._cfg.selectData.length>=c._cfg.maxNum?($(t[0]).checkbox().checked(!1),
n.err("最多只能选择%s篇文章".sprintf(c._cfg.maxNum))):$.each(l,function(e,a){
a.aid==t[0].value&&c._cfg.selectData.push(l[e]);
});else{
var e=[];
$.each(c._cfg.selectData,function(a){
c._cfg.selectData[a].aid!=t[0].value&&e.push(c._cfg.selectData[a]);
}),c._cfg.selectData=e;
}
c._countTotal(c._cfg.maxNum-c._cfg.selectData.length);
}else c._cfg.selectData=[],$.each(l,function(e,a){
a.aid==t[0].value&&c._cfg.selectData.push(l[e]);
});
}
});
},i.prototype._countTotal=function(t){
0==this._cfg.multi&&this._mDlg.find(".global_extra").hide(),t>=0?this._mDlg.find(".js_remaincnt").text(t):n.err("最多只能选择30篇文章");
},i.prototype._getData=function(t,e,a,i){
if("undefined"!=typeof this._mDlg){
a=a||".js_listContainer",i=i||".js_loading";
var c=this._mDlg.find(a),l=this._mDlg.find(i);
l.show(),c.hide();
}
var o=this,g=$.extend({
action:"list_ex",
begin:0,
count:o.perPage,
type:e&&e.type?e.type:10,
link:o._cfg.link||0,
query:"",
not_support_share:1
},e);
s.post({
url:"/cgi-bin/appmsg",
data:g,
success:function(e){
e&&0==e.base_resp.ret?(o.retData=e.app_msg_list,o.totalnum=e.app_msg_cnt,t(e)):n.err("系统错误");
}
});
},i.prototype._formatData=function(t,e){
var a=[];
return t&&t.app_msg_list&&(a=t.app_msg_list),$.each(this._cfg.selectData,function(t,e){
$.each(a,function(t,i){
e.aid==i.aid&&(a[t].checkbox=!0);
});
}),$.each(a,function(t,i){
a[t].update_time=c.formatDate(new Date(1e3*i.update_time),"YYYY年MM月DD日"),a[t].type=e||10,
9==a[t].type&&(a[t].title||(a[t].title=c.formatDate(new Date(1e3*i.update_time),"YYYY/MM/DD")));
}),a;
},i.prototype._buildDialog=function(){
var t=this,e=$(this.dlgtpl).popup({
title:t._cfg.title||"从素材管理中选择",
buttons:[{
text:"确定",
click:function(){
t._cfg.selectData.length>0&&(1==t._cfg.multi&&t._cfg.selectData.length<=t._cfg.maxNum||0==t._cfg.multi)?(t._cb(t._cfg.selectData),
e.popup("remove")):0==t._cfg.selectData.length?n.err("请选择至少一篇图文"):1==t._cfg.multi&&t._cfg.selectData.length>t._cfg.maxNum&&n.err("最多只能选择30篇文章");
},
type:"primary"
},{
text:"取消",
click:function(){
e.popup("remove");
},
type:"default"
}],
mask:!0,
className:"align_edge"
});
return this._getData(function(a){
t._buildList(e,a),t._initPageBar({
totalnum:t.totalnum,
perpage:t.perPage,
currentpage:1
});
}),this._getData(function(a){
t._buildList(e,a,".js_masslistContainer",".js_mass_loading",9),t._initMassPageBar({
totalnum:t.totalnum,
perpage:t.perPage,
currentpage:1
});
},{
type:9
}),e;
},i.prototype._bindEvent=function(t){
var e=this;
t.find(".js_a_search").on("click",function(){
var a=$.trim(t.find(".js_search").val());
e._getData(function(a){
e._buildList(t,a),e._initPageBar({
totalnum:e.totalnum,
perpage:e.perPage,
currentpage:1
});
},{
query:a
});
}),t.find(".js_search").keyup(function(e){
var a="which"in e?e.which:e.keyCode;
console.log(t.find(".js_search").val()),(13==a||""==t.find(".js_search").val())&&t.find(".js_a_search").trigger("click");
}),e._countTotal(e._cfg.maxNum);
},i.prototype._initPageBar=function(t){
{
var e=this,a=this._mDlg.find(".js_search").val(),i=t&&t.currentpage,s=t&&t.perpage,n=t&&t.totalnum;
new l({
container:e._mDlg.find(".js_pager"),
perPage:s,
initShowPage:i,
totalItemsNum:n,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var n=t.currentPage;
n!=i&&(i=n,e._getData(function(t){
e._buildList(e._mDlg,t);
},{
begin:(i-1)*s,
query:a
}));
}
});
}
},i.prototype._initMassPageBar=function(t){
{
var e=this,a=t&&t.currentpage,i=t&&t.perpage,s=t&&t.totalnum;
new l({
container:e._mDlg.find(".js_masspager"),
perPage:i,
initShowPage:a,
totalItemsNum:s,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var s=t.currentPage;
s!=a&&(a=s,e._getData(function(t){
e._buildList(e._mDlg,t,".js_masslistContainer",".js_mass_loading",9);
},{
begin:(a-1)*i,
type:9
},".js_masslistContainer",".js_mass_loading"));
}
});
}
},i.prototype._cb=function(t){
this._cfg&&this._cfg.callback&&"function"==typeof this._cfg.callback&&this._cfg.callback(t);
},a.exports=i;
});