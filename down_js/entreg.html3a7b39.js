define("tpl/wxverify/entreg.html.js",[],function(){
return'<!-- 企业 -->\n<form action="" class="form simple" id="entreg">\n	<fieldset class="fieldset">\n		<input type="hidden" name="type" value="1">\n\n		{if refill_type != 2}\n        <legend class="frm_legend">企业业务资料</legend>\n		<!-- <p class="mini_tips frm_tips_fill_info">\n			<i class="icon_msg_mini info"></i>\n			若后续要申请微信支付，则此处的申请主体需与后续的微信支付运营主体、结算主体保持一致。		</p> -->\n\n		{$include \'name_tpl\' \'企业全称\' data}\n\n        {if tmp_service_type == 4}\n       		{$include \'enterprises_member_num_tpl\' \'企业规模\' data}\n            <!-- START #js_div_ent_scale_verify_detail -->\n			<div id="js_div_ent_scale_verify_detail">\n		        {$include \'enterprises_scale_verify_tpl\' \'企业规模认证资料\' data}\n			</div>\n			<!-- END #js_div_ent_scale_verify_detail -->\n        {/if}\n\n\n\n		{$include \'organization_code_tpl\' \'组织机构代码<br>/统一社会信用代码\' data}\n\n		{$include \'license_number_tpl\' \'\' data}\n\n		{$include \'legal_person_tpl\' \'法定代表人<br>/企业负责人姓名\' data}\n\n\n\n\n		<div class="frm_control_group">\n			<label for="" class="frm_label">经营范围<br><span class="label_tips">(一般经营范围)</span></label>\n			<div class="frm_controls">\n				<span class="frm_textarea_box">\n					<textarea id="generic_business_type" name="generic_business_type" class="frm_textarea">{data.generic_business_type}</textarea>\n				</span>\n				<p class="frm_tips">与企业工商营业执照上一致。</p>\n			</div>\n		</div>\n\n		<div class="frm_control_group">\n			<label for="" class="frm_label">经营范围<br><span class="label_tips">(前置许可经营范围)</span></label>\n			<div class="frm_controls">\n				<span class="frm_textarea_box">\n					<textarea id="front_business_type" name="front_business_type" class="frm_textarea">{data.front_business_type}</textarea>\n				</span>\n				<p class="frm_tips">没有则填“无”</p>\n			</div>\n		</div>\n\n\n\n		{if tmp_service_type != 4}\n		<div class="frm_control_group">\n			<label for="" class="frm_label">企业规模<br><span class="label_tips">(选填)</span></label>\n			<div class="frm_controls">\n				<span class="frm_input_box">\n					<input id="scale" name="scale" value="{data.scale}" type="text" placeholder="" class="frm_input">\n				</span>\n				<p class="frm_tips">填写企业员工人数</p>\n			</div>\n		</div>\n		{/if}\n\n		{$include \'bank_tpl\' \'企业开户名称\' \'企业开户银行\' \'企业银行账号\' data}\n\n		\n\n\n\n		{include \'operator_tpl\'}\n		\n		<h3 class="form_mod_title">企业基本资料</h3>\n		{include \'letter_file_tpl\'}\n		{$include \'organization_code_stuff_file_tpl\' \'组织机构代码证\' data}\n		{$include \'license_number_file_tpl\' \'企业工商营业执照\' data}\n\n\n\n		{include \'other_stuff_tpl\'}\n		{/if}\n\n		{if refill_type==2 || refill_type==4}\n		{include \'complement_material_tpl\'}\n		{/if}\n\n	</fieldset>\n	{include \'tool_bar_tpl\'}\n</form>\n';
});