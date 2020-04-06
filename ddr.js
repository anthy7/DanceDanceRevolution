var slideColours = ["#ff7070", "#fff07d", "#a6f0ff", "#a6ffaa"];

var hitboxColours = ["#b84040", "#f7d034", "#59baff", "#189e5f"];

var slideSpaces = [];

var directions = ["left", "down", "up", "right"];

newArrow = null;

speed = 8;

function setup() {
  createCanvas(400, 400);
  stroke(255);
  strokeWeight(3);
  frameRate(60);

  for (i = 0; i < 4; i++) {
    slideSpaces[i] = new SlideSpace(slideColours[i], i * 100, 0, 100, 400);
  }
  left = new Arrow('left', 20, 20);
  right = new Arrow('right', 320, 20);
  down = new Arrow('down', 120, 20);
  up = new Arrow('up', 220, 20);

}


function draw() {
  background(220);
  console.log(frameCount);
  for (i = 0; i < 4; i++) {
    slideSpaces[i].drawSlideSpace();
    slideSpaces[i].drawHitBox(hitboxColours[i]);
  }

  if (frameCount % 60 == 0) {
    var randSpawn = Math.floor(Math.random() * 4);
    newArrow = new Arrow(directions[randSpawn]);
  }
  if (newArrow != null) {
    newArrow.drawArrow(200, 200);

  }

}

class Arrow {
  constructor(type) {
    this.type = type;
  }

  drawArrow(x, y) {
    fill(255);
    // Left arrow
    if (this.type == 'left') {
      beginShape();
      vertex(x + 60, y + 20);
      vertex(x + 30, y + 20);
      vertex(x + 30, y);
      // Point
      vertex(x, y + 30);
      vertex(x + 30, y + 60);
      vertex(x + 30, y + 40);
      vertex(x + 60, y + 40);
      endShape(CLOSE);

      // Down arrow
    } else if (this.type == 'down') {
      beginShape();
      vertex(x + 20, y);
      vertex(x + 40, y);
      vertex(x + 40, y + 35);
      vertex(x + 60, y + 35);
      vertex(x + 30, y + 60);
      vertex(x, y + 35);
      vertex(x + 20, y + 35);
      endShape(CLOSE);


      // Up arrow
    } else if (this.type == 'up') {
      beginShape();
      vertex(x + 20, y + 60);

      vertex(x + 40, y + 60);
      vertex(x + 40, y + 35);
      vertex(x + 60, y + 35);
      vertex(x + 30, y);
      vertex(x, y + 35);
      vertex(x + 20, y + 35);
      endShape(CLOSE);

      // Right arrow
    } else {
      beginShape();
      vertex(x, y + 20);
      vertex(x + 30, y + 20);
      vertex(x + 30, y);
      // Point
      vertex(x + 60, y + 30);
      vertex(x + 30, y + 60);
      vertex(x + 30, y + 40);
      vertex(x, y + 40);
      endShape(CLOSE);
    }

  }
}

class SlideSpace {
  constructor(colour, x, y) {
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  drawSlideSpace() {
    fill(color(this.colour));
    rect(this.x, this.y, 100, 400);
  }

  drawHitBox(colour) {
    fill(color(colour));
    rect(this.x + 10, this.y + 10, 80, 80);
  }

}
