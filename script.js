// Function to check if the user is at the specified coordinates
function isAtStore(latitude, longitude) {
    // Coordinates of the store
    var storeLatitude = 27.6124428;
    var storeLongitude = 84.5731022;
    
    // Calculate distance between user and store using Haversine formula
    var earthRadius = 6371; // Radius of the earth in km
    var dLat = (storeLatitude - latitude) * Math.PI / 180;
    var dLon = (storeLongitude - longitude) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(latitude * Math.PI / 180) * Math.cos(storeLatitude * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = earthRadius * c;

    // If distance is less than 1 km (adjust as needed), user is considered to be at the store
    return distance < 1;
}

// Function to handle geolocation success
function geoSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Check if user is at the store
    if (isAtStore(latitude, longitude)) {
        // User is at the store, show the website content
        document.getElementById("access-granted").style.display="block";
        document.getElementById("access-denied").style.display = "none";
    } else {
        // User is not at the store, restrict access
        document.getElementById("access-denied").style.display = "block";
        document.getElementById("access-granted").style.display="none";
    }
}

// Function to handle geolocation error
function geoError(error) {
    console.error("Error getting geolocation:", error.message);
}

// Check user's location when page loads
window.onload = function() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};