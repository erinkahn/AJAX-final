var BeerApi = (function(){
	
	var shared ={};

	function populateBrews(brewsResults) {
		var beerResults = JSON.parse(brewsResults);
		console.log(beerResults);


		var infoDiv = $('.search-info');
		var searchResults = $('.search-results');
		var searchImg = $('.search-img');
		var searchSpecs = $('.search-specs');
		var searchList = $('<ul>');

		if ($('#select-box').val() == 'beer') {
			var beerImg = $('<img>');

			beerResults.data.forEach(function(beerData) {

				var listItem = $('<li>');
				var beerName = $('<h3>');
				beerName.html(beerData.name);
				beerName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(beerName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					var abv = $('<p>');
					var ibu = $('<p>');
					var availability = $('<p>');
					var des = $('<p>');
					var pairing = $('<p>');
					var selectBeerName = $('<h3>');

					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "block"});
					if(beerData.labels) {beerImg.attr('src', beerData.labels.medium)};
					$('.search-img').append(beerImg);
					selectBeerName.addClass('select-beer-name');
					selectBeerName.html('Beer Name: ' + beerData.name);
					if (beerData.abv) {
						abv.html('ABV: ' + beerData.abv);
					} else {
						abv.html('ABV: There\'s nothing to be found.');
					}
					if (beerData.ibu) {
						ibu.html('IBU: ' + beerData.ibu);
					} else {
						ibu.html('IBU: There\'s nothing to be found.');
					}
					if (beerData.available) {
						availability.html('Availability: ' + beerData.available.description);
					} else {
						availability.html('Availability: There\'s nothing to be found.');
					}
					if (beerData.description) {
						des.html('Description: ' + beerData.description);
					} else {
						des.html('Description: There\'s nothing to be found.');
					}
					if (beerData.foodPairings) {
						pairing.html('Food Pairing: ' + beerData.foodPairings);
					} else {
						pairing.html('Food Pairing: There\'s nothing to be found.');
					}
					$('.search-specs').append(selectBeerName);
					$('.search-specs').append(abv);
					$('.search-specs').append(ibu);
					$('.search-specs').append(availability);
					$('.search-specs').append(des);
					$('.search-specs').append(pairing);
				})
			})

		}

		if ($('#select-box').val() == 'brewery') {
			var breweryImg = $('<img>');

			beerResults.data.forEach(function(beerData) {
				var listItem = $('<li>');
				var breweryName = $('<h3>');
				breweryName.attr('data-index', i);
				breweryName.html(beerData.name);
				breweryName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(breweryName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					var est = $('<p>');
					var website = $('<a>');
					var breweryDes = $('<p>');
					var selectBreweryName = $('<h3>');

					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "block"});
					if(beerData.images) {breweryImg.attr('src', beerData.images.squareLarge)};
					$('.search-img').append(breweryImg);
					selectBreweryName.addClass('select-beer-name');
					selectBreweryName.html('Brewery Name: ' + beerData.name);
					if (beerData.established) {
						est.html('Established: ' + beerData.established);
					} else {
						est.html('Established: There\'s nothing to be found.');
					}
					if (beerData.website) {
						website.attr('href', beerData.website);
						website.text(beerData.name);
					} else {
						website.html('Website: There\'s nothing to be found.');
					}
					if (beerData.description) {
						breweryDes.html('Description: ' + beerData.description);
					} else {
						breweryDes.html('Description: There\'s nothing to be found.');
					}
					$('.search-specs').append(selectBreweryName);
					$('.search-specs').append(est);
					$('.search-specs').append(website);
					$('.search-specs').append(breweryDes);
				})
			});
		}

		if ($('#select-box').val() == 'guild') {

			beerResults.data.forEach(function(beerData){
				var listItem = $('<li>');
				var guildName = $('<h3>');
				guildName.html(beerData.name);
				guildName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(guildName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					var guildWebsite = $('<a>');
					var guildDes = $('<p>');
					var selectGuildName = $('<h3>');

					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "block"});
					selectGuildName.addClass('select-beer-name');
					selectGuildName.html('Guild Name: ' + beerData.name);

					if (beerData.website) {
						guildWebsite.attr('href', beerData.website);
						guildWebsite.text(beerData.name);
					} else {
						guildWebsite.html('Guild Website: There\'s nothing to be found.');
					}
					if (beerData.description) {
						guildDes.html('Description: ' + beerData.description);
					} else {
						guildDes.html('Description: There\'s nothing to be found.');
					}
					$('.search-specs').append(selectGuildName);
					$('.search-specs').append(guildWebsite);
					$('.search-specs').append(guildDes);
				})
			})
		}


	};

	function removeListElements() {
		if($('.search-results').length) {

			for (var i = $('.search-results').length - 1; i >= 0; i--) {
				$('ul').remove();
			}
		}
		else {
			return null;
		}
	}

	function removeInfoElements() {
		if($('.search-specs').length) {
			for (var i = $('.search-specs').length - 1; i >= 0; i--) {
				$('.select-beer-name').remove();
				$('p').remove();
			}
		}
	}

	function setupListeners(e){
		$('.button-1').on('click',function(e){
			e.preventDefault();
			removeListElements();
			var brewsUrlPath = 'brews.php?_ep=/search&q=' + $('.input-1').val();
			if ($('#select-box').val()){
				brewsUrlPath +=  '&type=' + $('#select-box').val();
			}
			$.ajax({
				url: brewsUrlPath 
			})
			.done(populateBrews);
		});

		$('.back-button').on('click', function(e) {
			removeInfoElements();
			TweenMax.to('.brew-info', 1, {opacity: 0, display: 'none'});
			TweenMax.to('.search-results', 1, {opacity: 1, display: 'block'});
		})
	};

	function init(){
		setupListeners();
	};

	shared.init = init;

	return shared;
}());

