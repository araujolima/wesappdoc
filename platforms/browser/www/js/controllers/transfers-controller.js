angular.module('app.transfers-controller', ['app.transfersService'])

.controller('TransfersController', function($scope,transfersResource,$ionicLoading,$rootScope,$localStorage) {
	$scope.transfers = [];
	$ionicLoading.show({
		template: 'Loading...'
	}).then(function(){
	});
	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	transfersResource.get($rootScope.user)
	.success(function(data, status, headers, config) {
		for (var i = 0;i < data.length; i++) {
			if(data[i].status == 'Paid'){
				data[i].icon = 'icon ion-checkmark'
			}else{
				data[i].icon = 'icon ion-close-round'
			}
			data[i].currency = data[i].currency.replace("GBP", "GBP -> ");
		}
		
		$scope.transfers = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.transfers = [];
		$ionicLoading.hide();
	});
});