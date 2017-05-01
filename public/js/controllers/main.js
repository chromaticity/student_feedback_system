angular.module('feedbackController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Feedbacks', function($scope, $http, Feedbacks) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all feedback and show them
		// use the service to get all the feedback
		Feedbacks.get()
			.success(function(data) {
				$scope.feedback = data;
				$scope.loading = false;
			});

		// CREATE THUMBS UP ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createThumbsUp = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Feedbacks.createTU($scope.formData)

					// if successful creation, call our get function to get all the new feedback
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.feedback = data; // assign our new list of feedback
					});
			}
		};

		$scope.createThumbsDown = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Feedbacks.createTD($scope.formData)

					// if successful creation, call our get function to get all the new feedback
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.feedback = data; // assign our new list of feedback
					});
			}
		};

		// angular scope for speaking louder
		$scope.createSpeakLouder = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Feedbacks.createSL($scope.formData)

					// if successful creation, call our get function to get all the new feedback
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.feedback = data; // assign our new list of feedback
					});
			}
		};

		// speak slower angular scope
		$scope.createSpeakSlower = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Feedbacks.createSS($scope.formData)

					// if successful creation, call our get function to get all the new feedback
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.feedback = data; // assign our new list of feedback
					});
			}
		};

		// DELETE ==================================================================
		$scope.deleteAllFeedback = function() {
			// call delete function from express js route
			Feedbacks.delete();
			window.location.reload(true);
		};
	}]);