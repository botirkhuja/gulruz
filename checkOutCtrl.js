app.controller('checkOutCtrl', function($scope, $http){
	$scope.resetTest = function (argument) {
    	$scope.textInput = null;
    }

    $scope.orderInformation="hi"

    $scope.s = function (pay){
    	$scope.inforBeforeOrder = pay;
    	$http.get("checkOut.php").then(function (response) {
			$scope.orderInformation = response.data.records;
		});
    };

}