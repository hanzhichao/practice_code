define("tpl/accordion.html.js",[],function(){
return'<div class="accordion {className}">\n	{each data as value index}\n		<h3 class="header {value.className}" idx="{index}">{value.title}</h3>\n		<div class="content" idx="{index}">\n			{value.content}\n		</div>\n	{/each}\n</div>';
});