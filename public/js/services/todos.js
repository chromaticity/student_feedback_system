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
			delete : function(id) {
				return $http.delete('/api/feedback/' + id);
			}
		}
	}]);