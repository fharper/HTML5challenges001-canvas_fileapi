"use strict";

window.onload = function() {
    document.getElementById("imgButton").addEventListener("click", loadImage);
};

//Load the image from the file input, and draw it to the canvas
function loadImage() {

    //Using Modernizr to verify if the browser support canvas & FileApi
    if (Modernizr.canvas && !!window.FileReader) {
    	var reader = new FileReader();

        reader.readAsDataURL(document.getElementById('image').files[0]);

    	reader.onload = (function(e) {
            var image = new Image();
            image.src = e.target.result;

            image.onload = (function() {
                //Get the Canvas, and set the size of the images we got
                var canvas = document.getElementById("canvas");
                canvas.height = image.height;
                canvas.width = image.width;

                var context = canvas.getContext("2d");
                context.drawImage(image, 10, 10);
            });
        });
    }
    else {
        window.alert("Canvas or File API not supported");
    }
}