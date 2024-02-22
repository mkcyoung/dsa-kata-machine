interface Node<T> {
    value: T;
    next?: Node<T>;
}
export default class Queue<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        // Book-keeping!
        this.length++;

        const newNode = {
            value: item,
        };

        // Handle case where list is empty
        if (!this.tail) {
            this.head = this.tail = newNode;
            return;
        }

        // Handle new pointers
        this.tail.next = newNode;
        this.tail = newNode;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const node = this.head;
        this.head = this.head.next;

        if (!this.head) {
            this.tail = this.head;
        }

        node.next = undefined;
        return node.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
