//Set document and location to current window / variable declaration
    var scale = 0,
    map = document.getElementById("map");

//Map Controller Object
var mapController = {
    
    //Keep track of all the map objects in the gameroom
    "mapList": {},
    
    
    //Utility functions for map controls
    "controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            console.info(scale);
            scale++;
            map.style.transform = "scale(1."+ scale +")";
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            console.info(scale);
            scale--;
            map.style.transform = "scale(1."+ scale +")";
        }   
    },
    
    //Event handlers for map controls
    "events": {
        
        "zoomInMap": $("#zoom-in-btn").click(function() {
                mapController.controls.zoomInMap();
            }),
        
        "zoomOutMap": $("#zoom-out-btn").click(function() {
                mapController.controls.zoomOutMap();
            })
    },
    
    "util": {
        
        "addEventListeners": function() {
            
            this.events.zoomInMap();
            this.events.zoomOutMap();
            
        }
    }
}

$(document).ready(function() {
    
    mapController.util.addEventListeners();
    
})