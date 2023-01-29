import express from "express";

const route = express.Router();

route.get("/teste", (request, response) => {
  return response.json({
    status: 200,
    data: [],
  });
});

export const routes = route;
