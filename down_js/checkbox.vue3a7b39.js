"use strict";
define("components/checkbox.vue.js",["utils/eventbus.vue.js"],function(e){
var n=e("utils/eventbus.vue.js");
Vue.component("mp-checkbox",{
template:'\n    <label :class="labelClass">\n      <i class="icon_checkbox"></i>\n      <input type="checkbox" class="frm_checkbox" ref="input" :name="name" @change="change" v-model="innerChecked">\n      <span class="lbl_content"><slot></slot></span>\n    </label>\n  ',
props:{
name:{
type:String,
"default":""
},
value:{
type:Boolean,
"default":!1
}
},
data:function(){
return{
innerChecked:this.value
};
},
computed:{
labelClass:function(){
return"frm_checkbox_label"+(this.innerChecked?" selected":"");
}
},
methods:{
change:function(){
this.$emit("input",this.innerChecked),n.$emit("mp-checkbox:change",this.innerChecked);
},
getVal:function(){
return this.$refs.input.checked;
},
setVal:function(e){
this.innerChecked=!!e;
}
}
});
});