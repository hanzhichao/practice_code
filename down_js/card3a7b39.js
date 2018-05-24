define("common/wx/mpEditor/plugin/card.js",["common/wx/Tips.js","cardticket/send_card.js","common/wx/Cgi.js","cardticket/parse_data.js"],function(t){
"use strict";
function e(t){
var e=t.key,r=t.content,a=(t.ifrmName,new RegExp("<iframe[^>]*?"+t.ifrmName+"[^>]*?"+e+"=('|\")(.*?)('|\").*?>","g"));
return a.test(r)?RegExp.$2:null;
}
function r(t){
return t.replace(/<iframe class="res_iframe card_iframe js_editor_card"[^>]*>[^<>]*?<\/iframe>/g,function(t){
var r=e({
content:t,
key:"data-cardid",
ifrmName:"js_editor_card"
}),a=e({
content:t,
key:"data-num",
ifrmName:"js_editor_card"
}),i=e({
content:t,
key:"data-display-src",
ifrmName:"js_editor_card"
}),n=e({
content:t,
key:"src",
ifrmName:"js_editor_card"
}),d=e({
content:t,
key:"data-src",
ifrmName:"js_editor_card"
});
i=n||i,i=i?i.indexOf("cardid=")>=0?i:i+"&cardid="+r:"";
var c="";
return window.wx&&window.wx.data&&window.wx.data.t&&(c=window.wx.data.t),i=i?i.indexOf("token=")>=0?i.replace(/token=([^&]*|$)/,"token="+c):i+"&token="+c:"",
'<iframe class="res_iframe card_iframe js_editor_card" data-cardid="%s"                 data-num="%s" %s %s></iframe>'.sprintf(r,a,i?'src="'+i+'"':"",d?'data-src="'+d+'"':"");
});
}
var a=t("common/wx/Tips.js"),i=t("cardticket/send_card.js"),n=t("common/wx/Cgi.js"),d=wx.cgiData,c=t("cardticket/parse_data.js"),o=function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show()),this.biz_uin=t.biz_uin||"",
this.can_use_card=t.can_use_card||!1;
var e=this;
e.report_vid_type=[],e._init();
};
return o.beforeSetContent=function(t){
return t.html?r(t.html):"";
},o.prototype={
getName:function(){
return"insertcard";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var e=t.editor,r=this;
if(e){
{
e.getDocument();
}
t._openCardSelect(r);
}
};
},
_init:function(){
var t=this;
d.cardid&&n.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(d.cardid)
},function(e){
e.base_resp&&0==e.base_resp.ret&&(t.card_data=$.parseJSON(e.card_detail),t.card_data=c.parse_cardticket(t.card_data),
t._initCard());
});
},
_initCard:function(){
if(this.hasSetContent&&this.card_data&&!this.isInit){
var t=this.editor.getUeditor().getContent(),e=/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi;
if(e.test(t))return void(this.isInit=!0);
this._insertCard(this.editor,this.card_data,d.cardnum),this.isInit=!0;
}
},
_checkCard:function(t,e){
var r=$(t).find("iframe"),i=0,n=5;
return $.each(r,function(t,e){
$(e).hasClass("js_editor_card")&&i++;
}),i>n||e&&i>=n?(a.err("正文只能包含%s个卡券".sprintf(n)),!1):!0;
},
_getCardIframe:function(t,e){
return['<iframe class="res_iframe card_iframe js_editor_card" scrolling="no" frameborder="0" ','data-cardid="%s" data-num="%s" '.sprintf(t.id,e),'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN&cardid=%s&token=%s&lang=zh_CN"'.sprintf(encodeURIComponent(t.logo_url),encodeURIComponent(t.brand_name),encodeURIComponent(t.title),encodeURIComponent(t.color),t.id,wx.data.t),' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(this.biz_uin,t.id),"></iframe>"].join("");
},
_insertCard:function(t,e,r){
var a=this._getCardIframe(e,r);
t.execCommand("inserthtml",a,!0),this.editor.fireEvent("funcPvUvReport","insertcard");
},
_openCardSelect:function(t){
if(this._checkCard(this.editor.getDocument(),!0)){
var e=this,r=new i({
multi:!1,
param:{
need_member_card:1
},
selectComplete:function(r,a){
e._insertCard(t,r,a);
},
source:"嵌入图文消息素材"
});
r.show();
}
},
check:function(t){
return this._checkCard(t);
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),r=e&&"edui-faked-video"==e.className;
return r?1:0;
};
},
getContainer:function(){
return this.domid;
},
initPluginData:function(){
return["cardid","cardquantity","cardlimit"];
},
getPluginData:function(t){
var r=t.init(this.initPluginData()),a=e({
content:r.get("content"),
key:"data-cardid",
ifrmName:"js_editor_card"
});
if(a){
var i=e({
content:r.get("content"),
key:"data-num",
ifrmName:"js_editor_card"
});
r.set("cardid",a),r.set("cardquantity",i),r.set("cardlimit",0==i?0:1);
}
},
addListener:function(t){
this.__g;
this.can_use_card&&t.addListener("beforepaste",function(t,e){
e.html=r(e.html);
});
},
beforeSetContent:function(t){
return o.beforeSetContent({
html:t
});
},
afterSetContent:function(){
this.hasSetContent=!0,this._initCard();
}
},o;
});