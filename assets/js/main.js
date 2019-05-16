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

        if (count != 1) {
            $('.return-value p').text(count + " RESULTS");
        } else {
            $('.return-value p').text("1 RESULT");
        }

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

    // capture the text of the input field
    var $searchField = $('.search');
    var name = $searchField.val();

    $searchField.prop("disabled", true);

    // ajax request swAPI (API to query), data (search the API), showResults (DOM manipulation)
    var swAPI = 'https://swapi.co/api/people/';

    // store query data to send to api
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