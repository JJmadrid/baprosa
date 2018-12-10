(function() {
    'use strict';
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$http', '$modal', '$alert', '$localStorage', '$state', '$rootScope'];
    function LoginCtrl($scope, $http, $modal, $alert, $localStorage, $state, $rootScope) {
        let vm = $scope;

        var modal_loading;

        vm.user = {
            cardCode: '',
            password: ''
        };

        if ( angular.isDefined($localStorage['Baprosa-logged']) ) {
            $state.go('app.marcas');
        }

        vm.login = login;

        function login() {
            loadingModal();
            const url = "http://www.baprosa.com/api/login.php";

            $http({
                method: 'GET',
                url: url,
                params: vm.user
            }).
            success(function(response) {
                console.log(response);

                if (response.success) {
                    $localStorage['Baprosa-logged'] = response;
                    $rootScope.logged = response;

                    modal_loading.hide();

                    $state.go('app.marcas');
                } else {
                    modal_loading.hide();

                    var myAlert = $alert({
                        title: response.message,
                        content: '',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5,
                        show: true,

                    });
                }
            }).
            error(function(status) {
                console.log(status);
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

        //const url = "http://www.baprosa.com/tester.php";


        /*var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("demo").innerHTML = this.getAllResponseHeaders();
                console.log(this.getAllResponseHeaders());
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();*/


    }




})();








