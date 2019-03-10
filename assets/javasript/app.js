$(document).ready(function() {
  //   define topics for initial buttons
  var topics = [
    "Bruce Willis",
    "Keanu Reeves",
    "Mel Gibson",
    "Samuel L Jackson",
    "Christopher Walkin"
  ];
  //   dynamically create html layout
  $(".container")
    .append($("<div>").addClass("titleSpace"))
    .append($("<div>").addClass("topicSpace"))
    .append($("<div>").addClass("displaySpace"));
  $(".titleSpace")
    .append("<h1>Movie Star Gifs</h1>")
    .append("<h2>Select a movie star to see some Giphy-gifs</h2>");

  // produce buttons from the topics array
  function makeButtons() {
    $(".topicSpace").empty();
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>")
        .addClass("topicButton")
        .attr("data-name", topics[i])
        .text(topics[i]);
      $(".topicSpace").append(newButton);
    }
  }
  //   produce the initial buttons
  makeButtons();
});
