/**
 * Created by Administrator on 2017/6/12.
 */
define(["jquery", "util","template","validate", "form"], function ($, util,template) {
    util.setMenu("/course/course_add");
    //ªÒ»°csId
    var csId=util.qs("cs_id",location.search);
    if (csId) {
        $.ajax({
            type:"get",
            url:"/api/course/basic",
            data:{cs_id:csId},
            dataType:"json",
            success: function (data) {
                var html=template("courseBasicTpl",data.result);
                $("#courseBasic").html(html);
            }
        });
    }else {
        var html=template("courseBasicTpl",{});
        $("#courseBasic").html(html);
    }

});
