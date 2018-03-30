var Gameroom = {
    
    "roomId": '',
    
    //Required when the object is called from the server
    "fileName": '',
    
    //Used for directory mapping
    "objType": 'gameroom',
    
    
    //Players allowed to join the game
    "players": [],
    
    
    //Maps controller used in the room
    "MapController": {},
    
    //The room chatlog
    "ChatController": {},
    
}

var GameroomController = {
    
    "Util": {
        
        "checkRoomId": function() {
            Gameroom.roomId = location.href.split('?')[1];;
            Gameroom.fileName = '/' + Gameroom.roomId + '.json';
        },
        
        "updateServer": function() {
            IO.write(Gameroom);    
        },
        
        
        "getFromServer": function() {
            IO.read(Gameroom);
        }
        
    },
    
    "Init": function() {
        
        GameroomController.Util.checkRoomId();
        GameroomController.Util.getFromServer();
    }  
    
}

$(document).ready(function() {
    
    Gameroom.Init();
    
})