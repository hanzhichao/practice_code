define("cardticket/send_secure_code.js",["cardticket/select_consumer.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
this.opt=$.extend(!0,{},i,e);
var t=this,e=this.opt;
t.selected_code={},t.selected_total=0,this.opt.buttons=[];
var a;
this.opt.buttons.push({
text:"取消",
click:function(){
this.remove();
},
type:"default"
},{
text:"下一步",
click:function(){
a=[];
for(var c in t.selected_code)t.selected_code[c]&&a.push(c);
return a.length?(f.go(2),w.hide(),g.show(),$(m[0]).hide(),$(m[1]).hide(),$(m[2]).show(),
$(m[3]).show(),t.consumer_select=new o(e),void t.$popup.popup("resetPosition")):void d.err("请选择核销码");
},
type:"primary"
},{
text:"上一步",
click:function(){
f.go(1),w.show(),g.hide(),$(m[0]).show(),$(m[1]).show(),$(m[2]).hide(),$(m[3]).hide();
},
type:"default"
},{
text:"通知核销员",
click:function(){
var e=t.consumer_select.values();
return e?void t.opt.selectComplete(e,a):void d.err("请选择核销员");
},
type:"primary"
}),this.opt.className="align_edge",this.opt.onHide=function(){
this.remove();
};
for(var n=10,p=1,l=(p-1)*n,r=l+n,_=[],h=l;r>h&&h<e.code_list.length;h++)_.push(e.code_list[h]);
t.$popup=$(template.compile("<div><div class='js_step'></div>			<div class='js_select_code_container widget_card_code_wrp'><div class='widget_card_code js_card_code_list'>{each code_list as code i}				<a href='javascript:;' class='card_code' data-code='{code}'>{code}					<div class='card_code_check'><span class='card_code_check_icon'></span></div></a>			{/each}</div><div class='js_code_pager'></div></div>			<div class='js_shop_consumer_container'></div></div>")({
code_list:_
})).popup(e);
var u=t.$popup.popup("get"),m=u.find(".js_btn_p"),f=new c({
container:u.find(".js_step"),
names:["1 选择核销码","2 选择核销员"]
});
e.container=t.$popup.popup("get").find(".js_shop_consumer_container");
var v=e.initComplete;
e.initComplete=function(){
t.$popup.popup("resetPosition"),"function"==typeof v&&v.call(t);
},e.pageChange=function(){
t.$popup.popup("resetPosition");
};
var g=u.find(".js_shop_consumer_container").hide(),w=u.find(".js_select_code_container"),j=u.find(".js_code_pager");
if($(m[0]).show(),$(m[1]).show(),$(m[2]).hide(),$(m[3]).hide(),w.on("click",".card_code",function(){
var e=$(this),o=e.attr("data-code");
if(e.hasClass("selected"))t.selected_code[o]=!1,t.selected_total--;else{
if(t.selected_total>=10)return d.err("一次最多只能选择10个验证码"),!1;
t.selected_code[o]=!0,t.selected_total++;
}
$(this).toggleClass("selected");
}),e.code_list.length>n){
new s({
container:j,
perPage:n,
initShowPage:p,
totalItemsNum:e.code_list.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(o){
var c=o.currentPage;
p=c;
for(var s=(p-1)*n,i=s+n,d=[],a=s;i>a&&a<e.code_list.length;a++)d.push(e.code_list[a]);
w.find(".js_card_code_list").html(template.compile("{each code_list as code i}						<a href='javascript:;' class='card_code{if selected_code[code]} selected{/if}' data-code='{code}'>{code}							<div class='card_code_check'><span class='card_code_check_icon'></span></div></a>						{/each}</div>")({
code_list:d,
selected_code:t.selected_code
}));
}
});
}else j.html("");
}
var o=e("cardticket/select_consumer.js"),c=(e("common/wx/popup.js"),e("common/wx/Cgi.js"),
e("common/wx/Step.js")),s=e("common/wx/pagebar.js"),i={
autoShow:!0,
code_list:[],
title:"选择核销员",
selectComplete:$.noop
},d=e("common/wx/Tips.js");
return t.prototype={
show:function(){
this.$popup.popup("show");
},
getData:function(){
return this.consumer_select.opt.data;
},
hide:function(){
this.$popup.popup("hide");
},
getCacheData:function(){
return this.consumer_select.cache_data;
}
},t;
});