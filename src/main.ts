const canvas = (p: p5) => {

    let maze: Maze;
    let solver: Solver;

    p.preload = function() {

    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        maze = new Maze(p, 20, 20, 1);
        maze.setScale(3);
        solver = new Solver(maze, 'a*');
    }

    p.windowResized = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = function() {
        p.background(100);
        maze.render();
        solver.solve();
    }
}

new p5(canvas);

