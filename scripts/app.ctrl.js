/**
 * @Author: Raquel Jackson
 * @Date:   2018-08-28T19:08:14-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-09-10T07:35:30-06:00
 */



(function() {
    'use strict';
    angular
        .module('app')
        .value('omrc', [
            {firmCode: 1, firmName: "Arroz Progreso", path: "arroz-progreso"},
            {firmCode: 3, firmName: "Arroz Perlita", path: "arroz-perlita"},
            {firmCode: 4, firmName: "Sabrosito", path: "sabrosito"},
            {firmCode: 5, firmName: "Sabrosito Rojo", path: "sabrosito-rojo"},
            {firmCode: 6, firmName: "Original Rice Escaldado", path: "original-rice-escaldado"},
            {firmCode: 7, firmName: "Arroz Progreso Escaldado", path: "arroz-progreso-escaldado"}
        ])
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject  = ['$scope', '$modal', '$localStorage', '$sessionStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', 'omrc', '$state'];
    function AppCtrl($scope, $modal, $localStorage, $sessionStorage, $location, $rootScope, $anchorScroll, $timeout, $window, omrc, $state) {
        var vm = $scope;
        vm.isIE = isIE();
        vm.isSmart = isSmart();
        vm.loadBrand = loadBrand;
        vm.loadBaprosa = loadBaprosa;
        vm.isLogged = isLogged;
        vm.login = login;
        vm.logout = logout;
        // config
        vm.app = {
            name: 'Baprosa',
            version: '0.0.1',
            brands: omrc
        };

        function isLogged() {
            return angular.isDefined($localStorage['Baprosa-logged']) && !!$rootScope.logged.name;
        }

        var modal_login;

        function login () {
          modal_login = $modal({
              title: '',
              content: '',
              backdrop: 'static',
              keyboard: false,
              templateUrl: './apps/login/login/modal_login.html',
              show: true,
              controller: function ($scope, $http, $modal, $alert, $localStorage, $state, $rootScope) {
                let vm = $scope;

                vm.isLoader = false;

                var modal_loading;

                vm.user = {
                    cardCode: '',
                    password: ''
                };

                vm.frmLogin = frmLogin;

                function frmLogin() {
                    modal_login.hide();
                    loadingModal();
                    const url = "http://www.baprosa.com/api/login.php";

                    $http({
                        method: 'GET',
                        url: url,
                        params: vm.user
                    }).
                    success(function(response) {
                        if (response.success) {
                        $localStorage['Baprosa-logged'] = response;
                        $rootScope.logged = response;
                        modal_loading.hide();
                        $state.go('app.marcas');
                        } else {
                        modal_login.show();
                        modal_loading.hide();
                        var myAlert = $alert({
                            title: response.message,
                            content: '',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5,
                            show: true
                        });
                        }
                    }).
                    error(function(status) {
                        console.log(status);
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
          });
        }


        function logout() {
            $rootScope.logged = undefined;
            localStorage.removeItem('ngStorage-Baprosa-logged');
            $window.location.href = '/';
        }

        $rootScope.shoppingCart = [];
        $rootScope.logged = {};

        var shippingCart = vm.app.name+'-shoppingCart';
        // save settings to local storage
        if ( angular.isDefined($localStorage[shippingCart]) ) {
            $rootScope.shoppingCart = $localStorage[shippingCart];
        }

        if ( angular.isDefined($localStorage['Baprosa-logged']) ) {
            $rootScope.logged = $localStorage['Baprosa-logged'];
        }

        // watch changes
        $scope.$watch('shoppingCart', function(){
            $localStorage[shippingCart] = $rootScope.shoppingCart;
        }, true);

        $scope.$watch('logged', function(){
            if (!!$rootScope.logged.name) {
                $localStorage['Baprosa-logged'] = $rootScope.logged;
            }

        }, true);

        $scope.getClass = function (path) {
            var p = "/app" + path;
            return ($location.path() === p) ? 'active-link' : '';
        }


        getParams('bg') && (vm.app.setting.bg = getParams('bg'));


        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
            // goto top
            $location.hash('content');
            $anchorScroll();
            $location.hash('');
            // hide open menu
            $('#aside').modal('hide');
            $('body').removeClass('modal-open').find('.modal-backdrop').remove();
            $('.navbar-toggleable-sm').collapse('hide');
        };

        vm.goBack = function () {
            $window.history.back();
        };

        function isIE() {
            return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function loadBrand(brand) {
            $state.go('app.marcas', {brand: brand});
        }

        function loadBaprosa(type) {
            //$state.go('app.baprosa', {type: type});
            console.log(type);

            if ($state.current.url !== '/baprosa') {
                //$state.transitionTo('app.baprosa', {type: type});
            }

            $state.go('app.baprosa', {type: type}   );

        }
    }
})();
