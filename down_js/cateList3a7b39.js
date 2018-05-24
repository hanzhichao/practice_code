define("homepage/cateList.js",["homepage/importAppmsgList.js","tpl/homepage/plugins/plugin2_edit/cate_list_edit.html.js","biz_web/ui/input/lentips.js","common/wx/Tips.js","common/wx/popover.js"],function(t){
"use strict";
var e=t("homepage/importAppmsgList.js"),i=t("tpl/homepage/plugins/plugin2_edit/cate_list_edit.html.js"),n=t("biz_web/ui/input/lentips.js"),s=t("common/wx/Tips.js"),a=t("common/wx/popover.js"),r={
cname:"分类名",
appmsg_list:[{
title:"标题示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6vDmpWKn1M8Sk9tNGOiaGPPmxxPoXR7GM16AFk2lsfiaL2iapIm0RFicCvA/300",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
},{
title:"标题示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6vDmpWKn1M8Sk9tNGOiaGPPmxxPoXR7GM16AFk2lsfiaL2iapIm0RFicCvA/300",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
},{
title:"标题示例",
cover:"http://mmbiz.qpic.cn/mmbiz/Q3auHgzwzM5wLlGTou7JL0oFS9yZGIK6vDmpWKn1M8Sk9tNGOiaGPPmxxPoXR7GM16AFk2lsfiaL2iapIm0RFicCvA/300",
aid:"0",
link:"javascript:void(0);",
digest:"摘要示例"
}]
},o=function(t){
this.opt=t;
var e=t.container,n=t.tab_container,s=t.idx;
this.idx=s,this.default_cname="分类名",this.renderjson=t.data,this.renderjson.cname=this.renderjson.cname||this.default_cname,
e.append('<div style="display:none;" class="js_edit_cate_list_area js_edit_cate_list_area_'+s+'">'+i+"</div>");
var a=$('<li class="tab_nav js_tab_nav_item"><a href="javascript:void(0);">'+this.renderjson.cname+"</a></li>");
this.$li=a,n.find(".js_add_nav").before(a),this._initEditArea(),!!t.setOuterJson&&t.setOuterJson(this.getrenderjson());
};
return o.prototype.cate_default_json=r,o.prototype._initEditArea=function(){
var t=this.opt,i=this,s=t.container,r=t.idx,o=this.$li,p=s.find(".js_edit_cate_list_area_"+r),c=p.find(".js_cate_input");
new n({
input:c.val(this.renderjson.cname.html(!1)),
tip:p.find(".js_cate_input_len_tips"),
maxlimit:4,
seg:"/",
trim:!0,
className:"",
callback:function(t,e){
t?(c.parent().addClass("warn"),i.renderjson.cname=""):(c.parent().removeClass("warn"),
i.renderjson.cname=e.value),i._renderCname();
}
}),i.isSorting=!1;
var l=this.renderjson.appmsg_list||[];
i._importAppmsgList=new e({
container:p.find(".js_import_appmsglist"),
maxNum:30,
title:"内容列表",
list:l,
callback:function(t){
i._renderTpl(i.getrenderjson(t)),i.show();
},
startSort:function(){
i.isSorting=!0;
},
endSort:function(){
i.isSorting=!1;
}
}),o.click(function(){
i.show();
}),p.find(".js_del_cate").click(function(){
var t=$(this);
new a({
dom:t,
content:"确定删除此分类？",
place:"bottom",
margin:"center",
buttons:[{
text:"确定",
click:function(){
this.remove(),i.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
});
},o.prototype.getrenderjson=function(t){
var e=this.opt,i=e.idx,n=e.container,s=n.find(".js_edit_cate_list_area_"+i),a=s.find(".js_cate_input"),r=$.extend(!0,{},this.cate_default_json);
t=t||this.renderjson.appmsg_list,t&&t.length>0?(r.appmsg_list=t,this.renderjson.appmsg_list=t):this.renderjson.appmsg_list=[];
var o=$.trim(a.val());
return o&&(r.cname=o,this.renderjson.cname=o),r;
},o.prototype._renderCname=function(){
var t=this.opt,e=this.renderjson.cname||this.default_cname;
this.$li.find("a").text(e),!!t.renderCnameCallback&&t.renderCnameCallback(e);
},o.prototype._renderTpl=function(t){
var e=this.opt;
!!e.renderCallback&&e.renderCallback(t);
},o.prototype.initShow=function(){
this._renderTpl(this.getrenderjson()),this.show();
},o.prototype.show=function(){
var t=this.opt,e=t.container,i=t.idx;
e.find(".js_edit_cate_list_area").hide(),e.find(".js_edit_cate_list_area_"+i).show();
var n=t.tab_container;
n.find(".selected").removeClass("selected"),this.$li.addClass("selected"),!!t.afterShow&&t.afterShow();
},o.prototype.remove=function(){
var t=this.opt;
t.canRemove()?(this.$li.remove(),!!t.afterRemove&&t.afterRemove()):s.err("至少保留一个分类");
},o.prototype.getEditData=function(){
if(this.isSorting)return s.err("排序完成后才能发布"),!1;
var t=this.renderjson,e={};
if(!t.cname)return s.err("分类名称必须为1-4个字"),!1;
if(e.cname=t.cname,!t.appmsg_list||t.appmsg_list.length<=0)return s.err("请至少选择一篇文章"),
!1;
for(var i=[],n=0,a=t.appmsg_list.length;a>n;++n)i.push(t.appmsg_list[n].aid);
return e.aid_list=i,e;
},o;
});