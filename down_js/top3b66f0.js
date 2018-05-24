define("statistics/article/top.js",["common/wx/top.js","biz_common/moment.js"],function(a){
"use strict";
var i=a("common/wx/top.js"),s=a("biz_common/moment.js"),t=(s().add("d",-1).format("YYYY-MM-DD"),
[{
id:"article_detail",
name:"单篇图文",
url:"/misc/appmsganalysis?action=all"
},{
id:"article_analyse",
name:"全部图文",
url:"/misc/appmsganalysis?action=report"
}]);
return 1==window.cgiData.can_show_video_article_page&&t.push({
id:"video_article",
name:"视频分享页",
url:"/misc/appmsganalysis?action=video_article"
}),new i("#js_topTab",t);
});