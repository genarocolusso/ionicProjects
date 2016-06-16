angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http, Profiles) {
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

})























.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.todos();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
