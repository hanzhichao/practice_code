define("common/wx/noticeBox.js",["common/qq/Class.js","tpl/noticeBox.html.js"],function(t){
"use strict";
var n=wx.T,o=t("common/qq/Class.js"),s=t("tpl/noticeBox.html.js"),i=o.declare({
init:function(t){
var o=$(t.container).addClass("on"),i=$(n(s,{
list:t.list
}));
o.append(i),$(".mp_notice_item:first-child",o).addClass("no_extra");
}
});
return i;
});