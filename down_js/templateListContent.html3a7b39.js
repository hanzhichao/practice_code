define("tpl/media/templateListContent.html.js",[],function(){
return'{if !!msg}\n<p class="weui-desktop-media-tips">{msg}</p>\n{else}\n<div class="weui-desktop-media__list tj">\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==0} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>&nbsp;\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==1} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>\n</div>\n{/if}';
});