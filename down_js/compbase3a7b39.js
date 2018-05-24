define("biz_web/lib/webuploader/runtime/compbase.js",[],function(){
function t(t,i){
this.owner=t,this.options=t.options,this.getRuntime=function(){
return i;
},this.getRuid=function(){
return i.uid;
},this.trigger=function(){
return t.trigger.apply(t,arguments);
};
}
return t;
});