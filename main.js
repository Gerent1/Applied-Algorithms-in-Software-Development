function dijkstra(graph, start) {
    const distances = {};
    const priorityQueue = new MinHeap();

    // Initialize distances with Infinity, except start vertex (0)
    for (let vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        priorityQueue.enqueue(vertex, distances[vertex]);
    }

    while (!priorityQueue.isEmpty()) {
        const current = priorityQueue.dequeue();

        // Explore neighbors of current vertex
        for (let neighbor in graph[current]) {
            const weight = graph[current][neighbor];
            const distance = distances[current] + weight;

            // If found shorter path to neighbor, update distances and priority queue
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                priorityQueue.updatePriority(neighbor, distance);
            }
        }
    }

    return distances;
}

// Min-Heap implementation for priority queue
class MinHeap {
    constructor() {
        this.heap = [];
    }

    enqueue(vertex, priority) {
        this.heap.push({ vertex, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min.vertex;
    }

    updatePriority(vertex, priority) {
        const index = this.heap.findIndex(item => item.vertex === vertex);
        if (index !== -1) {
            this.heap[index].priority = priority;
            this.bubbleUp(index);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp(index) {
        let currentIdx = index;
        while (currentIdx > 0) {
            const parentIdx = Math.floor((currentIdx - 1) / 2);
            if (this.heap[currentIdx].priority < this.heap[parentIdx].priority) {
                [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];
                currentIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    sinkDown(index) {
        let currentIdx = index;
        while (true) {
            const leftIdx = 2 * currentIdx + 1;
            const rightIdx = 2 * currentIdx + 2;
            let smallestIdx = currentIdx;

            if (leftIdx < this.heap.length && this.heap[leftIdx].priority < this.heap[smallestIdx].priority) {
                smallestIdx = leftIdx;
            }
            if (rightIdx < this.heap.length && this.heap[rightIdx].priority < this.heap[smallestIdx].priority) {
                smallestIdx = rightIdx;
            }

            if (smallestIdx !== currentIdx) {
                [this.heap[currentIdx], this.heap[smallestIdx]] = [this.heap[smallestIdx], this.heap[currentIdx]];
                currentIdx = smallestIdx;
            } else {
                break;
            }
        }
    }
}
