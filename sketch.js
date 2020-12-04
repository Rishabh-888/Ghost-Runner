var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ghost, ghostImage;
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleBlock, invisibleBlockGroup;
//var edges;
var spookySound;

function preload(){
  towerImage = loadImage("tower.png");
  
  ghostImage = loadAnimation("ghost-jumping.png", "ghost-standing.png");
  
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
  }

 function setup(){
   createCanvas(550, 450);
   
   tower = createSprite(270, 250, 50, 50);
   tower.addImage("tower", towerImage);
   tower.velocityY = 1.5;
   
   ghost = createSprite(265, 225, 20, 20);
   ghost.addAnimation("ghost", ghostImage);
   ghost.scale = 0.5;
   
   //edges = createEdgeSprites();
   
   doorGroup = new Group();
   climberGroup = new Group();
   invisibleBlockGroup = new Group();
 }

 function draw(){ 
   background("#F0FFFF");
   console.log("Mouse X - "+ mouseX+ "Mouse Y - "+mouseY);
   
   if (gameState === PLAY){
      if(keyDown("left_arrow")){
       ghost.x = ghost.x-2.8;
     }
     
     if(keyDown("right_arrow")){
       ghost.x = ghost.x+2.8;
     }
     
     if(keyDown("Space")){
       ghost.velocityY = -7;
     }
     ghost.velocityY = ghost.velocityY + 0.8;
     
     if(tower.y>300){
       tower.y =100;
     }
     spawnGroups();
     
     if(invisibleBlockGroup.isTouching(ghost)||ghost.y>450){
       ghost.destroy();
       gameState = END;
     }
       
   //ghost.collide(edges[3]);
   drawSprites();
   }
    if(gameState === END){
     stroke("yellow");
     fill("yellow");
     textSize(30);
     textFont("Arial Black");
     text("Game Over", 100, 100);
     
   }
 }

 function spawnGroups(){
   if(frameCount%80===0){
     var door = createSprite(245, 30);
     door.addImage("open", doorImage);
     doorGroup.add(door)
     door.x =Math.round(random(125, 425));
     door.velocityY = 0.5;
     door.lifetime = 80;
     var climber = createSprite(245, 115, 20, 20);
     climber.x = door.x;
     climber.velocityY = 0.5;
     climber.lifetime = 80;
     climber.addImage("climb", climberImage);
     climberGroup.add(climber)
     var invisibleBlock = createSprite(235, 40, 20, 20);
     invisibleBlockGroup.add(invisibleBlock)
     invisibleBlock.x = door.x;
     invisibleBlock.velocityY = 0.5;
     invisibleBlock.lifetime = 80;
     invisibleBlock.visible = false;
     ghost.depth = door.depth;
     ghost.depth+=1;
   }
 }