var Gameroom = {
    
    "roomId": '',
    
    //Required when the object is called from the server
    "fileName": '',
    
    //Used for directory mapping
    "objType": 'gameroom',
    
    
    //Players allowed to join the game
    "players": [],
    
    
    //Maps controller used in the room
    "Map": {},
    
    //The room chatlog
    "Chatbox": {},
    
}

var Charlist = {};
var CharArray = [];
var RoomCharList = {};
var RoomCharArray = [];
var MapImagePaths = [];

var GameroomController = {
    
    "updating": false,
    
    "CharCount": 0,
    "RoomCharCount": 0,
    
    "RoomCharList": {},
    
    "Events": {
      
        "addAll": function() {
             
            $('#character-select-arrow').click(function() {
                $('#character-dropdown').slideToggle('fast');
            });
            
            $('#upload-map-submit-btn').click(function() {
//                IO.db.getMapImages(User.username);
            });
            
            $('#character-sheet-save').click(function() {
                $('[data-lity-close]').trigger('click');
            });
            
            $('#create-map-btn').click(function() {
//                IO.db.getUserMapImages(User.username);
            });
            
            $('#create-map-btn').click(function() {
                $('.modal-wrap, .modal-container').removeClass('modal-hide');
                $(window).trigger('resize');
            })
            
            $('#return-from-map-select').click(function() {
                $('.modal-wrap, .modal-container').addClass('modal-hide');
            })
            
            $('#add-map-btn').click(function() {
                $('#add-map-form').slideToggle('slow');
            })
            
            
            
            
            //GameroomController.Events.changeMapEvents();

            
        },
        
        "importCharacterToRoomEvents": function() {
            
            $('.import-btn').click(function() {
                
                var selectedIndex = $(this).attr("data-index");
                var charName = CharArray[selectedIndex].Name;
                var roomCode = Gameroom.fileName.replace('/', '').replace('.json', '');
                $('[data-lity-close]').trigger('click');
                
                IO.db.addCharacterToRoom(charName, roomCode);
            })
            
            
        },
        
        "characterDropDownEvents": function() {
            
            $('.character-selector').click(function() {
                
                var selectedIndex = $(this).attr("data-index");
                selectedCharaterIndex = selectedIndex;
                activeChar = RoomCharArray[selectedCharaterIndex];
                CharacterSheet.Util.initializeStatValueArray();
                document.getElementById('character-name-show').innerHTML = RoomCharArray[selectedIndex].Name;
                $('#character-dropdown').slideToggle('fast');
                GameroomController.Util.updateStatsPanel();
                
            })
            
        },
        
        "characterEditBtnEvents": function() {
            
            $('.character-edit').click(function() {
                
                var selectedIndex = $(this).attr("data-index");
                selectedEditableIndex = selectedIndex;
                editableChar = RoomCharArray[selectedEditableIndex];
                initStatValueArray(editableChar, 'editable');
                GameroomController.Util.updateFormValuesForEdit();
                
            })
            
        },
        
        "changeMapEvents": function() {
            
            $('.selectable-map').click(function() {
                
                var imgSource = $(this).attr("src");
                MapController.Util.updateMapBg(imgSource);
                $('.modal-wrap, .modal-container').addClass('modal-hide');
            })
            
            $('.your-class').slick({
                centerMode: true,
                respondTo: 'min',
                infinite: true,
                slidesToShow: 2,
                prevArrow: $('.prev'),
                nextArrow: $('.next')

            })
            
            $('.next').trigger('click');
            
            
            
        }
        
        
        
    },
    
    "Util": {
        
        "checkRoomId": function() {
            Gameroom.roomId = location.href.split('?')[1];;
            Gameroom.fileName = '/' + Gameroom.roomId + '.json';
        },
        
        "updateServer": function() {
            GameroomController.updating = true;
            IO.write(Gameroom);    
        },
        
        
        "getFromServer": function() {
            IO.read(Gameroom);
        },
        
        "readFromServer": function() {
            
            if(!GameroomController.updating) {
                IO.getUpdated(Gameroom);
            }
        },
        
        "updateCharacterListModal": function() {
            
            
            var htmlString = '';
            var counter = 0;
            GameroomController.CharCount = 0;
            
            document.getElementById('character-list').innerHTML = '';
            for (counter; counter < Charlist.length; counter++) {
                
                htmlString += '<div class="column small-12 medium-12 large-12 game-panel character-tile import-tile" style="color: #fff;">'       +
                              '<h3>' + CharArray[counter].Name + '</h3><div class="row full-width"><div class="column small-6 medium-12 large-3">' +
                              '<p class="center">' + CharArray[counter].Race + '</p></div><div class="column small-6 medium-12 large-3">'          +
                              '<p class="center">' + CharArray[counter].Class + '</p></div><div class="column small-12 medium-12 large-6">'        +
                              '<div class="btn import-btn" data-index="' + counter + '">Import</div></div></div></div>';
            }
            
            
            $('#character-list').html(htmlString);
            console.info(document.getElementById('character-list').innerHTML);
            
            GameroomController.Events.importCharacterToRoomEvents();
        },
        
        "updateCharacterListPanel": function() {
            
            var htmlString = '';
            var counter = 0;
            
            document.getElementById('characters-panel-container').innerHTML = '';
            
            for (counter; counter < GameroomController.RoomCharList.length; counter++) {
                
                htmlString = '<div class="column small-12 medium-12 large-12 game-panel character-tile"><h3>' + RoomCharArray[counter].Name  + 
                             '</h3><div class="row full-width"><div class="column small-6 medium-12 large-3"><p class="center">'             + 
                             RoomCharArray[counter].Race + '</p></div><div class="column small-6 medium-12 large-3"><p class="center">'      +
                             RoomCharArray[counter].Class + '</p></div><div class="column small-12 medium-12 large-6">'                      +
                             '<a class="btn character-edit" href="#character-edit-modal" data-lity data-index="' + counter + '">Edit</a>'    +
                             '</div></div></div>';
                
                document.getElementById('characters-panel-container').innerHTML += htmlString;
                
            }
            
            GameroomController.Events.characterEditBtnEvents();
        
        },
        
        "updateRoomCharacterElements": function() {
            
            var dropDownHtmlString = '';
            var counter = 0;
            GameroomController.RoomCharCount = 0;
            //document.getElementById('character-list').innerHTML = '';
            
            document.getElementById('char-dropdown-container').innerHTML = '';
            
            for (counter; counter < GameroomController.RoomCharList.length; counter++) {
                
                dropDownHtmlString = '<div class="column small-12 medium-12 large-12 character-selector" data-index="' + counter + '">'       +
                             '<h3>' + RoomCharArray[counter].Name + '</h3></div>';
                
                document.getElementById('char-dropdown-container').innerHTML += dropDownHtmlString;
                
            }
            
            GameroomController.Events.characterDropDownEvents();
            GameroomController.Util.updateCharacterListPanel();
            
            
            
        },
        
        "addPlayerMaps": function() {
            
            var htmlString = '';
            var counter = 0;
            var startString = '<div><img class="selectable-map" src="';
            var endString = '"/></div>';
            
            $('.your-class').removeClass('slick-initialized').removeClass('slick-slider');
            
            
            htmlString = '<div><img class="selectable-map" src="/assets/images/maps/img-map-placeholder.jpg"/></div>' +
                         '<div><img class="selectable-map" src="/assets/images/maps/ocean-map.jpg"/></div>' +
                         '<div><img class="selectable-map" src="/assets/images/maps/dungeon-1.jpg"/></div>' +
                         '<div><img class="selectable-map" src="/assets/images/maps/dungeon-2.jpg"/></div>' +
                         '<div><img class="selectable-map" src="/assets/images/maps/town-square.jpg"/></div>';
            
            $('.your-class').html(htmlString);
            
            htmlString = '';
            
            for (counter; counter < MapImagePaths.length; counter++) {
                
                
                htmlString = startString + MapImagePaths[counter].imagePath.replace('/home/eqq4dr1yy627/public_html', '') + endString;
                
                document.getElementsByClassName('your-class')[0].innerHTML += htmlString;
                
            }
            
            GameroomController.Events.changeMapEvents();
            
            
        },
        
        "updateUserAssets": function() {
            
            AssetController.assetSelected = false;
            AssetController.selectedAsset = '';
            $('.map-asset').removeClass('selected');
            AssetController.userAssetSelected = false;
            AssetController.selectedUserAsset = '';
            $('.user-asset').removeClass('selected');
            AssetController.selectedAssetDiv = {};
            AssetController.selectedUserAssetDiv = {};
            
            var htmlString = '';
            var counter = 0;
            var startString = '<div class="user-asset" data-index="';
            var middleString = '"><img data-index="';
            var middleEndString = '" src="';
            var endString = '" height="50px" width="50px"/></div>';
            
            document.getElementById('user-assets').innerHTML = '';
            
            for (counter; counter < UserImagePaths.length; counter++) {
                
                
                htmlString = startString + counter + middleString + counter + middleEndString + 
                             UserImagePaths[counter].imagePath.replace('/home/eqq4dr1yy627/public_html', '') + endString;
                
                document.getElementById('user-assets').innerHTML += htmlString;
                
            }
            
            AssetController.Events.userAssetEvents();
            
        },
        
        "addPlayerAssets": function() {
            
            
        },
        
        "getAllCharacterJson": function() {
            
            if (Gameroom.CharCount == 0) {
                CharArray = [];
            }
            IO.getAllCharacterJson(Charlist);
        },
        
        "getAllRoomCharacterJson": function() {
            
            if (GameroomController.RoomCharCount == 0) {
                RoomCharArray = [];
            }
            IO.getAllRoomCharacterJson(GameroomController.RoomCharList);
        },
        
        "updateStatsPanel": function() {
            
            for (i=0; i < activeStatValueArray.length; i++) {
                $(statElementArray[i]).html(activeStatValueArray[i]);
                $(FormFieldArray[i]).val(activeStatValueArray[i]);
            }
            
        },
        
        "updateFormValuesForEdit": function() {
            
            for (i=0; i < editStatValueArray.length; i++) {
                $(FormFieldArray[i]).val(editStatValueArray[i]);
            }
        }
        
    },

    "Init": function() {
        
        GameroomController.Events.addAll();
        MapController.Util.setFileName();
        GameroomController.Util.checkRoomId();
        GameroomController.Util.getFromServer();
        setTimeout(function(){IO.db.getMapImages(User.username)}, 500);
        setTimeout(function(){IO.db.getUserImages(User.username)}, 750);
        
    }  
    
}

$(document).ready(function() {
    
    GameroomController.Init();
    
//    var roomCode =  Map.fileName.replace('/', '');
//    var source = new EventSource('../io/sse.php?roomId=' + roomCode);
//    source.onmessage = function(event) {
//        console.info('something returned...');
//        console.info(event.data);
});
    
// Update Loop
var sleep = time => new Promise(resolve => setTimeout(resolve, time))
var poll = (promiseFn, time) => promiseFn().then(sleep(time).then(() => poll(promiseFn, time)))
poll(() => new Promise(() => GameroomController.Util.readFromServer()), 3500);
    
