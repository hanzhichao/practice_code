define("tpl/media/card_ticket.html.js",[],function(){
return'<div class="appmsgSendedItem card_ticket">\n    <a class="title_wrp" href="/merchant/electroniccardmgr?action=detail&t=cardticket/detail&cardid={id}&lang=zh_CN&token={token}" target="_blank">\n        <span class="icon"></span>\n        <span class="title">[卡券]{title}</span>\n    </a>\n    <p class="desc">{brand_name}</p>\n</div>\n';
});