const carCanvas = document.getElementById("carCanvas");
// carCanvas.height = window.innerHeight; // Making the carCanvas stretch through the whole window to make it look like a road.
carCanvas.width = 200;

// Visualizing the neural Network
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3)];

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);

  carCanvas.height = window.innerHeight; // If we move this line here it does not make it trail the car since it animates many a times per second and also it solves the scaling problem.
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -car.y + carCanvas.height * 0.7); // keeps car ~70% down the screen

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  car.draw(carCtx, "blue");

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate); // This calls the the user defined animation frame many times per second. It gives the illusion of movement.
}
