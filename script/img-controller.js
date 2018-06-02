var app = angular.module("myImg", []);

app.filter("offset", function() {
   return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
   }
});

app.controller("imgCtrl", function($scope, $http) {
   $http.get("data/img-gallery.json")
   .then(function(response) {
      $scope.gallery = response.data;
   });
   
   //Pagination
   $scope.imagesPerPage = 9;
   $scope.currentPage = 0;
   

   $scope.prevPage = function() {
      if($scope.currentPage > 0) {
         $scope.currentPage--;
      }
   };
   $scope.prevPageDisabled = function() {
      return $scope.currentPage === 0 ? "disabled" : "";
   };
   $scope.nextPage = function() {
      if($scope.currentPage < $scope.pageCount()) {
         $scope.currentPage++;
      }
   };
   $scope.nextPageDisabled = function() {
      return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
   };
   $scope.pageCount = function() {
      return Math.ceil($scope.gallery.length / $scope.imagesPerPage) - 1;
   };

   $scope.setPage = function(n) {
      $scope.currentPage = n;
   };
});



