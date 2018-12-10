(function() {
    'use strict';
    angular
        .module('app')
        .controller('Eventos_ctrl', Eventos_ctrl);

    Eventos_ctrl.$inject = ['$scope', '$http'];
    function Eventos_ctrl($scope, $http) {
        let vm = $scope;

        vm.event = {
            title: "",
            message: ""
        }
    }


})();
