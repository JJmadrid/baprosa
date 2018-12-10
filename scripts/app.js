/**
 * @Author: Raquel Jackson
 * @Date:   2018-08-28T19:02:25-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-09-10T07:10:25-06:00
 */



(function() {
    'use strict';
    angular
      .module('app', [
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ngStore',
        'ui.router',
        'ui.utils',
        'ui.load',
        'mgcrea.ngStrap',
        'ui.jp',
        'oc.lazyLoad'
      ])
      .config(function($httpProvider){
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.cache = false;
      });
})();
