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
        },
        
        "readFromServer": function() {
            IO.getUpdated(Gameroom);
        }
        
        
    },
    
    "Init": function() {
        
        GameroomController.Util.checkRoomId();
        GameroomController.Util.getFromServer();
    }  
    
}

$(document).ready(function() {
    
    GameroomController.Init();
    
    //Update Loop
    var sleep = time => new Promise(resolve => setTimeout(resolve, time))
            var poll = (promiseFn, time) => promiseFn().then(sleep(time).then(() => poll(promiseFn, time)))

            poll(() => new Promise(() => GameroomController.Util.readFromServer()), 5000);
    
})