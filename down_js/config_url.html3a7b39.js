define("tpl/cardticket/config_url.html.js",[],function(){
return'{each data.config_url as url}<div class="editor_section edit_section_url js_appmsg_url_item" data-idx="{url.idx}">\n    <h3 class="title js_card_title">\n        <p><span class="js_appmsg_url_intro">入口{if url.cur_idx==1}一{else if url.cur_idx==2}二{else if url.cur_idx==3}三{/if}</span>\n        <a class="link js_delete_item" href="javascript:;">删除</a>\n        </p>\n    </h3>\n    <div class="">\n        <div class="frm_control_group  frm_card_extend frm_normal">\n            <label for="" class="frm_label">\n                <strong class="title">入口名称</strong>\n            </label>\n            <span class="frm_input_box">\n                <input type="text" value="{url.name}" target=".js_url_title_{url.idx}" data-maxlength="10" class="frm_input js_maxlength js_custom_url_name">\n            </span> \n            <span class="tips"><span class="js_url_title_{url.idx}">0</span>/5</span>\n        </div>\n        <div class="frm_control_group frm_normal frm_card_extend">\n            <label for="" class="frm_label">\n                <strong class="title">引导语                    <span class="tips">(选填)</span>\n                </strong>\n            </label>\n            <span class="frm_input_box">\n                <input type="text" value="{url.tips}" target=".js_url_desc_{url.idx}" data-maxlength="6" class="frm_input js_maxlength js_custom_url_desc">\n            </span>\n            <span class="tips"><span class="js_url_desc_{url.idx}">0</span>/6</span>\n        </div>\n        <div class="frm_control_group js_jump_url_p frm_card_extend">\n            <label for="" class="frm_label">点击跳转</label>\n            <div class="frm_controls frm_vertical_lh">\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">图文消息</span>\n                    <input type="radio" data-v="1" {if url.url_type==1}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_appmsg">\n                </label>\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">卡券货架</span>\n                    <input type="radio" data-v="2"  {if url.url_type==2}checked{/if} name="js_jump_url_{url.idx}"  class="frm_radio js_jump_card_shelf">\n                </label>\n                {if can_merchant}\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">小店货架</span>\n                    <input type="radio" data-v="3"  {if url.url_type==3}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_shop_shelf">\n                </label>\n                {/if}\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">网页链接</span>\n                    <input type="radio" data-v="4" {if url.url_type==4}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_custom_url">\n                </label>\n            </div>\n        </div>\n        <div class="js_appmsg_edit_item_p">\n        </div>\n    </div>\n</div>\n{/each}\n';
});