angular.module('app.login-controller', ['app.loginService'])

.controller('LoginController', function($scope,$rootScope,$ionicLoading,doLoginResource,$localStorage) {
	$scope.usuario = {};
	$scope.mensagem = '';
	$scope.login = function(){
		console.log(this.formulario.$valid);
		if(this.formulario.$valid){
			console.log($scope.usuario);
			$ionicLoading.show({
				template: 'Loading...'
			}).then(function(){
			});
			doLoginResource.doLogin($scope.usuario)
			.success(function(data, status, headers, config) {
				var key = 'user';
				$localStorage.putObject(key,data);
				$rootScope.user = data;
				$ionicLoading.hide();
				if(data.CLI_ID != ''){
					console.log(data);
					$scope.mensagem = '';
					$rootScope.goTabHome();	
				}else{
					$scope.mensagem = '* Invalid user or password';
				}
				
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});

			//$rootScope.goTabHome();
		}
		
	}
});