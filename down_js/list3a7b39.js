define("authorize/list.js",[],function(){
"use strict";
!function(t){
$.each(t.item,function(t,e){
var n=new Date(1e3*e.component_auth_time),i="";
i=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()+" ",i+=n.getHours()>=10?n.getHours():"0"+n.getHours(),
i+=":",i+=n.getMinutes()>=10?n.getMinutes():"0"+n.getMinutes(),e.auth_time=i;
}),$("#js_body").html(template.render("tpl",t));
}(wx.cgiData);
});