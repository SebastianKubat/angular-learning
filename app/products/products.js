'use strict';

angular.module('myApp.products', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  
  $routeProvider.when('/products/:id', {
    templateUrl: 'products/product.html',
    controller: function($scope, productsFactory, $routeParams) {
      $scope.product = {};
      productsFactory.get( { id: $routeParams.id } ,function(book){
        $scope.product = book;
      })
      
      $scope.save =  function(product){
        productsFactory.update( { id: $routeParams.id }, product, function(){
        alert('Save'); 
        })
      }
      
      
      
      
    }
  });
  
  
  $routeProvider.when('/products', {
    templateUrl: 'products/products.html',
    controller: function($scope,productsFactory) {
      $scope.books = [];
      productsFactory.query(function(books){
        $scope.books = books;
      })
    }
  });
  
  
}])

.factory('productsFactory',function($resource){
  //return $resource('api/books/:id'),
  
  return $resource('api/books/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  })
  
})


