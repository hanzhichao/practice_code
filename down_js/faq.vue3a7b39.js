"use strict";
define("components/faq.vue.js",["utils/ajax.vue.js"],function(e,i,t){
if(window.document)try{
!function(){
var i=e("utils/ajax.vue.js"),n=function(e){
var i=document.createElement("a");
i.setAttribute("href",e),this.el=this.parser=i;
};
n.prototype.getParam=function(e){
var i=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),t=this.el.search.match(i);
return t?t[2]:null;
};
var s=function(e){
var t="/misc/faq?action=report";
i({
url:t,
donotHock:!0,
data:e,
type:"POST"
});
},a=new Vue({
el:"#_faq",
template:'\n        <div class="weui-desktop-online-faq__wrp" v-if="guide_list">\n          <div class="weui-desktop-online-faq">\n            <div class="weui-desktop-online-faq_inner">\n              <div class="weui-desktop-online-faq__switch">在线问答</div>\n              <div class="weui-desktop-online-faq__panel" style="display:none">\n                <a href="###" class="weui-desktop-online-faq_close" v-on:click="close">x</a>\n                <div class="weui-desktop-online-faq_hd">{{question}}</div>\n                <div class="weui-desktop-online-faq_bd">\n                  <div class="weui-desktop-online-faq_tabs">\n                    <div class="weui-desktop-online-faq_tab_hd">\n                      <ul class="js_faq_class1" v-if="guide_list.length>2">\n                        <li v-for="(guide, index) in guide_list" v-if="guide" v-on:click="clickTab(index)"><a :class="index==guide_idx?\'active\':\'\'" href="javascript:;">{{guide.itemname}}</a></li>\n                      </ul>\n                    </div>\n                    <div v-for="(guide, index) in guide_list" v-if="guide" class="weui-desktop-online-faq_tab_bd js_faqscene_content dn" :style="index==guide_idx?\'display:block;\':\'\'">\n                      <ul >\n                        <li v-for="(subitem, j) in guide.subitems" v-if="subitem"><a target="_blank" :href="subitem.kf_url" v-on:click="report($event, guide.report_id)">{{subitem.title}}</a></li>\n                      </ul>\n                    </div>\n                  </div>\n                </div>\n                <div class="weui-desktop-online-faq_ft"><a :href="more_help.kf_url" target="_blank" v-on:click="report($event, help_report_id)">{{more_help.title}}</a></div>\n              </div>\n              <div class="weui-desktop-online-faq__panel">\n                  <img src="https://res.wx.qq.com/mpres/htmledition/images/pic/common/pic_kf_qrcode.jpg" alt="">\n                  <strong>扫码提问</strong>\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
data:{
guide_idx:0,
panelStyle:{
display:"none"
},
question:"",
help_report_id:null,
more_help:{
kf_url:"#",
title:""
},
guide_list:null
},
created:function(){
var e=this,t=new n(window.location.href),s="&cginame="+t.parser.pathname.replace(/^\//,""),a=t.getParam("t"),o=t.getParam("action"),l=t.getParam("token"),d=t.getParam("pluginid");
s+=l?"&token="+l:"",s+=a?"&t="+a:"&action="+o,s+=d?"&pluginid="+d:"";
var r="/misc/faq?action=getfaq&lang=zh_CN&f=json"+s;
i({
type:"GET",
dataType:"json",
donotHock:!0,
url:r,
success:function(i){
if(i&&i.base_resp&&0===i.base_resp.ret){
var t=i.base_resp.assistant.problem;
t.question&&(e.question=t.question,e.guide_list=t.guide_list,e.more_help=t.more_help,
e.help_report_id=t.help_report_id);
}
}
});
},
methods:{
clickTab:function(e){
this.guide_idx=e;
},
mouseover:function(){
this.timer&&clearTimeout(this.timer),this.panelStyle.display="block";
},
report:function(e,i){
var t=e.target;
"A"===t.nodeName&&s({
action:"report",
report_id:i,
question:t.innerText
});
},
mouseout:function(){
var e=this;
this.timer=setTimeout(function(){
e.panelStyle.display="none";
},300,!0);
},
close:function(e){
e.preventDefault(),this.timer&&clearTimeout(this.timer),this.panelStyle.display="none";
}
}
});
t.exports=a;
}();
}catch(n){}
});