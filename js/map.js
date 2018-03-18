//Map Controller Object
var MapController = {
    
    //Keep track of all the map objects in the gameroom
    'mapList': {},
    
    'scale': 0,                                             //Keep track of the map's scale transform
    
    "map": document.getElementById('map'),
    "mapGrid": document.getElementById('map-grid'),

    
    "mapCellHeight": 21,                                    //TODO: Make user selectable
    "mapCellWidth": 21,                                     //TODO: Make user selectable
    
    
    "backgroundImg": '', 
    
    
    //Utility functions for map controls
    "Controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            console.info(MapController.scale);
            MapController.scale++;
            MapController.map.style.transform = 'scale(1.'+ MapController.scale +')';
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            console.info(MapController.scale);
            MapController.scale--;
            MapController.map.style.transform = 'scale(1.'+ MapController.scale +')';
        }   
    },
    
    //Event handlers for map controls
    "Events": {
        
        "addAll": function() {
            
            //Zoom in event handler
            $('#zoom-in-btn').click(function() {
                MapController.Controls.zoomInMap();
            })
            
            //Zoom out event handler
            $('#zoom-out-btn').click(function() {
                MapController.Controls.zoomOutMap();
            })
        }
        
    },
    
    //Utility functions
    "Util": {
        
        "getMapBackground": function() {
            MapController.backgroundImg = 'url("' + Temp.returnMapBackground() + '")';  //TODO: replace shunt function
        },
        
        "setMapBackground": function() {
            
            MapController.map.style.backgroundImage = MapController.backgroundImg;
            
        },
        
        //Add in the grid tiles
        "buildMapGrid": function() {
            
            var divStringStart = '<div id="cell-';
            var divStringEnd = '" class="map-cell"></div>';
            var divString;
            var counter;
            var cellCount = MapController.mapCellWidth * MapController.mapCellHeight;

            for (i = 0; i < cellCount; i++) {
                
                counter = i.toString();
                divString = divStringStart + counter + divStringEnd;
                
                MapController.map.innerHTML += divString;
        
            }
        
        },
        
        "setMapSize": function() {
            
            var height = (MapController.mapCellHeight * 50).toString() + 'px';
            var width = (MapController.mapCellWidth * 50).toString() + 'px';
            MapController.map.style.height = height;
            MapController.map.style.width = width;
        }
        
        
    },
    
    "Init": function() {
        MapController.Events.addAll();
        MapController.Util.getMapBackground();
        MapController.Util.setMapBackground();
        MapController.Util.buildMapGrid();
        MapController.Util.setMapSize();
    }
}

$(document).ready(function() {
    
    MapController.Init();
    
})