import fs from "fs";
import csv from "csv-parser";

import { generateBannerImageFeed } from "./services/v2/generateBannerFeed.js";
import { generateBannerImageStories } from "./services/v2/generateBannerStories.js";

const PATH_BANNERS = "./src/banners/generated-banners";

let gcInfo = [];

const readAndSaveCSVFile = async () => {
  fs.createReadStream("src/banners.csv")
    .pipe(csv())
    .on("data", (data) => {
      gcInfo.push(data);
    })
    .on("end", () => {
      const totalBanners = gcInfo.length;
      let processedCount = 0;

      const updateProgress = () => {
        processedCount++;
        const percentage = (
          (processedCount / (totalBanners * 2)) *
          100
        ).toFixed(2);
        process.stdout.write(
          `\rProgresso: ${percentage}% (${processedCount}/${
            totalBanners * 2
          }) banners processados`,
        );
      };

      const handleError = (error, bannerType, bannerData) => {
        console.error(
          `\nErro ao gerar banner ${bannerType} para o item: ${JSON.stringify(
            bannerData,
          )}`,
        );
        console.error(`Detalhes do erro: ${error.message}`);
      };

      gcInfo.forEach((gc) => {
        try {
          generateBannerImageFeed(gc, PATH_BANNERS);
          updateProgress();
        } catch (error) {
          handleError(error, "Feed", gc);
        }
      });

      // gcInfo.forEach((gc) => {
      //   try {
      //     generateBannerImageStories(gc, PATH_BANNERS);
      //     updateProgress();
      //   } catch (error) {
      //     handleError(error, "Stories", gc);
      //   }
      // });

      process.stdout.write("\nAguardando a liberação do terminal...\n");
    });
};

readAndSaveCSVFile();
