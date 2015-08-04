


Template.home.onRendered(function() {
  // Make the location input reactive in order to autofill the user's entry
  this.autorun(function () {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {

        // Example 1 - Autocomplete only
        $('#place1').geocomplete();

        // Example 2 - Autocomplete + map
        $('#place2').geocomplete({
          map: $("#map")
        });

        // Example 3 - Autocomplete + map + form
        $('#place3').geocomplete({
          map: "#map2",
          details: "form"
        });

      }
    });

  });

        



// Template.home.events({
//   'click button': function() {
//     // Trigger geocoding request.
//     $("input").trigger("geocode");
//   }
// })



// Template.home.helpers({

//     mapOptions: function() {
//         if (GoogleMaps.loaded()) {
//             return {
//                 //union lat lng is below, using wellesley for testing rn
//                 // center: new google.maps.LatLng(42.8177427, -73.9305222),
//                 center: new google.maps.LatLng(42.3714947, -71.0864239),
//                 draggable: false/true,
//                 scrollwheel: false,
//                 zoom: 11,
//                 backgroundColor: 'rgb(27,28,29)',
//                 color: 'rgb(27,28,29)',
//                 styles : [
//   {
//     stylers: [
//       { hue: "#00ffe6" },
//       { saturation: -20 }
//     ]
//   },{
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [
//       { lightness: 100 },
//       { visibility: "simplified" }
//     ]
//   },{
//     featureType: "road",
//     elementType: "labels",
//     stylers: [
//       { visibility: "off" }
//     ]
//   }
// ]
//             };
//         }
//     }
// });
