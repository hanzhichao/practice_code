define("operation/showWord.js",[],function(e,n){
"use strict";
n.showAnimation=function(){
var e=document.getElementById("js_word"),n=document.getElementById("js_folder"),t=document.getElementById("js_readMore"),o=t.childNodes[0].nodeValue,i=document.getElementById("js_word").clientHeight,d=function(){
n.style.maxHeight=i+"px",t.childNodes[0].nodeValue="收起",this.onclick=function(){
n.style.maxHeight="4.2em",t.childNodes[0].nodeValue=o,this.onclick=d;
};
},l=function c(){
return i=e.clientHeight,i<=n.clientHeight?(t.style.display="none",n.style.maxHeight="4.2em",
t.childNodes[0].nodeValue=o):(t.style.display="inline",document.getElementById("js_readMore").onclick=d),
c;
}();
window.onresize=l;
};
});