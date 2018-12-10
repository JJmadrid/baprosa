/**
 * @Author: Raquel Jackson
 * @Date:   2018-08-30T07:47:24-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-09-12T23:07:49-06:00
 */
(function () {
    'use strict';
    angular
        .module('app')
        .run(runBlock)
        .config(config);

    runBlock.$inject = ['$rootScope', '$state', '$stateParams'];

    function runBlock($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function config($stateProvider, $urlRouterProvider, MODULE_CONFIG) {

        var p = getParams('layout'),
            l = p ? p + '.' : '',
            layout = 'apps/layout.html',
            dashboard = '../views/dashboard/dashboard.' + l + 'html';

        $urlRouterProvider.otherwise('/app/index');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                views: {
                    '': {
                        templateUrl: layout
                    }
                },
                resolve: load(["mgcrea.ngStrap"]),
                /*onEnter: function ($http, omrc) {
                    const url = "http://www.baprosa.com/api/omrc.php";

                    $http.get(url, {
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).success(function(response) {
                        var brands = [];

                        response.forEach(function (val) {
                            if (!!val.firmName && val.firmCode !== 8) {
                                var path = val.firmName.toLowerCase();

                                brands.push({
                                    firmCode: val.firmCode,
                                    firmName: val.firmName,
                                    path: path.split(' ').join('-')
                                });
                            }
                        });
                        omrc = brands;
                    }).error(function(status) {
                        console.error(status);
                    });
                }*/
            })
            .state('app.index', {
                url: '/index',
                templateUrl: 'apps/index.html',
                data: {title: 'Index'},
                onEnter: function () {
                    console.log("hola");
                }
            })
            .state('app.login', {
                url: '/login',
                templateUrl: 'apps/login/login/login.html',
                data: {title: 'Login'},
                controller: 'LoginCtrl',
                resolve: load(['apps/login/login/login.js'])
            })
            .state('app.profile', {
                url: '/profile',
                templateUrl: 'apps/profile/profile.html',
                data: {title: 'Perfil'},
                controller: function ($scope, $state, $modal, $rootScope, $http, $localStorage) {
                    var vm = $scope;

                    var modal_loading;
                    vm.saveProfile = saveProfile;

                    if (!$rootScope.logged || !$rootScope.logged.cardCode) {
                        $state.go('app.marcas');
                    }

                    function saveProfile() {
                        var userData = {};

                        for (const prop in $rootScope.logged) {
                            if($rootScope.logged[prop] !== undefined ){
                                userData[prop] = $rootScope.logged[prop];
                            }
                        }

                        const url = "http://www.baprosa.com/api/updateUser.php";

                        let data = userData;

                        loadingModal();

                        $http.post(url, data, {headers : {
                                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                            }}).success(function(response) {

                            if (response.success) {
                                modal_loading.hide();



                                $localStorage['Baprosa-logged'] = response;
                                $rootScope.logged = response;

                            } else {
                                modal_loading.hide();
                            }
                        }).
                        error(function(status) {
                            console.error(status);
                            //your code when fails
                        });
                    }
                    function loadingModal() {
                        modal_loading = $modal({
                            title: '',
                            content: '',
                            backdrop: 'static',
                            keyboard: false,
                            templateUrl: './apps/modal_loading.html',
                            show: true
                        });
                    }
                }
            })
            .state('app.marcas', {
                url: '/marcas',
                templateUrl: 'apps/marcas/arroz.html',
                data: {title: 'Marcas'},
                controller: 'MarcasCtrl',
                params: {
                    brand: {firmCode: 1, firmName: "Arroz Progreso", path: "arroz-progreso"}
                },
                resolve: load([ 'moment'])
            })

            .state('app.baprosa', {
                url: '/baprosa',
                templateUrl: 'apps/baprosa/main.html',
                data: {title: 'Baprosa'},
                params: {type: 1},
                resolve: load(["./libs/js/plugins.js", "./libs/js/functions.js"]),
                controller: function ($scope, $stateParams, $rootScope) {
                    var vm = $scope;
                    vm.section = 1;

                    vm.showPage = showPage;

                    $rootScope.$on('$locationChangeStart',function(){
                        console.log('$locationChangeStart called');
                    });

                    $scope.$watch(function () {
                        return $stateParams.tabId;
                    }, function (newParams, oldParams) {
                        console.log(newParams, oldParams);
                        if (newParams !== oldParams) {
                            alert('Hey, I have been changed!');
                        }
                    });

                    function showPage(type) {
                        return type === $stateParams.type;
                    }

                }
            })
            .state('app.baprosa.historia', {
                url: '/historia',
                //templateUrl: 'apps/baprosa/historia.html',
                data: {title: 'Historia'},
                controller: function($scope) {
                    var vm = $scope;

                    vm.type = 1;
                }
            })

            .state('app.carrito', {
                url: '/carrito',
                templateUrl: 'apps/carrito-compra/carrito-compra.html',
                data: {title: 'Carrito de compra'},
                controller: "ShoppingCartCtrl",
                resolve: load(['apps/carrito-compra/carrito-compra.js'])
            })

            .state('app.eventos', {
                url: '/eventos',
                templateUrl: 'apps/eventos/eventos.html',
                data: {title: 'Eventos'},
                controller: "Eventos_ctrl"
            })

            .state('app.contactanos', {
                url: '/contactanos',
                templateUrl: 'apps/contactanos.html',
                data: {title: 'Gmap', hideFooter: true},
                controller: function ($scope, $http, $modal, $rootScope) {
                    var vm = $scope;

                    var modal_loading;
                    var success_modal;



                    /*setTimeout(function(){
                        modal_strip.hide();
                    }, 3000);*/

                    vm.comment = {
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    };

                    vm.sendComment = sendComment;

                    function sendComment() {
                        const url = "http://www.baprosa.com/api/contactanos.php";

                        let data = vm.comment;

                        loadingModal();

                        $http.post(url, data, {headers : {
                                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                            }}).success(function(response) {

                            if (response.success) {
                              vm.comment = {
                                  name: '',
                                  email: '',
                                  phone: '',
                                  message: ''
                              };

                                successModal();
                                modal_loading.hide();

                                setTimeout(function(){
                                  success_modal.hide();
                                }, 3000);





                            } else {
                                modal_loading.hide();
                            }
                        }).
                        error(function(status) {
                            console.error(status);
                            //your code when fails
                        });
                    }

                    function loadingModal() {
                        modal_loading = $modal({
                            title: '',
                            content: '',
                            backdrop: 'static',
                            keyboard: false,
                            templateUrl: './apps/modal_loading.html',
                            show: true
                        });
                    }

                    function successModal () {
                      success_modal = $modal({
                          title: 'Comentario guardado',
                          content: '',
                          templateUrl: './apps/success_modalComment.html',
                          show: true,
                          backdrop: 'static',
                          keyboard: false,
                        });
                    }
                }
            })
        ;

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function (src) {
                            promise = promise.then(function () {
                                angular.forEach(MODULE_CONFIG, function (module) {
                                    if (module.name == src) {
                                        src = module.module ? module.name : module.files;
                                    }
                                });
                                return $ocLazyLoad.load(src);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function () {
                            return callback();
                        }) : promise;
                    }]
            }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }
})();
