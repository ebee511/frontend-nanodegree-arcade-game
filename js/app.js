// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.height = 50;
    this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Checks to see if enemy is off page,
    // If off page, reset position of bug
    if (this.x > 500) {
        this.x = 0;
    };

    this.checkCollisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(player) {
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
            player.resetPlayer();
    }
}

//MAYBE - enemy prototype for speed
Enemy.prototype.randomSpeed = function(min, max) {
    //code to randomize speed for enemy
    return Math.random() * (max - min) + min;
}

// PLAYER CLASS
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
    this.height = 50;
    this.width = 50;
};

Player.prototype.update = function(dt) {
    //Update player position
    //Check is player reaches final destination - if so, they won
    if (player.y < 40) {
        alert('You win');
        Player.prototype.resetPlayer();
        allEnemies.forEach(function(enemy) {
            enemy.speed = Enemy.prototype.randomSpeed(50, 200);
        })
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrowKey) {
    //Moves player coordinates 
    switch (arrowKey) {
        case 'left':
            if (player.x > 0) {
              player.x = this.x - 50;  
            }
            console.log('left');
            break;
        case 'up':
            if (player.y > -10) {
              player.y = this.y - 50; 
            }
            console.log('up');
            break;
        case 'right':
            if (player.x < 400) {
              player.x = this.x + 50;  
            }
            console.log('right');
            break;
        case 'down':
            if (player.y < 440) {
              player.y = this.y + 50; 
            }
            console.log('down');
            break;       
    }
};

Player.prototype.resetPlayer = function() {
    //Brings player back to specific coordinates if they is a collision
    player.x = 200;
    player.y = 390;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0, 145, Enemy.prototype.randomSpeed(50, 200)); //bottom
var enemy2 = new Enemy(0, 225, Enemy.prototype.randomSpeed(50, 200));
var enemy3 = new Enemy(0, 310, Enemy.prototype.randomSpeed(50, 200)); //top

// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
var player = new Player(200, 390, 10);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
