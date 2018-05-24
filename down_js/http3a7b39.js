define("biz_common/utils/http.js",[],function(){
function e(){
var e=document.getElementsByTagName("html");
if(e&&1==!!e.length){
e=e[0].innerHTML;
var t=e.replace(/[\x00-\xff]/g,""),n=e.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*t.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:e()
};
});