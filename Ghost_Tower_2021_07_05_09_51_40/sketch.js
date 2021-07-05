var PLAY = 1
var END = 0

gamestate = PLAY

var score
var tower, towerImage, ghost1, jump1, ghost
var climber, climberGroup
var door, doorGroup
var green,greenGroup

function preload() {
  towerImage = loadImage("tower.png")
  jump1 = loadImage("ghost-jumping.png")
  ghost1 = loadImage("ghost-standing.png")
  climber1 = loadImage("climber.png")
  door1 = loadImage("door.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  tower = createSprite(width/2, height/2);
  tower.addImage("tower", towerImage);
  tower.scale=2
  tower.velocityY = 2
  doorGroup = new Group();
  climberGroup = new Group();
  greenGroup = new Group();
  
  ghost = createSprite(300, 300, 50, 50)
  ghost.addImage(ghost1)
  ghost.scale = 0.5
}

function draw() {
  background(0)
if(ghost.y>10){
  camera.position.y=ghost.y
}

  if (gameState = PLAY) {
    spawnDoor();
    ghost.velocityY = ghost.velocityY + 0.8
    
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown(UP_ARROW)) {
      ghost.velocityY = -20
    }
    
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 5
    }
    
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 5
    }
    
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
    
    if (greenGroup.isTouching(ghost)||ghost.y>600){
      gameState=END
      ghost.destroy();
    }
     drawSprites();
  }
  if(gameState===END){
    textSize(50)
    fill("yellow")
    text("GAME OVER",width/2,height/2
    )
    camera.position.y=0
    tower.velocityY=0

  }
}


function spawnDoor() {
  if (frameCount % 160 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(100, width-100));
    door.velocityY = 2;
    door.lifetime = height+100;
    door.addImage(door1);
    doorGroup.add(door);
    ghost.depth = door.depth
    ghost.depth = door.depth + 1

    var climber = createSprite(200, 10);
    climber.addImage(climber1);
    climber.x = door.x;
    climber.lifetime = height+100;
    climber.velocityY = 2;
    climberGroup.add(climber);
    green = createSprite(200, 15)
    green.width=climber.width;
    green.height=2;
    green.x=door.x;
    green.velocityY=2;
    green.lifetime=height+100;
    greenGroup.add(green);
  }
}