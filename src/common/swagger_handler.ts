import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

// https://javascript.plainenglish.io/how-to-implement-and-use-swagger-in-nodejs-d0b95e765245

const basePath = path.join(__dirname, "..");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RESTPasTrop",
      version: "1.0.0",
      description:
        "This API allows managing appartments for a company renting private people's properties.",
    },
  },
  apis: [path.join(basePath, "**", "*.ts"), path.join(basePath, "index.ts")],
};

console.log();
export const specs = swaggerJsdoc(options);
