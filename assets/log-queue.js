export class LogQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        this.queue.push(item);
    }

    dequeueAll() {
        if (this.queue.length === 0) return "";
        const chunk = this.queue.join("");
        this.queue = [];
        return chunk;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}
