/**
 * Created by Administrator on 2017/6/11.
 */
define(["jquery","template","ckeditor","util","datepicker","language","upload","region","validate","form"], function ($,template,CKEDITOR,util) {
    util.setMenu("/index/index");
    //渲染页面
    $.ajax({
        type:"get",
        url:"/api/teacher/profile",
        dataType:"json",
        success: function (data) {
            //console.log(data.result.tc_birthday);
            var html=template("settingsInfoTpl",data.result);
            $("#settingsInfo").html(html);
            //文件上传   头像上传    有点问题
            $("#upfile").uploadify({
                width:"120",
                height:"120",
                buttonText:"",
                itemTemplate:"<span></span>",
                fileObjName:"tc_avatar",
                swf : '/public/assets/upload/uploadify.swf',
                uploader:"/api/uploader/avatar",
                onUploadSuccess: function (file,data) {
                    console.log(123);
                    data=JSON.parse(data);
                    $("#preview img").attr("src",data.result.path);
                }
            });
            //省市区三级联动
            $("#hometown").region({
                url: "/public/assets/jquery-region/region.json" // 省市县接口
            });
            //富文本 插件
            CKEDITOR.replace("editor");
            //表单提交
            $("#settingsForm").validate({
                sendForm:false,
                valid: function () {
                    //更新富文本
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //处理省市县
                    var p=$("#p option:selected").text();
                    var c=$("#c option:selected").text();
                    var d=$("#d option:selected").text();
                    var hometown=p+"|"+"c"+"|"+d;
                    //提交 表单    插件
                    $(this).ajaxSubmit({
                        type:"post",
                        data:{tc_hometown:hometown},
                        url:"/api/teacher/modify",
                        success: function (data) {
                            //重新加载页面
                            location.reload();
                        }
                    });

                },
            });
        }
    });

});
