"use strict";
define("components/tips.vue.js",[],function(e,n,t){
var i=this,s=new Vue({
el:"#_tips",
template:'\n    <transition name="tips">\n      <div :class="\'page_tips \' + type" v-show="!hidden">\n        <div class="inner">\n          {{msg}}\n        </div>\n      </div>\n    </transition>\n  ',
props:{
type:{
type:String,
"default":"error"
},
msg:{
type:String,
"default":""
},
hidden:{
type:Boolean,
"default":!0
}
},
computed:{
isSuc:function(){
return"success"===i.type;
}
}
});
t.exports={
suc:function(e){
s.type="success",s.msg=e,s.hidden=!1,setTimeout(function(){
s.hidden=!0;
},3e3,!0);
},
err:function(e){
s.type="error",s.msg=e,s.hidden=!1,setTimeout(function(){
s.hidden=!0;
},3e3,!0);
}
};
});