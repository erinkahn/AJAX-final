// search: a state in the us 
// show all the brweries in this searched state


var breweryModule = (function() {
	var shared = {};

	var BASE_URL = 'http://circuslabs.net/~erin.kahn/quarter3/AJAX/brewery/brewerydb-proxy'; //'http://circuslabs.net/brewerydb-proxy/';  //'http://localhost:9000/brewerydb-proxy/' //'http://api.brewerydb.com/v2';
	var API_KEY = '5247aa4653fc6c9452275d2055711946';
	var coordinates = null;

	function setupListeners() {
		var btn = document.querySelector('#btn');
		btn.addEventListener('click', searchBreweries);
	}

	// search breweries

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
		queryString += '&region=' + stateSelection;
		queryString += '&countryIsoCode=US'; //markers show only the US
		queryString += '&order=breweryName'; // list results in order of brewery name


		fetch(BASE_URL + queryString, fetching)
			.then(response => response.json()) 
			.then(breweryResults => addLocationsToMap(breweryResults))		
	}

	// add breweries to the map

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
			for (var i = 0; i < allBreweries.length; i++) {
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
				var breweryImg = brewery.brewery.images;

				// if brewery description or website isnt there, say nothing about it
				if (breweryDes && breweryWeb && breweryImg){
					   markerData.content = 
					   `<div id="info-window">
					   <h1>${brewery.brewery.name}</h1> 
					   <div id="flexStuff">
					   <span id="spanDes">${breweryDes}					   
					   <a href="${breweryWeb}"target="_blank">Visit Website</a></span>
					   <img id="icon" src="${breweryImg.icon}"> 
					   </div>
					   </div>`; 

					
				} else {
					markerData.content = 
					`<div id="info-window">
					<h1>${brewery.brewery.name}</h1></div>`; 
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