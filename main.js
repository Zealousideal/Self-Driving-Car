const canvas = document.getElementById("mycanvas");
// canvas.height = window.innerHeight; // Making the canvas stretch through the whole window to make it look like a road.
canvas.width = 200;

// Drawing the car
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight; // If we move this line here it does not make it trail the car since it animates many a times per second and also it solves the scaling problem.
  car.draw(ctx);
  requestAnimationFrame(animate); // This calls the the user defined animation frame many times per second. It gives the illusion of movement.
}
