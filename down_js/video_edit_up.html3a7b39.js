define("tpl/media/video_edit_up.html.js",[],function(){
return'<!-- <div class="video_upload_opr">\n    <a class="cancel cancel_access" href="javascript:;" data-uid=0 id="js_up_cancel">取消上传</a> \n    <span class="progress_overview">{percent}%</span>\n</div>\n-->\n<div class="video_upload_progress_wrp">\n    <div class="video_upload_progress" style="width: {percent}%;"></div>\n</div>\n{if s == 0}\n<ul class="video_upload_info_list">\n    <li class="video_upload_info">剩余时间:{remainTime}</li>\n    <li class="video_upload_info">速度:{instantSpeed}</li>\n    <li class="video_upload_info">已扫描:{processedSize}/{size}</li>\n</ul>\n\n{else if s == 1}\n<ul class="video_upload_info_list">\n    <li class="video_upload_info">剩余时间:{remainTime}</li>\n    <li class="video_upload_info">速度:{instantSpeed}</li>\n    <li class="video_upload_info">已上传:{processedSize}/{size}</li>\n</ul>\n\n{else if s == 2}\n<div class="tips_global">文件上传成功，正在进行审核</div>\n{else if s == 3}\n<div class="mini_tips warn" style="display:block">上传失败：{errorMsg}</div>\n{else if s == 4}\n<ul class="video_upload_info_list">\n    <li class="video_upload_info">剩余时间:{remainTime}</li>\n    <li class="video_upload_info">速度:{instantSpeed}</li>\n    <li class="video_upload_info">已上传:{processedSize}/{size}</li>\n</ul>\n<!-- <div class="frm_msg fail" style="display:block">视频上传中，请耐心等待</div>-->\n{/if}\n\n';
});