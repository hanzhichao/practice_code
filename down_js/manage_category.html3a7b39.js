define("config/manage_category.html.js",[],function(){
return'<!-- 添加服务范围 -->\n<div class="setting_dialog_content add_category" id="">\n    <div class="add_category_content">\n        <div class="frm_control_group add_category_opr js_add" {if type=="modify"||limit<=1}style="display:none;"{/if}>\n            <a class="add_catagory_btn js_add_btn">添加服务类目</a>\n            <p class="frm_msg fail" for="add_catagory_btn" style="display: none;"><span class="js_err_tip frm_msg_content" style="display: inline;">请添加服务类目</span></p>\n        </div>\n    </div>\n</div>\n';
});