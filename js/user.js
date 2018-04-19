var User = {
    
    "username": '',
    "password": '',
    "avatarPath": ''
        
}
    

                
var UserController = {
                
    "Util": {
        
        "storeUserInfo": function(userName, password) {
            User.username = userName;
            User.password = password;
            sessionStorage.setItem('user', JSON.stringify(User));
        },
        
        "storeUserInfoWithAvatar": function() {
            
        },
        
        "getUserInfo": function() {
            
            if (sessionStorage.user != null && sessionStorage.user != '' && typeof(sessionStorage.user != 'undefined')) {
                User = JSON.parse(sessionStorage.user);
                return User;
            }
            else {
                return false;
            }
    
        },
        
        "getUserCharacters": function() {
            var roomCode = Gameroom.fileName;
            roomCode = roomCode.replace('/', '');
            roomCode = roomCode.replace('.json', '');
            GameroomController.CharCount = 0;
            CharArray = [];
            IO.db.getUserCharacters(User.username, roomCode);
        },
        
        "getAllRoomCharacters": function() {
            
            var roomCode = Gameroom.fileName.replace('/', '').replace('.json', '');
            IO.db.getAllRoomCharacters(User.username, roomCode);
        },
        
        "getUserAvatar": function(userName) {
            IO.db.checkUserAvatarExists(userName, password);
        }
    },
    
    "Init": function() {
        
        var thisUser = UserController.Util.getUserInfo();
        
        
        if (thisUser == false && location.pathname != '/index.html') {
            $(location).attr('href', "index.html");
        }
        
        if (location.pathname.includes('gameroom.html')) {
            UserController.Util.getUserCharacters();
            UserController.Util.getAllRoomCharacters();
            
        }
        
    }
                
}

$(document).ready(function() {
    
    UserController.Init();
    
})