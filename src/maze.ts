class Maze {
    private p: p5;
    private width: number;
    private height: number;
    private density: number;
    private scale: number = 1;

    private map: number[][];

    constructor(
        p: p5,
        width: number,
        height: number,
        density: number
    ) {
        this.p = p;
        this.width = width;
        this.height = height;
        this.density = density;

        // initialize map
        this.map = [];
        for (let i = 0; i < height; i++) {
            let row: number[] = [];
            for (let j = 0; j < width; j++) {
                row.push(1);
            }
            this.map.push(row);
        }

        this.generate();
    }

    setScale(scale: number) {
        this.scale = scale;
    }

    generate() {
        let startingLocation: number[] = [
            this.p.floor(this.p.random(this.width)),
            this.p.floor(this.p.random(this.height))
        ];

        let endX: number = this.p.floor(this.p.random(this.width));
        while (endX === startingLocation[0]) {
            endX = this.p.floor(this.p.random(this.width));
        }

        let endY: number = this.p.floor(this.p.random(this.height));
        while (endY === startingLocation[1]) {
            endY = this.p.floor(this.p.random(this.height));
        }
        let goalLocation: number[] = [endX, endY];

        this.map[startingLocation[1]][startingLocation[0]] = 2;
        this.map[goalLocation[1]][goalLocation[0]] = 3;

        let obstacleCount: number =
            this.p.floor(this.density * this.width * this.height);
        let totalTile: number = this.width * this.height;
        let center: number[] = [
            this.width / 2,
            this.height /2
        ]
        for (let i = 0; i < obstacleCount; i++) {
            let x = this.p.floor(this.p.random(this.width));
            let y = this.p.floor(this.p.random(this.height));
            // let tmp = [x, y];

            while(
                this.map[y][x] !== 1
            ) {
                x = this.p.floor(this.p.random(this.width));
                y = this.p.floor(this.p.random(this.height));
                // tmp = [x, y];
            }

            this.map[y][x] = 0;
            let tileCount = floatFillCount(this.map, center);

            if (tileCount < totalTile - 1) {
                this.map[y][x] = 1;
            } else {
                totalTile--;
            }

        }


    }

    getMap(): number[][] {
        return this.map;
    }

    render() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {

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
                this.p.rect(
                    i * 10 * this.scale,
                    j * 10 * this.scale,
                    10 * this.scale,
                    10 * this.scale
                );
                this.p.pop();
            }
        }
    }
}

function floatFillCount(map: number[][], start: number[]): number {
    let height: number = map.length;
    let width: number = map.length > 0 ? map[0].length : 0; 
    let toBeVisit: number[][] = [];
    let visited: number[][] = [];
    let current: number[] = start;

    current = start;
    if (current[0] - 1 >= 0) {
        let newX = current[0] - 1;
        if (map[current[1]][newX] != 0) {
            toBeVisit.push([newX, current[1]]);
        }
    }
    if (current[1] - 1 >= 0) {
        let newY = current[1] - 1;
        if (map[newY][current[0]] != 0) {
            toBeVisit.push([current[0], newY]);
        }
    }
    if (current[0] + 1 < width) {
        let newX = current[0] + 1;
        if (map[current[1]][newX] != 0) {
            toBeVisit.push([newX, current[1]]);
        }
    }
    if (current[1] + 1 < height) {
        let newY = current[1] + 1;
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
            let newX = current[0] - 1;
            if (
                map[current[1]][newX] != 0
                    && !checkTileExisted([newX, current[1]], visited)
            ) {
                toBeVisit.push([newX, current[1]]);
            }
        }
        if (current[1] - 1 >= 0) {
            let newY = current[1] - 1;
            if (
                map[newY][current[0]] != 0
                    && !checkTileExisted([current[0], newY], visited)
            ) {
                toBeVisit.push([current[0], newY]);
            }
        }
        if (current[0] + 1 < width) {
            let newX = current[0] + 1;
            if (
                map[current[1]][newX] != 0
                    && !checkTileExisted([newX, current[1]], visited)
            ) {
                toBeVisit.push([newX, current[1]]);
            }
        }
        if (current[1] + 1 < height) {
            let newY = current[1] + 1;
            if (
                map[newY][current[0]] != 0
                    && !checkTileExisted([current[0], newY], visited)
            ) {
                toBeVisit.push([current[0], newY]);
            }
        }

        visited.push(current);
    }

    return visited.length;
}

function checkTileExisted(current: number[], list: number[][]): boolean {
    for (let l of list) {
        if (l[0] === current[0] && l[1] === current[1]) {
            return true;
        }
    }
    return false;
}
