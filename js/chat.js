//Chat Controller Object
var ChatController = {
    
    //Keep track of all the messages in the gameroom chatlog
    "chatString": '',
    
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
            
            if (ChatController.chatString == '') {
               ChatController.chatString += 'User: ' + document.getElementById("chat-bar").value;
            }
            else {
                ChatController.chatString += '<br>User: ' + document.getElementById("chat-bar").value;
            }
            
            ChatController.Util.updateChatLog();
            ChatController.Util.clearChatTextField();
        }
        
    },
    
    //Event handlers for chat controls
    "Events": {
        
        "addAll": function() {
            
            //Post chat event handler
            $('#chat-post').click(function() {
                ChatController.Controls.postDebug();
            })
            
            //When enter is pressed, check if chat is focused to post to chat
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
            ChatController.chatLog.innerHTML = ChatController.chatString;
        },
        
        "clearChatTextField": function() {
            ChatController.chatTextField.value = '';
        }
        
    },
    
    //Initialization call to set up ChatController Object
    "Init": function() {
        
        ChatController.Events.addAll();
        
    }    
}

$(document).ready(function() {
    
    ChatController.Init();
    
    
    //Temporarily disable form submit on 'Enter' to stop page from reloading
    //TODO: Replace this with proper form submission to PHP
//    $('#chat-bar').on('keypress', function(e) {
//        return e.which !== 13;
//    });
    
    
})
    
    