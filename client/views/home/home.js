


Template.home.onRendered(function() {

	// Initiate geocomplete autorun
	this.autorun(function () {
		// Wait for API to be loaded
		if (GoogleMaps.loaded()) {

        var options = {
          map: ".map-container"
        };

        // Example 2 - Autocomplete + map
        $('#location').geocomplete(options)
          .bind("geocode:result", function(event, result){
            console.log("Result: " + result.geometry.location);
          })


      }
    });

})

        



Template.home.events({

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
