define("common/wx/browserVersion.js",[],function(e,o){
"use strict";
var i={};
o.version="Unknown",o.name="Unknown",o.os="default";
var n=navigator.userAgent.toLowerCase();
window.ActiveXObject?i.ie=n.match(/msie ([\d.]+)/)[1]:-1!=n.indexOf("firefox")?i.firefox=n.match(/firefox\/([\d.]+)/)[1]:-1!=n.indexOf("chrome")?i.chrome=n.match(/chrome\/([\d.]+)/)[1]:window.opera?i.opera=n.match(/opera.([\d.]+)/)[1]:window.openDatabase?i.safari=n.match(/version\/([\d.]+)/)[1]:0,
i.ie&&(o.version=i.ie,o.name="IE"),i.firefox&&(o.version=i.firefox,o.name="Firefox"),
i.chrome&&(o.version=i.chrome,o.name="Chrome"),i.opera&&(o.version=i.opera,o.name="Opera"),
i.safari&&(o.version=i.safari,o.name="Safari"),o.os=n.indexOf("windows")>0?"windows":n.indexOf("mac os x")>0?"mac":n.indexOf("linux")>0?"linux":"default";
});