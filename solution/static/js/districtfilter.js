/* districtfilter.js
Contains functionality to create the custom D3 control that displays the districts and 
years.
*/

console.log("--> districtfilter.js");


//- Constants
const DISTRICTFILTER_DIVNAME = "#districtFilter";  // name of the div that SVG is to placed

const DISTRICTFILTER_BoxHeight = 60;   //height of the district boxes

const DISTRICTFILTER_TopMargin = 5; // Margin at the top of the SVG

//- Globals



function initializeDistrictFilter(sourceAgencies, selectedYear){
    /*

    Accepts : sourceAgencies (list) all of the dictionary items with agency information
                name: (string) display name of agency
                id: (string) unique identifier of agency
                summarycount: (list) 
                    count: (int) number of records for the year
                    year: (int) year which the count is for
              selectedYear: (int) year that is to be displayed

    Returns : undefined
    */




/*

create a new object that is to be data bound to control
1 has the location
able to create the .enter to dynamic create
use the function part to set the XY of locations
use selected year to know which one to use


*/


   console.log("--> initializeDistrictFilter");


   //-- Remove Existing SVG
   //- Get SVG Area
   let svgArea = d3.select(DISTRICTFILTER_DIVNAME).select('svg');

    //- Remove Existing
    if (!svgArea.empty()){
        svgArea.remove();
    }

    
    //- Get Width
    let svgWidth = getDistrictFilterDivWidth();

     

    //-- Create SVG Container
    let svgContainer = d3.select(DISTRICTFILTER_DIVNAME).append('svg')
        .attr("height", 300)
        .attr("width", svgWidth);


    //-
    let filterBoxWidth = (svgWidth * 0.4);

    //- Prepare Data
    let filterData = prepareDistrictData(sourceAgencies, svgWidth, filterBoxWidth);


    //- Create Rectangles
    //  CSS used to set stroke and fill; with the "districtfilter" class
    let districtRect = svgContainer.selectAll("rect")
                            .data(filterData)
                            .enter()
                            .append("rect")
                            .attr("x", item => item["x"])
                            .attr("y", item => item["y"])
                            .attr("width", filterBoxWidth)
                            .attr("height", DISTRICTFILTER_BoxHeight)
                            .attr("class", "districtFilterRectangle")
                            .on("click", districtFilterClick)
                            .on("mouseover", districtFilterMouseOver)
                            .on("mouseout", districtFilterMouseOut);

    //- Create Label Text
    let svgLabelGroup = svgContainer.append("g");

    let districtText = svgLabelGroup.selectAll("Text")
                            .data(filterData)
                            .enter()
                            .append("text")
                            .attr("x", item => (item["x"] + (filterBoxWidth / 2) ))
                            .attr("y", item => (item["y"] + (DISTRICTFILTER_BoxHeight /2) - 6 ))
                            .attr("class", "districtFilterLabelText")
                            .attr("text-anchor", "middle")
                            .attr("fill", "black")
                            .text(item => item["agency"]["name"])
                            .on("click", districtFilterClick);

    
    //- Create Count Text
    let svgCountLabelGroup = svgContainer.append("g");

    let countText = svgCountLabelGroup.selectAll("Text")
                            .data(filterData)
                            .enter()
                            .append("text")
                            .attr("x", item => (item["x"] + (filterBoxWidth / 2) ))
                            .attr("y", item => (item["y"] + (DISTRICTFILTER_BoxHeight /2) + 19 ))
                            .attr("text-anchor", "middle")
                            .attr("fill", "black")
                            .attr("class", "districtFilterCountText")
                            .text(item => getDistrictCountForYear(item, selectedYear))
                            .on("click", districtFilterClick);



}

function getDistrictCountForYear(sourceAgency, selectedYear){
    /* Returns the count of citations for any agency based on the year provided.

        Accepts : sourceAgency (dictionary) contains metadata for the agency
                    name: (string) display name of agency
                    id: (string) unique identifier of agency
                    summarycount: (list) 
                        count: (int) number of records for the year
                        year: (int) year which the count is for
                  selectedYear: (int) get for which to get the count for

        Returns : (string) number of citations for that year; formated with commas
    */
    return sourceAgency["agency"]["summarycount"].filter(d => {return d["year"] == selectedYear;})[0]["count"].toLocaleString();
}

function prepareDistrictData(sourceAgencies, svgWidth, filterRectWidth){
    /* Returns a list of the district data that can be used to data bound to the SVG control.

    Accepts : sourceAgencies (list) all of the dictionary items with agency information
                name: (string) display name of agency
                id: (string) unique identifier of agency
                summarycount: (list) 
                    count: (int) number of records for the year
                    year: (int) year which the count is for
              selectedYear: (int) year that is to be displayed
            svgWidth: (int) current width of the SVG control    
            filterRectWidth: (int) width of the rectangle

    Returns : agencyControlData (list) contains the information to build the control
                agency: (dictionary) source agency information from endpoint
                x: (number) x location to start the rectangle
                y: (number) y location to start rectangel
    */

    console.log("-> prepareDistrictData");

    agencyControlData = [];

    //- Valley
    agencyControlData.push({
        "x": (svgWidth * 0.3),
        "y": DISTRICTFILTER_TopMargin,
        "agency": sourceAgencies.filter(item => {return item["id"] == '53';})[0]
    });

    //- Western
    agencyControlData.push({
        "x": (svgWidth * 0.1),
        "y": (DISTRICTFILTER_BoxHeight + DISTRICTFILTER_TopMargin),
        "agency": sourceAgencies.filter(item => {return item["id"] == '51';})[0]
    });

    //- Hollywood
    agencyControlData.push({
        "x": ((svgWidth * 0.1) + filterRectWidth),
        "y": (DISTRICTFILTER_BoxHeight + DISTRICTFILTER_TopMargin),
        "agency": sourceAgencies.filter(item => {return item["id"] == '54';})[0]
    });

    //- Southern
    agencyControlData.push({
        "x": (svgWidth * 0.1),
        "y": ((DISTRICTFILTER_BoxHeight * 2) + DISTRICTFILTER_TopMargin),
        "agency": sourceAgencies.filter(item => {return item["id"] == '55';})[0]
    });

    //- Central
    agencyControlData.push({
        "x": ((svgWidth * 0.1) + filterRectWidth),
        "y": ((DISTRICTFILTER_BoxHeight * 2) + DISTRICTFILTER_TopMargin),
        "agency": sourceAgencies.filter(item => {return item["id"] == '56';})[0]
    });

    return agencyControlData;
}



function districtFilterClick(){

    console.log("-> districtFilterClick");

    this
}


function districtFilterMouseOver(){
    d3.select(this).attr("class", "districtFilterRectangleMouseOver");
}

function districtFilterMouseOut(){
    d3.select(this).attr("class", "districtFilterRectangle");
}


function getDistrictFilterDivWidth(){
    /* Returns the width, in pixels, of the div that contains the SVG of the control. This div
    that is column within a Bootstrap grid, resizes bases on the size of the browser.
    Accepts : nothing
    returns : (int) current width of the div; in pixels
    */

   return parseInt(d3.select(DISTRICTFILTER_DIVNAME).style('width').slice(0, -2));
}