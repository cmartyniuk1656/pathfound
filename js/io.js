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
                requestType: 'post'
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
                    password: password
                },
                type: 'POST',
                success: function (response) {
                    if (response == true) {
                        UserController.Util.storeUserInfo(userName, password);
                        $(location).attr('href', "dashboard.html")
                    }
                }  
            });
            
        },
        
        "checkValidUser": function(userName, password) {
            
             $.ajax({
                url: '../io/login.php',
                data: {
                    user: userName,
                    password: password
                },
                type: 'POST',
                success: function (response) {
                    if (response != true) {
                        UserController.Util.storeUserInfo(userName, password);
                    }
                }  
            });
            
        }
  
    }

}