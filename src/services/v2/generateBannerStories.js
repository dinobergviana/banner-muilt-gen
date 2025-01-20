import {
  createCanvas,
  loadImage,
  registerFont,
  deregisterAllFonts,
} from "canvas";
import fs from "fs";

import { DAYS } from "../../consts/days.js";
import { CORDINATES_STORIES } from "../../consts/cordinates.js";

let fileName = "";

const TITLE_FONT_PATH = `./src/fonts/v2/NeueHaasDisplayRoman.ttf`;
const HOUR_FONT_PATH = `./src/fonts/v2/NeueHaasDisplayBold.ttf`;

const registerFontFunction = (path, family, weight) => {
  registerFont(path, {
    family,
    weight,
  });
};

export const generateBannerImageStories = async (data, path) => {
  const banner = {
    name: data.name,
    day: data.day,
    hour: data.hour,
    district: data.district,
    address: data.address,
    phone: data.phone,
    lidership: data.lidership,
  };

  const daysKeys = Object.keys(DAYS);
  const values = Object.values(DAYS);
  const dayIndex = values.findIndex((day) => day === banner.day);

  // NEW BANNER DIMENSIONS - STORIES
  const newBannerWidth = 1080;
  const newBannerHeight = 1820;

  const canvas = createCanvas(newBannerWidth, newBannerHeight);
  const context = canvas.getContext("2d");

  context.fillRect(0, 0, newBannerWidth, newBannerHeight);

  const titleCordinateX = CORDINATES_STORIES[daysKeys[dayIndex]].TITLE.EIXO_X;
  const titleCordinateY = CORDINATES_STORIES[daysKeys[dayIndex]].TITLE.EIXO_Y;

  const hourCordinateX = CORDINATES_STORIES[daysKeys[dayIndex]].HOUR.EIXO_X;
  const hourCordinateY = CORDINATES_STORIES[daysKeys[dayIndex]].HOUR.EIXO_Y;

  const districtCordinateX =
    CORDINATES_STORIES[daysKeys[dayIndex]].DISTRICT.EIXO_X;
  const districtCordinateY =
    CORDINATES_STORIES[daysKeys[dayIndex]].DISTRICT.EIXO_Y;

  let localCordinateX = 540;
  let localCordinateY = 1580;

  let addressCordinateX = 540;
  let addressCordinateY = 1580;

  if (banner.address) {
    localCordinateX -= banner.address.length * banner.district.length;
    addressCordinateX += banner.address.length * 2;
  }

  const isLidershipNameSmallerThanDistrict =
    banner.lidership.length < banner.district.length;

  let basePosition = 560;

  if (isLidershipNameSmallerThanDistrict) {
    basePosition = 450;
  }

  let lidershipCordinateX =
    basePosition - banner.district.length - banner.lidership.length * 10;
  let lidershipCordinateY = 1630;

  let phoneCordinateX = 680;
  let phoneCordinateY = 1630;

  // console.log(banner.lidership, lidershipCordinateX);
  // console.log(banner.phone, phoneCordinateX);
  // console.log(banner.name);

  let templatePath = "";

  templatePath = `./src/banners/template-v2/${daysKeys[dayIndex]} - STORY.jpg`;

  loadImage(templatePath).then((image) => {
    deregisterAllFonts();

    context.drawImage(image, 0, 0);
    context.fillStyle = "#222222";

    addGCName(banner.name.toUpperCase());
    // addGCHour(banner.hour);
    // addGCDistrict(banner.district);

    // if (banner.address) {
    //   localCordinateY += 50;
    //   addressCordinateY += 50;
    //   lidershipCordinateY += 50;
    //   phoneCordinateY += 50;
    //   addLocal();
    //   addGCAdress(banner.address);
    // }

    // addGCLidership(banner.lidership);
    // addGCPhone(banner.phone);

    // sets file type
    const buffer = canvas.toBuffer("image/png");

    // writes the final file on the root of the project
    const bannerName = banner.name.toUpperCase();
    fileName = `${bannerName}.png`;
    fs.writeFileSync(`${path}/${bannerName} - STORIES.png`, buffer);
  });

  function addGCName(gcName) {
    registerFont("./src/fonts/helvetica/Helvetica-Light.ttf", {
      family: "",
      weight: "",
    });

    context.font = "60px Helvetica Light";
    context.fillStyle = CORDINATES_STORIES[daysKeys[dayIndex]].TITLE.COLOR;
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);

    deregisterAllFonts();
  }

  function addGCHour(gcHour) {
    registerFont("./src/fonts/helvetica/Helvetica-Bold.ttf", {
      family: "",
      weight: "bold",
    });

    const hour = gcHour.split(":")[0];
    const minutes = gcHour.split(":")[1];

    gcHour = `${hour}H${minutes}`;

    context.font = "48px Helvetica";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.fillText(gcHour, hourCordinateX, hourCordinateY);

    deregisterAllFonts();
  }

  function addGCDistrict(gcDistrict) {
    registerFont("./src/fonts/helvetica/Helvetica-Bold.ttf", {
      family: "",
      weight: "bold",
    });

    context.font = "40px Helvetica";
    context.textAlign = "center";
    context.fillText(gcDistrict, districtCordinateX, districtCordinateY);

    deregisterAllFonts();
  }

  function addLocal() {
    registerFont("./src/fonts/helvetica/Helvetica-Bold.ttf", {
      family: "",
      weight: "bold",
    });

    context.font = "40px Helvetica";
    context.textAlign = "center";
    context.fillText("Local:", localCordinateX, localCordinateY);

    deregisterAllFonts();
  }

  function addGCAdress(gcAdress) {
    registerFont("./src/fonts/helvetica/Helvetica.ttf", {
      family: "",
      weight: "",
    });

    context.font = "38px Helvetica";
    context.textAlign = "center";

    context.fillText(
      gcAdress,
      addressCordinateX,
      addressCordinateY,
      newBannerWidth,
    );

    deregisterAllFonts();
  }

  function addGCLidership(gcLidership) {
    // registerFont("./src/fonts/v2/NeueHaasDisplayLight.ttf", {
    //   family: "",
    //   weight: "",
    // });

    registerFont("./src/fonts/helvetica/Helvetica.ttf", {
      family: "",
      weight: "",
    });

    context.font = "38px Helvetica";
    context.textAlign = "center";
    context.fillText(gcLidership, lidershipCordinateX, lidershipCordinateY);

    deregisterAllFonts();
  }

  function addGCPhone(phone) {
    registerFont("./src/fonts/helvetica/Helvetica-Bold.ttf", {
      family: "",
      weight: "",
    });

    context.font = "36px Helvetica";
    context.textAlign = "center";
    context.fillText(phone, phoneCordinateX, phoneCordinateY);

    deregisterAllFonts();
  }
};
