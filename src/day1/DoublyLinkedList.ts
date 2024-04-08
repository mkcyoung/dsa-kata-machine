interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = this.makeNode(item);
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        // Key to remember is not to lose reference to the current head while
        // executing this
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw Error("Out of bounds!");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        const targetNode = this.getNode({ idx });
        if (!targetNode) return;

        this.length++;
        const node = this.makeNode(item);

        node.next = targetNode;
        if (targetNode.prev) {
            node.prev = targetNode.prev;
            targetNode.prev.next = node;
        }
        targetNode.prev = node;
    }

    append(item: T): void {
        this.length++;
        const node = this.makeNode(item);

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        const nodeToRemove = this.getNode({ item });
        if (!nodeToRemove) return undefined;

        this.removeNode(nodeToRemove);
        this.length--;
        return nodeToRemove.value;
    }

    get(idx: number): T | undefined {
        const targetNode = this.getNode({ idx });
        return targetNode ? targetNode.value : undefined;
    }

    removeAt(idx: number): T | undefined {
        if (!this.head) return undefined;
        if (idx > this.length - 1) return undefined;
        const nodeToRemove = this.getNode({ idx });
        if (!nodeToRemove) return undefined;
        this.length--;

        this.removeNode(nodeToRemove);
        return nodeToRemove.value;
    }

    removeNode(nodeToRemove: Node<T>): void {
        if (nodeToRemove.prev) {
            nodeToRemove.prev.next = nodeToRemove.next;
        } else {
            this.head = nodeToRemove.next;
        }
        if (nodeToRemove.next) {
            nodeToRemove.next.prev = nodeToRemove.prev;
        }
    }

    getNode({ idx, item }: { idx?: number; item?: T }): Node<T> | undefined {
        if (!this.head || !this.tail) return undefined;
        if (idx !== undefined && idx > this.length) return undefined;
        if (idx === undefined && item === undefined) return undefined;

        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (i === idx) break;
            if (curr.value === item) break;
            if (!curr.next) return undefined;
            curr = curr.next;
        }

        return curr;
    }

    makeNode(item: T): Node<T> {
        return { value: item };
    }
}
