var directives = angular.module('app.directives', []);
var factories = angular.module('app.factories', []);
var controllers = angular.module('app.controllers', []);
var app = angular.module('app', ['ngRoute', 'app.directives', 'app.factories', 'app.controllers']);

app.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.
	
		when('/stepOne', {
			templateUrl: 'view/StepOneEditor.htm',
			//controller : BookingController
		}).	
		
		when('/stepTwo', {
			templateUrl: 'view/StepTwoEditor.htm',
			//controller : BookingController
		}).			
	
		otherwise({
			redirectTo: '/stepOne'
		});
}]);

