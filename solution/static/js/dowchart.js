/*
Contains functionality to power the Day Of Week bar chart
*/


console.log("--> dowchart.js");



function initializeDowChart(sourceAgencyDetails){
    /* Creates the day of week chart.

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

    console.log("--> initializeDowChart");

    let chartDiv = d3.select("#dowChart");

    console.log(chartDiv);

}


function updateDowChart(sourceAgencyDetails){
    /* Updates the existing day of week chart with a new agency.

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

    console.log("--> updateDowChart");
}


