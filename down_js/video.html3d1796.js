define("tpl/media/preview/video.html.js",[],function(){
return'<div class="wx_phone_hd">\n  <button class="js_back_btn wx_phone_goback_btn">返回</button>\n  {data.nickName}\n</div>\n<div class="wx_phone_bd">\n    <div class="wx_phone_preview_appmsg appmsg_wap page_share_video">\n      <div class="video_info_mod video_overview_info_context">\n        <div class="flex_context account_info">\n          <div class="flex_hd">\n            <span class="radius_avatar account_avatar">\n              <img class="account_avatar" src="{data.avatar}" alt="">\n            </span>\n          </div>\n          <div class="flex_bd">\n            <div class="account_nickname">\n              <strong class=" account_nickname_inner">{data.nickName}</strong>\n            </div>\n            <div class="account_desc">\n              <div class="account_desc_inner">\n                <span id="publish_time">{data.time}</span>\n                分享              </div>\n            </div>\n          </div>\n        </div>\n        <p class="share_notice">\n          {=data.guide_words.html(true).replace(/\\r/g,"").replace(/\\n/g,"<br>").replace(/\\s/g,"&nbsp;")}\n        </p>\n\n        <div class="video_card_context">\n          <div id="js_mpvedio" class="mpvideo_wrp">\n            <iframe class="video_iframe wx_video_iframe" allowfullscreen="" frameborder="0" src="https://v.qq.com/iframe/preview.html?vid={=data.share_videoinfo[0].video_id}&width=267&height=150&auto=0" style="width:267px;height:150px;"></iframe>\n          </div>\n          <div class="video_card_ft">\n            <h2 class="video_info_title">\n              <span id="video_title">{data.title}</span>\n            </h2>\n            <!--\n            <div class="video_info_overview">\n              <span class="video_info_overview_meta">视频来源&nbsp;\n                <a href="javascript:void(0);">腾讯视频</a>\n              </span>\n            </div>\n          -->\n          </div>\n        </div>\n      </div>\n    </div>\n</div>\n<!--wx_phone_bd-->\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">会话消息</li>\n        <!--<li class="wx_view_item jsPhoneViewLink selected" data-id="appmsg">消息正文</li>-->\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    {if length>1}\n    <!--\n    <ul class="wx_article_crtl">        \n        <li class="crtl_btn crtl_pre_btn {if (index-1)<0}disabled{/if} jsPhoneViewCard" data-index="{index-1}">上一篇</li>        \n        <li class="crtl_btn crtl_next_btn {if (index+1)>=length}disabled{/if} jsPhoneViewCard" data-index="{index+1}">下一篇</li>\n    </ul>\n    -->\n    {/if}\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n';
});