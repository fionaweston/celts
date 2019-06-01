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