"use strict";
define("components/button.vue.js",[],function(){
Vue.component("mp-button",{
template:'\n    <span :class="[\'btn\', className, \'btn_input\', \'js_btn_p\', loadingClassName]">\n      <button type="button" class="js_btn" @click.prevent="click">\n        <i v-if="loading"></i>\n        <slot></slot>\n      </button>\n    </span>\n  ',
props:{
type:{
type:String,
"default":"default"
},
loading:{
type:Boolean,
"default":!1
}
},
computed:{
className:function(){
return this.type?"btn_"+this.type:"";
},
loadingClassName:function(){
return this.loading?"btn_loading":"";
}
},
methods:{
click:function(t){
this.loading||this.$emit("click",t);
}
}
});
});