/**
 * @Author: Raquel Jackson
 * @Date:   2018-08-28T19:02:10-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-09-15T22:47:09-06:00
 */
(function() {
    'use strict';
    angular
        .module('app')
        .factory('marcasStorage', MarcasStorage)
        .controller('MarcasCtrl', MarcasCtrl)
        .controller('NoteItemCtrl', NoteItemCtrl);

    MarcasStorage.$inject = ['ngStore'];
    function MarcasStorage(ngStore) {
        return ngStore.model('marcas');
    }

    MarcasCtrl = ['$scope', '$modal', '$stateParams', '$location', '$filter', 'ngStore', 'marcasStorage', '$http'];
    function MarcasCtrl($scope, $modal, $stateParams, $location, $filter, ngStore, marcasStorage, $http) {
        let vm = $scope;
        vm.brand = {};

        //loadingModal();

        vm.items = [];
        vm.allInventory = [
      {"itemCode": "1001", "itemName": "ARROZ PROGRESO", "weight": "175 GRMS.", "price": 0, "firmCode": 1, "active": 0},
      {"itemCode": "2001", "itemName": "ARROZ PROGRESO", "weight": "1 LBS", "price": 10.04, "firmCode": 1, "active": 1},
      {"itemCode": "101", "itemName": "ARROZ PROGRESO", "weight": "100LB", "price": 932, "firmCode": 1, "active": 1},
      {"itemCode": "102", "itemName": "ARROZ ORIGINAL RICE", "weight": "100 LBS.", "price": 982, "firmCode": 6, "active": 1},
      {"itemCode": "103", "itemName": "ARROZ CLASIFICADO BAPROSA", "weight": "100 LBS.", "price": 900, "firmCode": -1, "active": 1},
      {"itemCode": "104", "itemName": "ARROZ PERLITA", "weight": "100 LBS", "price": 860, "firmCode": 3, "active": 1},
      {"itemCode": "105", "itemName": "ARROZ SABROCITO", "weight": "100 LBS.", "price": 835, "firmCode": 4, "active": 1},
      {"itemCode": "108", "itemName": "ARROZ MORENO AMERICANO", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "110", "itemName": "ARROZ ESCALDADO", "weight": "100 LBS", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "111", "itemName": "ARROZ ESCALDADO GUMARSAL", "weight": "100 LBS", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "113", "itemName": "BLUE RIBBON", "weight": "100 LBS", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "114", "itemName": "BLUE RIBBON", "weight": "100 LBS", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "115", "itemName": "ARROZ SELECCIONADO ", "weight": " 100 LBS.", "price": 825, "firmCode": -1, "active": 1},
      {"itemCode": "116", "itemName": "ARROZ SABROSITO ROJO", "weight": "100 LBS", "price": 825, "firmCode": 5, "active": 1},
      // {"itemCode": "117", "itemName": "ARROZ SABROSITO VERDE", "weight": "100 LBS HF", "price": 825, "firmCode": 5, "active": 1},
      {"itemCode": "1701", "itemName": "ARROZ PROGRESO ", "weight": " 1,500 GRMS", "price": 35, "firmCode": 1, "active": 1},
      {"itemCode": "1702", "itemName": "ARROZ ORIGINAL", "weight": "1,500 GMS", "price": 35, "firmCode": 6, "active": 1},
      {"itemCode": "1703", "itemName": "ARROZ SULI", "weight": "1500 GRMS", "price": 28.4, "firmCode": 8, "active": 1},
      {"itemCode": "1704", "itemName": "ARROZ SULI ESCALDADO", "weight": "1,500 GRMS", "price": 33.2, "firmCode": 8, "active": 1},
      {"itemCode": "1705", "itemName": "SABEMAS PRECOCIDO", "weight": "1500 GRMS", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "1706", "itemName": "ARROZ SABROCITO ", "weight": " 1,500 GRMS", "price": 31, "firmCode": 4, "active": 1},
      {"itemCode": "1707", "itemName": "ARROZ SABROSITO 5 X 3 LIBRAS", "weight": "1500 gms", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "2002", "itemName": "ARROZ PROGRESO ", "weight": " 5*5 LBS", "price": 50.2, "firmCode": 1, "active": 1},
      {"itemCode": "2003", "itemName": "ARROZ PERLITA ", "weight": " 1 LB", "price": 9.24, "firmCode": 3, "active": 1},
      {"itemCode": "2004", "itemName": "ARROZ ORIGINAL ", "weight": " 1 LIBRA", "price": 10.8, "firmCode": 6, "active": 1},
      {"itemCode": "2005", "itemName": "ARROZ PROGRESO ", "weight": " 1 LB PS", "price": 9.52, "firmCode": 1, "active": 0},
      {"itemCode": "201", "itemName": "ARROZ PROGRESO ", "weight": " 25 LBS.", "price": 241, "firmCode": 1, "active": 1},
      {"itemCode": "202", "itemName": "ARROZ ORIGINAL ", "weight": " 25 LBS", "price": 255, "firmCode": 6, "active": 1},
      {"itemCode": "203", "itemName": "ARROZ PERLITA ", "weight": " 25 LBS.", "price": 221, "firmCode": 3, "active": 1},
      {"itemCode": "204", "itemName": "ARROZ SABROCITO ", "weight": " 25 LBS", "price": 216, "firmCode": 4, "active": 1},
      {"itemCode": "205", "itemName": "ARROZ CLASIFICADO BAPROSA", "weight": "25 LBS.", "price": 225, "firmCode": -1, "active": 1},
      {"itemCode": "207", "itemName": "ARROZ PROGRESO ", "weight": " 25 LBS PC", "price": 241, "firmCode": 1, "active": 0},
      {"itemCode": "208", "itemName": "ARROZ SABROSITO ROJO", "weight": "25 LBS", "price": 236, "firmCode": 5, "active": 1},
      {"itemCode": "2501", "itemName": "BLUE RIBBON PREC.", "weight": "2 X 12 UNDS", "price": 345.75, "firmCode": -1, "active": 1},
      {"itemCode": "2502", "itemName": "BLUE RIBBON PREC.", "weight": "5 X12 UNDS", "price": 811.45, "firmCode": -1, "active": 1},
      {"itemCode": "2503", "itemName": "BLUE RIBBON PREC.", "weight": "10 X 6 UNDS", "price": 821.95, "firmCode": -1, "active": 1},
      {"itemCode": "2504", "itemName": "BLUE RIBBON INTEGRAL", "weight": "2 X 12 UNDS", "price": 359.65, "firmCode": -1, "active": 1},
      {"itemCode": "301", "itemName": "ARROZ TIA EMELY ", "weight": " 8.75 KGS.", "price": 198, "firmCode": 2, "active": 1},
      {"itemCode": "302", "itemName": "ARROZ PROGRESO ", "weight": " 8.75 KGS", "price": 196, "firmCode": 1, "active": 1},
      {"itemCode": "303", "itemName": "ARROZ ORIGINAL RICE ", "weight": " 8.75 KGS.", "price": 205, "firmCode": 6, "active": 1},
      {"itemCode": "304", "itemName": "ARROZ PROGRESO ESCAL ", "weight": "8.75 KGS.", "price": 205, "firmCode": 7, "active": 1},
      {"itemCode": "4003", "itemName": "Arroz Oro", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "401", "itemName": "ARROZ TIA EMELY ", "weight": " 1.75 KGS.", "price": 39.6, "firmCode": 2, "active": 1},
      {"itemCode": "4019", "itemName": "Arroz Escaldado Centro America", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "402", "itemName": "ARROZ PROGRESO ", "weight": " 1.75 KGS", "price": 39.6, "firmCode": 1, "active": 1},
      {"itemCode": "4024", "itemName": "Arroz Escaldado Nacional.", "price": 0, "firmCode": -1, "active": 1},
      {"itemCode": "403", "itemName": "ARROZ ORIGINAL RICE ", "weight": " 1.75 KGS.", "price": 41, "firmCode": 6, "active": 1},
      {"itemCode": "404", "itemName": "ARROZ PROGRESO ESCAL", "weight": "1.75 KGS.", "price": 41, "firmCode": 7, "active": 1},
      {"itemCode": "405", "itemName": "ARROZ PROGRESO ", "weight": " 3 X 1.75 ( PACK)", "price": 37.6, "firmCode": -1, "active": 1},
      {"itemCode": "406", "itemName": "ARROZ PROGRESO ESCAL", "weight": "3 X 1.75 (PACK)", "price": 39, "firmCode": -1, "active": 1},
      {"itemCode": "407", "itemName": "ARROZ SABEMAS BLANCO", "weight": "1.75 KGS.", "price": 36.4, "firmCode": 8, "active": 1},
      {"itemCode": "408", "itemName": "ARROZ ESCALDADO SABE MAS", "weight": "1.75 KGS", "price": 38.6, "firmCode": 8, "active": 1},
      {"itemCode": "409", "itemName": "ARROZ PERLITA", "weight": "1.75 KGS", "price": 35.6, "firmCode": 3, "active": 1},
      {"itemCode": "410", "itemName": "ARROZ TIA EMELY 99% 3PACK", "weight": "1.75 KG", "price": 39.2, "firmCode": 2, "active": 1},
      {"itemCode": "501", "itemName": "ARROZ TIA EMELY ", "weight": " 350 GRMS", "price": 7.92, "firmCode": 2, "active": 1},
      {"itemCode": "502", "itemName": "ARROZ PROGRESO ", "weight": " 350 GRMS.", "price": 7.92, "firmCode": 1, "active": 1},
      {"itemCode": "503", "itemName": "ARROZ ORIGINAL ", "weight": " 350 GRMS", "price": 8.2, "firmCode": 6, "active": 1},
      {"itemCode": "504", "itemName": "ARROZ PROGRESO ESCAL ", "weight": "350 GRMS.", "price": 8.2, "firmCode": 7, "active": 1},
      {"itemCode": "505", "itemName": "ARROZ SABROCITO ", "weight": " 350 GRMS.", "price": 7, "firmCode": 4, "active": 1},
      {"itemCode": "506", "itemName": "ARROZ SABEMAS BLANCO", "weight": "350 GRMS", "price": 7.28, "firmCode": 8, "active": 1},
      {"itemCode": "507", "itemName": "ARROZ SABEMAS ESCALDADO", "weight": "350 GRMS", "price": 7.72, "firmCode": 8, "active": 1}
        ];



        //  var modal_loading;

        vm.loadPage = true;

        if ($stateParams.brand) {
            vm.brand = $stateParams.brand;

            vm.allInventory.forEach(function (val){
                if (val.firmCode === vm.brand.firmCode && !!val.active) {
                    vm.items.push(val);
                }
            });

            //modal_loading.hide();
        }

        vm.addCartModal = addCartModal;
        vm.loadingModal = loadingModal;

        function addCartModal(item) {
            var addCart_modal = $modal({
                title: 'Title',
                content: 'Hello Modal<br />This is a multiline message!',
                templateUrl: './apps/marcas/addCart_modal.html',
                show: true,
                locals: {
                    itemInfo: item
                },
                controller: function ($scope, itemInfo, $rootScope, $localStorage) {
                    var vm = $scope;

                    vm.item = itemInfo;

                    vm.item.quantity = 1;

                    vm.lessItems = function () {
                      vm.item.quantity -= 1;
                    }

                    vm.addItems = function () {
                      vm.item.quantity += 1;
                    }

                    vm.addShoppingCart = addShoppingCart;

                    function addShoppingCart() {
                        $rootScope.shoppingCart.push(vm.item);

                        $localStorage['Baprosa--shoppingCart'] = $rootScope.shoppingCart;

                        addCart_modal.hide();
                    }
                }
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

    NoteItemCtrl.$inject = ['$scope', 'noteStorage', '$state', '$stateParams'];
    function NoteItemCtrl($scope, noteStorage, $state, $stateParams) {
        var vm = $scope;
        vm.colors = ['white', 'indigo', 'pink', 'light-blue', 'amber', 'blue', 'green'];
        vm.item = noteStorage.find($stateParams);

        vm.$watch("item", function() {
            noteStorage.update($scope.item);
        }, true);

        vm.removeItem = removeItem;
        function removeItem(item){
            noteStorage.destroy(item);
            $state.go('app.note.list');
        }
    }





})();
