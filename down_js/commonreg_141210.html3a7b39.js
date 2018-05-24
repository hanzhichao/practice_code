define("tpl/wxverify/commonreg_141210.html.js",[],function(){
return'<script type="text/html" id="telephone_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[1]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="{data[0]}" value="{data[2]}" name="{data[0]}" type="text" placeholder="" class="frm_input">\n		</span>		\n		<p class="frm_tips">包括区号、电话、分机号，以“-”隔开</p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="name_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	{if data[1].can_modify_name==0 && data[1].name}\n	<div class="frm_controls">\n		<span>\n			{data[1].name}  &nbsp;&nbsp;{if data[1].tmp_service_type!=4 }<a href="/acct/contractorinfo?t=setting/owner-setting&action=info&lang={baseData.lang}&token={baseData.t}">详情</a>{/if}\n			<input id="name" value="{data[1].name}" name="name" type="hidden">\n		</span>\n		<p class="frm_tips">主体全称不可修改</p>\n	</div>\n	{else}\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="name" value="{data[1].name}" name="name" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">\n		{if data[1].currentType==1||data[1].currentType==7}\n		只支持中国大陆工商局或市场监督管理局登记的企业。请填写工商营业执照上的企业全称，该名称将作为微信认证审核服务费的发票抬头。	\n		{else if data[1].currentType==2}\n		与企业工商营业执照上的名称相符，该名称将作为微信认证审核服务费的发票抬头		{else if data[1].currentType==9}\n		与事业单位法人证书上的名称相符，该名称将作为微信认证审核服务费的发票抬头		{else if data[1].currentType==3}\n		只支持中国大陆地区的机构		{else}\n		只支持中国大陆登记注册的组织		\n		{/if}\n		</p>\n        <p class="frm_msg fail" style="display: block;">认证成功后主体全称不可修改</p>\n	</div>\n	{/if}\n</div>\n</script>\n\n<script type="text/html" id="enterprises_member_num_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">企业规模</label>\n	<div class="frm_control_row">\n		<div class="frm_controls">\n			<span class="frm_input_box" >\n				<input id="scale" name="scale" value="{data[1].scale}" type="text"  class="frm_input" >\n			</span>\n			<p class="frm_tips">{if data[1].currentType == "1"}请填写需要增加的其他企业合作成员数量。并在下方上传证明材料。最终开通成员数量将以企业规模两数字之和作判断依据。{else} 请填写企业员工数。该数据将作为开通成员数上限的主要判断。 {/if}</p>\n		</div>\n		{if data[1].currentType == "1"}\n		<div class="frm_controls frm_control_upload_group">\n			<p class="frm_label_top">由于各地提供证明单位的政策不一，可能导致某些举证材料无法被核实。<br />因此，请尽可能提供如下多种材料，以加快认证审核进度：</p>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">1.社保缴纳人数证明</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="social_insure_scale_stuff" class="btn btn_upload js_select_file">{if data[1].social_insure_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="social_insure_scale_stuff_preview" class="upload_preview">\n					{if data[1].social_insure_scale_stuff}\n					<img src="{$preview data[1].social_insure_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\' scale_proof="1"  name=\'social_insure_scale_stuff\' value="{data[1].social_insure_scale_stuff}" id=\'social_insure_scale_stuff_hidden\' />\n				</div>\n				\n			</div>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">2.上市企业财报人数证明</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="earnings_scale_stuff" class="btn btn_upload js_select_file">{if data[1].earnings_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="earnings_scale_stuff_preview" class="upload_preview">\n					{if data[1].earnings_scale_stuff}\n					<img src="{$preview data[1].earnings_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\'  scale_proof="1" name=\'earnings_scale_stuff\' value="{data[1].earnings_scale_stuff}" id=\'earnings_scale_stuff_hidden\' />\n				</div>\n			</div>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">3.个税缴纳人数证明</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="individual_tax_scale_stuff" class="btn btn_upload js_select_file">{if data[1].individual_tax_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="individual_tax_scale_stuff_preview" class="upload_preview">\n					{if data[1].other_scale_proof_stuff}\n					<img src="{$preview data[1].individual_tax_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\' scale_proof="1"  name=\'individual_tax_scale_stuff\' value="{data[1].individual_tax_scale_stuff}" id=\'individual_tax_scale_stuff_hidden\' />\n				</div>\n			</div>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">4.购买/租赁办公场地的产权/租赁合同证明（如租赁还需提供租赁方房产证明）</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="working_place_scale_stuff" class="btn btn_upload js_select_file">{if data[1].working_place_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="working_place_scale_stuff_preview" class="upload_preview">\n					{if data[1].working_place_scale_stuff}\n					<img src="{$preview data[1].working_place_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\' scale_proof="1"  name=\'working_place_scale_stuff\' value="{data[1].working_place_scale_stuff}" id=\'working_place_scale_stuff_hidden\' />\n				</div>\n			</div>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">5.办公电话接入数证明</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="biz_tel_scale_stuff" class="btn btn_upload js_select_file">{if data[1].biz_tel_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="biz_tel_scale_stuff_preview" class="upload_preview">\n					{if data[1].biz_tel_scale_stuff}\n					<img src="{$preview data[1].biz_tel_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\' scale_proof="1"  name=\'biz_tel_scale_stuff\' value="{data[1].biz_tel_scale_stuff}" id=\'biz_tel_scale_stuff_hidden\' />\n				</div>\n			</div>\n			<div class="frm_controls_oper">\n				<p class="frm_label_top">6.银行代发工资人数证明</p>\n				<div class="upload_box">\n					<span class="upload_area"><a href="javascript:;" id="wages_paying_scale_stuff" class="btn btn_upload js_select_file">{if data[1].wages_paying_scale_stuff}重新上传{else}选择文件{/if}</a></span>\n					<div id="wages_paying_scale_stuff_preview" class="upload_preview">\n					{if data[1].wages_paying_scale_stuff}\n					<img src="{$preview data[1].wages_paying_scale_stuff data[1].preview_action}">\n					{/if}\n					</div>\n					<input type=\'hidden\' class=\'file_field\'  scale_proof="1"  name=\'wages_paying_scale_stuff\' value="{data[1].wages_paying_scale_stuff}" id=\'wages_paying_scale_stuff_hidden\' />\n				</div>\n			</div>\n			\n		</div>\n		{/if}\n	</div>\n</div>\n{if data[1].currentType == "1"}\n<div class="frm_control_group">\n	<label for="" class="frm_label">上下游供应关系规模<br /><span class="label_tips">(选填)</span></label>\n	<div class="frm_control_row">\n		<div class="frm_controls">\n			<label class="frm_checkbox_label selected">\n				<i class="icon_checkbox"></i>\n				<span class="lbl_content">我的企业有上下游供应链关系，需增加除本公司成员外的数量</span>\n				<input type="checkbox" id="has_extra_scale" class="frm_checkbox">\n			</label>\n			\n		</div>\n		<div class="" id="span_extra_scale" style="{if data[1].extra_scale}display:block{else}display:none{/if}">\n			<div class="frm_controls">\n				<div class="" >\n					<span class="frm_input_box" >\n						<input id="extra_scale" name="extra_scale" value="{data[1].extra_scale}" type="text"  class="frm_input" >\n					</span>\n					<p class="frm_tips"> 请填写需要增加的其他企业合作成员数量，并在下方上传证明资料。<br />最终开通成员数量将以“企业规模+上下游供应关系规模”两者之和作判断依据。</p>\n				</div>\n			</div>\n\n			<div class="frm_control_upload_group">\n				<p class="frm_label_top">请在此处上传证明材料：</p>\n				<div class="frm_controls_oper">\n					<p class="frm_label_top">1.与其他企业合作证明</p>\n					<div class="upload_box">\n						<span class="upload_area"><a href="javascript:;" id="relation_proof_stuff" class="btn btn_upload js_select_file">{if data[1].relation_proof_stuff}重新上传{else}选择文件{/if}</a></span>\n						<div id="relation_proof_stuff_preview" class="upload_preview">\n						{if data[1].relation_proof_stuff}\n						<img src="{$preview data[1].relation_proof_stuff data[1].preview_action}">\n						{/if}\n						</div>\n						<input type=\'hidden\' class=\'file_field\' name=\'relation_proof_stuff\' value="{data[1].relation_proof_stuff}" id=\'relation_proof_stuff_hidden\' />\n					</div>\n				</div>\n				<div class="frm_controls_oper">\n					<p class="frm_label_top">2.与其他企业合作成员人数证明</p>\n					<div class="upload_box">\n						<span class="upload_area"><a href="javascript:;" id="partner_scale_proof_stuff" class="btn btn_upload js_select_file">{if data[1].partner_scale_proof_stuff}重新上传{else}选择文件{/if}</a></span>\n						<div id="partner_scale_proof_stuff_preview" class="upload_preview">\n						{if data[1].partner_scale_proof_stuff}\n						<img src="{$preview data[1].partner_scale_proof_stuff data[1].preview_action}">\n						{/if}\n						</div>\n						<input type=\'hidden\' class=\'file_field\'  name=\'partner_scale_proof_stuff\' value="{data[1].partner_scale_proof_stuff}" id=\'partner_scale_proof_stuff_hidden\' />\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n{/if}\n</script>\n\n<script type="text/html" id="official_website_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">官网<br><span class="label_tips">(选填)</span></label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="official_website" name="official_website" value="{data.official_website}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="email_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[1]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="{data[0]}" value="{data[3]}" name="{data[0]}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="license_number_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{if data[0]}{data[0]}{else}工商执照注册号{/if}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="registered_id" {if data[1]}value="{data[1]}" {/if}name="registered_id" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n<script type="text/html" id="letter_file_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">申请公函</label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				{if tmp_service_type!=4 }\n					{if data.currentType==1}一般企业请下载<a class="download-link" target=\'_blank\' href="{urls.letterEnt}" title=\'点击下载\'>一般企业申请认证公函</a>，<br>个体请下载<a class="download-link" target=\'_blank\' href="{urls.letterIndividial}" title=\'点击下载\'>个体工商户申请认证函</a>\n					{else if data.currentType==2}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterMedia}" title=\'点击下载\'>媒体申请认证公函</a>\n					{else if data.currentType==3}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterGov}" title=\'点击下载\'>政府申请认证公函</a>\n					{else if data.currentType==4}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterOther}" title=\'点击下载\'>其他组织申请认证公函</a>\n					{else if data.currentType==5}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterOther}" title=\'点击下载\'>民办非企业申请认证公函</a>\n					{else if data.currentType==6}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterOther}" title=\'点击下载\'>其他营利组织申请认证公函</a>\n					{else if data.currentType==7}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterShop}" title=\'点击下载\'>网店申请认证公函</a>\n					{else if data.currentType==8}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterOther}" title=\'点击下载\'>社会团体申请认证公函</a>\n					{else if data.currentType==9}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterMedia}" title=\'点击下载\'>媒体申请认证公函</a>\n					{else if data.currentType==10}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterOther}" title=\'点击下载\'>艺人申请认证公函</a>\n					{else if data.currentType==11}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterGov}" title=\'点击下载\'>事业单位申请认证公函</a>\n					{/if}<br>\n					填写认证公函需要提供公众号的原始ID，去我的<a target="_blank" href="/cgi-bin/settingpage?t=setting/index&action=index&lang={baseData.lang}&token={baseData.t}">账户信息</a>查看原始ID。<br/>\n				{else}\n					{if data.currentType==1}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterEnt_forEnt}" title=\'点击下载\'>一般企业申请认证公函</a>，<br />\n					{else if data.currentType==3}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterEnt_forGov}" title=\'点击下载\'>政府申请认证公函</a>，<br />\n					{else if data.currentType==11}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterEnt_forGov}" title=\'点击下载\'>事业单位申请认证公函</a>，<br />\n					{else}\n					请下载<a class="download-link" target=\'_blank\' href="{urls.letterEnt_forOther}" title=\'点击下载\'>其他组织申请认证公函</a>，<br />\n					{/if}\n					填写时需要提供企业号的CorpID，去<a class="download-link" target=\'_blank\' href="http://qy.weixin.qq.com/cgi-bin/home?lang=zh_CN&token={baseData.t}#setting" title=\'设置\'>【设置-企业信息】</a>查看CorpID。	\n				{/if}\n				上传加盖企业公章的原件照片或扫描件<br/>\n				支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。			</p>\n			<span class="upload_area"><a href="javascript:;" id="application_letter" class="btn btn_upload js_select_file">{if data.application_letter}重新上传{else}选择文件{/if}</a></span>\n			<div id="application_letter_preview" class="upload_preview">\n				{if data.application_letter}\n				<img src="{$preview data.application_letter data.preview_action}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' value="{data.application_letter}" name=\'application_letter\' id=\'application_letter_hidden\' />\n		</div>\n	</div>\n</div>\n</script>\n<script type="text/html" id="other_stuff_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">其他证明材料<br><span class="label_tips">(选填)</span></label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				此处提交其他证明材料。<br/>\n				{if data.currentType==2 || data.currentType==9}\n				发行单位还应上传 <a class=\'download-link\' target=\'_blank\' href=\'{urls.letterAuthorization}\'>出版单位授权书</a>，请下载授权书模版；<br/>\n				{/if}\n				支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。			</p>\n			<span class="upload_area"><a href="javascript:;" id="other_stuff" class="btn btn_upload js_select_file">{if data.other_stuff}重新上传{else}选择文件{/if}</a></span>\n			<div id="other_stuff_preview" class="upload_preview">\n				{if data.other_stuff}\n				<img src="{$preview data.other_stuff data.preview_action}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' value="{data.other_stuff}" name=\'other_stuff\' id=\'other_stuff_hidden\' />\n		</div>\n	</div>\n</div>\n</script>\n<script type="text/html" id="related_proof_file_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">{=data[0]}</label>\n	<div class="frm_controls  frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				{if data[1].currentType==4}\n				基金会请上传《基金会法人登记证书》<br/>\n				外国政府机构驻华代表处请上传国家有关主管部门的批文或证明<br/>\n				{else if data[1].currentType==5}\n				非事业单位的培训教育机构，需要提交其自身所有权的《办学许可证》<br/>\n				非事业单位的医疗机构包括美容，需要提交其自身所有权的《医疗机构执业许可证》等<br/>\n				{else if data[1].currentType!=6}\n				基金会请上传《基金会法人登记证书》<br/>\n				其他民办非企业组织请上传民办非企业登记证书<br/>\n				外地常设机构请上传其驻在地政府主管部门的批文<br/>\n				外国驻华机构请上传国家有关主管部门的批文或证明<br/>\n				居民委员会、村民委员会、社区委员会等其他组织请上传主管部门的批文或证明<br/>\n				独立核算的附属机构请上传主管部门的基本存款账户开户许可证和批文<br/>\n				{/if}\n				请上传原件照片或扫描件，或者复印件加盖企业公章后的扫描件<br/>\n				支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M			</p>\n			<span class="upload_area"><a href="javascript:;" id="related_proof_stuff" class="btn btn_upload js_select_file">{if data[1].related_proof_stuff}重新上传{else}选择文件{/if}</a></span>\n			<div id="related_proof_stuff_preview" class="upload_preview">\n				{if data[1].related_proof_stuff}\n				<img src="{$preview data[1].related_proof_stuff data[1].preview_action}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' value="{data[1].related_proof_stuff}" name=\'related_proof_stuff\' id=\'related_proof_stuff_hidden\' />\n		</div>	\n	</div>\n</div>\n</script>\n<script type="text/html" id="license_number_file_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">{=data[0]}</label>\n	<div class="frm_controls  frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				只支持中国大陆工商局或市场监督管理局颁发的工商营业执照，且必须在有效期内。<br>			\n				格式要求：原件照片、扫描件或者复印件加盖企业公章后的扫描件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。					\n			</p>\n			<span class="upload_area"><a href="javascript:;" id="business_license_stuff" class="btn btn_upload js_select_file">{if data[1].business_license_stuff}重新上传{else}选择文件{/if}</a></span>\n			<div id="business_license_stuff_preview" class="upload_preview">\n			{if data[1].business_license_stuff}\n			<img src="{$preview data[1].business_license_stuff data[1].preview_action}">\n			{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' {if data[1].business_license_stuff}value="{data[1].business_license_stuff}" {/if} name=\'business_license_stuff\' id=\'business_license_stuff_hidden\' />\n		</div>\n	</div>\n</div>\n</script>\n<script type="text/html" id="organization_code_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="organization_code" value="{data[1].organization_code}" name="organization_code" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">能与组织机构代码证匹配，每个组织机构代码只可以申请一次企业号</p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="keywords_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">相关关键词</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="keywords" value="{data.keywords}" name="keywords" type="text" placeholder="" class="frm_input">\n		</span>	\n		<p class="frm_tips">\n			{if data.currentType==3||data.currentType==4||data.currentType==5||data.currentType==6||data.currentType==8}\n			可填机构简称、行业、主营业务，必须和机构有直接的关联，审核时会删减不相关的词，最多可填9个，请用空格分隔开			{else}\n			可填企业简称、行业、主营业务，必须和企业有直接的关联，审核时会删减不相关的词，最多可填9个，请用空格分隔开			\n			{/if}\n		</p>\n	</div>\n</div>\n</script>\n<script type="text/html" id="operator_tpl">\n\n<!--运营者信息-->\n<h3><i class="icon_dot">●</i>运营者信息</h3>\n<div class="frm_control_group">\n	<label for="" class="frm_label">公众号发布的内容<br>/提供的服务<br><span class=\'label_tips\'>(选填)</span>")</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="service_type" value="{data.service_type}" name="service_type" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">仅做认证时参考使用。</p>\n	</div>\n</div>\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">帐号运营者姓名</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="mp_operator_name" value="{data.mp_operator_name}" name="mp_operator_name" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">与申请公函上的运营人员一致，认证审核过程将与该运营人员联系。</p>		\n	</div>\n</div>\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">帐号运营者部门与职位<br><span class="label_tips">(选填)</span></label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="mp_operator_position" value="{data.mp_operator_position}" name="mp_operator_position" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n\n<div class="frm_control_group btn_input_group">\n	<label for="" class="frm_label">帐号运营者手机号码</label>\n	<div class="frm_controls">\n		<span class="frm_input_box vcode">\n			<input id="mp_operator_phone" value="{data.mp_operator_phone}" name="mp_operator_phone" type="text" placeholder="" class="frm_input">\n		</span>\n		<a href="javascript:;" id="sendmobile" class="btn btn_vcode" disabled style="display:none">获取验证码</a>\n		<p class="frm_tips">请填写运营人员的手机号码，认证审核过程将与该运营人员联系。</p>\n	</div>\n</div>\n\n<div class="frm_control_group" style="display:none">\n	<label for="" class="frm_label">短信验证码</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="verify_code" name="verify_code" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n\n\n{$include \'telephone_tpl\' \'mp_operator_tel\' \'帐号运营者座机\' data.mp_operator_tel}\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">帐号运营者电子邮箱</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="mp_operator_email" value="{data.mp_operator_email}" name="mp_operator_email" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n<!--\n<div class="frm_control_group">\n\n	<label for="" class="frm_label">运营人员身份证类型<br><a href="/cgi-bin/readtemplate?t=wxverify/faq_tmpl&amp;lang=zh_CN&amp;token=1652631453#paper" target="_blank">支持哪些证件类型？</a></label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="mp_operator_idcard_name" value="{data.mp_operator_idcard_name}" name="mp_operator_idcard_name" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n-->\n<input id="mp_operator_idcard_name" value="身份证" name="mp_operator_idcard_name" type="hidden" >\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">运营人员身份证号码</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="mp_operator_idcard_number" value="{data.mp_operator_idcard_number}" name="mp_operator_idcard_number" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n{include \'operator_idcard_tpl\'}\n</script>\n<script type="text/html" id="operator_idcard_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">运营人员身份证件（正面）</label>\n	<div class="frm_controls">\n		\n		<div class="frm_controls frm_vertical_pt">\n			\n			<div class="upload_box has_demo">\n				<span class="upload_demo">\n					<strong>示例</strong>\n					<img class="id-pic" alt="参考示例" src="/mpres/htmledition/images/pic/wxverify/identity_front.jpg" id="">				</span>\n				<p class="upload_tips">\n					无居民身份证的内地居民可提交《临时居民身份证》，香港、澳门特别行政区、台湾居民提供当地有效身份证件。<br>\n					格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。				</p>\n				<span class="upload_area"><a href="javascript:;" id="mp_operator_idcard_stuff" class="btn btn_upload js_select_file">{if data.mp_operator_idcard_stuff}重新上传{else}选择文件{/if}</a></span>\n				<div id="mp_operator_idcard_stuff_preview" class="upload_preview">\n				{if data.mp_operator_idcard_stuff}\n				<img src="{$preview data.mp_operator_idcard_stuff data.preview_action}">\n				{/if}\n				</div>\n				<input type=\'hidden\' class=\'file_field\' name=\'mp_operator_idcard_stuff\' value="{data.mp_operator_idcard_stuff}" id=\'mp_operator_idcard_stuff_hidden\' />\n			</div>\n		</div>\n	</div>\n</div>\n\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">运营人员身份证件（反面）</label>\n	<div class="frm_controls">\n		<div class="frm_controls frm_vertical_pt">\n			<div class="upload_box has_demo">\n				<span class="upload_demo">\n					<strong>示例</strong>\n					<img class="id-pic" alt="参考示例" src="/mpres/htmledition/images/pic/wxverify/identity_reverse.jpg" id="">				</span>\n				<p class="upload_tips">\n					无居民身份证的内地居民可提交《临时居民身份证》，香港、澳门特别行政区、台湾居民提供当地有效身份证件。<br>\n					格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。				</p>\n				<span class="upload_area"><a href="javascript:;" id="mp_operator_idcard_back_stuff" class="btn btn_upload js_select_file">{if data.mp_operator_idcard_back_stuff}重新上传{else}选择文件{/if}</a></span>\n				<div id="mp_operator_idcard_back_stuff_preview" class="upload_preview">\n				{if data.mp_operator_idcard_back_stuff}\n				<img src="{$preview data.mp_operator_idcard_back_stuff data.preview_action}">\n				{/if}\n				</div>\n				<input type=\'hidden\' class=\'file_field\' name=\'mp_operator_idcard_back_stuff\' value="{data.mp_operator_idcard_back_stuff}" id=\'mp_operator_idcard_back_stuff_hidden\' />\n			</div>			\n		</div>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="bank_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="account_name" value="{data[3].account_name}" name="account_name" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">需跟组织机构代码证上的机构名称保持一致（基本户、一般户均可）</p>\n	</div>\n</div>\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[1]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="bank_name" value="{data[3].bank_name}" name="bank_name" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[2]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="bank_account" value="{data[3].bank_account}" name="bank_account" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">我们会给该对公帐户汇入一笔非常小的金额和备注信息，需要你后续跟审核人员确认。</p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="legal_person_stuff_file_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">{=data[0]}</label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				格式要求：原件照片、扫描件或复印件加盖企业公章后的扫描件<br/>\n				支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。			\n			</p>\n			<span class="upload_area"><a href="javascript:;" id="legal_person_stuff" class="btn btn_upload js_select_file">{if data[1].legal_person_stuff}重新上传{else}选择文件{/if}</a></span>\n			<div id="legal_person_stuff_preview" class="upload_preview">\n				{if data[1].legal_person_stuff}\n				<img src="{$preview data[1].legal_person_stuff data[1].preview_action}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' name=\'legal_person_stuff\' value="{data[1].legal_person_stuff}" id=\'legal_person_stuff_hidden\' />\n		</div>		\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="organization_code_stuff_file_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">{=data[0]}</label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">\n				组织机构代码证必须在有效期范围内。<br/>			\n				格式要求：原件照片、扫描件或复印件加盖企业公章后的扫描件<br/>\n				支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。			\n			</p>\n			<span class="upload_area"><a href="javascript:;" id="organization_code_stuff" class="btn btn_upload js_select_file">{if data[1].organization_code_stuff}重新上传{else}选择文件{/if}</a></span>\n			<div id="organization_code_stuff_preview" class="upload_preview">\n				{if data[1].organization_code_stuff}\n				<img src="{$preview data[1].organization_code_stuff data[1].preview_action}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' name=\'organization_code_stuff\' value="{data[1].organization_code_stuff}" id=\'organization_code_stuff_hidden\' />\n		</div>	\n	</div>\n</div>\n</script>\n<script type="text/html" id="complement_file_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label file-download-label">{=data[0]}</label>\n	<div class="frm_controls frm_vertical_pt">\n		<div class="upload_box">\n			<p class="upload_tips">支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。</p>\n			<span class="upload_area"><a href="javascript:;" id="{data[1]}" class="btn btn_upload js_select_file">{if data[2]}重新上传{else}选择文件{/if}</a></span>\n			<div id="{data[1]}_preview" class="upload_preview">\n				{if data[3]}\n				<img src="{$preview data[3] \'multimedia\'}">\n				{/if}\n			</div>\n			<input type=\'hidden\' class=\'file_field\' {if data[2]}value="{data[2]}" {/if}name=\'{data[1]}\' id=\'{data[1]}_hidden\' />\n		</div>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="introduction_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">机构简介<br><span class="label_tips">(选填)</span></label>\n	<div class="frm_controls">\n		<span class="frm_textarea_box">\n			<textarea id="introduction" name="introduction" class="frm_msg_content">{data.introduction}</textarea>\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="legal_person_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="legal_person" name="legal_person" value="{data[1].legal_person}" type="text" placeholder="" class="frm_input">\n		</span>		\n		<p class="frm_tips">\n			{if data[1].currentType==1}\n			如果属于分公司则填写工商营业执照上明确的负责人,个体工商户请填写经营者姓名,合伙企业请填写合伙人姓名，个人独资企业请填写投资人姓名，企业法人的非法人分支机构填写负责人姓名，均按照营业执照上填写。			{else if data[1].currentType==7}\n			如果属于分公司则填写工商营业执照上明确的负责人，否则一律是法定代表人。个体工商户请填写工商营业执照上的经营者姓名。			{else if data[1].currentType!=2&&data[1].currentType!=9}\n			如果属于分支机构则填写执照上明确的负责人，否则一律是法定代表人			{/if}\n		</p>\n\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="not_profit_type_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">组织类型</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="not_profit_type" name="not_profit_type" value="{data.not_profit_type}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="parent_organization_tpl">\n<div class="frm_control_group">\n	<label for="" class="frm_label">主管机构名称</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="parent_organization" name="parent_organization" value="{data.parent_organization}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">\n			{if data.currentType==3 || data.currentType==8}\n			对分支机构必须提供其隶属机构名称			{else}\n			上级主管单位名称			{/if}\n		</p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="office_address_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="office_address" name="office_address" value="{data[1].office_address}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">能够收发信件的有效地址，带邮编。示例“广州市天河区华景路1号南方通信大厦，邮编510630”</p>\n	</div>\n</div>\n</script>\n\n<script type="text/html" id="registered_address_tpl"><!--$include-->\n<div class="frm_control_group">\n	<label for="" class="frm_label">{=data[0]}</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="registered_address" name="registered_address" value="{data[1].registered_address}" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips">与组织机构代码证上的注册地址一致。示例“广州市天河区华景路1号南方通信大厦，邮编510630”</p>\n	</div>\n</div>\n</script>\n\n\n<script type="text/html" id="complement_material_tpl">\n<h3>补充材料</h3>\n{$include \'complement_file_tpl\' \'附件一\' \'attachment1\' data.attachment1 data.attachment1}\n{$include \'complement_file_tpl\' \'附件二\' \'attachment2\' data.attachment2 data.attachment2}\n{$include \'complement_file_tpl\' \'附件三\' \'attachment3\' data.attachment3 data.attachment3}\n{$include \'complement_file_tpl\' \'附件四\' \'attachment4\' data.attachment4 data.attachment4}\n{$include \'complement_file_tpl\' \'附件五\' \'attachment5\' data.attachment5 data.attachment5}\n{$include \'complement_file_tpl\' \'附件六\' \'attachment6\' data.attachment6 data.attachment6}\n{$include \'complement_file_tpl\' \'附件七\' \'attachment7\' data.attachment7 data.attachment7}\n{$include \'complement_file_tpl\' \'附件八\' \'attachment8\' data.attachment8 data.attachment8}\n{$include \'complement_file_tpl\' \'附件九\' \'attachment9\' data.attachment9 data.attachment9}\n{$include \'complement_file_tpl\' \'附件十\' \'attachment10\' data.attachment10 data.attachment10}\n</script>\n<script type="text/html" id="soso_map_pos_tpl">\n<div class="frm_control_group" style="display:none">\n	<label for="" class="frm_label">SOSO地图坐标URL</label>\n	<div class="frm_controls">\n		<span class="frm_input_box">\n			<input id="soso_map_pos" value="null" name="soso_map_pos" type="text" placeholder="" class="frm_input">\n		</span>\n		<p class="frm_tips"></p>\n	</div>\n</div>\n</script>\n<script type="text/html" id="upload_file_tpl">\n<div class="frm_control_group inner_content no_cut">\n    <div class="frm_controls frm_vertical_pt">\n        <div class="upload_box">\n            <p class="upload_tips">\n            	{=data[1]}<br/>\n            	请上传原件照片或扫描件，或者复印件加盖企业公章后的扫描件,支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。            </p>\n            <span class="upload_area"><a href="javascript:;" id="{data[0]}" class="btn btn_upload js_select_file">{if data[2]}重新上传{else}选择文件{/if}</a></span>\n            <div id="{data[0]}_preview" class="upload_preview">\n                {if data[2]}\n                <img src="{$preview data[2] \'multimedia\'}">\n                {/if}\n            </div>        \n            <input type=\'hidden\' class=\'file_field\' value="{data[2]}" name=\'{data[0]}\' id=\'{data[0]}_hidden\' />\n            <span class="frm_tips"></span>\n        </div>\n        \n    </div>\n</div>\n</script>\n<script type="text/html" id="tool_bar_tpl">\n{if refill_type!==\'\' && (refill_type===2 || state!==\'\'&&(refill_type===1&&state===5 || refill_type===0&&state===11))}\n	<div class="tool_bar border tc">\n		<input class="btn btn_primary" type="submit" value="提交">\n	</div>\n	{else}\n	<div class="tool_bar border tc">\n		<a href="javascript:;" class="btn btn_default" id="jsPrev">上一步</a>\n		<span class="btn btn_input btn_primary" id="submit_info"><button class="" type="submit" value="下一步">下一步</button></span>\n	</div>\n{/if}\n</script>\n';

});