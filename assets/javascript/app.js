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

// Global variables
var username = "";
var destination = "";
var map, options;
var currentLocList = [];
var finalDesList = [];
var currentContentList = [];
var finalContentList = [];

$("#destination-card").hide();

$("#submit").on("click", function (event) {
  event.preventDefault();

  // Get user inputs
  username = $("#username").val().trim();
  destination = $("#destination").val().trim();

  initMap();

  // calcDistance();

  $("#destination-card").show();

  // Clear form after submitting 
  $("#username").val("");
  $("#destination").val("");
  $("#login").hide();
});

// Load map, use geolocation and geocode to find location and destination coordinates
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      // Coordinates of user's location
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      // Find coordinates of user's destination
      geocode();

      function geocode() {
        var location = destination;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: "AIzaSyA09J-N_dhYPY4pfDc-qvbgVb-FdQl1FP8"
          }
        }).then(function (response) {
          // Destination address
          var formattedAddress = response.data.results[0].formatted_address;

          // Print formatted address of user's destination to html
          $("#destination-address").html(formattedAddress);

          // Geometry of destination address
          var destinationLat = response.data.results[0].geometry.location.lat;

          var destinationLng = response.data.results[0].geometry.location.lng;

          // Save coordinates
          var location = {
            lat: lat,
            lng: lng
          }

          var geoDestination = {
            lat: destinationLat,
            lng: destinationLng
          }

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
  options = {
    zoom: 10,
    center: { lat: 33.9806, lng: -117.3755 }    // Centered on Riverside
  }

  // The map, with options properties
  map = new google.maps.Map(document.getElementById('map'), options);
}

// Add location/destination coordinates, proper icon, and content
function addMarker(coords, content, icon) {

  var marker = new google.maps.Marker({ position: coords, map: map, icon: icon });

  var infoWindow = new google.maps.InfoWindow({
    content: content
  });

  // Opens info box
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });

}

// Add markers for every user in database
database.ref().on("child_added", function (snapshot) {
  var loc = snapshot.val().location;
  var des = snapshot.val().geoDestination;

  // Marker's info content based on current location or destination
  var currentLocContent = snapshot.val().username + "'s Current Location";
  var finalDesContent = snapshot.val().username + "'s Destination";

  // Add all locations to lists
  currentLocList.push(loc);
  finalDesList.push(des);
  console.log(currentLocList);

  // Add info to lists
  currentContentList.push(currentLocContent);
  finalContentList.push(finalDesContent);

  //Icon used to distinguish location and destination
  var locationIcon = "assets/images/location.png";
  var destinationIcon = "assets/images/destin.png";

  //Loop through the list to add all markers;
  for (var i = 0; i < finalDesList.length; i++) {
    addMarker(currentLocList[i], currentContentList[i], locationIcon);
    addMarker(finalDesList[i], finalContentList[i], destinationIcon);
  }
});

// Calculate distance using distance matrix api
function calcDistance() {
  var destinationA = new google.maps.LatLng(55.930385, -3.118425);
  var destinationB = new google.maps.LatLng(50.087692, 14.421150);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
      origins: [destinationA],
      destinations: [destinationB],
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, callback);
}

// Get distance results
function callback(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
  console.log(response);
  console.log(distance);
  console.log(duration);
  console.log(from);
  console.log(to);
}