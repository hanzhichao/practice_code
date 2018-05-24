define("biz_web/ui/input/targetips.js",[],function(){
"use strict";
var t='<p class="frm_msg fail js_targetip"><span for="%s" class="frm_msg_content">%s</span></p>',n={
targetParentLevel:1
},e=function(t){
t=$.extend(!0,{},n,t);
var e=this||{};
e.opts=t,e.container="string"==typeof t.container?$(t.container):t.container;
};
return e.prototype={
err:function(n,e){
var r=this;
if(e=e?e:r.opts.defaultTargetName){
var a=r.container.find("[name="+e+"]"),i=a;
if(r.opts.targetParentLevel>0)for(var s=r.opts.targetParentLevel;s>0;)i=i.parent(),
s--;
var o=i.find(".js_targetip");
o&&o.length>0?o.find("span").text(n):(o=$(t.sprintf(e,n)),i.append(o)),o.show().find("span").show();
}
},
clear:function(){
this.container.find(".frm_msg").hide();
}
},e;
});