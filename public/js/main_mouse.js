// Build on top of this example: http://p5js.org/examples/demos/Hello_P5_Drawing.php

var paths = [];
var painting = false;
var current;
var previous;
var next = 0;
var canvas;

var VP_WIDTH = -1;
var VP_HEIGHT = -1;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  current = createVector(0,0);
  previous = createVector(0,0);
  // frameRate(100);
};

function draw() {
  background(0);

  if (millis() > next && painting) {

    current.x = mouseX;
    current.y = mouseY;

    var force = p5.Vector.sub(current, previous);
    force.mult(0.03);

    paths[paths.length - 1].add(current, force);

    next = millis() + random(20);

    previous.x = current.x;
    previous.y = current.y;
  }

  for (var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed() {
  next = 0;
  painting = window.painting;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop
function mouseReleased() {
  //painting = false;
}

function Path() {
  this.particles = [];
}

Path.prototype.add = function(position, force) {
  this.particles.push(new Particle(position, force, hue));
}

Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

Path.prototype.display = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].display(this.particles[i+1]);
  }
}

function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x/2, force.y/2);
  this.sat = Math.min(10 + Math.sqrt((force.x*force.x) + (force.y*force.y)) * 80, 100) / 100;
  this.offset = createVector(0, 0);
  this.drag = 0.98;
  this.lifespan = .8;
  this.weight = 1 + random(5);
}

Particle.prototype.update = function() {
  this.offset.add(this.velocity);
  this.position.add(this.velocity);
  this.velocity.mult(this.drag);
  this.lifespan -= 0.006;
}

Particle.prototype.display = function(other) {
  if (other) {
    noFill();

    colorMode(HSB);

    strokeCap(ROUND);
    strokeWeight(this.weight);
    stroke(this.position.y, Math.max(30,(1-this.sat)*100), Math.max(10, 100-(1-this.sat)*70), this.lifespan);

    bezier(
      this.position.x, this.position.y,
      this.position.x - this.offset.y, this.position.y - this.offset.x,
      other.position.x + this.offset.y, other.position.y + this.offset.x,
      other.position.x, other.position.y
    );

    bezier(
      VP_WIDTH - this.position.x, this.position.y,
      VP_WIDTH - this.position.x - this.offset.y, this.position.y - this.offset.x,
      VP_WIDTH - other.position.x + this.offset.y, other.position.y + this.offset.x,
      VP_WIDTH - other.position.x, other.position.y
    );

    strokeWeight(this.weight / 3);
    stroke(this.position.y, (1-this.sat)*50, 100-(1-this.sat)*30, this.lifespan/3);

    bezier(
      VP_WIDTH - this.position.x, this.position.y,
      VP_WIDTH - this.position.x - this.offset.y, this.position.y - this.offset.x,
      other.position.x + this.offset.y, other.position.y + this.offset.x,
      other.position.x, other.position.y
    );

    strokeWeight(15 + this.weight * 5);
    stroke(this.position.y, (1-this.sat)*100, 100, this.lifespan/10);
    bezier(
      this.position.x, this.position.y,
      this.position.x - this.offset.y, this.position.y - this.offset.x,
      other.position.x + this.offset.y, other.position.y + this.offset.x,
      other.position.x, other.position.y
    );
  }
}

$(document).ready(function() {
  $('body').on('touchstart', function(e) {
    if (!$(e.target).hasClass('btn') && !$(e.target).parent().hasClass('btn')) {
      e.preventDefault();
    }
  });
  $('#btn-save').click(function() {
    saveCanvas(canvas,'drawing','jpg');
  });
  VP_HEIGHT = $(window).height();
  VP_WIDTH = $(window).width();
});
