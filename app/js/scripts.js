$(function(){


	//=====================================================
	//  Menu/Hamburger
	//=====================================================
	// Look for .hamburger
	var $hamburger = $(".hamburger");
	// Add the spans
	for (var i=0; i<4; i++){
		$hamburger.append('<span>');
	}
	// Bind the click event
	$hamburger.on("click", function(e) {
		$hamburger.toggleClass("open");
		// Do something else, like open/close menu
		var linkedElement = $(this).attr('aria-controls');
		$('#'+linkedElement).toggleClass('open');
	});


	//=====================================================
	//  Match Heights
	//=====================================================
	$('.match-height').matchHeight({byRow: true});



	//=====================================================
	//  Load Featured Breaks
	//=====================================================
	if ($('.feed-container')[0]) {
		var $feeds = $('.feed-container'),
			limit = 0;

		if (typeof $feeds.data('limit') === 'number') {
			limit = $feeds.data('limit');
		}

		$.each($feeds, function(feedCount, element){
			var $elem = $(element);
			var totalFeeds = $feeds.length;

			var feedTitle = $elem.data('feed').split("&")[0];
			var jsonPath = "/json/json_" + feedTitle + ".json";

			$.getJSON( jsonPath, function( data ) {

				var html = "";
				if (limit === 0 || data.length >= 3) {
					$.each(data, function(key, deal){
						if (limit > 0 && key >= limit) {
							$('body').trigger("dealsLoaded");
							return false;
						}

						html += '<div class="column">';
							html += '<div class="tile tile__container">';
								html += '<a href="https://www.secretescapes.com/'+deal['URL']+'/sale">';
				                	html += '<div class="tile__image">';
				                		html += '<img src="'+deal['LeadImage1']+'">';
				                	html += '</div>';
				                	html += '<div class="tile__content spacer--card-padded-box">';
				                		html += '<h3>'+deal['Title']+'</h3>';
				                		html += '<h5>'+deal['DestinationName']+'</h5>';
				                		html += '<p class="text-style--brand">Up to '+deal['TopDiscount']+'% off <span class="text-style--dark">|</span> '+deal['TimeRemaining']+'</p>';
				                	html += '</div>';
				                html += '</a>';
				        	html += '</div>';
				        html += '</div>';
				  		if (key + 1 === data.length && feedCount + 1 === totalFeeds) {
				  			$('body').trigger("dealsLoaded");
				  		}
					});
					$elem.append(html);
				}
			});

		});

		// Matchy matchy
		$( "body" ).on( "dealsLoaded", function( event ) {
			$('.tile__container').matchHeight({byRow: true});
		});

	}
});
