"use strict";
define("components/checkbox_group.vue.js",["components/checkbox.vue.js","utils/eventbus.vue.js"],function(e){
e("components/checkbox.vue.js");
var c=e("utils/eventbus.vue.js");
Vue.component("mp-checkbox-group",{
template:"\n    <div><slot></slot></div>\n  ",
props:{
value:{
type:Array,
"default":function(){
return[];
}
}
},
watch:{
value:function(e){
var c=this;
e.forEach(function(e,t){
c._checkbox[t]&&c._checkbox[t].setVal(e);
});
}
},
mounted:function(){
var e=this;
c.$on("mp-checkbox:change",function(){
e.change();
}),this._checkbox=[];
for(var t=[].concat(this.$children||[]);t.length;){
var n=t.shift();
t=t.concat(n.$children),n.$vnode.tag.match(/mp\-checkbox$/)&&this._checkbox.push(n);
}
},
methods:{
change:function(){
var e=this._checkbox.map(function(e){
return e.getVal();
});
this.$emit("input",e),this.$emit("change",e);
}
}
});
});