// For this recursive example, no need to create a separate function.

export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // Base Cases
    // 1. Both are null, i.e. equal
    if (a === null && b === null) {
        return true;
    }

    // 2. At this point, if just one is null,
    // they are not equal
    if (a === null || b === null) {
        return false;
    }

    // 3. They have the same value
    if (a.value !== b.value) {
        return false;
    }

    // Recurse
    // Pre

    // Recurse
    return compare(a.left, b.left) && compare(a.right, b.right);

    // Post
}
