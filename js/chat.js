var Chatbox = {
    
     //Keep track of all the messages in the gameroom chatlog
    "chatString": '',
    
}

//Chat Controller Object
var ChatController = {
    
    "chatLog": document.getElementById('chat-log'),
    "chatTextField": document.getElementById('chat-bar'),
    
    
    //Controls for chat log
    "Controls": {
        
        //Post new chat to chatlog
        "post": function() {
            //TODO: Hook this up to the backend
        },
        
        //Placeholder function for posting to chat (for testing)
        "postDebug": function() {
            
            if (Chatbox.chatString == '') {
               Chatbox.chatString += 'User: ' + document.getElementById("chat-bar").value;
            }
            else {
                Chatbox.chatString += '<br>User: ' + document.getElementById("chat-bar").value;
            }
            
            //Update chat log and clear text field
            ChatController.Util.updateChatLog();
            ChatController.Util.clearChatTextField();
            
            //Scroll user to bottom of chat log on each submission
            $(ChatController.chatLog).scrollTop($(ChatController.chatLog)[0].scrollHeight); 
            
            ChatController.Util.bindData();
        }
        
    },
    
    //Event handlers for chat controls
    "Events": {
        
        "addAll": function() {
            
            //When 'enter' is pressed and chat is focused, post to chat
            $(document).keypress(function(e) {
                if(e.which == 13 && $("#chat-bar").is(':focus') && document.getElementById("chat-bar").value != '') {
                    
                    ChatController.Controls.postDebug();
                }
            }) 
        }     
    },
    
    //Utility calls for ChatController Object
    "Util": {
        
        "updateChatLog": function() {
            ChatController.chatLog.innerHTML = Chatbox.chatString;
        },
        
        "clearChatTextField": function() {
            ChatController.chatTextField.value = '';
        },
        
        "bindData": function() {
            Gameroom.Chatbox = Chatbox;
            GameroomController.Util.updateServer();
        }
        
    },
    
    //Initialization call to set up ChatController Object
    "Init": function() {

        ChatController.Events.addAll();
        ChatController.Util.updateChatLog();
        
    }    
}

//$(document).ready(function() {
//    
//    ChatController.Init();
//    
//    
//})
//    
    