BeerApi.init();

var TwitterApi = (function(){
	var shared = {};

	function populateTweets(tweetResults) {
		var tweets = JSON.parse(tweetResults);
		console.log(tweets);

		function createContentDiv() {
			var twitterWrapper = $('<div>');
			var tweetContent = $('<div>');
			var userPic = $('<div>');
			var userImg = $('<img>');
			var tweetTextDiv = $('<div>');
			var userName = $('<h4>');
			var userTweet = $('<div>');
			var para = $('<p>');
			
			tweetContent.addClass('tweet-content');
			userPic.addClass('user-pic');
			tweetTextDiv.addClass('tweet-text-div');
			twitterWrapper.addClass('twitter-wrapper');

			$('.twitter-module').append(twitterWrapper);
			twitterWrapper.append(tweetContent)
			tweetContent.append(userPic);
			userPic.append(userImg);
			tweetContent.append(tweetTextDiv);
			tweetTextDiv.append(userName);
			tweetTextDiv.append(userTweet);
			userTweet.append(para);

			userImg.attr('src', tweets.statuses[i].user.profile_image_url);
			userName.html(tweets.statuses[i].user.screen_name + ' - ' + tweets.statuses[i].user.name);
			para.html(tweets.statuses[i].text);

		}
		
		for (var i = tweets.statuses.length - 1; i >= 0; i--) {

			createContentDiv();
		}
	}

	function removeElements() {
		if($('.twitter-module').length) {
			for (var i = $('.twitter-module').length - 1; i >= 0; i--) {
				$('.twitter-wrapper').remove();
			}
		}
	}

	function setupListeners(e){
		$('.button-1').on('click', function(e){	
			e.preventDefault();
			removeElements();
			var twitterUrlPath = 'twitter-proxy.php';
			$.ajax({
				url: twitterUrlPath + '?op=search_tweets&q=' + $('.input-1').val() + '+' + $('#select-box').val() + '&count=10'
			})
			.done(populateTweets);
		})
	};

	function init(){
		setupListeners();
	}

	shared.init = init;

	return shared;

}());

