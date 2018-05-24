define("tpl/step.html.js",[],function(){
return'<ul class="weui-desktop-steps">\n    {each stepArr as item index}\n    <li class="weui-desktop-step {item.cls}">\n        {item.name}\n    </li>\n    {/each}\n</ul>\n';
});