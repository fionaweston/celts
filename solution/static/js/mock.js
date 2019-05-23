/*
Creates mock data that is to be used while the RESTful endpoints are created;
has same names as the endpoints
*/

console.log("--> mock.js");


function getAgencies(){
    /* Returns the mock data of the agencies

    Accepts : nothing

    Returns : (list) array of the agency dictionary of the mock data
                name: (string) display name of agency
                id: (string) unique identifier for agency
                summarycount: (list)
                    count: (int) total number of citations for year
                    year: (int) year that citations are for
    */

    let agencies = [];


    //- Western
    agencies.push(
        {
            "name": "Western",
            "id": 51,
            "summarycount" : [
                { "count": 117093, "year": 2015 },
                { "count": 107351, "year": 2016 },
                { "count": 93159, "year": 2017 },
                { "count": 62462, "year": 2018 }
            ]
        }
    );

    //- Valley
    agencies.push(
        {
            "name": "Valley",
            "id": 53,
            "summarycount" : [
                { "count": 78455, "year": 2015 },
                { "count": 72247, "year": 2016 },
                { "count": 72786, "year": 2017 },
                { "count": 57304, "year": 2018 }
            ]
        }
    );

    //- Hollywood
    agencies.push(
        {
            "name": "Hollywood",
            "id": 54,
            "summarycount" : [
                { "count": 110532, "year": 2015 },
                { "count": 98576, "year": 2016 },
                { "count": 90366, "year": 2017 },
                { "count": 70782, "year": 2018 }
            ]
        }
    );

    //- Southern
    agencies.push(
        {
            "name": "Southern",
            "id": 55,
            "summarycount" : [
                { "count": 7389, "year": 2015 },
                { "count": 6665, "year": 2016 },
                { "count": 7124, "year": 2017 },
                { "count": 6651, "year": 2018 }
            ]
        }
    );

    //- Central
    agencies.push(
        {
            "name": "Central",
            "id": 56,
            "summarycount" : [
                { "count": 124570, "year": 2015 },
                { "count": 117549, "year": 2016 },
                { "count": 109990, "year": 2017 },
                { "count": 94623, "year": 2018 }
            ]
        }
    );


    return agencies;
}

