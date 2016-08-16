requirejs.config({
    paths:{
        angular:"/script/lib/angular/angular.min",
        jquery:'/script/lib/jquery/dist/jquery.min',
        angularResource: "/script/lib/angular-resource/angular-resource.min",
        angularRoute:"/script/lib/angular-route/angular-route.min",
        bootstrap: "/script/lib/bootstrap/dist/js/bootstrap.min",
        ajaxfileupload: "/script/lib/ajaxfileupload/ajaxfileupload.min",
        md5:"/script/lib/js-md5/js/md5.min",
        bootstrapDateTimePicker:"/script/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
        bootstrapDateTimePickerCN:"/script/lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        flot:"/script/lib/flot/jquery.flot",
        sceditor: "/script/lib/SCEditor/minified/jquery.sceditor.bbcode.min",
        zTreeCore: "/script/lib/zTree_v3/js/jquery.ztree.core.min",
        zTreeExcheck: "/script/lib/zTree_v3/js/jquery.ztree.excheck.min",
    },
    shim:{
        jquery: { exports: '$' },
        bootstrap: ['jquery'],
        angular: { exports: 'angular',deps:['jquery']},
        angularResource: ['angular'],
        angularRoute:['angular'],
        ajaxfileupload:['jquery'],
        bootstrapDateTimePicker:['bootstrap'],
        bootstrapDateTimePickerCN:['bootstrapDateTimePicker'],
        flot:['jquery'],
        sceditor: ['jquery'],
        zTreeCore: ['jquery'],
        zTreeExcheck: ['jquery','zTreeCore']
    }
});


require
(
    [
        'angular','app','../viewBA/indexCtrl','../script/service/baService','../script/filter/filterBA'
    ],
    function(angular)
    {
        angular.bootstrap(document, ['app']);
    }
);

