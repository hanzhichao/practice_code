define("common/wx/mpEditor/plugin/insertTemplate.js",["media/template_common.js","common/wx/media/templateDialog.js","common/wx/Tips.js"],function(e){
"use strict";
function n(e){
this._o={
token:"",
appmsg_template_cnt:0,
can_use_vote:!1,
can_use_card:!1,
biz_uin:"",
can_use_voice:!1,
qqmusic_flag:!1,
can_use_weapp_card:!1,
can_use_txvideo:!1,
can_use_hyperlink:!1,
can_use_appmsg_outer_url:!1,
can_see_ad:!1
},this._extend(e),this.editor=null;
}
var t=e("media/template_common.js"),a=e("common/wx/media/templateDialog.js"),_=e("common/wx/Tips.js");
return n.prototype={
_extend:function(e){
for(var n in e)this._o[n]=e[n];
},
getName:function(){
return"inserttemplate";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this,n=this._o;
return function(c,o){
var i=e.editor;
if(i){
if(t.maxTemplateNum-n.appmsg_template_cnt<=0)return void _.err("最多只能添加%s个模版".sprintf(t.maxTemplateNum));
var o=i.getEditorData(null,"range");
new a({
content:o.content||"",
can_use_txvideo:n.can_use_txvideo,
can_use_hyperlink:n.can_use_hyperlink,
can_use_appmsg_outer_url:n.can_use_appmsg_outer_url,
can_use_vote:n.can_use_vote,
can_use_card:n.can_use_card,
biz_uin:n.biz_uin,
can_use_voice:n.can_use_voice,
qqmusic_flag:n.qqmusic_flag,
can_use_weapp_card:n.can_use_weapp_card,
can_see_ad:n.can_see_ad,
token:n.token,
onSuccess:function(){
i.fireEvent("templateDialogClosed");
}
});
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"添加图文模版";
}
},n;
});