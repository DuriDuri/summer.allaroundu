


Template.home.onRendered(function() {

	GoogleMaps.load();

    
    GoogleMaps.ready('map', function(map) {
        Meteor.users.find({}).forEach(function(user) {
            if (user.profile.location != null) {
                var marker = new google.maps.Marker({
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(user.profile.location[0], user.profile.location[1]),
                    map: map.instance,
                    title: user.profile.FirstName,
                    id: document._id,
                });

                var userDetails = "<a class='ui blue image label'> <img src='/img/matthew.jpg'>" + user.profile.FirstName + " " + user.profile.LastName+" <div class='detail'>" + user.profile.ClassYear + " </div></a>"
                var infoWindow = new google.maps.InfoWindow({
                    content: userDetails
                });
                google.maps.event.addListener(marker, 'click', function() {
                    
                    infoWindow.open(map.instance, marker);
                }); 
            }
        })

                  
    });


	// Initiate geocomplete autorun
	// this.autorun(function () {
	// 	// Wait for API to be loaded
	// 	if (GoogleMaps.loaded()) {

 //    //     var options = {
 //    //       map: ".map-container",
 //    //       mapOptions: {
	// 	  //   zoom: 19
	// 	  // }
 //    //     };

 //        // Example 2 - Autocomplete + map
 //        $('#location').geocomplete({
	// 	  map: "#homeMap",
	// 	  mapOptions: {
	// 	    zoom: 1
	// 	  },
	// 	  markerOptions: {
	// 	    draggable: true
	// 	  },
	// 	  details: "#location"
	// 	})
          


 //      }
 //    });

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
                center: new google.maps.LatLng(39.96691, -98.3446243),
                draggable: true,
                scrollwheel: false,
                zoom: 4,
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
