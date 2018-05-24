define("shop/appmsg_shop.js",[],function(){
"use strict";
var s=$("#js_error"),t=$("#js_shopcard"),e=function(){
s.show(),t.hide();
};
$.ajax({
url:"/merchant/goods?type=13&pid="+pid+"&token="+cgiData.t+"&lang=zh_CN&f=json",
success:function(s){
if(s&&s.base_resp&&0==s.base_resp.ret){
for(var t=s.product_data,r=t.product_base,a=t.sku_list,i=1/0,o=0,c=a.length;c>o;++o){
var n=a[o];
n.price<i&&(i=n.price);
}
var p=r.ori_price/100;
i/=100,$("#js_shopcard_thumb").attr("src",r.img[0]),$("#js_shopcard_name").text(r.name),
$("#js_price").html("&yen;"+i.toFixed(2)),$("#js_ori_price").html("&yen;"+p.toFixed(2)),
6!=t.status?$("#js_status").text("已下架"):t.quantity<=0&&$("#js_status").text("无库存");
}else e();
},
error:function(){
e();
}
});
});