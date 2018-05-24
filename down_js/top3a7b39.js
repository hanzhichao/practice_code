define("statistics/interface/top.js",["common/wx/top.js"],function(t){
"use strict";
var e=t("common/wx/top.js"),s=[{
id:"interface_stat",
name:"接口分析",
url:"/misc/interfaceanalysis?type=daily"
}],a=new e("#js_topTab",s);
a.selected("interface_stat");
});