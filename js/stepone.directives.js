/**
* Step One directive
*/
directives.directive('stepOneEditor',['BookingService', function(BookingService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/step-one-editor-template.htm',
		controller: function($scope){
		},
		link:
			function(scope, element, attrs, location){
				scope.value = {};
				scope.value.weeks = weeksArray();
				scope.value.theDaysOfWeek = [];
				scope.value.weeklyTickets = {};
				scope.value.theDateOfFortnight = [];
				scope.value.selectedDate = '';
				scope.value.showstepone = true;
				scope.value.showsteptwo = false;
				scope.value.showstepthree = false;
				scope.value.showstepfour = false;
				scope.value.showstepfive = false;
				
				BookingService.getWeeklyTickets().then(function(_result){
					//scope.value.weeklyTickets = _result.data;	
					scope.value.setWeeklyTickets();
				});
				
				scope.value.startBooking = function(){
					//location.path("index.html#/view/StepTwoEditor.htm");
					scope.value.showstepone = false;
					scope.value.showsteptwo = true;
					scope.value.showstepthree = false;
					scope.value.showstepfour = false;
					scope.value.showstepfive = false;					
				}
				
				scope.value.previous2 = function(){
					scope.value.showstepone = true;
					scope.value.showsteptwo = false;
					scope.value.showstepthree = false;
					scope.value.showstepfour = false;
					scope.value.showstepfive = false;					
				}		
				
				scope.value.next2 = function(){
					scope.value.showstepone = false;
					scope.value.showsteptwo = false;
					scope.value.showstepthree = true;
					scope.value.showstepfour = false;
					scope.value.showstepfive = false;					
				}	
				
				scope.value.previous3 = function(){
					scope.value.showstepone = false;
					scope.value.showsteptwo = true;
					scope.value.showstepthree = false;
					scope.value.showstepfour = false;
					scope.value.showstepfive = false;					
				}		
				
				scope.value.next3 = function(){
					scope.value.showstepone = false;
					scope.value.showsteptwo = false;
					scope.value.showstepthree = false;
					scope.value.showstepfour = true;
					scope.value.showstepfive = false;	
					scope.value.generateBookingNumber();
				}					
				
				scope.value.setWeeklyTickets = function(){
					var firstDayOfWeek = new Date();
					var lastDayOfWeek = new Date();
					var thedate = new Date();
					var weekstart = thedate.getDate() - thedate.getDay();
					firstDayOfWeek.setDate(weekstart);
					for(i=0; i < 14; i++){
						var currentDate = new Date();
						currentDate.setDate(firstDayOfWeek.getDate() + i);
						// set tickets number 
						var day = {
							"dateOfWeek": dateToStr(currentDate),
							"tickets": "",
						}
						//scope.value.weeklyTickets.push(day);
						scope.value.theDateOfFortnight.push(dateToStr(currentDate));
					}
					
					scope.value.firstDayOfWeek = new Date(firstDayOfWeek);
					
					scope.value.setDaysOfWeek(new Date(firstDayOfWeek));					
				}
				
				scope.value.setDaysOfWeek = function(_firstDay){
					scope.value.theDaysOfWeek = [];
					var newday = new Date(_firstDay);
					for(var i=0; i<7; i++){
						var day = newday.getDate();
						scope.value.theDaysOfWeek.push(day);
						newday = new Date(newday.setDate(day + 1));
					}
				}
								
				scope.value.isDayOfToday = function(_date){
					return isToday(_date);
				}
				
				// set selected table cell row and column 
				scope.value.selectCell = function(_row, _col){
					scope.value.selectedRow = _row;
					scope.value.selectedColumn = _col;
					//alert(_row + ',' + _col);
					scope.value.selectedDate = scope.value.theDateOfFortnight[_row * 7 + _col];
				}
				
				// set selected table cell backtground color
				scope.value.changeSelectedCellBgColor = function(_row, _col){
					if(scope.value.selectedRow==_row &&
							scope.value.selectedColumn==_col){
						return "grey";
					}else{
						return "white";
					}
				}			
				
				// step two
				scope.value.tickets = {};
				scope.value.programs = {};
				scope.value.ticketPrices = {};
				scope.value.idCards = {};
				scope.value.booking = [];
				scope.value.totalPrice = 0;

			    BookingService.getPrograms().then(function(_result){
					scope.value.programs = _result.data;	
				});
				
			    BookingService.getTicketPrices().then(function(_result){
					scope.value.ticketPrices = _result.data;	
				});
			    
			    BookingService.getIdCards().then(function(_result){
			    	scope.value.idCards = _result.data;	
				});
				
				scope.value.addToBooking = function(){
					var programid = scope.value.selectedProgram.id;
					var programName = scope.value.selectedProgram.programName;
					var ticketid = scope.value.selectedPrice.id;
					var ticketName = scope.value.selectedPrice.ticketName;
					var price = scope.value.selectedPrice.price;
					var card = scope.value.selectedIdCard.cardName;
					
					scope.value.booking.push({ 
		                'programId': programid, 
		                'programName': programName, 
		                'ticketId': ticketid,
		                'ticketName': ticketName,
		                'price': price,
		                'card': card,
		                'cardNumber': scope.value.cardNumber,
		            });
					
					scope.value.setTotalPrice();
		        };
				
		        scope.value.removeFromBooking = function(item){
		        	scope.value.booking.splice(item, 1);
		        	scope.value.setTotalPrice();
		        }
				
				// step three
		        scope.value.setTotalPrice = function(){
		        	var total = 0;
		        	for(i = 0; i < scope.value.booking.length; i++){
		        		total += scope.value.booking[i].price*1;
		        	}
		        	scope.value.totalPrice = total;
		        }
		        
		        scope.value.generateBookingNumber = function(){
				    BookingService.generateBookingId().then(function(_result){
				    	scope.value.bookingId = _result.data.id;	
					});
		        }
		        
		        // step four
		        scope.value.payment = {};
		        scope.value.doPayment = function(){
		        	// call payment; 
					scope.value.showstepone = false;
					scope.value.showsteptwo = false;
					scope.value.showstepthree = false;
					scope.value.showstepfour = false;
					scope.value.showstepfive = true;	
		        }
				
			}
	}
}]);

