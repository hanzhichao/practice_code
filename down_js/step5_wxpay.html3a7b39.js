define("tpl/wxverify/step5_wxpay.html.js",[],function(){
return'<!-- 认证step5微信支付 -->\n<div class="step5">\n{if (!order.status)}\n    <div class="area">\n        <div class="area_bd">\n            <h3 class="title">微信支付 {order.price}{order.currency}</h3>\n            <div class="qr_img_wrapper">\n                <img src="{qrcode_url}" alt="二维码" class="js_img_qrcode" style="display: none;">\n                <div class="js_div_mask">\n                    <div class="loading_qrcode"></div>\n                    <div class="qrcode_mask">\n                        <p class="js_div_loading"><i class="icon32_loading dark"></i></p>\n                        <a href="javascript:;" class="js_btn_refresh" style="display: none;">重新加载</a>\n                    </div>\n                </div>\n            </div>\n            <div class="msg_default_box">\n                <p>请使用微信扫描二维码以完成支付</p>\n            </div>\n        </div>\n        <div class="area_ft">\n            <p>\n                审核流程中还需进行对公账号/法人账号的小额打款验证，完成帐号审核一般需要1-5个工作日。{if (can_use_remit)}你也可以使用<a href="javascript:;" class="js_btn_show_remit">银行卡转账</a>完成支付。{/if}\n            </p>\n        </div>\n    </div>\n    <div class="tips">\n        <p>\n            微信认证费用是腾讯支付给第三方审核公司的服务费，为300元/次，每申请一次认证均需支付一次费用。<br/>\n            若认证失败，费用不予退还。审核中30天内有3次补充或重填机会，我司将通过公众平台通知中心进行通知，请您留意。        </p>\n    </div>\n    <div class="tool_bar tc border">\n        <a href="javascript:;" class="btn btn_default js_btn_pre">上一步</a>\n    </div>\n{else}\n    <div class="page_msg small default">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg waiting"></i>\n            </span>\n            <div class="msg_content">\n                <h4>支付成功，认证审核中</h4>\n                <p>完成帐号资质认证审核一般需要5个工作日。如有疑问，                <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=40012345&f=1&ty=1&ap=000011:400792:|m:12|f:400792:m:12" target="_blank">请联系客服</a></p>\n                <div class="btn_area">\n                    <!-- <a class="btn btn_default">返回上一步</a> -->\n                    <a class="btn btn_primary" href="{order_url}">查看订单</a>\n                </div>\n            </div>\n        </div>\n    </div>\n{/if}\n</div>';
});