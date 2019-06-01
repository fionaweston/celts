/* yearfilter.js
Contains functionality for the year filter
*/


console.log("--> yearfilter.js");


//- Constants
const YEARFILTER_DivName = "#yearfilter";   //name of the div that is to contain the SVG 

const YEARFILTER_BoxHeight = 30; // height of the year filter boxes

const YEARFILTER_TopMargin = 28;// Margin at the top of the SVG

const YEARFILTER_SideMargin = 5; // Margin for left and right

const YEARFILTER_BoxMargin = 10; // Margin betwen boxes

const YEARFILTER_SelectedClass = "yearFilterRectangleSelected"; // name of the CSS class for selected rectangle

const YEARFILTER_UnselectedClass = "yearFilterRectangle"; //name of the CSS class for standard rectangle

const YEARFILTER_MouseOverClass = "yearFilterRectangleMouseOver" //name of CSS class for mouse over rectangle



function initializeYearFilter(sourceAgencies, selectedYear){
    /*

    Accepts : sourceAgencies (list) list of the dictionary of agencies
                name: (string) display name of agency
                id: (string) unique identifier of agency
                summarycount: (list) 
                    count: (int) number of records for the year
                    year: (int) year which the count is for
              selectedYear: (int) year that is to be displayed

    Returns : undefined
    */

    console.log("--> initializeYearFilter");


    //- Remove Existing SVG
    removeExistingSvg(YEARFILTER_DivName);


    //- Get Width & Height of SVG
    let svgWidth = getDivWidth(YEARFILTER_DivName);

    let svgHeight = ((YEARFILTER_BoxHeight * 4) + (YEARFILTER_TopMargin * 2) + (YEARFILTER_BoxMargin * 3));


    //- Create SVG Container
    let svgContainer = d3.select(YEARFILTER_DivName).append('svg')
                            .attr("height", svgHeight)
                            .attr("width", svgWidth);
    

    //- Determine Width of Box
    let filterBoxWidth = (svgWidth - (YEARFILTER_SideMargin * 2));


    //- Get Year Data
    let yearData = prepareYearData();


    //- Create Rectangles
    let yearRect = svgContainer.selectAll("rect")
                        .data(yearData)
                        .enter()
                        .append("rect")
                        .attr("x", item => item["x"])
                        .attr("y", item => item["y"])
                        .attr("width", filterBoxWidth)
                        .attr("height", YEARFILTER_BoxHeight)
                        .attr("class", item => {
                            if (item["year"] == selectedYear){
                                return YEARFILTER_SelectedClass;
                            }
                            else
                            {
                                return YEARFILTER_UnselectedClass;
                            }
                        })
                        .attr("year", item => item["year"])
                        .on("click", yearFilterClick)
                        .on("mouseover", yearFilterMouseOver)
                        .on("mouseout", yearFilterMouseOut);


    //- Label Text
    let svgLabels = svgContainer.selectAll("text")
                        .data(yearData)
                        .enter()
                        .append("text")
                        .attr("x", item => (item["x"] + (filterBoxWidth / 2)))
                        .attr("y", item => (item["y"] + (YEARFILTER_BoxHeight / 2) + 6 ))
                        .attr("class", "yearFilterLabelText")
                        .attr("text-anchor", "middle")
                        .text(item => item["year"]);


}

function prepareYearData(){
    /* Returns list of the years that are used to build the rectangles

    Accepts : nothing

    Returns : yearData (array) contains the data dictionary items for constructing the rectangles
                x: (number) x location to start rectangle
                y: (number) y location to start rectangle
                year: (number) year to display
    */

    console.log("--> prepareYearData");

    let years = [2015, 2016, 2017, 2018];
    let yearData = [];

    for(counter = 0; counter < years.length; counter++){

        yearData.push({
            "year": years[counter],
            "x": YEARFILTER_SideMargin,
            "y": (YEARFILTER_TopMargin + (YEARFILTER_BoxHeight * counter) + (YEARFILTER_BoxMargin * counter))
        });
    }

    console.log(yearData);

    return yearData;
}


function yearFilterClick(){
    /* User clicks the year filter; update styling to show that it is selected, update the styling of the result 
    of the filter rectangles and apply filter to rest of visualizations.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> yearFilterClick");


    //- Unselect all years
    d3.select(YEARFILTER_DivName).selectAll("rect")
        .attr("class", YEARFILTER_UnselectedClass);


    //- Update Selected 
    d3.select(this)
        .attr("class", YEARFILTER_SelectedClass);


    //- Update Charts
    updateSelectedYear(d3.select(this).attr("year"));
}

function yearFilterMouseOver(){
    /* When user moves mouse over the year rectangle; set the CSS style to provide some feedback

    Aceepts : nothing

    Returns : undefined
    */

    if (d3.select(this).attr("class") != YEARFILTER_SelectedClass){
        d3.select(this).attr("class", YEARFILTER_MouseOverClass);
    }
}

function yearFilterMouseOut(){
    /* When user moves out of the year rectangle; sets the CSS style

    Accepts : nothing

    Returns : undefined
    */

   if (d3.select(this).attr("class") != YEARFILTER_SelectedClass){
    d3.select(this).attr("class", YEARFILTER_UnselectedClass);
    }
}

