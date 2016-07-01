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

    Profiles.getHeroesQuick(battletag, plataform, region).success(function(data){
      $scope.mostplayedQuick = data;

    });
    Profiles.getHeroesCompetitive(battletag, plataform, region).success(function(data){
      $scope.mostplayedCompetitive = data;

    });

  }

  $scope.favoritar = function(mostplayedquick,mostplayedcompetitive, profile, battletag, platform, region){

      $scope.liked = true;

    Profiles.favoritar(mostplayedquick,mostplayedcompetitive,profile,battletag, platform, region);
    $scope.favoritos = Profiles.getFavorites();
    //console.log($scope.favoritos);
     
      window.localStorage.setItem("favoritos",  JSON.stringify($scope.favoritos));  

    }

  })

.controller('FavCtrl', function($scope, $http, $state,$timeout, $ionicActionSheet, Profiles,$sanitize) {

  $scope.favoritos = Profiles.getFavorites();

  
  $scope.pegafavs = function(){
    Profile.getFavorites();
  }

      $scope.remove = function(favorito) {
    Profiles.removeFav(favorito);

    window.localStorage.setItem("favoritos",  JSON.stringify($scope.favoritos));  
    } 


    $scope.show = function(favorito,indexo) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text:   ' <i class="icon ion-happy-outline"></i>'+
    'View Profile     ' },
       { text:  ' <i class="icon ion-refresh"></i>'+
    'Update  ' }
     ],
     destructiveClass: 'icon ion-trash-b',
     destructiveText: 'Delete',
     titleText: 'Actions for <strong>'+favorito.favoritado.username+'</strong>',
     cancelText: 'Cancel',
     destructiveButtonClicked: function() {
          $scope.remove(favorito); 
          return true;
        },
     buttonClicked: function(index) {
      switch (index){
      case 0 :
       $state.go('tab.favorites-detail',{"region": favorito.region, "platform": favorito.platform, "battletag": favorito.battletag, "indexo": indexo});  
        return true;
      case 1 :
        //Handle Move Button
        return true;
    }

      

     }
   })

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 55000)

     }


})

.controller('FavCtrlDetail', function($scope, $stateParams, Profiles, $sanitize) {
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
