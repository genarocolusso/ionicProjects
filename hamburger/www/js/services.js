angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('IngredientsService', [function(){
	var savedfavoritos = localStorage.getItem('burgers'); //get fav

var myBurger = (localStorage.getItem('burgers')!==null) ? JSON.parse(savedfavoritos) : []; 
 

return{
 getBurger: function() {
      
      return myBurger;
    }

}

}]);

