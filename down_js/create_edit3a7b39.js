define("shop/create_edit.js",["biz_web/lib/json.js"],function(t){
"use strict";
var i=(t("biz_web/lib/json.js"),{
process:function(t){
var i={};
if(t.data=t.data_s?t.data_s.data:{},t.pid?t.cate_id?t.type=3:(t.type=2,t.cate_id=t.data.product_base.category_id[0],
t.cate_name=t.data.product_base.category_name[0]):t.type=1,1!=t.type){
var e=t.data.product_base.property;
i.property={};
for(var a=0,r=e.length;r>a;a++)i.property[e[a].id]=e[a].vid;
i.groupid=[];
for(var a=0,r=t.data.groupid.length;r>a;a++)i.groupid.push(""+t.data.groupid[a]);
if(i.product_name=t.data.product_base.name.html(!1),i.is_guige_same=t.data.product_base.sku_info&&t.data.product_base.sku_info.length>0?!1:!0,
i.is_guige_same){
var s=t.data.sku_list[0];
i.guige_same=s?{
oriprice:s.ori_price?""+ +s.ori_price/100:"",
wxprice:""+ +s.price/100,
stock:""+s.quantity,
code:s.product_code||""
}:{
oriprice:"",
wxprice:"",
stock:"",
code:""
};
}else{
i.js_guige_price_input_wxp={},i.js_guige_price_input_yp={},i.js_guige_stock_input={},
i.js_guige_code_input={},i.js_guige_color_img={};
var _=t.data.product_base.sku_info;
i.guige_multi={};
for(var a=0,r=_.length;r>a;a++)i.guige_multi[_[a].id]=_[a].vid;
for(var o=t.data.sku_list,a=0,r=o.length;r>a;a++){
var u=o[a].sku_id,d=u.split(";");
if(d.length>0){
for(var p=[],c=-1,n=d.length,g=0;n>g;g++)(d[g].indexOf("1075741873")>-1||d[g].indexOf("$颜色")>-1)&&(c=g,
p.push(d[g]));
if(c>-1){
for(var l=0;n>l;l++)l!=c&&p.push(d[l]);
u=p.join(";");
}
}
i.js_guige_color_img[u]=o[a].icon_url||"",i.js_guige_price_input_wxp[u]=""+ +o[a].price/100,
i.js_guige_stock_input[u]=""+o[a].quantity,i.js_guige_price_input_yp[u]=o[a].ori_price?""+ +o[a].ori_price/100:"",
i.js_guige_code_input[u]=o[a].product_code||"";
}
}
var f=t.data.product_base.img,v=f.length;
if(v>0){
if(i.main_img=f[0],i.sub_img=[],v>1)for(var a=1;v>a;a++)i.sub_img.push(f[a]);
}else i.main_img="",i.sub_img=[];
var m=t.data.product_base.detail_html;
if(i.detail=[],""==m)i.hasdetail=!1;else{
m=m.html(!1),m=m.replace(/<p([^>]*)?>(.*?)<\/p>/g,"txt|QQ|$2|WX|"),m=m.replace(/<div([^>]*)?>(\s*)<img([^>]*)src="([^"]*)"([^>]*)>(\s*)<\/div>/g,"img|QQ|$4|WX|");
var h=m.split("|WX|");
if(h.length>0){
i.hasdetail=!0;
for(var a=0,r=h.length;r>a;a++){
var b=h[a].trim();
if(""!=b){
var x=b.split("|QQ|");
i.detail.push("txt"==x[0]?{
type:1,
value:x[1]
}:{
type:2,
value:x[1]
});
}
}
}
}
i.xiangou=t.data.product_base.buy_limit,i.hasxiangou=i.xiangou>0?!0:!1,i.country=t.data.attrext.location.country,
i.province=t.data.attrext.location.province,i.city=t.data.attrext.location.city,
i.haspostfree=1==t.data.attrext.isPostFree?!0:!1,i.isHasReceipt=t.data.attrext.isHasReceipt,
i.isUnderGuaranty=t.data.attrext.isUnderGuaranty,i.onshelf=6==t.data.status?!0:!1,
i.editall=0==t.data.status||1==t.data.status?!0:!1;
}
return t.oedit=i,t;
},
get_colorid:function(t){
var i=[],e="";
(t.indexOf("1075741873")>-1||t.indexOf("$颜色")>-1)&&(i=t.split(";"));
for(var a=0,r=i.length;r>a;a++)(i[a].indexOf("1075741873")>-1||i[a].indexOf("$颜色")>-1)&&(e=i[a]);
return e;
},
left_br:function(t){
return t.replace(/<br>/g,"wxbrwx").html(!0).replace(/wxbrwx/g,"<br>");
}
});
return i;
});