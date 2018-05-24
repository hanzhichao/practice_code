define("media/common.js",["media/article_data_key.js","biz_common/jquery.validate.js","common/wx/mpEditor/plugin/filter.js"],function(e){
"use strict";
function r(e){
var r=e.key+(e.strict===!0?"Strict":"");
return"function"==typeof u[r]?u[r](e):!0;
}
function a(e){
function r(){
a&&a.fireEvent("checkRemoteList")&&a.fireEvent("checkdomAsynList")&&(a.removeListener("remoteimg_all_complete domasyn_all_complete",r),
s());
}
var a=e.editor,s=e.callback;
return a.fireEvent("checkRemoteList")&&a.fireEvent("checkdomAsynList")?void s():(a.addListener("remoteimg_all_complete domasyn_all_complete",r),
void a.funcPvUvReport("save_remoting_img"));
}
function s(e){
var r,a,s=$(e.imgDom),t=e.remoteType,c=e.format,n=e.img_url,m=e.editor;
if(s&&0!=s.length){
if(a=/^img$/i.test(s[0].nodeName)?"img":"bg",s.removeClass("js_catchingremoteimage"),
"img"==a)r=s.attr("src"),s.attr({
src:n
}).removeAttr("_src").removeAttr("data-src").data("src",""),"success"==t&&c?s.attr({
"data-type":c
}):"error"==t&&s.addClass("js_catchremoteimageerror");else if("bg"==a){
var g=s[0].getAttribute("style")||s[0].style.cssText||"";
g=g.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),g&&g[2]&&(r=g[2].replace(/^['"]|['"]$/g,"")),
s.css({
"background-image":"url("+n+")"
}),"error"==t&&s.addClass("js_catchremoteimageerror");
}
if(s.removeAttr("data-remoteid").data("remoteid",""),/^blob:/.test(r))try{
var i=m.getWindow(),o=i.window.URL||i.window.webkitURL;
o.revokeObjectURL(r);
}catch(b){}
}
}
function t(e){
var r,a={
errmsg:"",
index:!1
};
switch("undefined"!=typeof e.ret?r=1*e.ret:e.base_resp&&"undefined"!=typeof e.base_resp.ret&&(r=1*e.base_resp.ret),
1*r){
case-8:
case-6:
e.ret="-6",a.errmsg="请输入验证码";
break;

case 62752:
a.errmsg="可能含有具备安全风险的链接，请检查";
break;

case 64505:
a.errmsg="发送预览失败，请稍后再试";
break;

case 64504:
a.errmsg="保存图文消息发送错误，请稍后再试";
break;

case 64518:
a.errmsg="正文只能包含一个投票";
break;

case 10704:
case 10705:
a.errmsg="该素材已被删除";
break;

case 10701:
a.errmsg="用户已被加入黑名单，无法向其发送消息";
break;

case 10703:
a.errmsg="对方关闭了接收消息";
break;

case 10700:
case 64503:
a.errmsg="1.接收预览消息的微信尚未关注公众号，请先扫码关注<br /> 2.如果已经关注公众号，请查看微信的隐私设置（在手机微信的“我->设置->隐私->添加我的方式”中），并开启“可通过以下方式找到我”的“手机号”、“微信号”、“QQ号”，否则可能接收不到预览消息";
break;

case 64502:
a.errmsg="你输入的微信号不存在，请重新输入";
break;

case 64501:
a.errmsg="你输入的帐号不存在，请重新输入";
break;

case 412:
a.errmsg="图文中含非法外链";
break;

case 64515:
a.errmsg="当前素材非最新内容，请重新打开并编辑";
break;

case 320001:
a.errmsg="该素材已被删除，无法保存";
break;

case 64702:
a.errmsg="标题超出64字长度限制";
break;

case 64703:
a.errmsg="摘要超出120字长度限制";
break;

case 64704:
a.errmsg="推荐语超出140字长度限制";
break;

case 64515:
a.errmsg="当前素材非最新内容";
break;

case 200041:
a.errmsg="此素材有文章存在违规，无法编辑";
break;

case 64506:
a.errmsg="保存失败,链接不合法";
break;

case 64507:
a.errmsg="内容不能包含链接，请调整";
break;

case 64510:
a.errmsg="内容不能包含语音，请调整";
break;

case 64511:
a.errmsg="内容不能包多个语音，请调整";
break;

case 64512:
a.errmsg="文章中语音错误,请使用语音添加按钮重新添加。";
break;

case 64508:
a.errmsg="查看原文链接可能具备安全风险，请检查";
break;

case 64550:
a.errmsg="请勿插入不合法的图文消息链接";
break;

case 64558:
a.errmsg="请勿插入图文消息临时链接，链接会在短期失效";
break;

case 64559:
a.errmsg="请勿插入未群发的图文消息链接";
break;

case-99:
a.errmsg="内容超出字数，请调整";
break;

case 64705:
a.errmsg="内容超出字数，请调整";
break;

case-1:
a.errmsg="系统错误，请注意备份内容后重试";
break;

case-2:
case 200002:
a.errmsg="参数错误，请注意备份内容后重试";
break;

case 64509:
a.errmsg="正文中不能包含超过3个视频，请重新编辑正文后再保存。";
break;

case-5:
a.errmsg="服务错误，请注意备份内容后重试。";
break;

case 64513:
a.errmsg="请从正文中选择封面，再尝试保存。";
break;

case-206:
a.errmsg="目前，服务负荷过大，请稍后重试。";
break;

case 10801:
a.errmsg="标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10802:
a.errmsg="作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10803:
a.errmsg="敏感链接，请重新添加。",a.index=1*e.msg;
break;

case 10804:
a.errmsg="摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10806:
a.errmsg="正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10808:
a.errmsg="推荐语不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10807:
a.errmsg="内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。";
break;

case-2e4:
a.errmsg="登录态超时，请重新登录。";
break;

case 64513:
a.errmsg="封面必须存在正文中，请检查封面";
break;

case 64551:
a.errmsg="请检查图文消息中的微视链接后重试。";
break;

case 64552:
a.errmsg="请检查阅读原文中的链接后重试。";
break;

case 64553:
a.errmsg="请不要在图文消息中插入超过5张卡券。请删减卡券后重试。";
break;

case 64554:
a.errmsg="在当前情况下不允许在图文消息中插入卡券，请删除卡券后重试。";
break;

case 64555:
a.errmsg="请检查图文消息卡片跳转的链接后重试。";
break;

case 64556:
a.errmsg="卡券不属于该公众号，请删除后重试";
break;

case 64557:
a.errmsg="卡券无效，请删除后重试。";
break;

case 13002:
a.errmsg="该广告卡片已过期，删除后才可保存成功",a.index=1*e.msg;
break;

case 13003:
a.errmsg="已有文章插入过该广告卡片，一个广告卡片仅可插入一篇文章",a.index=1*e.msg;
break;

case 13004:
a.errmsg="该广告卡片与图文消息位置不一致",a.index=1*e.msg;
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
a.errmsg=e.remind_wording||"你所编辑的内容可能含有违反微信公众平台平台协议、相关法律法规和政策的内容";
break;

case 1530503:
a.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530504:
a.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530510:
a.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 153007:
a.errmsg="很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，视频均为你已成功声明原创的视频<br />3、文章文字小于300字，无视频，图片（包括封面图）均为你已成功声明原创的图片";
break;

case 153008:
a.errmsg="很抱歉，原创声明不成功|你的文章内容少于300字，未达到申请原创内容声明的字数要求。";
break;

case 153009:
a.errmsg="很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，无视频，图片（包括封面图）均为你已成功声明原创的图片";
break;

case 153010:
a.errmsg="很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，视频均为你已成功声明原创的视频";
break;

case 1530511:
a.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 220001:
a.errmsg='"素材管理"中的存储数量已达到上限，请删除后再操作。';
break;

case 220002:
a.errmsg="你的图片库已达到存储上限，请进行清理。";
break;

case 153012:
a.errmsg="请设置转载类型";
break;

case 200042:
a.errmsg="图文中包含的小程序卡片不能多于20个";
break;

case 200043:
a.errmsg="图文中包含没有关联的小程序，请删除后再保存";
break;

case 64601:
a.errmsg="一篇文章只能插入一个广告卡片";
break;

case 64602:
a.errmsg="尚未开通文中广告位，但文章中有广告";
break;

case 64603:
a.errmsg="文中广告前不足300字";
break;

case 64604:
a.errmsg="文中广告后不足300字";
break;

case 64605:
a.errmsg="文中不能同时插入文中广告和互选广告";
break;

case 65101:
a.errmsg="图文模版数量已达到上限，请删除后再操作";
break;

case 64560:
a.errmsg="请勿插入历史图文消息页链接";
break;

case 64561:
a.errmsg="请勿插入mp.weixin.qq.com域名下的非图文消息链接";
break;

case 64562:
a.errmsg="请勿插入非mp.weixin.qq.com域名的链接";
break;

default:
a.errmsg="系统繁忙，请稍后重试";
}
return a;
}
function c(e,r,a,s,t){
if(t=t===!0?!0:!1,e===r)return 0!==e||1/e===1/r;
if(null==e||null==r)return e===r;
var m=Object.prototype.toString.call(e);
if(m!==Object.prototype.toString.call(r))return!1;
switch(m){
case"[object RegExp]":
case"[object String]":
return""+e==""+r;

case"[object Number]":
return+e!==+e?+r!==+r:0===+e?1/+e===1/r:+e===+r;

case"[object Date]":
case"[object Boolean]":
return+e===+r;
}
var g="[object Array]"===m;
if(!g&&("object"!=typeof e||"object"!=typeof r))return!1;
a=a||[],s=s||[];
for(var i=a.length;i--;)if(a[i]===e)return s[i]===r;
if(a.push(e),s.push(r),g){
if(i=e.length,i!==r.length)return!1;
for(;i--;)if(!c(e[i],r[i],a,s,t))return!1;
}else for(var o in e)if(e.hasOwnProperty(o)&&(t||p.eqWhiteKey[o])&&!(!t&&1*e.is_share_copyright==1&&p.shareCopyrightIgnoreKey.indexOf(","+o+",")>=0||"undefined"==typeof e[o]&&"undefined"==typeof r[o])){
var b=e[o],l=r[o];
if("cdn_url"==o?(b=b.http2https().replace(/\?$/,""),l=l.http2https().replace(/\?$/,"")):"content"==o&&(b=n(b),
l=n(l)),!r.hasOwnProperty(o)||!c(b,l,a,s,t))return!1;
}
return a.pop(),s.pop(),!0;
}
function n(e){
return UE&&(e=e.replace(UE.dom.domUtils.fillCharReg,"")),e=e.replace(/\s/g," "),
e=e.replace(/<br([^>]*?)>/g,""),e=e.replace('<span data-fillchar="1"></span>',""),
e=b.removeAttribute(e,[["*","class"],["*","scrolling"],["*","frameborder"],["*","data-(?:[^'\"\\s=<>]*?)"]]),
e=e.replace(/<img\s([^>]*?)>/g,function(e,r){
return"<img "+$.trim(r)+" />";
}),e=e.replace(/<input\s([^>]*?)>/g,function(e,r){
return"<input "+$.trim(r)+" />";
});
}
function m(e,r){
var e=(e||"0")+"",r=(r||"0")+"";
return e===r?"eq":e.length>r.length?"gt":e.length<r.length?"lt":e>r?"gt":"lt";
}
var g=/[\u2600-\u27BF]|[\u2B00-\u2BFF]|[\u3291-\u32B0]|[\uD83C\uD83D][\uDC00-\uDFFF]/,i=e("media/article_data_key.js"),o=e("biz_common/jquery.validate.js"),b=e("common/wx/mpEditor/plugin/filter.js"),l=o.rules,k=wx&&"3071959254"==wx.uin?1e5:5e4,u={},p={
eqWhiteKey:i.getCompareWhiteKey(),
shareCopyrightIgnoreKey:i.getShareArticleIgnoreKey()
};
return u.title=function(e){
var r=e.content||"",a=e.maxlen||64;
return l.rangelength(r,[0,a])?g.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s长度不能超过%s字".sprintf(e.label||"标题",a),
errType:1
};
},u.titleStrict=function(e){
var r=e.content||"",a=e.maxlen||64;
return l.rangelength(r,[1,a])?g.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s不能为空且长度不能超过%s字".sprintf(e.label||"标题",a),
errType:1
};
},u.templateContent=function(e){
var r=u.content(e);
if(r!==!0)return r;
var a=e.content||"";
return a?!0:{
msg:"正文必须有内容",
errType:100
};
},u.content=function(e){
var r=e.content||"",a=e.maxlen||1e7;
if(!l.rangelength(r,[0,a]))return{
msg:"正文总大小不得超过%sM字节".sprintf(a/1e6),
errType:1
};
if(!l.rangelength(r.text(),[0,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var s=$("<div>").html(r);
return e.editor.checkPlugins(s)?!0:{
msg:"多媒体插件校验出错",
errType:4
};
},u.contentStrict=function(e){
var r=e.content||"",a=r.text()||"";
if(!a)return{
msg:"正文必须有文字，请在正文中至少输入1个汉字后重试",
errType:3
};
if(!l.rangelength(a,[1,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var s=e.maxlen||1e7;
if(!l.rangelength(r,[1,s]))return{
msg:"正文总大小不得超过%sM字节".sprintf(s/1e6),
errType:1
};
var t=$("<div>").html(r);
return e.editor.checkPlugins(t)?!0:{
msg:"多媒体插件校验出错",
errType:4
};
},{
articleRetCode:t,
validate:r,
waitAsynAction:a,
changeRemoteImgUrl:s,
eq:c,
dataSeqCompare:m
};
});