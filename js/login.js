//TODO ------------------------------ Add login validation


//Event handler for login button click (With DB)
$("#login-button").click(function() {
    
    var username = $('#username-textfield').val();
    var password = $('#password-textfield').val();
    
    console.info(username);
    console.info(password);
    
   IO.db.login(username, password);
    
});


//Event handler for login button click (No DB - for testing)
//$("#login-button").click(function() {
//   $(location).attr('href', determinePath() + "dashboard.html");
//});

//TODO END -----------------------------------------------
