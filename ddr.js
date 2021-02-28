// IN COLLABORATION WITH MIRELA TOMICIC!

// EXAMPLE BPMS
// BUTTERFLY - 135
// SNOW HALATION - 173
// DOTA - 144
// K.K. CRUISIN' - 84
const WIDTH = 400
const HEIGHT = 450
const BPM = 84
const FRAMERATE = 30

var slideColours = ["#ff7070", "#fff07d", "#a6f0ff", "#a6ffaa"];
var hitboxColours = ["#b84040", "#f7d034", "#59baff", "#189e5f"];

var arrowColours = {
  hit: "#000000",
  missed: "red",
  active: "#FFFFFF"
}

var slideSpaces = ["", "", "", ""];

const LEFT_TYPE = 0
const DOWN_TYPE = 1
const UP_TYPE = 2
const RIGHT_TYPE = 3

const SPEED = 18

function randomArrowType() {
  return Math.floor(Math.random() * 4);
}

function spawnArrow() {
  var direction = randomArrowType();
  while(slideSpaces[direction].arrow !== null) {
    direction = randomArrowType();
  }
  arrow = new Arrow(direction);
  slideSpaces[direction].setArrow(arrow);
}

var song;
var hit;
var arrowRate;
score = 0;
combo = 0;
congrats = "";

function preload() {
  song = loadSound("assets/cruisin.mp3");
  hit = loadSound("assets/hit.mp3")
}

function setup() {
  song.setVolume(0.5)
  song.loop()
  
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  strokeWeight(3);
  frameRate(FRAMERATE);
  arrowRate = Math.floor((FRAMERATE * 60)/BPM)

  for (i = 0; i < 4; i++) {
    slideSpaces[i] = new SlideSpace(slideColours[i], hitboxColours[i], i * (WIDTH/4), 0);
  }
  
  textSize(30);
}


function draw() {
  
  for (i = 0; i < 4; i++) {
    slideSpaces[i].drawSlideSpace();
  }

  // Spawn arrow at arrow rate
  if (frameCount % arrowRate === 0) {
    spawnArrow();
    if (Math.random() < 0.3){ //30% chance
      spawnArrow();
    }
    
  }
  
  fill(0);
  text(score, 50, 380);
  text(combo, 200, 380);
  text(congrats, 300, 380);
  
}

// ARROW IMPLEMENTATION
class Arrow {
  constructor(type) {
    this.type = type;
    if (type == LEFT_TYPE) {
      this.x = 20;

    } else if (type == DOWN_TYPE) {
      this.x = 120;

    } else if (type == UP_TYPE) {
      this.x = 220;

    } else {
      this.x = 320;
    }
    this.y = HEIGHT;
    this.status = "active"
  }

  drawArrow(x, y) {
    fill(arrowColours[this.status]);
    // Left arrow
    if (this.type == LEFT_TYPE) {
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
    } else if (this.type == DOWN_TYPE) {
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
    } else if (this.type == UP_TYPE) {
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
  
  moveArrow() {
    this.y -= SPEED;
    this.drawArrow(this.x, this.y);
    
    if (this.y < -30) {
      if (this.status == "active") {
        combo = 0;
        congrats = "miss"
      }
      return false;
    }
    return true;
  }
}

// SLIDESPACE IMPLEMENTATION
class SlideSpace {
  constructor(colour, hitboxColour, x, y) {
    this.colour = colour;
    this.hitboxColour = hitboxColour;
    this.x = x;
    this.y = y;
    this.arrow = null;
    this.hitboxX = x + 10;
    this.hitboxY = y + 10;
    this.hitboxSize = 80;
  }

  drawSlideSpace() {
    fill(color(this.colour));
    rect(this.x, this.y, WIDTH/4, HEIGHT);
    fill(color(this.hitboxColour));
    rect(this.hitboxX, this.hitboxY, this.hitboxSize, this.hitboxSize);
    if(this.arrow != null && !this.arrow.moveArrow()) {
      this.arrow = null;
    }
  }
  
  setArrow(arrow) {
    this.arrow = arrow;
  }
  
  arrowIsOnHitbox() {
    if (this.arrow === null || this.arrow.status != "active") {
      return;
    }
    if (this.arrow.y >= this.hitboxY && (this.arrow.y+60)<= (this.hitboxY + this.hitboxSize)) {
      score += 200;
      combo++;
      congrats = "perfect";
      this.arrow.status = "hit"
    } else if (this.arrow.y + 30 >= this.hitboxY && (this.arrow.y+30)<= (this.hitboxY + this.hitboxSize)) {
      score += 100;
      combo++;
      congrats = "good";
      this.arrow.status = "hit";
    } else {
      combo = 0;
      congrats = "miss";
      this.arrow.status = "missed"
    }
  }
}

// ARROW INPUT IMPLEMENTATION
function keyPressed() {
  hit.play();
  if (keyCode === LEFT_ARROW) {
    slideSpaces[LEFT_TYPE].arrowIsOnHitbox();
  } else if (keyCode === DOWN_ARROW) {
    slideSpaces[DOWN_TYPE].arrowIsOnHitbox();
  } else if (keyCode === UP_ARROW) {
    slideSpaces[UP_TYPE].arrowIsOnHitbox();
  } else if (keyCode === RIGHT_ARROW) {
    slideSpaces[RIGHT_TYPE].arrowIsOnHitbox();
  }
}
