define("cardticket/shelf/shelf_helper.js",["cardticket/parse_data.js","cardticket/common_template_helper.js","common/wx/Cgi.js"],function(r){
"use strict";
var o=[],i=r("cardticket/parse_data.js"),p=r("cardticket/common_template_helper.js"),n=r("common/wx/Cgi.js");
return{
convertTmplToData:{
2:function(r){
var o={
group_info:{
img:"",
pid:[]
}
},i=r.group_info.card_id,p=r.group_info.img;
return i&&o.group_info.pid.push(i),p&&(o.group_info.img=p),o;
},
3:function(r){
for(var o={
group_infos:{
groups:[]
}
},i=r.group_infos.groups.length,p=0;i>p;p++){
var n={
img:"",
pid:[]
},u=r.group_infos.groups[p].card_id,g=r.group_infos.groups[p].img;
u&&n.pid.push(u),g&&(n.img=g),o.group_infos.groups.push(n);
}
return o;
}
},
convertDataToTmpl:{
11:function(r){
var o={
group_infos:{
groups:[],
group_all:!1
}
};
if(4==+r.eid)o.group_infos.group_all=!0;else{
""+r.group_infos.group_all=="1"&&(o.group_infos.group_all=!0);
for(var i=0,p=r.group_infos.groups.length;p>i;i++)o.group_infos.groups.push({
group_id:r.group_infos.groups[i].card_cate+"-"+r.group_infos.groups[i].group_id,
group_name:r.group_infos.groups[i].group_name
});
}
return o;
},
12:function(r){
var i={
group_info:{
img:"",
card_id:"",
card_name:"",
card_type:""
}
},p=r.group_info.pid[0],n=r.group_info.img;
return p&&(i.group_info.card_id=p,o.push(p)),n&&(i.group_info.img=n),i;
},
13:function(r){
for(var i={
group_infos:{
groups:[]
}
},p=r.group_infos.groups.length,n=0;p>n;n++){
var u={
card_id:"",
img:"",
card_name:"",
card_type:""
},g=r.group_infos.groups[n].img,a=r.group_infos.groups[n].pid[0];
g&&(u.img=g),a&&(u.card_id=a,o.push(a)),i.group_infos.groups.push(u);
}
return i;
}
},
EnhanceData:{
2:function(r,o){
var i=r.group_info.card_id,n=o[i]||{};
return r.group_info.card_name=n.title,r.group_info.card_type=p.type_map[n.type]||"未知",
r;
},
3:function(r,o){
for(var i=r&&r.group_infos&&r.group_infos.groups?r.group_infos.groups.length:0,n=0;i>n;n++){
var u=r.group_infos.groups[n].card_id,g=o[u]||{};
r.group_infos.groups[n].card_name=g.title,r.group_infos.groups[n].card_type=p.type_map[g.type]||"未知";
}
return r;
}
},
convertToEid:function(r){
return{
11:1,
12:2,
13:3
}[r]||r;
},
convertToType:function(r){
return{
1:11,
2:12,
3:13,
4:11
}[r]||r;
},
getPids:function(){
return o;
},
getCardDetail:function(r){
var p=o.length;
if(p>0){
for(var u="&cardcnt="+p,g=0;p>g;g++)u+="&cardid"+g+"="+o[g];
var a=wx.url("/merchant/electroniccardmgr?action=batchgetbyid"+u);
n.get({
url:a,
mask:!0
},function(o){
if(o.base_resp&&0==o.base_resp.ret&&o.list){
var p=i.parse_cardlist(o.list).card_cache||{};
r(p||{});
}else r({});
});
}
}
};
});