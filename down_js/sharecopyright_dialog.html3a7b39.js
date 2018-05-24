define("tpl/media/sharecopyright_dialog.html.js",[],function(){
return'<div class="share_appmsg_dialog">\n    <div class="frm_control_group share_appmsg_search_form">\n        <label for="" class="frm_label">\n            查找文章        </label>\n        <div class="frm_controls">\n            <div class="search_wrapper">\n                <span class="frm_input_box search with_del append ">\n                    <a class="del_btn js_search_del" href="javascript:" style="display: none;">\n                        <i class="icon_search_del"></i>&nbsp;\n                    </a>\n                    <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n                        <i class="icon16_common search_gray">\n                            搜索                        </i>\n                        &nbsp;\n                    </a>\n                    <input type="text" class="js_search_input frm_input" placeholder="输入原创文章链接/标题/关键字，按回车查找">\n                </span>\n            </div>\n            <p class="frm_tips mini_tips icon_after">只能分享成功声明原创的文章链接<span class="js_tooltips" data-tips=\'原创特指自己写的、独立完成创作的作品。公众平台鼓励用户发表原创文章，平台会对原创声明的文章在群发后进行审核，审核通过后文章会被标识为原创文章。\'><i class="icon_msg_mini ask"></i></span></p>\n            <p class="js_tips_main frm_msg fail">\n                <span class="js_search_tips frm_msg_content"></span>\n            </p>\n        </div>\n    </div>\n\n    <div class="share_article_area">\n        <div style="display:none;" class="share_article_loading js_loading">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n        <div class="js_article_content share_article_list"></div>\n    </div>\n    <div class="pagination_wrp js_pagebar"></div>\n</div>\n';
});