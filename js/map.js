var Map = {
    
    //Required when the object is called from the server
    "fileName": '/testMap.json',
    
    //Used for directory mapping
    "objType": 'map',
    
    //Keep track of all the map objects in the gameroom
    "mapList": {},
    
    //Used for zoom logic
    "zoomLevels": ['0.25', '0.50', '0.75', '1.0', '1.25', '1.50', '1.75', '2.0'],
    "selectedZoomIndex": 3,
    
    //Used for pan logic
    "topTranslate": 0,
    "leftTranslate": 0,
    
    //Determines total cell count of the map
    "mapCellHeight": 21,                            //TODO: Make user selectable
    "mapCellWidth": 21,                             //TODO: Make user selectable
    
    
    //Path to map background image
    "backgroundImg": ''
    
}

//Map Controller Object
var MapController = {
    
    //Keep track of what map tile the user selects
    "SelectedTile": {
        
        "element": {},
        
        "state": 'idle',
        
        "isEmtpy": true
        
    },
    
    //Map DOM elements
    "map": document.getElementById('map'),
    "mapGrid": document.getElementById('map-grid'),
    
    
    //Utility functions for map controls
    "Controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            
            if(Map.selectedZoomIndex < 7) {
                
                Map.selectedZoomIndex ++;
                MapController.Util.setMapTransform();
            }     
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            
            if(Map.selectedZoomIndex > 0) {
                
                Map.selectedZoomIndex --;            
                MapController.Util.setMapTransform();
                     
            }
        },
        
        //Pan map view to the left
        "panLeft": function() {
            
            Map.leftTranslate += 50;
            MapController.Util.setMapTransform();
        
        },
        
        //Pan map view to the right
        "panRight": function() {
            
            Map.leftTranslate -= 50;
            MapController.Util.setMapTransform();
                        
        },
        
        //Pan map view up
        "panUp": function() {
            
            Map.topTranslate += 50;
            MapController.Util.setMapTransform();
            
        },
        
        //Pan map view down
        "panDown": function() {
            
            Map.topTranslate -= 50;      
            MapController.Util.setMapTransform();
            
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
            
            MapController.Events.mapClickEvents();
            
        },
        
        //Click events for the map tiles    
        "mapClickEvents": function() {
            
            for (i=0; i < (Map.mapCellHeight * Map.mapCellWidth); i++) {
                
                var id = '#cell-' + i;
                
                $(id).click(function(e) {
                    e.stopPropagation(); // Prevent bubbling to parent, to avoid loop
                    
                    //Check state of map tile selection
                    if (MapController.SelectedTile.state == 'idle') {
                        
                        MapController.SelectedTile.state = 'selected';
                        MapController.SelectedTile.element = this;
                        $(this).addClass('selected-tile');
                        
                        //Check if image exists in the selected cell
                        if($(MapController.SelectedTile.element).has('img').length) {
                            MapController.SelectedTile.isEmtpy = false;
                        }
                        else {
                            MapController.SelectedTile.isEmtpy = true;
                        }
                        
                    }
                    
                    //Check state of map tile selection
                    else if (MapController.SelectedTile.state == 'selected') {
                        
                        MapController.SelectedTile.state = 'idle';
                        
                        //Check if image exists in the selected cell
                        if(MapController.SelectedTile.isEmtpy) {
                            
                            
                            $(MapController.SelectedTile.element).removeClass('selected-tile');
                            
                            MapController.SelectedTile.element = this;                
                            $(this).addClass('selected-tile');
                            
                            MapController.SelectedTile.state = 'selected';
                            
                            if($(MapController.SelectedTile.element).has('img').length) {
                                MapController.SelectedTile.isEmtpy = false;
                            }
                            
                            else {
                                MapController.SelectedTile.isEmtpy = true;
                            }
                        }
                        
                        else {
                            
                            MapController.SelectedTile.isEmtpy = true;
                            $(MapController.SelectedTile.element).removeClass('selected-tile');
                            var imageSwap = $(MapController.SelectedTile.element).find('img')[0];
                        
                            $(this).append(imageSwap);
                        
                            
                            MapController.SelectedTile.element = {};
                        }
                        
                    }
                    
                });
            }
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
            var cellCount = Map.mapCellWidth * Map.mapCellHeight;

            for (i = 0; i < cellCount; i++) {
                
                counter = i.toString();
                divString = divStringStart + counter + divStringEnd;
                
                MapController.map.innerHTML += divString;
        
            }
        
        },
        
        "setMapSize": function() {
            
            var height = (Map.mapCellHeight * 50).toString() + 'px';
            var width = (Map.mapCellWidth * 50).toString() + 'px';
            MapController.map.style.height = height;
            MapController.map.style.width = width;
        },
        
        "setMapTransform": function() {
            
            var scaleStyleString = 'translate(' + Map.leftTranslate.toString() + 'px, ' + Map.topTranslate.toString() + 'px)';
            var zoomStyleString = 'scale(' + Map.zoomLevels[Map.selectedZoomIndex] + ')';
            
            MapController.map.style.transform = scaleStyleString;
            MapController.map.style.transform += zoomStyleString;
            
        },
        
        
        "updateServer": function() {
            IO.write(Map);    
        },
        
        
        "getFromServer": function() {
            IO.read(Map);
        }
        
        
        
    },
    
    "Init": function() {
        MapController.Util.getMapBackground();
        MapController.Util.setMapBackground();
        MapController.Util.buildMapGrid();
        MapController.Util.setMapSize();
        MapController.Events.addAll();
    }
}

//$(document).ready(function() {
//    
//    MapController.Init();
//    
//    //Debug code - used for testing map token functionality 
//    $( "#cell-150" ).append( '<img style="width: 50px; height: 50px;" src="assets/images/test-img.png"/>' );
//    
//})

