var MusicApp = angular.module('app', ['ionic']);

MusicApp.controller('MyController', function($scope, $http,$sce, MusicList) {
  $scope.items = [];
   
    MusicList.GetList().then(function(Newitems){
       $scope.items = Newitems.tracks;   
      
    });
        $scope.trustSrc = function(src) {
          $scope.url1="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/";
          
    return $sce.trustAsResourceUrl($scope.url1+src);
  }
  
   $scope.doRefresh = function() {
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
  };
  
});

MusicApp.factory('MusicList', function($http){
  var PLAYLIST_URL = 'http://api.soundcloud.com/playlists/155365467?client_id=d1e450cff8a9e6e9bc1f7f52da495f58';
  var items =[];
  
  return {
    GetList: function(){
       return $http.get(PLAYLIST_URL).then(function(response){
         items = response.data;
         
         return items;
       });
    }
  };
});

//<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/228527179&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>

MusicApp.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var extraseconds = seconds - minutes*60;
    var timeString = '';
    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
    if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    if(minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
    if(extraseconds >= 0) timeString += (extraseconds > 1) ? (extraseconds + " seconds ") : (extraseconds + " seconds ");
    return timeString;
};
});

 
 
//http://api.soundcloud.com/playlists/155365467?client_id=d1e450cff8a9e6e9bc1f7f52da495f58



 