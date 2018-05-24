define("tpl/media/adcpc.html.js",[],function(){
return'<div class="mpda_cpc_choose_context">\n    <div class="frm_control_group">\n        <label for="" class="frm_label">广告位内容</label>\n        <div class="frm_controls frm_vertical_pt">\n            <label class="frm_radio_label">\n                <i class="icon_radio"></i>\n                <span class="lbl_content mini_tips icon_after" id="js_ad_mini_ask">仅限定商品类目 <i class="icon_msg_mini ask"></i> </span>\n                <input type="radio" class="frm_radio js_cpc_type" value="0">\n            </label>\n            {if can_use_single_ad == 1}\n            <label class="frm_radio_label selected">\n                <i class="icon_radio"></i>\n                <span class="lbl_content">精选单个商品</span>\n                <input type="radio" class="frm_radio js_cpc_type" value="1">\n            </label>\n            {/if}\n        </div>\n    </div>\n\n    <div class="js_cpc_cat_container"></div>\n\n    <div class="frm_control_group js_single_ad_container"></div>\n    \n    <p class="empty_tips js_single_loading" style="display:none;">\n        <i class="icon_loading_small white"></i>\n    </p>\n</div>\n';
});