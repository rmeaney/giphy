$(document).ready(function(){
 				
 				var subject =['playstation', 'xbox', 'gamecube', 'nintendo','sega', 'atari'];

 				//make buttons
 				function buttonMaker(){
 					$('#subjectDisplayBox').empty();
	 					for(i=0; i < subject.length; i++){
	 						var newBTN = $("<button>").text(subject[i]).attr("data-subject", subject[i]).addClass("subjectButton");
	 						$('#subjectDisplayBox').append(newBTN);
	 			
	 						console.log(subject[i]);
 						}

 				}
 				function showGifs(){
 						var subject = $(this).attr("data-subject");
				
				var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ subject + "&rating=pg&api_key=7b8bc3cad5604c2bb1097f0f4a22365d";

				$.ajax({
					url: queryURL,
					method: 'GET',

				}).done(function(response){
					console.log(response);
					var results = response.data;
					$('#gifDisplay').empty();
					for (i = 0; i < results.length; i++){
						var subjectDiv = $("<div>").addClass("gifDiv");
						var rating = $("<p>").html("Rating: " + results[i].rating.toUpperCase());
						var still = results[i].images.fixed_height_still.url;
						var animate = results[i].images.fixed_height.url;
						//
						var subjectImg = $("<img>").addClass("gif").attr({"src": still, "data-still": still, "data-animate": animate, "data-state": "still"});

						subjectDiv.append(subjectImg).append(rating);
        			$("#gifDisplay").append(subjectDiv);
					} 
				})
			}
				function freezeGif(){
					var state = $(this).attr("data-state");
					if (state === "still") {
						$(this).attr("src", $(this).attr("data-animate"));
						$(this).attr("data-state", "animate");
					} else {
						$(this).attr("src", $(this).attr("data-still"));
						$(this).attr("data-state", "still");
					}
				}

       

 				//var url = "7b8bc3cad5604c2bb1097f0f4a22365d"
 				//var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ subject + "&api_key=7b8bc3cad5604c2bb1097f0f4a22365d";
 				$(document).on("click", ".subjectButton", showGifs);
 				$(document).on("click", ".gif", freezeGif);
 				buttonMaker();

 				// now we will add the search for subject code
 				$('#addSubject').on('click', function(event){
 					event.preventDefault();
 					var newSubject = $("#searchSubject").val().trim();
 					if (newSubject != "" && subject.indexOf(newSubject.toLowerCase()) === -1) {
						$("#searchSubject").val("");
						subject.push(newSubject);
						buttonMaker();
					} else {
						alert("Enter a new search term!");
					}

 				});
 		});