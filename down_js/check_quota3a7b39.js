define("cardticket/add/check_quota.js",["common/wx/dialog.js"],function(c){
"use strict";
var o=c("common/wx/dialog.js"),n=function(c){
return 0==c.max_card?(o.show({
msg:"账号违规，暂停制券"
}),!1):!0;
};
return n;
});