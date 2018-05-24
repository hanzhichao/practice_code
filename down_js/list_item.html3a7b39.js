define("tpl/multiSelector/list_item.html.js",[],function(){
return'{each data as item i}\n<dd {if i==0}class="first_dd_list"{/if}>\n	<a href="javascript:;" class="jsLevel father_menu {if item.desc}has_desc{/if} {if (!item.sub || item.sub.length <= 0)}no_child{/if} jsLevel1" data-id="{item.id}" data-name="{item.name}" data-desc="{item.desc}" data-expand="0"> \n		{if (!!item.sub && item.sub.length > 0)}<i class="jsToggle sub_icon show_sub_icon">+</i>{/if}\n		<span class="item_name">{item.name}</span>\n		{if item.desc}\n			<span class="item_desc">{item.desc}</span>\n		{/if}\n	</a>\n	<ul class="sub_scope_list" style="display:none">\n	{each item.sub as subitem}\n		<li >\n			<a data-id="{subitem.id}" data-name="{subitem.name}" href="javascript:;" class="jsLevel jsLevel2">{subitem.name}</a>\n		</li>\n	{/each}\n	</ul>\n</dd>\n{/each}\n';
});