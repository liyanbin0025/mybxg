/**
 * Created by Administrator on 2017/6/14.
 */
define(["jquery","template","util","bootstrap","form"], function ($, template,util) {
    //侧边栏选中
    util.setMenu("/course/course_add");
    //渲染页面
    var csId=util.qs("cs_id",location.search);
    $.ajax({
        type:"get",
        data:{cs_id:csId},
        url:"/api/course/lesson",
        dataType:"json",
        success: function (data) {
            var html=template("courseLessonTpl",data.result);
            $("#courseLesson").html(html);
            //添加课时
            $("#lessonAdd").click(function () {
                //渲染页面
                var html=template("editLessonTpl",{});
                $("#chapterModal").html(html);
                $("#chapterModal").modal();
                $("#al").text("课时添加");
                //添加提交
                $("#lessonAddBtn").click(function () {
                    $("#lessonModal").ajaxSubmit({
                        type:"post",
                        data:{ct_cs_id:csId,ct_is_free:$(".freeLesson:checked").size()==1?1:0},
                        url:"/api/course/chapter/add",
                        success:function (data) {
                            if (data.code==200) {
                                location.reload();
                            }
                        }
                    });
                });
            });
            //编辑课时
            $(".lessonEdit").click(function () {
                var ctId=$(this).attr("data-flag");
                console.log(ctId);
                $.ajax({
                    type:"get",
                    url:"/api/course/chapter/edit",
                    data:{ct_id:ctId},
                    dataType:"json",
                    success: function (data) {
                        //渲染页面
                        var html=template("editLessonTpl",data.result);
                        $("#chapterModal").html(html);
                        $("#chapterModal").modal();
                        $("#al").text("课时编辑");
                        //编辑提交
                        $("#lessonAddBtn").click(function () {
                            $("#lessonModal").ajaxSubmit({
                                type:"post",
                                data:{ct_cs_id:csId,ct_id:ctId,ct_is_free:$(".freeLesson:checked").size()==1?1:0},
                                url:"/api/course/chapter/modify",
                                success:function (data) {
                                    if (data.code==200) {
                                        location.reload();
                                    }
                                }
                            });
                        });
                    }
                });
            });
        }

    });
});
