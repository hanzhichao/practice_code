define("tpl/cardticket/member_manage/member_detail_bonus.html.js",[],function(){
return'{if user_detail && user_detail.record_page && user_detail.record_page.total > 0}\n{each user_detail.record_page.datas as data}\n<tr class="js_record_item">\n	<td class="table_cell use_time">\n		<div class="td_panel">{card_member_format_time data.time}</div>\n	</td>\n	<td class="table_cell use_msg">\n		<div class="td_panel">\n			{if data.bonus == 0}--\n			{else}\n				{if data.bonus > 0}增加{data.bonus}积分				{else}扣除{data.bonus}积分{/if}\n			{/if}\n	\n		</div>\n	</td>\n</tr>\n{/each}\n{else}\n<tr class="js_record_item empty_item">\n	<td colspan="2" class="empty_tips">暂无数据</td>\n</tr>\n{/if}\n<tr class="js_record_loading empty_item" style="display:none;">\n	<td colspan="2" class="empty_tips">\n		<i class="icon_loading_small white"></i>\n	</td>\n</tr>\n';
});