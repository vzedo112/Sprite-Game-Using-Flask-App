let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let fpsInterval = 1000/60; 
let now;
let then = Date.now();
let request_id;

let xhttp;

let moveLeft  = false ;
let moveRight = false ;
let moveUp = false;
let moveDown = false ;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  frameX : .6,
  frameY : .2,
  width: 11,
  height: 20,
  health: 100,
  speed: 5
};

let zombies = [];
let bullets = [];
let coins = []
let score = 0;

let Background = [
  [20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [30, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 54, 80, 80, 20, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 20, 20, 80, 80, 80, 80, 80, 80, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 54, 80, 80, 80, 20, 20, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 20, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 20, 20, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 52, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
];

let tilesPerRow = 16
let tileSize = 32

let playerImage = new Image()
let BackgroundImage = new Image()
let zombieImage = new Image()
let coinImage = new Image()

document.addEventListener("DOMContentLoaded", init, false)

function init() {

  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  window.addEventListener("mousedown", shootGun);
  
  BackgroundImage.src = "static/tiles.png"
  zombieImage.src = "static/enemy.png"
  playerImage.src = "static/player.png"
  coinImage.src = "static/coin.png"
  
  //load_assets([
    //{"var" : playerImage, "url": ""},
    //{"var" : zombieImage, "url": ""},
   // {"var" : BackgroundImage, "static": "tiles.png"}
 // ],draw)

  draw();
}


function draw() {
  request_id = window.requestAnimationFrame(draw);
  now = Date.now();
  let elapsed = now - then;

  if  (elapsed < fpsInterval) {
      return;
  }

  then = now - (elapsed % fpsInterval);
  
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < 20; r += 1 ) {
    for ( let c = 0; c < 32; c += 1) {
      let tile = Background[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / tilesPerRow);
        let tileCol = Math.floor(tile / tilesPerRow);
        context.drawImage(BackgroundImage, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
          c * tileSize, r * tileSize, tileSize, tileSize);
      }
    }
  }

  // update player position based on the keys that are currently being pressed
  if (moveLeft) {
    player.x = player.x - player.speed;
    player.frameX = 9.3;
  }

  if (moveRight) {
    player.x = player.x + player.speed;
    player.frameX = 22.4;
  }

  if (moveUp) {
    player.y = player.y - player.speed;
    player.frameX = 79.15;
  }

  if (moveDown) {
    player.y = player.y + player.speed;
    player.frameX = .6;
  }

  // make sure the player stays within the canvas
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }

  //context.fillStyle = "#ff0000";
  //context.fillRect(player.x, player.y, player.width, player.height);
  context.drawImage(playerImage, player.width * player.frameX, 
  player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)

  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.x += bullet.speed * bullet.xChange;
    bullet.y += bullet.speed * bullet.yChange;
    context.fillStyle = "#000000"; 
    context.fillRect(bullet.x - 5, bullet.y - 5, 5, 5); 
  }

  context.fillStyle = "#00008B"; 
  for (let zombie of zombies) {
    //context.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
    context.drawImage(zombieImage, zombie.width * zombie.frameX, zombie.height * zombie.frameY,
    zombie.width, zombie.height, zombie.x, zombie.y, zombie.width, zombie.height)   
    if (player.x - zombie.x > 0) {
      zombie.x += 1 * zombie.speed; //right
      zombie.frameY = 1.7;
    } else {
      zombie.x -= 1 * zombie.speed; //left
      zombie.frameY = 9.7;
    }
  
    if (player.y - zombie.y > 0) {
      zombie.y += 1 * zombie.speed; //down
      zombie.frameX = 1
      
    } else {
      zombie.y -= 1 * zombie.speed; //up
      zombie.frameY = 4.9
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    for (let j = 0; j < zombies.length; j++) {
      let zombie = zombies[j];
      if (bullet.x >= zombie.x && 
        bullet.x <= zombie.x + zombie.width && 
        bullet.y >= zombie.y && 
        bullet.y <= zombie.y + zombie.height) {
        // zombie hit by bullet
        zombies.splice(j, 1)
        bullets.splice(i, 1);
        spawnZombie(1);
        score += 100;
        break;
      }
      // check for collision between the zombie and the player
      if (zombie.x + zombie.width >= player.x &&
        zombie.x <= player.x + player.width && 
        zombie.y + zombie.height >= player.y && 
        zombie.y <= player.y + player.height) {
          
        player.health -= 100; // kills player

        // if the player has no health left game over
        if (player.health <= 0) {
          context.fillStyle = "#000000"; 
          context.font = "24px Pixeled"; 
          context.textAlign = "center"; 
          context.fillText("Game Over! Score: " + score, canvas.width/2, canvas.height/2);
          stop("Game Over!"); // stop the game
          return;
        }
      }
    }
  }

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    //context.fillStyle = "gold";
    //context.fillRect(coin.x, coin.y, coin.width, coin.height);
    context.drawImage(coinImage, coin.width * coin.frameX, coin.height * coin.frameY,
      coin.width, coin.height, coin.x, coin.y, coin.width, coin.height)   
    if (player.x < coin.x + coin.width && 
      player.x + player.width > coin.x && 
      player.y < coin.y + coin.height && 
      player.y + player.height > coin.y) {
      coins.splice(i, 1);
      score += 1000;
    }
  }

  context.fillStyle = "#000000"; 
  context.font = "8px Pixeled";
  context.fillText("Score: " + score, 10, 20);
  
}


