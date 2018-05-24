define("tpl/multi_ddchild.html.js",[],function(){
return'{each data as o index}\n<li class="dropdown_data_child">\n    <a href="javascript:;" class="jsDropdownChild" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</a>\n</li>\n{/each}';
});