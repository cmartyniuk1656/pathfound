var GameValueStorage = {
    
    "gameName": '',
    "gameSchedule": '',
    "gameDescription": '',
    "userName": '',
    "gameString": '',
    "createGame": function() {
        IO.db.createNewGame(GameValueStorage.userName, GameValueStorage.gameName, GameValueStorage.gameSchedule, GameValueStorage.gameDescription, GameValueStorage.gameString); 
    },
    "joinGame": function() {
        IO.db.enterGame(GameValueStorage.userName, GameValueStorage.gameString);
    }
    
}

var GameData = {
    
    "gameIds": {},
    "gameRetrievalCount" : 0,
    "gameData": []
    
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
                
            $('#join-game-btn').click(function() {
                DashboardController.Util.joinGame();
            })
            
        }
    },
    
    //Utitlity functions for control panel
    "Util": {
        
        "joinGame": function() {
            
            var userName = User.username;
            var gameString = $('#join-game-code').val();

            GameValueStorage.userName = userName;
            GameValueStorage.gameString = gameString;
            
            console.info('clicked');
            
            
            IO.db.checkGameExistsForJoin(userName, gameString);
            
            
        },
        
        "createGame": function() {
            
            var gameName = $('#game-name-create').val();
            var gameSchedule = $('#game-schedule-create').val();
            var gameDescription = $('#game-description-create').val();
            var userName = User.username;
            var gameString = DashboardController.Util.generateRandomString();
            
            GameValueStorage.gameName = gameName;
            GameValueStorage.gameSchedule = gameSchedule;
            GameValueStorage.gameDescription = gameDescription;
            GameValueStorage.userName = userName;
            GameValueStorage.gameString = gameString;
            
            
            IO.db.checkGameExists(userName, gameString);
            
            
        },
        
        "buildGameList": function() {
            
            
            for (counter = 0; counter < GameData.gameIds.length; counter++) {
                IO.db.getGameInfo(User.username, GameData.gameIds[counter].gameRoomID);
                
                
            }
            
        },
        
        "buildGameListHTML": function() {
            
             var htmlString = '';
            
             for (counter = 0; counter < GameData.gameIds.length; counter++) {
                
                htmlString = '<div class="column small-12 medium-12 large-12 full-width">' +
                             '<div class="panel-light game-panel-wrapper"><h3>' + GameData.gameData[counter][0].gameRoomName +
                             '</h3><hr>' + GameData.gameData[counter][0].gameRoomDescription + '<div class="row full-width">'+
                             '<div class="column small-12 medium-12 large-12"><h3 class="schedule"><b>Schedule</b></h3>'     +
                             '</div><div class="column small-12 medium-12 large-12 schedule-text">'                          +  
                             GameData.gameData[counter][0].gameRoomSchedule + '</div><div class="column small-6 medium-6'    +
                             'large-6 full-width"></div><div class="column small-6 medium-6 large-6 full-width"><a href='    +
                             '"#enter-game-' + counter + '" data-lity class="btn dark control-panel">Enter Game</a></div>'  +
                             '</div></div></div>';
                
                if (counter % 2) {
                    document.getElementById('game-list-right-side').innerHTML += htmlString;
                }
                else {
                    document.getElementById('game-list-left-side').innerHTML += htmlString;
                }
                
            }
            
            for (counter = 0; counter < GameData.gameIds.length; counter++) {
                
                htmlString = '<div id="enter-game-' + counter + '" class="row full-width lity-hide join-game">' +
                             '<div class="column small-12 medium-12 large-12 end"><div class="row">'            +
                             '<div class="column small-12 medium-12 large-12 end"><h3 class="game-name">'       +
                             GameData.gameData[counter][0].gameRoomName + '</h3> </div></div><div class="row">' +
                             '<div class="column small-12 medium-12 large-8 end enter-game-left">'              +
                             '<h3>NUMBER OF PLAYERS: <span id="number-of-players">X</span></h3>'                +
                             '<h3>GAMETIME: <span id="gametime">XX:XX:XX</span></h3><h3>GAME CODE: '            +
                             '<span id="gametime">' + GameData.gameData[counter][0].gameRoomUrlCode             +
                             '</span></h3></div><div class="column small-12 medium-12'                          +
                             'large-4 end enter-game-right"><a class="enter-game-btn btn" data-lity'            +
                             'data-lity-target="/charactersheet.html">IMPORT CHARACTER</a>'                     +
                             '<a class="join-game-btn btn" href="/gameroom.html?'                               + 
                             GameData.gameData[counter][0].gameRoomUrlCode + '">ENTER GAME</a></div></div>'     +
                             '<div class="row"><div id="enter-game-bottom" class="column small-12 medium-12'    +
                             'large-12 end"></div><div class="column small-12 medium-12 large-12 end'           +
                             'account-management-left return-link"><a href="/dashboard.html"><h3>Return</h3>'   +
                             '</a></div></div></div></div>';
                
                document.getElementById('enter-game-modals').innerHTML += htmlString; 
                 
            }
            
        },
        
        "generateRandomString": function() {

            const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
            var res = "";
            for(var i = 0; i < 6; i++) {
                var rnd = Math.floor(Math.random() * list.length);
                res = res + list.charAt(rnd);

                
            }
            
            return res;
        },
        
        "updateJoinErrorMessage": function() {
            document.getElementById('error-msg-join-game').innerHTML='Game doesn\'t Exist';
        }
    },
    
    //
    "Init": function() {
        DashboardController.Events.addAll();
        IO.db.getPlayerGameIds(User.username);
    }
}


$(document).ready(function() {
    
    DashboardController.Init();
    
})

