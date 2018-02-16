var path;
determinePath();

//TODO ------------------------------ Add login validation

$("#login-button").click(function() {
   $(location).attr('href', path + "gameroom.html");
});

//TODO END -----------------------------------------------

function determinePath() {
    
    if (location.hostname == "cmartyniuk1656.github.io")
        
        path = "pathfound/";
    
    else {
        path="";
    }
    
    return path;
        
};