import WindowTinyLFUCache from "./WindowTinyLFUCache.js";
import DataFetcher from "../db/DataFetcher.js";
import SizesInBytes from "../consts/Consts.js";

class DataIntegrator {
  constructor(maxCacheCapacity) {
    this.windowInstance = new WindowTinyLFUCache(maxCacheCapacity);
  }

  async readFromCacheOrFetch(size, offset) {
    try {
      if (this.windowInstance.hasToPreFetch64KB(size, offset)) {
        DataFetcher.fetchDataFromDatabase(SizesInBytes.KilobyteSizes.SIZE_64, offset).then((value) => {
          this.windowInstance.set(SizesInBytes.KilobyteSizes.SIZE_64, offset, value);
        });
      }
      if (this.windowInstance.hasInCache(size, offset)) {
        return this.windowInstance.get(size, offset);
      } else {
        const value = await DataFetcher.fetchDataFromDatabase(size, offset);
        this.windowInstance.set(size, offset, value);
        return value;
      }
    } catch (error) {
      throw new Error(
        `during readFromCacheOrFetch operation: ${error.message}`
      );
    }
  }
}

export default DataIntegrator;
