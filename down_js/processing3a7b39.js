define("biztransfer/processing.js",["biz_common/moment.js","biztransfer/common.js"],function(e){
"use strict";
for(var i in order_detail)invoice[i]=order_detail[i];
e("biz_common/moment.js");
e("biztransfer/common.js"),$("#js_invoice").html(template.render("js_invoice_tpl",{
invoice:invoice
}));
});