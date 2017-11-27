// search: a state in the us 
// show all the brweries in this searched state


var breweryModule = (function() {
	var shared = {};

	var BASE_URL = 'http://localhost:9000'; //'http://api.brewerydb.com/v2';
	var API_KEY = '5247aa4653fc6c9452275d2055711946';
	var coordinates = null;

	function setupListeners() {
		var btn = document.querySelector('#btn');
		btn.addEventListener('click', searchBreweries);
	}

	function searchBreweries(evt) {
		evt.preventDefault();
		console.log('searching breweries...');

		var dropdown = document.querySelector('#states');
		var stateSelection = dropdown.value;
		console.log('Here are the breweries in:', stateSelection);

		fetching = { 
			method: 'GET',
			headers: ajaxHeaders
		};

		var ajaxHeaders = {
			'HTTP_ACCEPT': 'application/json'
		};

		// "http://api.brewerydb.com/v2/locations?key=5247aa4653fc6c9452275d2055711946&locality=atlanta"


		var queryString = '?';
		queryString += "_ep=/locations";
		// queryString += '&key=' + API_KEY;
		queryString += '&region=' + stateSelection;


		fetch(BASE_URL + queryString, fetching)
			.then(response => response.json()) 
			.then(breweryResults => addLocationsToMap(breweryResults))	
	}


	function addLocationsToMap(breweryResults) {
		console.log('got breweries', breweryResults);
		
		var allBreweries = breweryResults.data;

		// clear out old results
			var resultsUL = document.querySelector('.results');
			resultsUL.innerHTML = '';

		for (var i = allBreweries.length - 1; i >= 0; i--) {
			var breweryName = allBreweries[i];

			// create variables to add to map
			var markerData = {};

			markerData.coordinates = {
				lat: parseFloat(breweryName.latitude), // array of data
				lng: parseFloat(breweryName.longitude) // array of data
			}

			var breweryDes = breweryName.brewery.description;
			var breweryWeb = breweryName.brewery.website;

			// if brewery description or website isnt there, say nothing about it
			if (breweryDes || breweryWeb){
				markerData.content = `<div>${breweryName.name}<hr/>${breweryDes} ${breweryWeb}</div>`; 
			} else {
				markerData.content = `<div>${breweryName.name}</div>`; 
			}

			GoogleMapModule.createMarker(markerData);

	}
};



	function init(){
		setupListeners();

		coordinates = GoogleMapModule.startingPoint;
		console.log('coordinates', coordinates);
	}

	shared.init = init;

	return shared;

}());

// window.onload = function() {	
// 	breweryModule.init() 
// }
breweryModule.init();