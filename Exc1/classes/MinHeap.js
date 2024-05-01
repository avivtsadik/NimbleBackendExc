class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(entry) {
    if (!entry || typeof entry !== "object" || !("key" in entry)) {
      throw new Error("Invalid entry provided.");
    }
    this.heap.push(entry);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const minEntry = this.heap[0];
    const lastEntry = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = lastEntry;
      this.heapifyDown();
    }
    return minEntry;
  }

  /**
   * Restores the heap property by moving an entry up the heap.
   * @param {number} index - The index of the entry to start the heapify up process from.
   */
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Restores the heap property by moving an entry down the heap.
   * @param {number} index - The index of the entry to start the heapify down process from.
   */
  heapifyDown() {
    let currentIndex = 0;
    const heapLength = this.heap.length;
    const lastNonLeafIndex = Math.floor(heapLength / 2);
    while (currentIndex < lastNonLeafIndex) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;
      if (
        leftChildIndex < heapLength &&
        this.compare(this.heap[leftChildIndex], this.heap[smallestChildIndex]) <
          0
      ) {
        smallestChildIndex = leftChildIndex;
      }
      if (
        rightChildIndex < heapLength &&
        this.compare(
          this.heap[rightChildIndex],
          this.heap[smallestChildIndex]
        ) < 0
      ) {
        smallestChildIndex = rightChildIndex;
      }
      if (smallestChildIndex !== currentIndex) {
        this.swap(currentIndex, smallestChildIndex);
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  // Swaps two entries in the heap
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  peekMin() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  compare(entry1, entry2) {
    // Calculate a combined score based on frequency and last accessed time
    const score1 = this.calculateScore(entry1);
    const score2 = this.calculateScore(entry2);

    // Compare based on the combined score
    return score1 - score2;
  }

  // Calculate a combined score based on frequency and last accessed time
  calculateScore(entry) {
    const frequencyWeight = 1000;
    const lastAccessedWeight = 1;

    // Calculate the score using a combination of frequency and last accessed time
    const frequencyScore = entry.frequency * frequencyWeight;
    const lastAccessedScore = entry.lastAccessed * lastAccessedWeight;

    // Combine the scores
    return frequencyScore + lastAccessedScore;
  }
}
export default MinHeap;
