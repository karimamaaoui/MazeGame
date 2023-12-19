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
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                if (this.maze[i][j] === 1) {
                    // Draw walls in black
                    this.ctx.fillStyle = "#000000";
                    this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                } else if (this.maze[i][j] === 2) {
                    // Draw the goal in green
                    this.ctx.fillStyle = "#00ff00";
                    this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }

    // Draw the player on the canvas
    drawPlayer() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.player.x * this.cellSize, this.player.y * this.cellSize, this.cellSize, this.cellSize);
    }

    // Move the player in the specified direction
    movePlayer(direction) {
        let newX = this.player.x;
        let newY = this.player.y;

        switch (direction) {
            case "up":
                newY = Math.max(0, this.player.y - 1);
                break;
            case "down":
                newY = Math.min(this.maze.length - 1, this.player.y + 1);
                break;
            case "left":
                newX = Math.max(0, this.player.x - 1);
                break;
            case "right":
                newX = Math.min(this.maze[0].length - 1, this.player.x + 1);
                break;
        }

        // Check if the new position is valid (not a wall)
        if (this.maze[newY][newX] !== 1) {
            this.player.x = newX;
            this.player.y = newY;
        }
    }

    // Check for collisions with walls or the goal
    checkCollision() {
        const cellValue = this.maze[this.player.y][this.player.x];
        if (cellValue === 1) {
            console.log('Collision with wall!');
        } else if (cellValue === 2) {
            console.log('You won!');
        }
    }

    // Render the game on the canvas
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMaze();
        this.drawPlayer();
        this.checkCollision();
    }
}

// Create an instance of MazeGame with the canvas ID
const mazeGame = new MazeGame("mazeCanvas");

// Listen for keydown events to move the player
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            mazeGame.movePlayer("up");
            break;
        case "ArrowDown":
            mazeGame.movePlayer("down");
            break;
        case "ArrowLeft":
            mazeGame.movePlayer("left");
            break;
        case "ArrowRight":
            mazeGame.movePlayer("right");
            break;
    }
    // Render the updated game state
    mazeGame.render();
});

// Initial render of the game
mazeGame.render();
