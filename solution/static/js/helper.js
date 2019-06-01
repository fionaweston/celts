/* helper.js
Contains common functionality used by the different visualizations
*/

console.log("--> help.js");



function getDivWidth(divName){
    /* Returns the width, in pixels, of the div.

    Accepts : divName (string) name of the div, example "#yearfilter"

    returns : (int) current width of the div; in pixels
    */

   return parseInt(d3.select(divName).style('width').slice(0, -2));
}


function removeExistingSvg(divName){
    /* Removes the SVG, when found, from the div. Used with the recreating the 
    visualization when the user resizes the browser.

    Accepts : divName (string) name of the div; example "#yearflter"

    Returns : undefined
    */

    console.log("--> removeExistingSvg");

   let svgArea = d3.select(divName).select("svg");

   if (!svgArea.empty()){
       console.log("Found SVG, removing");
       svgArea.remove();
   }
}

function getDistrictColor(districtID){
    /* Returns the color to use for the district based on the ID

    Accepts : districtID (string) unique identifier for the district
                    53 - Valley
                    51 - Western
                    54 - Hollywood
                    55 - Southern
                    56 - Central
    Returns : (string) color
    */

    console.log("--> getDistrictColor");

    if (districtID == "53"){
        return "green";
    }
    else if (districtID == "51"){
        return "yellow";
    }
    else if (districtID == "54"){
        return "purple";
    }
    else if (districtID == "55"){
        return "blue";
    }
    else if (districtID == "56"){
        return "red";
    }
    else{
        return "pink";
    }
}