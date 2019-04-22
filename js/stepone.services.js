
/**
* Checkin service
*/
factories.factory('BookingService', function($http){
	return {
		
		getWeeklyTickets: function() {
			console.log("SERVICE: calling all tickets...");
			return $http.get('json/availabletickets.json');
		},
		
		getPrograms: function() {
			console.log("SERVICE: calling all programes...");
			return $http.get('json/programes.json');
		},	
		
		getTicketPrices: function() {
			console.log("SERVICE: calling all ticket prices...");
			return $http.get('json/ticketPrices.json');
		},
		
		getIdCards: function() {
			console.log("SERVICE: calling all ticket prices...");
			return $http.get('json/idcards.json');
		},
		
		generateBookingId: function() {
			console.log("SERVICE: calling all ticket prices...");
			return $http.get('json/bookingId.json');
		},
		
		
	};
});
