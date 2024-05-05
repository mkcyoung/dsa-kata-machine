// VERY similar to the MazeSolver
function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // BASE CASES!!
    if (curr === needle) {
        // Ensures that we capture the last node in the path.
        path.push(curr);
        return true;
    }

    if (seen[curr]) return false;

    // Pre
    seen[curr] = true;
    path.push(curr);

    // Recurse
    const list = graph[curr];
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // Post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const path: number[] = [];
    walk(graph, source, needle, seen, path);
    if (path.length === 0) return null;
    return path;
}
