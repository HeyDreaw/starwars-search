var resultsCache = {};

function showResults(names) {

    // Override CSS style of results window
    $('.results-content').css({
        height: 'auto',
        padding: 'none',
        textAlign: 'left',
    });

   
    var resultHTML = '<ul>';
    var count = 0;
    $.each(names.results, function(i, person) {

        if(person.gender == 'n/a'){ 
          person.gender = 'No Gender';
        }

        //Filter by gender

        let dropdown = $('#select-gender');
        

        var personHair = '';
        var personGender = '';

        // eliminate "none" and "n/a" responses for hair
        if (person.hair_color != "none" && person.hair_color != 'n/a') {
            personHair = person.hair_color + ' hair &#183 ';
        }

        if (person.gender != "n/a") {
            personGender = person.gender + ' &#183 ';
        }

        // Display character Information
        resultHTML += '<li class="character-name">' + person.name + '</li>';
        resultHTML += '<li class="character-details">' + personGender + personHair + person.eye_color + ' eyes' + '</li>';
        resultHTML += '<hr>';
        count++;

        $('.return-value p').text(count + " RESULTS");

    }); // end of loop and matching characters
    resultHTML += '</ul>'; // close the ul tag

    $('.results-content').html(resultHTML); // render HTML string into div element

    // Fallback if there are no results
    if (!count) {
      $(".results-content").html("<p id='no-results'>No Results</p>");
    }
}


// content entered by user
$('form').submit(function(evt) {
    // prevent submit button from submitting a form
    evt.preventDefault();

    // empty the ul.hide-checkboxes wrapper
    $("ul.hide-checkboxes").html('');
    $(".return-value p").html('0 RESULTS');

    // capture the text of the input field
    var $searchField = $('.search');
    var name = $searchField.val();
    console.log(name);

    // if the length of name is nothing, stop the search
    if (name.length === 0) {
        return false;
    }

    $searchField.prop("disabled", true);

    // ajax request swAPI (API to query), data (search the API), showResults (DOM manipulation)
    var swAPI = 'https://swapi.co/api/people/';

    // store query data to send to api
    // reference https://swapi.co/api/people/?search=r2
    // convert url query string "search=r2" to json object structure
    var data = {
        search: name
    };
    var jsonSuccess = function(names) {
        resultsCache = names; // cache results for later
        showResults(resultsCache); // populate results content
        $searchField.prop("disabled", false);
    }

    // data has to be constructed from the user input
    $.getJSON(swAPI, data, jsonSuccess);


});

// gender filter button.
$('.gender').on('click', function(event) {
    // reveal gender filter button
    $(this).parent().find('ul').toggle(0);
});
