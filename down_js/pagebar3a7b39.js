define("common/wx/pagebar.js",["widget/pagination.css","tpl/pagebar.html.js","common/qq/Class.js","common/wx/Tips.js"],function(t,e){
"use strict";
var i,n,s,a=(t("widget/pagination.css"),t("tpl/pagebar.html.js")),r=t("common/qq/Class.js"),h=t("common/wx/Tips.js");
s=template.compile(a),i=e,n={
first:"首页",
last:"末页",
prev:"上页",
next:"下页",
startPage:1,
initShowPage:1,
perPage:10,
startRange:1,
midRange:3,
endRange:1,
totalItemsNum:0,
container:"",
callback:null,
isNavHide:!1,
isSimple:!0
};
var o=function(t,e,i){
var n;
return n=t+(e-1),n=n>i?i:n;
},g=function(t,e,i){
var n;
return n=i%2===0?e-(i/2-1):e-(i-1)/2,n=t>n?t:n;
},u=function(t,e,i){
var n;
return n=e%2===0?parseInt(t)+e/2:parseInt(t)+(e-1)/2,n=n>i?i:n;
},c=function(t,e,i){
var n;
return n=e-(i-1),n=t>n?t:n;
},l=function(t,e){
if(e[t]&&isNaN(e[t]))throw new Error("Invalid arguments: "+t+" should be a number");
},p=function(t){
if(l("perPage",t),l("totalItemsNum",t),l("startPage",t),l("startRange",t),l("midRange",t),
l("endRange",t),l("initShowPage",t),void 0!==t.callback&&null!==t.callback&&!$.isFunction(t.callback))throw new Error("Invalid arguments: callback should be a function");
},d=function(t,e,i){
var n=t.container.find(".page_"+i);
if("string"==typeof e){
var s=$(e);
0!==s.length&&(n=s);
}else{
if(e!==!1)throw new Error("Invalid Paramter: '"+i+"' should be a string or false");
n.hide();
}
return n;
},P=r.declare({
init:function(t){
if(t.totalItemsNum){
var e;
if(p(t),e=$.extend(!0,{},n,t),this._init(e),e.initShowPage<e.startPage)throw new Error("Invalid arguments: initShowPage should be larger than startPage");
if(e.initShowPage>e.endPage)throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
this.paginate();
}
},
_init:function(t){
this.currentPage=t.initShowPage,this._isNextButtonShow=!0,this._isPrevButtonShow=!0,
this.uid="wxPagebar_"+ +new Date,this.initEventCenter(),this.optionsForTemplate={},
$.extend(this,t),this.container=$(t.container),this.optionsForTemplate.isSimple=t.isSimple,
this.optionsForTemplate.firstButtonText=0===$(t.first).length?t.first:n.first,this.optionsForTemplate.lastButtonText=0===$(t.last).length?t.last:n.last,
this.optionsForTemplate.nextButtonText=0===$(t.next).length?t.next:n.next,this.optionsForTemplate.prevButtonText=0===$(t.prev).length?t.prev:n.prev,
this.optionsForTemplate.isNavHide=t.isNavHide,this.generatePages(parseInt(this.totalItemsNum)),
this.gapForStartRange=this.container.find(".gap_prev"),this.gapForEndRange=this.container.find(".gap_next"),
this.firstButton=d(this,t.first,"first"),this.lastButton=d(this,t.last,"last"),this.prevButton=d(this,t.prev,"prev"),
this.nextButton=d(this,t.next,"next"),this.bindEvent();
},
initEventCenter:function(){
this.eventCenter={
eventList:[],
bind:function(t,e){
this.eventList[t]||(this.eventList[t]=[]),this.eventList[t].push(e);
},
trigger:function(t){
var e,i;
this.eventList[t]||(this.eventList[t]=[]),e=this.eventList[t];
for(var n=0;n<e.length;n++)if(i=Array.prototype.slice.call(arguments,1),e[n].apply(this,i)===!1)return!1;
},
unbind:function(t,e){
if(!this.eventList)throw new Error("The eventList was undefined");
if(!this.eventList[t])throw new Error("The event type "+t+" was not found");
if(void 0===e)this.eventList[t]=[];else for(var i=this.eventList[t],n=i.length,s=0;n>s;s++)if(i[s]===e){
i.splice(s,1);
break;
}
}
};
},
generatePages:function(t){
var e,i,n,a,r,h;
for(this.pageNum=Math.ceil(t/this.perPage),this.endPage=this.startPage+this.pageNum-1,
this.gapForStartRange=null,this.gapForEndRange=null,this.optionsForTemplate.startRange=[],
this.optionsForTemplate.midRange=[],this.optionsForTemplate.endRange=[],i=o(this.startPage,this.startRange,this.endPage),
n=g(this.startPage,this.currentPage,this.midRange),a=u(this.currentPage,this.midRange,this.endPage),
r=c(this.startPage,this.endPage,this.endRange),i>=r&&(r=i+1),e=this.startPage;i>=e;e+=1)this.optionsForTemplate.startRange.push(e);
for(var l=0,e=n;l<this.midRange;l+=1,e+=1)this.optionsForTemplate.midRange.push(e);
for(e=r;e<=this.endPage;e+=1)this.optionsForTemplate.endRange.push(e);
this.optionsForTemplate.endPage=this.endPage,this.optionsForTemplate.initShowPage=this.initShowPage,
h=s(this.optionsForTemplate),this.container.html(h),1==this.pageNum?this.container.hide():this.container.show(),
this.pages=this.container.find(".page_nav"),this.midPages=this.container.find(".js_mid"),
this.labels=this.container.find(".page_num label"),this.container.find(".pagination").attr("id",this.uid);
},
paginate:function(){
var t,e,i,n,s,a,r,h,l,p;
if(this.isSimple===!0)for(var d=0,P=this.labels.length;P>d;d++)d%2===0&&$(this.labels[d]).html(this.currentPage);else{
e=o(this.startPage,this.startRange,this.endPage),a=g(this.startPage,this.currentPage,this.midRange),
r=u(this.currentPage,this.midRange,this.endPage),h=c(this.startPage,this.endPage,this.endRange),
e>=h&&(h=e+1),e>=a&&(a=e+1),r>=h&&(r=h-1),this.pages.show(),this.pages.removeClass("current"),
p=parseInt(this.midPages.length/this.midRange);
for(var d=0,P=p;P>d;d++){
for(s=0,t=a;r>=t;t+=1)n=this.midRange*d+(t-a),l=$(this.midPages[n]),l.html(t),s+=1,
t==this.currentPage&&l.addClass("current");
for(n=this.midRange*d+s;s<this.midRange;s+=1)l=$(this.midPages[n]),l.hide(),l.removeClass("current"),
n+=1;
}
for(var d=0,P=this.pages.length;P>=d;d++)i=$(this.pages[d]),t=parseInt(i.html()),
t===parseInt(this.currentPage)&&i.addClass("current");
if(a>e+1?this.gapForStartRange.show():this.gapForStartRange.hide(),h>r+1?this.gapForEndRange.show():this.gapForEndRange.hide(),
this.isNavHide){
for(var d=this.startPage;d<=this.endPage;d+=1)this.pages.hide();
this.gapForStartRange.hide(),this.gapForEndRange.hide();
}
}
this.checkButtonShown();
},
destroy:function(){
this.container.off("click","#"+this.uid+" a.page_nav"),this.container.off("click","#"+this.uid+" a.page_go"),
this.container.off("keydown","#"+this.uid+" .goto_area input"),this.nextButton.off("click"),
this.prevButton.off("click"),this.firstButton.off("click"),this.lastButton.off("click");
},
bindEvent:function(){
this.container.on("click","#"+this.uid+" a.page_nav",this.proxy(function(t){
var e=$(t.target);
return e.hasClass("current")?!1:(this.clickPage(parseInt(e.html())),!1);
},this)),this.nextButton.on("click",this.proxy(function(t){
$(t.target);
return this.nextPage(),!1;
},this)),this.prevButton.on("click",this.proxy(function(t){
$(t.target);
return this.prevPage(),!1;
},this)),this.firstButton.on("click",this.proxy(function(t){
$(t.target);
return this.goFirstPage(),!1;
},this)),this.lastButton.on("click",this.proxy(function(t){
$(t.target);
return this.goLastPage(),!1;
},this)),this.container.on("click","#"+this.uid+" a.page_go",this.proxy(function(t){
var e=$(t.target).prev();
return this.goPage(e.val()),!1;
},this)),this.container.on("keydown","#"+this.uid+" .goto_area input",this.proxy(function(t){
return wx.isHotkey(t,"enter")?(this.container.find("a.page_go").click(),!1):void 0;
},this));
},
on:function(t,e){
this.eventCenter.bind(t,this.proxy(e,this));
},
callbackFunc:function(t){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return $.isFunction(this.callback)&&this.callback(e)===!1?!1:this.eventCenter.trigger(t,e)===!1?!1:void this.paginate();
},
proxy:function(t,e){
return function(){
var i=Array.prototype.slice.call(arguments,0);
return t.apply(e,i);
};
},
nextPage:function(){
this.currentPage!==this.endPage&&(this.currentPage++,this.callbackFunc("next")===!1&&this.currentPage--);
},
prevPage:function(){
this.currentPage!==this.startPage&&(this.currentPage--,this.callbackFunc("prev")===!1&&this.currentPage++);
},
goFirstPage:function(){
var t=this.currentPage;
this.currentPage=this.startPage,this.callbackFunc("goFirst")===!1&&(this.currentPage=t);
},
goLastPage:function(){
var t=this.currentPage;
this.currentPage=this.endPage,this.callbackFunc("goLast")===!1&&(this.currentPage=t);
},
checkButtonShown:function(){
+this.currentPage===+this.startPage?this.hidePrevButton():this.showPrevButton(),
+this.currentPage===+this.endPage?this.hideNextButton():this.showNextButton();
},
goPage:function(t){
var e=this.currentPage,t=Math.round(t);
return t===this.currentPage?!1:isNaN(t)?(h.err("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(h.err("请输入正确的页码"),
!1):t>this.endPage?(h.err("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc("go")===!1&&(this.currentPage=e)));
},
clickPage:function(t){
var e=this.currentPage;
isNaN(t)&&(t=this.startPage),this.currentPage=t<this.startPage?this.startPage:t>this.endPage?this.endPage:t,
this.callbackFunc("click")===!1&&(this.currentPage=e);
},
showNextButton:function(){
this.nextButton&&this._isNextButtonShow===!1&&(this.nextButton.show(),this._isNextButtonShow=!0);
},
showPrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!1&&(this.prevButton.show(),this._isPrevButtonShow=!0);
},
hideNextButton:function(){
this.nextButton&&this._isNextButtonShow===!0&&(this.nextButton.hide(),this._isNextButtonShow=!1);
},
hidePrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!0&&(this.prevButton.hide(),this._isPrevButtonShow=!1);
}
});
return e=P;
});