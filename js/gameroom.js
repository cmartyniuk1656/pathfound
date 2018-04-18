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
    
    "updating": false,
    
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
        }
        
        
    },
    
    "Init": function() {
        
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
    
