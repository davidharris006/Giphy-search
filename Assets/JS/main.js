$(document).ready(function () {
    var queryURL = 'https://api.giphy.com';
    var newobj;
var sports = ["Football", "Basketball", "Baseball", "Soccer", "Golf", "Hockey", "MMA", "Volleyball", "Lacrosse"];

function createbuttons() {
    $('#gif-buttons').empty()
for (let i = 0; i < sports.length; i++) {
    var buttonsmade= $('<button>')
    buttonsmade.addClass('sports')
    buttonsmade.attr('data-name', sports[i])
    buttonsmade.text(sports[i]).css("margin", "5px")
    $('#gif-buttons').append(buttonsmade)  
    console.log(buttonsmade.attr("data-name")) 
}
}
$('#search-btn').on("click", function(event){   
        event.preventDefault();

        var searchval = $("#search-input").val().trim()
        sports.push(searchval);
        createbuttons()

    });

function displaygifs(){

    $('#gif-display').empty()
    console.log(buttonpressed)
    var buttonpressed = $(this).attr('data-name').trim()
$.ajax({
    url: `${queryURL}/v1/gifs/search?q=${buttonpressed}&api_key=UzLULS0HiHhIzbcNNCZNXfr71YM1KrhW`,
    method: "GET"
  }).then(function (response) {
    console.log(response) 
    var result = response.data
    for (var i = 0; i < result.length; i++) {
        var newdivs = $('<div>')
        var newpics = $('<img>')
        var pic = result[i].images.downsized_still.url
        newdivs.addClass('gifbackground')
        newpics.attr('src', pic).addClass('gifs').attr('data-still', result[i].images.downsized_still.url).attr('data-reg', result[i].images.downsized_medium.url).attr('data-state', "still")
        newdivs.append(newpics)
        
        $('#gif-display').append(newdivs)
        newdivs.prepend('<p class="ratingbox">Rating: ' + result[i].rating + "</p><br>").css('text-align', 'center')
      
        
    }
    $(".gifs").on("click", function(event) {
        event.preventDefault();
        var state = $(this).attr("data-state");
        console.log(state)
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-reg"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    })
  });
}

createbuttons();

$(document).on("click", ".sports", displaygifs);


//  giphy API key: UzLULS0HiHhIzbcNNCZNXfr71YM1KrhW
});