define("common/wx/media/multipleAppmsg.js",["tpl/media/multiple_appmsg.html.js","widget/media.css","common/qq/Class.js"],function(t){
"use strict";
var i=(wx.T,t("tpl/media/multiple_appmsg.html.js")),e=(t("widget/media.css"),t("common/qq/Class.js")),s=wx.url("/cgi-bin/getimgdata"),m={
9:{
1:"图文消息",
2:"图文消息",
3:"图文消息",
4:"图文消息"
},
10:{
1:"图文消息",
2:"图文消息",
3:"图文消息",
4:"图文消息"
},
11:{
1:"活动消息",
2:"第三方应用消息",
3:"商品消息",
4:"单条商品消息"
}
},a=function(t,i){
var e=m[t];
return(e?e[i]:"")||"未知类型";
},n=e.declare({
init:function(t){
if(t&&t.container){
t.appmsg_cover=s+"&mode=small&source=%s&msgid=%s&fileId=%s".sprintf(t.source,t.id,t.file_id),
t.type_msg=a(t.type,t.app_sub_type);
for(var e=0;e<t.multi_item.length;++e)t.multi_item[e].seq+=1;
$(t.container).html(wx.T(i,t)).data(t),this.opt=t;
}
},
getData:function(){
return this.opt;
}
});
return n;
});