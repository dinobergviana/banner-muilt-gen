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

  const dayCordinateX = 100;
  const dayCordinateY = 420;

  const hourCordinateX = 1000;
  const hourCordinateY = 440;

  const addressCordinateX = 555;
  const addressCordinateY = 845;

  const contactCordinateX = 550;
  const contactCordinateY = 900;

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

    addTitle(banner.name);

    // add day
    // addDay(banner.day);

    // add hour
    // addHour(banner.hour);

    // add address
    // addAdress(banner.address);

    // add lider name and contact
    // addContact(`${banner.lidership} ${banner.phone}`);

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
    context.font = "70px Denike";
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);
  }

  function addDay(gcDay) {
    registerFont("./src/controllers/banners/fonts/maven-bold.ttf", {
      family: "Maven Pro",
    });
    context.font = "50px Maven Pro";
    context.textAlign = "left";
    context.fillText(gcDay, dayCordinateX, dayCordinateY);
    context.fillText(gcDay, dayCordinateX, dayCordinateY + 40);
    context.fillText(gcDay, dayCordinateX, dayCordinateY + 80);
    context.fillText(gcDay, dayCordinateX, dayCordinateY + 120);
  }

  function addHour(gcHour) {
    registerFont("./src/controllers/banners/fonts/kanit-bold.ttf", {
      family: "Kanit",
    });
    context.font = "74px Kanit";
    context.textAlign = "right";
    context.fillText("HORÁRIO", hourCordinateX, hourCordinateY);
    context.font = "138px Kanit";
    context.fillText(gcHour, hourCordinateX, hourCordinateY + 100);
  }

  function addAdress(gcAdress) {
    registerFont("./src/controllers/banners/fonts/abhaya-regular.ttf", {
      family: "Abhaya Libre",
    });
    context.font = "50px Abhaya Libre";
    context.textAlign = "center";
    context.fillText(
      gcAdress,
      addressCordinateX,
      addressCordinateY,
      newBannerWidth
    );
  }

  function addContact(gcContact) {
    registerFont("./src/controllers/banners/fonts/abhaya-regular.ttf", {
      family: "Abhaya Libre",
    });
    context.font = "50px Abhaya Libre";
    context.textAlign = "center";
    context.fillText(gcContact, contactCordinateX, contactCordinateY, 1080);
  }
};
