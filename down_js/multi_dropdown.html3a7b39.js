define("tpl/multi_dropdown.html.js",[],function(){
return'<a href="javascript:;" class="btn dropdown_switch jsDropdownBt"><label class="jsBtLabel">{label}</label><i class="arrow"></i></a>\n<ul class="dropdown_data_list jsDropdownList">\n    {if renderHtml}\n    {renderHtml}\n    {else}\n        {each data as o index}\n        <li class="dropdown_data_item">\n            <span href="javascript:;" class="jsDropdownItem" data-level="1" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</span>\n            <ul></ul>\n        </li>\n        {/each}        \n    {/if}\n</ul>\n';
});