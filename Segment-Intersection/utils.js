// Defining the points
function defDots(point, label, isRed) {
  ctx.beginPath();
  ctx.fillStyle = isRed ? "red" : "yellow";
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = " 20px Arial";
  ctx.fillText(label, point.x, point.y);
}

function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
  /*
  So in lerp terms to define the point of intersection we can say that :
  Ix = Ax + (Bx - Ax)t = Cx + (Dx - Cx)u
  Iy = Ay + (By - Ay)t = Cy + (Dy - Cy)u

  Now if we equate both the equations we get
  Ax + (Bx - Ax)t = Cx + (Dx - Cx)u  ----(1)
  Ay + (By - Ay)t = Cy + (Dy - Cy)u  ----(2)

  Subracting Cx from (1) and Cy from (2) we get
  (Ax - Cx) + (Bx - Ax)t = (Dx - Cx)u  ----(3)
  (Ay - Cy) + (By - Ay)t = (Dy - Cy)u  ----(4)

  At this point to find out t and u we can simply divide By (Dx - Cx) and (Dy - Cy) but both the values can be zero too

  So now from (4) we multiply (Dx - Cx)
  (Ay - Cy)(Dx - Cx) + (By- Ay)(Dx - Cx)t = (Dy - Cy)(Dx - Cx)u

  From this we can substitute the value of (Dx - Cx)u from (4)
  (Ay - Cy)(Dx - Cx) + (By- Ay)(Dx - Cx)t = (Dy - Cy)((Ax - Cx) + (Bx - Ax)t)

  => (Ay - Cy)(Dx - Cx) + (By- Ay)(Dx - Cx)t = (Dy - Cy)(Ax - Cx) + (Dy - Cy)(Bx - Ax)t   [Distributing (Dy - Cy)]

  => (Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx) = (Dy - Cy)(Bx - Ax)t - (Dy - Cy)(Bx - Ax)t
                                            = ((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))t

  =>  t = [(Ay - Cy)(Dx - Cx) - (Dy - Cy)(Ax - Cx)] / ((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))

  Now we can split these into the top and the bottom halves for ease
  top = [(Ay - Cy)(Dx - Cx) - (Dy - Cy)(Ax - Cx)]
  bottom = ((Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay))
  */

  const top = (A.y - C.y) * (D.x - C.x) - (D.y - C.y) * (A.x - C.x);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = top / bottom;
    if (t >= 0 && t <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
      };
    }
  }
}
