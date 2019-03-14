$(document).ready(function() {
  //   define topics for initial buttons
  var topics = [
    "Bruce Willis",
    "Keanu Reeves",
    "Mel Gibson",
    "Samuel L Jackson",
    "Christopher Walkin"
  ];
  var showMore = 0;
  //   dynamically create html layout
  $(".container")
    .append($("<div>").addClass("titleSpace"))
    .append($("<div>").addClass("topicSpace"))
    .append($("<div>").addClass("userSpace"))
    .append($("<div>").addClass("displaySpace"));
  $(".titleSpace")
    .append("<h1>Movie Star Gifs</h1>")
    .append("<h2>Select a movie star to see some Giphy-gifs</h2>");

  $(".userSpace")
    .append(
      $("<label>")
        .attr("for", "userbox")
        .text("Add a Movie Star")
    )
    .append(
      $("<input>")
        .addClass("userStar")
        .attr("name", "userbox")
        .attr("placeholder", "Actor/Actress Name")
    )
    .append(
      $("<button>")
        .addClass("newStar")
        .text("Add Star")
    )
    .append($("<div>").addClass("moreButton"));

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
  // produce the user custom buttons
  $(document).on("click", ".newStar", function() {
    topics.push($(".userStar").val());
    makeButtons();
  });
  // handles the (dis)animation
  $(document).on("click", ".gif", function() {
    if ($(this).data("state") == "still") {
      $(this).attr("src", $(this).data("animated"));
      $(this).data("state", "animated");
    } else if ($(this).data("state") == "animated") {
      $(this).attr("src", $(this).data("still"));
      $(this).data("state", "still");
    }
  });
  var userQuery;
  var codeQuery;
  var myAPIkey;
  var queryUrl;
  //   handles the ajax call
  $(document).on("click", ".topicButton", function() {
    userQuery = $(this).data("name");
    codeQuery = `&q=${userQuery.split(" ").join("+")}`;
    myAPIkey = "&api_key=nEYg13rE5PUMBlMIhGkUnbSWTWbMboiH";
    queryUrl = `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?limit=10${codeQuery}${myAPIkey}`;
    $(".displaySpace").empty();
    $(".moreButton").empty();
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      let i = 0;
      while (i < 10) {
        $(".displaySpace")
          .append(
            $(`<img src= ${response.data[i].images.fixed_width_still.url} >`)
              .attr(`src`, response.data[i].images.fixed_width_still.url)
              .attr("data-still", response.data[i].images.fixed_width_still.url)
              .attr("data-animated", response.data[i].images.fixed_width.url)
              .attr("data-state", "still")
              .addClass("gif")
          )
          .append($(`<p> Rated: ${response.data[i].rating}</p>`));
        i++;
      }
    });
    $(".moreButton").append(
      $("<button>")
        .addClass("showMore")
        .text(`Show Me More ${userQuery}`)
    );
    showMore = 1;
  });

  $(document).on("click", ".showMore", function() {
    queryUrl = `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?limit=10${codeQuery}${myAPIkey}&offset=${10 *
      showMore}`;
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      let i = 0;
      while (i < 10) {
        $(".displaySpace")
          .append(
            $(`<img src=${response.data[i].images.fixed_width_still.url}>`)
              .attr(`src`, response.data[i].images.fixed_width_still.url)
              .attr("data-still", response.data[i].images.fixed_width_still.url)
              .attr("data-animated", response.data[i].images.fixed_width.url)
              .attr("data-state", "still")
              .addClass("gif")
          )
          .append($(`<p> Rated: ${response.data[i].rating}</p>`));
        i++;
      }
      showMore++;
    });
  });
});
