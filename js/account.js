var AccountController = {
    
    "Events":  {
        
        "addAll": function() {
            
            $("#change-profile-picture-btn").click(function() {
                $('#picture-select').get(0).click();
            });
            
        }
    },
    
    
    "Util": {
        
    
    },
    
    "Init": function() {
        AccountController.Events.addAll();
        $('#userName-value').val(User.username);
        $('#profile-picture').attr('src', User.avatarPath);
    }
    
}

$(document).ready(function() {
    
    AccountController.Init();
    
})
