// Geolocation
// 
geoSuccess = function (position) {
  lat = position.coords.latitude.toString();
  lng = position.coords.longitude.toString();

  //Set the session var
  Session.set('location', [lat, lng]);
  // console.log("Success" + lat + " " + lng);
};

geoFailure = function (){
  var geolocation = {
    time: new Date(),
    lat: null,
    lng: null
  };
  //Set the session var
  Session.set('location', null);
  // console.log('Geolocation failure to acquire');
};


getUsersGeolocation = function(){
  // Get GPS Coordinates
  navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);
}