export default function two_crystal_balls(breaks: boolean[]): number {
    // I want to efficiently figure out what floor balls break on - and I have
    // two crystal balls to do it.
    // https://www.quora.com/You-are-given-two-glass-balls-in-a-100-story-building-You-have-to-find-out-by-minimal-drops-which-is-the-lowest-floor-at-which-they-would-break-How-do-I-prove-it-mathematically

    // Jump by sqrt, then linear search! The runtime of this is sqrt(n), not n.
    // Pretty cool.

    const n = breaks.length;
    const jumpLength = Math.floor(Math.sqrt(n));
    let currentIndex = jumpLength;

    while (currentIndex <= n) {
        if (breaks[currentIndex]) {
            // Linear search previous chunk
            const startIndex = currentIndex - jumpLength;
            for (let i = startIndex; i < currentIndex + 1; i++) {
                if (breaks[i]) return i;
            }
        } else if (currentIndex === n) {
            return -1;
        } else {
            // Make next jump
            if (currentIndex + jumpLength > n) {
                currentIndex = n;
            } else {
                currentIndex += jumpLength;
            }
        }
    }

    return -1;

    // Alternative way  (2 for loops)
    // let i = jumpLength;
    // for (; i < n; i += jumpLength) {
    //     if (breaks[i]) {
    //         break;
    //     }
    // }

    // i -= jumpLength;

    // for (let j = 0; j <= jumpLength && i < breaks.length; ++j, ++i) {
    //     if (breaks[i]) return i;
    // }

    // return -1;
}
