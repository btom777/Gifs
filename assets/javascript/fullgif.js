var movies = ['lebron', 'league of legends', 'bird', 'kobe'];

$(document).ready(function() {
	function alertMovieName(){

		$('#gifsAppearHere').empty();

		var animal = $(this).data('name');
		console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			console.log(response);

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var animalDiv = $('<div>')

				var rating = results[i].rating;

				var p = $('<p>').text("Rating: " + rating);

				var animalImage = $('<img>');

				animalImage.attr('src', results[i].images.fixed_height_still.url);
		    	animalImage.attr('data-still', results[i].images.fixed_height_still.url);
		    	animalImage.attr('data-animate', results[i].images.fixed_height.url);
		    	animalImage.attr('data-state', 'still');
		    	animalImage.attr('class', 'animalImage');

				animalDiv.append(p)
				animalDiv.append(animalImage)

				$('#gifsAppearHere').prepend(animalDiv);
			}

			$('.animalImage').on('click', function(){	

			var state = $(this).attr("data-state");
	
			if (state == "still") {
                		$(this).attr('src', $(this).data("animate"));
                		$(this).attr('data-state', "animate")
            		}
            		else {     
                		$(this).attr('src', $(this).data("still"))
                		$(this).attr('data-state', "still");
            		}
			});
		});
	};

	function renderButtons(){

		$('#moviesView').empty();

		for (var i = 0; i < movies.length; i++){
			var a = $('<button>')
			a.addClass('movie'); // Added a class 
			a.attr('data-name', movies[i]); // Added a data-attribute
			a.text(movies[i]); // Provided the initial button text
			$('#moviesView').append(a); // Added the button to the HTML
		}
	};

	$('#addMovie').on('click', function(){

		var movie = $('#movie-input').val().trim();

		movies.push(movie);

		renderButtons();
		return false;
	});

	$('.animalImage').on('click', function(){	

		var state = $(this).attr("data-state");
	
		if (state == "still") {
            $(this).attr('src', $(this).data("animate"));
            $(this).attr('data-state', "animate")
        }
        else {     
            $(this).attr('src', $(this).data("still"))
            $(this).attr('data-state', "still");
        }
	});

	$(document).on('click', '.movie', alertMovieName);

	renderButtons();
});
