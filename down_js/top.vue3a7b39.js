"use strict";
define("components/top.vue.js",[],function(t,a,e){
var n={
discuss:[{
id:"list_latest",
name:"留言列表",
url:"/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7",
acl:1
},{
id:"index",
name:"群发消息管理",
url:"/misc/appmsgcomment?action=list_app_msg&begin=0&count=10",
acl:1
}],
reward:[{
id:"list",
name:"数据概况",
url:"/merchant/rewardstat?action=getoverview&t=reward/overview",
acl:1
},{
id:"setting",
name:"赞赏设置",
url:"/merchant/reward?action=rewardsetting",
acl:1
}]
};
Vue.component("mp-top",{
template:'\n    <div v-if="show" class="title_tab">\n      <ul class="tab_navs title_tab">\n          <li v-for="o in toptabs" v-if="o.acl" v-bind:class="liClass(o.id)" >\n            <a v-bind:href="finalUrl(o.url)" v-bind:target="hasTarget(o.target)">{{o.name}}<br/>{{o.index}}</a>\n          </li>\n      </ul>\n    </div>\n  ',
props:{
toptabs:{
type:Array,
"default":[]
},
selected:{
type:String,
"default":""
},
show:{
type:Boolean,
"default":!0
}
},
methods:{
finalUrl:function(t){
return!!t&&[t,window.commonData.data.param].join("")||"javascript:void(0);";
},
hasTarget:function(t){
return"_blank"===t?"_blank":void 0;
},
liClass:function(t,a){
var e="js_top tab_nav";
return t===this.selected&&(e+=" selected"),0===a&&(e+=" first"),e;
}
}
}),e.exports=n;
});