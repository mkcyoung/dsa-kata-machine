// We split this into 2 functions:
// 1. The partition: Produces the pivot index and does the moving of elements
// 2. The quick sort: Does the quick sorting, calls partition, handles recursion, bookkeeping etc.

const qs = (arr: number[], lo: number, hi: number): void => {
    // Base case
    if (lo >= hi) {
        // No need to keep going here.
        return;
    }

    // Recursive case
    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
};

// Returns the pivot index
// lo & hi are the indices in the array over which you are performing the action.
//
// Ex.
// [8, 7, 6, 4, 5] -> 5 is pivot
// walk through, end up with:
// [4, 7, 6, 8, 5]
// Then, put 5 at the location of the pivot idx
// [4, 5, 6, 8, 7]
// Tada! Now we have a weakly sorted array
const partition = (arr: number[], lo: number, hi: number): number => {
    // The pivot can be any number in the array.
    const pivot = arr[hi];
    // This index is where you're inserting elements that are less than the pivot
    let idx = lo - 1;
    // Walk from the low to the hi, but not including the hi, b/c the hi is the pivot
    // We move everything that is less than the pivot to the beginning of the array.
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            // We swap whatever was in the first position with the current value
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    // We start off the board, so we need to increment the index one last
    // time to get to the proper spot.
    idx++;

    // At this stage, we've put everything less than the pivot at the beginning
    // of the array, NOW, we have to put the pivot at the pivot index so everything
    // before the pivot is less than it, and everything after is greater than it.
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
};

export default function quick_sort(arr: number[]): void {
    // Inputs are the array, and the lo and hi indices
    // which are INCLUSIVE for this algorithm -> [lo, hi]
    qs(arr, 0, arr.length - 1);
}
