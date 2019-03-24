var canvas = function (p) {
    var maze;
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        maze = new Maze(p, 20, 20, 1);
        maze.setScale(3);
    };
    p.windowResized = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(100);
        maze.render();
    };
};
new p5(canvas);
var Maze = (function () {
    function Maze(p, width, height, density) {
        this.scale = 1;
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
    Maze.prototype.setScale = function (scale) {
        this.scale = scale;
    };
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
        this.map[startingLocation[1]][startingLocation[0]] = 2;
        this.map[goalLocation[1]][goalLocation[0]] = 3;
        var obstacleCount = this.p.floor(this.density * this.width * this.height);
        var totalTile = this.width * this.height;
        var center = [
            this.width / 2,
            this.height / 2
        ];
        for (var i = 0; i < obstacleCount; i++) {
            var x = this.p.floor(this.p.random(this.width));
            var y = this.p.floor(this.p.random(this.height));
            while (this.map[y][x] !== 1) {
                x = this.p.floor(this.p.random(this.width));
                y = this.p.floor(this.p.random(this.height));
            }
            this.map[y][x] = 0;
            var tileCount = floatFillCount(this.map, center);
            if (tileCount < totalTile - 1) {
                this.map[y][x] = 1;
            }
            else {
                totalTile--;
            }
        }
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
                        this.p.fill('#3e363F');
                        break;
                    case 1:
                        this.p.fill('#FFFCE8');
                        break;
                    case 2:
                        this.p.fill('#DD403A');
                        break;
                    case 3:
                        this.p.fill('#B8B42D');
                        break;
                    case 4:
                        this.p.fill('#6974A2');
                        break;
                    case 5:
                        this.p.fill('#63A088');
                        break;
                }
                this.p.rect(i * 10 * this.scale, j * 10 * this.scale, 10 * this.scale, 10 * this.scale);
                this.p.pop();
            }
        }
    };
    return Maze;
}());
function floatFillCount(map, start) {
    var height = map.length;
    var width = map.length > 0 ? map[0].length : 0;
    var toBeVisit = [];
    var visited = [];
    var current = start;
    current = start;
    if (current[0] - 1 >= 0) {
        var newX = current[0] - 1;
        if (map[current[1]][newX] != 0) {
            toBeVisit.push([newX, current[1]]);
        }
    }
    if (current[1] - 1 >= 0) {
        var newY = current[1] - 1;
        if (map[newY][current[0]] != 0) {
            toBeVisit.push([current[0], newY]);
        }
    }
    if (current[0] + 1 < width) {
        var newX = current[0] + 1;
        if (map[current[1]][newX] != 0) {
            toBeVisit.push([newX, current[1]]);
        }
    }
    if (current[1] + 1 < height) {
        var newY = current[1] + 1;
        if (map[newY][current[0]] != 0) {
            toBeVisit.push([current[0], newY]);
        }
    }
    visited.push(current);
    while (toBeVisit.length > 0) {
        current = toBeVisit.pop();
        if (checkTileExisted(current, visited)) {
            current = toBeVisit.pop();
            continue;
        }
        if (current[0] - 1 >= 0) {
            var newX = current[0] - 1;
            if (map[current[1]][newX] != 0
                && !checkTileExisted([newX, current[1]], visited)) {
                toBeVisit.push([newX, current[1]]);
            }
        }
        if (current[1] - 1 >= 0) {
            var newY = current[1] - 1;
            if (map[newY][current[0]] != 0
                && !checkTileExisted([current[0], newY], visited)) {
                toBeVisit.push([current[0], newY]);
            }
        }
        if (current[0] + 1 < width) {
            var newX = current[0] + 1;
            if (map[current[1]][newX] != 0
                && !checkTileExisted([newX, current[1]], visited)) {
                toBeVisit.push([newX, current[1]]);
            }
        }
        if (current[1] + 1 < height) {
            var newY = current[1] + 1;
            if (map[newY][current[0]] != 0
                && !checkTileExisted([current[0], newY], visited)) {
                toBeVisit.push([current[0], newY]);
            }
        }
        visited.push(current);
    }
    return visited.length;
}
function checkTileExisted(current, list) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var l = list_1[_i];
        if (l[0] === current[0] && l[1] === current[1]) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=build.js.map