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

    console.log("--source agency details");
    console.log(sourceAgencyDetails);
    
    // console.log(mapDiv);
    
    mapboxgl.accessToken = API_KEY;
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-118.3319447,34.0098852], // starting position [lng, lat]
    // los angeles: 34.0398852,-118.3319447
    zoom: 8.7 // starting zoom
    });
    
    
    var meter_array=[];


    sourceAgencyDetails.meters.forEach(meter=>{
        var meter_obj={"type":"Feature",
        "geometry":{"type":"Point","coordinates":[meter.longitude,meter.latitude]},
        "properties":{"id":meter.id}};
        meter_array.push(meter_obj);
        
        
    })
    

    
        meter_array.forEach(function(marker) {
            // create a DOM element for the marker
            
            var el = document.createElement('div');
            el.className = 'marker';
            el.id=marker.properties.id;
            el.style.backgroundImage = 'url(static/data/marker.png)';
            el.style.width = '64px';
            el.style.height = '64px';
            
            el.addEventListener('click', function(e) {
                
            //- Call Endpoint
                d3.json(`getMeterDetails/${e.path[0].id}/${_selectedFilter_Year}`).then(function(meterData) {
                    
                    var summarycount=0;
                    meterData.summarymake.forEach(make=>{summarycount+=make.count;})
                    updateMeterMetadata(meterData, `The location ${e.path[0].id}`, summarycount);
                });
            });
             
            // add marker to map
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
            });

    
    
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
    
    
    var meter_array=[];


    sourceAgencyDetails.meters.forEach(meter=>{
        var meter_obj={"type":"Feature",
        "geometry":{"type":"Point","coordinates":[meter.longitude,meter.latitude]},
        "properties":{"id":meter.id}};
        meter_array.push(meter_obj);
        
        
    })
    

    
        meter_array.forEach(function(marker) {
            // create a DOM element for the marker
            
            var el = document.createElement('div');
            el.className = 'marker';
            el.id=marker.properties.id;
            el.style.backgroundImage = 'url(static/data/marker.png)';
            el.style.width = '64px';
            el.style.height = '64px';
            
            el.addEventListener('click', function(e) {
                
            //- Call Endpoint
                d3.json(`getMeterDetails/${e.path[0].id}/${_selectedFilter_Year}`).then(function(meterData) {
                    
                    var summarycount=0;
                    meterData.summarymake.forEach(make=>{summarycount+=make.count;})
                    updateMeterMetadata(meterData, `The location ${e.path[0].id}`, summarycount);
                });
            });
             
            // add marker to map
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
            });


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

