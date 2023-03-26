import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

let fileName = "";

export const generateBannerImageFeed = async (data, path) => {
  // hour font
  registerFont("./src/fonts/Denike-Regular.otf", {
    family: "Denike",
  });

  // OLD BANNER DIMENSIONS - FEED
  const oldBannerWidth = 1080;
  const oldBannerHeight = 1080;

  // NEW BANNER DIMENSIONS - FEED
  const newBannerWidth = 1080;
  const nnewBannerHeight = 1350;

  const canvas = createCanvas(newBannerWidth, nnewBannerHeight);
  const context = canvas.getContext("2d");

  context.fillRect(0, 0, newBannerWidth, nnewBannerHeight);

  const titleCordinateX = 540;
  const titleCordinateY = 730;

  const dayCordinateX = 540;
  const dayCordinateY = 890;

  const hourCordinateX = 540;
  const hourCordinateY = 920;

  const districtCordinateX = 540;
  const districtCordinateY = 1080;

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

  loadImage("./src/banners/banner-background.jpg").then((image) => {
    context.drawImage(image, 0, 0);
    context.fillStyle = "#222222";

    addGCName(banner.name.toUpperCase());
    addGCDay(banner.day.toUpperCase());
    addGCHour(banner.hour);

    if (banner.district) {
      addGCDistrict(banner.district);
      addressCordinateY += 20;
      lidershipCordinateY += 20;
      phoneCordinateY += 20;
    }

    addGCAdress(banner.address);
    addGCLidership(banner.lidership);
    addGCPhone(banner.phone);

    // sets file type
    const buffer = canvas.toBuffer("image/png");

    // writes the final file on the root of the project
    const bannerName = banner.name.toUpperCase();
    fileName = `${bannerName}.png`;
    fs.writeFileSync(`${path}/${bannerName} - FEED.png`, buffer);
  });

  function addGCName(gcName) {
    registerFont("./src/fonts/Denike-Regular.otf", {
      family: "Denike",
    });
    context.font = "60px Denike";
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);
  }

  function addGCDay(gcDay) {
    registerFont("./src/fonts/MonumentExtended-Regular.otf", {
      family: "Maven Pro",
    });
    context.font = "30px Maven Pro";
    context.textAlign = "center";
    context.fillText(gcDay, dayCordinateX, dayCordinateY);
  }

  function addGCHour(gcHour) {
    registerFont("./src/fonts/MonumentExtended-Ultrabold.otf", {
      family: "Kanit",
    });
    context.font = "30px Kanit";
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
      newBannerWidth
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
