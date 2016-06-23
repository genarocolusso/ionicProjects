angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope,$http, Profiles) {
  $scope.perfil = null;
  $scope.msgerro = null; 
  
  $scope.getperfil = function(battletag,plataform,region){
    $scope.liked = false; //set liked to false first and check it.
 

     $scope.favoritos = Profiles.getFavorites();
   
   
      for (var i = 0; i < $scope.favoritos.length; i++) {
        if ( $scope.favoritos[i].battletag === battletag) {
           $scope.liked = true; // coracao rosado
           break;
        }else{
          $scope.liked = false; //nada acontece
        }
      }


 

    Profiles.getProfile(battletag, plataform, region).success(function(data){
      $scope.perfil = data;
    console.log($scope.perfil);
    });

    Profiles.getHeroes(battletag, plataform, region).success(function(data){
      $scope.mostplayed = data;

    });

  }

  $scope.favoritar = function(profile, battletag, platform, region){

      $scope.liked = true;

    Profiles.favoritar(profile,battletag, platform, region);
    $scope.favoritos = Profiles.getFavorites();
    console.log($scope.favoritos);
     
      window.localStorage.setItem("favoritos",  JSON.stringify($scope.favoritos));  

    }

  })

.controller('FavCtrl', function($scope, $http, Profiles){

  $scope.favoritos = Profiles.getFavorites();

  
  $scope.pegafavs = function(){
    Profile.getFavorites();
  }

      $scope.remove = function(favorito) {
    Profiles.removeFav(favorito);

    window.localStorage.setItem("favoritos",  JSON.stringify($scope.favoritos));  
    } 
})

.controller('FavCtrlDetail', function($scope, $stateParams, Profiles) {
 var region = $stateParams.region ;
 var platform = $stateParams.platform  ;
 var battletag = $stateParams.battletag ;
 var indexFav = $stateParams.indexo; 
  $scope.userinfos ={ 
     'battletag' : battletag,
     'platform' : platform,
     'region' : region,
     'indexo' : indexFav
    }

  $scope.favoritos = Profiles.getFavorites();
   //$scope.usuariofavoritado  = $scope.favoritos[0];
   console.log($scope.usuariofavoritado );
      for (var i = 0; i < $scope.favoritos.length; i++) {
        if ( $scope.favoritos.indexOf($scope.favoritos[i]) === parseInt(indexFav)) {
           $scope.usuariofavoritado  = $scope.favoritos[i];
        }
      }

 


})


 .filter('filtroTag',function() {
  return function(input) {
    if (input) {
      return input.replace( '-', '#');    
    }
  }

})
  

 .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
