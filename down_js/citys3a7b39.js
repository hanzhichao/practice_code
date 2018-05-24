define("common/wx/city/citys.js",["common/wx/city/base.js"],function(e,l){
"use strict";
e("common/wx/city/base.js");
var c='<div class="mod-dialog" style="width: 760px;margin-top: 50px;">		    <div class="mod-dialog__head">		        <h3>选择覆盖范围</h3>		        <a href="javascript:void(0);" class="mod-dialog__close" id="city_close">关闭</a>		    </div>		    <div class="mod-dialog__body mod-dialog__body_nopadding">		        <div class="select-location">		            <div class="select-location__list">		                <div class="select-location__title">请勾选覆盖的范围</div>		                <ul class="select-location__loaction-list" id="city_left">		                </ul>		            </div>		            <div class="select-location__result">		                <div class="select-location__title">已选择的覆盖范围</div>		                <ul class="select-location__result-list" id="city_right" style="overflow-y:auto;height:300px">		                </ul>		            </div>		        </div>		    </div>				    <div class="mod-dialog__footer">		        <a href="javascript:void(0);" class="button button_primary ui-mr-medium" id="city_submit">确认</a>		        <a href="javascript:void(0);" class="button button_default" id="city_cancel">取消</a>		    </div>		</div>	',i='<li class="select-location__location-item" id="city_nation_l">							<div class="select-location__location-prime">							<div class="ui-fl-l">								<label class="label" name="c_selection_label" p="0" c="0">									<i class="label__checkbox-icon"></i>									<span class="label__content">全国</span>								</label>							</div>						</div>										</li>',a='<li class="select-location__location-item " id="province_li_{#province_id#}">					            <div class="select-location__location-prime">					            <div class="ui-fl-l">					                <label class="label" name="c_selection_label" p="{#province_id#}" c="0">					                    <i class="label__checkbox-icon"></i>					                    <span class="label__content">{#province_name#}({#province_city_count#})</span>					                </label>					            </div>					            <a href="javascript:void(0)" name="c_province_open" proid="{#province_id#}" id="province_open_{#province_id#}"  style="display:{#open_display#}">展开</a>					        </div>					        <ul class="select-location__sub-list" id="city_inner_left_{#province_id#}">					        </ul>					    </li>',s='<li class="select-location__sub-item">					        <div class="ui-clearfix ui-ta-r">					        <div class="ui-fl-l">					            <label class="label " name="c_selection_label"  p="{#province_id#}" c="{#city_id#}">					                <i class="label__checkbox-icon"></i>					                <span class="label__content">{#city_name#}</span>					            </label>					        </div>					    </div>					</li>',t='<li class="select-location__result-item"  id="city_nation_r">				        <ul class="select-location__result-sub">				        <li>				            <span class="ui-fl-l">全国</span>				            <a href="javascript:void(0)"  p="0" c="0"  class="select-location__delete">				                <i class="icon select-location__icon-delete"></i>				            </a>				        </li>				    </ul>				</li>',o='<li class="select-location__result-item"  id="province_r_{#province_id#}">					        <ul class="select-location__result-sub" id="provincesub_r_{#province_id#}">					        <li>					            <span class="ui-fl-l">{#province_name#}</span>					            <a href="javascript:void(0)" p="{#province_id#}" c="0" class="select-location__delete" style="display:{#province_del_display#}">					                <i class="icon select-location__icon-delete"></i>					            </a>					        </li>					    </ul>					</li>',n='<li id="city_r_{#city_id#}">				        <span class="ui-fl-l">{#city_name#}</span>				        <a href="javascript:void(0)" p="{#province_id#}" c="{#city_id#}" class="select-location__delete">				            <i class="icon select-location__icon-delete"></i>				        </a>				    </li>',_=[],r=[],d=[];
l.citys=function(e){
function l(e){
_=[],r=[],d=[],$("#city_right").html(),p(e),j=$float({
title:"",
html:c,
width:760,
height:482,
left:(document.documentElement.clientWidth-760)/2,
fix:!0,
style:"none",
leaver:200,
zindex:256,
cover:w.cover,
onInit:function(){
return $("#float_cover").css({
zIndex:"256"
}),$("#city_close").off("click").on("click",b),$("#city_cancel").off("click").on("click",b),
$("#city_submit").off("click").on("click",f),!0;
},
onClose:function(){
return $("#float_cover").css({
zIndex:"255"
}),!0;
}
}),u();
}
function p(e){
if(e&&0!=e.trim().length)for(var l=e.split(";"),c=0;c<l.length;c++){
var i=l[c].split(":");
d[i[0]]||(d[i[0]]=[]),d[i[0]][i[1]]=1,0==i[0]&&(d[i[1]]||(d[i[1]]=[]),d[i[1]][i[0]]=1);
}
}
function v(){
if(d[0]&&d[0][0])$("[name='c_selection_label'][c='0']").addClass("label_selected"),
$("#city_right").html(t);else for(var e=0;e<r.length;e++){
var l=r[e].ps;
if(d[l]&&d[l][0]){
$("[name='c_selection_label'][p="+l+"][c=0]").addClass("label_selected");
var c=$strReplace(o,{
"{#province_del_display#}":"",
"{#province_id#}":l,
"{#province_name#}":_[l].name
});
$("#province_r_"+l).remove(),$("#city_right").append(c);
}else d[l]&&!d[l][0]&&($("[name='c_selection_label'][p="+l+"][c=0]").addClass("label_half-selected"),
$("#province_open_"+l).trigger("click"));
}
}
function m(e){
if(d[0]&&d[0][0])$("[name='c_selection_label'][p="+e+"][c!=0]").addClass("label_selected");else if(d[e]&&d[e][0])$("[name='c_selection_label'][p="+e+"][c!=0]").addClass("label_selected");else if(d[e])for(var l=0;l<r[_[e].idLoc].cs.length;l++){
var c=r[_[e].idLoc].cs[l];
if(d[e][c]){
$("[name='c_selection_label'][p="+e+"][c="+c+"]").addClass("label_selected");
var i=$strReplace(o,{
"{#province_del_display#}":d[e]&&1==d[e][0]?"":"none",
"{#province_id#}":e,
"{#province_name#}":_[e].name
}),a=$strReplace(n,{
"{#province_id#}":e,
"{#city_id#}":c,
"{#city_name#}":_[e].citys[c].name
});
$("#province_r_"+e)[0]||$("#city_right").append(i),$("#city_r_"+c).remove(),$("#provincesub_r_"+e).append(a);
}
}
}
function b(){
j&&(j.close(),j=null,e.over_top||$("#float_cover").css("display","none"));
}
function f(){
var e=[];
if(d[0]&&1==d[0][0])e=[{
id:"0:0",
name:"全国"
}];else for(var l=0;l<r.length;l++){
var c=_[r[l].ps];
if(d[c.id])if(1==d[c.id][0])e.push({
id:"0:"+c.id,
name:c.name
});else for(var i=0;i<r[c.idLoc].cs.length;i++){
var a=r[c.idLoc].cs[i];
if(d[c.id][a]){
var s=_[c.id].citys[a];
e.push({
id:c.id+":"+s.id,
name:s.name
});
}
}
}
w.callback&&"function"==typeof w.callback&&w.callback(e),b();
}
function u(){
$.ajax({
url:"https://wxo2o.qq.com/city/mp/province/all.json",
jsonpCallback:"getallcitysfun",
dataType:"jsonp",
success:function(e){
if(0!=e.errorCode)return void common.showErrWnd(e.errorMsg);
var l=e.data,c=i;
_=[],r=[];
for(var s=0;s<l.length;s++)c+=$strReplace(a,{
"{#province_name#}":l[s].name,
"{#province_id#}":l[s].id,
"{#province_city_count#}":l[s].cityTotalConut,
"{#open_display#}":l[s].cityTotalConut>1?"":"none"
}),_[l[s].id]={
id:l[s].id,
name:l[s].name,
count:l[s].cityTotalConut,
idLoc:s
},r[s]={
ps:l[s].id,
cs:[]
};
$("#city_left").html("").html(c),$("[name='c_province_open']").on("click",function(){
var e=$(this).attr("proid");
$(this).text($("#province_li_"+e).hasClass("select-location__location-item_open")?"展开":"收起"),
h(e);
}),$("[name='c_selection_label']").off("click").on("click",y),v();
},
error:function(){
common.showErrWnd("获取城市详情失败！");
}
});
}
function h(e){
$("#province_li_"+e).hasClass("select-location__location-item_open")?$("#province_li_"+e).removeClass("select-location__location-item_open"):(_[e].citys||$.ajax({
url:"https://wxo2o.qq.com/city/mp/province/"+e+".json?",
jsonpCallback:"get"+e+"citysfun",
dataType:"jsonp",
success:function(l){
if(0!=l.errorCode)return void common.showErrWnd(l.errorMsg);
var c=l.data;
if(c.length>0){
var i=c[0].parentId,a="";
_[i].citys=[],r[_[i].idLoc].cs=[];
for(var t=0;t<c.length;t++)a+=$strReplace(s,{
"{#city_name#}":c[t].name,
"{#city_id#}":c[t].id,
"{#province_id#}":i
}),_[i].citys[c[t].id]={
id:c[t].id,
name:c[t].name,
idLoc:t
},r[_[i].idLoc].cs[t]=c[t].id;
$("#city_inner_left_"+i).html(a),$("[name='c_selection_label']").off("click").on("click",y),
m(e);
}
},
error:function(){
alert("获取详情失败！");
}
}),$("#province_li_"+e).addClass("select-location__location-item_open"));
}
function y(){
var e=!1;
$(this).hasClass("label_selected")?$(this).removeClass("label_selected"):($(this).addClass("label_selected"),
e=!0),e?g($(this).attr("p"),$(this).attr("c")):C($(this).attr("p"),$(this).attr("c")),
$(".select-location__delete").off("click").on("click",function(){
$("[name='c_selection_label'][p='"+$(this).attr("p")+"'][c="+$(this).attr("c")+"]").hasClass("label_selected")&&$("[name='c_selection_label'][p='"+$(this).attr("p")+"'][c="+$(this).attr("c")+"]").trigger("click");
});
}
function g(e,l){
if(0==e)$("#city_right").html(t),d[0]=[1],$("[name='c_selection_label'][p!='0']").addClass("label_selected"),
$("[name='c_selection_label'][p!='0']").removeClass("label_half-selected");else if(0==l){
d[e]=[1],k(e,!0),$("[name='c_selection_label'][p='"+e+"'][c!=0]").addClass("label_selected"),
$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_half-selected");
for(var c=!0,i=0;i<r.length;i++){
var a=r[i].ps;
if(!d[a]||0==d[a][0]){
c=!1;
break;
}
}
c?$("[name='c_selection_label'][p='0'][c='0']").trigger("click"):$("[name='c_selection_label'][p='0']").removeClass("label_selected");
}else{
x(e,l),void 0==d[e]&&(d[e]=[0]),d[e][l]=1;
for(var s=!0,o=_[e].idLoc,i=0;i<r[o].cs.length;i++)if(1!=d[e][r[o].cs[i]]){
s=!1;
break;
}
s?$("[name='c_selection_label'][p="+e+"][c=0]").trigger("click"):$("[name='c_selection_label'][p="+e+"][c=0]").addClass("label_half-selected");
}
}
function C(e,l){
if(0==e)$("#city_right").html(""),d=[[0]],$("[name='c_selection_label'][p!='0']").removeClass("label_selected");else if(0==l)if(d[0]&&1==d[0][0]){
d[0][0]=0,$("#city_nation_r").remove(),d[e]=[0],$("#province_r_"+e).remove(),$("[name='c_selection_label'][p!='0']").addClass("label_selected"),
$("[name='c_selection_label'][p="+e+"]").removeClass("label_selected"),$("[name='c_selection_label'][p='0']").removeClass("label_selected");
for(var c=0;c<r.length;c++){
var i=r[c].ps;
i!=e&&(d[i]=[1],k(i,!0));
}
}else $("#province_r_"+e).remove(),d[e]=[0],$("[name='c_selection_label'][p='"+e+"'][c!=0]").removeClass("label_selected"),
$("[name='c_selection_label'][p='0']").removeClass("label_selected"),$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_half-selected");else if(d[0]&&d[0][0]){
$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_selected"),$("[name='c_selection_label'][p="+e+"][c=0]").addClass("label_half-selected"),
C(e,0),d[e]=[0],k(e,!0);
for(var c=0;c<r[_[e].idLoc].cs.length;c++){
var a=r[_[e].idLoc].cs[c];
a!=l?(x(e,a),d[e][a]=1,$("[name='c_selection_label'][p="+e+"][c="+a+"]").addClass("label_selected")):($("#city_r_"+a).remove(),
d[e][a]=0,$("[name='c_selection_label'][p="+e+"][c="+a+"]").remove("label_selected"));
}
}else if(1==d[e][0]){
d[e][0]=0,$("[name='c_selection_label'][p="+e+"][c=0]").addClass("label_half-selected"),
$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_selected"),k(e,!0);
for(var s=_[e].idLoc,c=0;c<r[s].cs.length;c++){
var a=r[s].cs[c];
a!=l?(x(e,a),d[e][a]=1,$("[name='c_selection_label'][p='"+e+"'][c="+a+"]").addClass("label_selected")):($("#city_r_"+a).remove(),
d[e][a]=0,$("[name='c_selection_label'][p='"+e+"'][c="+a+"]").removeClass("label_selected"));
}
}else{
$("#city_r_"+l).remove(),d[e][l]=0;
for(var t=!0,s=_[e].idLoc,c=0;c<r[s].cs.length;c++)if(1==d[e][r[s].cs[c]]){
t=!1;
break;
}
t?($("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_selected"),$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_half-selected"),
$("#province_r_"+e).remove()):($("[name='c_selection_label'][p="+e+"][c=0]").addClass("label_half-selected"),
$("[name='c_selection_label'][p="+e+"][c=0]").removeClass("label_selected"));
}
}
function k(e,l){
var c=$strReplace(o,{
"{#province_del_display#}":d[e]&&1==d[e][0]?"":"none",
"{#province_id#}":e,
"{#province_name#}":_[e].name
});
if($("#province_r_"+e)[0]){
if(!l)return;
$("#province_r_"+e).remove();
}
$("#city_right").append(c);
}
function x(e,l){
if(!$("#province_r_"+e)[0]){
var c=$strReplace(o,{
"{#province_del_display#}":d[e]&&1==d[e][0]?"":"none",
"{#province_id#}":e,
"{#province_name#}":_[e].name
});
$("#city_right").append(c);
}
var i=$strReplace(n,{
"{#province_id#}":e,
"{#city_id#}":l,
"{#city_name#}":_[e].citys[l].name
});
$("#city_r_"+l).remove(),$("#provincesub_r_"+e).append(i);
}
var j,w={
init:l
};
$.extend(!0,w,e,L);
var L={
container:"",
cover:!1,
callback:null
};
return w;
},window.citys=l.citys;
});