TwitterApi.init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmVlckFwaSA9IChmdW5jdGlvbigpe1xuXHRcblx0dmFyIHNoYXJlZCA9e307XG5cblx0ZnVuY3Rpb24gcG9wdWxhdGVCcmV3cyhicmV3c1Jlc3VsdHMpIHtcblx0XHR2YXIgYmVlclJlc3VsdHMgPSBKU09OLnBhcnNlKGJyZXdzUmVzdWx0cyk7XG5cdFx0Y29uc29sZS5sb2coYmVlclJlc3VsdHMpO1xuXG5cblx0XHR2YXIgaW5mb0RpdiA9ICQoJy5zZWFyY2gtaW5mbycpO1xuXHRcdHZhciBzZWFyY2hSZXN1bHRzID0gJCgnLnNlYXJjaC1yZXN1bHRzJyk7XG5cdFx0dmFyIHNlYXJjaEltZyA9ICQoJy5zZWFyY2gtaW1nJyk7XG5cdFx0dmFyIHNlYXJjaFNwZWNzID0gJCgnLnNlYXJjaC1zcGVjcycpO1xuXHRcdHZhciBzZWFyY2hMaXN0ID0gJCgnPHVsPicpO1xuXG5cdFx0aWYgKCQoJyNzZWxlY3QtYm94JykudmFsKCkgPT0gJ2JlZXInKSB7XG5cdFx0XHR2YXIgYmVlckltZyA9ICQoJzxpbWc+Jyk7XG5cblx0XHRcdGJlZXJSZXN1bHRzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihiZWVyRGF0YSkge1xuXG5cdFx0XHRcdHZhciBsaXN0SXRlbSA9ICQoJzxsaT4nKTtcblx0XHRcdFx0dmFyIGJlZXJOYW1lID0gJCgnPGgzPicpO1xuXHRcdFx0XHRiZWVyTmFtZS5odG1sKGJlZXJEYXRhLm5hbWUpO1xuXHRcdFx0XHRiZWVyTmFtZS5hZGRDbGFzcygnYmVlci1uYW1lJyk7XG5cdFx0XHRcdGxpc3RJdGVtLmFkZENsYXNzKCdsaXN0LWl0ZW0nKTtcblx0XHRcdFx0bGlzdEl0ZW0uYXBwZW5kKGJlZXJOYW1lKTtcblx0XHRcdFx0c2VhcmNoTGlzdC5hcHBlbmQobGlzdEl0ZW0pO1xuXHRcdFx0XHRzZWFyY2hSZXN1bHRzLmFwcGVuZChzZWFyY2hMaXN0KTtcblx0XHRcdFx0aW5mb0Rpdi5hcHBlbmQoc2VhcmNoUmVzdWx0cyk7XG5cblx0XHRcdFx0bGlzdEl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIGFidiA9ICQoJzxwPicpO1xuXHRcdFx0XHRcdHZhciBpYnUgPSAkKCc8cD4nKTtcblx0XHRcdFx0XHR2YXIgYXZhaWxhYmlsaXR5ID0gJCgnPHA+Jyk7XG5cdFx0XHRcdFx0dmFyIGRlcyA9ICQoJzxwPicpO1xuXHRcdFx0XHRcdHZhciBwYWlyaW5nID0gJCgnPHA+Jyk7XG5cdFx0XHRcdFx0dmFyIHNlbGVjdEJlZXJOYW1lID0gJCgnPGgzPicpO1xuXG5cdFx0XHRcdFx0VHdlZW5NYXgudG8oc2VhcmNoUmVzdWx0cywgMC4yLCB7b3BhY2l0eTogMCwgZGlzcGxheTogXCJub25lXCJ9KTtcblx0XHRcdFx0XHRUd2Vlbk1heC50bygnLmJyZXctaW5mbycsIDAuMiwge29wYWNpdHk6IDEsIGRpc3BsYXk6IFwiYmxvY2tcIn0pO1xuXHRcdFx0XHRcdGlmKGJlZXJEYXRhLmxhYmVscykge2JlZXJJbWcuYXR0cignc3JjJywgYmVlckRhdGEubGFiZWxzLm1lZGl1bSl9O1xuXHRcdFx0XHRcdCQoJy5zZWFyY2gtaW1nJykuYXBwZW5kKGJlZXJJbWcpO1xuXHRcdFx0XHRcdHNlbGVjdEJlZXJOYW1lLmFkZENsYXNzKCdzZWxlY3QtYmVlci1uYW1lJyk7XG5cdFx0XHRcdFx0c2VsZWN0QmVlck5hbWUuaHRtbCgnQmVlciBOYW1lOiAnICsgYmVlckRhdGEubmFtZSk7XG5cdFx0XHRcdFx0aWYgKGJlZXJEYXRhLmFidikge1xuXHRcdFx0XHRcdFx0YWJ2Lmh0bWwoJ0FCVjogJyArIGJlZXJEYXRhLmFidik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFidi5odG1sKCdBQlY6IFRoZXJlXFwncyBub3RoaW5nIHRvIGJlIGZvdW5kLicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYmVlckRhdGEuaWJ1KSB7XG5cdFx0XHRcdFx0XHRpYnUuaHRtbCgnSUJVOiAnICsgYmVlckRhdGEuaWJ1KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWJ1Lmh0bWwoJ0lCVTogVGhlcmVcXCdzIG5vdGhpbmcgdG8gYmUgZm91bmQuJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChiZWVyRGF0YS5hdmFpbGFibGUpIHtcblx0XHRcdFx0XHRcdGF2YWlsYWJpbGl0eS5odG1sKCdBdmFpbGFiaWxpdHk6ICcgKyBiZWVyRGF0YS5hdmFpbGFibGUuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhdmFpbGFiaWxpdHkuaHRtbCgnQXZhaWxhYmlsaXR5OiBUaGVyZVxcJ3Mgbm90aGluZyB0byBiZSBmb3VuZC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJlZXJEYXRhLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdFx0XHRkZXMuaHRtbCgnRGVzY3JpcHRpb246ICcgKyBiZWVyRGF0YS5kZXNjcmlwdGlvbik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRlcy5odG1sKCdEZXNjcmlwdGlvbjogVGhlcmVcXCdzIG5vdGhpbmcgdG8gYmUgZm91bmQuJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChiZWVyRGF0YS5mb29kUGFpcmluZ3MpIHtcblx0XHRcdFx0XHRcdHBhaXJpbmcuaHRtbCgnRm9vZCBQYWlyaW5nOiAnICsgYmVlckRhdGEuZm9vZFBhaXJpbmdzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cGFpcmluZy5odG1sKCdGb29kIFBhaXJpbmc6IFRoZXJlXFwncyBub3RoaW5nIHRvIGJlIGZvdW5kLicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCcuc2VhcmNoLXNwZWNzJykuYXBwZW5kKHNlbGVjdEJlZXJOYW1lKTtcblx0XHRcdFx0XHQkKCcuc2VhcmNoLXNwZWNzJykuYXBwZW5kKGFidik7XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChpYnUpO1xuXHRcdFx0XHRcdCQoJy5zZWFyY2gtc3BlY3MnKS5hcHBlbmQoYXZhaWxhYmlsaXR5KTtcblx0XHRcdFx0XHQkKCcuc2VhcmNoLXNwZWNzJykuYXBwZW5kKGRlcyk7XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChwYWlyaW5nKTtcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cblx0XHR9XG5cblx0XHRpZiAoJCgnI3NlbGVjdC1ib3gnKS52YWwoKSA9PSAnYnJld2VyeScpIHtcblx0XHRcdHZhciBicmV3ZXJ5SW1nID0gJCgnPGltZz4nKTtcblxuXHRcdFx0YmVlclJlc3VsdHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGJlZXJEYXRhKSB7XG5cdFx0XHRcdHZhciBsaXN0SXRlbSA9ICQoJzxsaT4nKTtcblx0XHRcdFx0dmFyIGJyZXdlcnlOYW1lID0gJCgnPGgzPicpO1xuXHRcdFx0XHRicmV3ZXJ5TmFtZS5hdHRyKCdkYXRhLWluZGV4JywgaSk7XG5cdFx0XHRcdGJyZXdlcnlOYW1lLmh0bWwoYmVlckRhdGEubmFtZSk7XG5cdFx0XHRcdGJyZXdlcnlOYW1lLmFkZENsYXNzKCdiZWVyLW5hbWUnKTtcblx0XHRcdFx0bGlzdEl0ZW0uYWRkQ2xhc3MoJ2xpc3QtaXRlbScpO1xuXHRcdFx0XHRsaXN0SXRlbS5hcHBlbmQoYnJld2VyeU5hbWUpO1xuXHRcdFx0XHRzZWFyY2hMaXN0LmFwcGVuZChsaXN0SXRlbSk7XG5cdFx0XHRcdHNlYXJjaFJlc3VsdHMuYXBwZW5kKHNlYXJjaExpc3QpO1xuXHRcdFx0XHRpbmZvRGl2LmFwcGVuZChzZWFyY2hSZXN1bHRzKTtcblxuXHRcdFx0XHRsaXN0SXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR2YXIgZXN0ID0gJCgnPHA+Jyk7XG5cdFx0XHRcdFx0dmFyIHdlYnNpdGUgPSAkKCc8YT4nKTtcblx0XHRcdFx0XHR2YXIgYnJld2VyeURlcyA9ICQoJzxwPicpO1xuXHRcdFx0XHRcdHZhciBzZWxlY3RCcmV3ZXJ5TmFtZSA9ICQoJzxoMz4nKTtcblxuXHRcdFx0XHRcdFR3ZWVuTWF4LnRvKHNlYXJjaFJlc3VsdHMsIDAuMiwge29wYWNpdHk6IDAsIGRpc3BsYXk6IFwibm9uZVwifSk7XG5cdFx0XHRcdFx0VHdlZW5NYXgudG8oJy5icmV3LWluZm8nLCAwLjIsIHtvcGFjaXR5OiAxLCBkaXNwbGF5OiBcImJsb2NrXCJ9KTtcblx0XHRcdFx0XHRpZihiZWVyRGF0YS5pbWFnZXMpIHticmV3ZXJ5SW1nLmF0dHIoJ3NyYycsIGJlZXJEYXRhLmltYWdlcy5zcXVhcmVMYXJnZSl9O1xuXHRcdFx0XHRcdCQoJy5zZWFyY2gtaW1nJykuYXBwZW5kKGJyZXdlcnlJbWcpO1xuXHRcdFx0XHRcdHNlbGVjdEJyZXdlcnlOYW1lLmFkZENsYXNzKCdzZWxlY3QtYmVlci1uYW1lJyk7XG5cdFx0XHRcdFx0c2VsZWN0QnJld2VyeU5hbWUuaHRtbCgnQnJld2VyeSBOYW1lOiAnICsgYmVlckRhdGEubmFtZSk7XG5cdFx0XHRcdFx0aWYgKGJlZXJEYXRhLmVzdGFibGlzaGVkKSB7XG5cdFx0XHRcdFx0XHRlc3QuaHRtbCgnRXN0YWJsaXNoZWQ6ICcgKyBiZWVyRGF0YS5lc3RhYmxpc2hlZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVzdC5odG1sKCdFc3RhYmxpc2hlZDogVGhlcmVcXCdzIG5vdGhpbmcgdG8gYmUgZm91bmQuJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChiZWVyRGF0YS53ZWJzaXRlKSB7XG5cdFx0XHRcdFx0XHR3ZWJzaXRlLmF0dHIoJ2hyZWYnLCBiZWVyRGF0YS53ZWJzaXRlKTtcblx0XHRcdFx0XHRcdHdlYnNpdGUudGV4dChiZWVyRGF0YS5uYW1lKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2Vic2l0ZS5odG1sKCdXZWJzaXRlOiBUaGVyZVxcJ3Mgbm90aGluZyB0byBiZSBmb3VuZC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJlZXJEYXRhLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdFx0XHRicmV3ZXJ5RGVzLmh0bWwoJ0Rlc2NyaXB0aW9uOiAnICsgYmVlckRhdGEuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRicmV3ZXJ5RGVzLmh0bWwoJ0Rlc2NyaXB0aW9uOiBUaGVyZVxcJ3Mgbm90aGluZyB0byBiZSBmb3VuZC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChzZWxlY3RCcmV3ZXJ5TmFtZSk7XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChlc3QpO1xuXHRcdFx0XHRcdCQoJy5zZWFyY2gtc3BlY3MnKS5hcHBlbmQod2Vic2l0ZSk7XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChicmV3ZXJ5RGVzKTtcblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCcjc2VsZWN0LWJveCcpLnZhbCgpID09ICdndWlsZCcpIHtcblxuXHRcdFx0YmVlclJlc3VsdHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGJlZXJEYXRhKXtcblx0XHRcdFx0dmFyIGxpc3RJdGVtID0gJCgnPGxpPicpO1xuXHRcdFx0XHR2YXIgZ3VpbGROYW1lID0gJCgnPGgzPicpO1xuXHRcdFx0XHRndWlsZE5hbWUuaHRtbChiZWVyRGF0YS5uYW1lKTtcblx0XHRcdFx0Z3VpbGROYW1lLmFkZENsYXNzKCdiZWVyLW5hbWUnKTtcblx0XHRcdFx0bGlzdEl0ZW0uYWRkQ2xhc3MoJ2xpc3QtaXRlbScpO1xuXHRcdFx0XHRsaXN0SXRlbS5hcHBlbmQoZ3VpbGROYW1lKTtcblx0XHRcdFx0c2VhcmNoTGlzdC5hcHBlbmQobGlzdEl0ZW0pO1xuXHRcdFx0XHRzZWFyY2hSZXN1bHRzLmFwcGVuZChzZWFyY2hMaXN0KTtcblx0XHRcdFx0aW5mb0Rpdi5hcHBlbmQoc2VhcmNoUmVzdWx0cyk7XG5cblx0XHRcdFx0bGlzdEl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0dmFyIGd1aWxkV2Vic2l0ZSA9ICQoJzxhPicpO1xuXHRcdFx0XHRcdHZhciBndWlsZERlcyA9ICQoJzxwPicpO1xuXHRcdFx0XHRcdHZhciBzZWxlY3RHdWlsZE5hbWUgPSAkKCc8aDM+Jyk7XG5cblx0XHRcdFx0XHRUd2Vlbk1heC50byhzZWFyY2hSZXN1bHRzLCAwLjIsIHtvcGFjaXR5OiAwLCBkaXNwbGF5OiBcIm5vbmVcIn0pO1xuXHRcdFx0XHRcdFR3ZWVuTWF4LnRvKCcuYnJldy1pbmZvJywgMC4yLCB7b3BhY2l0eTogMSwgZGlzcGxheTogXCJibG9ja1wifSk7XG5cdFx0XHRcdFx0c2VsZWN0R3VpbGROYW1lLmFkZENsYXNzKCdzZWxlY3QtYmVlci1uYW1lJyk7XG5cdFx0XHRcdFx0c2VsZWN0R3VpbGROYW1lLmh0bWwoJ0d1aWxkIE5hbWU6ICcgKyBiZWVyRGF0YS5uYW1lKTtcblxuXHRcdFx0XHRcdGlmIChiZWVyRGF0YS53ZWJzaXRlKSB7XG5cdFx0XHRcdFx0XHRndWlsZFdlYnNpdGUuYXR0cignaHJlZicsIGJlZXJEYXRhLndlYnNpdGUpO1xuXHRcdFx0XHRcdFx0Z3VpbGRXZWJzaXRlLnRleHQoYmVlckRhdGEubmFtZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGd1aWxkV2Vic2l0ZS5odG1sKCdHdWlsZCBXZWJzaXRlOiBUaGVyZVxcJ3Mgbm90aGluZyB0byBiZSBmb3VuZC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJlZXJEYXRhLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdFx0XHRndWlsZERlcy5odG1sKCdEZXNjcmlwdGlvbjogJyArIGJlZXJEYXRhLmRlc2NyaXB0aW9uKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Z3VpbGREZXMuaHRtbCgnRGVzY3JpcHRpb246IFRoZXJlXFwncyBub3RoaW5nIHRvIGJlIGZvdW5kLicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCcuc2VhcmNoLXNwZWNzJykuYXBwZW5kKHNlbGVjdEd1aWxkTmFtZSk7XG5cdFx0XHRcdFx0JCgnLnNlYXJjaC1zcGVjcycpLmFwcGVuZChndWlsZFdlYnNpdGUpO1xuXHRcdFx0XHRcdCQoJy5zZWFyY2gtc3BlY3MnKS5hcHBlbmQoZ3VpbGREZXMpO1xuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9XG5cblxuXHR9O1xuXG5cdGZ1bmN0aW9uIHJlbW92ZUxpc3RFbGVtZW50cygpIHtcblx0XHRpZigkKCcuc2VhcmNoLXJlc3VsdHMnKS5sZW5ndGgpIHtcblxuXHRcdFx0Zm9yICh2YXIgaSA9ICQoJy5zZWFyY2gtcmVzdWx0cycpLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdCQoJ3VsJykucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlSW5mb0VsZW1lbnRzKCkge1xuXHRcdGlmKCQoJy5zZWFyY2gtc3BlY3MnKS5sZW5ndGgpIHtcblx0XHRcdGZvciAodmFyIGkgPSAkKCcuc2VhcmNoLXNwZWNzJykubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0JCgnLnNlbGVjdC1iZWVyLW5hbWUnKS5yZW1vdmUoKTtcblx0XHRcdFx0JCgncCcpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldHVwTGlzdGVuZXJzKGUpe1xuXHRcdCQoJy5idXR0b24tMScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRyZW1vdmVMaXN0RWxlbWVudHMoKTtcblx0XHRcdHZhciBicmV3c1VybFBhdGggPSAnYnJld3MucGhwP19lcD0vc2VhcmNoJnE9JyArICQoJy5pbnB1dC0xJykudmFsKCk7XG5cdFx0XHRpZiAoJCgnI3NlbGVjdC1ib3gnKS52YWwoKSl7XG5cdFx0XHRcdGJyZXdzVXJsUGF0aCArPSAgJyZ0eXBlPScgKyAkKCcjc2VsZWN0LWJveCcpLnZhbCgpO1xuXHRcdFx0fVxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiBicmV3c1VybFBhdGggXG5cdFx0XHR9KVxuXHRcdFx0LmRvbmUocG9wdWxhdGVCcmV3cyk7XG5cdFx0fSk7XG5cblx0XHQkKCcuYmFjay1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRyZW1vdmVJbmZvRWxlbWVudHMoKTtcblx0XHRcdFR3ZWVuTWF4LnRvKCcuYnJldy1pbmZvJywgMSwge29wYWNpdHk6IDAsIGRpc3BsYXk6ICdub25lJ30pO1xuXHRcdFx0VHdlZW5NYXgudG8oJy5zZWFyY2gtcmVzdWx0cycsIDEsIHtvcGFjaXR5OiAxLCBkaXNwbGF5OiAnYmxvY2snfSk7XG5cdFx0fSlcblx0fTtcblxuXHRmdW5jdGlvbiBpbml0KCl7XG5cdFx0c2V0dXBMaXN0ZW5lcnMoKTtcblx0fTtcblxuXHRzaGFyZWQuaW5pdCA9IGluaXQ7XG5cblx0cmV0dXJuIHNoYXJlZDtcbn0oKSk7XG5cbkJlZXJBcGkuaW5pdCgpO1xuXG52YXIgVHdpdHRlckFwaSA9IChmdW5jdGlvbigpe1xuXHR2YXIgc2hhcmVkID0ge307XG5cblx0ZnVuY3Rpb24gcG9wdWxhdGVUd2VldHModHdlZXRSZXN1bHRzKSB7XG5cdFx0dmFyIHR3ZWV0cyA9IEpTT04ucGFyc2UodHdlZXRSZXN1bHRzKTtcblx0XHRjb25zb2xlLmxvZyh0d2VldHMpO1xuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQ29udGVudERpdigpIHtcblx0XHRcdHZhciB0d2l0dGVyV3JhcHBlciA9ICQoJzxkaXY+Jyk7XG5cdFx0XHR2YXIgdHdlZXRDb250ZW50ID0gJCgnPGRpdj4nKTtcblx0XHRcdHZhciB1c2VyUGljID0gJCgnPGRpdj4nKTtcblx0XHRcdHZhciB1c2VySW1nID0gJCgnPGltZz4nKTtcblx0XHRcdHZhciB0d2VldFRleHREaXYgPSAkKCc8ZGl2PicpO1xuXHRcdFx0dmFyIHVzZXJOYW1lID0gJCgnPGg0PicpO1xuXHRcdFx0dmFyIHVzZXJUd2VldCA9ICQoJzxkaXY+Jyk7XG5cdFx0XHR2YXIgcGFyYSA9ICQoJzxwPicpO1xuXHRcdFx0XG5cdFx0XHR0d2VldENvbnRlbnQuYWRkQ2xhc3MoJ3R3ZWV0LWNvbnRlbnQnKTtcblx0XHRcdHVzZXJQaWMuYWRkQ2xhc3MoJ3VzZXItcGljJyk7XG5cdFx0XHR0d2VldFRleHREaXYuYWRkQ2xhc3MoJ3R3ZWV0LXRleHQtZGl2Jyk7XG5cdFx0XHR0d2l0dGVyV3JhcHBlci5hZGRDbGFzcygndHdpdHRlci13cmFwcGVyJyk7XG5cblx0XHRcdCQoJy50d2l0dGVyLW1vZHVsZScpLmFwcGVuZCh0d2l0dGVyV3JhcHBlcik7XG5cdFx0XHR0d2l0dGVyV3JhcHBlci5hcHBlbmQodHdlZXRDb250ZW50KVxuXHRcdFx0dHdlZXRDb250ZW50LmFwcGVuZCh1c2VyUGljKTtcblx0XHRcdHVzZXJQaWMuYXBwZW5kKHVzZXJJbWcpO1xuXHRcdFx0dHdlZXRDb250ZW50LmFwcGVuZCh0d2VldFRleHREaXYpO1xuXHRcdFx0dHdlZXRUZXh0RGl2LmFwcGVuZCh1c2VyTmFtZSk7XG5cdFx0XHR0d2VldFRleHREaXYuYXBwZW5kKHVzZXJUd2VldCk7XG5cdFx0XHR1c2VyVHdlZXQuYXBwZW5kKHBhcmEpO1xuXG5cdFx0XHR1c2VySW1nLmF0dHIoJ3NyYycsIHR3ZWV0cy5zdGF0dXNlc1tpXS51c2VyLnByb2ZpbGVfaW1hZ2VfdXJsKTtcblx0XHRcdHVzZXJOYW1lLmh0bWwodHdlZXRzLnN0YXR1c2VzW2ldLnVzZXIuc2NyZWVuX25hbWUgKyAnIC0gJyArIHR3ZWV0cy5zdGF0dXNlc1tpXS51c2VyLm5hbWUpO1xuXHRcdFx0cGFyYS5odG1sKHR3ZWV0cy5zdGF0dXNlc1tpXS50ZXh0KTtcblxuXHRcdH1cblx0XHRcblx0XHRmb3IgKHZhciBpID0gdHdlZXRzLnN0YXR1c2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cblx0XHRcdGNyZWF0ZUNvbnRlbnREaXYoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVFbGVtZW50cygpIHtcblx0XHRpZigkKCcudHdpdHRlci1tb2R1bGUnKS5sZW5ndGgpIHtcblx0XHRcdGZvciAodmFyIGkgPSAkKCcudHdpdHRlci1tb2R1bGUnKS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHQkKCcudHdpdHRlci13cmFwcGVyJykucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoZSl7XG5cdFx0JCgnLmJ1dHRvbi0xJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHRcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHJlbW92ZUVsZW1lbnRzKCk7XG5cdFx0XHR2YXIgdHdpdHRlclVybFBhdGggPSAndHdpdHRlci1wcm94eS5waHAnO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiB0d2l0dGVyVXJsUGF0aCArICc/b3A9c2VhcmNoX3R3ZWV0cyZxPScgKyAkKCcuaW5wdXQtMScpLnZhbCgpICsgJysnICsgJCgnI3NlbGVjdC1ib3gnKS52YWwoKSArICcmY291bnQ9MTAnXG5cdFx0XHR9KVxuXHRcdFx0LmRvbmUocG9wdWxhdGVUd2VldHMpO1xuXHRcdH0pXG5cdH07XG5cblx0ZnVuY3Rpb24gaW5pdCgpe1xuXHRcdHNldHVwTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRzaGFyZWQuaW5pdCA9IGluaXQ7XG5cblx0cmV0dXJuIHNoYXJlZDtcblxufSgpKTtcblxuVHdpdHRlckFwaS5pbml0KCk7Il19