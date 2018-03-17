//TODO ------------------------------ Add login validation


//Event handler for login button click
$("#login-button").click(function() {
   $(location).attr('href', determinePath() + "gameroom.html");
});

//TODO END -----------------------------------------------


//Redundant function. Was needed for mapping on brackets live preview vs github pages for testing,
//but issue seems to have resolved itself. Will leave it here incase issue pops up again.
function determinePath() {
    
    var path;
    
    if (location.hostname == "cmartyniuk1656.github.io")
        
        path = "";
    
    else {
        path = "";
    }
    
    return path;
        
}