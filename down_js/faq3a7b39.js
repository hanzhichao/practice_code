define("business/faq.js",["common/wx/anchor.js"],function(s){
"use strict";
s("common/wx/anchor.js"),$(".jsLink").click(function(){
$(this).addClass("selected").siblings().removeClass("selected");
}),$(".jsLink").anchor();
});