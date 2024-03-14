const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

// This is our function that we actually recurse with.
//
// We want to have a base case, and a recursive case.
// The base case requires we know where we're currently at
// and the recursive case walks us in different directions.
const walk = (
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    visited: boolean[][],
    path: Point[],
): boolean => {
    // Base cases
    // 1. Off the map
    const isOffTheMap =
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length;
    if (isOffTheMap) return false;

    // 2. Hit a wall
    if (maze[curr.y][curr.x] === wall) return false;

    // 3. At the end
    if (curr.x === end.x && curr.y === end.y) {
        // If we reach the end, we need to be sure to push the end point to the
        // path array, b/c we skip the pre condition where this happens.
        path.push(end);
        return true;
    }

    // 4. Already visited
    if (visited[curr.y][curr.x]) return false;

    // NOW - recursive case.
    // pre
    // recurse
    // post

    // pre condition:
    // Every time we successfully move to a spot, we add it in our
    // pre condition, and remove it in our post
    path.push(curr);
    visited[curr.y][curr.x] = true;

    // recurse:
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        const nextPoint = {
            x: curr.x + x,
            y: curr.y + y,
        };
        if (walk(maze, wall, nextPoint, end, visited, path)) {
            return true;
        }
    }

    // post:
    // If we make it back out of the recurse step, we pop the point
    // from the array, b/c it means it led to a dead end, and we need
    // to return false.
    path.pop();
    return false;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const visited: boolean[][] = [];
    const path: Point[] = [];
    for (let i = 0; i < maze.length; i++) {
        visited.push(new Array(maze[0].length).fill(false));
    }
    walk(maze, wall, start, end, visited, path);
    return path;
}
