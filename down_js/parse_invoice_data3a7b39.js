define("cardticket/parse_invoice_data.js",[],function(){
"use strict";
return function(e){
if(!e)return{};
var i={};
if(e.recipient_info){
i=1==e.receipt_type?e.vat_invoice_info:1==e.commodity_type?e.personal_comm_invoice_info:e.enterprise_comm_invoice_info,
i.action="update_invoice_tmpl_info";
for(var n in e.recipient_info)i["recipient_"+n]=e.recipient_info[n];
!e.enterprise_comm_invoice_info&&!e.vat_invoice_info||e.licence||(i.licence=e.enterprise_comm_invoice_info?e.enterprise_comm_invoice_info.licence:e.vat_invoice_info.licence,
i.enterprise_name=e.enterprise_comm_invoice_info?e.enterprise_comm_invoice_info.enterprise_name:e.vat_invoice_info.enterprise_name);
}else e.vat_invoice_info&&(i.enterprise_name=e.vat_invoice_info.enterprise_name,
i.licence=e.vat_invoice_info.licence),i.action="submit_invoice_tmpl_info";
return i.status=e.status,i.verify_comments=e.verify_comments,i.receipt_type=e.receipt_type,
i.commodity_type=e.commodity_type,i;
};
});