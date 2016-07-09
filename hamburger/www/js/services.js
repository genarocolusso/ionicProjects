angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('IngredientsService', [function(filterFilter){
 var savedfavoritos = localStorage.getItem('burgers'); //get 

var myBurger = (localStorage.getItem('burgers')!==null) ?  JSON.parse(savedfavoritos) : []; 
 

return{
 getBurger: function() {
      
      return myBurger;
    },
  precoBurger:  function(burg){
 var total = 0
 if(burg.length>0){
 for(var i =0; i < burg.length; i++){
  var preco = burg[i].price;
  total += preco
}
}
return total
},
removeBurger: function() {
      
      myBurger = [];
       window.localStorage.setItem("burgers",   JSON.stringify(myBurger));
    },
addBurger: function(item){
	myBurger.push(item)
	window.localStorage.setItem("burgers",   JSON.stringify(myBurger));
} 
 

}

}]);

