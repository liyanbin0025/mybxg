requirejs.config({
    baseUrl:"/public/assets",
    paths:{
        jquery:"jquery/jquery.min",
        bootstrap:"bootstrap/js/bootstrap.min",
        upload:"upload/jquery.uploadify.min",
        common:"../js/common",
        region:"jquery-region/jquery.region",
        ckeditor:"ckeditor/ckeditor",
        //echarts:"echarts/echarts.min",
        login:"../js/login",
        util:"../js/util",
        index:"../js/index",
        cookie:"jquery-cookie/jquery.cookie",
        template:"artTemplate/template-web",
        nprogress:"nprogress/nprogress",
        form:"jquery-form/jquery.form",
        validate:"validate/jquery-validate.min",
        datepicker:"bootstrap-datepicker/js/bootstrap-datepicker.min",
        language:"bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        teacher_list:"../js/teacher",
        teacher_operate:"../js/operate",
        settings:"../js/settings",
        courseadd:"../js/course-add",
        coursebasic:"../js/course-basic",
        courselist:"../js/course-list"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        validate:{
            deps:["jquery"]
        },
        language:{
            deps:["jquery","datepicker"]
        },
        upload:{
            deps:["jquery"]
        },
        ckeditor:{
            exports : 'CKEDITOR'
        }
    }
});
