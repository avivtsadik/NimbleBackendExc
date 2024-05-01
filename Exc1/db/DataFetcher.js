import fs from "fs";

class DataFetcher {
  static async fetchDataFromDatabase(sizeInMB, offset) {
    return new Promise((resolve, reject) => {
      fs.open("./db/file.db", "r", (err, fd) => {
        if (err) {
          reject(err);
          return;
        }

        const buffer = Buffer.alloc(sizeInMB);
        fs.read(fd, buffer, 0, sizeInMB, offset, (err, bytesRead, buffer) => {
          if (err) {
            fs.close(fd, () => {});
            reject(err);
            return;
          }

          fs.close(fd, () => {});
          resolve(buffer);
        });
      });
    });
  }
}

export default DataFetcher;
