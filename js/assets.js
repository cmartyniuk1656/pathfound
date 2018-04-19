var AssetList = {
    
    "assets": {
        
        "maps": [],
        
        "tokens": [{
        
        "name": 'Test Asset',
        "path": '/assets/images/test-img.png'
    
    }]
        
    }
        

}

var AssetController = {
    
    "selectedAsset": '',
    
    "assetSelected": false,
    
    "Controls": {},
    
    "Util": {
        
        "getAllAssets": function() {
            
        }
        
    },
    
    "Events": {
      
        "addAll": function() {
            

            $('#character-asset-btn').click(function() {
                $( "#character-assets" ).slideToggle( "slow", function() {
                    $('#misc-assets').slideUp("slow");
                });
            })
            
            $('#misc-asset-btn').click(function() {
                $( "#misc-assets" ).slideToggle( "slow", function() {
                    $('#character-assets').slideUp("slow");
                });
            })
            
            AssetController.Events.mapAssetEvents();            
        },
        
        "mapAssetEvents": function(){
            
            //Zoom in event handler
            $('.map-asset').click(function() {
                
                if (!AssetController.assetSelected) {
                    
                    AssetController.assetSelected = true;
                    AssetController.selectedAsset = $(this).attr("data-assetpath");
                    $(this).addClass('selected');
            
                }
                
                else {
                    AssetController.assetSelected = false;
                    AssetController.selectedAsset = '';
                    $(this).removeClass('selected');
                }
            
            })
        }
        
    },
    
    
    "Init": function() {
        AssetController.Events.addAll();
    }
    
    
}

$(document).ready(function() {
    
    AssetController.Init();
    
})