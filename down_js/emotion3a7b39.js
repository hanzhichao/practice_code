define("common/wx/richEditor/emotion.js",["common/qq/emoji.js","widget/emotion_panel.css","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js","tpl/richEditor/emotion.html.js","common/qq/Class.js"],function(t,i,e){
"use strict";
function o(t){
return k.format(t);
}
var n=wx.T;
t("common/qq/emoji.js"),t("widget/emotion_panel.css");
for(var m=t("biz_common/utils/emoji_data.js"),s=t("biz_common/utils/emoji_panel_data.js"),a=[],c=0;c<s.length;c++)for(var r=0;r<m.length;r++)if(m[r].id==s[c]){
a[c]=m[r];
break;
}
for(var l=t("tpl/richEditor/emotion.html.js"),u=t("common/qq/Class.js"),h=20,f=16,d=7,_=[],j=h,g=f,p=d,r=0;p>r;++r)for(var v=0;g>v;++v){
var b=r*g+v;
_.push(a[b]?{
name:a[b].style,
title:a[b].emoji?a[b].emoji:a[b].cn,
bp:"background-position:0 -"+b*j+"px;"
}:{
name:"",
title:"",
bp:"background-position:0 -"+m.length*j+"px;"
});
}
var k='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single {name}" alt="mo-{title}"></img>',E=u.declare({
init:function(t){
this.selector$=t,this.selector$.html(n(l,{
edata:_
})),this._previewArea$=this.selector$.find(".js_emotionPreviewArea"),this._initEvent();
},
getEmotionText:function(t){
return t.replace(/<img.*?alt=["]{0,1}mo-([^"\s]*).*?>/gi,"$1");
},
getEmotionHTML:function(t){
return o(t);
},
_getData:function(t){
return{
title:t.data("title"),
name:t.data("name")
};
},
_initEvent:function(){
var t=this;
t.selector$.click(function(i){
var e=t._getData($(i.target));
e.name&&t.clickCB&&t.clickCB(e);
});
},
click:function(t){
this.clickCB=t;
},
mouseleave:function(t){
return this.mouseleaveCB=t,this;
},
mouseover:function(t){
return this.mouseoverCB=t,this;
},
show:function(){
this.selector$.fadeIn();
},
hide:function(){
this.selector$.fadeOut();
}
});
E.emoji=function(t){
return t=t||"",t.emoji();
},E.getEdata=function(){
return _;
},E.getEmotionHtml=o,e.exports=E;
});