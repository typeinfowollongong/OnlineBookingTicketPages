
/**
* Checkin service
*/
factories.factory('StepOneService', function($http){
	return {
		getWeeklyAvailableTickets: function() {
			console.log("SERVICE: calling all tickets...");
			//return $http.get('json/availabletickets.json');
		},
		
		getWeeklyTickets: function() {
			console.log("SERVICE: calling all tickets...");
			return $http.get('json/availabletickets.json');
		},
	};
});
