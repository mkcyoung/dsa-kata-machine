// Tip: Whenever doing recursion - always make a second function
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // Base case
    // No more children
    if (!curr) return path;

    // pre
    // nothing here

    // recurse
    walk(curr.left, path);
    path.push(curr.value);
    walk(curr.right, path);

    // post
    // no post here

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
