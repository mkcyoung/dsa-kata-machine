interface Node<T> {
    value: T;
    prev?: Node<T>;
}

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        this.length++;

        if (!this.head) {
            this.head = {
                value: item,
            };
            return;
        }

        const newNode = {
            value: item,
            prev: this.head,
        };

        this.head = newNode;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const node = this.head;
        this.head = this.head.prev;
        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
