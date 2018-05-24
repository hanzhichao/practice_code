define("tpl/wxverify/confirmname.html.js",[],function(){
return'<script type="text/html" id="nick_name_tpl">\n    <span class="frm_input_box js_div_nick_name">\n        <input type="text" class="frm_input" name="nick_name" required value="{data.nick_name}">\n    </span>\n    <p class="frm_msg fail" id="js_div_nick_name_msg" style="display:none;"></p>\n</script>\n\n<script type="text/html" id="tmpl0">\n<div class="frm_control_group no_extra">\n	\n	<label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，不能超过20个字符，如果超过20个字符建议使用企业简称，如：腾讯科技</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl1">\n<!-- <div class="frm_control_group">\n    <label for="" class="frm_label">商标授权书</label>\n    <div class="frm_controls frm_vertical_pt">\n        <div class="upload_box">\n            <p class="upload_tips">\n                请上传商标授权文件                <br>复印件请务必加盖组织机构公章，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。<a class=\'download-link\' target=\'_blank\' href=\'{urls.trademarkAuthorizationOther}\'>查看示例</a>            </p>\n            <span class="upload_area"><a href="javascript:;" id="brand_auth_stuff" class="btn btn_upload js_select_file">{if data.brand_auth_stuff}重新上传{else}选择文件{/if}</a></span>\n            \n            <div id="brand_auth_stuff_preview" class="upload_preview">\n                {if data.brand_auth_stuff}\n                <img src="{$preview data.brand_auth_stuff \'multimedia\'}">\n                {/if}\n            </div>\n            <input type=\'hidden\' class=\'file_field\' value="{data.brand_auth_stuff}" name=\'brand_auth_stuff\' id=\'brand_auth_stuff_hidden\' />\n            <p class="frm_tips"></p>\n        </div>      \n    </div>\n</div> -->\n\n\n\n\n\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">\n        申请认证的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>如：Nike中国</dd>\n            <dd><a href="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/wxverify/pic_naming.png" target="_blank">查看示例</a></dd> \n        </dl>\n    </div>\n</div>\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">商标注册证书</label>\n    {$include \'upload_file_tpl\' \'brand_register_stuff\' \'请上传《商标注册证》文件\' data.brand_register_stuff}\n</div>\n<!-- 商标授权书 -->\n<div id="js_div_brand_auth_stuff"></div>\n\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl10">\n<div class="frm_control_group">\n    <label for="" class="frm_label">商标注册受理通知书</label>\n    {$include \'upload_file_tpl\' \'brand_acceptance_stuff\' \'在申请中的商标（即“TM”商标）请提供《商标注册受理通知书》，且该申请商标必须在中国商标局网站（http://sbj.saic.gov.cn/）可查询到，且已通过初审（即有初审公告时间）。不能使用他人申请的TM商标。\' data.brand_acceptance_stuff}\n</div>\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">基于商标命名时其他材料（选填）</label>\n    {$include \'upload_file_tpl\' \'naming_brand_other_stuff\' \'\' data.naming_brand_other_stuff}\n</div>\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，不能超过20个字符，如果超过20个字符建议使用企业简称，如：腾讯科技</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl2">\n<div class="frm_control_group no_extra">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl3">\n\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl4">\n\n\n\n\n<div class="frm_control_group no_extra">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl5">\n<div class="frm_control_group no_extra">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl6">\n\n\n\n\n\n\n\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">\n        申请认证的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n			<dd>如:央视新闻</dd>\n            <dd><a href="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/wxverify/pic_naming.png" target="_blank">查看示例</a></dd> \n        </dl>\n    </div>\n</div>\n<div id="js_div_naming_media_licesnse_stuff"></div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl7">\n<div class="frm_control_group no_extra">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl11">\n\n\n\n\n\n<div class="frm_control_group">\n    <label for="" class="frm_label">\n        申请认证的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n			<dd>如：华为运动健康</dd>\n            <dd><a href="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/wxverify/pic_naming.png" target="_blank">查看示例</a></dd> \n		</dl>\n    </div>\n</div>\n<div id="js_div_naming_other_stuff"></div>\n<input type="hidden" name="ignore_other" value="0">\n{include \'tool_bar_tpl\'}\n</script>\n\n<script type="text/html" id="tmpl9">\n<div class="frm_control_group no_extra">\n    <label for="" class="frm_label">\n        认证后的公众号名称    </label>\n    <div class="frm_controls">\n        {include \'nick_name_tpl\'}\n        <dl class="frm_tips">\n            <dd>1. 企业全称，如：深圳市腾讯计算机科技有限公司</dd>\n            <dd>2. 企业简称/商标，如：腾讯科技，微信Wechat</dd>\n            <dd>3. 在2#的基础上添加企业自定义前后缀。前后缀只要不侵权违法违规，不产生明显歧义即可。如涉及地域，不可大于工商营业执照上的经营地域范围。如：爱点评，泰康人，易迅小薇</dd>\n        </dl>\n    </div>\n</div>\n{include \'tool_bar_tpl\'}\n</script>\n';
});