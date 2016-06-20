angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,   Profiles) {
$scope.perfil = null;
$scope.msgerro = null; 

$scope.getperfil = function(battletag,plataform,region){
            
      
          Profiles.getProfile(battletag, plataform, region).success(function(data){
          $scope.perfil = data;
         
         });

        Profiles.getHeroes(battletag, plataform, region).success(function(data){
        $scope.mostplayed = data;
          
        });
        
 }

 $scope.favoritar = function(profile, battletag){

      Profiles.favoritar(profile,battletag);
      $scope.favoritos = Profiles.getFavorites();
      
      //  window.localStorage.setItem("favoritos", );  
      window.localStorage.setItem("favoritos",  JSON.stringify($scope.favoritos));  
 
 }

})

.controller('FavCtrl', function($scope, $http, Profiles){

    $scope.favoritos = Profiles.getFavorites();
    
    $scope.remove = function(favorito) {
      Profile.removeFav(favorito);
    };
    $scope.pegafavs = function(){
      Profile.getFavorites();
    }
})


.filter('filtroTag',function() {
    return function(input) {
        if (input) {
            return input.replace( '-', '#');    
        }
    }
   
})






















.controller('FavCtrl', function($scope, Profiles) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.favoritos = Profiles.getFavorites();
  $scope.remove = function(Favorite) {
    Chats.remove(Favorite);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
