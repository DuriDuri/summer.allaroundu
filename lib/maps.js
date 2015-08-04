if (Meteor.isClient) {

  // Load the Google Maps API on startup
  Meteor.startup(function() {
    GoogleMaps.load({
      // key: 'YOUR API KEY',
      libraries: 'places'
    });
  });
}