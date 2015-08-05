


Template.home.onRendered(function() {


	// Initiate geocomplete autorun
	this.autorun(function () {
		// Wait for API to be loaded
		if (GoogleMaps.loaded()) {

    //     var options = {
    //       map: ".map-container",
    //       mapOptions: {
		  //   zoom: 19
		  // }
    //     };

        // Example 2 - Autocomplete + map
        $('#location').geocomplete({
		  map: "#homeMap",
		  mapOptions: {
		    zoom: 1
		  },
		  markerOptions: {
		    draggable: true
		  },
		  details: "#location"
		})
          


      }
    });

})

        



Template.home.events({
	'click #logout': function (event) {
		event.preventDefault();
		console.log("Logging out");

		// Analytics
        analytics.track("User Logged Out", {
          user: Meteor.call('getUsersFullName', Meteor.userId() ),
        });

		Meteor.logout();
		Router.go('/logMeIn');
	},


	'click #searchButton' : function(event){
		event.preventDefault();
		$('#location').trigger("geocode");


	}

})



Template.home.helpers({
	mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(42.3714947, -71.0864239),
                draggable: false/true,
                scrollwheel: false,
                zoom: 11,
                backgroundColor: 'rgb(27,28,29)',
                color: 'rgb(27,28,29)',
                styles : [
				  {
				    stylers: [
				      { hue: "#00ffe6" },
				      { saturation: -20 }
				    ]
				  },{
				    featureType: "road",
				    elementType: "geometry",
				    stylers: [
				      { lightness: 100 },
				      { visibility: "simplified" }
				    ]
				  },{
				    featureType: "road",
				    elementType: "labels",
				    stylers: [
				      { visibility: "off" }
				    ]
				  }
				]
            };
        }
    }
});
