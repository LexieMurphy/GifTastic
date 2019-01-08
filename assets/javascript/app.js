$(document).ready(function () {

    $(document).on("click", ".topic-btn", displayTopicInfo);
    $(document).on("click", ".topicGif", animateTopicGif);


    // Initial array of topics
    var topics = ["happy", "sad", "angry", "excited", "sleepy", "annoyed", "embarrassed"];


    // Function for displaying topics buttons
    function renderButtons() {

        // Deleting the topics prior to adding new topics
        $("#buttons-view").empty();

        // Looping through the array of topics and dynamically generate buttons for each topic in array
        for (var i = 0; i < topics.length; i++) {

            var button = $("<button>");
            button.addClass("topic-btn");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(button);
        }
    }


    // This function handles events where add topic button is clicked and gets text and puts into array
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);

        renderButtons();
    });


    // displayTopicInfo function re-renders the HTML to display the appropriate content
    function displayTopicInfo() {

        var topic = $(this).attr("data-name");
        // Constructing a queryURL using the topic

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
            method: "GET",
            url: queryURL,
        })
            // After data comes back from the request store the data results in the variable
            .then(function (response) {

                var results = response.data;

                $("#topics-view").empty();
                // Loop through each result item and create div for rating and image
                for (var i = 0; i < results.length; i++) {

                    var topicDiv = $("<div>");
                    var topicImage = $("<img>");
                    topicImage.addClass("topicGif");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-state", "still");
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Appending the paragraph and image tag to the topicDiv
                    topicDiv.append(topicImage);
                    topicDiv.append(p);


                    // Prependng the topicDiv to the HTML page in the gifs div
                    $("#topics-view").prepend(topicDiv);
                }
            });

    };


    // Adding a click event listener to all elements with a class of "topic-btn"
    $(document).on("click", ".topic-btn", displayTopicInfo);


    function animateTopicGif() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };
    
    // Calling the renderButtons function to display the intial buttons
    renderButtons();

})
