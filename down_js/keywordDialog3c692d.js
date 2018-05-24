define("common/wx/media/keywordDialog.js",["biz_web/ui/checkbox.js","common/wx/popup.js","tpl/media/keyword_dialog.html.js"],function(i){
"use strict";
i("biz_web/ui/checkbox.js"),i("common/wx/popup.js");
var t=i("tpl/media/keyword_dialog.html.js"),n=function(i){
this.hint_word=i.hint_word||[],this.remind_wording=i.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
this.buttons=i.buttons,this.onChange=i.onChange,this.onHide=i.onHide,this._initData(),
this._init();
};
return n.prototype._initData=function(){
for(var i=[],t=0;t<this.hint_word.length;t++)-1==i.indexOf(this.hint_word[t])&&i.push(this.hint_word[t]);
this.words=i;
},n.prototype._init=function(){
var i=this;
$(wx.T(t,{
words:i.words,
title:i.remind_wording.split("|")[0],
desc:i.remind_wording.split("|")[1]
})).popup({
title:"关键词提示",
buttons:i.buttons,
onShow:function(){
i.$dialog=this.get(),this.get().find(".js_btn_p").eq(0).disable(),i.$dialog.find(".js_checkbox").checkbox({
multi:!1,
onChanged:function(t){
i.onChange(i.$dialog,t);
}
});
},
onHide:i.onHide
});
},n;
});