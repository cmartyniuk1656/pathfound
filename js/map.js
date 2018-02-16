var scale = 0;
var map = document.getElementById("map");

function zoomInMap(){
   scale++;
   map.style.transform = "scale(1."+ scale +")";
   console.info("clicked");
}

function zoomOutMap(){
   scale++;
   map.style.transform = "scale(1."+ scale +")";
}

$("#zoom-in-btn").click(function() {
    zoomInMap();
});

$(document).ready(function() {
    $("#zoom-in-btn").click(function() {
        console.info("clicked");
        zoomInMap();
});
})