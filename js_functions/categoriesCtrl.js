app.controller('categoriesCtrl', function($scope, $http)
{
	$scope.required = true;
	$scope.days = [];
	var todayDate = new Date();
	var thisYear = todayDate.getFullYear();
	var thisMonth = todayDate.getMonth();
	var thisDay = todayDate.getDay();
	$scope.years = [thisYear, thisYear+1];
	$scope.categoryNames = [
		"gifts",
		"flowers",
		"parfume", 
		"paynet",
		"chocolate",
		"beauty",
	];

	$scope.months = [
		{month : "January", number : "1"},
		{month : "February", number : "2"},
		{month : "March", number : "3"},
		{month : "April", number : "4"},
		{month : "May", number : "5"},
		{month : "June", number : "6"},
		{month : "July", number : "7"},
		{month : "August", number : "8"},
		{month : "September", number : "9"},
		{month : "October", number : "10"},
		{month : "November", number : "11"},
		{month : "December", number : "12"},
	];

	$scope.showCheckOut=false;
	$scope.showItems=false;
	$scope.count=0;
	$scope.cart = [];
	$scope.deliveryDate = {year: thisYear, month: thisMonth, day: thisDay};

	$scope.customer = {};

	$scope.errorCheck = function (){
		$scope.payer.firstName="invalid";
	}

	$scope.daysInMonth = function (month, year) {
		var day;
		$scope.days = [];
		if (month.number === "1" || month.number === "3" || month.number === "5" ||
			month.number === "7" || month.number === "8" || month.number === "10" ||
			month.number === "12") {day=31;} 
			else if(month.number === "2" && isLeapYear(year)){day=29;}
			else if (month.number === "2" && !isLeapYear(year)){day=28;}
		 	else {day=30;}
			for (var i = 1; i <= day; i++) {
				$scope.days.push(i);
			};
	}
	function isLeapYear(year){
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? true: false;
	}

	$scope.categorySelected = function (chosenCategoryName) {
		$http.get("categories.php?selectedCategory="+chosenCategoryName.toString()).then(function (response) {
			$scope.itemNames = response.data.records;
		});

		$scope.chosenCategory = chosenCategoryName;

		//This is old request used with ajax
		/*var xhttp;
    	xhttp = new XMLHttpRequest();
      	xhttp.onreadystatechange = function () {
        	if (xhttp.readyState == 4 && xhttp.status == 200) {
          		document.getElementById("itemsPage").innerHTML = xhttp.responseText;
        	};
    	};
    	var url = "categories.php?selectedCategory=" + argument.toString();
      	xhttp.open("GET", url, true);
      	xhttp.send();*/
  		$scope.showItems=true;
    };

    $scope.addToCart = function (product) {
  		$scope.showCheckOut=true;
    	$scope.cart.push(angular.extend({quantity: 1},product));
    	$scope.cartQuantity = $scope.cart.length;
    }

    $scope.removeFromCart = function (item) {
    	$scope.cart.splice(item, 1);
    	$scope.cartQuantity = $scope.cart.length;
    	if ($scope.cartQuantity === 0) {
    		$scope.showCheckOut=false;
    	};
    }

    $scope.getCartPrice = function () {
    	var total=0;
    	$scope.cart.forEach(function (product) {
    		total += product.Price * product.quantity;
    	});
    	return total;
    };
    
    $scope.cancel = function (placeOrderForm) {

    	placeOrderForm.$setPristine();
    	placeOrderForm.$setUntouched();
    	$scope.payer = null;
        $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
    }

    $scope.submit = function (payer) {
    	$scope.customer = angular.copy(payer);

    }
});