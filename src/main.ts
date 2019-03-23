const canvas = (p: p5) => {

    let maze: Maze;

    p.preload = function() {

    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        maze = new Maze(p, 10, 10, 0.9);
    }

    p.windowResized = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = function() {
        p.background(100);
        p.circle(30, 30, 20);
        maze.render();
    }
}

new p5(canvas);

