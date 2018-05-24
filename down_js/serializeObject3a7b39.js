$.fn.extend({
serializeObject:function(){
var e=this.serializeArray(),i={};
return $(e).each(function(e,n){
i[n.name]=n.value;
}),i;
}
}),define("common/qq/jquery.plugin/serializeObject.js",[],function(){
"use strict";
});