import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

let fileName = "";

import { CORDINATES } from "../../consts/cordinates.js";

const TITLE_FONT_PATH = `./src/fonts/v2/NeueHaasDisplayLight.ttf`;
const HOUR_FONT_PATH = `./src/fonts/v2/NeueHaasDisplayBold.ttf`;

const registerFontFunction = (path, family, weight) => {
  registerFont(path, {
    family,
    weight,
  });
};

export const generateBannerImageFeed = async (data, path) => {
  // NEW BANNER DIMENSIONS - FEED
  const newBannerWidth = 1080;
  const newBannerHeight = 1080;

  const canvas = createCanvas(newBannerWidth, newBannerHeight);
  const context = canvas.getContext("2d");

  context.fillRect(0, 0, newBannerWidth, newBannerHeight);

  const titleCordinateX = CORDINATES.SEGUNDA.TITLE.EIXO_X;
  const titleCordinateY = CORDINATES.SEGUNDA.TITLE.EIXO_Y;

  const hourCordinateX = CORDINATES.SEGUNDA.HOUR.EIXO_X;
  const hourCordinateY = CORDINATES.SEGUNDA.HOUR.EIXO_Y;

  const districtCordinateX = CORDINATES.SEGUNDA.DISTRICT.EIXO_X;
  const districtCordinateY = CORDINATES.SEGUNDA.DISTRICT.EIXO_Y;

  const addressCordinateX = 540;
  let addressCordinateY = 1095;

  const lidershipCordinateX = 540;
  let lidershipCordinateY = 1135;

  const phoneCordinateX = 540;
  let phoneCordinateY = 1175;

  const banner = {
    name: data.name,
    day: data.day,
    hour: data.hour,
    district: data.district,
    address: data.address,
    phone: data.phone,
    lidership: data.lidership,
  };

  loadImage("./src/banners/template-v2/SEGUNDA - FEED.jpg").then((image) => {
    context.drawImage(image, 0, 0);
    context.fillStyle = "#222222";

    addGCName(banner.name.toUpperCase());
    addGCHour(banner.hour);

    // if (banner.district) {
    //   addGCDistrict(banner.district);
    //   addressCordinateY += 20;
    //   lidershipCordinateY += 20;
    //   phoneCordinateY += 20;
    // }

    // addGCAdress(banner.address);
    // addGCLidership(banner.lidership);
    // addGCPhone(banner.phone);

    // sets file type
    const buffer = canvas.toBuffer("image/png");

    // writes the final file on the root of the project
    const bannerName = banner.name.toUpperCase();
    fileName = `${bannerName}.png`;
    fs.writeFileSync(`${path}/${bannerName} - FEED.png`, buffer);
  });

  function addGCName(gcName) {
    registerFontFunction("./src/fonts/v2/NeueHaasDisplayRoman.ttf", "", "");

    context.fillStyle = "#ffffff";
    context.font = "55px Roman";
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);
  }

  function addGCHour(gcHour) {
    registerFontFunction(
      "./src/fonts/helvetica/Helvetica-Bold.ttf",
      "",
      "bold",
    );

    const hour = gcHour.split(":")[0];
    const minutes = gcHour.split(":")[1];

    gcHour = `${hour}H${minutes}`;

    context.fillStyle = "#000";
    context.font = "44px Helvetica";
    context.textAlign = "center";
    context.fillText(gcHour, hourCordinateX, hourCordinateY);
  }

  function addGCDistrict(gcDistrict) {
    registerFont("./src/fonts/MonumentExtended-Ultrabold.otf", {
      family: "Kanit",
    });
    context.font = "30px Kanit";
    context.textAlign = "center";
    context.fillText(gcDistrict, districtCordinateX, districtCordinateY);
  }

  function addGCAdress(gcAdress) {
    registerFont("./src/fonts/MonumentExtended-Regular.otf", {
      family: "Maven Pro",
    });
    context.font = "30px Maven Pro";
    context.textAlign = "center";
    context.fillText(
      gcAdress,
      addressCordinateX,
      addressCordinateY,
      newBannerWidth,
    );
  }

  function addGCLidership(gcLidership) {
    registerFont("./src/fonts/MonumentExtended-Regular.otf", {
      family: "Maven Pro",
    });
    context.font = "30px Maven Pro";
    context.textAlign = "center";
    context.fillText(gcLidership, lidershipCordinateX, lidershipCordinateY);
  }

  function addGCPhone(phone) {
    registerFont("./src/fonts/MonumentExtended-Ultrabold.otf", {
      family: "Kanit",
    });
    context.font = "30px Kanit";
    context.textAlign = "center";
    context.fillText(phone, phoneCordinateX, phoneCordinateY);
  }
};
