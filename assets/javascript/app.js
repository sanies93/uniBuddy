// Firebase configuration
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
var password = "";
var contact = "";
var destination = "";
var map, options;
var usersList = [];
var contactList = [];
var currentLocList = [];
var finalDesList = [];
var currentContentList = [];
var finalContentList = [];
var distance;

$("#destination-card").hide();
$("#distance-card").hide();
$("#map-card").hide();
$("#users-card").hide();

$("#submit").on("click", function (event) {
  event.preventDefault();

  // Get user inputs
  username = $("#username").val().trim();
  password = $("#password").val().trim();
  contact = $("#contact").val().trim();
  destination = $("#destination").val().trim();

  submitform();
});

// Force the user to input their information.
function submitform() {
  if (username === "" || password === "" || contact === "" || destination === "") {
    $('#formModal').modal('show');
  }
  else {
    initMap();

    // calcDistance();

    $("#destination-card").show();
    $("#distance-card").show();
    $("#map-card").show();
    $("#users-card").show();

    // Clear form after submitting 
    $("#username").val("");
    $("#contact").val("");
    $("#destination").val("");
    $("#login").hide();
  }
}

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
            password: password,
            contact: contact,
            location: location,
            geoDestination: geoDestination,
            formattedAddress: formattedAddress
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
  var id = snapshot.key;

  // Marker's info content based on current location or destination
  var currentLocContent = snapshot.val().username + "'s Current Location";
  var finalDesContent = snapshot.val().username + "'s Destination";

  //Add users to list
  usersList.push(snapshot.val().username);
  contactList.push(snapshot.val().contact);

  // Add all locations to lists
  currentLocList.push(loc);
  finalDesList.push(des);

  // Add info to lists
  currentContentList.push(currentLocContent);
  finalContentList.push(finalDesContent);

  //Icon used to distinguish location and destination
  var locationIcon = "assets/images/location.png";
  var destinationIcon = "assets/images/destin.png";

  $("#users").empty();

  //Loop through the list to add all markers and users in buddies list;
  for (var i = 0; i < finalDesList.length; i++) {
    addMarker(currentLocList[i], currentContentList[i], locationIcon);
    addMarker(finalDesList[i], finalContentList[i], destinationIcon);

    var button = $("<button>");
    button.html(usersList[i] + "<br>" + contactList[i]);
    button.addClass("buddies");
    button.attr("tag", usersList[i]);
    button.attr("data-toggle", "modal");
    button.attr("data-target", "#exampleModal");
    $("#users").append(button);
    $("#users").append("<br>");
  }

  $("#distance-alert").empty();   // Clear last user's distance card
  $("#distance").empty();   // Clear last user's distance card

  calcDistance();

  // Calculate distance using distance matrix api
  function calcDistance() {

    // $("#distance-alert").empty();   // Clear last user's distance card
    // $("#distance").empty();   // Clear last user's distance card

    var destALat = snapshot.val().geoDestination.lat;
    var destALng = snapshot.val().geoDestination.lng;
    var destinationA = new google.maps.LatLng(destALat, destALng);

    var destBLatList = [];
    var destBLngList = [];
    if (finalDesList.length > 1) {
      for (var i = 0; i < finalDesList.length - 1; i++) {
        var destBLat = finalDesList[i].lat;
        var destBLng = finalDesList[i].lng;

        destBLatList.push(destBLat);
        destBLngList.push(destBLng);

        var destinationB = new google.maps.LatLng(destBLat, destBLng);

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [destinationA],
          destinations: [destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, callback);

      }

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
      console.log(distance);
      console.log(duration);
      console.log(from);
      console.log(to);

      intDistance = distance.split(',').join("");
      var newIntDistance = parseInt(intDistance);
      console.log(newIntDistance);
      if (newIntDistance <= 10) {
        console.log(snapshot.val().username + " is headed to the same destination!");
        $("#distance-alert").html("Found a buddy heading to a location near your destination!");
        $("#distance").html("Disance: " + distance + "<br>" + "Duration: " + duration);
      } 
      else {
        $("#distance-alert").html("Sorry, no buddies found heading near your destination.");
        $("#distance").html("Disance: N/A" + "<br>" + "Duration: N/A");
      }
    }

  }

});

// Remove user
$(document).on("click", ".buddies", function () {
  var removeUser = $(this).attr("tag");
  console.log(removeUser);
  $(document).on("click", "#close", function () {
    removeUser = "";
  });
  $(document).on("click", "#arrived", function () {
    // Prompt for password
    brompt('Enter your password to continue with logging out', function (val) {
      var passwordCheck = val;

      database.ref().on("child_added", function (snapshot) {
        users = snapshot.val();

        if (removeUser === users.username && passwordCheck === users.password) {
          document.location.reload();
          var key = snapshot.key;
          database.ref().child(key).remove();
        } else {
          blurt('Error', 'Incorrect Password!', 'error');
        }
      });
    });
  });
});

