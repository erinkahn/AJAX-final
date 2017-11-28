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

		GoogleMapModule.resetMarkers(); //reset markers

		var resultsUL = document.querySelector('.results');

		//clear results each time
		resultsUL.innerHTML = '';

		// console.log("allBreweries", allBreweries)

		// if there are no breweries say no breweries found
		if (!allBreweries){
			document.querySelector('.results').innerHTML = "No Breweries found";
		
		} else { // allBreweries was defined (as an array)

			// go through brewery array
			for (var i = allBreweries.length - 1; i >= 0; i--) {
				var brewery = allBreweries[i];

				var li = document.createElement('li');

				// list items in html = to names of the breweries
				li.innerHTML = brewery.brewery.name;
				// put names in dom in results ul 
				resultsUL.appendChild(li);

				// console.log(brewery.brewery.images.icon)

				// create variables to add to map
				var markerData = {};

				markerData.coordinates = {
					lat: parseFloat(brewery.latitude), // array of data
					lng: parseFloat(brewery.longitude) // array of data
				}

				var breweryDes = brewery.brewery.description;
				var breweryWeb = brewery.brewery.website;
/* help --> */  var breweryImg = brewery.brewery.images;

				// if brewery description or website isnt there, say nothing about it
/* help --> */	if (breweryDes || breweryWeb || breweryImg){
					markerData.content = `<div>${brewery.brewery.name} ${breweryImg}<hr/>${breweryDes} ${breweryWeb}</div>`; 
					// put an image/icon 
/* help --> */	} else if (breweryImg.length >= 0) {
					markerData.content = `<div>${brewery.brewery.name}<hr/>${breweryDes} ${breweryWeb}</div>`; 
				} else {
					markerData.content = `<div>${brewery.brewery.name}</div>`; 
				}

				GoogleMapModule.createMarker(markerData);

			}
		}
	}



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