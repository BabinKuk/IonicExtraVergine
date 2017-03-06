// Ionic Extravergine App

document.addEventListener('deviceready', function () {
    // cordova.plugins.email is now available
	console.log('deviceready....');
}, false);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'extravergine' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'extravergine.controllers' is found in controllers.js
angular.module('extravergine', ['ionic', 'extravergine.controllers', 'extravergine.services', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
			
			cordova.plugins.email.isAvailable(
				function (isAvailable) {
					// alert('Service is not available') unless isAvailable;
					console.log('Email service: ' + isAvailable);
				}
			);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		
		/*var deviceInformation = ionic.Platform.device();
		console.log('platform: ' +  deviceInformation.platform);
		console.log('udid: ' + deviceInformation.uuid);*/
	});
	
	// back button handling
	$ionicPlatform.registerBackButtonAction(function (event) {
		
		event.preventDefault();
		console.log("back button action handler");
		console.log($state.current);
		/*// alert dialog
		$scope.showAlert = function() {
			var alertPopup = $ionicPopup.alert({
				title: $state.current.name,
				template: $state.current.name
			});
			
			alertPopup.then(function(res) {
				console.log($state.current.name);
			});
		};
		*/
		/*
		if($state.current.name == "tab.home"){
			console.log('tab.home');
			//navigator.app.exitApp(); //<-- remove this line to disable the exit
			
			$ionicPopup.confirm({
				title: 'System warning',
				template: 'Are you sure you want to exit?'
			}).then(function(res) {
				if (res) {
					ionic.Platform.exitApp();
				}
			})
		} else {
			//console.log('app.backhistory');
			navigator.app.backHistory();
		}*/
	}, 999);
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {
	
	/*$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});*/
	
	for(lang in translations){
		$translateProvider.translations(lang, translations[lang]);
		console.log('lang in translations: ' + lang);
	}
	$translateProvider.preferredLanguage(getLanguage());
	
	// Enable escaping of HTML using escape
	$translateProvider.useSanitizeValueStrategy('escape');
	
	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	.state('app.settings', {
		url: '/settings',
		views: {
			'menuContent': {
				templateUrl: 'templates/settings.html'
			}
		}
	})
	.state('app.cultivars', {
		url: '/cultivars',
		views: {
			'menuContent': {
				templateUrl: 'templates/cultivars.html'
			}
		}
	})
	.state('app.cultivars-list', {
		url: '/cultivars-list',
		views: {
			'menuContent': {
				templateUrl: 'templates/cultivars-list.html',
				controller: 'CultivarsCtrl'
			}
		}
	})
	.state('app.cultivar', {
		url: '/cultivars/:cultivarId',
		views: {
			'menuContent': {
				templateUrl: 'templates/cultivar.html',
				controller: 'CultivarCtrl'
			}
		}
	})
	.state('app.calendar', {
		url: '/calendar',
		views: {
			'menuContent': {
				templateUrl: 'templates/calendar.html'
			}
		}
	})
	.state('app.calendar-list', {
		url: '/calendar-list',
		views: {
			'menuContent': {
				templateUrl: 'templates/calendar-list.html',
				controller: 'CalendarCtrl'
			}
		}
	})
	.state('app.month', {
		url: '/calendar/:monthId',
		views: {
			'menuContent': {
				templateUrl: 'templates/month.html',
				controller: 'MonthCtrl'
			}
		}
	})
	.state('app.diseases', {
		url: '/diseases',
		views: {
			'menuContent': {
				templateUrl: 'templates/diseases.html'
			}
		}
	})
	.state('app.diseases-list', {
		url: '/diseases-list',
		views: {
			'menuContent': {
				templateUrl: 'templates/diseases-list.html',
				controller: 'DiseasesCtrl'
			}
		}
	})
	.state('app.disease', {
		url: '/diseases/:diseaseId',
		views: {
			'menuContent': {
				templateUrl: 'templates/disease.html',
				controller: 'DiseaseCtrl'
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/cultivars');
});

// check LocalStorage for language
function getLanguage(){
	var language = '';
	if ((localStorage.language == null) || (localStorage.language == '')) {
		// set HR as default
		language = 'HR';
	} else {
		language = localStorage.getItem('language');
	}
	console.log('get language ' + language);
	return language;
}

// get device information
function getDeviceInfo() {
	//console.log(ionic.Platform.device());
	return ionic.Platform.device();
}

// display popup to exit app
function showExitAppPopup(ionicPopup){
	console.log('showExitAppPopup');
	console.log(translations);
	var popupText = getPopupText(getLanguage());
	console.log(popupText.attention);

	// custom popup
	var confirmPopup = ionicPopup.confirm({
		title: popupText.attention,
		type: 'button-balanced',
		template: popupText.attentionDesc
	}).then(function(res) {
		if (res) {
			ionic.Platform.exitApp();
		}
	});
}

// get popup text translations
function getPopupText(lang){
	console.log('getPopupText ' + lang);
	return translations[lang];
}