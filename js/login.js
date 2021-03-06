var loginCallbackStorage = {
    
    "username": '',
    "password": '',
    
    "callback": function() {
        
        IO.db.addNewUser(loginCallbackStorage.username, loginCallbackStorage.password);
        
    }
    
    
}

var LoginController = {
    
    "Events":  {
        
        "addAll": function() {
            
            $("#sign-up-button").click(function() {
                LoginController.Util.validateNewAccount();
            });
            
            $("#login-button").click(function() {
    
                var username = $('#username-textfield').val();
                var password = $('#password-textfield').val();

                sessionStorage.removeItem('GameData');
                IO.db.login(username, password);
    
            });  
        }
    },
    
    
    "Util": {
        
        "checkAlphaNumeric": function(str) {
            return /^[a-z0-9]+$/i.test(str);
        },
        
        "validateNewAccount": function() {
            
            var username = $('#username-create').val();
            var password = $('#password-create').val();
            var passwordConfirm = $('#password-create-confirm').val();
            var valid = true;
            var errorDiv = document.getElementById('error-msg-sign-up');
    
            var errorMsg = '';
            
            loginCallbackStorage.username = username;
            loginCallbackStorage.password = password;
    
            errorDiv.innerHTML = errorMsg;
            
            if (!LoginController.Util.checkAlphaNumeric(username)) {
                errorMsg = 'Please use alphanumeric characters only for Username (A-Z, 0-9).';
                valid = false;
            }
            
            else if (password != passwordConfirm) {
                errorMsg = 'Passwords do not match.';
                valid = false;
            }
            
            else if (username == '' || password == '' || passwordConfirm == '') {
                errorMsg = 'No fields can be left blank.';
                valid = false;
            }
            
            else if (password.length < 6) {
                errorMsg = 'Password must be at least 6 characters long.';
                valid = false;
            }
            
            if (!valid) {
                errorDiv.innerHTML = errorMsg;
            }
            
            else if (valid) {
                sessionStorage.removeItem('GameData');
                IO.db.checkUserExists(username);
            }
            
        },
        
        "updateErrorMessage": function(str) {
            document.getElementById('error-msg-sign-up').innerHTML = str;
        }
    
    },
    
    "Init": function() {
        LoginController.Events.addAll();
    }
    
}

$(document).ready(function() {
    
    LoginController.Init();
    
})



