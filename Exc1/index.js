import DataIntegrator from "./classes/DataIntegrator.js";
import SizesInBytes from "./consts/Consts.js";

async function Run() {
  const cache = new DataIntegrator(SizesInBytes.MegabyteSizes.SIZE_10);

  try {
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 0);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 0);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 0);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 2000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 8000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 8000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_64, 8000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_8, 8000);
    await cache.readFromCacheOrFetch(SizesInBytes.KilobyteSizes.SIZE_64, 8000);
  } catch (error) {
    console.error("Error occurred during execution:", error);
  }
}

Run();
