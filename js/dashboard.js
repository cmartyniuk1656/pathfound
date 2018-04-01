var GameCreationStorage = {
    
    "gameName": '',
    "gameSchedule": '',
    "gameDescription": '',
    "userName": '',
    "gameString": '',
    "createGame": function() {
        IO.db.createNewGame(GameCreationStorage.userName, GameCreationStorage.gameName, GameCreationStorage.gameSchedule, GameCreationStorage.gameDescription, GameCreationStorage.gameString); 
    }
    
}


//Control Panel Controller Object
var DashboardController = {
    
    
    
    //Dashboard Controls
    "Controls": {
        
    },
    
    //Event listeners for control panel
    "Events": {
        
        "addAll": function() {
            
            $('#create-game-btn').click(function() {
                DashboardController.Util.createGame();
            })
            
        }
    },
    
    //Utitlity functions for control panel
    "Util": {
        
        "createGame": function() {
            
            var gameName = $('#game-name-create').val();
            var gameSchedule = $('#game-schedule-create').val();
            var gameDescription = $('#game-description-create').val();
            var userName = User.username;
            var gameString = DashboardController.Util.generateRandomString();
            
            GameCreationStorage.gameName = gameName;
            GameCreationStorage.gameSchedule = gameSchedule;
            GameCreationStorage.gameDescription = gameDescription;
            GameCreationStorage.userName = userName;
            GameCreationStorage.gameString = gameString;
            
            
            IO.db.checkGameExists(userName, gameString);
            
            
        },
        
        "generateRandomString": function() {

            const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            var res = "";
            for(var i = 0; i < 6; i++) {
                var rnd = Math.floor(Math.random() * list.length);
                res = res + list.charAt(rnd);

                
            }
            
            return res;
        }
    },
    
    //
    "Init": function() {
        DashboardController.Events.addAll();
    }
}


$(document).ready(function() {
    
    DashboardController.Init();
    
})

