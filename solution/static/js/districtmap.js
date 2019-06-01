/* districtmap.js
Contains functionality to display the meters of the selected agency on a map
*/


console.log("-> districtmap.js");
function chooseColor(district) {
    var color="red";
    if (district=="Valley") { color="green"; 
      
    } else {if (district=="Southern") {color="blue";
      
    } else {if (district=="Western") {color="yellow";
      
    } else {if (district=="Hollywood") {color="purple";
      
    } else color="red";}}}
    return color;
  
    }


function initializeMap(sourceAgencyDetails){
    
    // console.log(mapDiv);
    mapboxgl.accessToken = API_KEY;
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-118.3319447,34.0098852], // starting position [lng, lat]
    // los angeles: 34.0398852,-118.3319447
    zoom: 8.7 // starting zoom
    });
    
    
    
    sourceAgencyDetails.meters.forEach(meter=>{
        var marker = new mapboxgl.Marker({
        
        })
        .setLngLat([meter.longitude,meter.latitude]).addTo(map);    
    
    
    })

    map.on('load', function () {
        d3.json("static/data/boundaries.geojson").then(gj=>gj.features.forEach(district=>{
            
            map.addLayer({
                'id': district.properties.District,
                'type': 'fill',
                'source': {
                'type': 'geojson',
                'data': district
                },
                'layout': {},
                'paint': {
                'fill-color': chooseColor(district.properties.District),
                'fill-opacity': 0.5
                }
                });
                

        }));
    });
    
}
 
        
    

function updateMap(sourceAgencyDetails){
    
    // console.log(mapDiv);
    mapboxgl.accessToken = API_KEY;
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-118.3319447,34.0098852], // starting position [lng, lat]
    // 34.067237,-118.3167928
    // -118.353650, 34.113055
    zoom: 8.7 // starting zoom
    });
    console.log("checking map api object")
    
    
    sourceAgencyDetails.meters.forEach(meter=>{
        var marker = new mapboxgl.Marker({
        
        })
        .setLngLat([meter.longitude,meter.latitude]).addTo(map);
    
    
    
    })

    map.on('load', function () {
        d3.json("static/data/boundaries.geojson").then(gj=>gj.features.forEach(district=>{
            
            map.addLayer({
                'id': district.properties.District,
                'type': 'fill',
                'source': {
                'type': 'geojson',
                'data': district
                },
                'layout': {},
                'paint': {
                'fill-color': chooseColor(district.properties.District),
                'fill-opacity': 0.5
                }
                });
                

        }));
    });
}

