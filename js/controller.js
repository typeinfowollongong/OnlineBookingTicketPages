/**
 * booking controller
 */
controllers.controller('bookingCtrl', ['ShareService', '$scope', '$location', function(ShareService, $scope, $location){
	
	console.log('bookingCtrl start ...');
	
	$scope.value = {};
	$scope.value.weeks = weeksArray();
	$scope.value.theDaysOfWeek = [];
	$scope.value.theDateOfFortnight = [];
	
	// go to steptwo
	$scope.value.startBooking = function(){	
		// set selected date
		ShareService.set('selectedDate', $scope.value.selectedDate);
		$scope.value.gotoStepTwo();		
	}	
	
	$scope.value.gotoStepTwo = function(){
		$location.path("/steptwo");				
	}	
		
	function setCalendar(){
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
			//$scope.value.weeklyTickets.push(day);
			$scope.value.theDateOfFortnight.push(dateToStr(currentDate));
		}
		
		$scope.value.firstDayOfWeek = new Date(firstDayOfWeek);
		
		setDaysOfWeek(new Date(firstDayOfWeek));					
	}
	
	function setDaysOfWeek(_firstDay){
		$scope.value.theDaysOfWeek = [];
		var newday = new Date(_firstDay);
		for(var i=0; i<7; i++){
			var day = newday.getDate();
			$scope.value.theDaysOfWeek.push(day);
			newday = new Date(newday.setDate(day + 1));
		}
	}
	
	$scope.value.isDayOfToday = function(_date){
		return isToday(_date);
	}
	
	// set selected table cell row and column 
	$scope.value.selectCell = function(_row, _col){
		$scope.value.selectedRow = _row;
		$scope.value.selectedColumn = _col;
		//alert(_row + ',' + _col);
		$scope.value.selectedDate = $scope.value.theDateOfFortnight[_row * 7 + _col];
	}
	
	// set selected table cell backtground color
	$scope.value.changeSelectedCellBgColor = function(_row, _col){
		if($scope.value.selectedRow==_row &&
				$scope.value.selectedColumn==_col){
			return "grey";
		}else{
			return "white";
		}
	}		
	
	setCalendar();
	
}]);


/**
 * Add orders controller
 */
controllers.controller('orderCtrl', ['BookingService', 'ShareService', '$scope', '$location', function(BookingService, ShareService, $scope, $location){
	console.log('orderCtrl start ...');
	//------------------------------------------
	// step two 
	//-------------------------------------------	
	$scope.value = {};
	$scope.value.tickets = [];
	$scope.value.programs = [];
	$scope.value.ticketPrices = [];	
	$scope.value.booking = [];
	$scope.value.totalPrice = 0;	
	
	$scope.value.selectedDate = ShareService.get('selectedDate');
	//console.log('selected Date: '+ $scope.value.selectedDate);
	BookingService.getTickets($scope.value.selectedDate).then(function(_result){
		$scope.value.tickets = _result.data;	
		setProgramList();
	});		
	
	BookingService.getOnlineWindowId().then(function(_result){
		ShareService.set('onlineWindowId', _result.data.id);	
	});	
	
	
	function setProgramList(){
		var data = [];
		data = $scope.value.tickets;
		var count = data.length;
		for(var i=0; i<count; i++){
			var id = data[i]["themeId"];
			var name = data[i]["themeName"];
			if(!hasProgram(id)){
				$scope.value.programs.push({ 
					'id': id, 
					'name': name, 
				});
			}
		}
	}
	
	function hasProgram(themeId){
		var count = $scope.value.programs.length
		for(var i=0; i<count; i++){
			if($scope.value.programs[i]["id"] == themeId){
				return true;
			}
		}
		return false;
	}
	
	$scope.value.selectProgram = function(){
		var programId = $scope.value.selectedProgram["id"];
		$scope.value.ticketPrices.length = 0; // clear json array
		$scope.value.selectedPrice = undefined;
		setTicketTypeList(programId);			
	}
	
	function setTicketTypeList(programId){
		var data = [];
		data = $scope.value.tickets;
		var count = data.length;
		for(var i=0; i<count; i++){
			var id = data[i]["ticketTypeId"];
			var name = data[i]["ticketTypeName"];
			var price = data[i]["price"];
			var showDateTimeId = data[i]["showDateTimeId"];

			//
			if(data[i]["themeId"] == programId && 
					!hasTicketType(id)){
				$scope.value.ticketPrices.push({ 
					'id': id, 
					'name': name, 
					'price': price,
					'dateTimeId': showDateTimeId
				});				
			}
		}		
	}
	
	function hasTicketType(ticketTypeId){
		var count = $scope.value.ticketPrices.length
		for(var i=0; i<count; i++){
			if($scope.value.ticketPrices[i]["id"] == ticketTypeId){
				return true;
			}
		}
		return false;
	}	
	

	$scope.value.gotoStepThree = function(){
		ShareService.set('orders', $scope.value.booking);
		$location.path("/stepthree");				
	}	

	$scope.value.gotoStepOne = function(){
		$location.path("/stepone");				
	}
	
	$scope.value.addToBooking = function(){
		var programid = $scope.value.selectedProgram.id;
		var programName = $scope.value.selectedProgram.name;
		var ticketid = $scope.value.selectedPrice.id;
		var ticketName = $scope.value.selectedPrice.name;
		var price = $scope.value.selectedPrice.price;
		var showDateTimeId = $scope.value.selectedPrice.price;
		var quantity = $scope.value.ticketQuantity
		
		$scope.value.booking.push({ 
			'programId': programid, 
			'programName': programName, 
			'ticketTypeId': ticketid,
			'ticketTypeName': ticketName,
			'ticketQuantity': quantity,
			'ticketPrice': price,
			'showDateTimeId': showDateTimeId
		});
	};
	
	$scope.value.removeFromBooking = function(item){
		$scope.value.booking.splice(item, 1);
		$scope.value.setTotalPrice();
	}	
	
}]);

