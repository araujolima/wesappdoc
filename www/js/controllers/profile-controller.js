angular.module('app.profile-controller', ['app.profileService','app.countryService','app.cityService','mobiscroll-datetime','mobiscroll-select','ngMask'])

.controller('ProfileController', function($scope,$state,$translate,profileResource,countryResource,cityResource,$ionicLoading,$rootScope,$localStorage) {
	$scope.countries = [];
	//$scope.docs = function() {
    //$state.go('tab.documents');
  //};
//All available styles
	$scope.styles = [
	  {
		name: "Theme Blue-Gray",
		url: "theme1"
	  },
	  {
		name: "Theme Blue-White",
		url: "theme2"
	  }
	];
	//$scope.style = $rootScope.style;
	for (var i =0; i < $scope.styles.length; i++) {
		//alert(i);
		if ($scope.styles[i].url == $rootScope.style) {
			//alert($scope.styles[i].name);
			$scope.style = $scope.styles[i];
			break;
		}
	}

	/**
	 * Change the style.
	 * @param style The selected style.
	 */
	$scope.changeStyle = function(style){
	  //alert(style.url);
	  $rootScope.style = style.url;
	  $rootScope.stylea = "css/" + $rootScope.style + "/style.css";
	  $rootScope.styleb = "css/" + $rootScope.style + "/home-style.css";
	};

	$scope.languages = [
	  {
		name: "English",
		url: "en"
	  },
	  {
		name: "Portuguese",
		url: "pt"
	  }
	];
	//$scope.style = $rootScope.style;
	for (var i =0; i < $scope.languages.length; i++) {
		//alert(i);
		if ($scope.languages[i].url == $translate.proposedLanguage()) {
			//alert($scope.styles[i].name);
			$scope.language = $scope.languages[i];
			break;
		}
	}

	/**
	 * Change the style.
	 * @param style The selected style.
	 */
	$scope.changeLanguage = function(language){
	  //alert(language.url);
	  $translate.use(language.url);
	};
	var arrt = [];
	$scope.countriest1 = [{}];
	$scope.city1 = "";

	//$scope.mydate = new Date();

	// mobiscroll
	var myDataWork = [];
	$scope.selectOptions1 = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		multiline: 1,
		height: 50,
		display: 'bubble',
		closeOnOverlayTap: true,
		circular: false,
		cssClass: 'my_btn_select',
		//buttons: ['cancel'],
		buttons: [
		{
					text: 'Done',
					handler: 'set'
		},
		{
					text: 'Cancel',
					handler: 'cancel'
		}
		],
		showScrollArrows: false,
		showLabel: false,
		showInput: true,
		filter: false,
		inputClass: 'demo-non-form',
		placeholder: 'Please Select...',
		//onItemTap: function (event,inst) {
		//	var countryselected = inst.getVal(); // Call the getVal method
		//	alert('Country ' + countryselected);
		//},
		onBeforeShow: function (event,inst) {
			//inst.setVal('44');
		},
		onSet: function (event,inst) {
			var countryselected1 = inst.getVal(); // Call the getVal method
			$scope.profile.COUNTRY = countryselected1;
			//alert('CountrySet ' + countryselected1);
			cityResource.where(countryselected1)
				.success(function(data, status, headers, config) {
					$scope.cities = data;
					myDataWork = [];
					for (var i =0; i < $scope.cities.length; i++) {
						// mobicroll
						myDataWork.push({
							value: $scope.cities[i].id,
							text: $scope.cities[i].name
						});
						// mobiscroll
					}
					$scope.myData2 = myDataWork;
					for (var i =0; i < $scope.cities.length; i++) {
						if ($scope.cities[i].id == $scope.profile.CITY) {
							$scope.city1 = $scope.cities[i];
							break;
						}
					}
					$ionicLoading.hide();
				})
				.error(function(data, status, headers, config) {
					$ionicLoading.hide();
				});
		}
	};
	$scope.selectOptions2 = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		multiline: 1,
		height: 50,
		closeOnOverlayTap: true,
		circular: false,
		cssClass: 'my_btn_select',
		//buttons: ['cancel'],
		buttons: [
		{
					text: 'Done',
					handler: 'set'
		},
		{
					text: 'Cancel',
					handler: 'cancel'
		}
		],
		showScrollArrows: false,
		showLabel: false,
		showInput: true,
		filter: false,
		inputClass: 'demo-non-form',
		placeholder: 'Please Select...',
		//onItemTap: function (event,inst) {
		//	var countryselected = inst.getVal(); // Call the getVal method
		//	alert('Country ' + countryselected);
		//},
		onBeforeShow: function (event,inst) {
			//inst.setVal('44');
		},
		onSet: function (event,inst) {
			var cityselected1 = inst.getVal(); // Call the getVal method
			$scope.profile.CITY = cityselected1;
			//alert('CountrySet ' + countryselected1);
		}
	};

	$scope.settings = {
		theme: 'ios',
		display: 'bubble',
		circular: false,
		dateFormat: 'dd/mm/yy',
		onSet: function (event,inst) {
			var dtset = inst.getVal(); // Call the getVal method
			//alert('CountrySet ' + countryselected1);
			var dtf = new Date(dtset);
			var dd = dtf.getDate();
			var mm = dtf.getMonth()+1; //January is 0!

			var yyyy = dtf.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			//alert(DateYear);

			$scope.profile.DATEOFBIRTH = today;
		}
	};
	var DateFull, DateDay, DateMonth, DateYear;
	var dt1=0;
	var mon1=0;
	var yr1=0;
	var DateFullD;
	var dtnum = 0;


  $scope.resetPass = function() {
    $state.go('reset');
  };
	//$scope.profile = {};
	$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	//$rootScope.user = '3884';
