const canvas = document.getElementById("boundary");
const ctx = canvas.getContext("2d");

// Set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up image and boundary variables
const image = new Image();
image.src = "./assets/eyecloseup_pupil_sclera.png";
image.id = "pupil_sclera";

const boundaryWidth = 250/1.7;
const boundaryHeight = 200/1.7;
const boundaryX = canvas.width / 2 - boundaryWidth / 2;
const boundaryY = canvas.height / 2 - boundaryHeight / 2;

// Calculate center of boundary
const boundaryCenterX = boundaryX + boundaryWidth / 2;
const boundaryCenterY = boundaryY + boundaryHeight / 2;

// Set up variables for image position
let imageX = boundaryCenterX;
let imageY = boundaryCenterY;

// Add event listener to track mouse position
canvas.addEventListener("mousemove", (e) => {
    // Calculate distance between mouse and boundary center
    const distanceX = e.clientX - boundaryCenterX;
    const distanceY = e.clientY - boundaryCenterY-70-70;
    const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Check if mouse is inside boundary
    if (
    distanceX ** 2 / (boundaryWidth / 2) ** 2 +
        distanceY ** 2 / (boundaryHeight / 2) ** 2 <=
    1
    ) {
    // Move image to mouse position
    imageX = e.clientX;
    imageY = e.clientY-70-70;
    image.style.zIndex = 10;
    
    
    } else {
    // Move image back to center of boundary
    const angle = Math.atan2(distanceY, distanceX);
    imageX = boundaryCenterX + (boundaryWidth / 2) * Math.cos(angle);
    imageY = boundaryCenterY + (boundaryHeight / 2) * Math.sin(angle);
    image.style.zIndex = 10;
    }
});

// Update canvas every 60 frames per second
setInterval(() => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw boundary
    ctx.beginPath();
    ctx.ellipse(
    boundaryCenterX,
    boundaryCenterY,
    boundaryWidth / 2,
    boundaryHeight / 2,
    0,
    0,
    Math.PI * 2
    );
    ctx.stroke();

    // Draw image
    ctx.drawImage(
    image,
    imageX - image.width / 2,
    imageY - image.height / 2
    );
    image.setAttribute("id", "pupil_sclera");
$('pupil_sclera').css("zindex", "100");
    console.log(imageX, imageY);

}, 1000 / 60);

const resize = document.getElementById('eyeShine');
const xSlider = document.getElementById('left');
const ySlider = document.getElementById('top');

function updateImagePosition() {
    const x = xSlider.value;
    const y = ySlider.value;
    resize.style.transform = `translate(${x}px, ${y}px)`;
}

xSlider.addEventListener('input', updateImagePosition);
ySlider.addEventListener('input', updateImagePosition);