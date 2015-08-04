// Template.home.onRendered(function() {
//   $("#geocomplete").geocomplete({
//           map: ".map_canvas",
//           details: "form",
//           types: ["geocode", "establishment"],
//   });
//   $("#find").click(function(){
//           $("#geocomplete").trigger("geocode");
//   });
//   this.autorun(function () {
//     if (GoogleMaps.loaded()) {
//       $("#geocomplete").geocomplete();
//     }
//   });
//   $("#my_input").geocomplete({
//   map: "#map_canvas"
// });



Template.home.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});



Template.home.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
     
     google.maps.event.addListener(map.instance, 'click', function(event) {
      console.log( event.latLng.lat() + " " + event.latLng.lng() );
    });



  });

  // Schemas.Cities = new SimpleSchema
  //   location:
  //       type: Object
  //       autoform:
  //           type: 'map'
  //           afFieldInput:
  //               "# options"
  //     'location.lat':
  //       type: String
  //   'location.lng':
  //       type: String
});




// });

// Template.home.events({
//   'click button': function() {
//     // Trigger geocoding request.
//     $("#geocomplete").trigger("geocode");
//   }
// })

// Template.home.onCreated(function(){
//     GoogleMaps.init(
//     {
//         'sensor': true, //optional
//         //'key': 'MY-GOOGLEMAPS-API-KEY', //optional
//         //'language': 'de' //optional
//     }, 
//     function(){
//         var mapOptions = {
//             zoom: 13,
//             mapTypeId: google.maps.MapTypeId.SATELLITE
//         };
//         map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
//         map.setCenter(new google.maps.LatLng( 35.363556, 138.730438 ));
//     }
// ); 
// });