define("tpl/keyword.html.js",[],function(){
return'<ul class="overview_keywords_list js_keywords_list">\n	{each keywords as word}\n	<li>\n	 <em class="keywords_name">{word.name}</em>\n	 <i href="javascript:;" class="icon12_del js_item_delete">X</i>\n	</li>\n	{/each}\n</ul>';
});