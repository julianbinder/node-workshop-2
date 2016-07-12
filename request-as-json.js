// In it, create a function called requestJson that takes a URL and a callback function as parameters.
// In your function, do the following:
// Using the request library, make a request to the URL that you were provided.
// When you receive the response: a. If there is an error, call the callback function and pass it the
// error as the first parameter b. If there is no error, move to step 3
// Use JSON.parse inside a try/catch block to parse the response: a. If there was an error parsing JSON, 
// call the callback function and pass it the same error as the first parameter b. If there was no error
// parsing the JSON, call the callback function and pass it a null error as the first parameter, and the
// parsed response as the second parameter
var request = require('request');


function requestJson(url, callback) {
    request(url, function(err, response) {
        if (err) {
            callback(err);
        }
        else {
            try {

                var parsed = JSON.parse(response.body);
                callback(null, parsed)
            }
            catch (err) {
                callback(err)
            }
        }
    })
}

// requestJson('http://jsonplaceholder.typicode.com/users', function(err, res) {
//     if (err) {
//         console.log(err)
//     }
//     console.log(res);
// })

// Using npm init, initialize your project any way you like.
// Add/commit/push the newly created package.json to Git

// Using your first module
// For the next exercise ("How's the weather?"), make sure to use your requestJson module instead of 
// using the regular request module. As you do this, you may notice that your requestJson function stopped
// working since you put it in a separate file. Find out how and fix it :)

// Go to Forecast.io API and read the documentation
// Get yourself a free API key
// Remember the Google Geocoding API from yesterday's workshop
// Using both APIs, complete the following workflow:
// Ask the user for their location
// Retrieve the weather for the user's location
// Display the current weather as well as the next 5 days weather in a nice way
// Hint: to display the results in a nice way, a few NPM modules could be useful, including but not limited to:
// colors
// cli-table
// node-emoji
// Add/commit/push

var prompt = require('prompt');
var weatherData;
var cityData;
var colors = require('colors');
var Table = require('cli-table');

function getTheWeather(city) {

    prompt.get('city', function(err, res) {
            var city = res.city;
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;


            requestJson(url, function(err, res) {
                    if (err) {
                        console.log(err)
                    }
                    else {

                        var apiURL = "https://api.forecast.io/forecast/" + "a4cbbed71bac69e9671675ea9c5721b0/" + res.results[0].geometry.location.lat + "," + res.results[0].geometry.location.lng;

                        request(apiURL, function(err, res, body) {


                                if (err) {
                                    console.log('There was an error');
                                }
                                else {
                                    var weatherData = JSON.parse(res.body);


                                    var fiveDays = weatherData.daily.data.slice(0, 5);
                                    console.log(colors.rainbow("The Weather for the next five days is:"));

                                    fiveDays.forEach(function(ele) {
                                            console.log(ele.summary.green)

                                        });
                                }






                            });

                         }

                });
        } );

    }

    getTheWeather();