
/**
* Checkin service
*/
factories.factory('StepTwoService', function($http){
	return {
			
		getPrograms: function() {
			console.log("SERVICE: calling all programes...");
			return $http.get('json/programes.json');
		},	
		
		getTicketPrices: function() {
			console.log("SERVICE: calling all ticket prices...");
			return $http.get('json/ticketPrices.json');
		},		
		
	};
});
