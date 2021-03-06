angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {

	  /*var req = {
			  method: 'POST',
			  url: 'http://localhost:3000/api/command',
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  },
			  data: JSON.stringify({ items : JSON.stringify([0,0,1,1,1,1]),user: localStorage.getItem('userId')})
			  };
	
			 
			 $http(req).then(function(response){
					  console.log(JSON.stringify(response));
					  //$scope.commands = response.data
					 
				 }, 
				 function(error){
					console.log(error)
				 }
			);*/
  

	var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/command',
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  },
			  data: JSON.stringify({ user: localStorage.getItem('userId')})
	};
			 
			 $http(req).then(function(response){
					  //console.log(JSON.stringify(response))
					  $scope.commands = response.data;
					 
				 }, 
				 function(error){
					console.log(error)
				 }
			)
			
			
  
	
})

.controller('CommandCtrl', function($scope,$http,$stateParams) {
	
	var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/command/'+$stateParams.id,
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  }
			 }
	
			 var liste = [];
			 $http(req).then(function(response){
				 //console.log(JSON.stringify(response));
					  $scope.command = response.data;
					  var items = response.data.items;
					  angular.forEach(items, function (value){
		
						  req = {
								  method: 'GET',
								  url: 'http://localhost:3000/api/item/'+value,
								  headers: {
									  'Authorization' : 'Bearer '+localStorage.getItem('token')
								  }
								 }
						  
						  
						  $http(req).then(function(response){
							  //console.log(JSON.stringify(response))
							 
							 
								 }, 
								 function(error){
									console.log(error)
								 }
						  )
						  
						  
					  });
			
				 }, 
				 function(error){
					console.log(error)
				 }
			)
			
	
})


.controller('AccountCtrl', function($scope, $http) {
	console.log('ok');
	 /* var req = {
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
			 )*/

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

.controller('ProductsCtrl', function($scope,$http) {
	
	var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/item',
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  }
			 }
	
			 
			 $http(req).then(function(response){
					  $scope.products = response.data;
			
				 }, 
				 function(error){
					console.log(error)
				 }
			)
			
	
})

.controller('ProductCtrl', function($scope,$http,$stateParams) {

	
	var req = {
			  method: 'GET',
			  url: 'http://localhost:3000/api/item/'+$stateParams.id,
			  headers: {
				  'Authorization' : 'Bearer '+localStorage.getItem('token')
			  }
			 }
			 $http(req).then(function(response){
					  $scope.product = response.data;
			
				 }, 
				 function(error){
					console.log(error)
				 }
			)
			

	
	$scope.quantite = 1;
	$scope.add = function(){
		$scope.quantite++;
		
	}
	$scope.remove = function(){
		$scope.quantite--;
		
	}

})

.controller('ShopCtrl', function($scope) {
	console.log('ok');
	$scope.qrcode = false;
	
	
	 $scope.buy = function() {


	      
	      $scope.qrcode = true;

	    }
	
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state,$http,$window) {
	$scope.data = {};
    $scope.login = function(){
  	
  	 
  	  var req = {
  			  method: 'POST',
  			  url: 'http://localhost:3000/authenticate',
  			  data: { username: $scope.data.username, password: $scope.data.password}
  			  };
  			 
  			 $http(req).then(function(response){
  					   var token = JSON.stringify(response.data.token);
  					   localStorage.setItem("token", token);
  					   
  					   var userId = JSON.stringify(response.data.userId);
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
			  data: JSON.stringify({ username: $scope.data.username, password:$scope.data.password, email:$scope.data.email,
				  address:$scope.data.address, country: $scope.data.city, number:$scope.data.phone})
			  };
			 

			 $http(req).then(function(response){
					   var alertPopup = $ionicPopup.alert({
					     title: 'Inscription',
					     template: 'Vous êtes inscrit !'
					   });
					   
					   $window.location.href = '/#/login.html';
					 
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
