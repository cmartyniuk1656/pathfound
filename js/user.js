var User = {
    
    "username": '',
    "password": ''
        
}
    

                
var UserController = {
                
    "Util": {
        
        "storeUserInfo": function(userName, password) {
            User.username = userName;
            User.password = password;
            sessionStorage.setItem('user', JSON.stringify(User));
        },
        
        "getUserInfo": function() {
            
            if (sessionStorage.user != null && sessionStorage.user != '' && typeof(sessionStorage.user != 'undefined')) {
                User = JSON.parse(sessionStorage.user);
                return User;
            }
            else {
                return false;
            }
    
        }
    },
    
    "Init": function() {
        
        var thisUser = UserController.Util.getUserInfo();
        
        if (thisUser == false && location.pathname != '/index.html') {
            $(location).attr('href', "index.html");
        }
    }
                
}

$(document).ready(function() {
    
    UserController.Init();
    
})