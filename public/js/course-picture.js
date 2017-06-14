/**
 * Created by Administrator on 2017/6/13.
 */
define(["jquery","template","util","upload","jcrop","form"], function ($, template, util) {
    //侧边栏选中
    util.setMenu("/course/course_add");
    var csId=util.qs("cs_id",location.search);
    $.ajax({
        type:"get",
        url:"/api/course/picture",
        data:{cs_id:csId},
        dataType:"json",
        success: function (data) {
            var html=template("coursePictureTpl",data.result);
            $("#coursePicture").html(html);
            //编辑时裁剪图片
            var preview=$("#preview img");
            //防止创建多个裁切实例对象
            var nowCrop=null;
            //文件上传   上传封面
            $("#upfile").uploadify({
                width:100,
                height:"auto",
                formData:{cs_id:csId},
                buttonText:"选择图片",
                buttonClass:"btn btn-success btn-sm",
                itemTemplate:"<span></span>",
                fileObjName:"cs_cover_original",
                swf : '/public/assets/upload/uploadify.swf',
                uploader:"/api/uploader/cover",
                onUploadSuccess: function (file,data) {
                    console.log(123);
                    data=JSON.parse(data);
                    $(".preview img").attr("src",data.result.path);
                    cropImg();
                }
            });

            //裁切图片功能
            function cropImg() {
                //实例对象存在    便销毁
                nowCrop && nowCrop.destory();
                //初始化裁切实例对象
                preview.Jcrop({
                    aspectRatio : 2
                }, function () {
                    nowCrop=this;
                    //缩略图
                    this.initComponent('Thumbnailer', {
                        width: 240,
                        height: 120,
                        thumb : '.thumb'
                    });
                    // 计算选区参数
                    var width = this.ui.stage.width,
                        height = this.ui.stage.height;
                    var x = 0;
                    y = (height - width/2)/2;
                    w = width;
                    h = width/2;
                    // 创建一个选区
                    this.newSelection();
                    // 设置选区的区域
                    this.setSelect([x,y,w,h]);
                    // 获取裁切尺寸
                    preview.parent().on('cropend',function(e, s, c) {
                        // 把选区的坐标信息放到表单里面，用来后续提交到后台
                        $('[name="x"]').val(c.x);
                        $('[name="y"]').val(c.y);
                        $('[name="w"]').val(c.w);
                        $('[name="h"]').val(c.h);
                    });
                    // 设置缩略图的位置
                    $('.jcrop-thumb').css({
                        top : 0,
                        left : 0
                    });
                });
            }
            
            //给裁切按钮绑定事件
            $("#cropImg").click(function () {
                var flag=$(this).attr("data-flag");
                if (flag=="1") {
                    $(this).attr("data-flag","2");
                    $(this).text("保存图片");
                    //裁切
                    cropImg();
                }else {
                    //提交裁切坐标
                    $("#cropInfoForm").ajaxSubmit({
                        type:"post",
                        data:{cs_id:csId},
                        url:"/api/course/update/picture",
                        success: function (data) {
                            if (data.code==200) {
                                location.href = "/course/lesson?cs_id=" + data.result.cs_id;
                            }
                        }
                    });
                }
            });
        }
    })
});
