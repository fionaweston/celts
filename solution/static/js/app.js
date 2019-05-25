/* 
*/

console.log("--> app.js");



//-- Mock Data
// This is temporary while the RESTful endpoints are created

//- Get Mock Data
let testAgencies = getAgenciesMock();

console.log("Agencies:");
console.log(testAgencies);

let testAgencyDetails = getAgencyDetailsMock("34", 2018);

console.log("AgencyDetails:");
console.log(testAgencyDetails);


//- Initialize Charts
initializeDowChart(testAgencyDetails);

initializeTimeDayChart(testAgencyDetails);

