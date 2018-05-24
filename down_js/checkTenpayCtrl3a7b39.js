define("common/wx/checkTenpayCtrl.js",["common/wx/tenpayctrl_v2-min.js"],function(t,e){
"use strict";
function a(){
this.editObj=null,this.created=!1,this.downloadPath="",this.create=function(){
this.editObj=new TENPAYCTL.QQEditCtrl,this.downloadPath=this.editObj.getExeDownloadPath();
var t={
parentNode:"testContainerID",
ctrlId:"testCtrlID",
w:1,
h:1,
version:"1206",
showLost:!1,
tabIndex:2,
submitName:"testSubmitName",
unSetupContent:"",
focus_callback:null,
blur_callback:null,
enter_callback:null
};
this.editObj.create(t,this.createHandler,this);
},this.createHandler=function(t){
switch(t){
case 0:
this.created=!0;
break;

default:
this.created=!1;
}
},this.create();
}
t("common/wx/tenpayctrl_v2-min.js");
var n=$("<div></div>").appendTo($("body")).attr("id","testContainerID").css("width","0px").css("height","0px"),i=new a;
e.isInstalled=i.created,e.downloadPath=i.downloadPath,n.remove();
});