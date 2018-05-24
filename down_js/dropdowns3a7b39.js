define("common/wx/dropdowns.js",["biz_web/widget/dropdown.css","tpl/dropdowns.html.js"],function(e,n,t){
"use strict";
function i(e){
var n=this,t=".jsDropdownsList";
n.container=$(e.container),n.container.addClass("dropdown_menu dropdown_checkbox"),
e.render&&(e.renderHtml="",$.each(e.data,function(n,t){
e.renderHtml+=e.render(t);
})),e=$.extend(!0,{},d,e),e.label?e.hasClass&&n.container.addClass(e.hasClass):e.label=e.lanbel,
this.isDisabled=e.disabled,e.disabled&&n.container.addClass("disabled"),e.length=e.data.length,
e.row<=0&&(e.row=e.length>30?e.length%3>0?(e.length-e.length%3)/3+1:e.length/3:10),
e.col=e.length%e.row>0?(e.length-e.length%e.row)/e.row+1:e.length/e.row,n.opt=e,
n.container.html(template.compile(o)(e)).find(t).hide(),n.bt=n.container.find(".jsDropdownBt"),
n.dropdown=n.container.find(t),n.checkboxes=n.container.find(".js_select").checkbox({
onChanged:function(){
return!1;
}
}).adjust(n.opt.values).disable(n.opt.disabledValue),$.each(e.data,function(e,t){
t.value&&$.isPlainObject(t.value)&&$.data(n.dropdown.find(".jsDropdownItem")[e],"value",t.value);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(n.bt.find(".jsBtLabel").text(e.data[e.index].name||e.label),
n.value=e.data[e.index].value),n.dropdown.on("click",function(){
n.clickin=!0;
}),n.bt.on("click",function(){
e.disabled||(n.container.addClass("open"),n.dropdown.show()),n.clickin=!0;
}),$(document).on("click",function(){
n.clickin?n.clickin=!1:(n.container.removeClass("open"),n.dropdown.hide());
}),function(){
$.each(n.container.find(".js_btn"),function(t,i){
e.buttons[t].click&&$(i).click(function(){
return e.buttons[t].click.apply(n),!1;
});
});
}();
}
e("biz_web/widget/dropdown.css");
var o=e("tpl/dropdowns.html.js"),d={
lanbel:"添加到",
data:[],
callback:$.noop,
render:$.noop,
delay:500,
disabled:!1,
row:-1,
values:[],
disabledValue:[]
};
i.prototype={
selected:function(e){
var n=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var t=this.opt.data[e].name,i=this.opt.data[e].value;
this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",i),this.bt.find(".jsBtLabel").text(t);
}
}else $.each(this.opt.data,function(o,d){
return e==d.value||e==d.name?(n.dropdown.find(".jsDropdownItem:eq("+o+")").trigger("click",i),
n.bt.find(".jsBtLabel").text(t),!1):void 0;
});
return this;
},
reset:function(){
return this.bt.find(".jsBtLabel").text(this.opt.label),this.value=null,this;
},
destroy:function(){
return this.isDisabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this;
},
hide:function(){
this.container.removeClass("open"),this.dropdown.hide();
}
},t.exports=i;
});