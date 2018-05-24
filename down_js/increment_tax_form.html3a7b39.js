define("tpl/biztransfer/increment_tax_form.html.js",[],function(){
return'{if data.invoice_type != 2}\n<div class="frm_control_group">\n	<label for="" class="frm_label">纳税识别号</label>\n	<div class="frm_controls">\n		<span class="frm_input_box"><input type="text" class="frm_input" placeholder="" name="tax_num" value="{data.tax_num}" maxlength="200"></span>\n		<p class="frm_tips">\n			请填写15位或18位税务登记号。			{if data.invoice_type == 3}\n			<br>企业/企业媒体需填写正确的纳税识别号。其他类型用户可根据单位报销政策酌情填写。			{/if}\n			<br>因三证合一导致税号不确定，请务必和财务确认需报账的税号后再填写，否则信息错误将无法重新开具。		</p>\n	</div>\n</div>\n{/if}\n{if data.invoice_type == 4}\n<div class="frm_control_group">\n	<label for="" class="frm_label">企业注册地址</label>\n	<div class="frm_controls">\n		<span class="frm_input_box"><input type="text" class="frm_input" placeholder="企业注册地址" name="tax_address" value="{data.tax_address}" maxlength="200"></span>\n		<p class="frm_tips">与税务登记证一致</p>\n	</div>\n</div>\n<div class="frm_control_group">\n	<label for="" class="frm_label">机构电话</label>\n	<div class="frm_controls">\n		<span class="frm_input_box"><input type="text" class="frm_input" placeholder="机构电话" name="tax_tel" value="{data.tax_tel}" maxlength="200"></span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n<div class="frm_control_group">\n	<label for="" class="frm_label">机构开户银行</label>\n	<div class="frm_controls">\n        <span class="frm_input_box"><input type="text" class="frm_input" placeholder="机构开户银行" name="bank_name" value="{data.bank_name}" maxlength="200"></span>\n		<p class="frm_tips">与银行开户证明一致</p>\n	</div>\n</div>\n<div class="frm_control_group">\n	<label for="" class="frm_label">企业银行帐号</label>\n	<div class="frm_controls">\n		<span class="frm_input_box"><input type="text" class="frm_input" placeholder="企业银行帐号" name="bank_account" value="{data.bank_account}" maxlength="200"></span>\n		<p class="frm_tips">与银行开户证明一致</p>\n	</div>\n</div>\n<div class="frm_control_group">\n	<label for="" class="frm_label">开户许可证</label>\n	<div class="frm_controls  frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n            支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。<a target="_blank" href="/mpres/htmledition/images/pic/wxverify/pic_account_licence.png">查看示例</a>			</p>\n			<span class="upload_area">\n				<a href="javascript:;" class="btn btn_upload js_select_file" id="open_license_stuff">{if data.open_license_stuff}重新上传{else}选择文件{/if}</a>\n			</span>\n			<div id="open_license_stuff_preview" class="upload_preview">\n				{if data.open_license_stuff}\n				<img src="{$preview data.open_license_stuff}" />\n				{/if}\n			</div>\n			<span><input type="hidden" value="{data.open_license_stuff}" name="open_license_stuff" id="open_license_stuff_hidden" /></span>\n			<p class="frm_tips"></p>\n		</div>\n	</div>\n</div>\n{/if}\n{if data.invoice_type != 2}\n<div class="frm_control_group">\n	<label for="" class="frm_label">税务登记证</label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n            支持.jpg .jpeg .bmp .gif格式照片，大小不超过5M。<br>\n            {if (tmp_service_type!=\'4\' && (type==1 || type==2))}\n            	已办理三证合一的企业，请上传<a href="/mpres/zh_CN/htmledition/comm_htmledition/res/wxverify/pic_business_license.jpg" target="_blank">最新的营业执照</a>。<br>\n            {else if (tmp_service_type==\'4\')}\n            	已办理三证合一（组织机构代码证、营业执照、税务登记证合为一张证）的企业，请上传<a href="/mpres/zh_CN/htmledition/comm_htmledition/res/wxverify/pic_business_license.jpg" target="_blank">最新的营业执照</a>。<br>\n			{/if}\n        	<a target="_blank" href="/mpres/htmledition/images/pic/wxverify/pic_tax_check_in.jpg">查看《税务登记证副本》示例</a>、<a target="_blank" href="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/wxverify/pic_increment_tax.jpg">查看《一般纳税人资格证书》示例</a>、<a href="/mpres/zh_CN/htmledition/comm_htmledition/res/wxverify/pic_business_license.jpg" target="_blank">查看三证合一后营业执照示例</a>			</p>\n			<span class="upload_area">\n				<a href="javascript:;" class="btn btn_upload js_select_file" id="tax_reg_certificate">{if data.tax_reg_certificate}重新上传{else}选择文件{/if}</a>\n			</span>\n			<div id="tax_reg_certificate_preview" class="upload_preview">\n				{if data.tax_reg_certificate}\n				<img src="{$preview data.tax_reg_certificate}" />\n				{/if}\n			</div>\n			<span><input type="hidden" value="{data.tax_reg_certificate}" name="tax_reg_certificate" id="tax_reg_certificate_hidden" /></span>\n			<p class="frm_tips"></p>\n		</div>\n	</div>\n</div>\n{/if}\n{if data.invoice_type == 2 || data.invoice_type == 4}	            \n<div class="frm_control_group">\n    <label class="frm_label">邮寄地址</label>\n    <div class="frm_controls">\n        <input type="hidden" value="{data.province}" name="province" id="province" >\n        <input type="hidden" value="{data.city}" name="city" id="city" >\n        <div id="region_area"></div>\n        <p class="frm_tips">目前只支持中国大陆地区的邮寄。</p>\n    </div>\n</div>\n<div class="frm_control_group">\n    <label for="js_address" class="frm_label">街道详细地址</label>\n    <div class="frm_controls">\n        <span class="frm_input_box"><input type="text" value="{data.address}" class="frm_input" placeholder="请输入邮寄地址" name="address" id="js_address"></span>\n        <p class="frm_tips">请填写邮寄的街道地址，如“华景路南方通信大厦”</p>\n    </div>\n</div>\n<div class="frm_control_group">\n    <label for="post_code" class="frm_label">邮政编码</label>\n    <div class="frm_controls">\n        <span class="frm_input_box"><input type="text" value="{data.post_code}" class="frm_input" placeholder="请输入邮政编码" name="post_code" id="post_code"></span>\n        <p class="frm_tips"></p>\n    </div>\n</div>\n{/if}\n<div class="frm_control_group">\n    <label for="js_contact" class="frm_label">联系人</label>\n    <div class="frm_controls">\n        <span class="frm_input_box"><input type="text" placeholder="请输入联系人" value="{data.contact}" class="frm_input" name="contact" id="js_contact"></span>\n        <p class="frm_tips"></p>\n    </div>\n</div>\n<div class="frm_control_group">\n    <label for="js_phone" class="frm_label">联系电话</label>\n    <div class="frm_controls">\n        <span class="frm_input_box"><input type="text" placeholder="请输入联系电话" class="frm_input" value="{data.mobile}" name="mobile" id="js_phone"></span>\n        <p class="frm_tips"></p>\n    </div>\n</div>';
});