// Functions ----------------------------------------------------------

function randint(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function activate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
      moveLeft = true;
  } else if (key === "ArrowRight") {
      moveRight = true;
  } else if (key === "ArrowUp") {
      moveUp = true;
  } else if (key === "ArrowDown") {
      moveDown = true;
  }
}

function deactivate(event) {
  let key = event.key;
  if (key === "ArrowLeft") {
      moveLeft = false;
  } else if (key === "ArrowRight") {
      moveRight = false;
  } else if (key === "ArrowUp") {
      moveUp = false;
  } else if (key === "ArrowDown") {
      moveDown = false;
  }
}


function shootGun(event) {
  if (event.button === 0) {
    let bullet = {
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      speed: 1,
      xChange: (event.clientX - canvas.offsetLeft - player.x - player.width / 2) / 10,
      yChange: (event.clientY - canvas.offsetTop - player.y - player.height / 2) / 10
    };
    bullets.push(bullet);
  }
}

function spawnZombie() {
  let zombie = {
    x: randint(10, canvas.width - 10),
    y: randint(10,canvas.height -10),
    width: 10,
    height: 20,
    health: 30,
    frameX : 1, 
    frameY : 0.3,
    xChange : randint(-1,1), 
    yChange : randint(-1,1),
    speed : randint(0.4, 1),
    framespeed: .5
  };
  zombies.push(zombie);
}

setInterval(spawnZombie, 3000); // spawn a zombie every 3 seconds

function stop(outcome) {
  window.cancelAnimationFrame(request_id);
  window.removeEventListener("keydown", activate);
  window.removeEventListener("keyup", deactivate);
  let outcome_element = document.querySelector("#outcome");
  if (outcome_element) {
    outcome_element.innerHTML = outcome + " Score " + score;
  }

  let data = new FormData();
  data.append("score",score);

  xhttp = new XMLHttpRequest();
  xhttp.addEventListener("readystatechange", handle_response, false);
  xhttp.open("POST","/store_score", true);
  xhttp.send(data);
}

function handle_response() {
  if (xhttp.readyState === 4) {
    if (xhttp.status === 200) {
      if (xhttp.responseText === "success") {
        console.log("Yes");
      } else {
        console.log("No");
      }
    }
  }
}

function load_assets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function() {
    console.log("loaded");
    num_assets = num_assets - 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } 
    else if (element instanceof HTMLImageElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url
  }
}


function spawnCoin() {
  let coin = {
    x: randint(10, canvas.width - 10),
    y: randint(10,canvas.height -10),
    width: 10,
    height: 10,
    frameX : 0.25, 
    frameY : 0.3,
  };
  coins.push(coin);
}

setInterval(spawnCoin, 10000); // spawn a zombie every 10 seconds