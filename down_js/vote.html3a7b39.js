define("tpl/vote/vote.html.js",[],function(){
return'<div class="tc_dialog_content vote_container">\n    <form id="voteForm">\n		<div class="vote_meta">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label">投票名称</label>\n					<div class="frm_controls">\n						<span class="frm_input_box with_counter counter_in append vote_title"><input autofocus="" type="text" placeholder="" class="frm_input" name="vote_title" id=""><em class="frm_input_append frm_counter">0/35</em></span>\n						<p class="frm_tips">投票名称只用于管理，不显示在下发的投票内容中</p>\n					</div>\n				</div>\n	        </div>\n	    </div>\n	\n		<div class="vote_meta time_setting">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label">截止时间</label>\n					<div class="frm_controls">\n						<div class="date_select timepicker">\n							<div class="datepicker_area">\n								<span class="btn datepicker_switch">\n									<input type="text" class="frm_input" style="ime-mode:disabled" onpaste="return false" id="jsVoteDate">\n									<i class="icon_datepicker"></i>\n								</span>\n							</div>\n							<!-- <div id="js_begin_time_container"><div class="ta_date">\n								<span class="date_title" id=""></span>\n								<a class="opt_sel" id="" href="#">\n									<i class="i_orderd"></i>\n								</a>\n							</div></div> -->\n							<div class="dropdown_menu time" id="jsVoteHour"></div>\n							<span class="date_select_gap">时</span>\n\n							<div class="dropdown_menu time" id="jsVoteMin"></div>\n							<span class="date_select_gap">分</span>\n						</div>\n					</div>\n				</div>\n	        </div>\n	    </div>\n		<div class="vote_meta js_vote_auth">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label frm_label_top">投票权限</label>\n					<div class="frm_controls">\n						<span type="label_content">所有人都可参与</span>\n					</div>\n				</div>\n	        </div>\n	    </div>\n		 <p class="frm_tips frm_tips_btm">上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M  </p>\n	</form>		\n	   \n	<div class="">\n		<div class="vote_meta_container js_question_container">\n			\n		</div>\n		<div class="vote_container_dec">\n			<a class="btn btn_default btn_add btn_vote_add" href="javascript:;" id="js_add_question"><i class="icon14_common add_gray"></i>添加问题</a>\n                        <!--#0001#--> \n			<p id="js_error" style="display:none;" class="frm_tips">问题填写完整才能添加下一个问题</p>\n                        <!--%0001%-->\n			<!--<div id="js_error" style="display:none;" class="bubble_tips bubble_left warn">\n				<div class="bubble_tips_inner">\n					<p>问题填写完整才能添加下一个问题</p>\n				</div>\n				<i class="bubble_tips_arrow out"></i>\n				<i class="bubble_tips_arrow in"></i>\n			</div>-->\n		</div>\n	</div>\n   \n</div>\n';
});