let bubbles = [];
let timer;
let size = [10, 20, 30, 15];
let y;

function setup() {
  bg = loadImage('rainbow.jpg');
  y = height;
  createCanvas(400, 400);
  //For Loop
  for (let i = 0; i < 9; i++) {
    //Random Position
    let positionX = Math.floor(Math.random() * 200);
    let positionY = random(200,500);
    //Random Size based on index
    bubbles[i] = new Bubble(positionX, positionY, size[i]);

    timer = 100;
  }
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].insideBubble() == true) {
      bubbles.splice(i, 1);
    }
  }
}



function draw() {
  background(bg);
  if (millis() > timer) {
    newBubble = new Bubble(random(width), 500, random(10, 50));
    bubbles.push(newBubble);
    timer = timer + 800;
  }

  //For of Loop
  for (let bubble of bubbles) {
    if (bubble.insideBubble() == true) {
      bubble.changeColor(255);
    } else {
      bubble.changeColor(0);
    }
    bubble.move();
    bubble.show();
  }
}


class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.stroke = random(120, 255);
  }

  clicked(mX, mY) {
    let d = dist(mX, mY, this.x, this.y);
    if (d < this.r) {
      this.stroke = 100;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y - 1;
  }

  show() {
    stroke(this.stroke, 255);
    strokeWeight(2);
    fill(this.brightness, 50);
    ellipse(this.x, this.y, this.r * 2);
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  insideBubble() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return (d < this.r);
  }
}
