Template.updateLocation.events({
	'click #location': function (event) {
		//
		event.preventDefault();
		// var location  = 
	}
});


Template.updateLocation.onRendered(function(){
	getUsersGeolocation(); 

	// Hide the form
	$("#updateLocationForm").hide();
});