var canvas = function (p) {
    var maze;
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        maze = new Maze(p, 10, 10, 0.9);
    };
    p.windowResized = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(100);
        p.circle(30, 30, 20);
        maze.render();
    };
};
new p5(canvas);
var canvas = function (p) {
    var maze;
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        maze = new Maze(p, 10, 10, 0.9);
    };
    p.windowResized = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(100);
        p.circle(30, 30, 20);
        maze.render();
    };
};
new p5(canvas);
var Maze = (function () {
    function Maze(p, width, height, density) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.density = density;
        this.map = [];
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(1);
            }
            this.map.push(row);
        }
        this.generate();
    }
    Maze.prototype.generate = function () {
        var startingLocation = [
            this.p.floor(this.p.random(this.width)),
            this.p.floor(this.p.random(this.height))
        ];
        var endX = this.p.floor(this.p.random(this.width));
        while (endX === startingLocation[0]) {
            endX = this.p.floor(this.p.random(this.width));
        }
        var endY = this.p.floor(this.p.random(this.height));
        while (endY === startingLocation[1]) {
            endY = this.p.floor(this.p.random(this.height));
        }
        var goalLocation = [endX, endY];
        console.log(startingLocation, goalLocation);
        var obstacleCount = this.p.floor(this.density * this.width * this.height);
        for (var i = 0; i < obstacleCount; i++) {
            var x = this.p.floor(this.p.random(this.width));
            var y = this.p.floor(this.p.random(this.height));
            this.map[y][x] = 0;
        }
        this.map[startingLocation[1]][startingLocation[0]] = 2;
        this.map[goalLocation[1]][goalLocation[0]] = 3;
    };
    Maze.prototype.getMap = function () {
        return this.map;
    };
    Maze.prototype.render = function () {
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                this.p.push();
                switch (this.map[i][j]) {
                    case 0:
                        this.p.fill(0);
                        break;
                    case 1:
                        this.p.fill(255);
                        break;
                    case 2:
                        this.p.fill('#ff0033');
                        break;
                    case 3:
                        this.p.fill('#0000ff');
                        break;
                }
                this.p.rect(i * 12, j * 12, 12, 12);
                this.p.pop();
            }
        }
    };
    return Maze;
}());
//# sourceMappingURL=build.js.map