define("statistics/common.js",["common/wx/Cgi.js","biz_common/moment.js"],function(_,E){
"use strict";
function A(_){
var E=""+_+":00";
return 4===E.length&&(E="0"+E),E;
}
function T(_){
return[].slice.call(_,0);
}
function R(_,E){
var A=[];
return _.each(function(_,T){
A.push(E(_,T));
}),A;
}
function e(){
var _=Array.prototype.slice.call(arguments);
return function(){
var E=arguments;
_.each(function(_){
_.apply(_,E);
});
};
}
function i(){
var _=T(arguments);
if(0!==_)return 1===_.length?function(){
var E=_[0];
return E.apply(E,arguments);
}:function(){
var E=i.apply(i,_.slice(1));
return _[0](E.apply(E,arguments));
};
}
var n=_("common/wx/Cgi.js"),o=jQuery,I=_("biz_common/moment.js"),S="YYYY-MM-DD";
E.reportKeys={
LOAD_MSG_DATA_AJAX_KEY:0,
LOAD_KEYWORD_DATA_AJAX_KEY:1,
LOAD_USER_SUMMARY_DATA_AJAX_KEY:2,
MSG_PAGE:3,
MSG_KEYWORD_PAGE:4,
USER_SUMMARY_PAGE:5,
USER_ATTR_PAGE:6,
LOAD_ARTICLE_DATA_AJAX_KEY:7,
ARTICLE_ANALYSE_PAGE:8,
LOAD_ARTICLE_ITEM_AJAX_KEY:9,
LOAD_ARTICLE_DETAIL_AJAX_KEY:10,
ARTICLE_DETAIL_PAGE:11,
LOAD_INTERFACE_AJAX_KEY:12,
INTERFACE_PAGE:13,
LOAD_MENU_STAT_AJAX_KEY:14,
MENU_STAT_PAGE:15,
MSG_TAB_USER_COUNT:20,
MSG_TAB_MSG_COUNT:21,
MSG_TAB_AVERAGE_MSG_COUNT:22,
USER_SUM_TAB_NEW_USER:23,
USER_SUM_TAB_CANCEL_USER:24,
USER_SUM_TAB_NETGAIN_USER:25,
USER_SUM_TAB_CUMULATE_USER:26,
USER_SUM_COMPARE:27,
USER_SUM_SRC_99999999:28,
USER_SUM_SRC_35:29,
USER_SUM_SRC_3:30,
USER_SUM_SRC_43:31,
USER_SUM_SRC_17:32,
USER_SUM_SRC_0:33,
USER_SUM_EXCEL:34,
USER_SUM_NAV_LEFT:35,
USER_SUM_NAV_RIGHT:36,
USER_SUM_NAV_JUMP:37,
USER_ATTR_PROVINCE_NAV_LEFT:38,
USER_ATTR_PROVINCE_NAV_RIGHT:39,
USER_ATTR_PROVINCE_NAV_JUMP:40,
USER_ATTR_CITY_DROPDOWN:41,
USER_ATTR_CITY_NAV_LEFT:42,
USER_ATTR_CITY_NAV_RIGHT:43,
USER_ATTR_CITY_NAV_JUMP:44,
USER_ATTR_DETAIL_GENDERS:45,
USER_ATTR_DETAIL_LANGS:46,
USER_ATTR_DETAIL_PROVINCES:47,
USER_ATTR_DETAIL_CITIES:48,
USER_ATTR_DETAIL_ENDPOINTS:49,
USER_ATTR_DETAIL_TYPES:50,
INTERFACE_TOP_LEFT:51,
INTERFACE_TOP_RIGHT:52,
INTERFACE_GROUP_TAB_ALL:53,
INTERFACE_GROUP_TAB_DETAIL:54,
INTERFACE_GROUP_TAB_COMPARE:55,
INTERFACE_GROUP_ALL_FILTER_DATE:56,
INTERFACE_GROUP_ALL_FILTER_SORT_TYPE:57,
INTERFACE_GROUP_ALL_FILTER_SORT_DIR:58,
INTERFACE_GROUP_ALL_FILTER_SEARCH:59,
INTERFACE_GROUP_ALL_ITEM_LINK_DETAIL:60,
INTERFACE_GROUP_ALL_ITEM_LINK_COMPARE:61,
INTERFACE_GROUP_DETAIL_TAB_INT:62,
INTERFACE_GROUP_DETAIL_TAB_ORI:63,
INTERFACE_GROUP_DETAIL_TAB_SHARE:64,
INTERFACE_GROUP_DETAIL_TAB_FAV:65,
INTERFACE_GROUP_DETAIL_PROVINCE_SORT:66,
INTERFACE_GROUP_DETAIL_PROVINCE_PREV:67,
INTERFACE_GROUP_DETAIL_PROVINCE_NEXT:68,
INTERFACE_GROUP_DETAIL_PROVINCE_JUMP:69,
INTERFACE_GROUP_DETAIL_TABLE_INT_USER:70,
INTERFACE_GROUP_DETAIL_TABLE_INT_COUNT:71,
INTERFACE_GROUP_DETAIL_TABLE_ORI_USER:72,
INTERFACE_GROUP_DETAIL_TABLE_ORI_COUNT:73,
INTERFACE_GROUP_DETAIL_TABLE_SHARE_USER:74,
INTERFACE_GROUP_DETAIL_TABLE_SHARE_COUNT:75,
INTERFACE_GROUP_DETAIL_TABLE_FAV_USER:76,
INTERFACE_STAT_TYPE_SELECT:77,
INTERFACE_STAT_TAB_INT:78,
INTERFACE_STAT_TAB_ORI:79,
INTERFACE_STAT_TAB_SHARE:80,
INTERFACE_STAT_TAB_FAV:81,
INTERFACE_STAT_DATE_7:82,
INTERFACE_STAT_DATE_14:83,
INTERFACE_STAT_DATE_30:84,
INTERFACE_STAT_DATE_RANGE:85,
INTERFACE_STAT_DATE_COMPARE:86,
INTERFACE_STAT_SRC_ALL:87,
INTERFACE_STAT_SRC_CONVERSATION:88,
INTERFACE_STAT_SRC_SHARE:89,
INTERFACE_STAT_SRC_MOMENT:90,
INTERFACE_STAT_SRC_WEIBO:91,
INTERFACE_STAT_SRC_HISTORY:92,
INTERFACE_STAT_SRC_OTHER:93,
INTERFACE_STAT_EXCEL:94,
INTERFACE_STAT_TABLE_PREV:96,
INTERFACE_STAT_TABLE_NEXT:97,
INTERFACE_STAT_TABLE_JUMP:98
},E.logKeys={
MSG_NETWORK_OVERTIME:41,
MSG_JS_OVERTIME:43,
MSG_KEYWORD_NETWORK_OVERTIME:44,
MSG_KEYWORD_JS_OVERTIME:45,
USER_SUMMARY_NETWORK_OVERTIME:46,
USER_SUMMARY_JS_OVERTIME:47,
USER_ATTR_NETWORK_OVERTIME:48,
USER_ATTR_JS_OVERTIME:49,
ARTICLE_ANALYSE_NETWORK_OVERTIME:50,
ARTICLE_ANALYSE_JS_OVERTIME:51,
ARTICLE_DETAIL_NETWORK_OVERTIME:52,
ARTICLE_DETAIL_JS_OVERTIME:53,
INTERFACE_NETWORK_OVERTIME:58,
INTERFACE_JS_OVERTIME:59,
MENU_STAT_NETWORK_OVERTIME:60,
MENU_STAT_JS_OVERTIME:61
},E.ajaxReport=function(_,E,A){
o.ajax({
url:wx.url("/misc/fdevreport?id=%s&key=%s&uin=%s&cost_time=%s".sprintf("10001",_,A,E)),
type:"GET",
success:function(){}
});
};
var t={};
E.time=function(_){
t[_]=+new Date;
},E.timeEnd=function(_){
if(t[_]){
var E=+new Date-t[_];
return E;
}
},E.loopHour=function(_,E,T){
for(var R=_,e=E+1;e>R;R++)T(A(R));
},E.numberToTime=A,E.loopDay=function(_,E,A,T){
if(T)for(var R=E,e=+I(E).format("X"),i=+I(_).format("X");e>=i;)A(R),R=I(R).subtract(1,"days").format(S),
e=+I(R).format("X");else for(var R=_,e=+I(_).format("X"),i=+I(E).format("X");i>=e;)A(R),
R=I(R).add(1,"days").format(S),e=+I(R).format("X");
},E.help=function(_,E){
var A=$(E),T=null,R=[_,E].join(", ");
o(R).mouseover(function(){
A.show(),clearTimeout(T);
}),o(R).mouseout(function(){
clearTimeout(T),T=setTimeout(function(){
A.hide();
},300);
});
},E.clickReport=function(_){
var E=0,A=wx.data.uin;
o.ajax({
url:wx.url("/misc/fdevreport?id=%s&key=%s&uin=%s&cost_time=%s".sprintf("10001",_,A,E)),
type:"GET",
success:function(){}
});
},E.typesMap={
"Apple-iPhone4;1":"iPhone 4S",
"Apple-iPhone4;2":"iPhone 4S(GSM)",
"Apple-iPhone5;1":"iPhone 5",
"Apple-iPhone5;2":"iPhone 5(GSM)",
"Apple-iPhone6;1":"iPhone 5S",
"Apple-iPhone6;2":"iPhone 5S(GSM)",
"Apple-iPhone3;1":"iPhone 4",
"Apple-iPhone3;2":"iPhone 4(GSM)",
"Apple-iPhone7;1":"iPhone 6 Plus",
"Apple-iPhone7;2":"iPhone 6",
"Apple-iPhone8;1":"iPhone 6s",
"Apple-iPhone8;2":"iPhone 6s Plus",
"Apple-iPhone9;2":"iPhone 7 Plus",
"Apple-iPhone9;3":"iPhone 7",
"Apple-iPhone9;1":"iPhone 7",
"Apple-iPhone9;4":"iPhone 7 Plus",
"Apple-iPhone8;4":"iPhone SE",
"Apple-iPhone2;1":"iPhone 3GS",
"Apple-iPhone5;4":"iPhone 5C(GSM/CDMA)",
"Apple-iPhone5;3":"iPhone 5C",
"Apple-iPhone3;3":"iPhone 4(CDMA)",
"Apple-iPad2;5":"iPad Mini(WIFI)",
"Apple-iPad4;4":"iPad Mini 2(WIFI)",
"Apple-iPad4;1":"iPad Air(WIFI)",
"Apple-iPad3;4":"iPad 4(WIFI)",
"Apple-iPad5;3":"iPad Air 2(GSM)",
"Apple-iPad2;1":"iPad 2(WIFI)",
"Apple-iPad3;1":"iPad 3(WIFI)",
"Apple-iPad2;2":"iPad 2(GSM)",
"Apple-iPad2;7":"iPad Mini(GSM+CDMA)",
"Apple-iPad4;7":"iPad Mini 2",
"Apple-iPad2;4":"iPad 2(New WIFI)",
"Apple-iPad3;3":"iPad 3(GSM)",
"Apple-iPad4;2":"iPad Air(GSM+CDMA)",
"Apple-iPad3;6":"iPad 4(GSM+CDMA)",
"Apple-iPod4;1":"iPod Touch 4",
"Apple-iPod5;1":"iPod Touch 5",
0:"未知"
},E.mGet=function(_,E,A){
for(var T=1-_.length,R=[],e=!1,i=0,o=_.length;o>i;i++)!function(i,o){
n.get({
url:wx.url(_[o]),
success:function(_){
if(!e){
if(A&&A(i,o,_),0!==_.base_resp.ret)return void(e=!0);
T++,R[o]=_,1===T&&E&&E.apply(E,R);
}
}
});
}(+new Date,i);
},E.makeUrl=function(_,E){
for(var A in E)E[A]&&(_+="&"+A+"="+encodeURI(E[A]));
return wx.url(_);
},E.transformTailZero=function(_){
return _=""+_,-1===_.indexOf(".")?_:("0"===_[_.length-1]&&(_=_.slice(0,_.length-1)),
"0"===_[_.length-1]&&(_=_.slice(0,_.length-2)),_);
},E.delegateClickReport=function(_,A){
o(document).on("click",_,null,function(){
E.clickReport(A);
});
},E.directClickReport=function(_,A){
o(_).on("click",function(){
E.clickReport(A);
});
},E.htmldecode=function(_){
return o("<div></div>").html(_).text();
};
var P=I().add("d",-1).format(S);
E.days={
yesterday:P,
thirtyDaysAgo:I().add("d",-30).format(S),
thirtyDaysOneAgo:I().add("d",-31).format(S),
beforeYesterday:I(P).add("d",-1).format(S),
aWeekAgo:I(P).add("d",-7).format(S),
sixDaysAgo:I(P).add("d",-6).format(S),
aMonthAgo:I(P).subtract(1,"months").format(S)
},E.sourceMap={
0:"公众号会话",
1:"好友转发",
2:"朋友圈",
4:"历史消息页",
6:"看一看",
7:"搜一搜",
5:"其他",
99999999:"全部"
},E.sort=function(_,E,A){
E.key===A?E.isDesc=!E.isDesc:(E.key=A,E.isDesc=!1),A=E.key,_.sort(function(_,T){
return E.isDesc?T[A]-_[A]:_[A]-T[A];
});
},E.showLoading=function(){
o("div.wrp_loading:eq(0)").show();
},E.hideLoading=function(){
o("div.wrp_loading:eq(0)").hide();
},E.OTHER_COLOR="#B3B3B3",E.RED_COLOR="#D34F4F",E.lengendItemShape={
symbolHeight:12,
symbolWidth:12,
symbolRadius:0
},E.map=R,E.seqRun=e,E.compose=i;
});