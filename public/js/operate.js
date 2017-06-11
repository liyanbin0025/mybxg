/**
 * Created by Administrator on 2017/6/10.
 */
define(["jquery", "util", "template"], function ($, util, template) {
    util.setMenu("/teacher/list");
    //获取tcId
    var tcId=util.qs("tc_id",location.search);
    //添加/修改 讲师
    function submitForm(url) {
        $("#addTeacherInfo").click(function () {
            $.ajax({
                type:"post",
                url:url,
                data:$("#teacherOperateInfo").serialize(),
                dataType:"json",
                success: function (data) {
                    if (data.code==200) {
                        location.href="/teacher/list";
                    }
                }
            });
        });
    }
    if (tcId) {
        //编辑 讲师操作
        $.ajax({
            type:"get",
            url:"/api/teacher/edit",
            data:{tc_id:tcId},
            dataType:"json",
            success: function (data) {
                $("#navFlag").html("讲师编辑");
                data.result.operateFlag="编辑";
                var html = template("operateTeacherTpl", data.result);
                $("#operateTeacher").html(html);
                //编辑 提交
                submitForm("/api/teacher/update");
            }
        });
    }else {
        //添加 讲师操作
        $("#navFlag").html("讲师添加");
        var html = template("operateTeacherTpl",{operateFlag:"添加",tc_gender:0});
        $("#operateTeacher").html(html);
        //添加  提交
         submitForm("/api/teacher/add");
    }

});
