define("shop/test.js",["shop/config.js","biz_web/ui/dropdown.js"],function(e){
"use strict";
function s(){
this.init();
}
var a=wx.T,t=e("shop/config.js"),n=e("biz_web/ui/dropdown.js"),d=t.defaultData,h=t.tmpls,o=$("#js_shop_header"),l=$("#js_shop_content"),i=$(".js_shop_edit"),r=$("#js_header_shop_edit"),c=$("#js_content_shop_edit"),_=$("#js_new_shelf"),u="js_shelf_wrapper",v="shelf_data";
s.prototype={
init:function(){
var e=this;
d.header&&h.header&&(o.html(a(h.header,{
header:d.header
})).data(v,d.header),o.delegate(".js_edit","click",function(){
i.hide(),r.html(a(h.header_edit,{
header:o.data(v)
})).show(),r.find(".js_name").keyup(function(){
e.flush_header();
});
})),$('<div class="'+u+'"></div>').appendTo(l).html(a(h.shelves,{
shelves:d.shelves
})).data(v,d.shelves),l.delegate(".js_edit","click",function(){
var s=$(this),t=s.closest("."+u),o=t.data(v),l=o.number,r=o.category_name;
i.hide(),c.css("top",t.position().top+"px").html(a(h.shelves_edit,{
shelves:o
})).show();
var _=new n({
container:"#js_category",
label:"选择分类",
data:[{
name:"男装",
value:1
},{
name:"女装",
value:2
},{
name:"童装",
value:3
}],
callback:function(s,a){
$("#js_category").data("category_name",a),a!=r&&(r=a,e.flush_shelf(t));
}
});
r&&_.selected(r);
var f=new n({
container:"#js_number",
label:"4",
data:[{
name:"2",
value:2
},{
name:"4",
value:4
},{
name:"6",
value:6
},{
name:"8",
value:8
},{
name:"10",
value:10
}],
callback:function(s,n){
var o=parseInt(n,10);
if($("#js_number").data("number",o),o!=l){
for(var i=[],r={
goods:i
},c=($("#js_goods_list").find(".js_goods").length,0);o>c;c++)i.push(d.shelves.goods[0]);
$("#js_goods_list").html(a(h.shelves_edit_goods,{
shelves:r
})),l=o,e.flush_shelf(t);
}
}
});
l&&f.selected(""+l);
}),l.delegate(".js_delete","click",function(){
i.hide(),$(this).closest("."+u).remove();
}),_.click(function(){
$('<div class="'+u+'"></div>').appendTo(l).html(a(h.shelves,{
shelves:d.shelves
})).data(v,d.shelves);
});
},
flush_header:function(){
var e={
name:r.find(".js_name").val()
};
o.html(a(h.header,{
header:e
})).data(v,e);
},
flush_shelf:function(e){
var s={
number:$("#js_number").data("number")||4,
category_name:$("#js_category").data("category_name")||"商品分组名称"
};
s.goods=[];
for(var t=0;t<s.number;t++)s.goods.push(d.shelves.goods[0]);
e.data(v,s).html(a(h.shelves,{
shelves:s
}));
},
submit:function(){
var e=(o.data(v),[]),s=l.find("."+u);
s.each(function(){
e.push($(this).data(v));
});
}
},new s;
});