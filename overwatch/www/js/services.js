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
    favoritar: function(mostplayed, profile, battletag,platform,region, indexo) {

      favoritos.push(
      { 
        battletag: battletag,
        platform: platform,
        region: region,
        favoritado: profile.data,
        heroesmostplayed: mostplayed 
          }); 
         
        // push it to favorite array
         
    }
  };

})

