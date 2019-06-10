// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBdSxw2CJzYxMVEYutEOvfxiVIDVjK2A6c",
  authDomain: "unibuddy-123.firebaseapp.com",
  databaseURL: "https://unibuddy-123.firebaseio.com",
  projectId: "unibuddy-123",
  storageBucket: "unibuddy-123.appspot.com",
  messagingSenderId: "1022486736623",
  appId: "1:1022486736623:web:025d8078f7fab9db"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var username = "";
var destination = "";
var lat, lng;

$("#submit").on("click", function (event) {
  event.preventDefault();

  // Get user inputs
  username = $("#username").val().trim();
  destination = $("#destination").val().trim();

  initMap();

  // Clear form after submitting 
  $("#username").val("");
  $("#destination").val("");
});


function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      lat = position.coords.latitude;
      lng = position.coords.longitude;

      // User's location
      var userLocation = { lat: lat, lng: lng };

      console.log(username);
      console.log(destination);
      console.log(userLocation);

      addMarker(userLocation);

      // Save coordinate
      var location = {
        lat: lat,
        lng: lng
      }

      // Push to firebase
      database.ref().push({
        username: username,
        location: location,
        destination: destination
      })
    });
  }

  // Map options
  var options = {
    zoom: 10,
    center: { lat: 33.9806, lng: -117.3755 }    // Centered on Riverside
  }

  // The map, with options properties
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Add location/destination coordinates, proper icon, and content
  function addMarker(coords) {

    var marker = new google.maps.Marker({ position: coords, map: map });

    var infoWindow = new google.maps.InfoWindow({
      content: '<h6>ME!</h6>'
    });

    // Opens info box
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });

  }
}
