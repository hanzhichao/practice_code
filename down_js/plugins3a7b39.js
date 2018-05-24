define("service/plugins.js",[],function(){
"use strict";
var l,e=template.render,t=wx.cgiData,i=t.data.plugins,n=i.length;
for(l=0;n>l;l++)i[l].url=wx.url(i[l].url);
$("#js_plugins").html(e("tpl",{
plugins:i
}));
});