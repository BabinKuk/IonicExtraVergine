angular.module('extravergine.services', [])

.factory('CultivarList', function($http, $q, $filter) {
	
	return {
		// service functions
		all: all,
		get: get
	};
	
	// get all cultivars
	function all(){
		// get list of cultivars (translated)
		var cultivars = translations[getLanguage()].cultivars;
		return cultivars;
	}
	
	// get particular cultivar details
	function get(cultivarId) {
		// get list of cultivars (translated)
		var cultivars = translations[getLanguage()].cultivars;
		var cultivar = '';
		for (var i = 0; i < cultivars.length; i++) {
			if (cultivars[i].id === parseInt(cultivarId)) {
				cultivar = cultivars[i];
			}
		}
		return cultivar;
	}
})

.factory('DiseaseList', function($http, $q, $filter) {
	
	return {
		// service functions
		all: all,
		get: get
	};

	// get all diseases
	function all() {
		// get list of diseases (translated)
		var diseases = translations[getLanguage()].diseases;
		return diseases;
	}
	
	// get particular disease details
	function get(diseaseId) {
		// get list of diseases (translated)
		var diseases = translations[getLanguage()].diseases;
		var disease = '';
		for (var i = 0; i < diseases.length; i++) {
			if (diseases[i].id === parseInt(diseaseId)) {
				disease = diseases[i];
			}
		}
		return disease;
	}
})

.factory('Calendar', function($http, $q, $filter) {
	
	return {
		// service functions
		all: all,
		get: get
	};

	// get calendar
	function all() {
		// get complete calendar (translated)
		var calendar = translations[getLanguage()].calendar;
		return calendar;
	}
	
	// get month details
	function get(monthId) {
		// get complete calendar (translated)
		var calendar = translations[getLanguage()].calendar;
		var month = '';
		for (var i = 0; i < calendar.length; i++) {
			if (calendar[i].id === parseInt(monthId)) {
				month = calendar[i];
			}
		}
		return month;
	}
});
