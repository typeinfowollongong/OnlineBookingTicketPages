/*
 * Data Model 
 */

/*
 * Customer data model
 */
function Customer(){
	var _self = {
		"id":"",
		"firstName":"",
		"lastName":"",
		"contactNumber":"",
		"email":"",
		"creditCardNumber":"",
		"creditCardExpiryDate":"",
		"creditCardCSV":"",
		"carRego":"",
		"address":""	
	};
	return _self;
}	
/**
 * Booking data model
 * @returns
 */
function Booking(){
	var _self = {
		"id":"",
		"customer":{},
		"bookingType":{},
		"roomNumber":"",
		"dateOfArrive":"",
		"dateOfLeave":"",
		"price":"",
		"breakfast":false,
		"dinner":false,
		"numberOfAdults":"1",
		"numberOfChildren":"0",		
		"isConfirmed":false,
		"branch":"",
		"refeem":"",
		"status":"",
		"creditCardNumber":"",
		"creditCardExpiryDate":"",
		"creditCardCVV":"",
		"carRego":""
	};
	return _self;
}	

/**
 * Checkin data model
 * @returns
 */
/*
function Checkin(obj){
	var _self = {
		"id":"",
		"customer":{},
		"bookingType":{},
		"roomNumber":"",
		"dateOfCheckin":dateToStr(new Date()), //common.js
		"dateOfCheckout":"",
		"expectedDateOfLeave":"",
		"price":"",
		"breakfast":false,
		"dinner":false,
		"numberOfAdults":"1",
		"numberOfChildren":"0",		
		"branch":"",
		"refeem":"",
		"status":"",
		"creditCardNumber":"",
		"creditCardExpiryDate":"",
		"creditCardCVV":"",
		"carRego":""
	};
	return _self;
}
*/
function Checkin(obj){
	var _obj = this;
	_obj.customer = {};
	_obj.bookingType = {};
	if(!obj){
		_obj.id = null;
		_obj.roomNumber = null;
		_obj.dateOfCheckin = null;
		_obj.dateOfCheckout = null;
		_obj.expectedDateOfLeave = null;
		_obj.price = 0;
		_obj.breakfast = false;
		_obj.dinner = false;
		_obj.numberOfAdults = 1;
		_obj.numberOfChildren = 0;
		_obj.branch = null;
		_obj.refeem = null;
		_obj.status = null;
		_obj.creditCardNumber = null;
		_obj.creditCardExpiryDate = null;
		_obj.creditCardCVV = null;	
		_obj.carRego = null;		
	}else{
		_obj.id = obj.id;
		_obj.customer.id = obj.customer_id;
		_obj.bookingType.id = obj.booking_type_id;
		_obj.roomNumber = obj.room_number;
		_obj.dateOfCheckin = dateToStr(new Date(obj.checkin_date));
		_obj.dateOfCheckout = obj.checkout_date;
		_obj.expectedDateOfLeave = obj.expected_leave_date;
		_obj.price = obj.price;
		_obj.breakfast = obj.meal_breakfast=="0" ? false : true;
		_obj.dinner = obj.meal_dinner=="0" ? false : true;
		_obj.numberOfAdults = obj.adults;
		_obj.numberOfChildren = obj.children;
		_obj.branch = obj.branch;
		_obj.refeem = obj.refeem;
		_obj.status = obj.status;
		_obj.creditCardNumber = obj.credit_card_number;
		_obj.creditCardExpiryDate = obj.credit_card_expiry_date;
		_obj.creditCardCVV = obj.credit_card_cvv;	
		_obj.carRego = obj.car_rego;			
	}
	return _obj;
}
