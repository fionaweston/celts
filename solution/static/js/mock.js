/*
Creates mock data that is to be used while the RESTful endpoints are created;
has same names as the endpoints
*/

console.log("--> mock.js");


function getAgenciesMock(){
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
            "id": "51",
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
            "id": "53",
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
            "id": "54",
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
            "id": "55",
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
            "id": "56",
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


function getAgencyDetailsMock(agencyID, filterYear){
    /* Returns the details for the agency provided

    Accepts : agencyID: (string) unique identifier for the agency
              filterYear: (int) year in which to get the details for

    Returns : (dictionary) details on the agency
                id: (string) unique identifier for the agency the details are for
                year: (int) year for which the agency details are for
                summarydayofweek: (List)
                    day: (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count: (int)
                summaryhour: (List)
                    hour: (string)
                    count: (int)
                meters: (list) List of the top meters, by count, for the agency
                    location: (string)
                    id: (string)
                    count: (int)
                    latitude: (number)
                    longitude: (number)
    */

    return {
        "id": agencyID,
        "year": filterYear,
        "summarydayofweek": [
            { "day": 0, "count": 18902},
            { "day": 1, "count": 21001},
            { "day": 2, "count": 19498},
            { "day": 3, "count": 19912},
            { "day": 4, "count": 22785},
            { "day": 5, "count": 2223},
            { "day": 6, "count": 10350}
        ],
        "summaryhour": [
            { "hour": 0, "count": 0},
            { "hour": 1, "count": 0},
            { "hour": 2, "count": 0},
            { "hour": 3, "count": 0},
            { "hour": 4, "count": 0},
            { "hour": 5, "count": 0},
            { "hour": 6, "count": 0},
            { "hour": 7, "count": 0},
            { "hour": 8, "count": 3925},
            { "hour": 9, "count": 4663},
            { "hour": 10, "count": 7875},
            { "hour": 11, "count": 14631},
            { "hour": 12, "count": 13831},
            { "hour": 13, "count": 12644},
            { "hour": 14, "count": 11259},
            { "hour": 15, "count": 7858},
            { "hour": 16, "count": 11146},
            { "hour": 17, "count": 11286},
            { "hour": 18, "count": 6641},
            { "hour": 19, "count": 8689},
            { "hour": 20, "count": 1112},
            { "hour": 21, "count": 701},
            { "hour": 22, "count": 512},
            { "hour": 23, "count": 329},
        ],
        "meters": [
            {"location": "1608 PACIFIC AVE S",
            "id": "123ID",
            "count": 50,
            "latitude": 6418525.8,
            "longitude": 1818220.6
            }
        ]
    };
}
