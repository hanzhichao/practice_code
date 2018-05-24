define("operation/rumor_detail.js",["operation/showWord.js"],function(t){
"use strict";
function o(t,o){
o=o||{
digest:"",
rumor_title:"",
dispel_list:[]
},$(t).html(template.render("js_module",o));
}
var e=t("operation/showWord.js");
o("#js_detail",cgiData),e.showAnimation();
});