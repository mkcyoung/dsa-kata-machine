export default function bfs(
    // The graph in this case is represented as an adjacency matrix. Each row
    // represents a node, and each column in the row is its connection to
    // another node.
    graph: WeightedAdjacencyMatrix,
    // The source is the index of the node you start at.
    source: number,
    // The needle is the node you want to get to. Basically this is just searching to confirm
    // that there is a path between these 2 nodes!
    needle: number,
): number[] | null {
    // We need these in order to track the path.
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    // We start at the source, so we confirm that it's seen.
    seen[source] = true;
    // q represents our queue.
    const q: number[] = [source];

    do {
        // We dequeue that front item.
        const curr = q.shift() as number;
        // If we've found the needle (i.e. the node we're looking for), we
        // break.
        if (curr === needle) {
            break;
        }

        // Otherwise, we add all of the connections this node has to other nodes
        // into the q.
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            // We don't add non-connections
            if (adjs[i] === 0) {
                continue;
            }
            // We don't add nodes we've already seen, i.e. added to the q
            if (seen[i]) {
                continue;
            }

            // We mark the nodes we've added to the q as seen.
            seen[i] = true;
            // We add curr as the 'parent' to the nodes we just added to the q
            prev[i] = curr;
            // We actually add the node to the q.
            q.push(i);
        }
    } while (q.length);

    // Once done, build path from the source to the needle up from
    // the previous array.
    let curr = needle;
    const out: number[] = [];
    while (prev[curr] != -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        return [source].concat(out.reverse());
    }
    return null;
}
