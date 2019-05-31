/* metermetadata.js

Contains functionality to display the metadata for the selected meter
*/

console.log("--> metermetadata.js");



function initializeMeterMetadata(){
    /* Prepares the meter metadata for the first use; there will not be a selected meter
    so just setting the axis of the chart and labels.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> initializeMeterMetadata");
}


function clearMeterMetadata(){
    /* Clears the meter metadata when there is no selected meter; such as when changing the 
    filter agency or year.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> clearMetaMetadata");



}


function updateMeterMetadata(sourceMeterDetails, meterLocation){
    /*

    Accepts : sourceMeterDetails: (dictionary) contains details on selected meter
                id: (string) unique identifier of meter
                year: (int) year for which the data is for
                summarymake: (list) list of dictionaries on the top vehicle makes found
                    vehichemake: (string) name of the vehicle
                    count: (int) number of vehicles found
             meterLocation: (string) address of the meter        
    */  

    console.log("--> updateMeterMetadata");

}