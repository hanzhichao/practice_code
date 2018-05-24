define("test/preview_test.js",["common/wx/preview.js"],function(i){
"use strict";
var e=i("common/wx/preview.js"),o=[{
imgsrc:"/cgi-bin/getimgdata?token=868515286&msgid=&mode=small&source=file&fileId=201279920&ow=-1",
downsrc:"/cgi-bin/downloadfile?token=868515286&fileid=201279920"
},{
imgsrc:"/cgi-bin/getimgdata?token=868515286&msgid=&mode=small&source=file&fileId=201258008&ow=-1",
downsrc:"/cgi-bin/downloadfile?token=868515286&fileid=201258008"
},{
imgsrc:"/cgi-bin/getimgdata?token=868515286&msgid=&mode=small&source=file&fileId=201236657&ow=-1",
downsrc:"/cgi-bin/downloadfile?token=868515286&fileid=201236657"
},{
imgsrc:"/cgi-bin/getimgdata?token=868515286&msgid=&mode=small&source=file&fileId=200959694&ow=-1",
downsrc:"/cgi-bin/downloadfile?token=868515286&fileid=200959694"
}],o=[{
imgsrc:"http://pic.33.la/20130217bz/691.jpg",
downsrc:"http://pic.33.la/20130217bz/691.jpg"
},{
imgsrc:"http://b.zol-img.com.cn/desk/bizhi/image/5/960x600/1411094266308.jpg",
downsrc:"http://b.zol-img.com.cn/desk/bizhi/image/5/960x600/1411094266308.jpg"
}];
$("#test").on("click",function(){
{
var i=$(this).attr("imgsrc"),c=$(this).attr("downsrc"),s=o||[{
imgsrc:i,
downsrc:c
}];
new e.show({
imgdata:s
});
}
});
});