// Ionic Extravergine App

document.addEventListener('deviceready', function () {
    // cordova.plugins.email is now available
	//console.log('deviceready....');
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
					//console.log('Email service: ' + isAvailable);
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
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {
	
	/*$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});*/
	
	for(lang in translations){
		$translateProvider.translations(lang, translations[lang]);
		//console.log('lang in translations: ' + lang);
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
	//console.log('get language ' + language);
	return language;
}

// get device information
function getDeviceInfo() {
	//console.log(ionic.Platform.device());
	return ionic.Platform.device();
}