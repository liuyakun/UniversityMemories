/**
 * Created by 刘亚坤 on 2016/8/16.
 */
define(['angular','routes','../script/service/dependencyResolverFor','angularResource','angularRoute','bootstrap','bootstrapDateTimePicker','bootstrapDateTimePickerCN','zTreeCore','zTreeExcheck'], function(angular,config, dependencyResolverFor)
{
    var app = angular.module('app', [ 'ngResource', 'ngRoute']);
    app.config(
        [
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',

            function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
            {
                app.controller = $controllerProvider.register;
                app.directive  = $compileProvider.directive;
                app.filter     = $filterProvider.register;
                app.factory    = $provide.factory;
                app.service    = $provide.service;

                $locationProvider.html5Mode(true);

                if(config.routes !== undefined)
                {
                    angular.forEach(config.routes, function(route, path)
                    {
                        $routeProvider
                            .when(path, {templateUrl:route.templateUrl, resolve:dependencyResolverFor(route.dependencies)});
                    });
                }

                if(config.defaultRoutePath !== undefined)
                {
                    $routeProvider.otherwise({redirectTo:config.defaultRoutePath});
                }
            }
        ]);

    return app;
});