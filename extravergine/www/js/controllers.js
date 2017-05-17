angular.module('extravergine.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $translate, $ionicPopup, $ionicPlatform, $state) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	// check language
	$translate.use(getLanguage());
	
	$scope.setLanguage = function(lang){
		localStorage.setItem('language', lang);
		//console.log(lang + ' language set');
		$translate.use(getLanguage());
	}
	
	// set default language (checked radio)
	$scope.language = getLanguage();
	
	$scope.sendMail = function(){
		//console.log('sendMail ' + $scope.deviceInformation);
		$scope.deviceInformation = getDeviceInfo();
		//console.log($scope.deviceInformation);
		
		//var mailto = 'mailto:dolija@dolija.com?subject=ExtraVergine App Feedback&body=' + $scope.deviceInformation.name + ', ' + $scope.deviceInformation.version + ', ' + $scope.deviceInformation.platform + ', ' + $scope.deviceInformation.uuid;
		//empty body
		var mailto = 'mailto:dolija@dolija.com?subject=ExtraVergine App Feedback';
		//console.log(mailto);
		
		window.open(mailto, '_system')
	}
	
	// exit app popup
	$scope.showPopup = function(){
		showExitAppPopup();
	};
	
	// back button handling
	$ionicPlatform.registerBackButtonAction(function (event) {
		event.preventDefault();
		//console.log("back button action handler");
		
		if($state.current.name == "app.cultivars"){
			//console.log('home page -> exit app');
			//exit app popup
			showExitAppPopup();
		} else {
			//console.log('app.backhistory');
			navigator.app.backHistory();
		}
	}, 100);
	
	// exit app handler function
	function showExitAppPopup(){
		//console.log('showExitAppPopup');
		//console.log(translations);
		
		var popupText = getPopupText(getLanguage());
		
		// custom popup
		var confirmPopup = $ionicPopup.confirm({
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
		//console.log('getPopupText ' + lang);
		return translations[lang];
	}
})

.controller('CultivarsCtrl', function($scope, $translate, CultivarList) {
	$translate.use(getLanguage());
	
	// get cultivars using service
	$scope.cultivars = CultivarList.all();
})

.controller('CultivarCtrl', function($scope, $stateParams, $translate, $ionicModal, $ionicSlideBoxDelegate, CultivarList) {
	$translate.use(getLanguage());
	$scope.cultivar = '';
	$scope.modal = '';
	
	//check id first
    if($stateParams.cultivarId != undefined){
		// get particular cultivar using service
		$scope.cultivar = CultivarList.get($stateParams.cultivarId);
	}
	
	// modal
	$ionicModal.fromTemplateUrl('templates/modal-photo-slide.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		//console.log($scope);
		$scope.modal = modal;
	});
	
	$scope.openModal = function(slide) {
		//console.log('openModal ' + slide);
		$scope.photos = $scope.cultivar.imageArray;
		$ionicSlideBoxDelegate.slide(slide);
		//console.log($scope.photos);
		$scope.modal.show();
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
	
	// screen orientation listener
	window.addEventListener("orientationchange", function(){
		//console.log(screen.orientation);
		
		// if modal is shown, re-open modal
		if ($scope.modal.isShown()) {
			//console.log('re-open modal');
			$scope.modal.hide();
			setTimeout(function(){
				//console.log($ionicSlideBoxDelegate.currentIndex());
				$scope.openModal($ionicSlideBoxDelegate.currentIndex())
			}, 500);
		}
	});
})

.controller('DiseasesCtrl', function($scope, $translate, DiseaseList) {
	$translate.use(getLanguage());
	
	// get diseases using service
	$scope.diseases = DiseaseList.all();
})

.controller('DiseaseCtrl', function($scope, $stateParams, $translate, $ionicModal, $ionicSlideBoxDelegate, DiseaseList) {
	$translate.use(getLanguage());
	
	//init
	$scope.disease = '';
	$scope.photos = '';
	$scope.selectedSlide = '';
	
	$scope.swiperThumbOptions = {
		/* Swiper options */
		effect: 'slide',
		initialSlide: 0,
		//centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true,
		spaceBetween: 2,
		/*pagination: '.swiper-pagination',*/
		/*paginationClickable: true,*/
		pagination: false,
		freeMode: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		/* Initialize a scope variable with the swiper */
		onInit: function(swiper){
			$scope.swiper = swiper;
			// Now you can do whatever you want with the swiper
			//console.log(swiper);
		},
		onSlideChangeEnd: function(swiper){
			//console.log('The active index is ' + swiper.activeIndex); 
		}
	};
	
	//check id first
    if($stateParams.diseaseId != undefined){
		// get particular disease using service
		$scope.disease = DiseaseList.get($stateParams.diseaseId);
		$scope.photos = $scope.disease.imageArray;
	}
	
	// modal
	$ionicModal.fromTemplateUrl('templates/modal-photo-slide.html', {
	//$ionicModal.fromTemplateUrl('templates/photo-modal-slider-new.html', {	
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		//console.log($scope);
		$scope.modal = modal;
	});
	
	$scope.openModal = function(index) {
		//console.log($scope.photos);
		//console.log('openModal ' + index);
		$scope.selectedSlide = index;
		//$scope.photos = $scope.disease.imageArray;
		//console.log($ionicSlideBoxDelegate.slide(index));
		$scope.modal.show();
		$ionicSlideBoxDelegate.slide(index);
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	// Call this functions if you need to manually control the slides
    $scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	
    $scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
    };
	
	// Called each time the slide changes
    $scope.slideChanged = function(index) {
		//console.log('slideChanged disease');
		$scope.slideIndex = index;
		//console.log($scope.photos[index]);
    };
	
	// screen orientation listener
	window.addEventListener("orientationchange", function(){
		//console.log(screen.orientation);
		//console.log(document.getElementsByTagName('ion-modal-view')[0].clientWidth);
		//console.log(document.getElementsByTagName('div'));		
		//console.log(document.querySelectorAll('div.modal.image-modal.transparent')[0]);
		//console.log(document.querySelectorAll('div.modal.image-modal.transparent')[0].clientWidth);
		//$ionicSlideBoxDelegate.update();
		//console.log(document.getElementsByTagName('ion-slide'));
		//console.log($ionicSlideBoxDelegate.currentIndex());
		//console.log(document.getElementsByTagName('ion-slide')[$ionicSlideBoxDelegate.currentIndex()]);
		//document.getElementsByTagName('ion-slide')[$ionicSlideBoxDelegate.currentIndex()].style.transform = 'translate(0px, 0px) translateZ(0px)';
		// if modal is shown, re-open modal
		if ($scope.modal.isShown()) {
			//console.log('re-open modal');
			$scope.modal.hide();
			setTimeout(function(){
				//console.log('currentIndex ' + $ionicSlideBoxDelegate.currentIndex());
				$scope.openModal($ionicSlideBoxDelegate.currentIndex())
			}, 500);
		}
	});
})

.controller('CalendarCtrl', function($scope, $translate, Calendar) {
	$translate.use(getLanguage());
	
	// get calendar using service
	$scope.calendar = Calendar.all();
})

.controller('MonthCtrl', function($scope, $stateParams, $translate, $ionicModal, $ionicSlideBoxDelegate, Calendar) {
	$translate.use(getLanguage());
	
	//init
	$scope.month = '';
	$scope.photos = '';
	$scope.selectedSlide = '';
	
	$scope.swiperThumbOptions = {
		/* Swiper options */
		effect: 'slide',
		initialSlide: 0,
		//centeredSlides: true,
        slidesPerView: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true,
		spaceBetween: 2,
		/*pagination: '.swiper-pagination',*/
		/*paginationClickable: true,*/
		pagination: false,
		freeMode: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		/* Initialize a scope variable with the swiper */
		onInit: function(swiper){
			$scope.swiper = swiper;
			// Now you can do whatever you want with the swiper
			//console.log(swiper);
		},
		onSlideChangeEnd: function(swiper){
			//console.log('The active index is ' + swiper.activeIndex); 
		}
	};
	
	//check id first
    if($stateParams.monthId != undefined){
		// get particular month using service
		$scope.month = Calendar.get($stateParams.monthId);
		$scope.photos = $scope.month.imageArray;
	}
	
	// modal
	$ionicModal.fromTemplateUrl('templates/modal-photo-slide.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		//console.log($scope);
		$scope.modal = modal;
	});
	
	$scope.openModal = function(index) {
		//console.log($scope.photos);
		//console.log('openModal ' + index);
		$scope.selectedSlide = index;
		//$scope.photos = $scope.disease.imageArray;
		//console.log($ionicSlideBoxDelegate.slide(index));
		$scope.modal.show();
		$ionicSlideBoxDelegate.slide(index);
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	// Call this functions if you need to manually control the slides
    $scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	
    $scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
    };
	
	// Called each time the slide changes
    $scope.slideChanged = function(index) {
		$scope.slideIndex = index;
    };
	
	// screen orientation listener
	window.addEventListener("orientationchange", function(){
		//console.log(screen.orientation);
		//console.log(document.getElementsByTagName('ion-modal-view')[0].clientWidth);
		//console.log(document.getElementsByTagName('div'));		
		//console.log(document.querySelectorAll('div.modal.image-modal.transparent')[0]);
		//console.log(document.querySelectorAll('div.modal.image-modal.transparent')[0].clientWidth);
		//$ionicSlideBoxDelegate.update();
		//console.log(document.getElementsByTagName('ion-slide'));
		//console.log($ionicSlideBoxDelegate.currentIndex());
		//console.log(document.getElementsByTagName('ion-slide')[$ionicSlideBoxDelegate.currentIndex()]);
		//document.getElementsByTagName('ion-slide')[$ionicSlideBoxDelegate.currentIndex()].style.transform = 'translate(0px, 0px) translateZ(0px)';
		// if modal is shown, re-open modal
		if ($scope.modal.isShown()) {
			//console.log('re-open modal');
			$scope.modal.hide();
			setTimeout(function(){
				//console.log($ionicSlideBoxDelegate.currentIndex());
				$scope.openModal($ionicSlideBoxDelegate.currentIndex())
			}, 500);
		}
	});
});
