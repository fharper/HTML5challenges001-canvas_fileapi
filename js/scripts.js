"use strict";



window.onload = function() {
    //Since we are using HTML5, we don't have to support < IE9 (no attachEvent)
    document.getElementById("imgButton").addEventListener("click", loadImage);
    document.getElementById("canvas").addEventListener("mousedown", startDrawOnCanvas);
    document.getElementById("canvas").addEventListener("mouseup", stopDrawOnCanvas);
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

function startDrawOnCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.style.cursor = "pointer";
    canvas.addEventListener("mousemove", drawOnCanvas);
}

function stopDrawOnCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.style.cursor = "default";
    canvas.removeEventListener("mousemove", drawOnCanvas);
}

function drawOnCanvas(e) {
    var canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext("2d");

    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;

    context.fillRect(mouseX, mouseY, 5, 5);
}