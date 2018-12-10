// code style: https://github.com/johnpapa/angular-styleguide

(function() {
    'use strict';
    angular
        .module('app')
        .controller('GoogleMapCtrl', GoogleMap);

    function GoogleMap ($scope, $timeout) {
        var vm = $scope;
        vm.myMarkers = [];

        var myLatLng = {lat: 15.4438439, lng: -87.7920112};

        vm.mapOptions = {
            center: myLatLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var contentString = '<div id="content">' +
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">Baprosa</h3>'+
            '<div id="bodyContent">' +
            '<p><strong>Teléfono</strong><br>+504 2544-0070</p>' +
            '<p><strong>Correo</strong><br>ventas@baprosa.com<br>info@baprosa.com</p>' +
            '<p><strong>Dirección</strong><br>Km-4 salida a carretera a Tela<br>El Progreso, Yoro, Honduras, C.A.</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        $timeout(function(){
            google.maps.event.trigger($scope.myMap,'resize');

            vm.myMarkers = new google.maps.Marker({
                position: myLatLng,
                map: vm.myMap,
                title: 'Uluru (Ayers Rock)'
            });
            vm.myMarkers.addListener('click', function() {
                infowindow.open(vm.myMap, vm.myMarkers);
            });

            infowindow.open(vm.myMap, vm.myMarkers);
        });


    }


})();
