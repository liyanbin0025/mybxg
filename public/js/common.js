
	//NProgress.start();
    //
	//NProgress.done();

	define(["jquery","template","nprogress","cookie"], function ($,template,nprogress) {
		//�������˵���չ�����۵�
		$('.navs ul').prev('a').on('click', function () {
			$(this).next().slideToggle();
		});
		//�˳�
		$("#logout").click(function () {
			$.ajax({
				type: "post",
				url: "/api/logout",
				dataType: "json",
				success: function (data) {
					//���cookie
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
			//����������
			var infoTPL='<div class="avatar img-circle"><img src="{{tc_avatar}}"> </div><h4>{{tc_name}}</h4>';
            var html=template.render(infoTPL,loginInfo);
            $("#info").html(html);
			//$("#info").find("img").attr("src",loginInfo.tc_avatar);
			//$("#info").find("h4").html(loginInfo.tc_name);
		}
		else if (pathInfo!="/login") {
			location.href = "/login";
		}

		//�ڵ���
		$(document).ajaxStart(function () {
			$(".overlay").show();
		});
		$(document).ajaxStop(function () {
			$(".overlay").hide();
		});
		//������
		nprogress.start();
		nprogress.done();
	});