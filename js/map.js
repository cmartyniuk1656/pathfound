//Map Controller Object
var MapController = {
    
    //Keep track of all the map objects in the gameroom
    "mapList": {},
    
    "scale": 0,                                         //Used for zooming the map
    "map": document.getElementById("map"),              //The map element in the DOM
    
    
    //Utility functions for map controls
    "Controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            console.info(MapController.scale);
            MapController.scale++;
            MapController.map.style.transform = "scale(1."+ MapController.scale +")";
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            console.info(MapController.scale);
            MapController.scale--;
            MapController.map.style.transform = "scale(1."+ MapController.scale +")";
        }   
    },
    
    //Event handlers for map controls
    "Events": {
        
        "addAll": function() {
            
            //Zoom in event handler
            $("#zoom-in-btn").click(function() {
                MapController.Controls.zoomInMap();
            })
            
            //Zoom out event handler
            $("#zoom-out-btn").click(function() {
                MapController.Controls.zoomOutMap();
            })
        }
        
    },
    
    "Util": {
        
    }
}

$(document).ready(function() {
    
    MapController.Events.addAll();
})