//alert('1');	
profileResource.get($rootScope.user)
	.success(function(data, status, headers, config) {
		data.MOBILE = data.MOBILE == null ? '' : Number(data.MOBILE);
		//data.DATEOFBIRTH =  data.DATEOFBIRTH == null ? '' : new Date(data.DATEOFBIRTH);
		data.DATEOFBIRTH =  data.DATEOFBIRTH == null ? '' : data.DATEOFBIRTH;
		$scope.profile = data;
		
		//alert('1:'+$scope.profile.COUNTRY);
		//alert('11:'+$scope.profile.CITY);
		
		//$scope.cidade = $scope.profile.CITY;
		$scope.CLI_ID = $rootScope.user.CLI_ID;
		//$scope.city1 = 1;
		DateFull = $scope.profile.DATEOFBIRTH;
		if (DateFull != '' && DateFull != null) {
			DateDay = DateFull.substr(0,2);
			DateMonth = DateFull.substr(3,2); //January is 0!

			DateYear = DateFull.substr(6,4);
			dt1   = parseInt(DateDay);
			mon1  = parseInt(DateMonth);
			mon1  -= 1;
			yr1   = parseInt(DateYear);
			dtnum = new Date(yr1, mon1, dt1);
		}
		//$scope.mydate = new Date(2016, 1, 1);
		$scope.mydate = new Date(yr1, mon1, dt1);
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.profile = {};
		$ionicLoading.hide();
	});
	
countryResource.get()
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		//alert($scope.countries[0].id);
		//alert($scope.countries.length);
		myDataWork = [];
		for (var i =0; i < $scope.countries.length; i++) {
			//if (i == 0) {
			//alert($scope.countries[i].name);
			//}
			arrt.push({
				id: $scope.countries[i].id,
				name: $scope.countries[i].name,
				flag: $scope.countries[i].flag
			});
			// mobicroll
			myDataWork.push({
				value: $scope.countries[i].id,
				text: $scope.countries[i].name,
				html: '<span class="flag '+$scope.countries[i].flag+'"></span>'+$scope.countries[i].name
			});
			// mobiscroll
		}
		$scope.myData = myDataWork;
		$scope.countriest1 = arrt;
		//$scope.countriest1 = data;
		
		//alert('2:'+$scope.profile.COUNTRY);

		if ($scope.profile.COUNTRY != '') {
			$scope.sel = $scope.profile.COUNTRY;
			$scope.countriest = $scope.profile.COUNTRY;
		} else {
			$scope.sel = $scope.countriest1[0].id;
			$scope.countriest = $scope.countriest1[0].id;
		}
		
		//alert('22 countryResource.get:'+$scope.countriest);
		
		$ionicLoading.hide();
		
		cityResource.where($scope.profile.COUNTRY)
			.success(function(data, status, headers, config) {
				$scope.cities = data;
				//$scope.banks = data;
				//alert($scope.countries[0].id);
				//alert($scope.countries.length);
				myDataWork = [];
				for (var i =0; i < $scope.cities.length; i++) {
					// mobicroll
					myDataWork.push({
						value: $scope.cities[i].id,
						text: $scope.cities[i].name
					});
					// mobiscroll
				}
				$scope.myData2 = myDataWork;
				for (var i =0; i < $scope.cities.length; i++) {
					if ($scope.cities[i].id == $scope.profile.CITY) {
						$scope.city1 = $scope.cities[i];
						$scope.sel2 = $scope.cities[i].id;
						
						//alert('23 cityResource.where '+$scope.cities[i].id + ' - ' + $scope.profile.CITY);
						
						break;
					}
					//if (i == 0) {
					//alert($scope.cities[i].id + $scope.cities[i].name);
					//}
					//arrt.push({
					//	id: $scope.cities[i].id,
					//	name: $scope.cities[i].name
					//});
				}
				//$scope.countriest1 = arrt;
				//$scope.countriest1 = data;
				//alert('2:'+$scope.profile.COUNTRY);

				//if ($scope.profile.CITY != '') {
				//	$scope.countriest = $scope.profile.COUNTRY;
				//} else {
				//	$scope.countriest = $scope.countriest1[0].id;
				//}
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});
//cityResource.get('44')
//cityResource.where('44')
		//alert('21:'+$scope.countriest);

	$scope.submit = function(){
		if(this.formprofile.$valid){
			$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
			}).then(function(){
			});
			profileResource.post($scope.profile)
			.success(function(data, status, headers, config) {
				$scope.profile = data;
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});
		}
	}
	$scope.updateMySelectedOptions= function(oldValue, newValue) {
			cityResource.where(newValue.id)
				.success(function(data, status, headers, config) {
					$scope.cities = data;
					for (var i =0; i < $scope.cities.length; i++) {
						if ($scope.cities[i].id == $scope.profile.CITY) {
							$scope.city1 = $scope.cities[i];
							
							//alert('231 cityResource.where '+$scope.cities[i].id + ' - ' + $scope.profile.CITY);
							
							break;
						}
					}
					$ionicLoading.hide();
				})
				.error(function(data, status, headers, config) {
					$ionicLoading.hide();
				});
		//}
	}
$scope.hasChanged = function(cidade) {
    //alert('hasChanged ' + cidade);
	$scope.profile.CITY = cidade;
	//alert('230 ' + $scope.profile.CITY);
  }
});