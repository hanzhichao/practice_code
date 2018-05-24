define("tpl/cardticket/member_manage/member_tag_pop.html.js",[],function(){
return'{each tags_list as item}\n<label class="frm_checkbox_label" data-id="{item.id}" >\n    <i class="icon_checkbox"></i>\n    <span class="lbl_content">{item.name}</span>\n    <input type="checkbox" class="frm_checkbox">\n</label>\n{/each}\n';
});