import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

const BANNERS_PATH = "./src/banners/generatedBanners/";
let fileName = "";

export const generateBannerImage = async (data) => {
  // hour font
  registerFont("./src/fonts/Denike-Regular.otf", {
    family: "Denike",
  });

  // OLD BANNER DIMENSIONS - FEED
  const oldBannerWidth = 1080;
  const oldBannerHeight = 1080;

  // NEW BANNER DIMENSIONS
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

  const addressCordinateX = 540;
  const addressCordinateY = 1100;

  const contactCordinateX = 540;
  const contactCordinateY = 1140;

  const banner = {
    name: data.name,
    day: data.day,
    hour: data.hour,
    address: data.address,
    phone: data.phone,
    lidership: data.lidership,
  };

  loadImage("./src/banners/banner-background.jpg").then((image) => {
    // adds the base background
    context.drawImage(image, 0, 0);
    context.fillStyle = "#222222";

    // add title

    addTitle(banner.name.toUpperCase());

    // add day
    addDay(banner.day.toUpperCase());

    // add hour
    addHour(banner.hour);

    // add address
    addAdress(banner.address);

    // add lider name and contact
    addContact(`${banner.lidership} ${banner.phone}`);

    // sets file type
    const buffer = canvas.toBuffer("image/png");

    // writes the final file on the root of the project
    const bannerName = banner.name;
    fileName = `${bannerName}.png`;
    fs.writeFileSync(
      `./src/banners/generatedBanners/${bannerName}.png`,
      buffer
    );
  });

  function addTitle(gcName) {
    registerFont("./src/fonts/Denike-Regular.otf", {
      family: "Denike",
    });
    context.font = "60px Denike";
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);
  }

  function addDay(gcDay) {
    registerFont("./src/fonts/MonumentExtended-Regular.otf", {
      family: "Maven Pro",
    });
    context.font = "30px Maven Pro";
    context.textAlign = "center";
    context.fillText(gcDay, dayCordinateX, dayCordinateY);
  }

  function addHour(gcHour) {
    registerFont("./src/fonts/MonumentExtended-Ultrabold.otf", {
      family: "Kanit",
    });
    context.font = "30px Kanit";
    context.textAlign = "center";
    context.fillText(gcHour, hourCordinateX, hourCordinateY);
  }

  function addAdress(gcAdress) {
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

  function addContact(gcContact) {
    registerFont("./src/fonts/MonumentExtended-Regular.otf", {
      family: "Maven Pro",
    });
    context.font = "30px Maven Pro";
    context.textAlign = "center";
    context.fillText(gcContact, contactCordinateX, contactCordinateY);
  }
};
