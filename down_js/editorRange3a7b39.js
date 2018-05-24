define("common/wx/richEditor/editorRange.js",[],function(n,e,t){
"use strict";
var r=function(){
return document.selection?document.selection:(window.getSelection||document.getSelection)();
},o=function(n,e,t){
if(!t&&n===e)return!1;
if(n.compareDocumentPosition){
var r=n.compareDocumentPosition(e);
if(20==r||0==r)return!0;
}else if(n.contains(e))return!0;
return!1;
},i=function(n,e){
var t=e.commonAncestorContainer||e.parentElement&&e.parentElement()||null;
return t?o(n,t,!0):!1;
},c=function(n){
var e=r();
if(!e)return null;
var t=e.getRangeAt?e.rangeCount?e.getRangeAt(0):null:e.createRange();
return t?n?i(n,t)?t:null:t:null;
},u=function(n){
return n.parentElement?n.parentElement():n.commonAncestorContainer;
};
t.exports={
getSelection:r,
getRange:c,
containsRange:i,
parentContainer:u
};
});