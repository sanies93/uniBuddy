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
var userLat;
var userLng;
// var location;

$("#submit").on("click", function (event) {
    event.preventDefault();

    getLocation();

    username = $("#username").val().trim();
    destination = $("#destination").val().trim();
    // location = {
    //     latitude: userLat,
    //     longitude: userLng
    // }

    console.log(username);
    console.log(destination);

    database.ref().push({
        username: username,
        // location: location,
        destination: destination
    });

    $("#username").val("");
    $("#destination").val("");

    initMap();

});


function initMap() {
    // Map options
    var options = {
        zoom: 12,
        center: { lat: userLat, lng: userLng }
    }

    // User's location
    var userLocation = { lat: userLat, lng: userLng };

    // The map, with options properties
    var map = new google.maps.Map(document.getElementById('map'), options);

    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: userLocation, map: map });
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    console.log(userLat, userLng);
  }