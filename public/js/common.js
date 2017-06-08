
	//NProgress.start();
    //
	//NProgress.done();
    //
	//$('.navs ul').prev('a').on('click', function () {
	//	$(this).next().slideToggle();
	//});
	define(["jquery","cookie"], function ($) {
		$("#logout").click(function () {
			$.ajax({
				type: "post",
				url: "/api/logout",
				dataType: "json",
				success: function (data) {
					//Çå¿Õcookie
					//$.removeCookie("loginInfo",{path:"/"});
					location.href = "/login";
					//console.log($.cookie("loginInfo"));
				}
			});
			return false;
		});
		//console.log(location);
		var pathInfo=location.pathname;
		if (pathInfo!="/login"&& !$.cookie("PHPSESSID")) {
			location.href = "/login";
		}
		var loginInfo = $.cookie("loginInfo") && JSON.parse($.cookie("loginInfo"));
		if (loginInfo) {
			$("#info").find("img").attr("src",loginInfo.tc_avatar);
			$("#info").find("h4").html(loginInfo.tc_name);
		}
		//else if (pathInfo!="/login") {
		//	location.href = "/login";
		//}
	});