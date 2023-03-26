import fs from "fs";
import csv from "csv-parser";

import { generateBannerImageFeed } from "./services/generateBannerFeed.js";
import { generateBannerImageStories } from "./services/generateBannerStories.js";

const PATH_BANNERS_TERESINA_FEED =
  "./src/banners/generatedBanners/teresina/feed";
const PATH_BANNERS_PARNAIBA_FEED =
  "./src/banners/generatedBanners/parnaiba/feed";

const PATH_BANNERS_TERESINA_STORIES =
  "./src/banners/generatedBanners/teresina/stories";
const PATH_BANNERS_PARNAIBA_STORIES =
  "./src/banners/generatedBanners/parnaiba/stories";

let gcInfo = [];

const readAndSaveCSVFile = async () => {
  // FEED
  fs.createReadStream("src/banners-csv-teresina.csv")
    .pipe(csv())
    .on("data", (data) => {
      gcInfo.push(data);
    })
    .on("end", () => {
      gcInfo.forEach((gc) =>
        generateBannerImageFeed(gc, PATH_BANNERS_TERESINA_FEED)
      );
    });
  // STORIES
  fs.createReadStream("src/banners-csv-teresina.csv")
    .pipe(csv())
    .on("data", (data) => {
      gcInfo.push(data);
    })
    .on("end", () => {
      gcInfo.forEach((gc) =>
        generateBannerImageStories(gc, PATH_BANNERS_TERESINA_STORIES)
      );
    });
};

readAndSaveCSVFile();
