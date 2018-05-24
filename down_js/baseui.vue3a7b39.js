"use strict";
define("layout/baseui.vue.js",["components/top.vue.js","components/popup.vue.js","components/dialog.vue.js","components/button.vue.js","utils/prototype.vue.js","components/faq.vue.js"],function(e,o,s){
e("components/top.vue.js"),e("components/popup.vue.js"),e("components/dialog.vue.js"),
e("components/button.vue.js"),e("utils/prototype.vue.js"),e("components/faq.vue.js");
var t=Vue.extend({
mounted:function(){
this.$el&&(this.$el.style.display="");
}
});
s.exports=t;
});