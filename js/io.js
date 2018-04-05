//Input Output Controller Object
var IO = {

    "write": function (jsonObj) {

        var dataString = JSON.stringify(jsonObj);
        var destination = jsonObj.fileName;
        var objType = jsonObj.objType;

        $.ajax({
            url: '../io/io.php',
            data: {
                myData: dataString,
                myDestination: destination,
                myType: objType,
                requestType: 'post',
                intet: 'postJson'
            },
            type: 'POST',
            success: function (response) {
                
                console.info('Successful Post');
                
            }
        });

    },
    
    "read": function (jsonObj) {

        
        var objType = jsonObj.objType;
        var dataString = jsonObj;
        var path = jsonObj.fileName;

        $.ajax({
            url: '../io/io.php',
            data: {
                myData: dataString,
                myDestination: path,
                myType: objType,
                requestType: 'get',
                intet: 'getJson'
            },
            type: 'POST',
            success: function(response) {
                
                
                console.info('response is: ' + response);
                
                if (objType == 'gameroom') {
                    
                    //If gameroom file is found on the server
                    if (response != null && response != '' && typeof(response) != 'undefined') {
                        
                        Gameroom = JSON.parse(response);
                        Map = Gameroom.Map;
                        Chatbox = Gameroom.Chatbox;
                        
                        MapController.Init();
                        ChatController.Init();
                        
                    }
                    
                    //Else upload a new one to the server
                    else {
                        
                        MapController.Init();
                        ChatController.Init();
                        
                        Gameroom.Map = Map;
                        Gameroom.Chatbox = Chatbox;
                        
                        GameroomController.Util.updateServer();
                    }
                }
                
                
                else if (objType == 'character') {
                    //Placeholder for when we have character objects         
                }
                
            
            }
        });

    },
    
    "db": {
        
        "login": function(userName, password) {
            
            $.ajax({
                url: '../io/login.php',
                data: {
                    user: userName,
                    password: password,
                    intent: 'login',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        IO.db.checkUserAvatarExists(userName, password);
                    }
                }  
            });
            
        },
        
        "checkValidUser": function(userName, password) {
            
             $.ajax({
                url: '../io/login.php',
                data: {
                    user: userName,
                    password: password,
                    intent: 'checkValidUser',
                },
                type: 'POST',
                success: function (response) {
                    if (response != true) {
                        IO.db.checkUserAvatarExists(userName, password);
                    }
                }  
            });
            
        },
        
        "checkUserExists": function(userName) {
            
             $.ajax({
                url: '../io/login.php',
                data: {
                    user: userName,
                    intent: 'checkUserExists',
                },
                type: 'POST',
                success: function (response) {
                    if (response != true) {
                        loginCallbackStorage.callback();
                    }
                    else {
                        LoginController.Util.updateErrorMessage('Username already exists.')
                    }
                }  
            });
            
        },
        
        "addNewUser": function(userName, userPassword) {
            
             $.ajax({
                url: '../io/login.php',
                data: {
                    user: userName,
                    password: userPassword,
                    intent: 'createNewUser',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {;
                        console.info('record added.');
                        $(location).attr('href', "index.html");
                    }
                    else {
                        console.info(response);
                    }
                }  
            });
            
        },
        
        "checkUserAvatarExists": function(userName, password) {
            
            $.ajax({
                url: '../io/imageHandler.php',
                data: {
                    accUserName: userName,
                    intent: 'checkAvatarExists',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        User.avatarPath = 'io/dam/avatar/' + userName + '.jpg';
                        UserController.Util.storeUserInfo(userName, password);
                    }
                    else {
                        User.avatarPath = 'img/COOL_DRAGON.png';
                        UserController.Util.storeUserInfo(userName, password);
                    }
                    
                     $(location).attr('href', "dashboard.html");
                }  
            });
            
        },
        
        "createNewGame": function(userName, gameName, gameSchedule, gameDescription, gameUrlCode) {

            $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    name: gameName,
                    schedule: gameSchedule,
                    description: gameDescription, 
                    urlCode: gameUrlCode,
                    intent: 'createGame',
                },
                type: 'POST',
                success: function (response) {
                    console.info(response);
                    if (response == true) {;
                        console.info('record added.');
                    }
                    else {
                        console.info(response);
                        $(location).attr('href', "dashboard.html");
                    }
                }  
            });
            
        },
        
        "checkGameExists": function(userName, urlCode) {
            
            
             $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    game: urlCode,
                    intent: 'checkGameExists',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        DashboardController.Util.createGame();
                    }
                    else {
                        GameValueStorage.createGame();
                    }
                }  
            });
            
        },
        
        "checkGameExistsForJoin": function(userName, urlCode) {
            
             $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    game: urlCode,
                    intent: 'checkGameExistsForJoin',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        console.info('Game Exists?');
                        GameValueStorage.joinGame();
                    }
                    else {
                        
                        console.info('Game Doesnt Exist?');
                        DashboardController.Util.updateJoinErrorMessage();
                    }
                }  
            });
            
        },
        
        "enterGame": function(userName, urlCode) {
            
            console.info('Rolliung');
            
             $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    game: urlCode,
                    intent: 'enterGame',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        console.info('Record added');
                        $(location).attr('href', "dashboard.html");
                    }
                    else {
                        console.info('Fail');
                        console.info(response);
                    }
                }  
            });
            
        },
        
        "getPlayerGameIds": function(userName) {
            
            $.ajax({
                url: '../io/playerGames.php',
                data: {
                    dataType: 'json',
                    user: userName,
                    intent: 'getPlayerGames',
                },
                type: 'POST',
                success: function (response) {
                    
                    if (response != false) {
                    
                        GameData.gameIds = JSON.parse(response);
                        DashboardController.Util.buildGameList();
                        
                    }
                    
                }  
            });
            
        },
        
        "getGameInfo": function(userName, gameID) {
            
            $.ajax({
                url: '../io/playerGames.php',
                data: {
                    dataType: 'json',
                    user: userName,
                    gameId: gameID,
                    intent: 'getGameInfo',
                },
                type: 'POST',
                success: function (response) {
                    
                    console.info(response);
                    
                    GameData.gameData.push(JSON.parse(response));
                    
                    if (GameData.gameRetrievalCount == GameData.gameIds.length - 1) {
                        DashboardController.Util.buildGameListHTML();
                    }
                    GameData.gameRetrievalCount++;
                }  
            });
            
        }
  
    }

}