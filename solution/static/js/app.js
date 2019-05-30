/* 
*/

console.log("--> app.js");


//-- Globals
var _selectedFilter_Year = 2018;    //Current year being filtered

var _selectedFilter_AgencyID = "56";   //Current agency being filtered


//-----------------------------------------------
//-- Mock Data
// This is temporary while the RESTful endpoints are created

//- Get Mock Data
// let testAgencies = getAgenciesMock();

// console.log("Agencies:");
// console.log(testAgencies);

// let testAgencyDetails = getAgencyDetailsMock("54", 2018);

// console.log("AgencyDetails:");
// console.log(testAgencyDetails);


// //- Initialize Charts
// initializeDistrictFilter(testAgencies, 2018, "54");

// initializeDowChart(testAgencyDetails);

// initializeTimeDayChart(testAgencyDetails);

// initializeMap(testAgencyDetails);
//---------------------------------------------------



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


            //- District Filter
            initializeDistrictFilter(agencyData, _selectedFilter_Year, _selectedFilter_AgencyID);

            //- Chart: DOW
            initializeDowChart(selectedAgency);

            //- Chart: Time of Day
            initializeTimeDayChart(selectedAgency);

                //- Map
                initializeMap(selectedAgency);
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


    //---> MOCK
    // let mockAgencyDetails = getAgencyDetailsMock(_selectedFilter_AgencyID, _selectedFilter_Year);

    // updateAgencyDetails(mockAgencyDetails);
    //---< End of Mock
}

function updateSelectedYear(selectedYear){
    /*

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


    //---> MOCK
    // let mockAgencyDetails = getAgencyDetailsMock(_selectedFilter_AgencyID, _selectedFilter_Year);

    // updateAgencyDetails(mockAgencyDetails);
    //---< End of Mock

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
}

function makeResponsiveLayout(){
    /*

    Accepts : nothing

    Returns : undefined
    */

    console.log("-> makeResponsiveLayout");


    //TODO: update for responsive design

}


//- Prepare Responsive Layout
d3.select(window).on("resize",makeResponsiveLayout);


//- Initialize Application
initializeApp("53", 2015);

