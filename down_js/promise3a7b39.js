define("biz_web/lib/webuploader/promise.js",[],function(){
return{
Deferred:$.Deferred,
when:$.when,
isPromise:function(e){
return e&&"function"==typeof e.then;
}
};
});