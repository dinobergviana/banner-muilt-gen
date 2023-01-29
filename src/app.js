import fs from "fs";
import csv from "csv-parser";

import { generateBannerImage } from "./services/generateBanner.js";

let gcInfo = [];

const readAndSaveCSVFile = async () => {
  fs.createReadStream("src/banners-csv-teresina.csv")
    .pipe(csv())
    .on("data", (data) => {
      gcInfo.push(data);
    })
    .on("end", () => {
      gcInfo.forEach((gc) => generateBannerImage(gc));
    });
};

readAndSaveCSVFile();
