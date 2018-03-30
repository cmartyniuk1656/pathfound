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
            success: function (response) {}
        });

    },
    
    "read": function (jsonObj) {

        
        var objType = jsonObj.objType;
        var dataString = JSON.stringify(jsonObj);
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
            success: function (response) {}
        });

    },

}