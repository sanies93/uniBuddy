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

      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      // User's location
      var userLocation = { lat: lat, lng: lng };

      console.log(username);
      console.log(destination);
      console.log(userLocation);

      // Marker's info content based on current location or destination
      var currentLocation = username + "'s Current Location";
      var finalDestination = username + "'s Destination";

      //Icon used to distinguish location and destination
      var locationIcon = "assets/images/location.png";
      var destinationIcon = "assets/images/destin.png";

      addMarker(userLocation, currentLocation, locationIcon);

      geocode();

      function geocode() {
        var location = destination;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: "AIzaSyA09J-N_dhYPY4pfDc-qvbgVb-FdQl1FP8"
          }
        }).then(function (response) {
          // console.log(response);

          // Destination address
          var formattedAddress = response.data.results[0].formatted_address;
          console.log(formattedAddress);

          // Geometry of destination address
          var destinationLat = response.data.results[0].geometry.location.lat;
          console.log(destinationLat);

          var destinationLng = response.data.results[0].geometry.location.lng;
          console.log(destinationLng);

          // Save coordinates
          var location = {
            lat: lat,
            lng: lng
          }

          var geoDestination = {
            destinationLat: destinationLat,
            destinationLng: destinationLng
          }

          // Print formatted address of user's destination to html
          $("#destination-address").html(formattedAddress);

          // 
          var userDestination = { lat: destinationLat, lng: destinationLng };

          addMarker(userDestination, finalDestination, destinationIcon);

          // Push to firebase
          database.ref().push({
            username: username,
            location: location,
            geoDestination: geoDestination
          })
        });
      }
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
  function addMarker(coords, content, icon) {

    var marker = new google.maps.Marker({ position: coords, map: map, icon: icon});

    var infoWindow = new google.maps.InfoWindow({
      content: content
    });

    // Opens info box
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });

  }
}
