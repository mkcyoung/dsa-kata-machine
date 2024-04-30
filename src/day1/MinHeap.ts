export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    // When we insert, we simply throw the number in at the end, then heapify
    // up! It's that simple.
    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    // Deletion is a bit trickier. We delete the top node, replace it with the
    // bottom, then heapify downwards
    delete(): number {
        // No elements?
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        // Reduce the length, then heapify down b/c heapifyDown uses length.
        this.length--;

        // If there's just one element, return that
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);
        // This checks if our children are off the board here.
        if (lIdx >= this.length) return;

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (lV > rV && v > rV) {
            this.data[rIdx] = v;
            this.data[idx] = rV;
            this.heapifyDown(rIdx);
        } else if (lV < rV && v > lV) {
            this.data[lIdx] = v;
            this.data[idx] = lV;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return;
        const p = this.parent(idx);
        const parentV = this.data[p];
        const v = this.data[idx];

        if (parentV > v) {
            this.data[p] = v;
            this.data[idx] = parentV;
            this.heapifyUp(p);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
