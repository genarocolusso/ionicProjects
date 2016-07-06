angular.module('starter.services', [])

 

.factory('Profiles',  function($http) {
  
  var savedfavoritos = localStorage.getItem('favoritos'); //get fav

  var favoritos = (localStorage.getItem('favoritos')!==null) ? JSON.parse(savedfavoritos) : []; // if null set []
    
  return {
    getProfile: function(battletag, plataform, region) {
        
       var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/profile";
     
      return $http({
            url: getdata,
            method: 'GET'
        })
 
    },
    getHeroesQuick: function(battletag, plataform, region){
          var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/quick-play/heroes";
        
      return $http({
            url: getdata,
            method: 'GET'
        })
    },

    getHeroesCompetitive: function(battletag, plataform, region){
          var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/competitive-play/heroes";
        
      return $http({
            url: getdata,
            method: 'GET'
        })
    },
    getFavorites: function() {
      
      return favoritos;
    }, 
    removeFav: function(fav) {
      favoritos.splice(favoritos.indexOf(fav), 1);
    },
    favoritar: function(quickmostplayed,competitivemostplayed, profile, battletag,platform,region, quickStats, compStats, indexo) {
    var qplay = [] //will stor result here
    var cplay = [] //will stor result here

    for(var i in quickmostplayed) {
   qplay.push(quickmostplayed[i]);
}
    for(var i in competitivemostplayed) {
   cplay.push(competitivemostplayed[i]);
}
      

      favoritos.push(
      { 
        battletag: battletag,
        platform: platform,
        region: region,
        favoritado: profile.data,
        quickhero: qplay,
        competitivehero: cplay,
        StatsQuick: quickStats,
        StatsComp: compStats
          }); 
         
        // push it to favorite array
         
    },
    getStatsQuick: function(battletag, plataform, region){
      var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/quick-play/allHeroes/";

      return $http({
            url: getdata,
            method: 'GET'
        })
    },
    getStatsComp: function(battletag, plataform, region){
      var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/competitive-play/allHeroes/";

      return $http({
            url: getdata,
            method: 'GET'
        })
    }
  };

})

