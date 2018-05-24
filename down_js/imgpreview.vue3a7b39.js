"use strict";
define("components/imgpreview.vue.js",["widget/img_preview.css","components/tips.vue.js"],function(i){
i("widget/img_preview.css");
var e=i("components/tips.vue.js");
Vue.component("mp-imgpreview",{
template:'\n    <div :style="style" v-on:click="close">\n      <div class="mask preview_mask"></div>\n      <div class="img_preview_container" ref="container">\n        <div class="img_preview_inner">\n          <img src="/mpres/htmledition/images/icon/common/icon32_loading_dark.gif" :style="loadingStyle" v-on:click="keepShow($event)">\n          <span class="img_preview_wrp" :style="imgStyle" v-on:click="keepShow($event)">\n            <img :src="imgsrc" v-on:load="imgLoaded">\n            <!--#0001#-->\n            <a href="javascript:void(0);" class="img_preview_close" v-on:click="close" title="关闭"><i class="icon_img_preview_close">关闭</i></a>\n            <!--%0001%-->\n          </span>\n          <span class="vm_box"></span>\n        </div>\n        <span class="vm_box"></span>\n        <div class="img_preview_opr_container" v-on:click="keepShow($event)">\n          <ul class="img_preview_opr_list">\n            <li class="img_preview_opr_item"><a href="javascript:void(0);" v-on:click="openSource()" title="查看原图"><i class="icon_img_preview origin">查看原图</i>&nbsp;</a></li>\n            <li v-if="this.urls.length>1" :class="canPrev?\'img_preview_opr_item\':\'img_preview_opr_item prev_disabled\'"><a href="javascript:;" title="查看上一个" v-on:click="prev"><i class="icon_img_preview prev">上一个</i>&nbsp;</a></li>\n            <li v-if="this.urls.length>1" :class="canNext?\'img_preview_opr_item\':\'img_preview_opr_item next_disabled\'"><a href="javascript:;" title="查看下一个" v-on:click="next"><i class="icon_img_preview next">下一个</i>&nbsp;</a></li>\n            <li v-if="downsrc" class="img_preview_opr_item"><a :href="downsrc" title="下载图片"><i class="icon_img_preview download">下载图片</i>&nbsp;</a></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  ',
data:function n(){
var n={
showLoading:!0,
showState:!1,
curidx:0
};
return n;
},
computed:{
style:function(){
return{
display:this.showState?"block":"none"
};
},
loadingStyle:function(){
return{
display:this.showLoading?"":"none"
};
},
imgStyle:function(){
return{
display:this.showLoading?"none":""
};
},
imgsrc:function(){
return"string"==typeof this.urls[this.curidx]?this.urls[this.curidx]:this.urls[this.curidx].imgsrc;
},
downsrc:function(){
return this.urls[this.curidx]&&this.urls[this.curidx].downsrc;
},
canPrev:function(){
return this.curidx>0;
},
canNext:function(){
return this.curidx<this.urls.length-1;
}
},
props:{
urls:{
type:Array,
"default":[]
}
},
created:function(){
var i=this;
(this.urls.length<=0||this.curidx<0||this.curidx>=this.urls.length)&&console.warn("new imgpreview props invalided"),
this.$on("EVT_PREV",function(){
i.prev();
}),this.$on("EVT_NEXT",function(){
i.next();
}),this.$on("EVT_CLOSE",function(){
i.close();
}),this.$on("EVT_IMG_LOAD",function(){
i.showLoading=!1;
});
},
mounted:function(){
var i=this;
document.addEventListener&&document.addEventListener("keyup",function(e){
i.keyup(e);
});
},
methods:{
imgLoaded:function(){
this.$emit("EVT_IMG_LOAD");
},
prev:function(){
this.canPrev&&(this.showLoading=!0,this.curidx--,this.$emit("prev"));
},
next:function(){
this.canNext&&(this.showLoading=!0,this.curidx++,this.$emit("next"));
},
close:function(){
this.showState=!1,this.$emit("close");
},
show:function(){
this.showState=!0,this.$emit("show");
},
setCurIdx:function(i){
this.curidx=i;
},
keepShow:function(i){
i.preventDefault(),i.stopPropagation();
},
keyup:function(i){
var e=i.keyCode;
27===e&&this.$emit("EVT_CLOSE"),37===e&&this.$emit("EVT_PREV"),39===e&&this.$emit("EVT_NEXT");
},
openSource:function(){
""!==this.imgsrc?window.open(this.imgsrc):e.err("图片资源加载失败。");
}
}
});
});