if (Meteor.isClient) {

  // Load the Google Maps API on startup
  Meteor.startup(function() {
    GoogleMaps.load({
      libraries: 'places'
    });
  });
}