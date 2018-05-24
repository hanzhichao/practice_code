define("tpl/cardticket/select_declarerer.html.js",[],function(){
return'<div class="declarerer_table">\n{if loading}\n<div class="choose_tick"><i class="icon_loading_small white"></i></div>\n{else}\n<!-- <div class="sub_title_bar">\n	<span class="frm_input_box search append">\n        <a href="javascript:void(0);" class="js_search frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n        <input type="text" placeholder="输入核销员名字" value="" class="frm_input js_keyword">\n    </span>\n    <a href="javascript:;" class="btn btn_default">添加核销员</a>\n</div> -->\n<div class="table_wrp with_border inside_table">\n    <table class="table" cellspacing="0">\n        <thead class="thead">\n        <tr>\n            <th class="table_cell opr">\n    			<div class="td_panel">\n    				<div class="frm_controls">\n    					<label class="frm_checkbox_label">\n    						<i class="icon_checkbox"></i>\n    						<input type="checkbox" {if params.is_all}checked{/if} class="js_select_all" class="frm_checkbox">全选    					</label>\n    				</div>\n    			</div>\n    		</th>\n            <th class="table_cell declarerer_name">\n                <div class="td_panel">核销员</div>\n            </th>\n            <th class="table_cell declarerer_store">\n                <div class="td_panel">门店</div>\n            </th>\n            <th class="table_cell declarerer_permission no_extra"><div class="td_panel">权限</div></th>\n        </tr>\n        </thead>\n        <tbody class="tbody js_consumer_body">\n        {if data.length}\n        {each data as item}\n        <tr>\n            <td class="table_cell opr"><div class="td_panel">\n                <label class="frm_checkbox_label">\n                    <i class="icon_checkbox"></i>\n                    <input type="checkbox" {$getchecked params item.openid} data-id="{item.openid}" value="{item.openid}" class="frm_checkbox">\n                </label>\n            </div></td>\n            <td class="table_cell"><div class="td_panel">\n                <div class="user_info">\n                    <img style="width:30px;height:30px;" src="{item.head_url}" />\n                    <span class="remark_name">{if item.remark}{item.remark}{else}{item.nickname}{/if}</span>\n                    \n                </div>\n            </div></td>\n            <td class="table_cell"><div class="td_panel">\n                {if item.is_not_appoint_shop}--\n                {else if item.shop_name}{item.shop_name}\n                    {if item.is_shop_delete}\n                        (权限无效，门店已删除)\n                    {else if item.shop_audit_state && item.shop_audit_state!= 3 && item.shop_audit_state!= 2}\n                        (权限无效，门店{convert_store_state item.shop_audit_state})\n                    {/if}\n                {else}门店数据异常。请在“功能-门店管理”检查门店是否已被删除。{/if}\n            </div></td>\n            <td class="table_cell"><div class="td_panel">核销                {if is_paycard() && !item.is_not_appoint_shop && item.shop_name}买单{/if}\n            </div></td>\n        </tr>\n        {/each}\n        {else}\n        <tr class="empty_item">\n            <td colspan="3" class="empty_tips">\n                没有核销员，<a href="{addtoken \'/merchant/carduse?action=listchecker\'}" target="_blank">请前往设置</a>\n            </td>\n        </tr>\n        {/if}\n        </tbody>\n    </table>\n</div> \n<div class="table_oper_btm group">\n    <div class="js_pagebar tr r"></div>\n</div>\n{/if}\n</div>';
});