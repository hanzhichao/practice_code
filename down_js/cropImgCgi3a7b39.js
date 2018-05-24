define("common/wx/mpEditor/common/cropImgCgi.js",["common/wx/Cgi.js"],function(o){
"use strict";
function r(o){
n.post({
url:"/cgi-bin/cropimage?",
data:{
imgurl:o.imgurl,
x1:o.x1,
y1:o.y1,
x2:o.x2,
y2:o.y2
}
},{
done:function(r){
r&&r.base_resp&&0==r.base_resp.ret&&r.imgurl?"function"==typeof o.onsuccess&&o.onsuccess({
oriUrl:o.imgurl,
url:r.imgurl,
file_id:r.file_id||""
}):"function"==typeof o.onerror&&o.onerror(r||{});
},
fail:function(){
"function"==typeof o.onerror&&o.onerror({
retcode:-2
});
}
});
}
var n=o("common/wx/Cgi.js");
return{
getUrl:r
};
});