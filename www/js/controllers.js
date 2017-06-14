angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {
	
	//$scope.commands = ['Commande 1','Commande 2','Commande 3'];

	var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/command',
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  },
			  data: JSON.stringify({ user: localStorage.getItem('userId')})
	};
			 
			 $http(req).then(function(response){
					  console.log(JSON.stringify(response))
					  $scope.commands = response.data
					 
				 }, 
				 function(error){
					console.log(error)
				 }
			)
  
	
})

.controller('AccountCtrl', function($scope, $http) {
	console.log('ok')
	  var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/user',
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  },
			  data: JSON.stringify({ userId:localStorage.getItem('userId')})
			  };
			 
			 $http(req).then(function(response){
					   console.log(JSON.stringify(response));
					   
					 
				 }, 
				 function(error){
					 console.log(JSON.stringify(error));
					 
				}
			 )

	  /*$scope.save = function(){
		  var data = {};
		  data.username = $scope.data.username;
		  
		  var req = {
				  method: 'PUT',
				  url: 'http://localhost:3000/api/user',
				  data: JSON.stringify({ username: $scope.data.username, password:$scope.data.username, email:$scope.data.email,
					  address:$scope.data.address, country: $scope.data.city, number:$scope.data.phone})
				  };
				 
				 $http(req).then(function(response){
						   console.log(JSON.stringify(response));
						   }, 
					 function(error){
						 console.log(JSON.stringify(error));
					}
				 )
	  }*/
})

.controller('ProductsCtrl', function($scope) {

})

.controller('ProductCtrl', function($scope) {

})

.controller('ShopCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state,$http,$window) {
     
    $scope.login = function(){
  	  $scope.data = {};
  	 
  	  var req = {
  			  method: 'POST',
  			  url: 'http://localhost:3000/authenticate',
  			  data: JSON.stringify({ username: $scope.data.username, password:$scope.data.username})
  			  };
  			 
  			 $http(req).then(function(response){
  					   var token = JSON.stringify(response.data.token);
  					   localStorage.setItem("token", token);
  					   
  					   var userId = JSON.stringify(response.data.iduser);
					   localStorage.setItem("userId", userId);
  					   
  					   $window.location.href = '/#/tab/home';
  					 
  				 }, 
  				 function(error){
  					var alertPopup = $ionicPopup.alert({
  		                title: 'Erreur',
  		                template: 'Nom ou mot de passe incorrect'
  		            });
  				 
  				 }
  			)
    }
    
    
})

.controller('SigninCtrl', function($scope,$http ,$ionicPopup,$window) {
  $scope.data = {};
  
  $scope.signIn = function(){
	  var data = {};
	  data.username = $scope.data.username;
	  
	  var req = {
			  method: 'POST',
			  url: 'http://localhost:3000/api/user',
			  data: JSON.stringify({ username: $scope.data.username, password:$scope.data.username, email:$scope.data.email,
				  address:$scope.data.address, country: $scope.data.city, number:$scope.data.phone})
			  };
			 

			 $http(req).then(function(response){
					   var alertPopup = $ionicPopup.alert({
					     title: 'Inscription',
					     template: 'Vous êtes inscrit !'
					   });
					   
					  // $window.location.href = '/#/login.html';
					 
				 }, 
				 function(error){
					 var alertPopup = $ionicPopup.alert({
			                title: 'Erreur !',
			                template:JSON.stringify(error.data.data)
			            });
				}
			 )
  }
  

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
