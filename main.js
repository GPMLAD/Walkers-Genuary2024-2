const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resizeScreen = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

resizeScreen();
window.addEventListener("resize", resizeScreen);

class Walker {
  constructor() {
    this.position = { x: canvas.width / 2, y: canvas.height / 2 };
    this.size = 3;
    this.stepSize = this.size * 2;
    this.color = Math.floor(Math.random() * 360);
    this.previousPosition = { x: null, y: null };
  }

  update() {
    const dice = Math.floor(Math.random() * 4);

    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
    switch (dice) {
      case 0:
        this.position.x += this.stepSize;
        break;
      case 1:
        this.position.x -= this.stepSize;
        break;
      case 2:
        this.position.y += this.stepSize;
        break;
      case 3:
        this.position.y -= this.stepSize;
        break;
      default:
        break;
    }
    this.draw();
    this.color += 0.5;
  }

  draw() {
    if (this.previousPosition.x == null || this.previousPosition.y == null) {
      return;
    }
    ctx.strokeStyle = `hsl(${this.color},100%, 50%)`;
    //ctx.lineWidth = this.stepSize;
    ctx.beginPath();
    ctx.moveTo(this.previousPosition.x, this.previousPosition.y);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();
  }
}

let walkers = [];

const init = (arr, num) => {
  for (let i = 0; i < num; i++) {
    arr.push(new Walker());
  }
};

init(walkers, 100);

const animate = () => {
  walkers.forEach((walker) => {
    walker.update();
  });
  requestAnimationFrame(animate);
};
animate();
