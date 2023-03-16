const canvas = document.getElementById("boundary");
const ctx = canvas.getContext("2d");

// Set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up image and boundary variables
const image = new Image();
image.src = "./assets/eyecloseup_pupil_sclera.png";
image.id = "pupil_sclera";

const eyeReflect = new Image();
eyeReflect.src = "./assets/eyecloseup_pupil_reflect_side.png";
image.id = "reflect";

const boundaryWidth = 250/1.2;
const boundaryHeight = 200/2.4;
const boundaryX = canvas.width / 2 - boundaryWidth / 2;
const boundaryY = canvas.height / 2 - boundaryHeight / 2;

let topOffset = 0
canvas.style.top = topOffset + "px";

// Calculate center of boundary
const boundaryCenterX = boundaryX + boundaryWidth / 2-310;
const boundaryCenterY = boundaryY + boundaryHeight / 2 + topOffset + 60;

// Set up variables for image position
let imageX = boundaryCenterX;
let imageY = boundaryCenterY;

let reflectX = boundaryCenterX + 30 + 10;
let reflectY = boundaryCenterY - 30 - 7;

// Add event listener to track mouse position
window.scrollTo({top:300,left: 30, behavior: 'smooth'});
canvas.addEventListener("mousemove", (e) => {
    let mouseX = (e.clientX-327);
    let mouseY = (e.clientY-40);

    // Calculate distance between mouse and boundary center
    const distanceX = mouseX - boundaryCenterX;
    const distanceY = mouseY - boundaryCenterY;
    const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Check if mouse is inside boundary
    if (
    distanceX ** 2 / (boundaryWidth / 2) ** 2 +
        distanceY ** 2 / (boundaryHeight / 2) ** 2 <= 1.1
    ) {// give some leeway so the eye doesn't snap to boundary
    // Move image to mouse position
    imageX = mouseX;
    imageY = mouseY;
    image.style.zIndex = 10;
    reflectX = mouseX + 30 + 10 + 4;
    reflectY = mouseY - 30 - 4;
    
    } else {
    // Move image back to center of boundary
    const angle = Math.atan2(distanceY, distanceX);
    imageX = boundaryCenterX + (boundaryWidth / 2) * Math.cos(angle);
    imageY = boundaryCenterY + (boundaryHeight / 2) * Math.sin(angle);
    reflectX = boundaryCenterX + (boundaryWidth / 2) * Math.cos(angle)+ 30 + 10;
    reflectY = boundaryCenterY + (boundaryHeight / 2) * Math.sin(angle)-30 - 7;
    image.style.zIndex = 10;
    }
});

// Update canvas every 60 frames per second
setInterval(() => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw boundary
    /*ctx.beginPath();
    ctx.ellipse(
    boundaryCenterX,
    boundaryCenterY,
    boundaryWidth / 2,
    boundaryHeight / 2,
    0,
    0,
    Math.PI * 2
    );
    ctx.stroke();*/

    // Draw image
    ctx.drawImage(
    image,
    imageX - image.width / 2,
    imageY - image.height / 2
    );
    image.setAttribute("id", "pupil_sclera");
    $('pupil_sclera').css("zindex", "100");
    ctx.drawImage(eyeReflect, reflectX - eyeReflect.width/2, reflectY - eyeReflect.height/2);
    eyeReflect.setAttribute("id", "reflect");
    $('reflect').css("zindex", "101");

}, 1000 / 60);
/*
const resize = document.getElementById('eyeShine');
const xSlider = document.getElementById('left');
const ySlider = document.getElementById('top');

function updateImagePosition() {
    const x = xSlider.value;
    const y = ySlider.value;
    resize.style.transform = `translate(${x}px, ${y}px)`;
}

xSlider.addEventListener('input', updateImagePosition);
ySlider.addEventListener('input', updateImagePosition);*/

var eye = document.getElementById("eyeLid");
var images = ["./assets/eyecloseup_lid_open(3).png", "./assets/eyecloseup_lid_closing(2).png", "./assets/eyecloseup_lid_closed(1).png"]; // Array of images
var currentState = 0;
var reverse = false;

// Define a function that updates the eye image
function updateImage() {
    if (currentState === images.length - 1) {
        reverse = true; // Reverse the animation if the last image is reached
    } else if (currentState === 0) {
        reverse = false; // Reset the animation if the first image is reached again
    }

    if (!reverse) {
        currentState++;
        
    } else {
        currentState--;
    }

    if(currentState == 2){
        setTimeout(function(){}, 1);
    }

    eye.style.backgroundImage = "url('" + images[currentState] + "')";
    $('eyeLid').css("zindex","411");
}
setInterval( function() {
    var nestedInterval = setInterval(updateImage, 80);

    setTimeout(function () {
        clearInterval(nestedInterval);
    }, 640);
},10000);