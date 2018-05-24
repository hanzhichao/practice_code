define("biz_web/lib/uploadify.js",["biz_web/lib/swfobject.js"],function(e){
var t=e("biz_web/lib/swfobject.js");
$.extend($.fn,{
uploadify:function(e){
$(this).each(function(){
var i=$(this),a=i.attr("id"),o=location.pathname,n=$.extend({
id:a,
uploader:"uploadify.swf",
script:"uploadify.php",
expressInstall:null,
folder:"",
height:null,
width:null,
cancelImg:"cancel.png",
wmode:"opaque",
scriptAccess:"always",
fileDataName:"Filedata",
method:"POST",
queueSizeLimit:5,
simUploadLimit:1,
queueID:!1,
displayData:"percentage",
buttonImg:null,
buttonText:"",
rollover:!1,
hideButton:!0,
onInit:function(){},
onSelect:function(){},
onQueueFull:function(){},
onCheck:function(){},
onCancel:function(){},
onError:function(){},
onProgress:function(){},
onComplete:function(){},
onAllComplete:function(){}
},e);
o=o.split("/"),o.pop(),o=o.join("/")+"/";
var l={};
if(l.uploadifyID=n.id,l.pagepath=o,n.buttonImg&&(l.buttonImg=escape(n.buttonImg)),
n.buttonText&&(l.buttonText=escape(n.buttonText)),n.rollover&&(l.rollover=!0),l.script=encodeURIComponent(n.script),
l.folder=escape(n.folder),n.scriptData){
var u="";
for(var c in n.scriptData)u+="&"+c+"="+n.scriptData[c];
l.scriptData=escape(u.substr(1));
}
if(l.width=n.width||i.outerWidth(),l.height=n.height||i.outerHeight(),l.wmode=n.wmode,
l.method=n.method,l.queueSizeLimit=n.queueSizeLimit,l.simUploadLimit=n.simUploadLimit,
n.hideButton&&(l.hideButton=!0),n.fileDesc&&(l.fileDesc=n.fileDesc),n.fileExt&&(l.fileExt=n.fileExt),
n.multi&&(l.multi=!0),n.auto&&(l.auto=!0),n.sizeLimit&&(l.sizeLimit=n.sizeLimit),
n.checkScript&&(l.checkScript=n.checkScript),n.fileDataName&&(l.fileDataName=n.fileDataName),
n.queueID&&(l.queueID=n.queueID),n.onInit()!==!1){
{
i.offset();
}
i.parent().append($('<div id="'+a+'Uploader"></div>')).parent().addClass("upload_box"),
t.switchOffAutoHideShow(),t.registerObject("flashAntelope","9.0.0"),t.embedSWF(n.uploader,n.id+"Uploader","100%","100%","9.0.24",n.expressInstall,l,{
quality:"high",
wmode:n.wmode,
allowScriptAccess:n.scriptAccess
},void 0,function(){
$("#"+n.id+"Uploader").css("zoom",1).css("zoom",0);
}),0==n.queueID&&$("#"+a+"Uploader").after('<div id="'+a+'Queue" class="uploadifyQueue"></div>');
}
"function"==typeof n.onOpen&&i.bind("uploadifyOpen",n.onOpen),i.bind("uploadifySelect",{
action:n.onSelect,
queueID:n.queueID
},function(e,t,a){
e.data.action(e,t,a)!==!1||document.getElementById(i.attr("id")+"Uploader").cancelFileUpload(t,!0,!1);
}),"function"==typeof n.onSelectOnce&&i.bind("uploadifySelectOnce",n.onSelectOnce),
i.bind("uploadifyQueueFull",{
action:n.onQueueFull
},function(e,t){
e.data.action(e,t)!==!1&&alert("The queue is full.  The max size is "+t+".");
}),i.bind("uploadifyCancel",{
action:n.onCancel
},function(e,t,i,o,n){
if(e.data.action(e,t,i,o,n)!==!1){
var l=1==n?0:250;
$("#"+a+t).fadeOut(l,function(){
$(this).remove();
});
}
}),"function"==typeof n.onClearQueue&&i.bind("uploadifyClearQueue",n.onClearQueue);
var d=[];
i.bind("uploadifyError",{
action:n.onError
},function(e,t,i,o){
if(e.data.action(e,t,i,o)!==!1){
var n=new Array(t,i,o);
d.push(n),$("#"+a+t+" .percentage").text(" - "+o.type+" Error"),$("#"+a+t).addClass("uploadifyError");
}
}),i.bind("uploadifyProgress",{
action:n.onProgress,
toDisplay:n.displayData
},function(e,t,i,o){
e.data.action(e,t,i,o)!==!1&&($("#"+a+t+"ProgressBar").css("width",o.percentage+"%"),
"percentage"==e.data.toDisplay&&(displayData=" - "+o.percentage+"%"),"speed"==e.data.toDisplay&&(displayData=" - "+o.speed+"KB/s"),
null==e.data.toDisplay&&(displayData=" "),$("#"+a+t+" .percentage").text(displayData));
}),i.bind("uploadifyComplete",{
action:n.onComplete
},function(e,t,i,a,o){
e.data.action(e,t,i,unescape(a),o)!==!1;
}),"function"==typeof n.onAllComplete&&i.bind("uploadifyAllComplete",{
action:n.onAllComplete
},function(e,t){
e.data.action(e,t)!==!1&&(d=[]);
});
});
},
uploadifySettings:function(e,t,i){
var a=!1;
if(this$.each(function(){
if("scriptData"==e&&null!=t){
if(i)var o=t;else var o=$.extend(settings.scriptData,t);
var n="";
for(var l in o)n+="&"+l+"="+escape(o[l]);
t=n.substr(1);
}
a=document.getElementById(id+"Uploader").updateSettings(e,t);
}),null==t){
if("scriptData"==e){
for(var o=unescape(a).split("&"),n=new Object,l=0;l<o.length;l++){
var u=o[l].split("=");
n[u[0]]=u[1];
}
a=n;
}
return a;
}
},
uploadifyUpload:function(e){
$(this).each(function(){
document.getElementById($(this).attr("id")+"Uploader").startFileUpload(e,!1);
});
},
uploadifyCancel:function(e){
$(this).each(function(){
document.getElementById($(this).attr("id")+"Uploader").cancelFileUpload(e,!0,!1);
});
},
uploadifyClearQueue:function(){
$(this).each(function(){
document.getElementById($(this).attr("id")+"Uploader").clearFileUploadQueue(!1);
});
}
});
});