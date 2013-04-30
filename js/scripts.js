"use strict";

//Add the events at the loading of the page
window.onload = function() {
    //Using Modernizr to verify if the browser support canvas & FileApi
    if (Modernizr.canvas && !!window.FileReader) {

        //Since we are using HTML5, we don't have to support < IE9 (no attachEvent)
        document.getElementById("fileImage").addEventListener("change", loadImage);
        document.getElementById("canvas").addEventListener("mousedown", startDrawOnCanvas);
        document.getElementById("canvas").addEventListener("mouseup", stopDrawOnCanvas);
        document.getElementById("imgSave").addEventListener("click", saveImage);
    }
    else {
        //We disable elements as they can't use it
        document.getElementById("imgSave").disabled = true;
        document.getElementById("fileImage").disabled = true;
    }
};

//Load the image from the file input, and draw it to the canvas
function loadImage() {
    var canvas = document.getElementById("canvas");
    canvas.style.visibility = "visible";

    var htmlImage = document.getElementById("image");
    htmlImage.style.visibility = "hidden";

	var reader = new FileReader();

    reader.readAsDataURL(document.getElementById('fileImage').files[0]);

	reader.onload = (function(e) {
        var image = new Image();
        image.src = e.target.result;

        image.onload = (function() {
            //Get the Canvas, and set the size of the images we got
            canvas.height = image.height;
            canvas.width = image.width;

            //Set the image element to the same size
            htmlImage.height = image.height;
            htmlImage.width = image.width;

            var context = canvas.getContext("2d");
            context.drawImage(image, 10, 10);
        });
    });
}

//Start the drawing on the canvas
function startDrawOnCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.style.cursor = "pointer";
    canvas.addEventListener("mousemove", drawOnCanvas);
}

//Stop the drawing on the canvas
function stopDrawOnCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.style.cursor = "default";
    canvas.removeEventListener("mousemove", drawOnCanvas);
}

//Draw on the canvas
function drawOnCanvas(e) {
    var canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext("2d");

    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;

    context.beginPath();
    context.arc(posX, posY, 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

//Saving the image
function saveImage() {
    /*
    image.replace("image/png", "image/octet-stream");
    window.location.href = image;
    */

    var canvas = document.getElementById("canvas");

    var htmlImage = document.getElementById("image");
    htmlImage.src = canvas.toDataURL("image/png");

    //canvas.parentNode.removeChild(canvas);
    htmlImage.style.visibility = "visible";
    canvas.style.visibility = "hidden";
}