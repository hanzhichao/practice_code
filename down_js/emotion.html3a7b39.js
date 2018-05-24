define("tpl/mpEditor/plugin/emotion.html.js",[],function(){
return'<ul class="emotions" onselectstart="return false;" onclick="$$._onEmotionClick(event)">\n    {each edata as e index}\n        <li data-name=\'{e.name}\' data-title=\'{e.title}\' class="emotions_item js_emotion_li">\n            <span class="icon_emotion_sprite" style=\'{e.bp}\'></span>\n        </li>\n    {/each}\n</ul>\n';
});