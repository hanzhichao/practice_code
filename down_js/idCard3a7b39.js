define("common/wx/media/idCard.js",["tpl/media/id_card.html.js","widget/media.css","common/qq/Class.js"],function(t,i,a){
"use strict";
var e=(wx.T,t("tpl/media/id_card.html.js")),d=(t("widget/media.css"),t("common/qq/Class.js")),s=wx.url("/misc/getheadimg?1=1"),m=d.declare({
init:function(t){
t&&t.container&&(t.avatar=s+"&fakeid="+t.fakeid,$(t.container).html(wx.T(e,t)).data(t),
this.opt=t);
},
getData:function(){
return this.opt;
}
});
a.exports=m;
});