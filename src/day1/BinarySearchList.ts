export default function bs_list(haystack: number[], needle: number): boolean {
    // Here my low is inclusive while my high is non-inclusive
    // [low, high)
    // This is why we use length here rather than length - 1.
    // [0, 1, 2, 3]
    // low = 0
    // high = 4
    // needle = 3
    // midpoint = 0 + (4 - 0) / 2 = 2
    // currentValue = 2
    // low = 3
    // midpoint = 3 + (4 - 3) / 2 = 3.5 = 3
    // currentValue = 3
    // We're there!
    // If instead I had done:
    // low = 0; high = 3; needle = 3
    // midpoint = 0 + (3 - 0) / 2 = 1.5 = 1
    // currentValue = 1
    // low = 2
    // midpoint = 2 + (3 - 2) / 2 = 2.5 = 2
    // currentValue = 2
    // low = 3 AND high is 3 so we return early....
    // The off-by-one here is strong.

    let low = 0;
    let high = haystack.length;

    while (low < high) {
        // It's important to use the floor here!
        const midpoint = Math.floor(low + (high - low) / 2);
        const currentValue = haystack[midpoint];

        if (needle === currentValue) {
            return true;
        } else if (needle > currentValue) {
            low = midpoint + 1;
        } else {
            // Remember high is exclusive - we've already checked the midpoint
            // so we don't include it.
            high = midpoint;
        }
    }

    return false;
}
