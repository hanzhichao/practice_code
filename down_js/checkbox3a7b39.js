define("biz_web/ui/checkbox.js",["tpl/biz_web/ui/checkbox.html.js"],function(t){
"use strict";
function e(t){
var e=$(t);
e.each(function(){
var t=$(this),e=t.prop("checked"),n=t.parent();
e?n.addClass("selected"):n.removeClass("selected");
});
}
function n(t){
var e=$(t);
e.each(function(){
var t=$(this).prop("disabled"),e=$(this).parent();
t?e.addClass("disabled"):e.removeClass("disabled");
});
}
function i(){
return"checkbox"+s++;
}
var a={
container:null,
label:"",
name:"",
type:"checkbox"
},c=t("tpl/biz_web/ui/checkbox.html.js"),r=wx.T,s=1,o=1,p=function(t){
this.options=$.extend(!0,{},a,t),this.options.index=o++,this.$container=$(this.options.container),
this.$dom=$(r(c,this.options)).appendTo(this.$container),this.$input=this.$dom.find("input"),
this.$input.checkbox();
};
return p.prototype={
checked:function(t){
return"undefined"!=typeof t&&(this.$input.prop("checked",t),e(this.$input)),this.$input.prop("checked");
},
disabled:function(t){
return"undefined"!=typeof t&&(this.$input.prop("disabled",t),n(this.$input)),this.$input.prop("disabled");
}
},$.fn.checkbox=function(t){
var a,c,r,s,o=!1;
"boolean"==typeof t?a=t:$.isPlainObject(t)?(a=t.multi,c=t.onChanged):"string"==typeof t?(o=!0,
r=t,s=[].slice.call(arguments,1)):"undefined"==typeof t&&(t={}),"undefined"==typeof a&&(a=this.is("input[type=checkbox]"));
var p=this,d=a?"checkbox":"radio",h={
checked:function(t){
return p.attr("checked",t),p.prop("checked",t),e(p),p;
},
disabled:function(t){
return p.attr("disabled",t),p.prop("disabled",t),n(p),p;
},
value:function(){
var t=p.eq(0);
return t.prop("checked")?t.val():"";
},
values:function(){
var t=[];
return p.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
},
adjust:function(t){
var n;
return n="string"==typeof t?t.split(","):t,n&&n.length>0&&p.each(function(){
var t=$(this);
n.indexOf(t.val())>=0&&(t.attr("checked",!0),e(t));
}),this;
},
disable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!0),n(t));
}),this;
},
setall:function(t){
p.each(function(){
var e=$(this);
e.attr("disabled",t?!1:!0),n(e);
});
},
enable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!1),n(t));
}),this;
},
label:function(t){
return t&&(p.parent().find(".lbl_content").text(t),p.attr("data-label",t)),p;
}
};
return o&&"function"==typeof h[r]?h[r].apply(h,s):(this.addClass("frm_"+d).each(function(){
var t=$(this),e=t.parent();
if(!e.is("label")){
var n=t.attr("data-label")||"";
e=$('<label class="frm_{type}_label"><i class="icon_{type}"></i></label>'.format({
type:d
})).append("<span class='lbl_content'>{content}</span>".format({
content:n.html(!0)
})),e.insertBefore(t).prepend(t);
}
if(!this.id){
var a=i();
this.id=a;
}
e.attr("for",this.id);
}),e(this),n(this),t&&t.initOnChanged&&"function"==typeof c&&p.parent().find("input[type=checkbox],input[type=radio]").each(function(){
c.call(h,$(this));
}),this.parent().delegate("input[type=checkbox],input[type=radio]","click",function(){
var t=$(this),n=t.prop("checked");
a?(t.attr("checked",n),e(t)):(p.attr("checked",!1),t.attr("checked",!0).prop("checked",!0),
e(p)),"function"==typeof c&&c.call(h,t);
}).addClass("frm_"+d+"_label"),h);
},p;
});