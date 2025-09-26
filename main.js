const canvas = document.getElementById("mycanvas");
// canvas.height = window.innerHeight; // Making the canvas stretch through the whole window to make it look like a road.
canvas.width = 200;

// Drawing the car
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate() {
  car.update(road.borders);

  canvas.height = window.innerHeight; // If we move this line here it does not make it trail the car since it animates many a times per second and also it solves the scaling problem.

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7); // keeps car ~70% down the screen

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate); // This calls the the user defined animation frame many times per second. It gives the illusion of movement.
}
