angular.module('app.controllers', [])

.controller('magnFicoBurgerCtrl', function($scope) {

})

.controller('finishCtrl', function($scope, IngredientsService, filterFilter) {
  $scope.myBurger = IngredientsService.getBurger();
  $scope.totalPrice = IngredientsService.precoBurger($scope.myBurger);
console.log($scope.myBurger)
$scope.getCount = function(itemname, burgers){
     
     return filterFilter( burgers, {name:itemname}).length;
    
  }

})

.controller('selectIngredientsCtrl', function($scope, IngredientsService, filterFilter) {
 
  $scope.ingredients =[
  {name : 'Italian Bread', image : 'buns.png', description : '2 Buns', price : 1.00},
  {name : 'Angus Burger', image : 'hamburger.png', description : '130g', price : 0.90},
  {name : 'Mushrooms', image : 'mushroom.png', description : 'Tasty', price : 0.40},
  {name : 'Lettuce', image : 'lettuce.png', description : 'Crispy', price : 0.40},
  {name : 'Jalapeno', image : 'jalapeno.png', description : 'Super spicy', price : 0.40},
  {name : 'Swiss Cheese', image : 'swiss_cheese.png', description : '2 pieces', price : 0.30}]

  $scope.myBurger = IngredientsService.getBurger();


  $scope.getCount = function(itemname, burgers){
     if(burgers)
     return filterFilter( burgers, {name:itemname}).length;
   else
     return 0
  }
 $scope.addMore = function(item){ 
   
  IngredientsService.addBurger(item)
   $scope.myBurger = IngredientsService.getBurger();  
  $scope.totalPricecalc = IngredientsService.precoBurger($scope.myBurger)
 console.log($scope.myBurger)
}
$scope.reset = function(){

   IngredientsService.removeBurger()
    $scope.myBurger =  IngredientsService.getBurger() 
  $scope.totalPricecalc = IngredientsService.precoBurger($scope.myBurger)
}

$scope.totalPricecalc = IngredientsService.precoBurger($scope.myBurger)




})
 









 angular.module('app').filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});