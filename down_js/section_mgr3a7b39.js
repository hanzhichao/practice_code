define("cardticket/add/section_mgr.js",[],function(){
"use strict";
var e=function(e){
this.opt=e=$.extend(!0,{
preview_dom:"#js_preview_area .js_preview",
edit_dom:"#js_edit_area .js_edit_content",
is_mem:!1
},e),this.$previewSections=$(e.preview_dom),this.$editSections=$(e.edit_dom),this.currentIndex=0,
this.go(this.currentIndex);
var t=this;
$("#js_preview_area").on("click",".js_edit_icon",function(){
t.$previewSections=$(e.preview_dom);
var i=t.$previewSections.find(".js_edit_icon"),n=i.index(this);
return t.go(n),!1;
});
};
return e.prototype={
next:function(){
this.go(this.currentIndex+1);
},
go:function(e){
return;
},
prev:function(){
this.go(this.currentIndex-1);
},
gofirst:function(){
this.go(0);
},
golast:function(){
this.go(this.$editSections.length-1);
}
},e;
});