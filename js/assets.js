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
    "selectedUserAsset": '',
    
    "assetSelected": false,
    "userAssetSelected": false,
    "userAssetSelectedDiv": {},
    "selectedAssetDiv": {},
    
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
                    $('#user-assets').slideUp("slow");
                    $('#upload-assets').slideUp("slow");
                });
            })
            
            $('#misc-asset-btn').click(function() {
                $( "#misc-assets" ).slideToggle( "slow", function() {
                    $('#character-assets').slideUp("slow");
                    $('#user-assets').slideUp("slow");
                    $('#upload-assets').slideUp("slow");
                });
            })
            
            $('#user-image-btn').click(function() {
                $( "#user-assets" ).slideToggle( "slow", function() {
                    $('#character-assets').slideUp("slow");
                    $('#misc-assets').slideUp("slow");
                    $('#upload-assets').slideUp("slow");
                });
            })
            
            $('#upload-img-btn').click(function() {
                $( "#upload-assets" ).slideToggle( "slow", function() {
                    $('#character-assets').slideUp("slow");
                    $('#user-assets').slideUp("slow");
                    $('#misc-assets').slideUp("slow");
                });
            })
            
            $('#upload-img-submit-btn').click(function() {
                $('#user-asset-submit').trigger('click');
                setTimeout(function(){IO.db.getUserImages(User.username)}, 500);
            })
            
            $('#upload-map-submit-btn').click(function() {
                $('#user-map-submit-btn').trigger('click');
                setTimeout(function(){IO.db.getMapImages(User.username)}, 500);
            })
            
            AssetController.Events.mapAssetEvents();     
            AssetController.Events.userAssetEvents(); 
        },
        
        "mapAssetEvents": function(){
            
            //Zoom in event handler
            $('.map-asset').click(function() {
                
                AssetController.userAssetSelected = false;
                AssetController.selectedUserAsset = '';
                $('.user-asset').removeClass('selected');
                AssetController.selectedUserAssetDiv = {};
                
                if (!AssetController.assetSelected) {
                    
                    AssetController.assetSelected = true;
                    AssetController.selectedAsset = $(this).attr("data-assetpath");
                    AssetController.selectedAssetDiv = $(this);
                    $(this).addClass('selected');
            
                }
                
                else {
                    
                    var selectedPath = $(this).attr("data-assetpath");
                    var recordedPath = $(AssetController.selectedAssetDiv).attr('data-assetpath');
                    console.info(selectedPath);
                    
                    if (recordedPath == selectedPath) {
                        
                        AssetController.assetSelected = false;
                        AssetController.selectedAsset = '';
                        AssetController.selectedAssetDiv = {};
                        $(this).removeClass('selected');
                        
                    }
                    else {
                        
                        $(AssetController.selectedAssetDiv).removeClass('selected');
                        AssetController.selectedAsset = $(this).attr("data-assetpath");
                        AssetController.selectedAssetDiv = $(this);
                        $(this).addClass('selected');
                        
                    }
                    
                }
            
            })
        },
        
        "userAssetEvents": function() {
            
            $('.user-asset img').click(function() {
                
            AssetController.assetSelected = false;
            AssetController.selectedAsset = '';
            $('.map-asset').removeClass('selected');
                
            
            if (!AssetController.userAssetSelected) {
                    
                    var index = $(this).attr("data-index");
                    console.info(index);
                
                    
                    AssetController.userAssetSelected = true;
                    AssetController.selectedUserAsset = $(this).attr("src");
                    AssetController.userAssetSelectedDiv = $(".user-asset[data-index='" + index +"']");
                    $(".user-asset[data-index='" + index +"']").addClass('selected');
            
                }
                
                else {
                    var index = $(this).attr("data-index");
                    var parent = $(".user-asset[data-index='" + index +"']");
                    if ($(AssetController.userAssetSelectedDiv).attr('data-index') == $(parent).attr('data-index')) {
                        
                        console.info('equal');
                        
                        AssetController.userAssetSelected = false;
                        AssetController.selectedUserAsset = '';
                        AssetController.userAssetSelectedDiv = {};
                        parent.removeClass('selected');
                        
                    }
                    else {
                        
                        $(AssetController.userAssetSelectedDiv).removeClass('selected');
                        AssetController.selectedUserAsset = $(this).attr("src");
                        AssetController.userAssetSelectedDiv = $(".user-asset[data-index='" + index +"']");
                        $(AssetController.userAssetSelectedDiv).addClass('selected');
                        
                    }
                }
            
            })
        }
    },
    
    
    "Init": function() {
        AssetController.Events.addAll();
        $('#userName-value').val(User.username);
    }
    
    
}

$(document).ready(function() {
    
    AssetController.Init();
    
})