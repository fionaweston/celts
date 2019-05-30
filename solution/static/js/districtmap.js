/* districtmap.js
Contains functionality to display the meters of the selected agency on a map
*/


console.log("-> districtmap.js");


function initializeMap(sourceAgencyDetails){
    /* Creates the map to display the top 100 meters for the agency provided.

    Accepts : sourceAgencyDetails (dictionary) contains metadata for selected agency used to populate chart
                id: (string) unique identifier for the agency the details are for
                year: (int) year for which the agency details are for
                summarydayofweek: (List)
                    day: (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count: (int)
                summaryhour: (List)
                    hour: (string)
                    count: (int)
                meters: (list) List of the top meters, by count, for the agency
                    location: (string)
                    id: (string)
                    count: (int)
                    latitude: (number)
                    longitude: (number)
    
    Returns : undefined
    */

    console.log("--> initializeMap");

    // let mapDiv = d3.select("#map");

    // console.log(mapDiv);
    mapboxgl.accessToken = API_KEY;
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-118.353650, 34.113055], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
    console.log(map);
    // 34.113055, -118.353650

}


function updateMap(sourceAgencyDetails){
    /* Updates the existing map with the new agency.

    Accepts : sourceAgencyDetails (dictionary) contains metadata for selected agency used to populate chart
                id: (string) unique identifier for the agency the details are for
                year: (int) year for which the agency details are for
                summarydayofweek: (List)
                    day: (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count: (int)
                summaryhour: (List)
                    hour: (string)
                    count: (int)
                meters: (list) List of the top meters, by count, for the agency
                    location: (string)
                    id: (string)
                    count: (int)
                    latitude: (number)
                    longitude: (number)

    Returns : undefined 
    */

    console.log("--> updateMap");
}