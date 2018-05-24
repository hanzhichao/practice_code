define("tpl/media/audioMusicDialog.html.js",[],function(){
return'<div id="audio_music_dialog_content" class="audio_music_dialog_content">\n  <div class="weui-desktop-tab weui-desktop-tab_title weui-desktop-tab_dialog title_tab">\n    <ul class="weui-desktop-tab__navs">\n      {if allowAudio}<li class="js_audio_tab_btn weui-desktop-tab__nav first js_top"><a href="javascript:;">素材库</a></li>{/if}\n      {if allowMusic}<li class="js_music_tab_btn weui-desktop-tab__nav first js_top"><a href="javascript:;">音乐</a></li>{/if}\n    </ul>\n  </div>\n  <div>\n\n    {if allowAudio}<div class="js_audio_block audio_box" style="display:none">\n        {if audioDisabled}\n        <div class="page_msg mini audio_global_msg">\n            <div class="inner">\n                <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n                <div class="msg_content">\n                    <p>每篇图文消息只能添加一个语音</p>\n                </div>\n            </div>\n        </div>\n        {/if}\n      <div class="global_mod audio_box_hd float_layout gap_top" id="">\n          <p class="global_info gap_top_item tips_global jsAudioTips" {if !hasAudioLengthLimit}style="display:none;"{/if}>由于版本兼容的原因,你暂时只可以选择60秒内的语音发送</p>\n          <p class="global_extra">\n              <a class="btn btn_primary btn_add jsPluginAudioNew" href="javascript:;"><i class="icon14_common add_white"></i>新建语音</a>\n          </p>\n      </div>\n      <div class="audio_box_bd audio_list_container" id="">\n          <div class="media_list_tips_wrp tips_global" style="display:none;">\n              <span class="tips">暂无素材</span>\n              <span class="vm_box"></span>\n          </div>\n          <div class="media_list_tips_wrp" style="display:none;">\n              <i class="icon_loading_small white">loading...</i>\n              <span class="vm_box"></span>\n          </div>\n          <div class="audio_list jsPluginAudioList"></div>\n          <div class="pagination_wrp jsPluginAudioPage"></div>\n      </div>\n    </div>{/if}\n\n    {if allowMusic}<div class="js_music_block" style="display:none">\n      <div class="global_mod qqmusic_box_hd float_layout gap_top" id="searchDiv">\n          <span class="global_info frm_input_box search with_del append">\n              <a class="del_btn" onclick="return false" href="javascript:;" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n              <a onclick="return false" id="searchBt" href="javascript:;" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n              <input id="keyInput" type="text" placeholder="歌名/作者" value="" class="frm_input">\n          </span>\n      </div>\n      <div class="qqmusic_box_bd qqmusic_list_container">\n        <div class="media_list_tips_wrp js_music_loading" style="display:none;">\n          <i class="icon_loading_small white">loading...</i>\n          <span class="vm_box"></span>\n        </div>\n        <div id="dialog_audio_container">\n        </div>\n      </div>\n    </div>{/if}\n\n  </div>\n</div>\n';
});