/**
 * Created by Administrator on 2017/6/12.
 */
define(["jquery", "util", "validate", "form"], function ($, util) {
    util.setMenu(location.pathname);
    $("#courseAddForm").validate({
        sendForm: false,
        valid: function () {
            //提交 表单    插件
            $(this).ajaxSubmit({
                type: "post",
                url: "/api/course/create",
                success: function (data) {
                    location.href = "/course/basic?cs_id="+ data.result.cs_id;
                }
            });
        }
    });
});
