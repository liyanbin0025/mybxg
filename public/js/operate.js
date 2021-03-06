/**
 * Created by Administrator on 2017/6/10.
 */
define(["jquery", "util", "template","validate","form","datepicker","language"], function ($, util, template) {
    util.setMenu("/teacher/list");
    //获取tcId
    var tcId=util.qs("tc_id",location.search);
    //添加/修改 讲师
    function submitForm(url) {
        // 验证表单插件
        $("#teacherOperateInfo").validate({
            sendForm:false,
            eachInvalidField: function () {
                console.log(1);
            },
            eachValidField: function () {
                console.log(2);
            },
            valid: function () {
                console.log(3);
                //提交 表单    插件
                $(this).ajaxSubmit({
                    type:"post",
                    url:url,
                    success: function (data) {
                        location.href="/teacher/list";
                    }
                });

            },
            //描述
            description:{
                tcName:{
                    required:"姓名必须填写",
                    valid:"姓名格式正确"
                },
                tcPass:{
                    required:"密码不能为空",
                    pattern:"密码必须是六位数字",
                    valid:"密码可以使用"
                },
                tcJoinDate:{
                    required:"入职日期不能为空",
                    valid:"日期可以使用"
                }
            }
        });

        //$("#addTeacherInfo").click(function () {
        //    $.ajax({
        //        type:"post",
        //        url:url,
        //        data:$("#teacherOperateInfo").serialize(),
        //        dataType:"json",
        //        success: function (data) {
        //            if (data.code==200) {
        //                location.href="/teacher/list";
        //            }
        //        }
        //    });
        //});
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
