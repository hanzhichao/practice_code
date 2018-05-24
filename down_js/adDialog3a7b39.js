define("common/wx/media/adDialog.js",["common/wx/popup.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/Step.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/tooltips.js","tpl/media/dialog/admsg_dialog.html.js","tpl/media/admsg.html.js","tpl/media/adtips.html.js","tpl/media/adcpc.html.js","tpl/media/adcpc_cat.html.js","tpl/media/adcpc_catitem.html.js","tpl/media/adcpc_singleitem.html.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/Cgi.js"),i=t("biz_common/moment.js"),a=t("common/wx/pagebar.js"),s=t("common/wx/Step.js"),n=t("common/wx/Tips.js"),_=(t("biz_web/ui/checkbox.js"),
t("common/wx/tooltips.js")),d=t("tpl/media/dialog/admsg_dialog.html.js"),o=t("tpl/media/admsg.html.js"),c=t("tpl/media/adtips.html.js"),r=t("tpl/media/adcpc.html.js"),l=t("tpl/media/adcpc_cat.html.js"),p=t("tpl/media/adcpc_catitem.html.js"),h=t("tpl/media/adcpc_singleitem.html.js");
template.helper("$changeTime",function(t){
return i.unix(t).format("YYYY年MM月DD日");
});
var g=function(t){
var e=document.createElement("div");
return $(e).text(t),$(e).html();
},m=function(t){
this.onOK=t.onOK,this.idx=t.idx,this.cpc_edit_data=t.cpc_edit_data,this.ad={},this.init();
};
return m.prototype.init=function(){
var t=this;
this.data={},this.dialog&&this.dialog.remove(),this.dialog=$(d).popup({
title:"选择广告",
width:960,
className:"admsg_dialog_wrp",
onShow:function(){
t.$dom=this.$dialogWrp.eq(0),t._popup=this,t._initEvent(),t.cpc_edit_data&&t.cpc_edit_data.single_aids?t._getEditAgainData():t._getAdList(0,10,function(){
t._initPagebar();
});
},
onHide:function(){
this.remove(),t.dialog=null;
}
});
},m.prototype._getAdList=function(t,i,a){
var s=this;
s.$dom.find(".js_loading").show(),s.$dom.find(".js_ad_list").hide(),e.get({
url:"/merchant/ad_seller_manager?action=get_agreetment_ad",
data:{
begin:t,
count:i
}
},function(t){
s.$dom.find(".js_loading").hide(),t&&t.base_resp&&0==t.base_resp.ret?(s._parseCpc(t),
s.cpc_edit_data||s._parseSponsor(t),a&&a()):n.err("系统错误");
});
},m.prototype._getEditAgainData=function(){
var t=this;
t.$dom.find(".js_loading").show(),t.$dom.find(".js_ad_list").hide(),e.get({
url:"/merchant/ad_seller_manager?action=get_editagain_data&category_id="+this.cpc_edit_data.single_category_id+"&aids="+this.cpc_edit_data.single_aids
},function(e){
t.$dom.find(".js_loading").hide(),0==e.base_resp.ret&&(t._getEditAgainDataOK=!0,
e.can_use_single_ad=1,t._getEditAgainDataData=e,t._parseCpc(e)),console.log(e);
});
},m.prototype._parseCpc=function(t){
!t.category_list||t.category_list.length<1||(this.category_list=t.category_list,
this.can_use_single_ad=t.can_use_single_ad,t.ad_info_list.length>0&&!this.cpc_edit_data?this._renderCpc("step1"):(this.$dom.find(".js_prev").hide(),
this._renderCpc("step2")),console.log(t.selected_single_ad_info,t.single_ad_info));
},m.prototype._renderCpc=function(t){
var e=this;
if("step1"==t)this.$dom.find(".js_cpc_area").show(),this.$dom.find(".js_cpc_area .js_admsg_item")[0].category_list=this.category_list;else if("step2"==t){
var i=this.$dom;
if(this.$dom.find(".js_step2_view").show(),this.ad_type=0,this.cpc_edit_data){
var a=[];
this.cpc_edit_data.category_id_list?a=String(this.cpc_edit_data.category_id_list).split("|"):(a.push(this.cpc_edit_data.single_category_id),
this.ad_type=1);
for(var s=0;s<this.category_list.length;s++)for(var n=0;n<a.length;n++)a[n]==this.category_list[s].category_id&&(this.category_list[s].selected=!0);
}
i.find(".js_adtips").html(wx.T(r,{
category_list:this.category_list,
ad_type:this.ad_type,
can_use_single_ad:this.can_use_single_ad
}));
var d=i.find(".js_cpc_type");
d.filter("[value="+this.ad_type+"]").attr("checked",!0);
var o=d.checkbox({
type:"radio",
onChanged:function(){
var t=o.values()[0];
e.cpc_edit_data=void 0;
for(var i=0;i<e.category_list.length;i++)e.category_list[i].selected=!1;
e.ad_type=t,e._renderCpcCat();
}
});
new _({
container:"#js_ad_mini_ask",
content:"仅限定商品类目指的是展示在文章内的广告卡片被限定在流量主选择的类目内",
reposition:!0,
type:"hover",
position:{
left:-50
},
onshow:function(){
this.show();
}
}),this._renderCpcCat();
}
},m.prototype._renderCpcCat=function(){
var t=this.$dom,e=this,i=0==this.ad_type?"checkbox":"radio";
t.find(".js_cpc_cat_container").html(wx.T(l,{
category_list:this.category_list,
ad_type:this.ad_type,
checkbox_type:i
})),t.find(".js_single_ad_container").hide();
var a=0;
this.cpc_edit_data&&this.cpc_edit_data.single_aids&&(a=this.cpc_edit_data.single_aids.split("|").length),
1==this.ad_type?this._changeMiniTips(!0,a):this._changeMiniTips(!1);
var s=t.find(".js_cat_choose_dp"),n=t.find(".js_cpc_cat_item");
s.show();
var _=n.checkbox({
type:i,
onChanged:function(){
var t=_.values();
0==e.ad_type?e._renderCpcCatItem(t):(e._changeMiniTips(!0,0),e._renderCpcItemDetail(t));
}
});
if(this.cpc_edit_data){
{
_.values();
}
0==e.ad_type?e._renderCpcCatItem(this.cpc_edit_data.category_id_list):e._renderCpcItemDetail(this.cpc_edit_data.single_category_id);
}
},m.prototype._changeMiniTips=function(t,e){
t?$(".js_dialog_mini_tips").html("已选择%s个，可选择5个".sprintf(e)).show():$(".js_dialog_mini_tips").html("").hide();
},m.prototype._renderCpcItemDetail=function(t){
var i=this.$dom,a=this;
i.find(".js_single_ad_container").show(),"string"==typeof t&&(t=t.split("|"));
var s=this.category_list.filter(function(e){
return t.indexOf(String(e.category_id))>-1;
});
if($(".js_cat_choose_list").html('<span class="js_single_category_id" data-single_category_id="'+s[0].category_id+'">'+s[0].name+"</span>"),
$(".js_cat_choose_dp").hide(),this._getEditAgainDataOK){
this._getEditAgainDataOK=void 0;
for(var n=a._getEditAgainDataData,_=[],d=[],o=0;o<n.selected_single_ad_info.length;o++)n.selected_single_ad_info[o].selected=!0,
d.push(n.selected_single_ad_info[o]),_.push(n.selected_single_ad_info[o].aid);
for(var o=0;o<n.single_ad_info.length;o++)-1==_.indexOf(n.single_ad_info[o].aid)&&d.push(n.single_ad_info[o]);
d=d.slice(0,20);
for(var o=0;o<d.length;o++)d[o].path_encode=encodeURIComponent(d[o].path);
i.find(".js_single_ad_container").html(wx.T(h,{
single_ad_list:d,
token:wx.data.t
}));
}else a.$dom.find(".js_single_loading").show(),a.$dom.find(".js_single_ad_container").hide(),
e.get({
url:"/merchant/ad_seller_manager?action=get_single_ad_list&category_id="+s[0].category_id,
success:function(t){
a.$dom.find(".js_single_loading").hide();
for(var e=t.single_ad_info,s=0;s<e.length;s++)e[s].path_encode=encodeURIComponent(e[s].path);
i.find(".js_single_ad_container").html(wx.T(h,{
single_ad_list:e,
token:wx.data.t
})).show();
}
});
},m.prototype._renderCpcCatItem=function(t){
var e=this.$dom;
"string"==typeof t&&(t=t.split("|"));
var i=this.category_list.filter(function(e){
return t.indexOf(String(e.category_id))>-1;
});
e.find(".js_cat_choose_list").html(wx.T(p,{
sel_item:i
})),i&&0!=i.length||e.find(".js_cat_choose_list").html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>');
},m.prototype._renderCpcItem=function(){
console.log("render cpc_item");
},m.prototype._parseSponsor=function(t){
var e=t.ad_info_list;
if(!(e.length<1)){
for(var i=this,a=0;a<e.length;a++)if(e[a].ad_tips=e[a].ad_tips.replace(/(\r\n|\n|\r)/gm,"<br />"),
e[a].background=e[a].background.replace(/(\r\n|\n|\r)/gm,"<br />"),e[a].video_info&&(e[a].ad_img=e[a].video_info.thumbUrl),
e[a].ad_request.length>0){
e[a].ad_request=JSON.parse(e[a].ad_request);
for(var s=0;s<e[a].ad_request.length;s++)e[a].ad_request[s].title=g(e[a].ad_request[s].title),
e[a].ad_request[s].content=g(e[a].ad_request[s].content),("no_compete"==e[a].ad_request[s].field||"no_policy"==e[a].ad_request[s].field)&&(e[a].ad_request[s].content=e[a].ad_request[s].content.split(", "));
}else e[a].ad_request=[];
i.total_num=t.total_num,i._initStep(),i._setStep(1),i._renderSponsor(e),i.$dom.find(".js_ad_list").show();
}
},m.prototype._renderSponsor=function(t){
var e=this.$dom,i=e.find(".admsg_col");
e.find(".js_step1_view").show(),i.empty();
for(var a=0;a<t.length;a++){
t[a].insert_status=t[a].idx!=this.idx+1?1:3==t[a].status?4:3==t[a].ad_status||4==t[a].ad_status?2:0;
var s=$(wx.T(o,t[a]));
s[0].ad_data=t[a],i.eq(a%2).append(s[0]);
}
},m.prototype._setStep=function(t){
this.stepNav.setStep(t),this.$dom.find(".js_step"+(3-t)+"_view").hide(),this.$dom.find(".js_step"+t+"_view").show();
},m.prototype._initStep=function(){
this.stepNav=new s({
container:".js_step",
selected:1,
names:["1.选择广告","2.广告详情"]
});
},m.prototype._initPagebar=function(){
var t=this;
t.total_num>10&&new a({
container:t.$dom.find(".js_pagebar").show(),
perPage:10,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:t.total_num,
callback:function(e){
t.ad={};
var i=e.currentPage;
t._getAdList(10*(i-1),10);
}
});
},m.prototype._initEvent=function(){
var t=this,e=this.$dom;
e.on("click",".js_admsg_item",function(){
$(".js_admsg_item.selected").removeClass("selected"),$(this).addClass("selected"),
t.ad=$(this)[0].ad_data,t.ad||(t.ad=$(this)[0].category_list);
}),e.on("click",".js_next",function(){
return $.isEmptyObject(t.ad)?(n.err("请选择广告"),!1):(t._setStep(2),void(t.ad.ad_id?e.find(".js_adtips").html(wx.T(c,{
ad_info:t.ad,
title:wx.cgiData.nick_name
})):t._renderCpc("step2")));
}),e.on("click",".js_prev",function(){
t._setStep(1);
}),e.on("click",".js_submit",function(){
if(!t.ad.ad_id)if(0==t.ad_type){
for(var i=e.find(".js_cpc_cat_item[checked=checked]"),a=[],s=0;s<i.length;s++)a.push($(i[s]).attr("data-category_id"));
if(a.length<1)for(var i=e.find(".js_cpc_cat_item"),a=[],s=0;s<i.length;s++)a.push($(i[s]).attr("data-category_id"));
t.ad={
ad_type:0,
category_id_list:a
};
}else{
var _=e.find(".js_single_category_id").attr("data-single_category_id"),d="",o=e.find(".js_cpc_single_item.selected");
if(o.each(function(){
d+=$(this).attr("data-single_aid")+"|";
}),!d)return void n.err("请至少选择一个单品");
d=d.substring(0,d.length-1),t.ad={
ad_type:1,
single_category_id:_,
single_aids:d,
single_aids_length:o.length,
image_url:o.attr("data-image_url")
};
}
t._popup.remove(),t.dialog=null,t.onOK&&t.onOK(t.ad);
}),e.on("click",".js_cat_choose_del",function(t){
1==$(this).parent().parent().find(".js_cat_choose_del").length?$(this).parent().parent().html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>'):$(this).parent().remove();
var i=$(t.target).attr("data-category_id");
e.find(".js_cpc_cat_item[value="+i+"]").checkbox("checked",!1);
}),e.on("click",".js_clear_all",function(){
return $(this).parent().html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>'),
e.find(".js_cpc_cat_item[checked=checked]").checkbox("checked",!1),!1;
}),e.on("click",".js_cat_choose_list",function(t){
t.target&&t.target.className.indexOf("js_cat_choose_del")>-1||(e.find(".js_cat_choose_dp").is(":hidden")?e.find(".js_cat_choose_dp").show():e.find(".js_cat_choose_dp").hide());
}),e.on("click",".js_cpc_single_item",function(){
var i=e.find(".js_cpc_single_item.selected"),a=i.length;
if($(this).hasClass("selected"))$(this).removeClass("selected"),a-=1;else{
if(a>=5)return void n.err("最多只能选择5个单品");
$(this).addClass("selected"),a+=1;
}
t._changeMiniTips(!0,a);
});
},m;
});