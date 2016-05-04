app.controller('categoriesCtrl', function($scope, $http)
{
	$scope.required = true;
	var todayDate = new Date();
	var thisYear = todayDate.getFullYear();
	var thisMonth = todayDate.getMonth();
	var thisDay = todayDate.getDay();
	$scope.years = [thisYear, thisYear+1];
	$scope.months = [
		{month : "January", number : 1},
		{month : "February", number : 2},
		{month : "March", number : 3},
		{month : "April", number : 4},
		{month : "May", number : 5},
		{month : "June", number : 6},
		{month : "July", number : 7},
		{month : "August", number : 8},
		{month : "September", number : 9},
		{month : "October", number : 10},
		{month : "November", number : 11},
		{month : "December", number : 12}
	];

	$scope.categoryNames = [];
    $http.get("categoryNames.php").then(function (response) {
    	$scope.categoryNames = response.data;
    });


     //$.ajax({
		// 	url: 'categoryNames.php',
		// 	success: function (result) {
		// 		$scope.categoryNames = result;
		// 	}
		// });

	$scope.showCheckOut=false;
	$scope.showItems=false;
	$scope.count=0;
	$scope.cart = [];

	$scope.payer = {};
	$scope.receiver = {};
	$scope.deliveryDate = {};

	$scope.daysInMonth = function (month, year) {
		$scope.days = [];
		var day;
		if (month.number === 1 || month.number === 3 || month.number === 5 ||
			month.number === 7 || month.number === 8 || month.number === 10 ||
			month.number === 12) {day=31;} 
		else if(month.number === 2 && isLeapYear(year)){day=29;}
		else if (month.number === 2 && !isLeapYear(year)){day=28;}
		else {day=30;}
		for (var i = 1; i <= day; i++) {
			$scope.days.push(i);
		};
	}

	function isLeapYear(year){
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? true: false;
	}

	$scope.categorySelected = function (chosenCategory) {
		// $http.get("categories.php?selectedCategory="+chosenCategory.toString()).then(function (response) {
		// 	$scope.itemNames = response.data.records;
		// });

  		$scope.showItems=true;

		$.ajax({
			url: 'categories.php',
			data: chosenCategory,
			success: function (result) {
				$scope.$apply(function () {
					$scope.itemNames = result;
				})
			}
		});

		$scope.chosenCategory = chosenCategory.CategoryName;

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
    };

    $scope.addToCart = function (item) {
  		$scope.showCheckOut=true;
  		var quantityIncreased = false;
  		if ($scope.cartQuantity > 0 || $scope.cartQuantity != null) {
  			$scope.cart.forEach(function (inCartItem, index) {
  				if (inCartItem.ItemID === item.ItemID){
  					inCartItem.Quantity ++;
  					quantityIncreased = true;
  				}
  			});
  			if (!quantityIncreased) {
    			$scope.cart.push(angular.extend({Quantity: 1},item));
    			quantityIncreased = false;
  			};
  		}
  		else {
    		$scope.cart.push(angular.extend({Quantity: 1},item));
  		};
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
    		total += product.Price * product.Quantity;
    	});
    	return total;
    };
    
    // $scope.cancel = function (placeOrderForm) {
    // 	$scope.payer = angular.copy(emptyObject);
    // 	placeOrderForm.$setPristine();
    // 	placeOrderForm.$setUntouched();
    	
    //     $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
    // }

    $scope.submit = function () {
    	var orderInfo = {
    		"payer":$scope.payer,
    		"receiver":$scope.receiver,
    		"deliveryDate":$scope.deliveryDate,
    		"itemsOrdered":$scope.cart
    		};

    	$.ajax({
    		url: "checkOut.php",
    		data: orderInfo,
    		success: function (argument) {
    			// body...
    		}
    	})
    }

    $scope.test = function (argument) {
    	$http.get("categoryNames.php").then(function (response) {
    		$('#testing').html(response.data);
    	});
    }
});