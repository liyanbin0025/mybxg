/**
 * Created by Administrator on 2017/6/9.
 */
define(["jquery"], function ($) {
    return {
        setMenu: function (pathname) {
            $(".aside .navs a").removeClass("active");
            $('.aside .navs a[href="'+pathname+'"]').addClass("active");
        },
        qs: function (attr, param) {
            var p=param.substring(1);
            var arr= p.split("&");
            var renValue="";
            arr.forEach(function (ele, index) {
                var kv=ele.split("=");
                if (attr=kv[0]) {
                    renValue=kv[1];
                    //Ω· ¯—≠ª∑
                    return;
                }
            });
            return renValue;
        }
    }
});
