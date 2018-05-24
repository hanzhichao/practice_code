"use strict";
define("components/pagebar.vue.js",["widget/pagination.css","components/tips.vue.js"],function(e){
e("widget/pagination.css");
var a=e("components/tips.vue.js");
Vue.component("mp-pagebar",{
template:'\n    <div class="pagination" v-if="isShow">\n      <span class="page_nav_area">\n        <a href="##" class="btn page_prev" v-on:click="prevPage" v-if="showPreArr"><i class="arrow"></i></a>\n        <span class="page_num">\n          <label>{{currentPage}}</label>\n          <span class="num_gap">/</span>\n          <label>{{endPage}}</label>\n        </span>\n        <a href="##" class="btn page_next" v-on:click="nextPage" v-if="showNextArr"><i class="arrow"></i></a>\n      </span>\n      <span class="goto_area">\n        <input type="text" v-model.number.trim="gopage">\n        <a href="##" class="btn page_go" v-on:click="goPage">跳转</a>\n      </span>\n    </div>\n    ',
props:{
perpage:{
type:Number,
"default":10
},
page:{
type:Number,
"default":1
},
startPage:{
type:Number,
"default":1
},
totalnum:{
type:Number,
"default":50
}
},
created:function(){
this.currentPage=this.page,this.pageNum=Math.ceil(this.totalnum/this.perpage),this.endPage=this.startPage+this.pageNum-1;
},
data:function(){
return{
gopage:"",
currentPage:1,
pageNum:1,
endPage:1
};
},
computed:{
showPreArr:function(){
return this.currentPage!==this.startPage;
},
showNextArr:function(){
return this.currentPage!==this.endPage;
},
isShow:function(){
return this.endPage>1;
}
},
methods:{
prevPage:function(){
this.currentPage>this.startPage&&(this.currentPage--,this.callbackFunc()===!1&&this.currentPage++);
},
nextPage:function(){
this.currentPage<this.endPage&&(this.currentPage++,this.callbackFunc()===!1&&this.currentPage--);
},
goPage:function(){
var e=this.currentPage,t=this.gopage;
return t===this.currentPage?!1:isNaN(t)?(a.error("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(a.error("请输入正确的页码"),
!1):t>this.endPage?(a.error("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc()===!1&&(this.currentPage=e)));
},
callbackFunc:function(){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return this.$emit("pagechange",e)===!1?!1:void 0;
}
}
});
});