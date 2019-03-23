class Maze {
    private p: p5;
    private width: number;
    private height: number;
    private density: number;

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

        console.log(startingLocation, goalLocation);

        let obstacleCount: number =
            this.p.floor(this.density * this.width * this.height);
        for (let i = 0; i < obstacleCount; i++) {
            let x = this.p.floor(this.p.random(this.width));
            let y = this.p.floor(this.p.random(this.height));

            this.map[y][x] = 0;
        }

        this.map[startingLocation[1]][startingLocation[0]] = 2;
        this.map[goalLocation[1]][goalLocation[0]] = 3;
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
    }
}
