angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('IngredientsService', [function(filterFilter){
 var savedfavoritos = localStorage.getItem('burgers'); //get fav

var myBurger = (localStorage.getItem('burgers')!==null) ? JSON.parse(savedfavoritos) : []; 
 

return{
 getBurger: function() {
      
      return myBurger;
    },
  precoBurger:  function(burg){
 var total = 0
 for(var i =0; i < burg.length; i++){
  var preco = burg[i].price;
  total += preco
}
return total
},
removeBurger: function() {
      
      myBurger = []
    },
addBurger: function(item){
	myBurger.push(item)
} 
 

}

}]);

