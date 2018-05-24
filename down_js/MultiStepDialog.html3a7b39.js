define("original/tpl/MultiStepDialog.html.js",[],function(){
return'<div class="whitelist_dialog">\n    <div class="processor_wrp js_process"></div>\n    {each steps as item idx}\n    {if idx==0}\n    <div class="processor_panel step{idx} js_step{idx}"></div>\n    {else}\n    <div class="processor_panel step{idx} js_step{idx}" style="display:none;"></div>\n    {/if}\n    {/each}\n</div>\n';
});