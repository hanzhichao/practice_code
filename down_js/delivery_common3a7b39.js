define("shop/delivery_common.js",["biz_common/moment.js"],function(e){
"use strict";
var t=e("biz_common/moment.js");
wx.cgiData.data.deliveryType={
10000027:"平邮",
10000028:"快递",
10000029:"EMS"
},template.helper("$replaceCity",function(e,t){
return"市"===e[e.length-1]?e.substr(0,e.length-1):t?(e||"").html():e;
}),template.helper("$dateFormat",function(e,n){
return t.unix(e).format(n).replace(",","&nbsp;");
});
var n=wx.cgiData.data.deliveryType||{};
template.helper("$parseType",function(e){
return n[e]||e;
}),template.helper("$includedata",function(e,t){
return template.render(e,{
data:t
});
}),template.helper("$yuan2fen",function(e){
return"undefined"!=typeof e?e/100:"";
});
});