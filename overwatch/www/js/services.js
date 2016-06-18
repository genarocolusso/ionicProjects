angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  

  return {
    todos: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('Profiles',  function($http) {
  // Might use a resource here that returns a JSON array
 
   var favoritos = [];

  return {
    getProfile: function(battletag, plataform, region) {
        
       var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/profile";
        //alert(getdata);
      return $http({
            url: getdata,
            method: 'GET'
        })
 
    },
    getHeroes: function(battletag, plataform, region){
          var getdata = "https://api.lootbox.eu/"+plataform+"/"+region+"/"+battletag+"/heroes";
        
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
    favoritar: function(profile, battletag) {
      
          return favoritos.push(
      { battletag: battletag,
        favoritado: profile.data
          }); 

    }
  };

})

