define("statistics/interface/vars.js",["biz_common/moment.js"],function(t,a){
"use strict";
var d=t("biz_common/moment.js"),e="YYYY-MM-DD",o=a.yesterday=d().add("d",-1).format(e);
a.thirtyDaysAgo=d().add("d",-30).format(e),a.thirtyDaysOneAgo=d().add("d",-31).format(e),
a.beforeYesterday=d(o).add("d",-1).format(e),a.aWeekAgo=d(o).add("d",-7).format(e);
});