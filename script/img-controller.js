var app = angular.module("myImg", []);

app.controller("imgCtrl", function($scope, $http) {
   $http.get("data/img-gallery.json")
   .then(function(response) {
      $scope.gallery = response.data;
   });
});