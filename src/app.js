// import fs from "fs";
// import csv from "csv-parser";

import { generateBannerImage } from "./services/generateBanner.js";

// let gcInfo = [];
let gcInfo = [
  {
    name: "PLAY ILHOTAS II",
    day: "SEGUNDA-FEIRA",
    hour: "19h30",
    address: "Rua 29 de Março",
    lidership: "Lider Teste",
    phone: "(86) 99821-2345",
  },
];

// const readAndSaveCSVFile = async () => {
//   fs.createReadStream("src/banner-file-test.csv")
//     .pipe(csv())
//     .on("data", (data) => {
//       gcInfo.push(data);
//     })
//     .on("end", () => {
//       gcInfo.forEach((gc) =>
//         console.log({
//           name: gc.nome,
//           lider: gc.lider,
//           horario: gc.horario,
//           endereco: gc.endereco,
//         })
//       );
//     });
// };

// readAndSaveCSVFile();

generateBannerImage(gcInfo[0]);
