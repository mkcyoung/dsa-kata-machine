function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let lowIdx = 0;
    let lowestValue = Infinity;
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;
        if (dists[i] < lowestValue) {
            lowestValue = dists[i];
            lowIdx = i;
        }
    }
    return lowIdx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);
    // We're at the source, so the distance for it is 0.
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);

        // Mark current as seen
        seen[curr] = true;
        // Go through edges
        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }

            // Calculate the distance,
            // which is the weight of the edge + the current distance
            const dist = dists[curr] + edge.weight;
            // If this distance is less than the current distance to
            // this edge, then we update
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    // Now, we need to walk back
    const out: number[] = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    // We need to push the source on b/c we don't include that in our prev array
    out.push(source);
    return out.reverse();
}
