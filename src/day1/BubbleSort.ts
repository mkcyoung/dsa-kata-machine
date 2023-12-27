export default function bubble_sort(arr: number[]): void {
    // Move through the array one by one
    // if a current number is bigger than the next one, swap spots.
    // Once you get to the end of the array, repeat, BUT, don't need
    // to check the last element you just sorted.  So as you go through
    // you only need to check n - i elements.

    // Prime's implementation:
    for (let i = 0; i < arr.length; i++) {
        // The -1 here is b/c we don't want to go out of the array when we
        // do j + 1.
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    // Alternative loop (makes more sense to me)
    // for (let i = arr.length - 1; i > 0; i--) {
    //     for (let j = 0; j < i; j++) {
    //         if (arr[j] > arr[j + 1]) {
    //             const temp = arr[j];
    //             arr[j] = arr[j + 1];
    //             arr[j + 1] = temp;
    //         }
    //     }
    // }
}
