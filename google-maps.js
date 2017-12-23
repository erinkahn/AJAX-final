var GoogleMapModule = (function() {
	var shared = {};

	var map;
    var bounds;
	var infowindow;
    
    var zoomDesktop = 4;
    var zoomMobile = 3;
	
    var startingPointDesktop = {lat: 36.8283, lng: -107.5795}; 
	var startingPointMobile = {lat: 33.813245, lng: -100.362171};

	
    var markers = [];

	function placeResults(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {

		var resultsUL = document.querySelector('.results');

          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

          }
          
        }
	}

	function createMarker(place) {
		var placeLatLng = place.coordinates;
		var marker = new google.maps.Marker({
			map: map,
			position: placeLatLng,
			animation: google.maps.Animation.Drop,
		});

		marker.setIcon('beer.png', [2,31]); 

		marker.addListener('click', function() {
			infowindow.setContent(place.content);
			infowindow.open(map, marker);
		})

		markers.push(marker);

        // map zooms to results
        bounds.extend(placeLatLng);
        map.fitBounds(bounds);

	}

	shared.createMarker = createMarker;
   
	
	// reset the old markers
    function resetMarkers() {

      bounds = new google.maps.LatLngBounds();

      for(var i = 0; i < markers.length; i++) {
      	  var marker = markers[i];
          marker.setMap(null); // setMap tells the markers which map they belonds to
      }

      markers.length = 0;
    }

   shared.resetMarkers = resetMarkers;


	function searchForPlaces() {

		var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: startingPoint,
          radius: 500,
          keyword: 'breweries'
        }, placeResults);

	}

	shared.searchForPlaces = searchForPlaces;



	function initMap() {

        var startingPoint;
        //check window width - map position for desktop / mobile
        var zoom; 
        // check window width - zoom for mobile/desktop
        if (window.innerWidth <= 470) {
            zoom = zoomMobile;
            startingPoint = startingPointMobile;   
        } else {
            zoom = zoomDesktop;
            startingPoint = startingPointDesktop;
        }

       
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: startingPoint,
	    zoom: zoom,
	    mapTypeControl: false,
	  });

	  var styledMap = new google.maps.StyledMapType(mapStyle);
	  map.mapTypes.set('styled_map', styledMap);
      map.setMapTypeId('styled_map');



	  infowindow = new google.maps.InfoWindow();

      resetMarkers();

	}

	shared.init = initMap;




	var mapStyle = [
	
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#55c8dd"
            }
        ]
    }
]













	return shared;

}());



