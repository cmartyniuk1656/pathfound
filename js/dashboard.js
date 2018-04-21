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
    
    "gameIds": [],
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
                $('[data-lity-close]').trigger('click');
            })
                
            $('#join-game-btn').click(function() {
                DashboardController.Util.joinGame();
            })
            
        },
        
        "addGamePanelAnimations": function() {
            
            var gamePanels = $('.anim-fadein-init');
            
            gamePanels.addClass('anim-fadein-trigger');
            
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
            
            IO.db.getGameInfo(User.username, GameData);
            
        },
        
        "buildGameListHTML": function() {
            
             var htmlString = '';
            
             for (counter = 0; counter < GameData.gameIds.length; counter++) {
                
                htmlString = '<a href="#enter-game-' + counter + '" data-lity class="control-panel"><div ' +
                             'class="column small-12 medium-12 large-12 full-width anim anim-fadein-init">' +
                             '<div class="panel-light game-panel-wrapper anim"><h3>' + GameData.gameData[0][counter].gameRoomName +
                             '</h3><hr>' + GameData.gameData[0][counter].gameRoomDescription + '<div class="row full-width">'+
                             '<div class="column small-12 medium-12 large-12"><h3 class="schedule"><b>Schedule</b></h3>'     +
                             '</div><div class="column small-12 medium-12 large-12 schedule-text">'                          +  
                             GameData.gameData[0][counter].gameRoomSchedule + '</div><div class="column small-6 medium-6'    +
                             'large-6 full-width"></div><div class="column small-6 medium-6 large-6 full-width">'    +
                             '</div></div></div></div></a>';
                
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
                             GameData.gameData[0][counter].gameRoomName + '</h3> </div></div><div class="row">' +
                             '<div class="column small-12 medium-12 large-8 end enter-game-left">'              +
                             '<h3>NUMBER OF PLAYERS: <span id="number-of-players">X</span></h3>'                +
                             '<h3>GAMETIME: <span id="gametime">XX:XX:XX</span></h3><h3>GAME CODE: '            +
                             '<span id="gametime">' + GameData.gameData[0][counter].gameRoomUrlCode             +
                             '</span></h3></div><div class="column small-12 medium-12'                          +
                             'large-4 end enter-game-right"><a class="enter-game-btn btn" data-lity'            +
                             'data-lity-target="/charactersheet.html">IMPORT CHARACTER</a>'                     +
                             '<a class="join-game-btn btn" href="/gameroom.html?'                               + 
                             GameData.gameData[0][counter].gameRoomUrlCode + '">ENTER GAME</a></div></div>'     +
                             '<div class="row"><div id="enter-game-bottom" class="column small-12 medium-12'    +
                             'large-12 end"></div><div class="column small-12 medium-12 large-12 end'           +
                             'account-management-left return-link"><a href="/dashboard.html"><h3>Return</h3>'   +
                             '</a></div></div></div></div>';
                
                document.getElementById('enter-game-modals').innerHTML += htmlString; 
                
                 
            }
            
            setTimeout(function(){DashboardController.Events.addGamePanelAnimations()}, 250);
            
            
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
        },
        
        "triggerAnimations": function() {
            
            var slideLeft = $(".anim-slide-left-init");
            var slideRight = $(".anim-slide-right-init");
            
            if(slideLeft.length) {
                slideLeft.addClass('anim-slide-left-trigger');
            } 
            
            if(slideRight.length) {
                slideRight.addClass('anim-slide-right-trigger');
            } 
            
        }
    },
    
    //
    "Init": function() {
        DashboardController.Events.addAll();
        DashboardController.Util.triggerAnimations();
        if (sessionStorage.getItem('GameData') !== null && typeof(sessionStorage.getItem('GameData')) != 'undefined') {
            GameData = JSON.parse(sessionStorage.getItem('GameData'));
            DashboardController.Util.buildGameListHTML();
        }
        else {
            IO.db.getPlayerGameIds(User.username);
        }
    }
}


$(document).ready(function() {
    
    DashboardController.Init();
    
})

