/**
 * Created by Administrator on 2017/6/9.
 */
//���ؽ�ʦ�б�
define(["jquery","template","util","bootstrap"],function ($,template,util) {
    util.setMenu(location.pathname);
    $.ajax({
        type:"get",
        url:"/api/teacher",
        dataType:"json",
        success: function (data) {
            var html=template("teacherInfoTPL",{list:data.result});
            $("#teacherInfo").html(html);
            //��ѯ����
            previewTeacher();
            //ע������
            enableOrDisableTeacher();
        }
});
    //ʵ�ֲ�ѯ����
    function previewTeacher() {
        $(".preview").click(function () {
            var tcId=$(this).closest("td").attr("data-id");
            $.ajax({
                type:"get",
                url:"/api/teacher/view",
                data:{tc_id:tcId},
                dataType:"json",
                success: function (data) {
                    //console.log(data);
                    data.result.tc_hometown=data.result.tc_hometown.split("|").join(" ");
                    var html=template("teacherModalTpl",data.result);
                    //console.log(html);
                    $("#teacherModalInfo").html(html);
                    //��ʾ����
                    $("#teacherModal").modal();
                }
            });
            return false;
        });
    }
    //ʵ��ע�����ù���
    function enableOrDisableTeacher() {
        $(".edteacher").click(function () {
            var that=this;
            var td=$(this).closest("td");
            var tcId=td.attr("data-id");
            var tcStatus=td.attr("data-status");
            $.ajax({
                type:"post",
                url:"/api/teacher/handle",
                data:{tc_id:tcId,tc_status:tcStatus},
                dataType:"json",
                success: function (data) {
                    if (data.code==200) {
                        td.attr("data-status",data.result.tc_status);
                        if (data.result.tc_status==0) {
                            $(that).text("ע��");
                        }else {
                            $(that).text("����");
                        }
                    }
                }
            });
        });
    }

});