/**
 * check orders controller
 */
controllers.controller('checkCtrl', ['BookingService', 'ShareService', '$scope', '$location', function(BookingService, ShareService, $scope, $location){
	console.log('checkCtrl start ...');
	//------------------------------------------
	// step three 
	//-------------------------------------------	
	
	$scope.value = {};
	$scope.value.booking = ShareService.get('orders');	
	$scope.value.selectedDate = ShareService.get('selectedDate');
	$scope.value.bookingDetails = {};
	$scope.value.idCards = [];
	
	BookingService.getIdCards().then(function(_result){
		$scope.value.idCards = _result.data;
	});	
	
	
	$scope.value.gotoStepTwo = function(){
		$location.path("/steptwo");				
	}	

	$scope.value.gotoStepFour = function(){
		setOrderDetails();
		ShareService.set('order_details', $scope.value.bookingDetails);
		$location.path("/stepfour");				
	}	

	function calculate(){
		var total = 0;
		var count = 0;
		for(i = 0; i < $scope.value.booking.length; i++){
			total += $scope.value.booking[i].ticketPrice*1;
			count += $scope.value.booking[i].ticketQuantity*1;
		}
		$scope.value.totalPrice = total;
		$scope.value.totalCount = count;
	}	
	
	function setOrderDetails(){
		var cardNumber = $scope.value.cardNumber;
		var phoneNumber = $scope.value.contactPhoneNumber;
		var count = $scope.value.totalCount;
		var cost = $scope.value.totalPrice;
		var contactName = $scope.value.contactName;
		$scope.value.bookingDetails = {
				"cardNumber": 	cardNumber,
				"phone":		phoneNumber,
				"fullName":				contactName,
				"totalNumberOfTickets": count,
				"totalCostOfTickets": cost,
		};		
	}

	calculate();
}]);


/**
 * confirm orders and payment controller
 */
controllers.controller('payCtrl', ['BookingService', 'ShareService', '$scope', '$location', function(BookingService, ShareService, $scope, $location){
	console.log('payCtrl start ...');
	//------------------------------------------
	// step four 
	//-------------------------------------------	
	
	$scope.value = {};
	$scope.value.bookingDetails = ShareService.get('order_details');
	$scope.value.totalPrice = $scope.value.bookingDetails.totalCostOfTickets;
	
	$scope.value.gotoStepThree = function(){
		$location.path("/stepthree");				
	}	
	
	$scope.value.gotoStepFive = function(){
		$location.path("/stepfive");				
	}

    $scope.value.doPayment = function(){ 
    	// do to: send payment to payment gate way api
    	BookingService.sendPayment().then(function(_result){
    		var paymentId = _result.data.paymentId;
    		var orderData = createOrder(paymentId);
    		BookingService.submitBooking(orderData).then(function(_result){
    			ShareService.set('payment', _result.data);
    			$scope.value.gotoStepFive();
    		});
    	});
    }	
    
    function createOrder(paymentId){
    	var orders = [];
    	var selectedDate = ShareService.get('selectedDate');
    	var arr = ShareService.get('orders');
    	for(i = 0; i < arr.length; i++){
    		orders.push({
    			"typeId": 		arr[i]["programId"],
    			"extendId":  	arr[i]["ticketTypeId"],
    			"price":		arr[i]["ticketPrice"],
    			"number":		arr[i]["ticketQuantity"],
    			"dateOfEntry":	selectedDate
    		});
    	}
    	
		var cardNumber = $scope.value.bookingDetails.cardNumber;
		var phoneNumber = $scope.value.bookingDetails.phone;
		var fullName = $scope.value.bookingDetails.fullName;
		var count = $scope.value.bookingDetails.totalNumberOfTickets;
		var cost = $scope.value.bookingDetails.totalCostOfTickets;
		var contactName = $scope.value.bookingDetails.contactName;
		var onlineWindowId = ShareService.get('onlineWindowId');
    	var _self = {
    		"orders":				orders,
			"idCard": 				cardNumber,
			"phone":				phoneNumber,
			"fullName":				fullName,
			"totalNumberOfTickets": count,
			"totalCostOfTickets": 	cost,
			"onlineWindow":			onlineWindowId,
			"paymentId":			paymentId
		}
    	return _self;
    }

}]);


/**
 * confirm controller
 */
controllers.controller('confirmCtrl', ['ShareService', '$scope', function(ShareService, $scope){
	console.log('confirmCtrl start ...');
	//------------------------------------------
	// step five
	//-------------------------------------------	
	
	$scope.value = {};
	$scope.value.payment = ShareService.get('payment');
	$scope.value.orderId = $scope.value.payment.orderId;
	$scope.value.ticketCode = $scope.value.payment.ticketCode;
	
}]);
