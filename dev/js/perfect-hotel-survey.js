$(function(){
	var $survey = $('.questions'),
		$currentSection = $('#step-1'),
		$nextSection = $('#step-2'),
		$submit = $survey.find('button'),
		$progress = $survey.find('.questions-progress'),
		$results = $('.results'),
		$otherResults = $('.results__others'),
		$revealResults = $('.results__reveal'),
		chosenOptions = [];

	$currentSection.find('.button').click(function(){
		$survey.addClass('started');
		$currentSection.fadeOut(200, function(){
			$nextSection.fadeIn(200, function(){
				$(this).find('.option').addClass('visible');

				// Redeclare current and next
				$currentSection = $(this);
				$nextSection = $currentSection.next('section');
			});
			$submit.fadeIn(200);
			$progress.fadeIn(200);
		});
	});

	$survey.find('.option').click(function(){

		// Save the option choice
		chosenOptions.push($(this).data('category'));


		// Fade out this question
		$currentSection.fadeOut(200, function(){

			// check if this is the last one
			if ($nextSection.length > 0) {
				// Fade in the next question
				$nextSection.fadeIn(200, function(){
					$(this).find('.option').addClass('visible');

					// Redeclare current and next
					$currentSection = $(this);
					$nextSection = $currentSection.next('section');
				});
			}
			else {
				// Get the hotels json file
				var jsonPath = "/hotel_data.json";
				if (window.location.href.indexOf('darkblue') === -1 ) {
					jsonPath = "/volvo/hotel_data.json";
				}

				$.getJSON( jsonPath, function( data ) {
					var hotels = data;
					var ranking = [];

					$(hotels).each(function(index, hotelData){
						var points = 0;
						$(chosenOptions).each(function(index, value){
							
							if (hotelData[value] === 1) {
								// add two points if it's in the right location, one for any other matches
								if (index > 3) points++;
								points++;
							}
						});
						hotels[index]['points'] = points;
						console.log(hotelData['sale title'] + " ––– " + points);
					});

					// Sort based on points
					function compare(a,b) {
						if (a.points > b.points)
							return -1;
						if (a.points < b.points)
							return 1;
						return 0;
					}
					hotels = hotels.sort(compare);

					// Fill in the best match box with the details of the highest scorer
					$results.find('.tile--large h4').text(hotels[0]['sale title']+", "+hotels[0]['sale location']);
					$results.find('.tile--large .image').attr("style", "background-image: url('"+hotels[0]['image url']+"');");
					$results.find('.tile--large .button').attr("href", hotels[0]['page url']);
					$results.find('.tile--large .price').text(hotels[0]['price']);
					$results.find('.tile--large .prev-price').text(hotels[0]['previous price']);
					$results.find('.tile--large .social--twitter').attr("href", "https://twitter.com/intent/tweet?text=My%20perfect%20UK%20hotel%20is%20\""+hotels[0]['sale title'].split(' ').join('%20')+"\"%20–%20Find%20yours%20here:%20https://secretescapes.com/volvov40");
					$results.find('.social--facebook').attr("href", "https://www.facebook.com/sharer/sharer.php?u=https%3A//secretescapes.com/volvov40");

					// Get rid of all but the next three runners-up
					hotels = hotels.slice(1, 4);

					// Populate the 'other matches' section
					var html = "";
					$(hotels).each(function(){
						html += '<div class="medium-4 columns">';
							html += '<div class="tile">';
				                html += '<div class="image" style="background-image: url('+this['image url']+')"></div>';
				                html += '<div class="tile__inner">';
				                    html += '<h4>'+this['sale title']+', '+this['sale location']+'</h4>';
				                    html += '<p>From <span class="price">'+this['price']+'</span> <span class="prev-price">'+this['previous price']+'</span> pp/night</p>';
				                    html += '<a class="button" href="'+this['page url']+'" target="_blank">View Hotel</a>';
				                html += '</div>';
				            html += '</div>';
				        html += '</div>';
					});

					// Add to the other matches div
					$otherResults.prepend(html);

					// Matchy matchy
					$('.tile .tile__inner').matchHeight({byRow: true});

					// Show the results
					$survey.fadeOut(200, function(){
						$results.fadeIn(200);
					});
				});
			}
		});

		$revealResults.off().on('click', function() {
			$otherResults.slideToggle();
		});



		// Move along the progress indicator
		$current = $progress.find(".current");
		$next = $current.next(".stage");

		$current.removeClass('current').addClass('passed');
		$next.addClass('current');


		// Fade in the next question


	});
});
