const carCanvas = document.getElementById("carCanvas");
// carCanvas.height = window.innerHeight; // Making the carCanvas stretch through the whole window to make it look like a road.
carCanvas.width = 300;

// Visualizing the neural Network
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 500;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 1;
const cars = generateCars(N);
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 3, getRandomColor()),
  new Car(road.getLaneCenter(1), -800, 30, 50, "DUMMY", 3, getRandomColor()),
];

let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.2);
    }
  }
}

animate();

function save() {
  console.log("SAVING, car no", cars.indexOf(bestCar));
  localStorage.setItem("bestBrain", JSON.stringify(cars[0].brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    // Change "AI" to "KEYS" to control the car manually
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }

  return cars;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  carCanvas.height = window.innerHeight; // If we move this line here it does not make it trail the car since it animates many a times per second and also it solves the scaling problem.
  networkCanvas.height = window.innerHeight;

  carCtx.save();

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7); // keeps car ~70% down the screen

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }

  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true); //We only draw the sensors of the first car

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate); // This calls the the user defined animation frame many times per second. It gives the illusion of movement.
}
