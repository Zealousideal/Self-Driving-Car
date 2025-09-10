// A function that does linear interpolation between A and B. t is a value between 0 and 1
function lerp(A, B, t) {
  return A + (B - A) * t;
}
