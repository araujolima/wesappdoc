angular.module('app.benefi-persist-controller', ['app.benefiService','app.bankService','app.countryService'])

.controller('BenefiPersistController', function($scope,$state,benefiResource,$localStorage,bankResource,countryResource,$ionicLoading,$rootScope,$ionicPopup,$stateParams) {
$scope.cpfError = false;
$scope.back = function() {
    $state.go('tab.benefi');
  };
 
 $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  $scope.currencyChange = function(){
	  bankResource.get($scope.benef.currency)
	.success(function(data, status, headers, config) {
		$scope.banks = data;
		$ionicLoading.hide();
	});
	countryResource.where($scope.benef.currency)
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		$ionicLoading.hide();
	});
  };
  $scope.banks = [];
  $scope.countries = [];
  bankResource.get('')
	.success(function(data, status, headers, config) {
		$scope.banks = data;
		$ionicLoading.hide();
	});
	
	
$scope.benef = {
	firstname: '',
	lastname: '',
	email: '',
	type: null,
	currency: null,
	bank: null,
	agency: '',
	account: '',
	routingnumber: '',
	accounttype:null,
	countryname : null,
	mobile:'',
	cpf:'',
	hash: JSON.parse(localStorage.getItem('user')).CLI_ID//$rootScope.user.CLI_ID
};
$scope.submit = function(){
	console.log($scope.benef);
		$ionicLoading.show({
		template: 'Loading...'
	}).then(function(){
	});
	var error = false;
	//validações
	
		if(($scope.benef.cpf == '' || !$scope.isCPF($scope.benef.cpf)) && $scope.benef.currency == 'BRL')
	{
		$scope.cpfError = true;
		error = true;
	}
	if($scope.benef.firstname == '')
	{
		error = true;
	}
	if($scope.benef.lastname == '')
	{
		error = true;
	}
	if($scope.benef.type == null && $scope.benef.currency == 'BRL')
	{
		error = true;
	}
	if($scope.benef.routingnumber == null && $scope.benef.currency == 'USD')
	{
		error = true;
	}
	if($scope.benef.currency == null)
	{
		error = true;
	}
	if($scope.benef.bank == null && $scope.benef.currency != 'EUR' && $scope.benef.currency != 'USD')
	{
		error = true;
	}
	if($scope.benef.agency == ''  && $scope.benef.currency == 'BRL')
	{
		error = true;
	}
	if($scope.benef.account == '' && $scope.benef.currency == 'BRL')
	{
		error = true;
	}
	if($scope.benef.accounttype == null && $scope.benef.currency != 'EUR')
	{
		error = true;
	}
	
	if(error)
	{
			$ionicLoading.hide();
			return;
	}
		
	benefiResource.post($scope.benef)
		.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.showAlert('Success', 'Beneficiary saved.');
			$state.go('tab.benefi');
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	
};

$scope.isCPF = function (value) {
        // value = jQuery.trim(value);
    cpf = value.toString(); //.replace(/.|-|/gi, ''); // elimina .(ponto), -(hifem) e /(barra)
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) {
        a[9] = 0
    } else {
        a[9] = 11 - x
    }
    b = 0;
    c = 11;
    for (var y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) {
        a[10] = 0;
    } else {
        a[10] = 11 - x;
    }
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
    return true;
}

	

});