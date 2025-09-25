class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.accleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    this.#move();
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.accleration;
    }

    if (this.controls.reverse) {
      this.speed -= this.accleration;
    }

    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // This is implementing the reverse max speed. Since we do not want the car to go into reverse very faster we cap it at maxSpeed / 2
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // Implementing Friction
    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    // This is for the reverse friction to give the pull of forward pulling in case of backwoard moving
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    // Now if we look carefully, once we start moving this, even if it seems stopped it is actually moving at a very small rate
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0; // This is stop the car entiirely
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? -1 : 1;

      if (this.controls.left) {
        this.angle -= 0.03 * flip;
      }

      if (this.controls.right) {
        this.angle += 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    // We subtract half the width and the height so that (x, y) is at the center of the car and not on the top left corner
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}
