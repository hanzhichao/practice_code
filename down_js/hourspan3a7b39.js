define("common/wx/hourspan.js",["tpl/hourspan.html.js","biz_web/ui/dropdown.js"],function(e,n,t){
"use strict";
function a(e){
var n=this,t=$(e.container),a=t.data("id")||e.childid;
e=$.extend(!0,{},i,e),t.html(template.compile(s)({
childid:a,
span:e.span
}));
for(var r=[],o=[],l=e.endhour,u=0;l>u;u++)r.push({
name:u+":00",
value:u
}),o.push({
name:l-u+":00",
value:l-u
});
n.starts=new d({
container:"#"+a+"1",
index:0,
data:r,
callback:function(e){
var t=n.ends.value,a=l-1-e>0?l-1-e:0;
n.ends.hidegreater(a),e>=t&&n.ends.selected(a);
}
}),n.ends=new d({
container:"#"+a+"2",
index:0,
data:o
}),"undefined"!=typeof e.start&&n.starts.selected(e.start+":00"),"undefined"!=typeof e.end&&n.ends.selected(e.end+":00");
}
var s=e("tpl/hourspan.html.js"),d=e("biz_web/ui/dropdown.js"),i={
callback:$.noop,
span:"-",
disabled:!1,
endhour:24
};
a.prototype={
values:function(){
return{
start:this.starts.value,
end:this.ends.value
};
}
},t.exports=a;
});