/**
 * Created by Administrator on 2017/6/12.
 */
define(["jquery", "util","template","ckeditor","validate", "form","validate","form"], function ($, util,template,CKEDITOR) {
    //侧边栏选中
    util.setMenu("/course/course_add");
    //获取csId
    var csId=util.qs("cs_id",location.search);
        $.ajax({
            type:"get",
            url:"/api/course/basic",
            data:{cs_id:csId},
            dataType:"json",
            success: function (data) {
                var html=template("courseBasicTpl",data.result);
                $("#courseBasic").html(html);
                //富文本 插件
                CKEDITOR.replace("editor");
                //课程添加或编辑
                var flag=util.qs("flag",location.search);
                if (flag==1) {
                    $("#operateInfo").html("课程编辑");
                }else {
                    $("#operateInfo").html("课程添加");
                }
                //处理 选课 联动
                $("#firstCategory").change(function () {
                    var cgId=$(this).find("option:selected").val();
                    $.ajax({
                        type:"get",
                        url:"/api/category/child",
                        data:{cg_id:cgId},
                        dataType:"json",
                        success: function (data) {
                            var tpl='{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                            var html=template.render(tpl,{list:data.result});
                            $("#secondCategory").html(html);
                        }
                    });
                });
                //保存  课程
                $("#formBasicInfo").validate({
                    sendForm:false,
                    valid: function () {
                        //更新富文本
                        for(var instance in CKEDITOR.instances){
                            CKEDITOR.instances[instance].updateElement();
                        }
                        //提交 表单    插件
                        $(this).ajaxSubmit({
                            type:"post",
                            data:{cs_id:csId},
                            url:"/api/course/update/basic",
                            success: function (data) {
                                console.log(data);
                                if (data.code==200) {

                                    location.href="/course/picture?cs_id="+data.result.cs_id;
                                }
                            }
                        });

                    }
                });

            }
        });
});
