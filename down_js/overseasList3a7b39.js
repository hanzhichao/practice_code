define("common/wx/overseasList.js",[],function(){
"use strict";
var e={
1e3:{
country:"阿联酋",
mobilePrefix:"+971"
},
1005:{
country:"澳大利亚",
mobilePrefix:"+61"
},
1014:{
country:"加拿大",
mobilePrefix:"+1"
},
1017:{
country:"中国大陆",
mobilePrefix:"+86"
},
1018:{
country:"德国",
mobilePrefix:"+49"
},
1022:{
country:"法国",
mobilePrefix:"+33"
},
1023:{
country:"英国",
mobilePrefix:"+44"
},
1031:{
country:"香港",
mobilePrefix:"+852"
},
1034:{
country:"印度尼西亚",
mobilePrefix:"+62"
},
1040:{
country:"意大利",
mobilePrefix:"+39"
},
1042:{
country:"日本",
mobilePrefix:"+81"
},
1043:{
country:"柬埔寨",
mobilePrefix:"+855"
},
1045:{
country:"韩国",
mobilePrefix:"+82"
},
1054:{
country:"澳门",
mobilePrefix:"+853"
},
1059:{
country:"马来西亚",
mobilePrefix:"+60"
},
1062:{
country:"荷兰",
mobilePrefix:"+31"
},
1063:{
country:"新西兰",
mobilePrefix:"+64"
},
1065:{
country:"菲律宾",
mobilePrefix:"+63"
},
1070:{
country:"俄罗斯",
mobilePrefix:"+7"
},
1074:{
country:"新加坡",
mobilePrefix:"+65"
},
1077:{
country:"泰国",
mobilePrefix:"+66"
},
1080:{
country:"台湾",
mobilePrefix:"+886"
},
1082:{
country:"美国",
mobilePrefix:"+1"
},
1084:{
country:"越南",
mobilePrefix:"+84"
},
1113:{
country:"芬兰",
mobilePrefix:"+358"
}
},r={},i=[];
for(var o in e)i.push(parseInt(o)),r[o]=e[o].mobilePrefix;
return{
mobilePrefix:r,
countryCode:i
};
});