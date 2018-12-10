/**
 * @Author: Raquel Jackson
 * @Date:   2018-08-28T19:08:14-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-09-12T07:39:49-06:00
 */
(function() {
    'use strict';
    angular
        .module('app')
        .controller('ShoppingCartCtrl', ShoppingCartCtrl);

    ShoppingCartCtrl = ['$scope', '$rootScope', '$localStorage', '$modal'];
    function ShoppingCartCtrl($scope, $rootScope, $localStorage, $modal) {
        let vm = $scope;

        $rootScope.shoppingCart =  $localStorage['Baprosa--shoppingCart'];

        vm.getTotalQuantity = getTotalQuantity;
        vm.removeShoppingCart = removeShoppingCart;
        vm.lessQuantity = lessQuantity;
        vm.addQuantity = addQuantity;
        vm.itemTotal = itemTotal;
        vm.orderTotal = orderTotal;
        vm.confirmModal = confirmModal;

        function getTotalQuantity() {
            var totalQuantity = 0;

            $rootScope.shoppingCart.forEach(function (val) {
                totalQuantity += val.quantity;
            });

            return totalQuantity;
        }
        function removeShoppingCart(index) {
            $rootScope.shoppingCart.splice(index, 1);
            $localStorage['Baprosa--shoppingCart'] = $rootScope.shoppingCart;
        }
        function lessQuantity (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
        }
        function addQuantity (item) {
            item.quantity += 1;
        }
        function itemTotal(item) {
            return (item.quantity * item.price).toFixed(2);
        }
        function orderTotal(item) {
            vm.totalQuantity = 0;

            $rootScope.shoppingCart.forEach(function (val) {
                vm.totalQuantity += (val.quantity * val.price);
            });

            return vm.totalQuantity.toFixed(2);
        }

        function confirmModal() {
            var addCart_modal = $modal({
                title: 'Guardar Orden',
                content: 'Hello Modal<br />This is a multiline message!',
                templateUrl: './apps/carrito-compra/confirm_modal.html',
                show: true,
                locals: {
                    orderTotal: vm.totalQuantity
                },
                controller: function ($scope, $modal, $state, orderTotal, $rootScope, $http) {
                    var vm = $scope;

                    var modal_loading;
                    var success_modal;

                    vm.orderTotal = orderTotal;
                    vm.saveOrder = saveOrder;

                    function saveOrder() {
                        if ($rootScope.logged && $rootScope.logged.name) {
                            loadingModal();
                            addCart_modal.hide();

                            const url = "http://www.baprosa.com/api/orderNew.php";

                            let data = {
                                docTotal: orderTotal,
                                cardCode: $rootScope.logged.cardCode,
                                orderDetails: JSON.stringify($rootScope.shoppingCart)
                            };

                            $http.post(url, data, {headers : {
                                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                                }}).success(function(response) {
                                console.log(response);

                                if (response.success) {
                                    $rootScope.shoppingCart =  [];
                                    $localStorage['Baprosa--shoppingCart'] = [];

                                    successModal();
                                    modal_loading.hide();

                                    setTimeout(function(){
                                      success_modal.hide();
                                    }, 3000);

                                    $state.go("app.marcas");

                                } else {
                                    //addCart_modal.hide();
                                }
                            }).
                            error(function(status) {
                                console.error(status);
                                //your code when fails
                            });
                        } else {
                            addCart_modal.hide();
                            $state.go("app.login");
                        }


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
                          title: 'Orden creada',
                          content: '',
                          templateUrl: './apps/carrito-compra/success_modal.html',
                          show: true,
                          backdrop: 'static',
                          keyboard: false,
                        });
                    }

                },
                onHide: function() {
                    $rootScope.shoppingCart =  [];
                    $localStorage['Baprosa--shoppingCart'] = [];
                }
            });
        }
        function saveOrder() {

            //const url = "../../../api/user.php";


            /*$http({
                method: 'GET',
                url: url,
                params: vm.user
            }).
            success(function(response) {
                console.log(response);

                if (response.success) {
                    $localStorage['Baprosa-logged'] = response;
                } else {

                }
            }).
            error(function(status) {
                console.log(status);
                //your code when fails
            });*/
        }

    }


})();
