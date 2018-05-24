define("common/wx/keyword.js",["tpl/keyword.html.js","tpl/basekeyword.html.js","common/wx/Tips.js"],function(t){
"use strict";
function e(){
var t=this;
this.$err_container=this.$dom.find(".js_error_container"),this.$related_container=this.$dom.find(".js_related_container"),
this.$input=this.$dom.find(".js_keyword"),this.$keywords_box=this.$dom.find(".js_keywords_box"),
this.$dom.find(".js_btn_add").click(function(){
if(!$(this).is(".btn_disabled")){
var e=$.trim(t.$input.val());
e&&t.wordmgr.addKeyword(e)&&t.$input.val("");
}
});
}
var i={
writable:!1,
max:10,
container:"",
keywords:[]
},s=template.compile('<li><em class="keywords_name">{keyword.name}</em>						<i href="javascript:;" class="icon12_del js_item_delete">X</i></li>'),o=t("tpl/keyword.html.js"),n=t("tpl/basekeyword.html.js"),r=template.compile('<p class="frm_msg fail"><i>●</i><span class="frm_msg_content">			该关键词不存在，您是否想输入{each relatedKeyword as word}<em>“{word}”</em>{/each}</span></p>'),d=template.compile('<p class="frm_tips">相关的关键词还有{each relatedKeyword as word}<em>“{word}”</em>{/each}</p>'),a=t("common/wx/Tips.js"),l=function(t){
this.options=$.extend(!0,{},i,t),this._init();
};
l.prototype={
constructor:l,
writeClassName:"writable",
_init:function(){
var t=this.options,e=this;
this.keywords=[];
for(var i=0;i<t.keywords.length&&!this.isFull();i++)this.keywords.push("object"==typeof t.keywords[i]?t.keywords[i]:{
name:t.keywords[i]
});
this.$container=$(t.container),this.$dom=$(template.compile(o)({
keywords:this.keywords,
writable:t.writable?this.writeClassName:"readonly"
})).appendTo(this.$container),this.$list=this.$dom,this.$list.on("click",".js_item_delete",function(){
var t=$(this).closest("li").find(".keywords_name").text();
e.deleteKeyword(t);
}),this.isFull()&&this.options.onFull&&this.options.onFull.call(this);
},
dom:function(){
return this.$dom;
},
getAll:function(){
return this.keywords;
},
isFull:function(){
var t=this.keywords.length>=this.options.max;
return t;
},
addKeyword:function(t){
return this.isFull()?(a.err("已满%s个，不可以再添加".sprintf(this.options.max)),!1):this.containKeyword(t)?(a.err("已添加关键字，不可以重复添加".sprintf(t)),
!1):("string"==typeof t&&(t={
name:t
}),this.keywords.push(t),this.$list.append(s({
keyword:t
})),this.options.onAddKeyword&&this.options.onAddKeyword.call(this,t),this.isFull()&&this.options.onFull&&this.options.onFull.call(this),
!0);
},
containKeyword:function(t){
return this.index(t)>=0;
},
getKeywords:function(){
for(var t=[],e=0;e<this.keywords;e++)t.push(keywords.name);
return t;
},
index:function(t){
"string"==typeof t&&(t={
name:t
});
for(var e=this.keywords,i=0;i<e.length;i++)if(e[i].name===t.name)return i;
return-1;
},
deleteKeyword:function(t){
"string"==typeof t&&(t={
name:t
});
var e=this.index(t);
if(0>e)return a.err("关键字不存在，删除失败".sprintf(t)),!1;
this.keywords.splice(e,1);
var i=this.$list.find("li")[e];
return i&&$(i).remove(),this.options.onDeleteKeyword&&this.options.onDeleteKeyword.call(this,t),
!0;
}
};
var h=function(t){
this.options=$.extend(!0,{},i,t),this._init();
};
h.prototype={
_init:function(){
var t=this.options,i=this,s=$.extend(!0,{},t);
this.$container=$(t.container),this.$dom=$(template.compile(n)(t)).appendTo(this.$container),
e.call(this),s.container=this.$keywords_box,s.onAddKeyword=s.onFull=function(){
this.isFull()&&i.$dom.find(".js_btn_add").addClass("btn_disabled");
},s.onDeleteKeyword=function(){
i.$dom.find(".js_btn_add").removeClass("btn_disabled");
},this.wordmgr=new l(s),this.$input.on("keyup",function(){
var t=$.trim($(this).val());
if(i.$err_container.hide(),!t)return i.$related_container.html(""),void i.$err_container.html("");
var e=["abc","bcd"],s=!1;
s?i.$related_container.html(d({
relatedKeyword:e
})):i.$err_container.html(r({
relatedKeyword:e
})).show();
}),i.$related_container.on("click","em",function(){
var t=$(this).text();
t=t.substr(1,t.length-2),i.wordmgr.addKeyword(t);
}),i.$err_container.on("click","em",function(){
var t=$(this).text();
t=t.substr(1,t.length-2),i.wordmgr.addKeyword(t);
});
},
readMode:function(){
this.$dom.removeClass(this.writeClassName);
},
writeMode:function(){
this.$dom.addClass(this.writeClassName);
}
};
return h;
});