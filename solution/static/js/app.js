/* 
*/

console.log("--> app.js");


//-- Globals
var _selectedFilter_Year = 2018;    //Current year being filtered

var _selectedFilter_AgencyID = "56";   //Current agency being filtered


function initializeApp(selectedAgencyID, selectedYear){
    /* Gets data from the endpoints based on the variables provided and then updates the visualizations.

    Accepts : selectedAgencyID: (string) unique identifier of the agency to get data for
              selectedYear: (int) year to get data for
    
    Returns : undefined
    */

    console.log("-> initializeApp");


    //- Update Globals
    _selectedFilter_AgencyID = selectedAgencyID;
    _selectedFilter_Year = selectedYear;


    //- Gets the Agency and AgencyDetails with D3; nested together
    d3.json(`getAgencies`).then(function(agencyData) {
        d3.json(`getAgencyDetails/${_selectedFilter_AgencyID}/${_selectedFilter_Year}`).then(function(selectedAgency) {

            console.log("-> inintializeApp: Data from endpoints");


            //- Filter: District
            initializeDistrictFilter(agencyData, _selectedFilter_Year, _selectedFilter_AgencyID);

            //- Filter: Year
            initializeYearFilter(agencyData, _selectedFilter_Year);

            //- Chart: DOW
            initializeDowChart(selectedAgency);

            //- Chart: Time of Day
            initializeTimeDayChart(selectedAgency);

            //- Map
            initializeMap(selectedAgency);

            //- Meter Metadata
            initializeMeterMetadata();
        })
    });
}


function updateSelectedAgency(selectedAgencyID){
    /* User changes the selected agency; gets data from endpoint and updates the charts.

    Accepts: selectedAgencyID (string) unique identifier of the selected agency that is to be used for filter the other data

    Returns : nothing
    */

    console.log("-> updateSelectedAgency");

    //- Check for Change
    if (_selectedFilter_AgencyID == selectedAgencyID){
        console.log(`No updated required; agency ID the same. ${_selectedFilter_AgencyID}`)
        return;
    }


    //- Update Global
    _selectedFilter_AgencyID = selectedAgencyID;


    //- Get Agency Details
    d3.json(`getAgencyDetails/${_selectedFilter_AgencyID}/${_selectedFilter_Year}`).then(function(result) {
        updateAgencyDetails(result);});
}

function updateSelectedYear(selectedYear){
    /* User has changed the year filter; get the data from endpoint and update the charts.

    Accepts : selectedYear (int) selected year used to filter the charts

    Returns : undefined
    */

    console.log("-> updateSelectedYear")


    //- Verify Change in Year
    if (_selectedFilter_Year == selectedYear){
        console.log(`No change required as year not changed. ${_selectedFilter_Year}`);
        return;
    }


    //- Update Global
    _selectedFilter_Year = selectedYear;


    //- Update District Filter
    //  Distrct filter already has metadata for the different years; just needs to updated.
    updateDistrictFilterYear(_selectedFilter_Year);


    //- Get Agency Details
    d3.json(`getAgencyDetails/${_selectedFilter_AgencyID}/${_selectedFilter_Year}`).then(function(result) {
        updateAgencyDetails(result);});

}

function updateAgencyDetails(sourceAgencyDetails){
    /* With the change of the selected agency or year, accepts the updated metadata and passes to the different visualizations

    Accepts : sourceAgencyDetails: (dictionary) metadata on an individual agency for a specific year
                id (string) unique identifier for the agency the details are for
                year (int) year for which the agency details are for
                summarydayofweek (List)
                    day (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count (int)
                summaryhour (List)
                    hour (string)
                    count (int)
                meters (list)
                    location (string)
                    id (string)
                    count (int)
                    latitude (number)
                    longitude (number)
    
    Returns : undefined
    */

    console.log("-> updateAgencyDetails");

    console.log(sourceAgencyDetails);


    //- Update DOW Chart
    updateDowChart(sourceAgencyDetails);

    //- Update Time Chart
    updateTimeDayChart(sourceAgencyDetails);

    //- Update Map
    updateMap(sourceAgencyDetails);

    //- Clear Meter Metadata
    clearMeterMetadata();
}


function makeResponsiveLayout(){
    /*

    Accepts : nothing

    Returns : undefined
    */

    console.log("-> makeResponsiveLayout");


    //TODO: update for responsive design

}


//> --- MOCK
//- Meter Selection
// var _mockMeterIDs = [ "VN685A", "V6125", "WP8203", "BW124"]
// var _mockMeterIndex = 0;


// function mockMeterClick(){
//     /* Calls the endpoint to get information 

//     Accepts : nothing

//     Returns : undefined
//     */

//     console.log("--> mockMeterClick");


//     //- Call Endpoint
//     d3.json(`getMeterDetails/${_mockMeterIDs[_mockMeterIndex]}/${_selectedFilter_Year}`).then(function(meterData) {

//         console.log(meterData);

//         updateMeterMetadata(meterData, `The location ${_mockMeterIDs[_mockMeterIndex]}`, 34);
//     });


//     //- Prepare Next Meter ID
//     _mockMeterIndex += 1;

//     if (_mockMeterIndex > 3){
//         _mockMeterIndex = 0;
//     }
// };

// d3.select("#mockmeter").on("click", mockMeterClick);
//<--- Mock



//- Prepare Responsive Layout
d3.select(window).on("resize",makeResponsiveLayout);


//- Initialize Application
initializeApp("53", 2018);

