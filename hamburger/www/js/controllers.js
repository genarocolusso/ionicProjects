angular.module('app.controllers', [])
  
.controller('magnFicoBurgerCtrl', function($scope) {

})
   
.controller('finishCtrl', function($scope) {

})
   
.controller('selectIngredientsCtrl', function($scope, IngredientsService, filterFilter) {


  $scope.ingredients =[
  {name : 'Italian Bread', image : 'buns.png', description : '2 Buns', price : 1.00},
  {name : 'Angus Burger', image : 'hamburger.png', description : '130g', price : 0.90},
  {name : 'Mushrooms', image : 'mushroom.png', description : 'Tasty', price : 0.40},
  {name : 'Swiss Cheese', image : 'swiss_cheese.png', description : '2 pieces', price : 0.30}]

  $scope.myBurger = IngredientsService.getBurger();
   
 
 	$scope.getCount = function(strCat){
 		if($scope.myBurger)
      	return filterFilter( $scope.myBurger, {name:strCat}).length;
    	else
    	return 0
    }

    $scope.addMore = function(item){
 		 $scope.myBurger.push(item)
 		 console.log($scope.myBurger)
 		 window.localStorage.setItem("burgers",  JSON.stringify($scope.myBurger));  

    }
    $scope.reset = function(){
 		 $scope.myBurger = []
 		   window.localStorage.removeItem("burgers")
    }

    $scope.totalPricecalc = function(){
    	var total = 0
    	for(var i =0; i < $scope.myBurger.length; i++){
    		var preco = $scope.myBurger[i].price;
    		total += preco
    	}
    	return total
    }




})
 