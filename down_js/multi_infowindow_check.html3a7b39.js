define("tpl/sosomap/multi_infowindow_check.html.js",[],function(){
return'<!--地图上标识后的编辑地理位置的小tip-->\n<!--状态-->\n<!--\n<span class="state review r">审核中</span>\n<span class="state pass r">已通过</span>\n-->\n<!--状态end-->\n\n<!--地图上标识后的显示地理位置的小tip-->\n<div class="map_tip">\n	<div class="content">\n		<!--状态这里，pass是已通过，review是审核中-->\n		<p class="title">{userInfo.name}\n			{if poiStatus*1<=2}\n			<span class="state review r">{poiStatusName[poiStatus]}</span>\n			{else if poiStatus*1>2 }\n			<span class="state edit r"><a href="javascript:void(0);" qn="edit">编辑</a></span>\n			<span class="state delet r"><a href="javascript:void(0);" qn="delete">删除</a></span>\n			{/if}\n		</p>\n		{if !!address.finalAddress}\n		<p class="dec adr">{address.province||""}{address.city||""}{address.district||""}{address.finalAddress||""}</p>\n		{else}\n		<p class="dec adr">未知地址</p>\n		{/if}		\n		<p class="dec phone">{userInfo.tel}</p>\n	</div>\n</div>\n<!--地图上标识后的编辑地理位置的小tip end-->';
});