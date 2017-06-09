
	//NProgress.start();
    //
	//NProgress.done();

	define(["jquery","template","nprogress","cookie"], function ($,template,nprogress) {
		//控制左侧菜单的展开和折叠
		$('.navs ul').prev('a').on('click', function () {
			$(this).next().slideToggle();
		});
		//退出
		$("#logout").click(function () {
			$.ajax({
				type: "post",
				url: "/api/logout",
				dataType: "json",
				success: function (data) {
					//清空cookie
					$.removeCookie("loginInfo",{path:"/"});
					location.href = "/login";
					//console.log($.cookie("loginInfo"));
				}
			});
			return false;
		});
		//console.log(location);
		var pathInfo=location.pathname;
		//if (pathInfo!="/login"&& !$.cookie("PHPSESSID")) {
		//	location.href = "/login";
		//}
		var loginInfo = $.cookie("loginInfo") && JSON.parse($.cookie("loginInfo"));
		if (loginInfo) {
			var infoTPL='<div class="avatar img-circle"><img src="{{tc_avatar}}"> </div><h4>{{tc_name}}</h4>';
            var html=template.render(infoTPL,loginInfo);
            $("#info").html(html);
			//$("#info").find("img").attr("src",loginInfo.tc_avatar);
			//$("#info").find("h4").html(loginInfo.tc_name);
		}
		else if (pathInfo!="/login") {
			location.href = "/login";
		}

		//遮挡层
		$(document).ajaxStart(function () {
			$(".overlay").show();
		});
		$(document).ajaxStop(function () {
			$(".overlay").hide();
		});
		//进度条
		nprogress.start();
		nprogress.done();
	});