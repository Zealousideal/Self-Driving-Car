mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;

// Points

const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const ctx = mycanvas.getContext("2d");

let angle = 0;
const mouse = { x: 0, y: 0 };
document.onmousemove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};
animate();

function animate() {
  const radius = 50;
  A.x = mouse.x + Math.cos(angle) * radius;
  A.y = mouse.y - Math.sin(angle) * radius;
  B.x = mouse.x - Math.cos(angle) * radius;
  B.y = mouse.y + Math.sin(angle) * radius;

  angle += 0.02;

  ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.moveTo(C.x, C.y);
  ctx.lineTo(D.x, D.y);
  ctx.stroke();

  // Function to define dots
  const points = [A, B, C, D];
  for (let i = 0; i < points.length; i++) {
    defDots(points[i], String.fromCharCode(65 + i)); //defdot(Point, label)
  }

  const I = getIntersection(A, B, C, D);
  if (I) {
    defDots(I, "I");
  }

  requestAnimationFrame(animate);
}
