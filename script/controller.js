var app = angular.module("myApp", ["ngSanitize"]);

app.controller("vidCtrl", function($scope, $http, $sce) {
   $http.get("data/img.json")
   .then(function(response) {
      $scope.images = response.data;
   });
   
   //fix trusted resource error - https://stackoverflow.com/questions/21292114/external-resource-not-being-loaded-by-angularjs
   $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
   }
   
   $scope.openVideo = function(link) {
      $scope.modalLink = link;
   };
});
