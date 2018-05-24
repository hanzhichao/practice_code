define("mass/reprint_status.js",["biz_web/ui/checkbox.js","biz_common/utils/format_ori_check_result.js","tpl/mass/original_popup2.html.js","common/wx/popup.js","common/wx/dialog.js"],function(t){
"use strict";
function i(t){
var i=this;
i.opt=$.extend(!0,{},l,t);
var n=e.format(i.opt.data.list),s={
isinfo:!0,
token:wx.data.t,
lang:wx.data.lang,
forbit_list:n.forbit_list,
forbit_butallow_list:n.forbit_butallow_list,
original_list:n.original_list,
other_list:n.other_list,
history_list:n.history_list,
new_history_list:n.new_history_list,
deny_by_weapp:n.denyByWeapp,
will_replace:n.willReplace,
will_replace_with_permission:n.willReplaceWithPermission,
will_replace_if_history:n.willReplaceIfHistory,
will_replace_if_not_show_src:n.willReplaceIfNotShowSrc
},r={
className:"origin_conflict_dialog_wrp"
};
n.denyByWeapp.length>0?(s.forbit_shownum=!!(n.denyByWeapp.length>1),r.title="原创校验不通过",
r.buttons=[{
text:"取消群发",
click:function(){
this.remove(),i.opt.cancel();
},
type:"default"
}]):n.forbit_list.length>0?(s.isinfo=!1,s.forbit_shownum=!!(n.forbit_list.length>1),
r.title="原创校验不通过",r.buttons=[{
text:"取消群发",
click:function(){
this.remove(),i.opt.cancel();
},
type:"default"
}]):n.willReplace.length>0||n.willReplaceWithPermission.length>0||n.willReplaceIfNotShowSrc.length>0||n.willReplaceIfHistory.length>0?r.buttons=[{
text:"取消群发",
click:function(){
this.remove(),i.opt.cancel();
},
type:"default"
},{
text:"继续群发",
click:function(){
var t=!1,e=[];
this.get().find(".js_reprint_wording").map(function(){
var i=$(this).val();
i.len()>280&&(t=!0),e.push({
idx:$(this).data("idx"),
guide_words:$(this).val()
});
}),t||(this.remove(),i.opt.done(e));
},
type:"primary"
}]:($.extend(!0,s,e.getShowNum(n.forbit_butallow_list,n.original_list,n.other_list,n.history_list,n.new_history_list)),
r.buttons=[{
text:"取消群发",
click:function(){
this.remove(),i.opt.cancel();
},
type:"primary"
},{
text:"继续群发",
click:function(){
this.remove(),i.opt.done();
},
type:"default"
}]),r.close=function(){
i.opt.cancel(),this.remove();
},console.log(s);
var c=$(wx.T(o,s)).eq(0).popup(r),a=c.popup("get");
a.find(".js_reprint_wording_checkbox").each(function(){
$(this).checkbox({
multi:!0,
onChanged:function(t){
t.prop("checked")?t.closest(".original_share_notice").find(".frm_textarea_box").show():t.closest(".original_share_notice").find(".frm_textarea_box").hide();
}
});
}),a.find(".js_reprint_wording").on("input",function(){
$(this).val().len()>280?$(this).closest(".original_share_notice").find(".frm_msg").text("分享推荐语最多只能写140个字").show():$(this).closest(".original_share_notice").find(".frm_msg").hide();
});
}
t("biz_web/ui/checkbox.js");
var e=t("biz_common/utils/format_ori_check_result.js"),o=t("tpl/mass/original_popup2.html.js"),l=(t("common/wx/popup.js"),
t("common/wx/dialog.js"),{
data:[],
done:$.noop,
cancel:$.noop
});
return i;
});