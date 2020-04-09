var slideColours = ["#ff7070", "#fff07d", "#a6f0ff", "#a6ffaa"];

var hitboxColours = ["#b84040", "#f7d034", "#59baff", "#189e5f"];

var slideSpaces = [];

var directions = ["left", "down", "up", "right"];

function randomArrowType() {
  return directions[Math.floor(Math.random() * 4)];
}
function createArrowPair(type, frame) {
  return [type, frame];
}

// ARROW QUEUE IMPLEMENTATION
var arrowQueue = new Queue();
for (j = 0; j < 50; j++) {
  arrowPair = createArrowPair(randomArrowType(), Math.floor(Math.random() * 60*50));
  arrowQueue.enqueue(arrowPair);
}

newArrow = null;
arrowQueue = new ArrowQueue();

speed = 10;
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
  
  textSize(30);
}


function draw() {
  background(220);
  
  console.log(frameCount);
  for (i = 0; i < 4; i++) {
    slideSpaces[i].drawSlideSpace();
    slideSpaces[i].drawHitBox(hitboxColours[i]);
  }

  if (frameCount % 60 == 0) {
    var randSpawn = randomArrowType();
    newArrow = new Arrow(directions[randSpawn], "#FFFFFF");
  }

  if (newArrow != null) {
    newArrow.drawArrow(newArrow.x, newArrow.y);
    newArrow.y -= speed;
    
    if (newArrow.colour === "#FFFFFF" && newArrow.y < -30) {
      combo = 0;
      congrats = "miss";
    }
  }
  
  
  
  fill(0);
  text(score, 50, 380);
  text(combo, 200, 380);
  text(congrats, 300, 380);
  
  
}

// ARROW IMPLEMENTATION
class Arrow {
  constructor(type, colour) {
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
    this.colour = colour;
  }

  drawArrow(x, y) {
    fill(color(this.colour));
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

// SLIDESPACE IMPLEMENTATION
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
    if (arrow.x != (this.x + 20)) {
      combo = 0;
      congrats = "miss";
      return;
      
    } else if (arrow.y >= this.hitboxY && arrow.y <= (this.hitboxY + this.hitboxSize)) {
      score += 200;
      combo++;
      congrats = "perfect";
       arrow.colour = "#000000";
    
    } else if (arrow.y >= (this.hitboxY - 30) && arrow.y <= (this.hitboxY + this.hitboxSize + 30)) {
      score += 100;
      combo++;
      congrats = "good";
      arrow.colour = "#000000";
    } else {
      combo = 0;
      congrats = "miss";
      arrow.colour = "#000000";
    }
    
  }

}

// ARROW INPUT IMPLEMENTATION
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    slideSpaces[0].arrowIsOnHitbox(newArrow)
  } else if (keyCode === DOWN_ARROW) {
    slideSpaces[1].arrowIsOnHitbox(newArrow);
  } else if (keyCode === UP_ARROW) {
    slideSpaces[2].arrowIsOnHitbox(newArrow);
  } else if (keyCode === RIGHT_ARROW) {
    slideSpaces[3].arrowIsOnHitbox(newArrow);
    
  }
}

