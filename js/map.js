var Map = {
    
    //Required when the object is called from the server
    "fileName": '',
    
    //Used for directory mapping
    "objType": 'map',
    
    //Keep track of all the map objects in the gameroom
    "mapList": {},
    
    //Used for zoom logic
//    "zoomLevels": ['0.25', '0.50', '0.75', '1.0', '1.25', '1.50', '1.75', '2.0'],
//    "selectedZoomIndex": 3,
//    
//    //Used for pan logic
//    "topTranslate": 0,
//    "leftTranslate": 0,
    
    //Determines total cell count of the map
    "mapCellHeight": 21,                            //TODO: Make user selectable
    "mapCellWidth": 21,                             //TODO: Make user selectable
    
    
    //Path to map background image
    "backgroundImg": '',
    
    "mapDom": ''
    
}

var LocalMapVars = {
    
    //Used for zoom logic
    "zoomLevels": ['0.25', '0.50', '0.75', '1.0', '1.25', '1.50', '1.75', '2.0'],
    "selectedZoomIndex": 3,
    
    //Used for pan logic
    "topTranslate": 0,
    "leftTranslate": 0
    
}

//Map Controller Object
var MapController = {
    
    //Keep track of what map tile the user selects
    "SelectedTile": {
        
        "element": {},
        
        "state": 'idle',
        
        "isEmtpy": true
        
    },
    
    "eventsAdded": false,
    
    //Map DOM elements
    "map": document.getElementById('map'),
    "mapGrid": document.getElementById('map-grid'),
    
    
    //Utility functions for map controls
    "Controls": {
        
        //Zoom in the map
        "zoomInMap": function() {
            
            if(LocalMapVars.selectedZoomIndex < 7) {
                
                LocalMapVars.selectedZoomIndex ++;
                MapController.Util.setMapTransform();
            }     
        },
        
        //Zoom out the map
        "zoomOutMap": function() {
            
            if(LocalMapVars.selectedZoomIndex > 0) {
                
                LocalMapVars.selectedZoomIndex --;            
                MapController.Util.setMapTransform();
                     
            }
        },
        
        //Pan map view to the left
        "panLeft": function() {
            
            LocalMapVars.leftTranslate += 50;
            MapController.Util.setMapTransform();
        
        },
        
        //Pan map view to the right
        "panRight": function() {
            
            LocalMapVars.leftTranslate -= 50;
            MapController.Util.setMapTransform();
                        
        },
        
        //Pan map view up
        "panUp": function() {
            
            LocalMapVars.topTranslate += 50;
            MapController.Util.setMapTransform();
            
        },
        
        //Pan map view down
        "panDown": function() {
            
            LocalMapVars.topTranslate -= 50;      
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
            
            //d4 event handler
            $('#d4').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D4 for... ' + Dice.four.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
             //d6 event handler
            $('#d6').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D6 for... ' + Dice.six.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
            //d8 event handler
            $('#d8').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D8 for... ' + Dice.eight.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
            //d10 event handler
            $('#d10').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D10 for... ' + Dice.ten.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
            //d12 event handler
            $('#d12').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D12 for... ' + Dice.twelve.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
            //d20 event handler
            $('#d20').click(function() {
                
                var returnStr = '<br>' + User.username + ' rolls D20 for... ' + Dice.twenty.roll().toString() + '.';
                Chatbox.chatString += returnStr;
                ChatController.Util.updateChatLog();
                ChatController.Util.bindData();
            })
            
            //Delete Asset handler
            $('#delete-asset-btn').click(function() {
                
                if (MapController.SelectedTile.state == 'selected') {
                    
                    if(!MapController.SelectedTile.isEmtpy) {
                        
                        MapController.SelectedTile.element.innerHTML = '';
                        MapController.SelectedTile.isEmtpy = true;
                        $(MapController.SelectedTile.element).removeClass('selected-tile');
                        MapController.SelectedTile.element = {};

                        MapController.Util.saveMapDom();
                        GameroomController.Map = Map;
                        GameroomController.Util.updateServer();
                    }
                    
                }
                
            })
            
            
            
//            MapController.Events.mapClickEvents();
            
        },
        
        //Click events for the map tiles    
        "mapClickEvents": function() {
            
            for (i=0; i < (Map.mapCellHeight * Map.mapCellWidth); i++) {
                                                                                        
                var id = '#cell-' + i;
                
                $(id).click(function(e) {
                    e.stopPropagation(); // Prevent bubbling to parent, to avoid loop
                    
                    
                    if (!AssetController.assetSelected) { 
                    
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

                                MapController.Util.saveMapDom();
                                GameroomController.Map = Map;
                                GameroomController.Util.updateServer();
                            }

                        }
                    
                    }
                    
                    else {
                        
                        var selectedElement = this;
                        
                        if(!$(selectedElement).has('img').length) {
                            
                            var newAssetString = '<img style="width: 50px; height: 50px;" src="' + AssetController.selectedAsset + '"/>';
                            
                            $(this).append(newAssetString);
                            AssetController.assetSelected = false;
                            AssetController.selectedAsset = '';
                            $('.map-asset').removeClass('selected');
                            
                            MapController.Util.saveMapDom();
                            GameroomController.Map = Map;
                            GameroomController.Util.updateServer();
                
                            
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
            
            var scaleStyleString = 'translate(' + LocalMapVars.leftTranslate.toString() + 'px, ' + LocalMapVars.topTranslate.toString() + 'px)';
            var zoomStyleString = 'scale(' + LocalMapVars.zoomLevels[LocalMapVars.selectedZoomIndex] + ')';
            
            MapController.map.style.transform = scaleStyleString;
            MapController.map.style.transform += zoomStyleString;
            
        },
        
        
        "updateServer": function() {
            IO.write(Map);    
        },
        
        
        "getFromServer": function() {
            IO.read(Map);
        },
        
        "setFileName": function() {
            var mapId = location.href.split('?')[1];;
            Map.fileName = '/' + mapId + '.json';
        },
        
        "saveMapDom": function() {
            Map.mapDom = MapController.map.innerHTML.toString();
        },
        
        "updateMapDom": function() {
            
            
            if (MapController.SelectedTile.isEmtpy != false) {
                if (Map.mapDom != '') {
                    MapController.map.innerHTML = Map.mapDom;
                    MapController.Events.mapClickEvents();
                }
                else {
                    Map.mapDom = MapController.map.innerHTML;
                    Gameroom.map = Map;
                    GameroomController.Util.updateServer();
                    MapController.Events.mapClickEvents();
                }
                
            }
             
            
        }
        
        
        
    },
    
    "Init": function() {
        
        MapController.Util.getMapBackground();
        MapController.Util.setMapBackground();
        
        if (!MapController.eventsAdded) {
            
            MapController.Util.setFileName();
            MapController.Util.buildMapGrid();
            MapController.Util.setMapSize();
            
            
            //Debug code - used for testing map token functionality 
//          $( "#cell-150" ).append( '<img style="width: 50px; height: 50px;" src="assets/images/test-img.png"/>' );
            
            MapController.Util.updateMapDom();
            MapController.Events.addAll();
            MapController.eventsAdded = true;
            Map.mapDom = MapController.map.innerHTML;
            
        }
    }
}

