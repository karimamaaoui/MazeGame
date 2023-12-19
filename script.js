class MazeGame {
    constructor(canvasId) {
        // Get the canvas element and its 2d rendering context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        // Define the player's initial position
        this.player = { x: 0, y: 0 };

        // Define the maze structure
        this.maze = [
            [0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0, 0],
        ];

        // Define the size of each cell in the maze
        this.cellSize = 40;
    }

    // Draw the maze on the canvas
    drawMaze() {
        // Loop through each row of the maze
        for (let i = 0; i < this.maze.length; i++) {
            // Loop through each column of the current row
            for (let j = 0; j < this.maze[i].length; j++) {
                // Check the value of the current cell in the maze
                if (this.maze[i][j] === 1) {
                    // If the cell value is 1, it represents a wall; draw it in black
                    this.ctx.fillStyle = "#000000";
                    this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                } else if (this.maze[i][j] === 2) {
                    // If the cell value is 2, it represents the goal; draw it in green
                    this.ctx.fillStyle = "#00ff00";
                    this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
    

    // Draw the player on the canvas
    drawPlayer() {
        // Set the fill color to red for the player
        this.ctx.fillStyle = "#FF0000";
        // Draw a filled rectangle for the player at the specified position and size
        this.ctx.fillRect(this.player.x * this.cellSize, this.player.y * this.cellSize, this.cellSize, this.cellSize);
    }

    // Move the player in the specified direction
    movePlayer(direction) {
        // Copy the current player's x and y coordinates
        let newX = this.player.x;
        let newY = this.player.y;
    
        // Update the new coordinates based on the specified direction
        switch (direction) {
            case "up":
                // Move up while ensuring the new y-coordinate doesn't go below 0
                newY = Math.max(0, this.player.y - 1);
                break;
            case "down":
                // Move down while ensuring the new y-coordinate doesn't exceed the maze height
                newY = Math.min(this.maze.length - 1, this.player.y + 1);
                break;
            case "left":
                // Move left while ensuring the new x-coordinate doesn't go below 0
                newX = Math.max(0, this.player.x - 1);
                break;
            case "right":
                // Move right while ensuring the new x-coordinate doesn't exceed the maze width
                newX = Math.min(this.maze[0].length - 1, this.player.x + 1);
                break;
        }
    
        // Check if the new position is valid (not a wall)
        if (this.maze[newY][newX] !== 1) {
            // Update the player's position if it's a valid move
            this.player.x = newX;
            this.player.y = newY;
        }
    }
    

 // Check if the player has collided with a wall or reached the goal
checkCollision() {
    // Get the value of the maze cell at the player's current position
    const cellValue = this.maze[this.player.y][this.player.x];
    const gameModal=document.querySelector(".game-modal");
    // Check the cell value to determine the outcome
    if (cellValue === 1) {
        // If the cell value is 1, the player has collided with a wall
        console.log('Collision with wall!');
    } else if (cellValue === 2) {
        // If the cell value is 2, the player has reached the goal
        console.log('You won!');       
        gameModal.classList.add("show");

    }
}
restartGame() {
    // Reset the player's position
    this.player = { x: 0, y: 0 };

    // Clear any game-over modal
    const gameModal = document.querySelector(".game-modal");
    gameModal.classList.remove("show");

    // Render the initial game state
    this.render();
}

// Render the game on the canvas
render() {
    // Clear the entire canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the maze on the canvas
    this.drawMaze();

    // Draw the player on the canvas
    this.drawPlayer();

    // Check for collisions and log the outcome
    this.checkCollision();
}
}

// Create an instance of MazeGame with the canvas ID
const mazeGame = new MazeGame("mazeCanvas");

// Add an event listener to the window for keydown events
window.addEventListener("keydown", function (e) {
    // Switch statement based on the pressed key
    switch (e.key) {
        case "ArrowUp":
            // If the "ArrowUp" key is pressed, move the player up
            mazeGame.movePlayer("up");
            break;
        case "ArrowDown":
            // If the "ArrowDown" key is pressed, move the player down
            mazeGame.movePlayer("down");
            break;
        case "ArrowLeft":
            // If the "ArrowLeft" key is pressed, move the player left
            mazeGame.movePlayer("left");
            break;
        case "ArrowRight":
            // If the "ArrowRight" key is pressed, move the player right
            mazeGame.movePlayer("right");
            break;
    }

    // Render the updated game state after the player has moved
    mazeGame.render();
});


const playAgainBtn=document.querySelector(".play-again");

// Initial render of the game
mazeGame.render();
// Event listener for "Play Again" button click
playAgainBtn.addEventListener("click", function () {
    // Restart the game when the button is clicked
    mazeGame.restartGame();
})