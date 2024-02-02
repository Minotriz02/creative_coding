const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const sketch = () => {
  let circles = [];
  for (let i = 0; i < 100; i++) {
    circles.push(
      new Circle(Math.random() * 2048, Math.random() * 2048, Math.random() * 20)
    );
  }
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    for (let i = 0; i < circles.length; i++) {
      const circle1 = circles[i];
      for (let j = 1; j < circles.length; j++) {
        const circle2 = circles[j];

        const dist = getDistance(circle1, circle2);
        if (dist < 250) {
          context.lineWidth = 10 - dist / 25;
          context.beginPath();
          context.moveTo(circle1.x, circle1.y);
          context.lineTo(circle2.x, circle2.y);
          context.stroke();
        }
      }
    }
    context.lineWidth = 12;
    circles.forEach((circle) => {
      circle.draw(context);
      circle.move();
      circle.bounce(width, height);
    });
  };
};

const getDistance = (circle1, circle2) => {
  return Math.sqrt(
    Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)
  );
};

canvasSketch(sketch, settings);

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 2;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "white";
    context.fill();
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  bounce(width, height) {
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.velocityX *= -1;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.velocityY *= -1;
    }
  }
}
