define("news/operation_guide.js",["common/wx/anchor.js"],function(e){
"use strict";
$("li.menu_primary_item a:eq(0)").click(function(){
$("#js_main").show(),$("#js_content").hide(),$(this).parent().addClass("selected").siblings().removeClass("selected");
}),$("li.menu_primary_item a:gt(0)").click(function(){
$("#js_content").show(),$("#js_main").hide(),$(this).parent().addClass("selected").siblings().removeClass("selected");
}),e("common/wx/anchor.js");
for(var s=$("#js_main h4 a"),n=0;n<s.length;n++)$(s[n]).anchor({
callback:function(){
$("#js_content").show(),$("#js_main").hide(),$("li.menu_primary_item a[data-anchor="+$(this).data("anchor")+"]").parent().addClass("selected").siblings().removeClass("selected");
}
});
for(var a=$("li.menu_primary_item a"),i=1;i<a.length;i++)$(a[i]).anchor();
$("#myMenu").fixed();
});