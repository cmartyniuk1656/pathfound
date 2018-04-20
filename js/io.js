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
                
                GameroomController.updating = false;
                
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
                
                
                if (objType == 'gameroom') {
                    
                    //If gameroom file is found on the server
                    if (response != null && response != '' && typeof(response) != 'undefined') {
                        
                        console.info('Returned GameRoom');
                        console.info(JSON.parse(response));
                        Gameroom = JSON.parse(response);
                        Map = Gameroom.Map;
                        Chatbox = Gameroom.Chatbox;
                        
                        MapController.Init();
                        ChatController.Init();
                        
                    }
                    
                    //Else upload a new one to the server
                    else {
                        
                        console.info('no gameroom found...')
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
    
    "getUpdated": function (jsonObj) {

        
        var objType = jsonObj.objType;
        var dataString = jsonObj;
        var path = jsonObj.fileName;

        $.ajax({
            url: '../io/io.php',
            data: {
                myData: dataString,
                myDestination: path,
                myType: objType,
                requestType: 'read',
                intet: 'getJson'
            },
            type: 'POST',
            success: function(response) {
                
                
                if (objType == 'gameroom') {
                    
                    //If gameroom file is found on the server
                    if (response != null && response != '' && typeof(response) != 'undefined') {
                        
                        Gameroom = JSON.parse(response);
                        
                        if (Map != Gameroom.Map) {
                            Map = Gameroom.Map;
                            MapController.Util.updateMapDom();
                        }
                            
                        if (Chatbox != Gameroom.Chatbox) {
                            Chatbox = Gameroom.Chatbox;
                            ChatController.Init();
                        }

                        
                    }
                    
                    //Else upload a new one to the server
                    else {
                        
                        console.info('Error retrieving gameroom from server...')
                    }
                }
                
                
                else if (objType == 'character') {
                    //Placeholder for when we have character objects         
                }
                
            
            }
        });

    },
    
    "saveCharacter": function(charObj, userName) {
        
        var objType = 'character';
        var dataString = JSON.stringify(charObj);
        var user = userName;
        var charName = CharacterObj.Name;
        var fileName = '/' + User.username + '-' + CharacterObj.Name + '.json';
        fileName = fileName.replace(' ', '');
            
        $.ajax({
            url: '../io/io.php',
            data: {
                dataType: 'json',
                thisUser: user,
                thisChar: charName,
                myData: dataString,
                myType: objType,
                myDestination: fileName,
                chracter: dataString,
                requestType: 'saveCharacter',
                roomCode: Gameroom.fileName
            },
            type: 'POST',
            success: function (response) {
                
                if(response == true) {
                    console.info('object written...');
                    CharacterSheet.Util.saveCharacterToDatabase();
                }
                else{
                
                    console.info('Character JSON not written to server...');
                
                }
            }  
        });
    },
    
    "getAllCharacterJson": function () {

        var path = '/' + Charlist[GameroomController.CharCount].characterJSONPath;
        path = path.replace(' ', '');
        console.info(path);

        $.ajax({
            url: '../io/io.php',
            data: {
                myData: '',
                myDestination: path,
                myType: 'character',
                requestType: 'getCharacterJSON'
            },
            type: 'POST',
            success: function(response) {
                
                    
                    //If gameroom file is found on the server
                    if (response != null && response != '' && typeof(response) != 'undefined') {
                        
                        CharArray.push(JSON.parse(response));
                        GameroomController.CharCount++;
                        
                        if (GameroomController.CharCount > Charlist.length - 1) {
                            GameroomController.Util.updateCharacterListModal();
                        }
                        
                        else {
                            GameroomController.Util.getAllCharacterJson();
                        }
                        
                    }
                    
                    else {
                        
                        console.info('no character object found...')
                    }
            
            }
        });

    },
    
    "test": function() {
        
        var charPaths = [];
        
        for (i=0; i < Charlist.length; i++) {
            
            charPaths.push(CharList[i].characterJSONPath);
            
        }
        
        console.info(charPaths);
        
//        var path = '/' + Charlist[GameroomController.CharCount].characterJSONPath;
//        path = path.replace(' ', '');
//        console.info(path);
//
//        $.ajax({
//            url: '../io/io.php',
//            data: {
//                myData: '',
//                myDestination: path,
//                myType: 'character',
//                requestType: 'getCharacterJSON'
//            },
//            type: 'POST',
//            success: function(response) {
//                
//                    
//                    //If gameroom file is found on the server
//                    if (response != null && response != '' && typeof(response) != 'undefined') {
//                        
//                        CharArray.push(JSON.parse(response));
//                        GameroomController.CharCount++;
//                        
//                        if (GameroomController.CharCount > Charlist.length - 1) {
//                            GameroomController.Util.updateCharacterListModal();
//                        }
//                        
//                        else {
//                            GameroomController.Util.getAllCharacterJson();
//                        }
//                        
//                    }
//                    
//                    else {
//                        
//                        console.info('no character object found...')
//                    }
//            
//            }
//        });
        
    },
    
    "getAllRoomCharacterJson": function () {

        var path = '/' + GameroomController.RoomCharList[GameroomController.RoomCharCount].characterJSONPath;
        path = path.replace(' ', '');

        $.ajax({
            url: '../io/io.php',
            data: {
                myData: '',
                myDestination: path,
                myType: 'character',
                requestType: 'getRoomCharacterJSON'
            },
            type: 'POST',
            success: function(response) {
                
                    
                    //If gameroom file is found on the server
                    if (response != null && response != '' && typeof(response) != 'undefined') {
                        
                        RoomCharArray.push(JSON.parse(response));
                        GameroomController.RoomCharCount++;
                        
                        if (GameroomController.RoomCharCount > GameroomController.RoomCharList.length - 1) {
                            GameroomController.Util.updateRoomCharacterElements();
                        }
                        
                        else {
                            GameroomController.Util.getAllRoomCharacterJson();
                        }
                        
                    }
                    
                    else {
                        
                        console.info('no character object found...')
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
                    if (response == true) {;
                        console.info('record added.');
                    }
                    else {
                        sessionStorage.removeItem('GameData');
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
                        GameValueStorage.joinGame();
                    }
                    else {
                        
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
                        sessionStorage.removeItem('GameData');
                        $(location).attr('href', "dashboard.html");
                    }
                    else {
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
                    
                    GameData.gameData.push(JSON.parse(response));
                    
                    if (GameData.gameRetrievalCount == GameData.gameIds.length - 1) {
                        sessionStorage.setItem('GameData', JSON.stringify(GameData));
                        DashboardController.Util.buildGameListHTML();
                    }
                    GameData.gameRetrievalCount++;
                }  
            });
            
        },
        
        "getCharacterAssets": function() {
            
            $.ajax({
                url: '../io/playerGames.php',
                data: {
                    dataType: 'json',
                    intent: 'getCharacterAssets',
                },
                type: 'POST',
                success: function (response) {
                    
                    GameData.gameData.push(JSON.parse(response));
                    
                    if (GameData.gameRetrievalCount == GameData.gameIds.length - 1) {
                        DashboardController.Util.buildGameListHTML();
                    }
                    GameData.gameRetrievalCount++;
                }  
            });
        },
        
        "checkCharExistInDb": function(userNameArg, charNameArg) {
            
            var userName = userNameArg;
            var characterName = charNameArg;
            
            $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    charName: characterName,
                    intent: 'checkCharacterExistsForPlayer',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        console.info('Character didnt exist and was written to character table....');
                        UserController.Util.getUserCharacters();
                    }
                    else if (response == false) {
                        console.info('Character already exists exist in Character Table....');
                    }
                    else {
                        console.info('Unkown resposne returned...');
                    }
                }  
            });
            
        },
        
        "getUserCharacters": function(userNameArg, gameroomCodeArg) {
            
            var userName = userNameArg;
            
            $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    intent: 'getUserCharacters',
                },
                type: 'POST',
                success: function (response) {
                    if (response == false) {
                        console.info('No Playable characters found...');
                    }
                    else {
                        Charlist = JSON.parse(response);
                        GameroomController.Util.getAllCharacterJson();
                    }
                }  
            });
            
        },
        
        "getAllRoomCharacters": function(userNameArg, gameroomCodeArg) {
            
            var userName = userNameArg;
            var gameCode = gameroomCodeArg;
            
            $.ajax({
                url: '../io/db.php',
                data: {
                    user: userName,
                    roomCode: gameCode,
                    intent: 'getRoomCharacters',
                },
                type: 'POST',
                success: function (response) {
                    if (response == false) {
                        console.info('No room characters found...');
                    }
                    else {
                        
                        GameroomController.RoomCharList = JSON.parse(response);
                        var roomCharList = JSON.parse(response);
                        GameroomController.Util.getAllRoomCharacterJson();
                    }
                }  
            });
            
        },
        
        "addCharacterToRoom": function(characterNameArg, roomCodeArg){
            
            var characterName = characterNameArg.replace(' ', '');
            var gameCode = roomCodeArg;
            
            $.ajax({
                url: '../io/db.php',
                data: {
                    user: User.username,
                    roomCode: gameCode,
                    charName: characterName,
                    intent: 'addCharacterToRoom',
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        console.info('Character was added to the RoomMember Table....');
                        UserController.Util.getAllRoomCharacters();
                        UserController.Util.getUserCharacters();
                    }
                    else if (response == false) {
                        console.info('Character already exists exist in RoomMember Table....');
                    }
                    else {
                        console.info('Unkown resposne returned...');
                        console.info(response);
                    }
                }  
            });
        }
        
  
    }

}