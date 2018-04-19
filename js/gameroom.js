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
            
            $('#image-submit').click(function() {
                $('[data-lity-close]').trigger('click');
            });
            
            $('#create-map-btn').click(function() {
                IO.db.getUserMapImages(User.username);
            });
            
        },
        
        "importCharacterToRoomEvents": function() {
            
            $('.import-btn').click(function() {
                
                var selectedIndex = $(this).attr("data-index");
                var charName = CharArray[selectedIndex].Name;
                var roomCode = Gameroom.fileName.replace('/', '').replace('.json', '');
                
                IO.db.addCharacterToRoom(charName, roomCode);
            })
            
        },
        
        "characterDropDownEvents": function() {
            
            $('.character-selector').click(function() {
                
                var selectedIndex = $(this).attr("data-index");
                selectedCharaterIndex = selectedIndex;
                activeChar = RoomCharArray[selectedCharaterIndex];
                document.getElementById('character-name-show').innerHTML = RoomCharArray[selectedIndex].Name;
                $('#character-dropdown').slideToggle('fast');
                GameroomController.Util.updateStatsPanel();
                
            })
            
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
                
                htmlString = '<div class="column small-12 medium-12 large-12 game-panel character-tile import-tile" style="color: #fff;">'       +
                             '<h3>' + CharArray[counter].Name + '</h3><div class="row full-width"><div class="column small-6 medium-12 large-3">' +
                             '<p class="center">' + CharArray[counter].Race + '</p></div><div class="column small-6 medium-12 large-3">'          +
                             '<p class="center">' + CharArray[counter].Class + '</p></div><div class="column small-12 medium-12 large-6">'        +
                             '<div class="btn import-btn" data-index="' + counter + '">Import</div></div></div></div>';
                
                document.getElementById('character-list').innerHTML += htmlString;
                
            }
            
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
                             '<a class="btn" href="#character-edit-modal" data-lity data-index="' + counter + '">Edit</a></div></div></div>';
                
                document.getElementById('characters-panel-container').innerHTML += htmlString;
                
            }
            
//            GameroomController.Events.importCharacterToRoomEvents();
        
        },
        
        "updateRoomCharacterElements": function() {
            
            var dropDownHtmlString = '';
            var counter = 0;
            GameroomController.RoomCharCount = 0;
            document.getElementById('character-list').innerHTML = '';
            
            document.getElementById('char-dropdown-container').innerHTML = '';
            
            for (counter; counter < GameroomController.RoomCharList.length; counter++) {
                
                dropDownHtmlString = '<div class="column small-12 medium-12 large-12 character-selector" data-index="' + counter + '">'       +
                             '<h3>' + RoomCharArray[counter].Name + '</h3></div>';
                
                document.getElementById('char-dropdown-container').innerHTML += dropDownHtmlString;
                
            }
            
            GameroomController.Events.characterDropDownEvents();
            GameroomController.Util.updateCharacterListPanel();
            
            
            
        },
        
        "getAllCharacterJson": function() {
            
            if (Gameroom.CharCount == 0) {
                CharArray = [];
            }
            IO.getAllCharacterJson();
        },
        
        "getAllRoomCharacterJson": function() {
            
            if (GameroomController.RoomCharCount == 0) {
                RoomCharArray = [];
            }
            IO.getAllRoomCharacterJson();
        },
        
        "updateStatsPanel": function() {
            
            var formFields = ['#sheet-name','#sheet-race', '#sheet-class', '#sheet-age', '#sheet-gender', '#sheet-size', '#sheet-alignment', '#sheet-deity',
                              '#sheet-current-hp', '#sheet-strscore', '#sheet-dexscore', '#sheet-conscore', '#sheet-intscore',
                              '#sheet-wisscore', '#sheet-chascore', '#sheet-temp-strscore', '#sheet-temp-dexscore', 
                              '#sheet-temp-conscore', '#sheet-temp-intscore', '#sheet-temp-wisscore', '#sheet-temp-chascore', 
                              '#sheet-initiative-misc', '#sheet-speed-base', '#sheet-speed-mod', '#sheet-hp-max'];
            
            var statValues = [activeChar.Name, activeChar.Race, activeChar.Class, activeChar.Age, activeChar.Gender, activeChar.Size, activeChar.Alignment, 
                              activeChar.Deity, activeChar.CurrentHP, activeChar.Str, activeChar.Dex, activeChar.Con, activeChar.Int, activeChar.Wis, 
                              activeChar.Cha, activeChar.TempStr, activeChar.TempDex, activeChar.TempCon, activeChar.TempInt, activeChar.TempWis, 
                              activeChar.TempCha, activeChar.InitiativeMisc, activeChar.BaseSpeed, activeChar.ModSpeed, activeChar.MaxHP];
            
            var statElementIds = ['#character-name-show', '#stats-race', '#stats-class', '#stats-age', '#stats-gender', '#stats-size', '#stats-alignment', '#stats-deity',
                                  '#stats-current-hp', '#stats-strscore', '#stats-dexscore', '#stats-conscore', '#stats-intscore',
                                  '#stats-wisscore', '#stats-chascore', '#stats-temp-strscore', '#stats-temp-dexscore', 
                                  '#stats-temp-conscore', '#stats-temp-intscore', '#stats-temp-wisscore', '#stats-temp-chascore', 
                                  '#stats-initiative-misc', '#stats-speed-base', '#stats-speed-mod', '#stats-hp-max'];
            
            for (i=0; i < statValues.length; i++) {
                $(statElementIds[i]).html(statValues[i]);
                $(formFields[i]).val(statValues[i]);
            }
            
        }
        
    },

    "Init": function() {
        
        GameroomController.Events.addAll();
        MapController.Util.setFileName();
        GameroomController.Util.checkRoomId();
        GameroomController.Util.getFromServer();
        
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
    
