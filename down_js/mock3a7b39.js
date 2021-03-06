define("statistics/menu_stat/summary/mock.js",["biz_common/moment.js","statistics/common.js"],function(_){
"use strict";
function n(_,n){
return{
button_id:n,
parent_button_id:"",
clk_uv:c(_.clk_uv[0],_.clk_uv[1]),
clk_pv:c(_.clk_pv[0],_.clk_pv[1]),
parent_button_key:"parent_btn_key",
button_key:"btn_key"
};
}
function c(_,n){
return _+Math.floor(Math.random()*(n-_));
}
var t=_("biz_common/moment.js"),u=_("statistics/common.js"),v=u.loopDay,k="YYYY-MM-DD",l=t().add("d",-1).format(k),e=(t().add("d",-30).format(k),
t().add("d",-31).format(k)),a=(t(l).add("d",-1).format(k),t(l).add("d",-7).format(k),
t(l).subtract(1,"months").format(k),{
name:"NO0",
from:e,
to:t(e).add("d",10),
menus:{
"点击我":{
clk_uv:[0,10],
clk_pv:[0,10],
menus:{
"关于本宫":{
clk_uv:[30,45],
clk_pv:[30,45]
},
"联系本宫":{
clk_uv:[0,100],
clk_pv:[30,45]
}
}
},
"入会指南":{
clk_uv:[0,100],
clk_pv:[0,50],
menus:{
"如何付费":{
clk_uv:[0,100],
clk_pv:[0,100]
},
"会员分类":{
clk_uv:[0,100],
clk_pv:[0,100]
}
}
}
}
}),m={
name:"NO1",
from:t(e).add("d",9),
to:t(e).add("d",15),
menus:{
"点击我":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"关于本宫":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"联系本宫":{
clk_uv:[0,50],
clk_pv:[0,100]
}
}
},
"优秀文章":{
clk_uv:[0,10],
clk_pv:[0,10],
menus:{
"我为什么这么帅？":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"深入探讨我帅的原因":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"如何变得不那么帅":{
clk_uv:[0,50],
clk_pv:[0,100]
}
}
},
"入会指南":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"如何付费":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"会员分类":{
clk_uv:[0,50],
clk_pv:[0,100]
}
}
}
}
},o={
name:"NO2",
from:t(e).add("d",15),
to:t(e).add("d",25),
menus:{
"点击我":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"关于本宫":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"联系本宫":{
clk_uv:[0,50],
clk_pv:[0,100]
}
}
},
"入会指南":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"如何付费":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"会员分类":{
clk_uv:[0,50],
clk_pv:[0,100]
}
}
},
"会员来信":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"来自吉瑞":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"来自同米":{
clk_uv:[0,100],
clk_pv:[0,100]
},
"来自卢舍尔":{
clk_uv:[0,100],
clk_pv:[0,100]
},
"来自KK":{
clk_uv:[0,100],
clk_pv:[0,100]
}
}
}
}
},r={
name:"NO3",
from:t(e).add("d",25),
to:l,
menus:{
"点击我":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"酷我音乐":{
clk_uv:[0,50],
clk_pv:[0,100]
},
"入会指南":{
clk_uv:[0,50],
clk_pv:[0,100],
menus:{
"会员分类":{
clk_uv:[0,100],
clk_pv:[0,100]
}
}
}
}
},d=[a,m,o,r];
return d=[r,a],function(){
var _=cgiData.list=[];
d.forEach(function(c){
v(c.from,c.to,function(t){
var u=0;
for(var v in c.menus){
u++;
var k=c.name+"-"+u,l=c.menus[v];
if(l.menus){
var e=0;
for(var a in l.menus){
e++;
var m=k+"-"+e,o=l.menus[a],r=n(o,m);
r.version=c.name,r.secondary_menu_name=a,r.primary_menu_name=v,r.parent_button_id=k,
r.ref_date=t,r.id=r.button_id+r.button_key,r.parent_id=r.parent_button_id+r.parent_button_key,
_.push(r);
}
}else{
var d=n(l,k);
d.version=c.name,d.primary_menu_name=v,d.ref_date=t,d.id=d.button_id+d.button_key,
d.parent_button_key="null",d.parent_button_id="0",d.isParent=!0,Object.defineProperty(d,"secondary_menu_name",{
set:function(){}
}),_.push(d);
}
}
});
}),console.log(cgiData.list);
};
});