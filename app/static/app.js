angular.module("main", ["ngRoute", "ngMaterial", "ngAria", "ui.router"])
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    })
    .config(function ($routeProvider, $httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {

        var routes = [
            'home'
        ];

        routes.forEach(function (route) {
            setRoutes(route);
        });

        function setRoutes(route) {
            var state = route,
                config = {
                    url: "/" + route,
                    templateUrl: "templates/" + route + ".html",
                    controller: route
                };
            $stateProvider.state(state, config);
            return $stateProvider;
        }

        $urlRouterProvider.otherwise('404');
        $stateProvider
            .state('main', {
                url: '',
                templateUrl: "/templates/home.html",
                controller: 'home'
            })
            .state('/home', {
                url: '/home',
                templateUrl: "/templates/home.html",
                controller: 'home'
            })
            .state('404', {
                url: '/404',
                templateUrl: '/templates/404.html'
            })
    })
    .controller('main',
        function ($scope, $http, $rootScope) {
            $scope.menuactive = 2;
            $(".menu").click(function () {
                $(".navlinks_mob").toggleClass("active");
                if ($scope.menuactive == 2) {
                    console.log(false);
                    $scope.$apply(function () {
                        $scope.menuactive = 1;
                    })
                } else {
                    console.log(true);
                    $scope.$apply(function () {
                        $scope.menuactive = 2;
                    })
                }
            });

            $scope.selectchoice = function(i){
                $scope.influencerchoices[i].active = !$scope.influencerchoices[i].active;
            }

            $scope.influencerchoices = [
                {
                    'name':'Fashion',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Health & Fitness',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Technology',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Home Interior',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Travel',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Family',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Business & Finance',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Food & Drink',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Skincare',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                {
                    'name':'Beauty',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                    {
                    'name':'Sport',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
                    {
                    'name':'Photography',
                    'active':false,
                    'url':'/static/assets/social/image'
                },
            ]
        })

    .controller('home',
        function ($timeout, $q, $scope, $http, $sce, $templateCache, $rootScope, $mdDialog, $element) {

            $scope.active_carousel = 1;
            $scope.changecarousol = function(i){
                $scope.active_carousel = i;
            }
            
            $rootScope.getParameterByName = function (name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }

            if (window.location.href.indexOf('?page=') > 0) {
                var value = $rootScope.getParameterByName("page");
                if (value = "register_with_institute") {
                    var user = $rootScope.getParameterByName("user");
                    $scope.user_id = user;
                    $scope.field = 3;
                }
            }


        })

    .filter('where', function () {
        var matchProperty;
        matchProperty = function (obj, key, shouldEqual) {
            var value;
            value = obj[key];
            if (angular.isFunction(value)) {
                value = value.call(obj);
            }
            return value === shouldEqual;
        };
        return function (input, properties) {
            var i, k, r, v;
            r = input.slice(0);
            for (k in properties) {
                v = properties[k];
                i = 0;
                while (i < r.length) {
                    if (matchProperty(r[i], k, v)) {
                        i++;
                    } else {
                        r.splice(i, 1);
                    }
                }
                if (!r.length) {
                    return r;
                }
            }
            return r;
        };
    })