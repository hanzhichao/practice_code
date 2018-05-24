define("tpl/cardticket/card_recharge.html.js",[],function(){
return'<div>\n<div class="wrp_processor js_step">\n</div> \n<div class="first_step js_step_content invoice_recharge js_step1">\n	<strong>请选择所需充值的券点数量</strong>\n	<p class="tips">每1元可充值1券点。<br>\n	充值时，如若遇到支付后，未及时到账情况，请耐心等待。系统会自动核查，在当天充值到账，请及时关注余额变化和充值订单的状态。	<br>\n	须知:券点是腾讯为了向朋友的券功能商户收取互联网增值服务使用费，而提供的一种通用的收费渠道或计费方式，不是任何代币票券，不能用于本功能以外，且不提供退款。</p>\n	<div class="section_tab">\n		<ul class="tab_navs">\n			<li class="tab_nav selected js_typeSelect" val="100">\n				<a href="javascript:void(0);">\n					100\n				</a>\n			</li>\n			<li class="tab_nav js_typeSelect" val="200">\n				<a href="javascript:void(0);">\n					200\n				</a>\n			</li>\n			<li class="tab_nav js_typeSelect" val="500">\n				<a href="javascript:void(0);">\n					500\n				</a>\n			</li>\n			<li class="tab_nav js_typeSelect" val="1000">\n				<a href="javascript:void(0);">\n					1000\n				</a>\n			</li>\n			<li class="tab_nav no_extra js_typeSelect" val="0">\n				<a href="javascript:void(0);">\n					其它数量				</a>\n			</li>\n		</ul>\n	</div>\n	<div class="popover pos_center js_other_moneycontainer" style="position: relative;">\n		<div class="popover_inner">\n			<div class="popover_content">\n				<div class="frm_control_group ">\n					<label for="" class="frm_label">\n						<strong class="title">充值数量</strong>\n					</label>\n					<span class="frm_input_box tips_inline append">\n	                    <span class="frm_input_append" style="width:4em;right:-4.5em;">券点</span>\n	                    <input type="text" placeholder="请输入充值数量" data-maxlength="10" value="" class="frm_input js_maxlength valid js_other_money">\n	                </span>\n					<p class="frm_msg fail js_error" style=""><span class="frm_msg_content">请输入100-100000之间的整数</span></p>\n				</div>\n			</div>\n		</div>\n		<i class="popover_arrow popover_arrow_out">\n		</i>\n		<i class="popover_arrow popover_arrow_in">\n		</i>\n	</div>\n</div>\n<div class="second_step js_step_content invoice_recharge js_step2">\n	<div class="widget_qr_box">\n		<!-- 支付QR码 -->\n		<div class="qr_img"><img class="js_img" src="" alt=""></div>\n		<div class="qr_info">\n			<strong class="qr_title">付款金额：<span class="js_paymoney"></span>元</strong>\n			<p>请使用微信扫描二维码进行付款</p>\n		</div>\n		<p class="qr_tips">注意：券点一经充值，不可退款，请仔细确认。</p>\n	</div>\n</div>\n\n</div>\n';
});