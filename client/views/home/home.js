


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

                var userDetails = "<a class='ui blue image label' href='mailto:"+user.emails[0].address+"' > <img src='/img/matthew.jpg'>" + user.profile.FirstName + " " + user.profile.LastName+" <div class='detail'>" + user.profile.ClassYear + " </div></a>"
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

 //        var options = {
 //          map: ".map-container",
 //          mapOptions: {
	// 	    zoom: 19
	// 	  }
 //        };

 //        // Example 2 - Autocomplete + map
 //        $('#location').geocomplete({
	// 	  map: ".map-container",
	// 	  mapOptions: {
	// 	    zoom: 1
	// 	  },
	// 	  markerOptions: {
	// 	    draggable: true
	// 	  }
		 
	// 	});
          


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
	userGravatar : function(){
		var gravatarURL = Meteor.user().profile.ImageURL;
		if (gravatarURL.indexOf('default=404') > 1) return false;
		else return gravatarURL;
	},

	mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(39.96691, -98.3446243),
                draggable: true,
                scrollwheel: true,
                zoom: 4,
                minZoom: 4,
                backgroundColor: 'rgb(255,255,255)',
                color: 'rgb(255,255,255)',
                styles : 
                [
				    {
				        "featureType": "all",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "lightness": 63
				            },
				            {
				                "hue": "#ff0000"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "all",
				        "stylers": [
				            {
				                "hue": "#000bff"
				            },
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "color": "#4a4a4a"
				            },
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "weight": "0.01"
				            },
				            {
				                "color": "#727272"
				            },
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.country",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "color": "#ff0000"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.country",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#ff0000"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.province",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.province",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#545454"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.locality",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#737373"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.neighborhood",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#7c7c7c"
				            },
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.land_parcel",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#404040"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": 16
				            },
				            {
				                "hue": "#ff001a"
				            },
				            {
				                "saturation": -61
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#828282"
				            },
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "poi.government",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#4c4c4c"
				            }
				        ]
				    },
				    {
				        "featureType": "poi.park",
				        "elementType": "all",
				        "stylers": [
				            {
				                "hue": "#00ff91"
				            }
				        ]
				    },
				    {
				        "featureType": "poi.park",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#7b7b7b"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#999999"
				            },
				            {
				                "visibility": "on"
				            },
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "all",
				        "stylers": [
				            {
				                "hue": "#ff0011"
				            },
				            {
				                "lightness": 53
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#626262"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#676767"
				            },
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "all",
				        "stylers": [
				            {
				                "hue": "#0055ff"
				            }
				        ]
				    }
				]
            };
        }
    }
});
