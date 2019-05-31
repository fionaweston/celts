/* metermetadata.js

Contains functionality to display the metadata for the selected meter
*/

console.log("--> metermetadata.js");


//- Constants
const METADATA_DivName = "#mapMetadata"; //name of div to host the SVG

const METADATA_SvgHeight = 500; //Height of the SVG; should match map

const METADATA_TopMargin = 5;//Margin at the top of the SVG

const METADATA_SideMargin = 5;//margin on the side of SVG

const METADATA_TableMeterID = "#meterMetadataTableID"; //ID of the td that displays meter ID

const METADATA_TableLocation = "#meterMetadataTableLocation"; //ID of the td that displays location

const METADATA_TableCitations = "#meterMetadataTableCitation"; //ID of the td that displays citation count




function initializeMeterMetadata(){
    /* Prepares the meter metadata for the first use; there will not be a selected meter
    so just setting the axis of the chart and labels.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> initializeMeterMetadata");


    //- Remove Existing SVG
    removeExistingSvg(METADATA_DivName);


    //- Get Size of SVG
    let svgWidth = getDivWidth(METADATA_DivName);


    //- Create SVG Container
    let svgContainer = d3.select(METADATA_DivName)
                            .append("svg")
                            .attr("height", METADATA_SvgHeight)
                            .attr("width", svgWidth);
    
    
    
    

}


function clearMeterMetadata(){
    /* Clears the meter metadata when there is no selected meter; such as when changing the 
    filter agency or year.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> clearMetaMetadata");


    //- Update Metadata
    d3.select(METADATA_TableMeterID).text("");

    d3.select(METADATA_TableLocation).text("");

    d3.select(METADATA_TableCitations).text("");
}


function updateMeterMetadata(sourceMeterDetails, meterLocation, citationCount){
    /*

    Accepts : sourceMeterDetails: (dictionary) contains details on selected meter
                id: (string) unique identifier of meter
                year: (int) year for which the data is for
                summarymake: (list) list of dictionaries on the top vehicle makes found
                    vehichemake: (string) name of the vehicle
                    count: (int) number of vehicles found
             meterLocation: (string) address of the meter  
             citationCount: (int) number of citations      
    */  

    console.log("--> updateMeterMetadata");


    //- Update Metadata
    d3.select(METADATA_TableMeterID).text(sourceMeterDetails.id);

    d3.select(METADATA_TableLocation).text(meterLocation);

    d3.select(METADATA_TableCitations).text(citationCount.toLocaleString());

}