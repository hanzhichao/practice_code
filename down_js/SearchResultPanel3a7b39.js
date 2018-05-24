define("setting/SearchResultPanel.js",[],function(){
"use strict";
function n(n){
this.container=n,this.lastIndex=-1;
}
function t(n,t){
n.css("background-color",t?"#EEEEEE":"#FFFFFF");
}
function e(n){
$(n.container).delegate(r,"click",function(){
{
var t=this.getAttribute("pageIndex");
n.get("result");
}
soso.maps.event.trigger(n,"clickPage",t-1);
}),$(n.container).delegate(p,"click",function(){
var t=this.getAttribute("item"),e=n.get("result");
n.set("index",t-1),soso.maps.event.trigger(n,"clickItem",e.detail.pois[t-1]);
});
}
function i(n){
$(n.container).undelegate(r,"click"),$(n.container).undelegate(p,"click");
}
function a(n,t){
var e=t.detail,i=t.detail.pois,a=$("<ol></ol>").appendTo(n.container);
$.each(i,function(n,e){
var i=$('<li item="'+(n+1)+'"></li>').appendTo(a),o=t.detail.pageIndex*t.detail.pageCapacity+n+1;
i.html(s(e,o));
});
var r=Math.ceil(e.totalNum/e.pageCapacity),p=$('<div class="page"></div>').appendTo(n.container);
p.html(o(r,e.pageIndex+1));
}
function s(n,t){
var e=["<div>",'<div class="adrs_name"><span class="adrs_num">',t," </span>",n.name,"</div>",'<div class="adrs_info">',"<div><span>地址：</span><span>",n.address||"暂无","</span></div>","<div><span>电话：</span><span>",n.phone||"暂无","</span></div>","</div>","</div>"];
return e.join("");
}
function o(n,t){
function e(n,t,e){
var i="pageIndex="+t;
return e?['<span style="border:1px solid #CCCCCC;margin:0 5px;padding:3px 8px;font-size: 12px;cursor:pointer;"'+i+">",n,"</span>"].join(""):['<span class="flip_page" style="border:1px solid #CCCCCC;margin:0 5px;padding:3px 8px;font-size: 12px;cursor:pointer;"'+i+">",n,"</span>"].join("");
}
if(1==n)return"";
t>n&&(t=n);
var i=5;
1!==t&&i--,t!==n&&i--;
var a=1,s=[];
if(n>i)for(s.push(t);s.length<i;)t-a>0&&s.unshift(t-a),n>=t+a&&s.push(t+a),a++;else for(;n>=a;)s.push(a++);
var o=[];
for(1!==t&&o.push(e("上一页",t-1,!1)),a=0;a<s.length;a++)s[a]!=t?o.push(e(s[a],s[a],!0)):o.push('<span class="cur_page" style="margin:0 5px;padding:3px 8px;font-weight: bold;border-bottom: 2px solid #999999;">',s[a],"</span>");
return t!==n&&o.push(e("下一页",t+1,!1)),o.join("");
}
var r="*[pageIndex]",p="li[item]";
return n.prototype=new soso.maps.MVCObject,n.prototype.result_changed=function(){
var n=this.get("result");
this.container.innerHTML="",i(this),n&&(a(this,n),this.updateIndex(),e(this));
},n.prototype.index_changed=n.prototype.updateIndex=function(){
var n=(this.get("result"),this.get("index"));
"undefined"==typeof n&&(n=-1);
var e=this.lastIndex;
e>=0&&t($(this.container).find("ol li:nth-child("+(e+1)+")"),!1),t($(this.container).find("ol li:nth-child("+(n+1)+")"),!0),
this.lastIndex=n;
},n.prototype.destory=function(){
this.set("result",null),this.container=null;
},n;
});