define("tpl/Idcheck.html.js",[],function(){
return'<div class="safe_check">\n	<div class="processor_wrp js_process"></div>\n	<div class="form form_width_auto js_step1">\n        <div class="inner">\n            <div class="frm_hd">\n                <h3 class="frm_title">为了公众号帐号安全，操作前需要先进行验证，请选择验证方式：</h3>\n            </div>\n            <div class="frm_control_group">\n                <div class="frm_controls">\n                    <label class="frm_radio_label selected">\n                        <i class="icon_radio"></i>\n                        <span class="lbl_content">通过信息登记手机号来验证</span>\n                        <input type="radio" value="1" class="frm_radio js_radio" checked="checked">\n                    </label>\n                    <p class="frm_radio_block_desc">通过发送验证短信到你的绑定手机{mobile.number}验证</p>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <div class="frm_controls">\n                    <label class="frm_radio_label">\n                        <i class="icon_radio"></i>\n                        <span class="lbl_content">通过信息登记身份证号来验证</span>\n                        <input type="radio" value="0" class="frm_radio js_radio">\n                    </label>\n                    <p class="frm_radio_block_desc">通过填写注册时登记的姓名、身份证号进行验证</p>\n                </div>\n            </div>\n            <!--\n            <div class="frm_control_group js_option" style="display:none;">\n                <div class="frm_controls">\n                    <label class="frm_radio_label">\n                        <i class="icon_radio"></i>\n                        <span class="lbl_content">通过登录邮箱来验证</span>\n                        <input type="radio" value="2" class="frm_radio js_radio">\n                    </label>\n                    <p class="frm_radio_block_desc">将会发送安全验证码到你的登录邮箱<span class="js_step1_email"></span>，填写正确验证码可通过验证</p>\n                </div>\n            </div>\n        	-->\n        </div>\n        <div class="tool_bar border tc">\n            <a href="javascript:;" class="btn btn_primary js_step1_next">下一步</a>\n        </div>\n    </div>\n    <div class="form disableform js_setp2_mobile" style="display:none;">\n        <div class="inner">\n            <div class="frm_hd">\n                <h3 class="frm_title">请输入手机验证码进行验证</h3>\n            </div>\n            <div class="frm_control_group">\n                <label class="frm_label">手机号</label>\n                <div class="frm_controls frm_vertical_pt">\n                    <p>\n                        <span class="js_old">{mobile.number}</span>\n                        <a class="ml1e js_mobile_forget" href=\'javascript:;\'>重置手机号</a>\n                    </p>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <label class="frm_label">验证码</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box vcode">\n                        <input type="text" placeholder="验证码" class="frm_input js_num">\n                    </span>\n                    <a href="javascript:" class="btn btn_default btn_p20 js_oldsend">获取验证码</a>\n                </div>\n            </div>\n        </div>\n        <div class="tool_bar border tc">\n            <a href="javascript:;" class="btn btn_default js_step2_prev">上一步</a>\n            <a href="javascript:;" class="btn btn_primary js_step2_mobilecheck">提交</a>\n        </div>\n    </div>\n    <div class="form form_owner_info js_step2_idcard" style="display:none;">\n        <div class="inner">\n            <div class="frm_hd">\n                <h3 class="frm_title">请正确填写以下信息，以验证你的身份</h3>\n            </div>\n            <div class="frm_control_group">\n                <label class="frm_label">身份证姓名</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type="text" class="frm_input js_cardname">\n                    </span>\n                    <p class="frm_tips">请填写注册时登记的身份证姓名</p>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <label class="frm_label">身份证号码</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type="text" class="frm_input js_cardid">\n                    </span>\n                    <p class="frm_tips">请正确填写注册时所登记的身份证号码</p>\n                </div>\n            </div>\n        </div>\n        <div class="tool_bar border tc">\n            <a href="javascript:;" class="btn btn_default js_step2_prev">上一步</a>\n            <a href="javascript:;" class="btn btn_primary js_step2_idcardcheck">提交</a>\n        </div>\n    </div>\n</div>';
});