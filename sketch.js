var bird,birdimage
var obstacles,obstaclesimage
var sky,skyimage
var coin,coinImage,coinGroup
var END =0;
var PLAY =1;
var gameState= PLAY
var gameOverImage,gameover
var score=0
function preload(){
birdimage=loadImage("bird.png")
obstaclesimage=loadImage("paper.png")
skyimage=loadImage("sky.png")
gameOverImage=loadImage("gameOver.png")
coinImage=loadImage("coin.png")
}
function setup (){
  createCanvas(1200, 800);




gameover=createSprite(600,400,800,400);
gameover.addImage(gameOverImage);

gameover.visible=false;

sky=createSprite(0,0,800,400);
sky.addImage(skyimage);
sky.scale=5;
sky.x=sky.width/2;
sky.velocityX=-4;

bird=createSprite(80,315,20,20)
bird.addImage(birdimage)
bird.scale=0.01
obstacleGroup = new Group();
  coinGroup=new Group()
}

function draw() {
  
  background(255);
  drawSprites();
 if(gameState===PLAY)
 {
  if(frameCount%200===0)
  {spawnObstacles()}
  
    if(sky.x<100) {
    sky.x=sky.width/2;
  }
  
  
    if(coinGroup.isTouching(bird)){
      
    score = score + 2;
    }
 
   
    if(keyDown("down_arrow"))  {
      bird.y =bird.y+ 20;
    }
    if(keyDown("up_arrow")) {
      bird.y =bird.y -20;
    }
    
  
      
    spawncoins();
    spawnObstacles();
 
  
  if(obstacleGroup.isTouching(bird)){
    gameState=END
  }
}
  
  if(gameState===END){
      
      sky.velocityX = 0;
      bird.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);
    obstacleGroup.destroyEach()
    coinGroup.destroyEach()
  
    
    gameover.visible=true;
    bird.visible=false;
    coinGroup.VisibleAll=false;
    obstacleGroup.VisibleAll=false;
    sky.visible=false;
    
    }
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);        
    
  

}




function spawnObstacles() {
 
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600,250,40,10);
    obstacle.y = random(1,800);    
    obstacle.velocityX = -5;
    
     
    obstacle.lifetime = 300;
    bird.depth = obstacle.depth + 1;
    
    
     obstacle.addImage(obstaclesimage);
     obstacle.scale=0.5
    
    obstacleGroup.add(obstacle);
  }
}


    
   
    
       
  
  

function spawncoins(){
  if (frameCount % 80 === 0) { 
    coin = createSprite(600,250,40,10); 
   coin.y = random(1,800); 
   
    coin.velocityX = -5;
    
     
    coin.lifetime = 300;
    bird.depth = coin.depth + 1;
    
    
     coin.addImage(coinImage);
     coin.scale=0.2;
    
    coinGroup.add(coin);
  }
}