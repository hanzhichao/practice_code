define("tpl/reply.html.js",[],function(){
return'<div class="quick_reply_box jsReplyBox" style="display:none">\n    <label for="" class="frm_label">{label}</label>\n    <div class="emoion_editor_wrp jsReplyEditor"></div>\n    <p class="quick_reply_box_tool_bar">\n        <span class="btn btn_primary btn_input jsReplySend" >\n            <button >发送</button>\n        </span>\n        <a class="btn btn_default pickup jsReplyCancel" href="javascript:;">收起</a> \n    </p>    \n</div>\n\n{if replyList&& replyList.length>0}\n<div class="quick_result_wrp s_row jsReplyBackBox" style="display:block;">\n    <div class="s_cell reply_content_wrp">\n        <img src="{img}" alt="" class="reply_user_avatar">\n        <div class="reply_content_inner">\n            <label for="" class="frm_label result_title">你回复的内容</label>\n            <div class="reply_content">{=replyList[0].content}</div>\n        </div>\n    </div>\n    <div class="s_cell discuss_time">{replyList[0].createtime}</div>\n    <div class="s_cell discuss_opr last_child">\n        <a href="javascript:;" class="jsReplyDel" data-replyid="{replyList[0].replyid}">删除</a>\n    </div>\n</div>\n{/if}\n';
});