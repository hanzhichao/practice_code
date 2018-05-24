define("common/wx/Excel.js",["tpl/Excel.html.js","common/wx/Cgi.js"],function(t,e){
"use strict";
function n(t,e){
var n=document.createElement("FORM");
document.body.appendChild(n),n.method="POST",n.action=t+"&token="+wx.data.t+"&lang="+wx.data.lang;
var o=document.createElement("input");
return o.setAttribute("name","content"),o.setAttribute("type","hidden"),o.setAttribute("value",a(e)),
n.appendChild(o),n;
}
function a(t){
if(t.dataList&&t.dataList.length>0){
var e=[];
for(var n in t.dataList[0])t.nameMap[n]&&e.push(t.nameMap[n]);
t.rowNames=e;
}
return template.compile(o)(t);
}
{
var o=t("tpl/Excel.html.js");
t("common/wx/Cgi.js");
}
e.doExport=function(t,e){
var a=n(t,e);
a.submit(),document.body.removeChild(a);
};
});