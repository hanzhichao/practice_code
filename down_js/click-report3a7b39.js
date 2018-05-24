define("statistics/article/analyse/click-report.js",["statistics/common.js"],function(_){
"use strict";
function t(){
setTimeout(function(){
e("#js_timetype_drop a.jsDropdownBt",E.INTERFACE_STAT_TYPE_SELECT),e("#js_filter_tab div.tabs a:eq(0)",E.INTERFACE_STAT_TAB_INT),
e("#js_filter_tab div.tabs a:eq(1)",E.INTERFACE_STAT_TAB_ORI),e("#js_filter_tab div.tabs a:eq(2)",E.INTERFACE_STAT_TAB_SHARE),
e("#js_filter_tab div.tabs a:eq(3)",E.INTERFACE_STAT_TAB_FAV),e("#js_filter_tab div.button_group a.btn_default:eq(0)",E.INTERFACE_STAT_DATE_7),
e("#js_filter_tab div.button_group a.btn_default:eq(1)",E.INTERFACE_STAT_DATE_14),
e("#js_filter_tab div.button_group a.btn_default:eq(2)",E.INTERFACE_STAT_DATE_30),
e("#js_begin_time_container span.date_title",E.INTERFACE_STAT_DATE_RANGE),e("div.setup button.btn_primary",E.INTERFACE_STAT_DATE_COMPARE),
e("#js_filter_source a.btn_default:eq(0)",E.INTERFACE_STAT_SRC_ALL),e("#js_filter_source a.btn_default:eq(1)",E.INTERFACE_STAT_SRC_CONVERSATION),
e("#js_filter_source a.btn_default:eq(2)",E.INTERFACE_STAT_SRC_SHARE),e("#js_filter_source a.btn_default:eq(3)",E.INTERFACE_STAT_SRC_MOMENT),
e("#js_filter_source a.btn_default:eq(4)",E.INTERFACE_STAT_SRC_WEIBO),e("#js_filter_source a.btn_default:eq(5)",E.INTERFACE_STAT_SRC_HISTORY),
e("#js_filter_source a.btn_default:eq(6)",E.INTERFACE_STAT_SRC_OTHER),e("#js_download_detail",E.INTERFACE_STAT_EXCEL);
},2);
}
var T=_("statistics/common.js"),e=(T.delegateClickReport,T.directClickReport),E=T.reportKeys;
return{
init:t,
pager:function(){
setTimeout(function(){
e("#js_pagebar a.page_prev",E.INTERFACE_STAT_TABLE_PREV),e("#js_pagebar a.page_next",E.INTERFACE_STAT_TABLE_NEXT),
e("#js_pagebar a.page_go",E.INTERFACE_STAT_TABLE_JUMP);
});
}
};
});