//Control Panel Controller Object
var ControlPanel = {
    
    //Keep track of what tab the user is on
    "selectedTabIndex": 1,
    
    
    //Controls control panel
    "Controls": {
        
    },
    
    //Event listeners for control panel
    "Events": {
        
        "addAll": function() {
            
            //Add event listener for first tab button in control panel
            $('#control-panel-tab-1-btn').click(function() {
                $('#control-panel-tab-1').removeClass('hidden');
                $('#control-panel-tab-2').addClass('hidden');
                $('#control-panel-tab-3').addClass('hidden');
            })
            
            //Add event listener for second tab button in control panel
            $('#control-panel-tab-2-btn').click(function() {
                $('#control-panel-tab-2').removeClass('hidden');
                $('#control-panel-tab-1').addClass('hidden');
                $('#control-panel-tab-3').addClass('hidden');
            })
            
            //Add event listener for third tab button in control panel
            $('#control-panel-tab-3-btn').click(function() {
                $('#control-panel-tab-3').removeClass('hidden');
                $('#control-panel-tab-1').addClass('hidden');
                $('#control-panel-tab-2').addClass('hidden');
            })
            
            $('#resize-map-btn').click(function() {
                MapController.Util.resizeGrid();
            })
        }
    },
    
    //Utitlity functions for control panel
    "Util": {
        
    },
    
    //
    "Init": function() {
        ControlPanel.Events.addAll();
    }
}


$(document).ready(function() {
    
    ControlPanel.Init();
    
})

