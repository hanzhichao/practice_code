define("tpl/media/preview/audio.html.js",[],function(){
return'<div class="wx_phone_hd">\n  <button class="js_back_btn wx_phone_goback_btn">返回</button>\n  {data.nickName}\n</div>\n<div class="wx_phone_bd">\n    <div class="wx_phone_preview_appmsg appmsg_wap page_share_audio">\n      <div class="share_mod_context share_global_info">\n        <div class="flex_context account_info">\n          <div class="js_go_profile flex_hd">\n            <span  class="radius_avatar account_avatar">\n              <img class="account_avatar" src="{data.avatar}" alt="">\n            </span>\n          </div>\n          <div class="flex_bd">\n            <div class="js_go_profile account_nickname"><strong class="account_nickname_inner">{data.nickName}</strong></div>\n            <div class="account_desc">\n              <div class="account_desc_inner">\n                <span id="publish_time">{data.time}</span>\n                分享              </div>\n            </div>\n          </div>\n        </div>\n        <p class="share_notice">\n          {=data.guide_words.html(true).replace(/\\r/g,"").replace(/\\n/g,"<br>").replace(/\\s/g,"&nbsp;")}\n        </p>\n        <div id="voice_parent" class="share_media">\n          <span class="db">\n            <span aria-labelledby="语音" id="voice_frame" class="share_audio_context flex_context pages_reset">\n              <span id="voice_play" class="share_audio_switch db" aria-labelledby="播放开关"><em role="button" class="icon_share_audio_switch"></em></span>\n              <span class="share_audio_info flex_bd db">\n                <strong class="share_audio_title" aria-describedby="语音标题" role="link">{data.title}</strong>\n                <span id="voice_seekRange" class="share_audio_progress_wrp db">\n                  <span class="db share_audio_progress">\n                    <span id="voice_progress" style="width:0%" class="share_audio_progress_inner"></span>\n                    <span id="voice_buffer" class="share_audio_progress_buffer" style="width:0%;"></span>\n                    <span id="voice_loading" class="share_audio_progress_loading" style="display:none;">\n                      <span class="share_audio_progress_loading_inner"></span>\n                    </span>\n                  </span>\n                  <span id="voice_playdot" class="share_audio_progress_handle" style="left:0%;display:none;"></span>\n                </span>\n                <span class="db share_audio_desc">\n                  <em id="voice_playtime" class="share_audio_length_current">00:00</em>\n                  <em class="share_audio_length_total">{data.share_voiceinfo[0].duration}</em>\n                </span>\n              </span>\n            </span>\n          </span>\n        </div>\n      </div>\n    </div>\n</div>\n<!--wx_phone_bd-->\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">会话消息</li>\n        <!--<li class="wx_view_item jsPhoneViewLink selected" data-id="appmsg">消息正文</li>-->\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    {if length>1}\n    <!--\n    <ul class="wx_article_crtl">        \n        <li class="crtl_btn crtl_pre_btn {if (index-1)<0}disabled{/if} jsPhoneViewCard" data-index="{index-1}">上一篇</li>        \n        <li class="crtl_btn crtl_next_btn {if (index+1)>=length}disabled{/if} jsPhoneViewCard" data-index="{index+1}">下一篇</li>\n    </ul>\n    -->\n    {/if}\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n';
});