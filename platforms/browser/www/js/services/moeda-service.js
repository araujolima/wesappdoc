angular.module('app.moedaService', ['ngResource'])
.factory('moedaResource', function($resource,$rootScope) {

	return $resource($rootScope.baseURL+'/RestFull/moedas/', null, {
		'update' : { 
			method: 'PUT'
		}
	});
});


