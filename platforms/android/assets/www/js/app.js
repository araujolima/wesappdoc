// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var translations = {
  You_send: 'You send',
  Beneficiary_receives: 'Beneficiary receives',
  Rate: 'Rate',
  Fee: 'Fee',
  Send: 'Send',
  Invite: 'Invite',
  Transfers: 'Transfers',
  Beneficiaries: 'Beneficiaries',
  Profile: 'Profile',
  Logout: 'Logout',
  Calculator: 'Calculator',
  About: 'About',
  Do_the_Math: 'Do the Math',
  Who_We_Are: 'Who We Are',
  Message1: 'Especial rates all the time',
  Message2: 'The smartest way to transfer',
  Message3: 'money abroad',
  Message4: 'growing up with you',
  Message5: 'Know more about',
  Message6: 'is your best option for',
  payment_services: 'payment services',
  Message7: 'For any business or individual anywhere in world',
  Message8: 'makes it easy to send money abroad',
  Message9: 'We are a growing money remittance company that our clients are satisfied and happy with our service',
  Message10: 'We continue to innovate, developing new ways to send money abroad',
  Message11: 'We know that moving your money around the world means a lot more than just changing british pounds to Reais, or euros to any other currency',
  Message12: 'believes that when money moves, better things can happen',
  Login: 'Login',
  Register: 'Register',
  Your_transfers: 'Your transfers',
  Your_profile: 'Your profile',
  PARAGRAPH: 'Srsly!',
  NAMESPACE: {
    PARAGRAPH: 'And it comes with awesome features!'
  }
};
var translationspt = {
  You_send: 'Você envia',
  Beneficiary_receives: 'Beneficiário recebe',
  Rate: 'Cotação',
  Fee: 'Taxa',
  Send: 'Enviar',
  Invite: 'Convite',
  Transfers: 'Envios',
  Beneficiaries: 'Beneficiários',
  Profile: 'Perfil',
  Logout: 'Sair',
  Calculator: 'Calculadora',
  About: 'Sobre',
  Do_the_Math: 'Simule seu envio',
  Who_We_Are: 'Quem somos',
  Message1: 'Taxas especiais o tempo todo',
  Message2: 'A forma mais inteligente de transferir',
  Message3: 'dinheiro para o exterior',
  Message4: 'crescendo com você',
  Message5: 'Saiba mais sobre',
  Message6: 'é sua melhor opção para',
  payment_services: 'serviços de envio',
  Message7: 'Para qualquer empresa ou pessoa no mundo',
  Message8: 'facilita o envio de dinheiro para o exterior',
  Message9: 'Somos uma empresa em crescimento para remessa de dinheiro e nossos clientes estão satisfeitos e felizes com o nosso serviço',
  Message10: 'Continuamos a inovar, oferecendo novos meios para envio de dinheiro para o exterior',
  Message11: 'Sabemos que movimentar seu dinheiro ao redor do mundo significa muito mais do que apenas trocar libras por reais ou euros por qualquer outra moeda',
  Message12: 'acredita que quando o dinheiro se move, coisas melhores podem acontecer',
  Login: 'Login',
  Register: 'Registro',
  Your_transfers: 'Seus envios',
  Your_profile: 'Seu perfil',
  PARAGRAPH: 'Srsly!',
  NAMESPACE: {
    PARAGRAPH: 'And it comes with awesome features!'
  }
};

angular.module('app', ['ionic','ngCordova','ngLocalStorage','app.controllers', 'app.services', 'app.filters','pascalprecht.translate',
  'app.documents-controller',
  'app.document-persist-controller','app.profile-controller','ui.utils.masks','ionic-datepicker'])

.run(function($ionicPlatform, $rootScope,$ionicHistory,$state,$localStorage,$ionicHistory) {

  $rootScope.style = "theme2";
  $rootScope.stylea = "css/" + $rootScope.style + "/style.css";
  $rootScope.styleb = "css/" + $rootScope.style + "/home-style.css";
  //$rootScope.lang = "en-UK";
  $rootScope.lang = "pt-BR";
  //$rootScope.baseURL = 'http://www.infohds.com.br';
  // Development
  //$rootScope.baseURL = 'http://localhost/wesapp';
  // Production
  $rootScope.baseURL = 'https://worldeyesolutionsdev.com/wesapp';
  
  //$rootScope.baseURL = 'http://127.0.0.1';
  $rootScope.user = {};

  //$rootScope.baseURL = 'http://192.168.25.18:8080';
  //$rootScope.baseURL = 'http://lucasgreis92.hopto.org:8080';
  
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  $rootScope.goTabHome = function() {
    $state.go('tab.home');
  };

  $rootScope.logout = function(){
    var key = 'user';
    $localStorage.putObject(key,{});
    $rootScope.user = {};
	$ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });   
    $state.go('home');
  }
  $rootScope.goBenefiPesist = function(){
    $state.go('tab.benefi-persist');
  }
  //$rootScope.goHomeBenefi = function(moedaDestino,sended,valorDestino,fee,rate){
  //  $state.go('tab.home-benefi',{moedaDestino:moedaDestino,sended:sended,valorDestino:valorDestino,fee:fee,rate:rate});
  //}
  $rootScope.goHomeBenefi = function(moedaDestino,sended,valorDestino,fee,rate,curpairdest,ctrycode){
    $state.go('tab.home-benefi',{moedaDestino:moedaDestino,sended:sended,valorDestino:valorDestino,fee:fee,rate:rate,curpairdest:curpairdest,ctrycode:ctrycode});
  }

  $rootScope.goDocuments = function(){
    $state.go('tab.documents');
  }

  $rootScope.goDocumentPersist = function(){
	  //alert('ola');
    $state.go('tab.document-perist');
  }
  
})

/*.config(['$translateProvider', function ($translateProvider) {
  // add translation table
  $translateProvider
    .translations('en', translations)
    .preferredLanguage('en');
}]);*/

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider,$translateProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $translateProvider
    .translations('en', translations)
    .translations('pt', translationspt)
	.useSanitizeValueStrategy('escape')
    .preferredLanguage('en');

	/*$translateProvider.translations('en', {
		hello_message: "Howdy",
		goodbye_message: "Goodbye"
	});
	$translateProvider.translations('es', {
		hello_message: "Hola",
		goodbye_message: "Adios"
	});
	$translateProvider.preferredLanguage("en");
	$translateProvider.fallbackLanguage("en");*/

  // ajustes para ws em php
  /*$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};**/


  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider







  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

   

  .state('tab.profile', {
    url: '/profile',
    cache:false,
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileController'
      }
    }
  })

  .state('tab.documents',{
    url:'/documents',
    cache:false,
    views:{
      'tab-profile':{
        templateUrl:'templates/documents.html',
        controller:'DocumentsController'     
      }
    }
  })

.state('tab.document-perist',{
    url:'/document-persist',
    cache:false,
    views:{
      'tab-profile':{
        templateUrl:'templates/document-persist.html',
        controller:'DocumentPersistController'     
      }
    }
  })

  // Each tab has its own nav history stack:

  /*.state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  }) **/


  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/profile');
  $urlRouterProvider.otherwise('/tab/document-persist');
    //$urlRouterProvider.otherwise('/home');

  });

