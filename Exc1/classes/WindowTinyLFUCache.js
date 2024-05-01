import CacheEntry from "./CacheEntry.js";
import MinHeap from "./MinHeap.js";
import SizesInBytes from "../consts/Consts.js";

class WindowTinyLFUCache {
  constructor(maxCapacity) {
    this.maxCapacity = maxCapacity; // Cache size in bytes
    this.currentCapacity = 0;
    this.cache = new Map();
    this.windowTinyLfuHeap = new MinHeap();
    this.last8KBOffset = null;
    this.offset8KBToPrefetch64KB = new Set();
    this.startTime = Date.now();
  }

  get(size, offset) {
    try {
      const key = this.generateKey(size, offset);

      if (this.hasInCache(size, offset)) {
        return this.updateCacheEntry(key);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`during get operation: ${error.message}`);
    }
  }

  set(size, offset, value) {
    try {
      const key = this.generateKey(size, offset);
      if (!this.hasInCache(size, offset)) {
        // Check if this is an 8KB offset followed by a 64KB offset
        if (size === SizesInBytes.KilobyteSizes.SIZE_8) {
          this.last8KBOffset = offset;
        }

        // Check if this is an 64KB offset followed by a 8KB offset
        if (size === SizesInBytes.KilobyteSizes.SIZE_64 && offset === this.last8KBOffset) {
          this.offset8KBToPrefetch64KB.add(offset);
        }

        const entry = new CacheEntry(key, value, size, this.normalizeTime());
        if (this.currentCapacity + size > this.maxCapacity) {
          const minEntry = this.windowTinyLfuHeap.peekMin();
          if (minEntry && this.windowTinyLfuHeap.compare(entry, minEntry) > 0) {
            this.evict(size);
          } else {
            return;
          }
        }
        this.cache.set(key, entry);
        this.windowTinyLfuHeap.insert(entry);
        this.currentCapacity += size;
      } else {
        this.updateCacheEntry(key, value);
      }
    } catch (error) {
      throw new Error(`during set operation: ${error.message}`);
    }
  }

  normalizeTime() {
    return Date.now() - this.startTime;
  }

  // Function to update cache entry
  updateCacheEntry(key, value) {
    const entry = this.cache.get(key);
    let valueData = value || entry.value;
    entry.frequency += 1;
    entry.lastAccessed = this.normalizeTime();
    entry.value = valueData;
    this.cache.set(key, entry);
    this.windowTinyLfuHeap.heapifyDown();
    return valueData;
  }

  // Function to evict cache entries if the cache exceeds its capacity
  evict(entrySize) {
    while (this.currentCapacity + entrySize > this.maxCapacity) {
      const evictedEntry = this.windowTinyLfuHeap.extractMin();
      const key = evictedEntry.key;
      this.cache.delete(key); // Delete the entry from the Map
      this.currentCapacity -= evictedEntry.size;
    }
  }

  // Function to check if an 8KB offset has to be prefetched due to a following 64KB offset
  hasToPreFetch64KB(size, offset) {
    return size === SizesInBytes.KilobyteSizes.SIZE_8 && this.offset8KBToPrefetch64KB.has(offset);
  }

  hasInCache(size, offset) {
    return this.cache.has(this.generateKey(size, offset));
  }

  generateKey(size, offset) {
    return `${size}_${offset}`; // Creating a unique key based on size and offset
  }
}

export default WindowTinyLFUCache;
