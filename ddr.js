var slideColours = ["#ff7070", "#fff07d", "#a6f0ff", "#a6ffaa"];

var hitboxColours = ["#b84040", "#f7d034", "#59baff", "#189e5f"];

var slideSpaces = [];

var directions = ["left", "down", "up", "right"];

newArrow = null;

speed = 10;
arrowIsOnHitbox(slidespace, arrow);
score = 0;
combo = 0;
congrats = "miss";


function setup() {
  createCanvas(400, 400);
  stroke(255);
  strokeWeight(3);
  frameRate(60);

  for (i = 0; i < 4; i++) {
    slideSpaces[i] = new SlideSpace(slideColours[i], i * 100, 0, 100, 400);
  }
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
    newArrow.drawArrow(newArrow.x, newArrow.y);
    newArrow.y -= speed;
  }



}

class Arrow {
  constructor(type) {
    this.type = type;
    if (type == 'left') {
      this.x = 20;

    } else if (type == 'down') {
      this.x = 120;

    } else if (type == 'up') {
      this.x = 220;

    } else {
      this.x = 320;
    }

    this.y = 400;
    this.size = 60;
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
    this.hitboxX = x + 10;
    this.hitboxY = y + 10;
    this.hitboxSize = 80;
  }

  drawSlideSpace() {
    fill(color(this.colour));
    rect(this.x, this.y, 100, 400);
  }

  drawHitBox(colour) {
    fill(color(colour));
    rect(this.hitboxX, this.hitboxY, this.hitboxSize, this.hitboxSize);
  }
  
  arrowIsOnHitbox(arrow) {
    if (arrow.y >= this.hitboxY && arrow.y <= (this.hitboxY + this.hitboxSize)) {
      score += 200;
      combo++;
      congrats = "perfect";
    
    } else if (arrow.y >= (this.hitboxY - 10) && arrow.y <= (this.hitboxY + hitboxSize + 10) {
      
    }
    
  }

}

