var ZomatoModule = (function() {
	var shared = {};

	var BASE_URL = 'https://developers.zomato.com/api/v2.1';
	var API_KEY = '14004ca1e44c171939278bf8e60c2f8a';
	var coordinates = null;

	function setupListeners() {
		var btn = document.querySelector('#btn');
		btn.addEventListener('click', searchRestaurants);
	}

	function searchRestaurants(evt) {
		evt.preventDefault();

		var input = document.querySelector('#query');
		var query = input.value;

		var fetchOptions = {
			method: 'GET',
			headers: {
				'user-key': API_KEY
			}
		};

		var queryString = 'q=' + query;
		queryString += '&lat=' + coordinates.lat;
		queryString += '&lon=' + coordinates.lng;

		fetch(BASE_URL + '/search?' + queryString, fetchOptions)
		.then(response => response.json())
		.then(data => addLocationsToMap(data))	
	}

	function addLocationsToMap(data) {
		console.log('got data', data);
		var all = data.restaurants;
		for (var i = all.length - 1; i >= 0; i--) {
			var r = all[i].restaurant;

			//create our variables to add to map
			var markerData = {};
			markerData.coordinates = {
				lat: parseFloat(r.location.latitude), // array of data
				lng: parseFloat(r.location.longitude) // array of data
			}

			markerData.content = `<div>${r.name}<hr/>${r.cuisines}</div>`; // '<div>' + r.name + <hr/> + r.cuisines + '</div>'; 
			GoogleMapModule.createMarker(markerData);
		}
	}

	function init() {
		setupListeners();

		coordinates = GoogleMapModule.startingPoint;
		console.log('coordinates', coordinates);
	}

	shared.init = init

	return shared;
}())

window.onload = function() {	
	ZomatoModule.init() 
};