var scale = 0;
var map = document.getElementById("map");

function zoomInMap(){
   console.info(scale);
   scale++;
   map.style.transform = "scale(1."+ scale +")";
   console.info("clicked");
}

function zoomOutMap(){
   console.info(scale);
   scale--;
   map.style.transform = "scale(1."+ scale +")";
}

$(document).ready(function() {
    
    $("#zoom-in-btn").click(function() {
        zoomInMap();
    });

$("#zoom-out-btn").click(function() {
        zoomOutMap();
    });
    
})

