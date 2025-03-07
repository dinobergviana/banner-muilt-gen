import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

let fileName = "";

export const generateBannerImageStories = async (data, path) => {
  // hour font
  registerFont("./src/fonts/Denike-Regular.otf", {
    family: "Denike",
  });

  // NEW BANNER DIMENSIONS - STORIES
  const newBannerWidth = 1080;
  const newBannerHeight = 1920;

  const canvas = createCanvas(newBannerWidth, newBannerHeight);
  const context = canvas.getContext("2d");

  context.fillRect(0, 0, newBannerWidth, newBannerHeight);

  const titleCordinateX = 540;
  const titleCordinateY = 960;

  const dayCordinateX = 540;
  const dayCordinateY = 1140;

  const hourCordinateX = 540;
  const hourCordinateY = 1170;

  const districtCordinateX = 540;
  const districtCordinateY = 1380;

  const addressCordinateX = 540;
  let addressCordinateY = 1400;

  const lidershipCordinateX = 540;
  let lidershipCordinateY = 1440;

  const phoneCordinateX = 540;
  let phoneCordinateY = 1480;

  const banner = {
    name: data.name,
    day: data.day,
    hour: data.hour,
    district: data.district,
    address: data.address,
    phone: data.phone,
    lidership: data.lidership,
  };

  loadImage("./src/banners/banner-background-stories.jpg").then((image) => {
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
    fs.writeFileSync(`${path}/${bannerName} - STORIES.png`, buffer);
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
    const hour = gcHour.split(":")[0];
    const minutes = gcHour.split(":")[1];

    gcHour = `${hour}h${minutes}`;

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
    // const phoneRegex =
    //   /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/;

    // const phoneNumberArray = phoneRegex.exec(phone);
    // const formattedPhone = `(${phoneNumberArray[2]}) ${phoneNumberArray[3]}-${phoneNumberArray[4]}`;

    registerFont("./src/fonts/MonumentExtended-Ultrabold.otf", {
      family: "Kanit",
    });
    context.font = "30px Kanit";
    context.textAlign = "center";
    context.fillText(phone, phoneCordinateX, phoneCordinateY);
  }
};
