import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

let fileName = "";

const CORDINATES = {
  SEGUNDA: {
    TITLE: {
      EIXO_X: 540,
      EIXO_Y: 730,
    },
    HOUR: {
      EIXO_X: 650,
      EIXO_Y: 858,
    },
  },
  TERCA: {
    EIXO_X: "",
    EIXO_Y: "",
  },
  QUINTA: {
    EIXO_X: "",
    EIXO_Y: "",
  },
  SEXTA: {
    EIXO_X: "",
    EIXO_Y: "",
  },
  SABADO: {
    EIXO_X: "",
    EIXO_Y: "",
  },
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
    registerFont("./src/fonts/v2/NeueHaasDisplayRoman.ttf", {
      family: "Roman",
      weight: "bold",
    });
    context.fillStyle = "#ffffff";
    context.font = "55px Roman";
    context.textAlign = "center";
    context.fillText(gcName, titleCordinateX, titleCordinateY, newBannerWidth);
  }

  function addGCHour(gcHour) {
    const hour = gcHour.split(":")[0];
    const minutes = gcHour.split(":")[1];

    gcHour = `${hour}H${minutes}`;

    registerFont("./src/fonts/v2/NeueHaasDisplayBold.ttf", {
      family: "Roman",
    });

    context.fillStyle = "#000";
    context.font = "38px Roman";
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
