class CacheEntry {
  constructor(key, value, sizeInBytes, lastAccessed = Date.now()) {
    this.key = key;
    this.value = value;
    this.size = sizeInBytes;
    this.frequency = 1;
    this.lastAccessed = lastAccessed;
  }
}
export default CacheEntry;
