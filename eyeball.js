// Get the canvas and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Load the image to follow the mouse
const img = new Image();
img.src = 'eyeball.png'; // Replace with your image URL

// Set the ellipse dimensions and position
const ellipseX = canvas.width / 2;
const ellipseY = canvas.height / 2;
const ellipseRadiusX = 300;
const ellipseRadiusY = 200;

// Update the image position on the canvas based on the mouse position
function updateImagePosition(mouseX, mouseY) {
	// Check if the mouse is inside the ellipse
	const dx = (mouseX - ellipseX) / ellipseRadiusX;
	const dy = (mouseY - ellipseY) / ellipseRadiusY;
	if (dx * dx + dy * dy <= 1) {
		// Draw the image at the mouse position
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, mouseX - img.width / 2, mouseY - img.height / 2);
	} else {
		// Calculate the angle between the mouse and the center of the ellipse
		const angle = Math.atan2(mouseY - ellipseY, mouseX - ellipseX);

		// Calculate the edge point of the ellipse that the image should be drawn at
		const edgeX = ellipseX + ellipseRadiusX * Math.cos(angle);
		const edgeY = ellipseY + ellipseRadiusY * Math.sin(angle);

		// Draw the image at the edge point of the ellipse, rotated to face the mouse
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(edgeX, edgeY);
		ctx.rotate(angle);
		ctx.drawImage(img, -img.width / 2, -img.height / 2);
		ctx.restore();
	}
}

// Add an event listener for the mousemove event on the canvas
canvas.addEventListener('mousemove', (e) => {
	const mouseX = e.clientX - canvas.offsetLeft;
	const mouseY = e.clientY - canvas.offsetTop;
	updateImagePosition(mouseX, mouseY);
});

// Draw the ellipse on the canvas
ctx.beginPath();
ctx.ellipse(ellipseX, ellipseY, ellipseRadiusX, ellipseRadiusY, 0, 0, 2 * Math.PI);
ctx.stroke();
