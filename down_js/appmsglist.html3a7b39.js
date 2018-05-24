define("tpl/homepage/appmsglist.html.js",[],function(){
return'<div class="select_list">\n	{if app_msg_list.length > 0}\n    {each app_msg_list as item}\n    {if multi}\n    <label class="select_list_item frm_checkbox_label {if !item.cover||!item.title}disabled {/if} {if item.checkbox}selected {/if}">\n        <span class="lbl_content list_item_date ">{item.update_time} </span>\n        <i class="icon_checkbox"> </i>\n        <span class="list_item_title lbl_content"> \n            {if !item.title}\n                （未命名文章，无法选择）            {else if !item.cover}\n                {if item.title.replace(/<\\/?em>/g, \'\').length>16}\n                    {item.title.replace(/<\\/?em>/g, \'\').substr(0,16)}...&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {else}\n                    {=(item.title.replace(/<\\/?em>/g, \'\'))}&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {/if}\n            {else}\n                {(item.title.replace(/<\\/?em>/g, \'\'))}\n            {/if}            \n        </span>\n        <input type="checkbox" name="appmsgid" class="frm_checkbox js_appmsgid" value="{item.aid}" {if !item.cover||!item.title}disabled {/if}  {if item.checkbox}checked="checked" {/if}>\n    </label>\n    {else}\n    <label class="select_list_item frm_radio_label {if !item.cover||!item.title}disabled {/if} {if item.checkbox}selected {/if}">\n        <span class="lbl_content list_item_date ">{item.update_time} </span>\n        <i class="icon_radio"></i>\n        <span class="lbl_content list_item_title ">\n             {if !item.title}\n                （未命名文章，无法选择）            {else if !item.cover}\n                {if item.title.replace(/<\\/?em>/g, \'\').length>16}\n                    {item.title.replace(/<\\/?em>/g, \'\').substr(0,16)}...&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {else}\n                    {=(item.title.replace(/<\\/?em>/g, \'\'))}&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {/if}\n            {else}\n                {(item.title.replace(/<\\/?em>/g, \'\'))}\n            {/if}\n        </span>\n        <input type="radio" name="appmsgid" value="{item.aid}" class="frm_radio js_appmsgid" {if !item.cover||!item.title}disabled {/if} {if item.checkbox}checked {/if}>\n	</label>\n    {/if}\n    {/each}\n    {else}\n    <p class="no_appmsg">暂无图文消息</p>\n    {/if}\n</div>\n\n';
});