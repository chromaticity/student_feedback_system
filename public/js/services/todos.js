angular.module('feedbackService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Feedbacks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/feedback');
			},
			createTU : function(thumbsupData) {
				return $http.post('/api/thumbsup', thumbsupData);
			},
			createTD : function(thumbsdownData) {
				return $http.post('/api/thumbsdown', thumbsdownData);
			},
			createSL : function(speaklouderData) {
				return $http.post('/api/speaklouder', speaklouderData);
			},
			createSS : function(speakslowerData) {
				return $http.post('/api/speakslower', speakslowerData);
			},
			createSF : function(speakfaster) {
				return $http.post('/api/speakfaster', speakfaster);
			},
			delete : function() {
				return $http.delete('/api/feedback/');
			}
		}
	}]);