define("common/wx/city/imgupload.js",["common/wx/city/base.js","common/wx/Tips.js"],function(require,exports,module){
"use strict";
require("common/wx/city/base.js");
var Tips=require("common/wx/Tips.js"),q={
g:{
urlPath:"https://city.weixin.qq.com/mp/cgi-bin/"
},
init:function(e,o){
var t={
button_placeholder_id:e.btn,
fileQueuedHandler:function(e){
q.logic.file_queued_handler(e,t);
},
uploadProgressHandler:function(e,o){
q.logic.upload_progress_handler(e,o,t);
},
uploadSuccessHandler:function(e,i){
q.logic.upload_success_handler(e,i,t,o);
},
errorHander:function(){
q.logic.error_hander(t);
}
};
return $.extend(!0,t,e),q.logic.initUpload(t);
},
logic:{
error_hander:function(e){
alert("error_hander"),$("#"+e.area).hide();
},
upload_success_handler:function(e,o,t,i){
try{
0==o.ret?($("#"+t.img).attr("src",o.url),$("#"+t.img).show(),i(o.url,e)):Tips.err("上传文件失败！"+o.ret);
}catch(n){
Tips.err("上传文件失败！"+n);
}
$("#"+t.area).hide();
},
file_queued_handler:function(e,o){
$("#"+o.area).show(),$("#"+o.name).html(e.name),$("#"+o.size).html(~~(e.size/1024)+"kb"),
$("#"+o.progress).css("width","0%");
},
upload_progress_handler:function(e,o,t){
var i=Math.ceil(o/e.size*100);
i>100?i=100:i++,$("#"+t.progress).css("width",i+"%");
},
initUpload:function(option){
function errHander(e){
Tips.err(e),"function"==typeof option.errorHander&&option.errorHander(e);
}
option.file_size_limit||(option.file_size_limit="2048kb");
var opt={
upload_url:q.g.urlPath+"uploadfile?"+(new Date).getTime(),
file_size_limit:option.file_size_limit,
file_types:"*.jpg;*.png;*.jpeg;",
file_types_description:"图片文件",
file_upload_limit:0,
file_queue_limit:1,
file_post_name:"filedata",
file_queue_error_handler:function(e,o,t){
switch(o){
case window.SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
errHander(e.name+"文件内容为空");
break;

case window.SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
errHander(e.name+"大小为"+~~(e.size/1024)+"kb,超过"+option.file_size_limit+"的大小限制");
break;

case window.SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
errHander(e.name+"类型无效");
break;

case window.SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
errHander("上传的文件过多，最多可以上传1个文件");
break;

default:
errHander("文件检测时发生错误,错误代码:'"+o+"',错误信息:'"+t+"'");
}
},
file_queued_handler:function(e){
"function"==typeof option.fileQueuedHandler&&option.fileQueuedHandler(e,exports);
},
file_dialog_complete_handler:function(e,o){
o>0&&(this.setButtonDisabled(!0),this.startUpload());
},
upload_progress_handler:function(e,o){
"function"==typeof option.uploadProgressHandler&&option.uploadProgressHandler(e,o);
},
upload_error_handler:function(e,o){
errHander(o===window.SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED?"文件超过了"+option.file_size_limit+"的大小限制":"上传文件发生错误"),
this.setButtonDisabled(!1);
},
upload_success_handler:function(file,serverData){
var d=eval("("+serverData+")");
"function"==typeof option.uploadSuccessHandler&&option.uploadSuccessHandler(file,d),
this.setButtonDisabled(!1);
},
upload_complete_handler:function(){},
button_image_url:"//wxo2o.qq.com/city/mp/swf/buttons-upload.png",
button_width:108,
button_height:32,
button_text_top_padding:3,
button_text_left_padding:35,
button_placeholder_id:"",
button_cursor:-2,
button_text:"<span class='uploadText'>上传</span>",
button_text_style:".uploadText { color: #000; font-size:14px;font-family: 'Microsoft YaHei', 微软雅黑, Helvetica, 黑体, Arial, Tahoma;}",
flash_url:"https://city.weixin.qq.com/static/mp/swfupload.swf"
};
return $.extend(!0,opt,option),$flashChecker().f?(alert("flashChecker"),$SWFUpload(opt)):void $("#"+opt.button_placeholder_id).html('<span style="color:#F60;font-weight:bold">您的电脑未安装或未启用flash播放器，不可上传文件。</span><p>您可以安装flash播放器。<a href="http://www.adobe.com/go/getflashplayer?nav=0-0" target="_blank">点击此处安装</a></p>');
}
}
};
$.extend(!0,exports,q);
});