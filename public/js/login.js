define(["jquery","cookie"], function ($) {
    $("#login").click(function () {
        $.ajax({
            type:"post",
            url:"/api/login",
            data:$("#forminfo").serialize(),
            dataType:"json",
            success:function (data) {
                if (data["code"]==200) {
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
                    location.href="/index/index";
                }
            }
        });
        return false;
    });
});
