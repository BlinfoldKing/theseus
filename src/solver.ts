class Solver {
    private maze: Maze;
    private solution: string;

    private open_list: Path[];
    private closed_list: Path[];

    public solution_path: Path;

    constructor(maze: Maze, solution: string) {
        this.maze = maze;
        this.solution = solution;
        this.open_list = [];
        this.closed_list = [];

        let start: Path = new Path(this.maze.startingLocation);
        start.h_value = this.getDistance(start.position, this.maze.goalLocation);
        this.open_list.push(start);
    }

    solve() {
        if (this.solution === 'a*') {
            this.aStarSolve();
        } else if (this.solution === 'bfs') {

        }
    }

    aStarSolve() {
        if (this.open_list.length > 0 && !this.solution_path) {
            // console.log(this.open_list);
            let current: Path = this.open_list.pop();
            let [x, y] = current.position;
            if (
                x === this.maze.goalLocation[0]
                && y === this.maze.goalLocation[1]
            ) {
                this.solution_path = current;
                return;
            }

            if (x - 1 >= 0) {
                if (this.maze.originalMap[y][x - 1] !== 0) {
                    let newPath: Path = new Path([x - 1, y], current);
                    newPath.g_value = 1 + current.g_value;
                    newPath.h_value = this.getDistance(newPath.position, this.maze.goalLocation);
                    this.maze.setTileState(x - 1, y, 5);
                    this.evaluate(newPath);
                }
            }

            if (y - 1 >= 0) {
                if (this.maze.originalMap[y - 1][x] !== 0) {
                    let newPath: Path = new Path([x, y - 1], current);
                    newPath.g_value = 1 + current.g_value;
                    newPath.h_value = this.getDistance(newPath.position, this.maze.goalLocation);
                    this.maze.setTileState(x, y - 1, 5);
                    this.evaluate(newPath);
                }
            }

            if (x + 1 < this.maze.width) {
                if (this.maze.originalMap[y][x + 1] !== 0) {
                    let newPath: Path = new Path([x + 1, y], current);
                    newPath.g_value = 1 + current.g_value;
                    newPath.h_value = this.getDistance(newPath.position, this.maze.goalLocation);
                    this.maze.setTileState(x + 1, y, 5);
                    this.evaluate(newPath);
                }
            }

            if (y + 1 < this.maze.height) {
                if (this.maze.originalMap[y + 1][x] !== 0) {
                    let newPath: Path = new Path([x, y + 1], current);
                    newPath.g_value = 1 + current.g_value;
                    newPath.h_value = this.getDistance(newPath.position, this.maze.goalLocation);
                    this.maze.setTileState(x, y + 1, 5);
                    this.evaluate(newPath);
                }
            }

            this.maze.setTileState(x, y, 6);
            this.closed_list.push(current);
            this.open_list.sort((a, b) => b.getFValue() - a.getFValue())
        } else if (this.solution_path){
            let current = this.solution_path;
            let [x, y] = current.position;
            this.maze.setTileState(x, y, 1);
            while (current.prev) {
                current = current.prev;
                [x, y] = current.position;
                this.maze.setTileState(x, y, 4);
            }
        }
    }

    getDistance(a: number[], b: number[], method: string = 'euclid'): number {
        if (method === 'euclid') {
            return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[0] - a[0], 2));
        } 
    }

    evaluate(path: Path) {
        let existedPath: number = -1;
        for (let i = 0; i < this.closed_list.length; i++) {
            if (this.closed_list[i].position[0] === path.position[0]
                && this.closed_list[i].position[1] === path.position[1]) {
                existedPath = i;
            }
        }

        if (existedPath > 0) {
            if (this.closed_list[existedPath].getFValue() > path.getFValue()) {
                this.open_list.push(path);
            }
        } else {
            this.open_list.push(path);
        }
    }
}

class Path {
    position: number[];
    prev: Path;

    public g_value: number = 0;
    public h_value: number = 0;

    constructor(position: number[], prev: Path = undefined) {
        this.position = position;
        this.prev = prev;
    }

    getFValue(): number {
        this.g_value + this.h_value;
    }
}

