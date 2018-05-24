define("statistics/tooltip.js",[],function(){
"use strict";
var t=$("div.help_content"),i=$("div.ext_info.help");
i.hover(function(){
t.show();
},function(){
t.hide();
});
});