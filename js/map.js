//Map Controller Object
var MapController = {
    
    //Keep track of all the map objects in the gameroom
    "mapList": {},
    
    //Used for zoom logic
    "zoomLevels": ['0.25', '0.50', '0.75', '1.0', '1.25', '1.50', '1.75', '2.0'],
    "selectedZoomIndex": 3,
    
    //Used for pan logic
    "leftMargin": 0,
    "rightMargin": 0,
    "topTranslate": 0,
    "leftTranslate": 0,
    
    "map": document.getElementById('map'),
    "mapGrid": document.getElementById('map-grid'),

    
    "mapCellHeight": 21,                            //TODO: Make user selectable
    "mapCellWidth": 21,                             //TODO: Make user selectable
    
    
    "backgroundImg": '', 
    
    
    //Utility functions for map controls
    "Controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            
            if(MapController.selectedZoomIndex < 7) {
                
                MapController.selectedZoomIndex ++;
                MapController.map.style.transform = 'scale(' + MapController.zoomLevels[MapController.selectedZoomIndex] + ')';
            }     
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            
            if(MapController.selectedZoomIndex > 0) {
                
                MapController.selectedZoomIndex --;
                MapController.map.style.transform = 'scale(' + MapController.zoomLevels[MapController.selectedZoomIndex] + ')';
            }
        },
        
        "panLeft": function() {
            
            var styleString;
            
            MapController.leftTranslate += 50;
            styleString = 'translate(' + MapController.leftTranslate.toString() + 'px, ' + MapController.topTranslate.toString() + 'px)';
            MapController.map.style.transform = styleString;
        
        },
        
        "panRight": function() {
            
            var styleString;
            
            MapController.leftTranslate -= 50;
            styleString = 'translate(' + MapController.leftTranslate.toString() + 'px, ' + MapController.topTranslate.toString() + 'px)';
            MapController.map.style.transform = styleString;
                        
        },
        
        "panUp": function() {
            
            var styleString;
            
            MapController.topTranslate += 50;
            styleString = 'translate(' + MapController.leftTranslate.toString() + 'px, ' + MapController.topTranslate.toString() + 'px)';
            MapController.map.style.transform = styleString;
            
        },
        
        "panDown": function() {
            
            var styleString;
            
            MapController.topTranslate -= 50;      
            styleString = 'translate(' + MapController.leftTranslate.toString() + 'px, ' + MapController.topTranslate.toString() + 'px)';           
            MapController.map.style.transform = styleString;
            
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
            
            //Pan left event handler
            $('#pan-left-btn').click(function() {
                MapController.Controls.panLeft();
            })
            
            //Pan Right event handler
            $('#pan-right-btn').click(function() {
                MapController.Controls.panRight();
            })
            
            //Pan up event handler
            $('#pan-up-btn').click(function() {
                MapController.Controls.panUp();
            })
            
             //Pan up event handler
            $('#pan-down-btn').click(function() {
                MapController.Controls.panDown();
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
                
                MapController.mapGrid.innerHTML += divString;
        
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