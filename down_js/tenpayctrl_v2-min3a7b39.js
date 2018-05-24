function onQQCertLoadFinish(){
if("0"==TENPAYCTL.CheckIsSupport())for(var t=0;t<g_qqCertLoadFunction.length;++t)if(g_qqCertLoadFunction[t]){
var e=g_qqCertLoadFunction[t];
g_qqCertLoadFunction[t]=null,e();
}
}
var g_qqCertLoadFunction=[],TENPAYCTL={
DOMAIN:"tenpay.com"
};
TENPAYCTL.MinCodeBaseVersion="1.2.0.6",TENPAYCTL.OSControlVersion={
"windows nt":{
Min:"1206",
Max:"2025"
},
"mac os x":{
Min:"2001",
Max:"2004"
},
iphone:{
Min:"1206",
Max:"1206"
},
ipad:{
Min:"1206",
Max:"1206"
},
android:{
Min:"1206",
Max:"1206"
}
},TENPAYCTL.chromeNACLVersion={
"windows nt":{
Min:"2006",
Max:"2006"
},
"mac os x":{
Min:"2006",
Max:"2006"
}
},TENPAYCTL.UnSupportVersion=["1211","2011"],TENPAYCTL.GetBrowseEnv=function(){
var t,e,r,n,i,o=navigator.userAgent.toLowerCase(),s=navigator.platform.toLowerCase(),a="win32"==s||"windows"==s||"win64"==s,c="mac68k"==s||"macppc"==s||"macintosh"==s||"macintel"==s,l="iphone"==s||"ipod"==s,d="ipad"==s,u=String(s).indexOf("linux arm")>-1,h=String(s).indexOf("linux")>-1&&!u;
t=a?"windows nt":c?"mac os x":h?"linux":l?"iphone":d?"ipad":u?"android":"unknown";
var p=null;
e=(p=o.match(/(windows nt) ([\d.]+[\d]+)/))||(p=o.match(/(mac os x) ([\d_.]+\d+)/))||(p=o.match(/(iphone) os ([\d_]+\d+)/))||(p=o.match(/(ipad);[\s\S]* cpu os ([\d_]+\d+)/))||(p=o.match(/(android) ([\d.]+[\d]+)/))?p[2]:"unknown",
r="x86",(p=o.match(/wow64/))?r="wow64":(p=o.match(/win64; x64/))&&(r="x64"),(p=o.match(/(msie) ([\d.]+)/))||(p=o.match(/(qqbrowser)\/([\d.]+)/))||(p=o.match(/ (maxthon)\/([\d.]+)/))||(p=o.match(/ (se) ([\d.]+)/))||(p=o.match(/(firefox)\/([\d.]+)/))||(p=o.match(/(chrome)\/([\d.]+)/))||(p=o.match(/(opera).([\d.]+)/))?(n=p[1],
i=p[2],"qqbrowser"==n&&null==t&&(t="windows nt",e="6.1")):(p=o.match(/version\/([\d.]+).*(safari)/))?(n=p[2],
i=p[1]):(p=o.match(/trident.*rv:([\d.]+)/))?(n="msie",i=p[1]):(n="unknown",i=0);
var C;
return C={
OSName:t,
OSVersion:e,
ProcessType:r,
BrowseName:n,
BrowseVersion:i
};
},TENPAYCTL.IsBrowseNeedLoadComplete=function(){
var t=TENPAYCTL.GetBrowseEnv();
return"iphone"!=t.OSName&&"ipad"!=t.OSName||"undefined"!=typeof g_tenpaycertIOSobject?!1:!0;
},TENPAYCTL.IsIOSBrowse=function(){
if("undefined"!=typeof YUI&&"undefined"!=typeof YUI.Env&&1==YUI.Env.noCtrlMode)return!1;
var t=TENPAYCTL.GetBrowseEnv();
return"0"!=TENPAYCTL.CheckIsSupport()||"iphone"!=t.OSName&&"ipad"!=t.OSName||"qqbrowser"!=t.BrowseName?!1:!0;
},TENPAYCTL.runQQCertFunction=function(t){
if(TENPAYCTL.IsIOSBrowse()){
if("undefined"!=typeof parent.TENPAYCTL.runQQCertFunction&&this.runQQCertFunction!=parent.TENPAYCTL.runQQCertFunction)return void parent.TENPAYCTL.runQQCertFunction(t);
if(g_qqCertLoadFunction.push(t),"undefined"!=typeof g_tenpaycertIOSobject){
var e="https://BAEA0695-03A4-43BB-8495-C7025E1A8F42-RunTask";
location.href=e;
}
}else t();
},TENPAYCTL.CheckEnv=function(t){
var e=[{
OSName:"windows nt",
ProcessType:"x86",
BrowseName:"msie",
BMinVersion:"6.0"
},{
OSName:"windows nt",
ProcessType:"wow64",
BrowseName:"msie",
BMinVersion:"6.0"
},{
OSName:"windows nt",
ProcessType:"x64",
BrowseName:"msie",
BMinVersion:"6.0"
},{
OSName:"windows nt",
BrowseName:"maxthon"
},{
OSName:"windows nt",
BrowseName:"se"
},{
OSName:"windows nt",
BrowseName:"qqbrowser"
},{
OSName:"windows nt",
BrowseName:"firefox",
BMinVersion:"3.0"
},{
OSName:"windows nt",
ProcessType:"x86",
BrowseName:"chrome",
BMinVersion:"4.0"
},{
OSName:"windows nt",
ProcessType:"wow64",
BrowseName:"chrome",
BMinVersion:"4.0"
},{
OSName:"windows nt",
BrowseName:"safari",
BMinVersion:"5.0"
},{
OSName:"mac os x",
BrowseName:"safari"
},{
OSName:"mac os x",
BrowseName:"chrome"
},{
OSName:"mac os x",
BrowseName:"firefox"
},{
OSName:"mac os x",
BrowseName:"qqbrowser"
},{
OSName:"iphone",
BrowseName:"qqbrowser",
BMinVersion:"4.3"
},{
OSName:"iphone"
},{
OSName:"ipad"
},{
OSName:"android"
}];
"iphone"==t.OSName&&(t.BrowseVersion=t.BrowseVersion.substring(0,2));
for(var r=0;r<e.length;r++)if(!(e[r].OSName&&e[r].OSName!=t.OSName||e[r].OSVersion&&e[r].OSVersion!=t.OSVersion||e[r].ProcessType&&e[r].ProcessType!=t.ProcessType||e[r].BrowseName&&e[r].BrowseName!=t.BrowseName))return e[r].BMinVersion&&parseFloat(e[r].BMinVersion)>parseFloat(t.BrowseVersion)?10102:e[r].BMaxVersion&&parseFloat(e[r].BMaxVersion)<=parseFloat(t.BrowseVersion)?10103:e[r].BMaxOSVersion&&parseFloat(e[r].BMaxOSVersion)<=parseFloat(t.OSVersion)?10104:0;
return"Netscape"==navigator.appName||"Opera"==navigator.appName||"Microsoft Internet Explorer"==navigator.appName?0:10101;
},TENPAYCTL.CheckIsSupport=function(){
var t=TENPAYCTL.GetBrowseEnv(),e=TENPAYCTL.CheckEnv(t);
return e;
},TENPAYCTL.isEnvSupportCtrl=function(){
var t=TENPAYCTL.GetBrowseEnv(),e=!0;
return"windows nt"==t.OSName&&"unknown"==t.BrowseName&&(e=!1),"Netscape"!=navigator.appName&&"Opera"!=navigator.appName||"iphone"!=t.OSName&&"ipad"!=t.OSName||(e=!1),
"android"==t.OSName&&(e=!1),-1!=navigator.userAgent.indexOf("AdobeAIR")&&(e=!1),
-1!=navigator.userAgent.indexOf("TencentGameEmbedBrowser")&&(e=!1),e;
},TENPAYCTL.AlertError=function(t){
switch(t){
case 1:
try{
console.log("未创建控件对象，请页面检查逻辑");
}catch(e){}
break;

case 2:
try{
console.log("没有找到控件对象");
}catch(e){}
break;

default:
try{
console.log("Error");
}catch(e){}
}
return null;
},TENPAYCTL.TenpayctrlJSON={},TENPAYCTL.getTenpayctrlById=function(t){
return TENPAYCTL.TenpayctrlJSON[t]?TENPAYCTL.TenpayctrlJSON[t]:null;
},TENPAYCTL.judgeTenpayctrlById=function(t){
return TENPAYCTL.TenpayctrlJSON[t]?!0:!1;
},TENPAYCTL.AndroidQQEditCtrl=function(){
this.Version=0,this.Mode=0,this.id,this.ctrl,this.SetPassWordId=function(t){
this.id=t,this.ctrl=window.QQPassword,this.Version=window.QQPassword.getVersion(),
this.Mode=window.QQPassword.getMode(),this.ctrl.SelectRsaKey(0);
},this.SetSalt=function(t){
return this.ctrl.SetSalt(t);
},this.SelectRsaKey=function(t){
return this.ctrl.SelectRsaKey(t);
},this.GetSha1Value=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetSha1Value();
},this.GetSha1Value2=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetSha1Value2();
},this.GetSha1Value3=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetSha1Value3();
},this.GetRsaPassword=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetRsaPassword();
},this.GetRsaPassword2=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetRsaPassword2();
},this.GetRsaPassword3=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetRsaPassword3();
},this.GetRemitRSAPassword=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetRemitRSAPassword();
},this.GetInputInfo=function(){
return this.ctrl.SetPassword(document.getElementById(this.id).value),this.ctrl.GetInputInfo();
};
},TENPAYCTL.AndroidQQCertCtrl=function(){
this.ctrl=window.QQCertificate,this.Version=window.QQCertificate.getVersion(),this.HostName=window.QQCertificate.getHostName(),
this.Base64Encode=function(t){
return this.ctrl.Base64Encode(t);
},this.Base64Decode=function(t){
return this.ctrl.Base64Decode(t);
},this.SetChallenge=function(t,e){
return this.ctrl.SetChallenge(t,e);
},this.SetSubject=function(t){
return this.ctrl.SetSubject(t);
},this.GetCSR=function(){
return this.ctrl.GetCSR();
},this.ImportCert=function(t){
return this.ctrl.ImportCert(t);
},this.CertSign=function(t,e){
return this.ctrl.CertSign(t,e);
},this.FindCert=function(t,e){
return this.ctrl.FindCert(t,e);
},this.IsCertExist=function(t){
return this.ctrl.IsCertExist(t);
},this.DelCert=function(t){
return this.ctrl.DelCert(t);
};
},TENPAYCTL.QQEditCtrl=function(){
this.ctrl,this.id,this.objPara,this.loadFinish=!1,this.OSName,this.noCtrlMode=!1;
var t;
this.setId=function(e){
t=e;
},this.Version={
valueOf:function(){
return this.toString();
},
toString:function(){
var e=document.getElementById(t);
return e?e.Version:null;
}
},this.Mode={
valueOf:function(){
return this.toString();
},
toString:function(){
var e=document.getElementById(t);
return e?e.Mode:null;
}
};
},TENPAYCTL.isIEBrowser=function(){
var t=navigator.userAgent.toLowerCase();
return"Microsoft Internet Explorer"==navigator.appName?1:t.match(/trident.*rv:([\d.]+)/)&&"Netscape"==navigator.appName?2:0;
},TENPAYCTL.isChromeSupportNPAPI=function(){
return!0;
},TENPAYCTL.isChromeSupportNACL=function(t){
return t=t||TENPAYCTL.GetBrowseEnv(),"chrome"!=t.BrowseName||"windows nt"!=t.OSName&&"mac os x"!=t.OSName||!(parseInt(t.BrowseVersion,10)>=42||"x64"==t.ProcessType)?!1:!0;
},TENPAYCTL.QQEditCtrl.prototype.create=function(t,e,r){
var n,i,o,s=0;
if(e="function"==typeof e?e:function(){},r=r||window,i=" ",o=" ",!t.ctrlId)return s=20101,
void e.apply(r,[s]);
if(i+='id="'+t.ctrlId+'" ',o+='id="'+t.ctrlId+'" ',this.id=t.ctrlId,this.setId(t.ctrlId),
TENPAYCTL.TenpayctrlJSON[t.ctrlId]=this,!t.parentNode)return s=20101,void e.apply(r,[s]);
t.w&&(i+='width="'+t.w+'" ',t.h&&(o+=' style= "width:'+t.w+"px;height:"+t.h+'px;" ')),
t.h&&(i+='height="'+t.h+'" '),t.tabIndex&&(i+='tabindex="'+t.tabIndex+'" ',o+='tabindex="'+t.tabIndex+'" '),
this.objPara=t;
var a='<a id="unSetup_'+t.ctrlId+'" href="javascript:void(0); " onclick="TFL.PC.setup(); " style="display: inline-block !important;color:red !important; font-size:12px !important; border:1px solid red !important;width:'+(t.w-2)+"px !important;line-height:"+(t.h-2)+'px !important;text-align:center !important;background-color:#fff !important;z-index:1;">请点此输入密码</a>';
if("undefined"!=typeof t.unSetupContent&&(a=t.unSetupContent),s=TENPAYCTL.CheckIsSupport())return void e.apply(r,[s]);
var c=TENPAYCTL.GetBrowseEnv();
this.OSName=c.OSName,TENPAYCTL.isEnvSupportCtrl()||t.useNoCtrlMode!==!0||(this.noCtrlMode=!0);
var l=TENPAYCTL.isIEBrowser();
if(this.noCtrlMode)n='<input type="password" id="'+t.ctrlId+'" style="width:100%;height:100%;line-height:100%;border:none;font-size:20px;" />',
s=0;else if(l){
if((!t.codebase||0!=t.codebase)&&1==l){
var d="";
d=c.OSVersion<6?"tenpaycert_xp.cab":"x64"==c.ProcessType?"tenpaycert64.cab":"tenpaycert.cab",
i+=' codebase="https://www.tenpay.com/download/'+d+"#Version="+TENPAYCTL.MinCodeBaseVersion+'" ';
}
n='<object classid="clsid:E787FD25-8D7C-4693-AE67-9406BC6E22DF"'+i+">"+a+"</object>";
}else{
if("Netscape"!=navigator.appName&&"Opera"!=navigator.appName)return s=20102,void e.apply(r,[s]);
if("iphone"==c.OSName||"ipad"==c.OSName){
if("undefined"!=typeof parent.g_tenpayeditIOSobject&&(g_tenpayeditIOSobject=parent.g_tenpayeditIOSobject),
"undefined"==typeof g_tenpayeditIOSobject&&"safari"!=c.BrowseName)return void e.apply(r,[20107]);
var u,h;
if("ipad"==c.OSName&&(u="http://itunes.apple.com/cn/app/id426097375",h="mttbrowserhd://url=www.tenpay.com/index.shtml"),
"iphone"==c.OSName&&(u="http://itunes.apple.com/cn/app/id370139302",h="mttbrowser://url=www.tenpay.com/index.shtml"),
"undefined"==typeof g_tenpayeditIOSobject)return confirm("提醒：使用iOS浏览器访问财付通必须启动QQ浏览器的安全支持。\n 如果没安装，请点击取消后再在页面上点击安装QQ浏览器按钮。\n如果您已经安装过QQ浏览器，可以直接启动QQ浏览器，现在启动吗？")&&setTimeout(function(){
document.location=h;
},500),n='<a id="unSetup_'+t.ctrlID+'" href="'+u+'" style="color:red !important; font-size:12px !important; border:1px solid red !important;width:'+(t.w-2)+"px !important;line-height:"+(t.h-2)+'px !important;text-align:center !important;background-color:#fff !important;position:absolute;z-index:1;">点此安装QQ浏览器</a>',
"undefined"!=typeof t.unSetupContent&&(n=t.unSetupContent),void e.apply(r,[20108]);
n='<input type="password" '+o+" />";
}else if("android"==c.OSName)n="undefined"==typeof window.QQPassword?"":'<input type="password" '+o+" />";else if(TENPAYCTL.isChromeSupportNACL(c)){
if(void 0==navigator.mimeTypes["application/x-pnacl"])return s=20109,void e.apply(r,[s]);
var p=TENPAYCTL.NACL.checkPluginInstall();
if(1!=p)return TENPAYCTL.NACL.queryQuota(function(){
TENPAYCTL.NACL.installPlugin(function(){
window.location.reload(!0);
});
},function(){},function(){}),s=20103,void e.apply(r,[s]);
n='<embed type="application/x-pnacl" src="'+TENPAYCTL.NACLQQEditCtrlSrc+'" '+i+"></embed>";
var C=document.getElementById(t.parentNode);
this.ctrl=new TENPAYCTL.NACLQQEditCtrl(t.ctrlId);
var f=this;
C.addEventListener("message",function(n){
f.ctrl.HandleMessage(n,function(n){
f.Mode=f.ctrl.Mode,f.Version=f.ctrl.Version,0==n&&(f.Version<TENPAYCTL.chromeNACLVersion[c.OSName].Min?n=20104:f.Version<TENPAYCTL.chromeNACLVersion[c.OSName].Max&&(n=20106)),
f.bindEvent();
var i=new function(){
this.Version=f.ctrl.Version,this.Mode=f.ctrl.Mode,this.SetEditFocus=function(){
return f.setEditFocus();
},this.GetInputInfo=function(){
return f.getInputInfo();
},this.ClearText=function(){
return f.clearText();
},this.SetSalt=function(t){
return f.setSalt(t);
},this.GetSha1Value=function(){
return f.getSha1Value();
},this.GetSha1Value2=function(){
return f.getSha1Value2();
},this.GetSha1Value3=function(){
return f.getSha1Value3();
},this.GetRsaPassword=function(){
return f.getRsaPassword();
},this.GetRsaPassword2=function(){
return f.getRsaPassword2();
},this.GetRsaPassword3=function(){
return f.getRsaPassword3();
},this.SelectRsaKey=function(t){
return f.selectRsaKey(t);
},this.GetRemitRSAPassword=function(){
return f.getRemitRSAPassword();
};
},o=document.getElementById(t.ctrlID);
if(o)for(var s in i)i.hasOwnProperty(s)&&(o[s]=i[s]);
e.apply(r,[n]);
});
},!0);
}else n='<object type="application/qqedit"'+i+">"+a+"</object>";
}
if(t.additionContent&&(n+=t.additionContent),t.submitName&&(n+=' <input type="hidden" id="'+t.submitName+'" name="'+t.submitName+'" /> '),
document.getElementById(t.parentNode).innerHTML=n,this.noCtrlMode){
var T=new function(){
this.Version=1111,this.Mode=1,this.SetEditFocus=function(){
this.focus();
},this.GetInputInfo=function(){
for(var t,e,r=this.value.length,n=0,i=0;r>i;i++)t=this.value.charAt(i),n|=/^[0-9]$/.test(t)?2:/^[A-Z]$/.test(t)?4:/^[a-z]$/.test(t)?8:/^[~`!@#\$%\^&\*\(\)_\-\+=\|\{\}\\\[\]:;\"'<,>\.\?\/]$/.test(t)?16:" "==t?32:/^[\u4E00-\u9FA5]$/.test(t)?64:1;
return e=r,e=e<<16|n;
},this.isCreatedCtrl=function(){
return!0;
},this.ClearText=function(){
this.value="";
},this.SetSalt=function(t){
this.Salt=t;
};
},N=document.getElementById(t.ctrlId);
if(N){
for(var m in T)T.hasOwnProperty(m)&&(N[m]=T[m]);
N.style.fontSize="12px",this.ctrl=N;
}
}else if("iphone"==c.OSName||"ipad"==c.OSName){
if("undefined"==typeof QQPassword&&"undefined"!=typeof parent.QQPassword){
var S=document.createElement("script");
S.type="text/javascript",S.text="function SetSalt(seed){       this.Salt=seed;} function SelectRsaKey(index){ this.RSAKey=index;} function GetSha1Value(){ this.SetPassWord(1); return( parent.g_tenpayeditIOSobject.Sha1Value);} function GetSha1Value2(){ this.SetPassWord(2); return(parent.g_tenpayeditIOSobject.Sha1Value);} function GetSha1Value3(){ this.SetPassWord(3); return(parent.g_tenpayeditIOSobject.Sha1Value);} function GetRsaPassword(){ this.SetPassWord(1); return(parent.g_tenpayeditIOSobject.RsaPassword);} function GetRsaPassword2(){ this.SetPassWord(2); return(parent.g_tenpayeditIOSobject.RsaPassword);} function GetRsaPassword3(){ this.SetPassWord(3); return(parent.g_tenpayeditIOSobject.RsaPassword);} function GetRemitRSAPassword(){ this.SetPassWord(4); return(parent.g_tenpayeditIOSobject.RsaPassword);} function GetInputInfo(){this.SetPassWord(1); return(parent.g_tenpayeditIOSobject.InputInfo);} function SetPassWordId(pswId) { this.pswId = pswId;} function SetPassWord(num){ var pw = document.getElementById(this.pswId).value; url='http://E787FD25-8D7C-4693-AE67-9406BC6E22DF?RSAKey='+this.RSAKey+'&Salt='+this.Salt+'&pw='+encodeURIComponent(pw)+'&num='+num;    g_tenpayeditIOSobject.RsaPassword=''; window.open(url); while(parent.g_tenpayeditIOSobject.RsaPassword.length==0){}; }function QQPassword() {       this.Salt='313233343536'; this.RSAKey=0; this.Sha1Value='';this.RsaPassword='';this.InputInfo=0; this.Version=parent.g_tenpayeditIOSobject.Version; this.Mode=1; this.pswId='';this.SetSalt=SetSalt; this.SelectRsaKey=SelectRsaKey; this.GetSha1Value=GetSha1Value; this.GetSha1Value2=GetSha1Value2; this.GetSha1Value3=GetSha1Value3; this.GetRsaPassword=GetRsaPassword; this.GetRsaPassword2=GetRsaPassword2; this.GetRsaPassword3=GetRsaPassword3; this.GetRemitRSAPassword=GetRemitRSAPassword; this.GetInputInfo=GetInputInfo;  this.SetPassWord=SetPassWord; this.SetPassWordId=SetPassWordId; }; ",
document.getElementsByTagName("head")[0].appendChild(S),this.ctrl=new QQPassword;
}else this.ctrl=new QQPassword;
this.Mode=this.ctrl.Mode,this.Version=this.ctrl.Version,this.ctrl.SetPassWordId(t.ctrlId),
this.Version<TENPAYCTL.OSControlVersion[c.OSName].Min?s=20104:this.Version<TENPAYCTL.OSControlVersion[c.OSName].Max&&(s=20106),
t.version&&this.Version<t.version&&(s=20105);
var N=document.getElementById(t.ctrlId);
if(N)for(var m in this.ctrl)this.ctrl.hasOwnProperty(m)&&(N[m]=this.ctrl[m]);
}else if("android"==c.OSName){
if("undefined"==typeof window.QQPassword)return void e.apply(r,[20103]);
this.ctrl=new TENPAYCTL.AndroidQQEditCtrl,this.ctrl.SetPassWordId(this.id),this.Mode=this.ctrl.Mode,
this.Version=this.ctrl.Version;
var N=document.getElementById(t.ctrlId);
if(N)for(var m in this.ctrl)this.ctrl.hasOwnProperty(m)&&(N[m]=this.ctrl[m]);
}else{
if(TENPAYCTL.isChromeSupportNACL())return;
if(this.ctrl=document.getElementById(this.id),this.Mode=this.ctrl.Mode,1!=this.Mode)return s=20103,
this.ctrl=null,void e.apply(r,[s]);
this.Version=this.ctrl.Version,this.Version<TENPAYCTL.OSControlVersion[c.OSName].Min?s=20104:this.Version<TENPAYCTL.OSControlVersion[c.OSName].Max&&(s=20106),
t.version&&this.Version<t.version&&(s=20105),new RegExp(TENPAYCTL.UnSupportVersion.join("|")).test(this.Version)&&"windows nt"==c.OSName&&c.OSVersion>=6&&(s=20104),
this.bindEvent();
}
e.apply(r,[s]);
},TENPAYCTL.QQEditCtrl.prototype.checkValid=function(){
if("windows nt"==this.OSName&&null==this.ctrl){
var t=document.getElementById(this.id);
"undefined"!=typeof t.Version&&(this.ctrl=t);
}
},TENPAYCTL.QQEditCtrl.prototype.bindEvent=function(){
if(null!=this.ctrl){
var t=this.objPara;
t.focus_callback&&(this.ctrl.OnEditFocus=t.focus_callback),t.blur_callback&&(this.ctrl.OnEditBlur=t.blur_callback),
t.enter_callback&&(this.ctrl.OnEditEnterKeyUp=t.enter_callback),t.ctrlEvn&&(this.ctrl.OnEditEnterKeyUp=t.ctrlEvn);
}
},TENPAYCTL.QQEditCtrl.prototype.getExeDownloadPath=function(){
var t=TENPAYCTL.GetBrowseEnv();
return"windows nt"==t.OSName?("unknown"==t.OSVersion&&(t.OSVersion=6),parseFloat(t.OSVersion)>=6?"https://www.tenpay.com/download/tenpaycert.exe":"https://www.tenpay.com/download/tenpaycert_xp.exe"):"mac os x"==t.OSName?"https://www.tenpay.com/download/tenpaycert.dmg":"iphone"==t.OSName?"http://itunes.apple.com/cn/app/id370139302":"https://www.tenpay.com";
},TENPAYCTL.QQEditCtrl.prototype.startUpdate=function(t){
return"android"==this.OSName||"iphone"==this.OSName||"ipad"==this.OSName?-99:(this.checkValid(),
this.ctrl?this.Version<1212?-3:this.ctrl.StartUpdate(t):TENPAYCTL.AlertError(1));
},TENPAYCTL.QQEditCtrl.prototype.showBorder=function(t){
return"android"==this.OSName||"iphone"==this.OSName||"ipad"==this.OSName?-99:(this.checkValid(),
this.ctrl?(this.ctrl.ShowBorder=t,1):TENPAYCTL.AlertError(1));
},TENPAYCTL.QQEditCtrl.prototype.setSalt=function(t){
return this.checkValid(),this.ctrl?this.ctrl.SetSalt(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.selectRsaKey=function(t){
return this.checkValid(),this.ctrl?this.ctrl.SelectRsaKey(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getSha1Value=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetSha1Value():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getSha1Value2=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetSha1Value2():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getSha1Value3=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetSha1Value3():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getRsaPassword=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetRsaPassword():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getRsaPassword2=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetRsaPassword2():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getRsaPassword3=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetRsaPassword3():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getRemitRSAPassword=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetRemitRSAPassword():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.getInputInfo=function(){
return this.checkValid(),this.ctrl&&"undefined"!=typeof this.ctrl.GetInputInfo?this.ctrl.GetInputInfo():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQEditCtrl.prototype.setEditFocus=function(){
return"android"!=this.OSName&&"iphone"!=this.OSName&&"ipad"!=this.OSName?(this.checkValid(),
this.ctrl&&"undefined"!=typeof this.ctrl.SetEditFocus?this.ctrl.SetEditFocus():TENPAYCTL.AlertError(1)):void document.getElementById(this.id).focus();
},TENPAYCTL.QQEditCtrl.prototype.clearText=function(){
return"android"!=this.OSName&&"iphone"!=this.OSName&&"ipad"!=this.OSName?(this.checkValid(),
this.ctrl?this.ctrl.ClearText():TENPAYCTL.AlertError(1)):void(document.getElementById(this.id).value="");
},TENPAYCTL.QQEditCtrl.prototype.isCreatedCtrl=function(){
return this.checkValid(),!(void 0==this.ctrl||null==this.ctrl);
},TENPAYCTL.QQCertCtrl=function(){
this.ctrl,this.OSName,this.Version={
valueOf:function(){
return this.toString();
},
toString:function(){
var t=document.getElementById("js_tenpay_cert");
return t?t.Version:null;
}
},this.HostName={
valueOf:function(){
return this.toString();
},
toString:function(){
var t=document.getElementById("js_tenpay_cert");
return t?t.HostName:null;
}
};
},TENPAYCTL.QQCertCtrl.prototype.create=function(t,e,r){
var n,i,o,s;
e="function"==typeof e?e:function(){},r=r||window;
var a=t.w||0,c=t.h||0;
if(i=TENPAYCTL.CheckIsSupport())return void e.apply(r,[i]);
if(document.getElementById("js_tenpay_cert"))return this.ctrl=document.getElementById("js_tenpay_cert"),
this.Version=this.ctrl.Version,i=30102,void e.apply(r,[i]);
TENPAYCTL.TenpayctrlJSON.js_tenpay_cert=this;
var l=TENPAYCTL.GetBrowseEnv();
this.OSName=l.OSName;
var d=TENPAYCTL.isIEBrowser();
if(d){
if((!t.codebase||0!=t.codebase)&&1==d){
var u="";
u=l.OSVersion<6?"tenpaycert_xp.cab":"x64"==l.ProcessType?"tenpaycert64.cab":"tenpaycert.cab",
o=' codebase="https://www.tenpay.com/download/'+u+"#Version="+TENPAYCTL.MinCodeBaseVersion+'" ';
}
n='<object id="js_tenpay_cert" classid="clsid:BAEA0695-03A4-43BB-8495-C7025E1A8F42"'+o+' width="'+a+'" height="'+c+'"></object>';
}else if("Netscape"==navigator.appName||"Opera"==navigator.appName)if("iphone"==l.OSName||"ipad"==l.OSName){
if("undefined"!=typeof parent.g_tenpaycertIOSobject&&(g_tenpaycertIOSobject=parent.g_tenpaycertIOSobject),
"undefined"==typeof g_tenpaycertIOSobject)return void e.apply(r,[20107]);
n='<object id="js_tenpay_cert" width="'+a+'" height="'+c+'"></object>';
}else if(TENPAYCTL.isChromeSupportNACL(l)){
if(void 0==navigator.mimeTypes["application/x-pnacl"])return i=20109,void e.apply(r,[i]);
var h=TENPAYCTL.NACL.checkPluginInstall();
if(1!=h)return TENPAYCTL.NACL.queryQuota(function(){
TENPAYCTL.NACL.installPlugin(function(){
window.location.reload(!0);
});
},function(){},function(){}),i=30104,void e.apply(r,[i]);
n='<embed type="application/x-pnacl" src="'+TENPAYCTL.NACLQQCertCtrlSrc+'" id="js_tenpay_cert" width="'+a+'" height="'+c+'"></embed>';
var p=document.getElementById(t.div_id);
this.ctrl=new TENPAYCTL.NACLQQCertCtrl("js_tenpay_cert");
var C=this;
p.addEventListener("message",function(t){
C.ctrl.HandleMessage(t,function(t){
C.Mode=C.ctrl.Mode,C.Version=C.ctrl.Version,C.HostName=C.ctrl.HostName,0==t&&(C.Version<TENPAYCTL.chromeNACLVersion[l.OSName].Min?t=30105:C.Version<TENPAYCTL.chromeNACLVersion[l.OSName].Max&&(t=30107));
var n=new function(){
this.Version=C.ctrl.Version,this.Mode=C.ctrl.Mode,this.HostName=C.ctrl.HostName,
this.IsCertExist=function(t){
return C.isCertExist(t);
},this.FindCert=function(t,e){
return C.findCert(t,e);
},this.ImportCert=function(t){
return C.importCert(t);
},this.DelCert=function(t){
return C.delCert(t);
},this.CertSign=function(t,e){
return C.certSign(t,e);
},this.GetCSR=function(){
return C.getCSR();
},this.SetSubject=function(t){
return C.setSubject(t);
},this.SetChallenge=function(t,e){
return C.setChallenge(t,e);
},this.Base64Encode=function(t){
return C.base64Encode(t);
},this.Base64Decode=function(t){
return C.base64Decode(t);
};
},i=document.getElementById("QQCertCtrl");
if(i)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);
e.apply(r,[t]);
});
},!0);
}else n='<object id="js_tenpay_cert" type="application/qqcert" width="'+a+'" height="'+c+'"></object>';else{
if("android"!=l.OSName)return i=30103,void e.apply(r,[i]);
n="undefined"==typeof window.QQCertificate?"":'<object id="js_tenpay_cert" width="'+a+'" height="'+c+'"></object>';
}
if(t.div_id)document.getElementById(t.div_id).innerHTML=n;else if("iphone"==l.OSName||"ipad"==l.OSName){
var f=document.createElement("div");
f.innerHTML=n,f.id="parentCert",f.className="newDiv",document.body.appendChild(f);
}else document.write(n);
if("iphone"==l.OSName||"ipad"==l.OSName)this.ctrl=g_tenpaycertIOSobject,this.Version=this.ctrl.Version,
this.HostName=this.ctrl.HostName;else if("android"==l.OSName){
if("undefined"==typeof window.QQCertificate)return this.ctrl=null,void e.apply(r,[30104]);
this.ctrl=new TENPAYCTL.AndroidQQCertCtrl,this.Version=this.ctrl.Version,this.HostName=this.ctrl.HostName;
var T=document.getElementById("js_tenpay_cert");
if(T)for(var N in this.ctrl)this.ctrl.hasOwnProperty(N)&&(T[N]=this.ctrl[N]);
}else{
if(TENPAYCTL.isChromeSupportNACL())return;
if(s=document.getElementById("js_tenpay_cert").Version,!s)return i=30104,this.ctrl=null,
void e.apply(r,[i]);
s<TENPAYCTL.OSControlVersion[l.OSName].Min?i=30105:s<TENPAYCTL.OSControlVersion[l.OSName].Max&&(i=30107),
t.version&&s<t.version&&(i=30106),this.ctrl=document.getElementById("js_tenpay_cert"),
this.Version=s,this.HostName=this.ctrl.HostName;
}
e.apply(r,[i]);
},TENPAYCTL.QQCertCtrl.prototype.checkValid=function(){
if("windows nt"==this.OSName&&null==this.ctrl){
var t=document.getElementById("js_tenpay_cert");
"undefined"!=typeof t.Version&&(this.ctrl=t);
}
},TENPAYCTL.QQCertCtrl.prototype.bindObjMethod=function(){
var t=document.getElementById("js_tenpay_cert");
if(null!=t)for(var e in g_tenpaycertIOSobject)g_tenpaycertIOSobject.hasOwnProperty(e)&&(t[e]=g_tenpaycertIOSobject[e]);
},TENPAYCTL.QQCertCtrl.prototype.findCert=function(t,e){
return this.checkValid(),this.ctrl?this.ctrl.FindCert(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.isCertExist=function(t){
return this.checkValid(),this.ctrl?this.ctrl.IsCertExist(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.getCertInfo=function(t,e){
if(this.checkValid(),this.ctrl){
if("undefined"!=typeof this.ctrl.GetCertInfo){
var r=this.ctrl.GetCertInfo(t,e),n=r.split("|");
return n;
}
return null;
}
return TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.delCert=function(t){
return this.checkValid(),this.ctrl?this.ctrl.DelCert(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.setChallenge=function(t,e){
return this.checkValid(),this.ctrl?this.ctrl.SetChallenge(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.setSubject=function(t){
return this.checkValid(),this.ctrl?this.ctrl.SetSubject(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.getCSR=function(){
return this.checkValid(),this.ctrl?this.ctrl.GetCSR():TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.importCert=function(t){
return this.checkValid(),this.ctrl?this.ctrl.ImportCert(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.base64Encode=function(t){
return this.checkValid(),this.ctrl?this.ctrl.Base64Encode(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.base64Decode=function(t){
return this.checkValid(),this.ctrl?this.ctrl.Base64Decode(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.certSign=function(t,e){
return this.checkValid(),this.ctrl?this.ctrl.CertSign(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKGetSN=function(t){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKGetSN?-99:this.ctrl.UKGetSN(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKGetCSR=function(t,e){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKGetCSR?-99:this.ctrl.UKGetCSR(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKImportCert=function(t,e,r,n){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKImportCert?-99:this.ctrl.UKImportCert(t,e,r,n):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKCertSign=function(t,e,r,n){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKCertSign?-99:this.ctrl.UKCertSign(t,e,r,n):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKExportCert=function(t,e){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKExportCert?-99:this.ctrl.UKExportCert(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKGetSN_ND=function(t){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKGetSN_ND?-99:this.ctrl.UKGetSN_ND(t):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKGetCSR_ND=function(t,e,r){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKGetCSR_ND?-99:this.ctrl.UKGetCSR_ND(t,e,r):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKImportCert_ND=function(t,e,r,n){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKImportCert_ND?-99:this.ctrl.UKImportCert_ND(t,e,r,n):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKCertSign_ND=function(t,e,r,n,i){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKCertSign_ND?-99:this.ctrl.UKCertSign_ND(t,e,r,n,i):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.UKExportCert_ND=function(t,e,r){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.UKExportCert_ND?-99:this.ctrl.UKExportCert_ND(t,e,r):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.SelectCertType=function(t,e){
return this.checkValid(),this.ctrl?"undefined"==typeof this.ctrl.SelectCertType?-99:"2006"==this.ctrl.Version?-99:this.ctrl.SelectCertType(t,e):TENPAYCTL.AlertError(1);
},TENPAYCTL.QQCertCtrl.prototype.OnUKeyChange=function(t){
"undefined"!=typeof this.ukChangeTime&&clearInterval(this.ukChangeTime),this.OnUKeyChangeCallBack=t,
this.ukChangeTime=setInterval(this.UKeyStatusCheck,1e3);
},TENPAYCTL.QQCertCtrl.prototype.UKeyStatusCheck=function(){
var t=TENPAYCTL.getTenpayctrlById("js_tenpay_cert");
if(null!=t){
var e=t.UKGetSN(2);
null!=e&&e.length>0&&(clearInterval(t.ukChangeTime),t.OnUKeyChangeCallBack(e));
}
},TENPAYCTL.NACL={},TENPAYCTL.NACL.checkPluginInstall=function(){
if(!navigator.cookieEnabled)return 1;
var t="com_tenpay_nacl_plugin=exist";
if(document.cookie.length>0){
var e=document.cookie.indexOf(t);
if(-1!=e)return 1;
}
return 0;
},TENPAYCTL.NACL.setPluginInstall=function(){
var t="com_tenpay_nacl_plugin=exist",e=new Date;
e.setDate(e.getDate()+365),document.cookie=t+";expires="+e.toGMTString()+";path=/";
},TENPAYCTL.NACL.queryQuota=function(t,e,r){
var n=2097152,i=!1,o=function(r){
n>r?e():t();
},s=function(e,s){
n>s?(i=!0,navigator.webkitPersistentStorage.requestQuota(n,o,function(t){
r(t);
})):t();
};
navigator.webkitPersistentStorage.queryUsageAndQuota(s);
},TENPAYCTL.NACL.installPlugin=function(t){
var e=document.createElement("embed");
e.setAttribute("name","tenpayedit"),e.setAttribute("id","tenpayedit"),e.setAttribute("width",1),
e.setAttribute("height",1),e.setAttribute("src",TENPAYCTL.NACLQQEditCtrlSrc),e.setAttribute("type","application/x-pnacl");
var r=document.createElement("embed");
r.setAttribute("name","tenpaycert"),r.setAttribute("id","tenpaycert"),r.setAttribute("width",1),
r.setAttribute("height",1),r.setAttribute("src",TENPAYCTL.NACLQQCertCtrlSrc),r.setAttribute("type","application/x-pnacl");
var n=function(){
TENPAYCTL.NACL.setPluginInstall(),"function"==typeof t&&t();
},i=document.getElementsByTagName("body")[0];
i.addEventListener("load",n,!0),i.appendChild(e),i.appendChild(r);
},TENPAYCTL.NACLQQEditCtrlSrc="https://www.tenpay.com/download/tenpayedit.nmf",TENPAYCTL.NACLQQEditCtrl=function(t){
var e,r=-1e3,n=t,i=function(t){
TENPAYCTL.NACL.checkPluginInstall()||TENPAYCTL.NACL.setPluginInstall(),e=document.getElementById(n),
r="undefined"!=typeof e?0:-1003,"function"==typeof t&&t(r);
},o=function(t,i){
{
var o=t.data.Message;
t.data.Value;
}
"Log"==o||("InitFinished"==o?(e=document.getElementById(n),r="undefined"!=typeof e?0:-1003,
"function"==typeof i&&i(r)):"InitError"==o&&(r=-1004,"function"==typeof i&&i(r)));
},s=function(t){
return a()?a():e.postMessageAndAwaitResponse(t);
},a=function(){
return r;
},c={
valueOf:function(){
return this.toString();
},
toString:function(){
return s("Version");
}
},l={
valueOf:function(){
return this.toString();
},
toString:function(){
return s("Mode");
}
},d=function(t){
return s({
Type:"SetSalt",
Salt:t
});
},u=function(t){
return s({
Type:"SelectRsaKey",
RsaKey:t
});
},h=function(){
return s("GetSha1Value");
},p=function(){
return s("GetSha1Value2");
},C=function(){
return s("GetSha1Value3");
},f=function(){
return s("GetRsaPassword");
},T=function(){
return s("GetRsaPassword2");
},N=function(){
return s("GetRsaPassword3");
},m=function(){
return s("GetRemitRSAPassword");
},S=function(){
return s("GetInputInfo");
},E=function(){
return s("ClearText");
},y=function(){
return s("SetEditFocus");
};
return{
ModuleDidLoad:i,
HandleMessage:o,
IsCtrlError:a,
Mode:l,
Version:c,
SetSalt:d,
SelectRsaKey:u,
GetSha1Value:h,
GetSha1Value2:p,
GetSha1Value3:C,
GetRsaPassword:f,
GetRsaPassword2:T,
GetRsaPassword3:N,
GetRemitRSAPassword:m,
GetInputInfo:S,
ClearText:E,
SetEditFocus:y
};
},TENPAYCTL.NACLQQCertCtrlSrc="https://www.tenpay.com/download/tenpaycert.nmf",TENPAYCTL.NACLQQCertCtrl=function(t){
var e,r=-1e3,n=t,i=function(t){
TENPAYCTL.NACL.checkPluginInstall()||TENPAYCTL.NACL.setPluginInstall(),e=document.getElementById(n),
r="undefined"!=typeof e?0:-1003,"function"==typeof t&&t(r);
},o=function(t,i){
{
var o=t.data.Message;
t.data.Value;
}
"Log"==o||("InitFinished"==o?(e=document.getElementById(n),r="undefined"!=typeof e?0:-1003,
"function"==typeof i&&i(r)):"InitError"==o&&(r=-1004,"function"==typeof i&&i(r)));
},s=function(t){
return a()?a():e.postMessageAndAwaitResponse(t);
},a=function(){
return r;
},c={
valueOf:function(){
return this.toString();
},
toString:function(){
return s("Version");
}
},l={
valueOf:function(){
return this.toString();
},
toString:function(){
return s("Mode");
}
},d={
valueOf:function(){
return this.toString();
},
toString:function(){
return s("HostName");
}
},u=function(t){
return s({
Type:"IsCertExist",
CertID:t
});
},h=function(t,e){
return s({
Type:"FindCert",
KeyName:t,
KeyValue:e
});
},p=function(t){
return s({
Type:"ImportCert",
Cert:t
});
},C=function(t){
return s({
Type:"DelCert",
CertID:t
});
},f=function(t,e){
return s({
Type:"CertSign",
CertID:t,
Base64Msg:e
});
},T=function(){
return s("GetCSR");
},N=function(t){
return s({
Type:"SetSubject",
Subject:t
});
},m=function(t,e){
return s({
Type:"SetChallenge",
UnstructuredName:t,
Challenge:e
});
},S=function(t){
return s({
Type:"Base64Encode",
Base64Src:t
});
},E=function(t){
return s({
Type:"Base64Decode",
Base64Enc:t
});
};
return{
ModuleDidLoad:i,
HandleMessage:o,
IsCtrlError:a,
Mode:l,
Version:c,
HostName:d,
IsCertExist:u,
FindCert:h,
ImportCert:p,
DelCert:C,
CertSign:f,
GetCSR:T,
SetSubject:N,
SetChallenge:m,
Base64Encode:S,
Base64Decode:E
};
};