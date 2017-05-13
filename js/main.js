document.getElementById("submit").disabled=true;
var x=document.getElementById("demo");
var y,z;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } 
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    
    document.getElementById("load").classList.remove("loader");
    y=position.coords.latitude;
    z=position.coords.longitude;
    document.getElementById("demo").innerHTML="ready";
    document.getElementById("submit").disabled=false;
}
getLocation();

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

    //copied code
    function initMap() {
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        document.getElementById('submit').addEventListener('click', function() {
          geocodeLatLng(geocoder, map, infowindow);
        });
      }

      function geocodeLatLng(geocoder, map, infowindow) {
        var latlng = {lat: parseFloat(y), lng: parseFloat(z)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            /*document.getElementById("add").innerHTML=results[1].formatted_address;*/
            displayPostcode(results[0].address_components);
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }


function displayPostcode(address) {
  for (p = address.length-1; p >= 0; p--) {
    if (address[p].types.indexOf("postal_code") != -1) {
       document.getElementById('postcode').innerHTML=address[p].long_name;
    }
  }
}
