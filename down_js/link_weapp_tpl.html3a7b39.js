define("tpl/setting/link_weapp_tpl.html.js",[],function(){
return'<div class="processor_bar_wrp js_process"></div>\n<div class="processor_panel">\n    <!-- 第一步：扫码 -->\n    <div class="qrcheck_box js_wxopen_qrbox">\n    <div class="tc">\n        <div class="qrcode_scan qrcode_scan_light">\n            <div class="qrcode_wrp">\n                <img class="qrcode js_qrcode" src="" alt="微信二维码" title="微信二维码" />\n            </div>\n            <div class="js_status"></div>\n        </div>\n    </div>\n    </div>\n    <!-- 第二步：关联小程序 -->\n    <div class="weapplink_searchbox js_wxopen_searchbox" style="display:none;">\n        <div class="wechat_search_hd">\n            <div class="wechat_search_form">\n                <span class="frm_input_box with_del search append">\n                    <a class="del_btn " style=\'display:none;\' href="javascript:">\n                        <i class="icon_search_del"></i>&nbsp;</a>\n                    <a href="javascript:void(0);" class="frm_input_append js_search_btn">\n                        <i class="icon16_common search_gray">搜索</i>&nbsp;\n                    </a>\n                    <input type="text" placeholder="请输入要搜索的AppID" class="frm_input" id="js_search_input" >\n                    <input type="text" id="js_search_input1">\n                </span>\n                <p class="wechat_msg js_fail_msg"></p>\n                <p class="frm_tips">仅支持关联与公众号主体一致的小程序</p>\n            </div>\n        </div>\n        <div class="wechat_search_bd weapplinks_box">\n            <p class="wechat_search_loading wechat_mask primary js_search_loading" style="display:none">\n                <i class="icon_loading_small white"></i>\n                <span class="vm_box"></span>\n            </p>\n            <p class="wechat_search_nodata tips_global" style="display: none;">无法找到该小程序，请检查你搜索的名称是否正确</p>\n            <ul class="wechat_list weapplink_list js_dialog_list" style="display:block">\n                \n            </ul>\n        </div>\n        <div class="step_ft">\n            <a href="javascript:;" class="btn btn_primary js_link_btn">发送关联邀请</a>\n        </div>\n    </div>\n    <!-- 邀请已发送 -->\n    <div class="page_msg simple default weapplink_sucess js_wxopen_succ" style="display:none;">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg success"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 已发送邀请 </h4>\n                <p> 已向小程序的管理员发送公众号展示小程序邀请，对方需要在24小时内做出应答，否则邀请将会失效。</p>\n            </div>\n        </div>\n    </div>\n</div>\n';
});