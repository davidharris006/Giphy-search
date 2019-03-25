$(document).ready(function () {
    var queryURL = 'https://api.giphy.com';
var sports = ["Football", "Basketball", "Baseball", "Soccer", "Golf", "Hockey", "MMA", "Volleyball", "Lacrosse"];

function createbuttons() {
    $('#gif-buttons').empty
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
        event.preventDefualt();

        var searchval = $('#search-input').val().trim()
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
    for (let i = 0; i < 25; i++) {
        var newdivs = $('<div>')
        var pic = response.data[i].images.downsized_medium.url
        newdivs.html(`<img src="${pic}">`).css("margin", "10px")
        $('#gif-display').append(newdivs)
    }
  });
}
createbuttons();
$(document).on("click", ".sports", displaygifs);

//  giphy API key: UzLULS0HiHhIzbcNNCZNXfr71YM1KrhW
});