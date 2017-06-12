/**
 * Created by Administrator on 2017/6/12.
 */
define(["jquery","util","template"], function ($,util,template) {
    util.setMenu(location.pathname);
    $.ajax({
        type:"get",
        url:"/api/course",
        dataType:"json",
        success: function (data) {
            console.log(data);
            var html=template("courseListTpl",{list:data.result});
            $("#courseList").html(html);
        }
    });
});
