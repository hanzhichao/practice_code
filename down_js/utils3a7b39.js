define("wifi/homemanager_modify/utils.js",[],function(t,f,e){
"use strict";
var a={};
a.MAX_APPMSG_NUM=3,a.isValidColor=function(t){
return/^[0-9a-fA-F]{3}$/.test(t)||/^[0-9a-fA-F]{6}$/.test(t);
},a.isValidUrl=function(t){
var f=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i;
return f.test(t);
},a.makeData=function(t){
return"string"==typeof t?{
status:{
success:!1,
msg:t
}
}:$.extend(!0,{},{
status:{
success:!0
},
data:t
});
},a.getDateStr=function(t){
var f=new Date(1e3*t);
return[f.getFullYear(),f.getMonth()+1,f.getHours()].join("-");
},a.htmlDecode=function(t){
return $("<div></div>").html(t).text();
},e.exports=a;
});