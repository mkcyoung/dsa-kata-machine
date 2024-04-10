// We don't need to use recursion!
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // Pretending this is a queue - remember that array lists have O(n) time for shift/unshift
    const q = [head];

    while (q.length) {
        // Take the first element out.
        const curr = q.shift();
        if (!curr) return false;
        // Return true if we've found it.
        if (curr.value === needle) return true;
        // Otherwise, push its children to the queue from left to right.
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
    }

    return false;
}
