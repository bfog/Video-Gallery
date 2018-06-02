var app = angular.module("myApp", ["ngRoute", "ngSanitize"]);

app.config(function($routeProvider, $locationProvider) {
   $locationProvider.hashPrefix("");
   $routeProvider
   .when("/", {
      templateUrl: "templates/home.html",
      controller: "vidCtrl"
   })
   .when("/gallery", {
      templateUrl: "templates/gallery.html",
      controller: "imgCtrl"
   })
   .when("/view/:file/:title/:desc/:likes/:uploaded", {
      templateUrl: "templates/photo.html",
      controller: "photoCtrl"
   })
   .otherwise({
      redirectTo: "/"
   });
});

app.controller("photoCtrl", function($scope, $routeParams) {
   $scope.photoFile = $routeParams.file;
   $scope.photoTitle = $routeParams.title;
   $scope.photoDesc = $routeParams.desc;
   $scope.photoLikes = $routeParams.likes;
   $scope.photoUploaded = $routeParams.uploaded;
});

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
