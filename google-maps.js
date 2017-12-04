var GoogleMapModule = (function() {
	var shared = {};

	var map;
	var infowindow;
	var startingPoint = {lat: 33.813245, lng: -100.362171}; //lng: -84.362171
	shared.startingPoint = startingPoint;
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

	}

	shared.createMarker = createMarker;
   
	
	// reset the old markers
    function resetMarkers() {

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

	  map = new google.maps.Map(document.getElementById('map'), {
	    center: startingPoint,
	    zoom: 3,
	    mapTypeControl: false,
	  });

	  var styledMap = new google.maps.StyledMapType(mapStyle);
	  map.mapTypes.set('styled_map', styledMap);
      map.setMapTypeId('styled_map');

	  infowindow = new google.maps.InfoWindow();

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
                "color": "#7dcdcd"
            }
        ]
    }
]













	return shared;

}());



